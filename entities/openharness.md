---
title: OpenHarness
created: 2026-05-06
updated: 2026-05-06
type: entity
tags: [framework, agent, python, cli, llm, multi-agent, tool-calling, open-source]
sources: [raw/articles/openharness-2026.md]
---

# OpenHarness

## Overview

**OpenHarness** 是 [Claude Code](https://github.com/anthropics/claude-code) 的开源 Python 实现（v0.1.7，MIT），为 LLM 提供完整的 Agent 基础设施：工具、记忆、安全边界、权限控制和多 Agent 协作。

- **CLI:** `oh` / `openh` 命令
- **Personal Agent:** `ohmo` — 支持 Feishu / Slack / Telegram / Discord
- **License:** MIT
- **Python:** >= 3.10
- **Home:** https://github.com/HKUDS/OpenHarness

## Core Architecture

```
openharness/
├── engine/          Agent Loop (QueryEngine + run_query)
├── tools/           43+ 工具 (file/shell/search/web/MCP)
├── skills/          按需加载 .md skill 文件
├── plugins/         Commands + Hooks + Agents + MCP servers
├── permissions/     多级权限模式 + sensitive path 保护
├── hooks/           PreToolUse/PostToolUse 生命周期
├── commands/        54 个 slash 命令
├── mcp/             Model Context Protocol 客户端
├── memory/          跨会话持久记忆
├── tasks/           后台任务管理
├── coordinator/     Subagent 协调 + team lifecycle
├── swarm/           BackendRegistry (tmux/subprocess/in-process)
├── prompts/         System prompt 装配 + CLAUDE.md 发现
├── config/          多层配置 + migration
├── ui/              React TUI (backend protocol + frontend)
├── api/             多 Provider 客户端
├── sandbox/         Docker 沙箱隔离
└── channels/        IM channel 集成
```

## Key Subsystems

### Agent Loop (`engine/query.py`)

`QueryEngine` 拥有对话历史和 tool-aware model loop。核心 `run_query()`:

```python
while True:
    response = await api.stream(messages, tools)
    if response.stop_reason != "tool_use":
        break
    for tool_call in response.tool_uses:
        result = await harness.execute_tool(tool_call)
    messages.append(tool_results)
```

关键特性：
- Streaming tool-call cycle
- API retry + exponential backoff
- Auto-compaction（上下文超阈值自动压缩）
- Max turns 防止无限循环
- CostTracker token 计数

### Tools (`tools/base.py`)

`BaseTool` ABC + `ToolRegistry` 注册表。Pydantic `input_model` 定义参数，`to_api_schema()` 输出 Anthropic Messages API 格式。

43+ 工具覆盖：文件 I/O、Shell 执行、代码搜索（glob/grep）、Web（fetch/search）、MCP 协议、多模态（image-to-text）、Skill 加载、后台任务、Cron 任务、TODO 管理、LSP、Notebook 编辑、Plan/Worktree 模式、团队协作。

### Swarm / Multi-Agent (`swarm/`)

`BackendRegistry` 三层后端检测：
1. `in_process` — 明确请求或无 pane backend
2. `tmux` — 活跃 tmux session + 二进制存在
3. `subprocess` — 兜底

内置 Agent 定义（Explore / claude-code-guide）使用 `model="inherit"` 继承父 session 模型。

### Memory (`memory/`)

- `add_memory_entry` / `find_relevant_memories` / `scan_memory_files`
- CLAUDE.md 自动发现与注入
- MEMORY.md 持久记忆
- ohmo memory 与 project memory 隔离

### Permissions (`permissions/checker.py`)

硬编码 sensitive path 保护（SSH keys、AWS/GCP/Azure credentials、Docker config、K8s config）。`PermissionChecker.evaluate()` 支持 glob path rules。

### API / Providers (`api/`)

- `AnthropicApiClient` — Anthropic-compatible（Claude/Kimi/GLM/MiniMax）
- `OpenAICompatibleClient` — OpenAI 风格（OpenAI/DeepSeek/OpenRouter/Groq/Ollama/GitHub Models/Gemini）
- `CodexApiClient` — Codex CLI subscription bridge
- `CopilotClient` — GitHub Copilot OAuth

## ohmo Personal Agent

`ohmo` 是独立 app，基于 OpenHarness 的 personal-agent：

```
~/.ohmo/
├── soul.md          # 长期人格与行为原则
├── identity.md       # 身份定义
├── user.md          # 用户画像
├── BOOTSTRAP.md     # onboarding ritual
├── memory/          # personal memory
└── gateway.json     # channel 配置
```

支持 channel：Telegram / Slack / Discord / Feishu。运行在现有 Claude Code 或 Codex subscription 上，无需额外 API key。

## Related

- [[hermes-agent]] — 生产级 AI Agent 框架（工具注册中心 / 持久 Async Loop）
- [[pi-coding-agent]] — 交互式终端 coding agent（append-only JSONL session 树）
- [[aworld]] — AI Agent Harness 框架（CAST 代码分析 + Benchmark-Driven）
- [[deepseek-tui]] — Rust TUI Coding Agent（1M-token 上下文）
- [[agent-laboratory]] — LLM 自主研究 Agent（4阶段流水线）
- [[concepts/agent-loop]] — AI Agent 核心执行循环模式
- [[concepts/provider-registry]] — 插拔式 LLM Provider 架构
- [[concepts/memory-system]] — AI Agent 长期记忆架构
