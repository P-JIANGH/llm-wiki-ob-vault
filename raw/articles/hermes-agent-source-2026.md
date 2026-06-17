# hermes-agent 源码学习笔记

> 学习时间：2026-04-13
> 项目：Nous Research 的 Hermes Agent（AI Agent 框架）
> 位置：~/.hermes/hermes-agent/

---

## 项目概述

hermes-agent 是一个生产级 AI Agent 框架，支持多 Provider（OpenAI/Claude/MiniMax/DeepSeek 等）、
多消息平台（Telegram/Discord/飞书等）、多终端（本地/SSH/Docker/Modal/Daytona），
以及内置的上下文压缩、记忆系统、技能管理和 RL 训练能力。

---

## 模块全景

```
hermes-agent/
├── tools/                   # 工具集（每个文件 = 一个工具，自注册）
│   └── registry.py          # 工具注册中心（核心基础设施）
├── agent/                   # Agent 核心逻辑（从 run_agent.py 拆分出来）
│   ├── context_compressor.py  # 上下文压缩
│   ├── prompt_builder.py       # System prompt 构建
│   ├── memory_manager.py        # 记忆管理
│   ├── auxiliary_client.py      # 辅助 LLM 调用（摘要/视觉）
│   ├── anthropic_adapter.py    # Claude 特有适配
│   ├── prompt_caching.py        # Anthropic Prompt Caching
│   ├── skill_commands.py        # /skill 命令处理
│   └── [其他辅助模块]
├── environments/            # Agent 执行环境（RL/Benchmark）
│   ├── agent_loop.py       # HermesAgentLoop（独立可用的 Agent Loop）
│   ├── hermes_base_env.py  # 基础环境抽象
│   ├── tool_call_parsers/  # 各模型工具调用解析器
│   └── [benchmark envs]
├── gateway/                # 消息网关（13+ 平台适配）
│   ├── run.py              # GatewayRunner 主类
│   ├── session.py           # Session 管理 + PII 哈希
│   ├── delivery.py         # 消息投递
│   ├── hooks.py            # 钩子系统
│   ├── platforms/          # 各平台适配器（telegram/discord/feishu/...）
│   └── channel_directory.py
├── cron/                   # Cron 调度器
│   ├── scheduler.py        # tick() + 文件锁防重
│   └── jobs.py             # Job CRUD
├── hermes_cli/             # CLI 命令（setup/auth/gateway/tools/...）
├── acp_adapter/            # Agent Communication Protocol（子 agent 编排）
├── model_tools.py           # 工具系统入口（发现 + 分发 + async 桥接）
├── run_agent.py             # AIAgent 主类（约 9800 行）
└── cli.py                   # CLI 入口
```

---

## 1. 工具系统（tools/）

### 1.1 ToolRegistry（tools/registry.py）

**设计模式：中心注册表（单例）**

所有工具模块在 import 时调用 `registry.register()` 自注册。`model_tools.py` 通过查询注册表而不是维护自己的数据结构。

```python
class ToolRegistry:
    def register(
        self,
        name: str,           # 工具名
        toolset: str,        # 工具集名（如 "terminal_tools"）
        schema: dict,        # OpenAI 格式的工具 schema
        handler: Callable,   # 处理函数
        check_fn: Callable = None,    # 环境检查（缺省工具时返回 False）
        requires_env: list = None,    # 所需环境变量
        is_async: bool = False,
        emoji: str = "",
        max_result_size_chars: int | float | None = None,
    ):
```

**关键设计点：**

- **循环导入安全**：registry.py 不导入任何 model_tools 或工具文件；工具文件导入 registry；model_tools 最后导入 registry + 所有工具模块
- **check_fn 环境自检**：每个工具有一个 check_fn，在 `get_definitions()` 时过滤不可用工具（而不是在注册时过滤，这样同一工具可以在不同环境下激活/失效）
- **ToolEntry.__slots__**：减少内存占用，工具是高频对象
- **工具名字冲突警告**：同名工具跨工具集注册时打 warning，而不是直接覆盖（后者会覆盖）
- **deregister 清理工具集检查**：当最后一个属于某工具集的工具被注销时，自动清理该工具集的 check_fn（MCP 动态发现时需要）
- **tool_error / tool_result 辅助函数**：统一错误/结果序列化为 JSON 字符串，消除 `json.dumps({"error": msg})` 的样板代码

