# DeerFlow README — Super Agent Harness

> Source: GitHub bytedance/deer-flow README.md + backend/CLAUDE.md (v2.0, 2026-02-28 GitHub Trending #1)
> Original: https://github.com/bytedance/deer-flow

## 概述

**DeerFlow** (Deep Exploration and Efficient Research Flow) 是一个开源 **super agent harness**，在 LangGraph + LangChain 基础上编排 sub-agent、memory、sandboxes，支持通过 extensible skills 完成几乎任何任务。

- **版本**: 2.0（从零重写，与 v1.x 无共享代码）
- **License**: MIT
- **技术栈**: Python 3.12+ (backend) + Next.js (frontend) + LangGraph + LangChain
- **安装**: `git clone` + `make config` + `make docker-start`（推荐 Docker）
- **推荐模型**: Doubao-Seed-2.0-Code, DeepSeek v3.2, Kimi 2.5

## 核心定位

DeerFlow 起源于 Deep Research 框架，社区使用中扩展到了：数据管道、幻灯片生成、仪表盘构建、内容工作流自动化等。

2.0 从零重写：从"需要接线的研究框架"变成"batteries included 的 super agent harness"。

## 架构概览

```
deer-flow/
├── backend/
│   ├── app/
│   │   ├── gateway/           # FastAPI Gateway API (port 8001)
│   │   │   └── routers/       # models/mcp/skills/memory/uploads/threads/artifacts/channels/...
│   │   └── channels/          # IM 集成（Feishu/Slack/Telegram/WeCom）
│   └── packages/harness/deerflow/
│       ├── agents/            # LangGraph agent 系统
│       │   ├── lead_agent/    # 主 agent（factory + system prompt）
│       │   ├── middlewares/   # 12 个 middleware 组件
│       │   ├── memory/        # 记忆提取、队列、prompt
│       │   └── thread_state.py
│       ├── sandbox/           # 沙箱执行系统
│       │   ├── local/         # 本地文件系统 provider
│       │   ├── sandbox.py     # 抽象 Sandbox 接口
│       │   └── tools.py       # bash/ls/read/write/str_replace
│       ├── subagents/         # Subagent 委托系统
│       │   ├── builtins/      # general-purpose / bash agents
│       │   └── executor.py    # 后台执行引擎
│       ├── tools/builtins/    # 内置工具（present_files/ask_clarification/view_image）
│       ├── mcp/               # MCP 集成（tools/cache/client）
│       ├── models/            # Model factory（thinking/vision 支持）
│       ├── skills/            # Skills 发现、加载、解析
│       ├── community/         # 社区工具（tavily/jina_ai/firecrawl/image_search/aio_sandbox）
│       └── client.py          # 嵌入式 Python 客户端
├── frontend/                  # Next.js web UI
├── skills/                   # Agent skills
│   ├── public/              # 内置 skills（research/report/slide/web/image/video/chart...）
│   └── custom/              # 自定义 skills（gitignored）
└── docker/                   # Docker 配置
```

## 进程架构

| 进程 | Port | 说明 |
|------|------|------|
| Nginx | 2026 | 统一反向代理入口 |
| Frontend | 3000 | Next.js Web UI |
| LangGraph Server | 2024 | Agent 运行时（标准模式） |
| Gateway API | 8001 | REST API（Gateway 模式时嵌入 runtime） |
| Provisioner | 8002 | Kubernetes provisioner（可选） |

**两种运行时模式**：
- **Standard**: LangGraph Server（4 processes）
- **Gateway mode**: 嵌入 Gateway，无 LangGraph Server（3 processes，无 License 要求）

## Middleware 链（12 步）

按顺序执行于 `make_lead_agent()` 中：

1. **ThreadDataMiddleware** — 创建 per-thread 目录
2. **UploadsMiddleware** — 追踪并注入新上传文件
3. **SandboxMiddleware** — 获取沙箱，存储 sandbox_id
4. **DanglingToolCallMiddleware** — 注入缺失的 ToolMessages
5. **GuardrailMiddleware** — 工具调用前授权（可选）
6. **SummarizationMiddleware** — token 限制时上下文压缩（可选）
7. **TodoListMiddleware** — plan_mode 任务跟踪（可选）
8. **TitleMiddleware** — 首轮交换后自动生成标题
9. **MemoryMiddleware** — 异步记忆更新入队
10. **ViewImageMiddleware** — 视觉模型注入 base64 图像（可选）
11. **SubagentLimitMiddleware** — 截断超额 task tool_calls
12. **ClarificationMiddleware** — 拦截 ask_clarification 并中断（最后）

## Sandbox 系统

**抽象接口**: `Sandbox` with `execute_command`, `read_file`, `write_file`, `list_dir`

**Provider 模式**: `SandboxProvider` with `acquire`/`get`/`release` 生命周期

**实现**:
- `LocalSandboxProvider` — 单例本地文件系统执行
- `AioSandboxProvider` — Docker 容器隔离

**虚拟路径**:
- Agent 视角: `/mnt/user-data/{workspace,uploads,outputs}`, `/mnt/skills`
- 物理路径: `backend/.deer-flow/threads/{thread_id}/user-data/...`
- 翻译: `replace_virtual_path()` / `replace_virtual_paths_in_command()`

**沙箱工具**: `bash`, `ls`, `read_file`, `write_file`, `str_replace`

## Subagent 系统

- **内置类型**: `general-purpose`（全部工具，除 task）和 `bash`（命令专家）
- **执行**: 双线程池 — `_scheduler_pool`（3 workers）+ `_execution_pool`（3 workers）
- **并发上限**: `MAX_CONCURRENT_SUBAGENTS = 3`，超时 15 分钟
- **流程**: `task()` tool → `SubagentExecutor` → 后台线程 → SSE events → 结果
- **事件**: `task_started` / `task_running` / `task_completed` / `task_failed` / `task_timed_out`

## Skills 系统

- **格式**: 目录含 `SKILL.md`（YAML frontmatter: name/description/license/allowed-tools）
- **位置**: `skills/{public,custom}/`
- **加载**: `load_skills()` 递归扫描，`extensions_config.json` 控制启用状态
- **安装**: `POST /api/skills/install` 从 .skill ZIP 提取到 custom/ 目录
- **渐进加载**: 只在需要时加载，不一次全部注入上下文

**内置 Skills**: deep-research / report-generation / slide-creation / web-page / image-generation / chart-visualization / podcast-generation / data-analysis / frontend-design / consulting-analysis / newsletter-generation / surprise-me / find-skills / bootstrap / vercel-deploy-claimable / web-design-guidelines / claude-to-deerflow

## Memory 系统

**存储**: `backend/.deer-flow/memory.json`

**数据结构**:
- **User Context**: workContext, personalContext, topOfMind
- **History**: recentMonths, earlierContext, longTermBackground
- **Facts**: id/content/category/preference/confidence/createdAt/source

**工作流**:
1. `MemoryMiddleware` 过滤消息并入队
2. 队列去重（per-thread）+ debounce（30s 默认）
3. 后台线程 LLM 提取上下文和事实
4. 原子写入（temp file + rename），跳过重复 fact
5. 下次交互时注入最多 15 个 fact 到 `<memory>` 标签

## IM Channels

支持: Telegram（Bot API long-polling）/ Slack（Socket Mode）/ Feishu（Lark WebSocket）/ WeCom（WebSocket）

消息流: External → Channel impl → `MessageBus.publish_inbound()` → `ChannelManager._dispatch_loop()` → LangGraph Server（线程创建/管理）→ AI 响应 → Outbound → 平台

## 关键配置

**config.yaml**:
- `models[]` — LLM 配置（use class path / supports_thinking / supports_vision）
- `tools[]` — 工具配置
- `sandbox.use` — 沙箱 provider
- `subagents.enabled` — subagent 开关
- `memory` — 记忆系统开关
- `channels` — IM 渠道配置

**extensions_config.json**: MCP servers + skills 启用状态

## Model 支持

任意 OpenAI-compatible API 模型。推荐：长上下文 + 推理能力 + 多模态 + 强 tool-use。

内置 Provider:
- `langchain_openai:ChatOpenAI` — OpenAI/OpenRouter/兼容 API
- `deerflow.models.vllm_provider:VllmChatModel` — vLLM 0.19.0
- `deerflow.models.openai_codex_provider:CodexChatModel` — Codex CLI
- `deerflow.models.claude_provider:ClaudeChatModel` — Claude Code OAuth

## Tracing

支持 LangSmith + Langfuse（可同时启用），Docker 默认关闭。

## 嵌入式客户端

`DeerFlowClient` 提供进程内访问（无需 HTTP 服务），返回与 Gateway API 相同格式的响应。

## 相关链接

- GitHub: https://github.com/bytedance/deer-flow
- 官网: https://deerflow.tech
