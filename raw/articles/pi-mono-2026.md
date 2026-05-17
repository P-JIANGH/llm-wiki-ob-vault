# @earendil-works/pi-mono — AI Agent Toolkit Monorepo

**Source:** GitHub — earendil-works/pi-mono (https://github.com/earendil-works/pi-mono)
**Author:** Mario Zechner (@badlogicgames), ex-libgdx creator
**Captured:** 2026-05-17
**License:** MIT
**Runtime:** Node.js (TypeScript, ESM)
**Build:** npm workspaces, biome (linter/formatter), tsc (typecheck)

## Overview

pi-mono 是 Mario Zechner 的 AI agent 工具链 monorepo。包含 5 个 npm 包：

| Package | Version | Files | LOC | Description |
|---------|---------|-------|-----|-------------|
| @earendil-works/pi-ai | 0.74.1 | 128 | ~40K | 统一多 Provider LLM API |
| @earendil-works/pi-agent-core | 0.74.1 | 47 | ~15K | Agent 运行时，工具调用，状态管理 |
| @earendil-works/pi-coding-agent | 0.74.1 | 363 | ~100K | 编码 Agent CLI + 扩展系统 + 会话管理 |
| @earendil-works/pi-tui | 0.74.1 | 54 | ~20K | 终端 UI 组件库，差分渲染 |
| @earendil-works/pi-web-ui | 0.74.1 | 75 | ~15K | AI 聊天 Web 组件 |

**总计:** 667 文件，~192K LOC TypeScript

## 架构分层

```
pi-coding-agent (CLI + 扩展系统 + 会话管理)
        │
        ├── pi-agent-core (Agent 循环 + 工具调用)
        │       │
        │       └── pi-ai (多 Provider LLM API)
        │
        ├── pi-tui (终端 UI)
        └── pi-web-ui (Web UI)
```

### 1. pi-ai — Unified LLM API

定位：为 Agent 提供统一的 LLM Provider 抽象层。不是另一个 SDK 封装，而是 **Agent-first 的 LLM 调用接口**。

**支持的 Provider（30+）：** openai, anthropic, google, mistral, deepseek, groq, cerebras, xAI, openrouter, minimax, github-copilot (OAuth), openai-codex (OAuth), vertex-ai, amazon-bedrock, cloudflare, kimi-coding, xiaomi, together, fireworks, vercel-ai-gateway 等

**核心抽象：**

- **`Model<TApi>`** — 带类型的模型引用，通过 `getModel('openai', 'gpt-4o-mini')` 获取
- **`Context`** — 可序列化的对话上下文（systemPrompt + messages + tools），支持跨 Provider handoff
- **`stream(model, context, options)`** — 流式 LLM 调用，返回 `AssistantMessageEventStream`
- **`complete(model, context, options)`** — 非流式版本

**Provider 注册架构：**

```typescript
// API 注册表模式
registerApiProvider({ 
  api: "openai-responses",
  stream: streamFunction,    // (model, context, options) => EventStream
  streamSimple: simpleFn     // Simplified version with unified options
})

// 使用
stream(model, context)  // model.api 决定路由到哪个 provider
```

每个 Provider 实现必须将原始 API 转换为统一的事件流：
`start → text_start/text_delta/text_end → toolcall_start/toolcall_delta/toolcall_end → done/error`

**关键设计决策：**
- 只包含支持 tool calling 的模型（agentic workflow 必需）
- `stream()` + `complete()` 是仅有的两个 API
- `streamSimple()` 统一 thinking/reasoning 接口（所有 Provider 同一个参数格式）
- Context 可序列化为 JSON，跨 Provider handoff 无缝
- 惰性 Provider 加载（`register-builtins.ts` 用 lazy loader wrapper，不静态导入）

### 2. pi-agent-core — Agent 运行时

定位：通用的 Agent 循环引擎，不关心 Agent 是做什么的。

**核心概念：**

- **`AgentLoopConfig`** — Agent 循环配置，定义如何执行工具、转换消息、处理消息队列
- **`AgentMessage`** — 扩展消息类型（LLM Message + CustomMessage），通过声明合并扩展
- **`AgentTool`** — 工具定义（含 TypeBox schema、execute 函数、prepareArguments shim）
- **`AgentEvent`** — 事件流（agent_start → turn_start → message_start/update/end → tool_execution_start/update/end → turn_end → agent_end）

**Agent 循环逻辑（agent-loop.ts）：**

```
agentLoop(prompt, context, config)
  → outer loop (follow-up messages)
    → inner loop (tool calls + steering)
      → streamAssistantResponse (transformContext → convertToLlm → streamFn → parse events)
      → executeToolCalls (sequential or parallel)
      → prepareNextTurn hook
      → shouldStopAfterTurn hook
      → getSteeringMessages (mid-run queue)
    → getFollowUpMessages (post-run queue)
```

**关键设计：**
- **两层循环**：内层处理工具调用和 steering 消息，外层处理 follow-up 消息
- **`convertToLlm`**：AgentMessage[] → Message[] 转换器，在 LLM 调用边界处执行。Agent 可以维护自定义消息类型，只在调用 LLM 时才转换
- **`transformContext`**：AgentMessage[] → AgentMessage[] 转换器，用于上下文压缩
- **`prepareNextTurn`**：每轮后可以更换模型/thinking level，实现跨 Provider handoff
- **声明合并扩展**：`CustomAgentMessages` 接口通过 TypeScript 的 declaration merging 扩展

### 3. pi-coding-agent — 编码 Agent CLI

定位：完整的终端编码 Agent。基于 pi-agent-core + pi-ai，提供 7 个默认工具 + 扩展系统 + 会话管理 + 交互式 UI。

**7 个默认工具：**
- **read** — 读取文件内容（带行号）
- **write** — 写入文件
- **edit** — 编辑文件（基于 diff）
- **bash** — 执行 shell 命令（带目录守卫）
- **grep** — 搜索文件内容
- **find** — 查找文件
- **ls** — 列出目录

**4 种运行模式：**
- **Interactive** — 默认 TUI 模式，基于 pi-tui 构建（Markdown 渲染、输入框、语法高亮、自动补全）
- **Print** (`-p`) — 单响应退出
- **JSON** (`--mode json`) — JSONL 事件输出（适合管道集成）
- **RPC** (`--mode rpc`) — stdin/stdout 进程集成

**AgentSession 核心类（~3100 行）：**

AgentSession 是所有运行模式的共同基础，封装了：
- Agent 状态访问
- 事件订阅 + 自动会话持久化
- 模型和 thinking level 管理
- 上下文压缩（手动 + 自动）
- Bash 执行
- 会话切换和分支

**System Prompt 构建（system-prompt.ts）：**

与 oh-my-openagent 相反，pi 的 system prompt 非常简洁（~170 行构建器）：

```markdown
You are an expert coding assistant operating inside pi...
Available tools:
- read: ...
- bash: ...
- edit: ...
- write: ...

Guidelines:
- Be concise in your responses
- Show file paths clearly when working with files
[加上 AGENTS.md/CLAUDE.md 上下文文件和 skills]
```

即：**没有 Phase 0-3 工作流、没有 Intent Gate、没有 22KB 的提示词**。而是依赖 AGENTS.md/CLAUDE.md 项目上下文文件和 skills 系统。

**会话管理（SessionManager）：**

- 存储为 `~/.pi/agent/sessions/` 下的 JSONL 文件
- 每个 entry 有 `id`/`parentId` 形成树结构
- `leafId` 指针跟踪当前位置
- 支持原地分支（不丢失历史）
- 压缩系统：将旧 entry 折叠为摘要

**扩展系统（ExtensionRunner ~1068 行）：**

强类型事件驱动系统。Extension 通过 TypeScript 模块放置在 `~/.pi/agent/extensions/`：

事件类型（60+）：
- **Agent 生命周期:** `BeforeAgentStartEvent`, `AgentStartEvent`, `AgentEndEvent`
- **Provider:** `BeforeProviderRequestEvent`, `AfterProviderResponseEvent`
- **工具调用:** `BashToolCallEvent`, `ReadToolCallEvent`, `WriteToolCallEvent`, `EditToolCallEvent` 等
- **会话:** `SessionStartEvent`, `SessionShutdownEvent`, `SessionCompactEvent`
- **树导航:** `NavigateTreeEvent`, `BeforeForkEvent`
- **输入:** `InputEvent`, `UserBashEvent`

Extension 能力：
- 自定义工具、命令、键盘快捷键
- 所有生命周期阶段的事件处理器
- UI 组件和自定义弹窗
- 自定义 Provider（异步初始化）

**Compaction 系统：**

`core/compaction/` — 多个文件的复杂子系统
- `shouldCompact()` — 基于 token 数判断是否需要压缩
- `compact()` — 执行压缩，生成摘要
- `generateBranchSummary()` — 为分支生成摘要
- `findCutPoint()` — 找到最早的 cut point
- 支持手动（`/compact`）和自动（上下文溢出时触发）

### 4. pi-tui — Terminal UI 库

定位：自带差分渲染的终端 UI 组件库。专为 AI 聊天界面设计。

**组件：**
- **Box** — 容器（边框、背景、布局）
- **Text** / **TruncatedText** — 文本渲染
- **Input** — 输入框（历史、补全）
- **Markdown** — Markdown 渲染（代码高亮、表格）
- **Editor** — 多行编辑器（语法高亮、行号）
- **SelectList** — 选择列表（模糊搜索、键盘导航）
- **SettingsList** — 设置列表
- **Image** — 终端内嵌图像（iTerm2/Kitty）
- **Spacer** — 空白填充
- **Loader** / **CancellableLoader** — 加载动画

**关键特性：**
- 差分渲染：只更新变化的区域
- 自动补全支持
- 键盘快捷键系统（可配置，通过 keybindings.json）
- 编辑组件（vi 风格快捷键）
- 剪切环（kill ring）

### 5. pi-web-ui — Web UI 组件

定位：可复用的 AI 聊天 Web 组件，基于 pi-ai。包含：
- **ChatPanel** — 聊天面板组件
- **工具调用渲染器**
- **设置对话框**、**模型选择对话框**
- Markdown 渲染
- 消息存储（Storage abstraction）

## 关键设计决策

### 与 oh-my-openagent 的对比

| 维度 | pi-mono | oh-my-openagent |
|------|---------|-----------------|
| 架构哲学 | 最小核心 + 扩展系统 | 最大功能集 + Hook 系统 |
| Agent 提示词 | ~0.5KB（简洁） | ~22KB（完整的 Phase 模型） |
| 总 LOC | ~192K | ~294K |
| 文件数 | 667 | 2,041 |
| 运行模式 | 独立 CLI (Node.js) | OpenCode 插件 (Bun) |
| 多 Agent | 无内置（通过扩展或 tmux） | 11 个内置 Agent |
| Team Mode | 无（Slack bot 在独立仓库） | 内置 Team Mode v4.0 |
| 子代理 | None | Sisyphus 可委托给其他 Agent |
| 工具数量 | 7 默认 | 20-39（配置门控） |
| 扩展系统 | 60+ 事件类型，强类型 | Hook 系统，5 层 54-61 Hook |
| 会话管理 | 内置 JSONL 树 + 分支 | OpenCode 会话（外部） |
| 提示词大小 | ~0.5KB | ~22KB + Ultrawork + Team Mode 注入 |
| Provider 支持 | 30+ | 依赖于 OpenCode |
| License | MIT | SUL-1.0 |
| 安装 | npm install | bunx install |

### 有意省略的特性

pi 的设计哲学是有意省略某些特性，让用户通过扩展实现：

- **无 MCP 内置** — 用 CLI 工具或扩展
- **无子 Agent** — 用 tmux 或扩展
- **无权限弹窗** — 放在容器里运行
- **无计划模式** — 计划写文件
- **无内置 TODO** — 用 TODO.md
- **无编辑器** — 用内置 Editor 组件

### 代码质量约定

来自 AGENTS.md：
- 无 `any` 类型（除非绝对必要）
- 单次调用的单行辅助函数禁止（inline 替代）
- 检查 node_modules 获取外部 API 类型
- 禁止 inline import（`await import()` 在类型位置）
- `npm run check` 含 lint/format/typecheck
- 无 `npm run dev` / `npm run build` / `npm test`
- 测试用 `npx vitest --run test/file.test.ts`

## 对比分析

pi-mono 和 oh-my-openagent 代表了 Agent 编排的两种极端哲学：

**pi-mono（最小核心）：**
- 核心代码量小（pi-ai + agent-core ~55K LOC）
- 通过扩展系统而非内置功能来覆盖需求
- 提示词极简，依赖 AGENTS.md 和 skills
- 扩展系统是强类型的（TypeScript interface）
- 适合需要定制化工作流的用户

**oh-my-openagent（最大功能集）：**
- 内置 11 个 Agent 和 Team Mode
- 通过 54-61 Hook 覆盖所有生命周期
- 提示词工程极其精细（22KB 的 Phase 模型）
- Hook 系统是无类型的（`(input, output) => void`）
- 适合开箱即用的多 Agent 编排