**核心 API：**

```python
registry.get_definitions(tool_names, quiet=False)  # 返回 check_fn 通过的 schema
registry.dispatch(name, args, **kwargs)           # 执行工具
registry.get_tool_to_toolset_map()               # {tool_name: toolset}
registry.is_toolset_available(toolset)            # 工具集是否可用
registry.get_emoji(name)                          # 工具 emoji
registry.get_max_result_size(name)                # per-tool 结果大小限制
```

### 1.2 model_tools.py（工具系统入口）

**工具发现流程：**

```python
_modules = [
    "tools.web_tools", "tools.terminal_tool", "tools.file_tools",
    "tools.vision_tools", "tools.mixture_of_agents_tool",
    "tools.skills_tool", "tools.browser_tool", "tools.cronjob_tools",
    ...
]
for mod_name in _modules:
    importlib.import_module(mod_name)  # 触发 registry.register()
# 再加 MCP 动态发现 + Plugin 动态发现
```

**异步桥接（_run_async）：**

```python
def _run_async(coro):
    # 情况1：在 async 上下文中（gateway/RL env）→ 开新线程，asyncio.run()
    # 情况2：工作线程（delegate_task 并行执行）→ per-thread 持久 event loop
    # 情况3：主线程 CLI → 共享持久 event loop（避免 "Event loop is closed"）
    if loop and loop.is_running():
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, coro).result()
    elif threading.current_thread() is not threading.main_thread():
        return _get_worker_loop().run_until_complete(coro)
    else:
        return _get_tool_loop().run_until_complete(coro)
```

**为什么需要持久 event loop：**
`asyncio.run()` 每次创建并销毁循环，但缓存的 `httpx.AsyncClient` / `AsyncOpenAI` 在 GC 时会尝试关闭已销毁的循环，导致 "Event loop is closed" 错误。持久 loop 避免了这个问题。

**工具参数类型强制（coerce_tool_args）：**
LLM 常把 `"42"`（字符串）当成整数传来，这个函数对照 JSON Schema 做类型强制转换（string → int/float/bool）。

**工具集白名单动态 schema：**
`execute_code` 的 schema 里包含允许调用的沙盒工具列表，但这个列表需要根据当前会话实际启用的工具动态构建，否则模型会看到不存在的工具并产生幻觉调用。

---

## 2. Agent 核心（agent/ + run_agent.py）

### 2.1 HermesAgentLoop（environments/agent_loop.py）

**可独立使用的多轮 Agent 引擎**，与 run_agent.py 的 AIAgent 分开，专注于纯 OpenAI tool-calling 协议的循环。

**架构：**

```python
class HermesAgentLoop:
    async def run(self, messages):
        for turn in range(self.max_turns):
            response = await self.server.chat_completion(
                messages=messages,
                tools=self.tool_schemas,
                temperature=self.temperature,
                extra_body=self.extra_body,  # OpenRouter provider 偏好
            )
            # 提取 reasoning_content（各 Provider 格式兼容）
            # 处理 tool_calls（对象或 dict）
            # 执行工具 → ThreadPoolExecutor（128 workers）
            # 处理 tool_result
            # enforce_turn_budget（工具结果持久化预算）
        return AgentResult(messages, managed_state, turns_used, finished_naturally)
```

**关键设计点：**

- **ThreadPoolExecutor(128)**：处理 `asyncio.run()` 内部使用 async 的工具（Modal/Docker/Daytona 终端后端），避免死锁。并发度高（如 89 个 TB2 任务同时工具调用）
- **工具执行安全**：unknown tool → 报错 JSON；JSON 解析失败 → 报错 JSON；执行异常 → 报错 JSON。永远返回 JSON 字符串，不崩溃
- **TodoStore per-loop**：每次 run() 创建新的 TodoStore，loop 结束即销毁，不污染全局状态
- **Fallback 解析器**：当 `response.tool_calls` 为空但 content 包含 `<tool_call>` 时，使用 standalone hermes_parser 提取工具调用
- **工具结果持久化**：`maybe_persist_tool_result` + `enforce_turn_budget` 控制每个工具结果的大小

