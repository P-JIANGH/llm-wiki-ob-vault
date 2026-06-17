---
title: pi-mono
created: 2026-04-26
updated: 2026-05-17
type: entity
tags: [agent, agent-framework, llm, tool, cli, open-source, typescript, monorepo]
sources: [raw/articles/pi-mono-2026.md]
---

# pi-mono

> Mario Zechner ([[badlogic]]) 的 AI agent 工具链 monorepo。@earendil-works/pi-mono
> MIT license，~192K LOC，667 TypeScript 文件。
> 核心哲学：**最小核心 + 强类型扩展系统**。不是规定工作流，而是通过扩展、技能和定制来适应你的工作流。

## Packages

| Package | LOC | Files | 职责 |
|---------|-----|-------|------|
| **[[pi-ai]]** | ~40K | 128 | 统一多 Provider LLM API（30+ Provider） |
| **[[pi-agent-core]]** | ~15K | 47 | Agent 运行时 + 工具调用引擎 |
| **[[pi-coding-agent]]** | ~100K | 363 | 编码 Agent CLI + 扩展系统 + 会话管理 |
| **[[pi-tui]]** | ~20K | 54 | 终端 UI 组件库（差分渲染） |
| pi-web-ui | ~15K | 75 | AI 聊天 Web 组件 |

## Architecture

```
pi-coding-agent (CLI + 扩展系统 + 会话管理)
        │
        ├── pi-agent-core (Agent 循环 + 工具调用)
        │       │
        │       └── pi-ai (统一 LLM API / Provider 抽象)
        │
        ├── pi-tui (终端 UI 差分渲染)
        └── pi-web-ui (Web 组件)
```

### pi-ai: 统一 LLM API

参见独立的 [[pi-ai]] 实体页面。

### pi-agent-core: Agent 运行时

核心：通用的 Agent 循环引擎，不关心 Agent 是做什么的。

**Agent 循环模型：**

```ascii
agentLoop(prompt, context, config)
  → outer loop (follow-up 消息)
    → inner loop (工具调用 + steering 消息)
      → streamAssistantResponse
      → executeToolCalls (sequential | parallel)
      → prepareNextTurn [可更换模型/thinking level]
      → shouldStopAfterTurn [优雅停止]
      → getSteeringMessages [中途注入消息]
    → getFollowUpMessages [完成后注入]
```

**关键抽象：**
- **`AgentMessage`** — 通过 TypeScript 声明合并（declaration merging）扩展的 LLM 消息类型
- **`AgentTool`** — TypeBox schema + `execute` 函数 + `prepareArguments` shim
- **`AgentEvent`** — 完整事件流（`agent_start → turn_start → message_* → tool_execution_* → turn_end → agent_end`）
- **`convertToLlm`** — 在 LLM 调用边界处将 AgentMessage[] 转换为 Message[]。Agent 可以在内部维护自定义消息类型

**关键设计：**
- 两层循环（内层工具 + steering，外层 follow-up）
- 每轮后可更换模型/thinking level（跨 Provider handoff）
- 强类型扩展（declaration merging）
- 工具并行执行（`beforeToolCall` + `afterToolCall` hook）

### pi-coding-agent: 编码 Agent CLI

**7 个默认工具:** read, write, edit (diff-based), bash (带有目录守卫), grep, find, ls

**4 种运行模式:**
- **Interactive** (默认) — 基于 pi-tui 的完整 TUI（Markdown 渲染、代码高亮、自动补全）
- **Print** (`-p`) — 单响应后退
- **JSON** (`--mode json`) — JSONL 事件输出
- **RPC** (`--mode rpc`) — stdin/stdout 进程集成

**AgentSession 核心类 (~3100 行):** 封装了 Agent 状态、事件订阅、模型管理、压缩、bash 执行、会话分支。

**System Prompt:** 非常简洁（~0.5KB）：

```markdown
You are an expert coding assistant operating inside pi...
Available tools: ...
Guidelines: - Be concise - Show file paths clearly
[加上 AGENTS.md 上下文 + skills]
```

没有 Phase 模型、没有 Intent Gate、没有 22KB 提示词。通过 AGENTS.md/CLAUDE.md 项目和 skills 系统提供上下文。

**扩展系统（ExtensionRunner, ~1068 行）：**
强类型事件驱动系统。Extension 是 TypeScript 模块，放置在 `~/.pi/agent/extensions/`。

60+ 事件类型覆盖 Agent 全生命周期：BeforeAgentStart、BeforeProviderRequest、工具执行、会话管理、树导航、输入事件。

**会话管理：** `~/.pi/agent/sessions/` 下的 JSONL 树文件。支持原地分支、压缩、fork。

### pi-tui: 终端 UI

自带差分渲染的 TUI 组件库。组件包括 Box、Text、Markdown、Editor（vi 风格键绑定）、SelectList、Input、Image 等。

### pi-web-ui: Web 组件

基于 pi-ai 的聊天 Web 组件。ChatPanel + 工具渲染器 + 设置对话框。

## 设计哲学

### 有意省略的特性

| 特性 | pi 的做法 |
|------|-----------|
| MCP | 用 CLI 工具或 Extension 替代 |
| 子 Agent | 用 tmux 或 Extension 替代 |
| 权限弹窗 | 放在容器里运行 |
| 计划模式 | 计划写文件 |
| 内置 TODO | 用 TODO.md |
| 内置编辑器 | 用内置 Editor 组件 |

### 与 oh-my-openagent 的哲学对比

- **pi:** "我们不规定你的工作流。"
- **oh-my-openagent:** "我们帮你做所有事。"

pi 选择极简核心 + 强类型扩展系统，所有功能通过 extension 实现。oh-my-openagent 选择最大功能集 + Hook 系统，所有功能内置。

### 代码质量惯例

- 无 `any` 类型（除非绝对必要）
- 无 inline imports
- 检查 node_modules 获取外部 API 类型声明
- `npm run check`（lint + format + typecheck）
- only run specific tests when needed: `npx vitest --run test/file.test.ts`

## Related

- [[pi-coding-agent]] — 编码 Agent 详细页面
- [[pi-ai]] — 统一 LLM API 详细页面
- [[oh-my-openagent]] — 对比的最大功能集方案
- [[hermes-agent]] — 另一种生产级 Agent 框架
- [[badlogic]] — Mario Zechner，作者
