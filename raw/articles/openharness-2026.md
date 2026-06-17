# OpenHarness 项目源码分析

**Source:** `~/OpenHarness` 本地源码 + README.md + CHANGELOG.md
**Date:** 2026-05-06
**Type:** Codebase / Framework

## 基本信息

- **Name:** OpenHarness (oh / openh 命令)
- **Version:** v0.1.7
- **Home:** https://github.com/HKUDS/OpenHarness
- **License:** MIT
- **Python:** >= 3.10
- **Description:** Open-source Python port of Claude Code — AI-powered CLI coding assistant

## 核心定位

```
Harness = Tools + Knowledge + Observation + Action + Permissions
```

OpenHarness 是 Claude Code 的开源 Python 实现，为 LLM 提供"工具、记忆、安全边界"，让模型从"会说话"变成"会做事"。

**oh** 是主CLI入口；**ohmo** 是基于 OpenHarness 的 personal-agent app，支持 Feishu/Slack/Telegram/Discord。

## 目录结构

```
OpenHarness/
├── src/openharness/          # 核心 Harness 框架
│   ├── engine/               # Agent Loop（查询引擎）
│   ├── tools/                # 43+ 工具（文件/Shell/搜索/Web/MCP）
│   ├── skills/               # 按需加载 .md skill 文件
│   ├── plugins/              # 插件（commands/hooks/agents/MCP servers）
│   ├── permissions/           # 多级权限模式 + path rules
│   ├── hooks/                # PreToolUse/PostToolUse 生命周期钩子
│   ├── commands/             # 54 个 slash 命令
│   ├── mcp/                  # MCP (Model Context Protocol) 客户端
│   ├── memory/               # 持久跨会话记忆
│   ├── tasks/                # 后台任务管理
│   ├── coordinator/          # Subagent 协调（team/spawn）
│   ├── swarm/                # 多Agent编排（BackendRegistry/Subprocess/In-Process）
│   ├── prompts/              # System prompt 装配 + CLAUDE.md 发现
│   ├── config/               # 多层配置 + migration
│   ├── ui/                   # React TUI（backend protocol + frontend）
│   ├── api/                  # 多 Provider 客户端（Anthropic/OpenAI/Codex/Copilot）
│   ├── auth/                 # 认证管理
│   ├── sandbox/              # Docker 沙箱执行隔离
│   ├── channels/             # IM channel 集成（Feishu/Slack/Telegram/Discord）
│   └── ...
├── ohmo/                     # Personal agent app（独立 package）
│   ├── cli.py                # ohmo 命令行入口
│   ├── runtime.py            # ohmo backend runtime
│   ├── workspace.py          # ~/.ohmo workspace 管理
│   ├── memory.py             # ohmo personal memory
│   ├── prompts.py            # ohmo system prompt 构建
│   ├── session_storage.py    # 会话持久化
│   └── gateway/              # IM channel gateway
├── frontend/terminal/        # React TUI 前端（TypeScript/React）
├── autopilot-dashboard/      # Auto-pilot dashboard (Vue?)
├── scripts/                  # 安装/测试脚本
└── tests/                    # pytest 测试套件
```

## 10 大子系统详解

### 1. Engine (Agent Loop)

**核心文件:** `engine/query.py` (1040行), `engine/query_engine.py`, `engine/messages.py`

QueryEngine 拥有对话历史和 tool-aware model loop：

```python
class QueryEngine:
    def __init__(self, api_client, tool_registry, permission_checker,
                 cwd, model, system_prompt, max_tokens,
                 context_window_tokens, auto_compact_threshold_tokens,
                 max_turns, permission_prompt, ask_user_prompt,
                 hook_executor, tool_metadata)
```

`submit_message()` 追加用户消息并执行查询循环：

```python
async for event, usage in run_query(context, query_messages):
    if isinstance(event, AssistantTurnComplete):
        self._messages = list(query_messages)
    yield event
```

核心 `run_query()` 循环（query.py）:
- API streaming 调用
- `stop_reason != "tool_use"` 时退出循环
- 否则 Permission check → Hook → Execute Tool → Hook → Result
- `messages.append(tool_results)` 继续循环

关键设计：
- **Auto-Compaction:** `auto_compact_threshold_tokens` 触发自动压缩，保持上下文精简
- **Max Turns:** 防止无限循环
- **Token Counting:** CostTracker 跟踪使用量
- **Exponential Backoff:** API 重试