### 2.2 AIAgent（run_agent.py，约 9800 行）

**主体是 AIAgent 类**，包含完整的会话管理、工具执行、Provider 路由等逻辑。

**IterationBudget（线程安全的迭代计数器）：**

```python
class IterationBudget:
    def consume() -> bool:  # 返回 False 时停止迭代
    def refund() -> None:   # execute_code 迭代退还预算
```

父 Agent 默认 max=90，子 Agent 通过 `delegation.max_iterations` 独立限制（默认 50）。

**并行工具执行：**

```python
_should_parallelize_tool_batch(tool_calls):
    # 1. 检查 _NEVER_PARALLEL_TOOLS（clarify 必须串行）
    # 2. 检查路径重叠（read_file/write_file/patch → 提取路径 → _paths_overlap）
    # 3. 其余工具必须是 _PARALLEL_SAFE_TOOLS 之一
```

**Provider 路由（Smart Model Routing）：**
模型选择支持按任务类型（coding/reasoning/creative）路由到不同模型。fallback 链支持多个 Provider。

**代理转发（Qwen Portal）：**
`_qwen_portal_headers()` 生成 QwenCode CLI 风格的 User-Agent 和 DashScope 头，实现 portal.qwen.ai 兼容。

### 2.3 ContextCompressor（agent/context_compressor.py）

**四阶段上下文压缩：**

```
1. Prune：旧 tool result（>200 chars）→ 替换为 "[Old tool output cleared]"
2. Protect Head：前 N 条消息（系统提示 + 早期对话）
3. Protect Tail：最近 X tokens（基于 token 预算，而非固定条数）
4. Summarize Middle：用辅助 LLM 生成结构化摘要
```

**结构化摘要模板（Goal / Progress / Decisions / Files / Next Steps）：**

多次压缩时，新的摘要会迭代更新（保留旧信息，添加新进度）。

**摘要失败冷却（10 分钟）：**
摘要 LLM 调用失败时，设置 600 秒冷却期，期间跳过摘要直接丢弃中间消息，避免反复失败。

**工具对完整性检查（_sanitize_tool_pairs）：**
压缩后可能出现 tool_call 存在但 tool_result 丢失，或 tool_result 存在但 tool_call 被移除的情况。需要修复这两类孤儿。

### 2.4 PromptBuilder（agent/prompt_builder.py）

**系统 Prompt 构成：**

```
Identity（默认 "You are Hermes Agent..."）
+ MemoryGuidance（记忆使用指导）
+ SkillsGuidance（技能创建指导）
+ PlatformHints（当前平台提示，如 WhatsApp/Discord/CLI 等）
+ SkillsSystemPrompt（技能索引，含平台过滤）
+ ContextFilesPrompt（AGENTS.md / SOUL.md / .cursorrules）
+ EphemeralPrompt（运行时注入的一次性提示）
+ NousSubscriptionPrompt（如已订阅）
```

**提示注入检测（_CONTEXT_THREAT_PATTERNS）：**
检测 AGENTS.md / SOUL.md / .cursorrules 中的提示注入模式：
- "ignore previous instructions"
- "do not tell the user"
- 隐藏 HTML div / 不可见 unicode 字符
- curl 渗出 API key 模式

发现注入时，文件内容被替换为 `[BLOCKED: ...]` 而不是加载。

**.hermes.md 文件发现：**
从当前目录向上搜索最近的 `.hermes.md` 或 `HERMES.md`，搜索范围不超过 git 仓库根目录。

**Skills 快照缓存：**
技能索引构建昂贵（需要读所有 SKILL.md 文件）。使用 mtime/size manifest 做快照缓存，加载时对比 manifest，命中则跳过重新构建。

**模型特定指导：**
- GPT/Codex：注入 `<tool_persistence>` / `<mandatory_tool_use>` / `<act_dont_ask>` 等 XML 标签指导
- Gemini/Gemma：注入绝对路径 / 依赖检查 / 并行工具调用指导
- GPT-5/Codex：使用 `developer` role 而非 `system`（在 API 层交换）

---

## 3. 消息网关（gateway/）

### 3.1 GatewayRunner（gateway/run.py）

**平台初始化：**

