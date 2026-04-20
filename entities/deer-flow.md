---
title: DeerFlow
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [project, agent, framework, bytedance]
sources: [raw/articles/deer-flow-readme-2026.md, modules: sandbox/tools.py+sandbox/security.py+sandbox/local_sandbox.py+agents/factory.py+agents/memory/*+subagents/executor.py+subagents/registry.py+runtime/*+skills/manager.py]
aliases: [DeerFlow]
---

# DeerFlow

**Super Agent Harness**，基于 LangGraph + LangChain，由 ByteDance 开发。GitHub Trending #1（2026-02-28）。v2.0 从零重写，与 v1.x 无共享代码。

官网: https://deerflow.tech | GitHub: https://github.com/bytedance/deer-flow | MIT License

## 概述

DeerFlow (Deep Exploration and Efficient Research Flow) 最初是 Deep Research 框架，社区使用中扩展到了数据管道、幻灯片生成、仪表盘、内容工作流等。2.0 从零重写为 **super agent harness**——batteries included，完全可扩展。

- **技术栈**: Python 3.12+ (backend) + Next.js (frontend) + LangGraph + LangChain
- **推荐模型**: Doubao-Seed-2.0-Code, DeepSeek v3.2, Kimi 2.5
- **安装**: `make config` + `make docker-start`（推荐）

## 核心架构：Harness / App 分离

严格的两层依赖方向：
- **Harness** (`packages/harness/deerflow/`): 可发布的 agent 框架包，import prefix `deerflow.*`
- **App** (`app/`): 非发布应用代码，import prefix `app.*`（Gateway API + IM 渠道集成）

依赖规则：App → Harness（Harness 永远不导入 App），由 `test_harness_boundary.py` CI 强制执行。

## 包结构

```
packages/harness/deerflow/
├── agents/              # LangGraph agent 系统
│   ├── factory.py       # create_deerflow_agent() SDK 入口（config-free 纯参数工厂）
│   ├── lead_agent/      # 主 agent factory + system prompt
│   ├── middlewares/     # 12 个 middleware 组件（按序执行）
│   ├── memory/          # 记忆提取、队列、prompt（updater/queue/prompt/storage）
│   ├── thread_state.py  # ThreadState / ThreadDataState Pydantic 模型
│   ├── checkpointer/    # 同步/异步 checkpointer factory（memory/sqlite/postgres）
│   └── features.py      # RuntimeFeatures 声明式特性开关
├── sandbox/            # 沙箱执行系统
│   ├── sandbox.py       # 抽象 Sandbox 接口（execute_command/read_file/write_file/list_dir/glob/grep）
│   ├── sandbox_provider.py  # SandboxProvider 抽象（acquire/get/release）+ 单例缓存
│   ├── tools.py         # LangChain Tool 定义（1345行，路径翻译核心）
│   ├── security.py      # LocalSandboxProvider 安全门控（allow_host_bash）
│   ├── search.py        # grep/glob 搜索实现
│   ├── local/           # LocalSandboxProvider + LocalSandbox
│   │   ├── local_sandbox.py  # 本地文件系统沙箱（路径映射+输出反向映射）
│   │   └── list_dir.py
│   └── file_operation_lock.py  # 文件操作锁
├── subagents/          # Subagent 委托系统
│   ├── executor.py      # SubagentExecutor：双线程池（scheduler 3 + execution 3）+ SubagentStatus 枚举
│   ├── registry.py      # get_subagent_config() + list_subagents()（config.yaml override）
│   ├── config.py        # SubagentConfig dataclass
│   └── builtins/        # 内置 subagent（general-purpose / bash）
├── tools/builtins/     # 内置工具（present_files / ask_clarification / view_image / write_todos）
├── skills/             # Skills 发现/加载/解析/验证/安装
│   ├── manager.py       # 技能目录管理（skills/{public,custom}/，HISTORY.jsonl）
│   ├── loader.py        # 渐进式 skills 加载
│   ├── parser.py        # YAML frontmatter 解析
│   ├── validation.py    # SKILL.md 结构验证
│   └── installer.py     # .skill ZIP 安装到 custom/
├── mcp/               # MCP 集成（tools/cache/client）
├── models/            # Model factory（thinking/vision 支持，多 backend）
├── community/         # 社区工具（tavily/firecrawl/image_search/aio_sandbox）
├── runtime/           # LangGraph 运行时
│   ├── runs/manager.py   # RunManager（内存 run 注册表）+ RunRecord
│   ├── runs/worker.py    # 异步 run worker
│   ├── runs/schemas.py   # RunStatus/DisconnectMode 枚举
│   ├── stream_bridge/   # 生产者-消费者流解耦（StreamBridge 抽象 + MemoryStreamBridge）
│   └── store/           # KV store（进程内/跨进程）
├── config/           # 配置（agents/sandbox/memory/model/skills/tracing/extensions）
├── tracing/          # LangSmith/Langfuse tracing factory
└── guardrails/       # GuardrailMiddleware + 内置规则

app/
├── gateway/          # FastAPI Gateway API（models/mcp/skills/memory/uploads/threads/artifacts/channels）
└── channels/         # IM 集成（Feishu/Slack/Telegram/WeCom）
```

## Middleware 链（12 步）

按序执行于 `make_lead_agent()` 中，`create_deerflow_agent()` SDK 层可完全替换：

| # | Middleware | 职责 |
|---|-----------|------|
| 1 | ThreadDataMiddleware | 创建 per-thread 目录 |
| 2 | UploadsMiddleware | 注入新上传文件 |
| 3 | SandboxMiddleware | 获取沙箱，存 sandbox_id |
| 4 | DanglingToolCallMiddleware | 注入缺失的 ToolMessages |
| 5 | GuardrailMiddleware | 工具调用前授权（可选） |
| 6 | SummarizationMiddleware | 上下文压缩（可选） |
| 7 | TodoListMiddleware | plan_mode 任务跟踪（可选） |
| 8 | TitleMiddleware | 首轮后自动生成标题 |
| 9 | MemoryMiddleware | 异步记忆更新入队 |
| 10 | ViewImageMiddleware | 视觉模型注入 base64（可选） |
| 11 | SubagentLimitMiddleware | 截断超额 task tool_calls |
| 12 | ClarificationMiddleware | 拦截 ask_clarification（最后） |

## Sandbox 系统（详细）

### 路径映射体系

LocalSandbox 的核心：双向路径映射（container_path ↔ local_path）+ 输出反向映射。

**三层虚拟路径**：
- `/mnt/user-data/workspace/` → `thread_data['workspace_path']/`
- `/mnt/user-data/uploads/` → `thread_data['uploads_path']/`
- `/mnt/user-data/outputs/` → `thread_data['outputs_path']/`
- `/mnt/skills/` → skills host 路径（只读）
- `/mnt/acp-workspace/` → per-thread 或全局 ACP workspace

**最长前缀匹配**：多个映射匹配时，选 container_path 最长的那个（最具体优先）。

**命令中路径翻译**（`_resolve_paths_in_command()`）：
- 用 `\b{container_path}(?=/|$|[\s"';&|<>()])` 正则匹配命令中的虚拟路径
- 替换为对应的 host 路径
- 防止 `/mnt/skills` 被匹配成 `/mnt/skills-extra`（segment boundary 检查）

**输出反向映射**（`_reverse_resolve_paths_in_output()`）：
- 命令输出中出现的 host 路径全部翻译回虚拟路径
- 防止 host 目录结构泄露给 agent

**路径样式保留**：
- Windows `C:\Users\...` vs Unix `/home/...`
- `_path_separator_for_style()` 检测 base path 类型
- `_join_path_preserving_style()` 用正确分隔符拼接

### 安全门控

LocalSandboxProvider 下：
- `allow_host_bash: false`（默认）→ bash 工具被 `LOCAL_HOST_BASH_DISABLED_MESSAGE` 禁用
- bash subagent 同样被禁用
- 必须显式配置 `sandbox.allow_host_bash: true` 才可用

### Provider 单例

`get_sandbox_provider()` 缓存单例，`reset_sandbox_provider()` 清缓存，`shutdown_sandbox_provider()` 彻底清理。

## Subagent 系统（详细）

### 三线程池架构

```python
_scheduler_pool = ThreadPoolExecutor(max_workers=3)  # 调度编排
_execution_pool = ThreadPoolExecutor(max_workers=3)  # 实际执行（有超时）
_isolated_loop_pool = ThreadPoolExecutor(max_workers=3)  # sync 调用（事件循环中）
```

### SubagentConfig

```python
@dataclass
class SubagentConfig:
    name: str
    description: str
    max_turns: int          # 最大 LLM 轮数
    timeout_seconds: int    # 超时（默认15分钟）
    allowed_tools: list[str]  # 允许的工具白名单
```

### 执行流程

```
task() tool_call → SubagentExecutor.submit() → _scheduler_pool 调度
→ _execution_pool 执行（LangGraph sub-agent，timeout）
→ SSE events (task_started/running/completed/failed/timed_out)
→ 结果写入 _background_tasks[]
```

### Registry 覆盖

`get_subagent_config(name)` 查 BUILTIN_SUBAGENTS → config.yaml 覆盖（timeout / max_turns）。

## Memory 系统（详细）

### 更新队列（MemoryUpdateQueue）

- **Debounce**: 30s（可配置 `memory.debounce_seconds`）
- **Per-thread 去重**：同一 thread_id 的更新合并为一个
- **信号检测**：`correction_detected`（用户纠正）和 `reinforcement_detected`（正反馈）
- **合并策略**：新消息追加到已有上下文

### LLM 提取（MEMORY_UPDATE_PROMPT）

两阶段：
1. **Reflection**: 检测错误重试、用户纠正、项目约束
2. **更新 Memory**: 更新 workContext / personalContext / topOfMind / recentMonths / earlierContext / Facts

### Fact 结构

```python
{"id": uuid, "content": str, "category": "preference|knowledge|context|behavior|goal|correction",
 "preference": "...", "confidence": 0.0-1.0, "createdAt": ISO, "source": "..."}
```

### 存储

`backend/.deer-flow/memory.json`，原子写入（temp file + rename），`get_memory_storage()` 抽象。

## Runtime 系统

### RunManager

内存中的 run 记录表（asyncio.Lock 保护）：
- `RunRecord`: run_id / thread_id / status / task(asyncio.Task) / abort_event / error
- 状态：pending → running → ... → completed/failed/cancelled

### StreamBridge 模式

**问题**：LangGraph agent（生产者）和 SSE endpoint（消费者）运行在不同上下文，如何解耦？

**解决**：StreamBridge 抽象（发布/订阅）+ MemoryStreamBridge（内存队列实现）。

事件：`metadata` / `updates` / `events` / `error` / `end` + `__heartbeat__`（保活）+ `__end__`。

### Checkpointer

- **memory**: `InMemorySaver`（进程内，非持久）
- **sqlite**: `langgraph-checkpoint-sqlite`（需要 `uv add`）
- **postgres**: `langgraph-checkpoint-postgres`（需要 `uv add` + psycopg）

## Skills 系统（详细）

**格式**: `skills/{public,custom}/{skill-name}/SKILL.md`

**YAML frontmatter**:
```yaml
---
name: my-skill
description: ...
license: MIT
allowed_tools: [read_file, write_file, bash]
---
```

**管理命令**:
- `GET /api/skills` — 列出已安装 skills
- `POST /api/skills/install` — 从 .skill ZIP 安装到 custom/

**验证规则**:
- name 格式：`^[a-z0-9]+(?:-[a-z0-9]+)*$`（lowercase-hyphen）
- 长度 ≤ 64 字符
- 必需文件：SKILL.md
- 可选子目录：`references/` `templates/` `scripts/` `assets/`

**历史记录**: `skills/custom/.history/{name}.jsonl`（append-only）

## 配置层次

```
config.yaml                          # 主配置
  └── extensions_config.json          # MCP servers + skills 启用状态
  └── skills/{public,custom}/        # Skills 文件系统
```

模型/工具/sandbox/subagents/memory/tracing 均支持 YAML 配置覆盖代码默认值。

## 相关概念

- [[langgraph]] — 核心编排框架
- [[langchain]] — LLM 交互基础设施
- [[agent-swarm]] — DeerFlow subagent vs ClawTeam swarm 的不同架构选择
- [[sandbox]] — LocalSandbox 的路径映射+输出掩码设计
- [[nanobot]] — 单人 Agent 框架，DeerFlow 是更重的 harness 方案