### 2. Tools (43+)

**注册表:** `tools/base.py` — BaseTool ABC + ToolRegistry

```python
class BaseTool(ABC):
    name: str
    description: str
    input_model: type[BaseModel]  # Pydantic model

    async def execute(self, arguments: BaseModel,
                     context: ToolExecutionContext) -> ToolResult
    def is_read_only(self, arguments: BaseModel) -> bool
    def to_api_schema(self) -> dict  # Anthropic Messages API schema
```

完整工具列表（tools/ 目录）:
- `bash_tool.py` — 执行 shell 命令
- `file_read_tool.py` / `file_write_tool.py` / `file_edit_tool.py` — 文件操作
- `glob_tool.py` / `grep_tool.py` — 代码搜索
- `web_fetch_tool.py` / `web_search_tool.py` — Web
- `image_to_text_tool.py` — 多模态（图像理解）
- `mcp_tool.py` / `mcp_auth_tool.py` — MCP 协议工具
- `skill_tool.py` — Skill 加载
- `task_create_tool.py` / `task_list_tool.py` / `task_output_tool.py` — 后台任务
- `team_create_tool.py` / `team_delete_tool.py` — 多Agent团队
- `cron_create_tool.py` / `cron_list_tool.py` / `cron_toggle_tool.py` / `cron_delete_tool.py` — 定时任务
- `todo_write_tool.py` — TODO 管理
- `lsp_tool.py` — Language Server Protocol
- `notebook_edit_tool.py` — Jupyter notebook 编辑
- `enter_plan_mode_tool.py` / `exit_plan_mode_tool.py` / `enter_worktree_tool.py` / `exit_worktree_tool.py` — Plan/Worktree 模式
- `brief_tool.py` / `config_tool.py` / `sleep_tool.py` / `tool_search_tool.py` — 辅助工具
- `send_message_tool.py` — 消息发送
- `remote_trigger_tool.py` — 远程触发
- `list_mcp_resources_tool.py` / `read_mcp_resource_tool.py` — MCP 资源读取

### 3. Skills (按需加载 .md)

**文件:** `skills/loader.py`, `skills/registry.py`, `skills/types.py`

Skill 是 Markdown 文件，OpenHarness 按需加载。支持：
- `anthropics/skills` 格式兼容
- Claude-style plugins 兼容
- 插件可提供 `<plugin>/tools/` 目录的 BaseTool 子类，运行时自动发现注册

### 4. Plugins

**目录:** `plugins/`

三层扩展：
- **Commands:** slash 命令（54个）
- **Hooks:** PreToolUse/PostToolUse 事件钩子
- **Agents:** 子 agent 定义
- **MCP Servers:** Model Context Protocol 服务器

### 5. Permissions

**文件:** `permissions/checker.py` (200行)

多级权限模式：
- `SENSITIVE_PATH_PATTERNS` 保护高价值凭证（SSH keys, AWS/GCP/Azure credentials, Docker config, K8s config, OpenHarness credentials）
- `PermissionChecker.evaluate()` — glob 匹配 path rules
- 支持 path-level + command-level 拒绝规则

### 6. Hooks

**文件:** `hooks/events.py`, `hooks/executor.py`, `hooks/loader.py`, `hooks/types.py`

HookEvent 类型：
- `USER_PROMPT_SUBMIT`
- `PRE_TOOL_USE`
- `POST_TOOL_USE`
- ...

HookExecutor 执行链：Permission check → PreHook → Execute → PostHook → Result

### 7. Swarm / Multi-Agent

**核心文件:** `swarm/registry.py` (411行), `coordinator/`, `swarm/types.py`

BackendRegistry 三层检测：
1. `in_process` — 明确请求或无 pane backend 时
2. `tmux` — 活跃 tmux session + tmux 二进制存在
3. `subprocess` — 安全兜底

```python
class BackendRegistry:
    def detect_backend() -> BackendType
    def detect_pane_backend() -> BackendDetectionResult
    def get_executor(backend: BackendType | None) -> TeammateExecutor
    def register_backend(executor: TeammateExecutor)
    def mark_in_process_fallback()
```

Agent 定义 (`swarm/agent_definitions.py`): 内置 Explore / claude-code-guide agent，`model="inherit"` 继承父session模型。