```python
# 13+ 平台
platforms = {
    "telegram": TelegramPlatform,
    "discord": DiscordPlatform,
    "feishu": FeishuPlatform,
    "slack": SlackPlatform,
    "whatsapp": WhatsAppPlatform,
    "signal": SignalPlatform,
    "matrix": MatrixPlatform,
    "mattermost": MattermostPlatform,
    "dingtalk": DingTalkPlatform,
    "wecom": WeComPlatform,
    "sms": SmsPlatform,
    "email": EmailPlatform,
    "bluebubbles": BlueBubblesPlatform,
    "homeassistant": HomeAssistantPlatform,
    "webhook": WebhookPlatform,
}
```

**SSL 自动检测（_ensure_ssl_certs）：**
NixOS 等非标准系统 Python 可能找不到 CA 证书。检查顺序：
1. Python 编译内置路径
2. certifi（Mozilla 证书包）
3. 常见发行版路径

### 3.2 Session（gateway/session.py）

**PII 哈希化：**

```python
_hash_sender_id(value)   # → "user_<sha256[:12]>"
_hash_chat_id(value)      # → "telegram:<sha256[:12]>"（保留平台前缀）
```

电话号码使用正则匹配检测，防止真实用户 ID 被误哈希。

**SessionSource：**
记录消息来源（platform / chat_id / user_id / thread_id 等），用于：
1. 响应路由回正确平台
2. 注入系统提示的平台上下文
3. Cron job 投递

### 3.3 Cron Scheduler（cron/scheduler.py）

**文件锁防重：**
`~/.hermes/cron/.tick.lock` 文件锁防止 gateway 进程 + systemd timer + daemon 三者同时 tick。

**投递目标解析（_resolve_delivery_target）：**
```
deliver="local"    → 不投递，只保存本地
deliver="origin"  → 投递到触发任务的同一平台/chat
deliver="telegram:chat_id" → 投递到指定平台
```

---

## 4. ACP 适配器（acp_adapter/）

ACP（Agent Communication Protocol）是 Hermes Agent 的内部子 Agent 编排协议：
- `session.py`：子 Agent 会话管理
- `server.py`：ACP 服务器
- `auth.py`：认证
- `permissions.py`：权限模型
- `entry.py`：入口点
- `events.py`：事件
- `tools.py`：ACP 工具

---

## 5. 环境系统（environments/）

**hermes_base_env.py**：所有环境的基类，定义工具注册 / 会话生命周期 / 观测接口。

**tool_call_parsers/**：各模型的工具调用格式解析器：
- `hermes_parser.py`（默认）
- `qwen_parser.py` / `qwen3_coder_parser.py`
- `deepseek_v3_parser.py` / `deepseek_v3_1_parser.py`
- `glm45_parser.py` / `glm47_parser.py`
- `kimi_k2_parser.py`
- `llama_parser.py`
- `mistral_parser.py`
- `longcat_parser.py`

---

## 6. 关键设计模式总结

| 模式 | 位置 | 说明 |
|------|------|------|
| 单例注册表 | ToolRegistry | 工具自注册，check_fn 环境检查 |
| 持久 Event Loop | model_tools.py | 避免 asyncio.run() 关闭导致 GC 时崩溃 |
| ThreadPoolExecutor 并行 | HermesAgentLoop | 128 workers，服务 asyncio.run() 内部工具 |
| 四阶段上下文压缩 | ContextCompressor | Prune / Protect Head+Tail / Summarize Middle |
| 迭代摘要 | ContextCompressor | 多次压缩时保留 + 增量更新 |
| 路径重叠检测 | run_agent.py | read_file/write_file/patch 并行安全 |
| PII 哈希化 | gateway/session.py | sender/chat ID 用 SHA256[:12] 匿名化 |
| 持久循环替代 while True | HermesAgentLoop | AsyncLoop 对象管理生命周期 |
| 工具对完整性 | ContextCompressor | 压缩后修复 orphaned tool_call / tool_result |
| Snapshot 缓存 | prompt_builder.py | Skills 索引 mtime/size 快照 |
| 提示注入扫描 | prompt_builder.py | 静态正则扫描 AGENTS.md 等上下文文件 |
| 模型特定指导注入 | prompt_builder.py | GPT→XML标签 / Gemini→绝对路径 / GPT-5→developer role |