Coordinator (`coordinator/coordinator_mode.py`): 多 Agent 协调运行时上下文。

### 8. Memory

**文件:** `memory/__init__.py`, `memory/manager.py`, `memory/memdir.py`, `memory/scan.py`, `memory/search.py`

导出：
- `add_memory_entry` / `remove_memory_entry` / `list_memory_files`
- `find_relevant_memories` — 向量搜索
- `get_memory_entrypoint` — MEMORY.md 入口发现
- `scan_memory_files` — 扫描项目 memory 目录
- `load_memory_prompt` — 装配记忆到 prompt

ohmo 的 memory 隔离于 OpenHarness project memory。

### 9. API / Providers

**文件:** `api/client.py`, `api/openai_client.py`, `api/codex_client.py`, `api/copilot_client.py`, `api/provider.py`, `api/registry.py`

内置 Provider：
- `AnthropicApiClient` — Anthropic-compatible API（Claude 官方/Kimi/GLM/MiniMax）
- `OpenAICompatibleClient` — OpenAI 风格（OpenAI/DeepSeek/OpenRouter/GitHub Models/Groq/Ollama/Gemini...）
- `CodexApiClient` — Codex CLI subscription bridge
- `CopilotClient` — GitHub Copilot OAuth

Provider 检测 (`api/provider.py`): `detect_provider()` 根据环境/凭证自动检测最优 Provider。

### 10. UI — React TUI

**Frontend:** `frontend/terminal/` (React + TypeScript)
**Backend:** `ui/backend_host.py`, `ui/runtime.py`

架构：React 前端通过 backend protocol 与 Python backend 通信。ohmo CLI 在 Python 侧构建 backend bundle，前端通过 tsx 运行 React 应用。Auto-compaction 进度、Markdown 渲染、权限确认都在此层。

### 11. Config

**文件:** `config/settings.py`, `config/paths.py`, `config/schema.py`

多层配置：CLI flags → 环境变量 → 配置文件 (~/.openharness/)
支持 migration 系统。

## ohmo Personal Agent

ohmo 是独立 app，不是 OpenHarness 的一个 mode：

```
~/.ohmo/
├── soul.md          # 长期人格与行为原则
├── identity.md       # ohmo 身份定义
├── user.md          # 用户画像/偏好
├── BOOTSTRAP.md     # 首轮 onboarding ritual
├── memory/          # personal memory
└── gateway.json     # channel 配置
```

ohmo 支持 channel：Telegram / Slack / Discord / Feishu

## 关键技术特点

1. **Streaming Tool-Call Cycle** — 模型输出 tool_use 立即执行，不等完整响应
2. **API Retry + Exponential Backoff** — 网络错误自动重试
3. **Auto-Compaction** — 上下文超阈值时自动压缩记忆
4. **Multi-level Permissions** — 敏感路径（SSH/AWS/GCP/K8s/Docker）硬编码拒绝
5. **CLAUDE.md Discovery** — 自动发现并注入项目级 CLAUDE.md
6. **Plugin Tool Discovery** — 插件 `<plugin>/tools/` 目录 BaseTool 自动注册
7. **Subprocess Teammate** — 多 Agent 可通过 subprocess/tmux/in-process 三种后端运行
8. **Dry-run Mode** — `--dry-run` 不执行模型/工具/子 agent，纯预览配置

## 依赖关键包

```toml
dependencies = [
    "anthropic>=0.40.0",
    "openai>=1.0.0",
    "rich>=13.0.0",
    "prompt-toolkit>=3.0.0",
    "textual>=0.80.0",
    "typer>=0.12.0",
    "pydantic>=2.0.0",
    "httpx>=0.27.0",
    "websockets>=12.0",
    "mcp>=1.0.0",
    "slack-sdk>=3.0.0",
    "python-telegram-bot>=21.0.0",
    "discord.py>=2.0.0",
    "lark-oapi>=1.5.0",   # Feishu
    ...
]
```

## 与 Claude Code 的关系

OpenHarness 是 Claude Code 的开源 Python 实现。关键设计对应：
- Registry → tool 注册
- Hooks → 生命周期事件
- Permissions → 安全边界
- Swarm → 多 Agent 协作
- ohmo → Claude Code subscription bridge（无需额外 API key）
