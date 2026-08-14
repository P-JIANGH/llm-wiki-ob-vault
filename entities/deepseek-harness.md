---
title: DeepSeek Harness
created: 2026-08-14
updated: 2026-08-14
type: entity
tags: [harness, agent, agent-framework, plugin, typescript, open-source, tool-calling, event-sourcing, capability-seam, deepseek]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: high
---

# DeepSeek Harness

## Overview

**DeepSeek Harness（`dsh`）** 是 DeepSeek AI 官方开源的 **agent harness（智能体运行时框架）**，MIT 协议，当前 0.1.0-rc.5（开发者预览，快速迭代，官方声明有破坏性变更）。

与"一个 agent 应用"的区别：它是**承载 agent 的框架** —— 你可以用它运行自己的 agent（Web UI / headless / ACP），也可以把 Claude Code、Codex 桥接进来当执行后端。架构核心是**一切皆插件**，底层由 [Cordis](cordis.md) 插件框架驱动（vendored，`@deepseek-ai/cordis` v4.0.1），设计源自论文《A Programming Paradigm for Spatiotemporal Composability》。

- **CLI:** `dsh web`（Web UI @ 127.0.0.1:3080）/ `dsh --profile headless "task"`（一次性 runner）
- **npm:** `npx @deepseek-ai/dsh web`
- **Tech stack:** TypeScript monorepo（pnpm，Node ^22.19 || >=24），~2085 个 TS 源文件，49 个包组、~130+ 工作区包
- **Python SDK:** `python/sdk`（JSON-RPC stdio 客户端）
- **Home:** https://github.com/deepseek-ai/deepseek-harness

## Core Architecture

### 1. 一切皆插件（Cordis）
**没有特权核心**：模型适配器、工具注册表、会话日志、甚至 agent loop 本身都是插件，全部可从配置替换（见 [[plugin-everything-architecture]]）。

- **Context** 是服务仓库：服务占用稳定 `ctx.<key>`（`ctx.tools` / `ctx.llm` / `ctx.sessions`），插件通过 key 找服务而非 import 具体实现
- **inject 声明依赖**：加载顺序由服务依赖表达
- **可逆副作用**：注册都通过 `ctx.effect()` / `ctx.on()`，插件卸载时自动回滚
- **四种事件派发**：`emit`（观察）/ `waterfall`（中间件链，需调 next()）/ `parallel`（并行）/ `serial`（按序）

### 2. Capability Seam（能力接缝）
每个可替换能力拆成三角色：**Service Definition**（接口）/ **Service Provider**（实现）/ **Consumer**（模型工具）。换 provider（本地 bash → 远程沙箱 → pwsh）不影响模型可见契约（见 [[capability-seam]]）。

核心接缝：`llm`、`shell`、`fs`、`subprocess`、`terminal`、`web`、`lsp`、`skill`、`subagent`、`sandbox`、`compaction`、`code-runtime`、`jobs`、`approval`。

### 3. 事件溯源会话日志
`Session` 是 append-only 的 `SessionEvent` 日志 —— 单一事实来源。LLM 消息历史**从日志派生**（`deriveMessages()`），不单独存储。"模型可见 ⇒ 已记录"是运行时不变式（见 [[event-sourced-session-log]]）。

### 4. Turn/Step 循环
turn = 0+ 个 step；step = 一次模型请求 + 其调用的工具。完整流水线见 [[agent-turn-step-loop]]。

## Key Subsystems

| 子系统 | ctx key | 说明 |
|---|---|---|
| session | `ctx.sessions` | append-only SessionEvent 日志 + 内存 store |
| system-prompt | `ctx.systemPrompt` | prompt 分段 + 工具 schema 组装 |
| tools | `ctx.tools` | 作用域工具注册表 + 受管执行流水线 |
| agent | `ctx.agents` | Agent 接口、live 注册表、initiator 传播 |
| agent-loop | `ctx.agentLoop` | 默认驱动（ReactLoopAgent） |
| llm | `ctx.llm` | LLM 适配器注册表（deepseek / pi-ai / replay） |
| subagent | `ctx.subagents` | 6 个 provider：in-process / acp / codex / claude-code / dsh-sdk |
| sandbox | `ctx.sandbox` | 进程沙箱（landlock Linux / Windows ACL 受限令牌） |
| compaction | `ctx.compaction` | 上下文压缩（surface replace 摘要） |
| web | `ctx.web` | 搜索（Exa/Perplexity/DeepSeek）+ fetch |

## Engineering Culture

- **1372 个 Agent Notes**（`.agents/notes/`，implemented/proposed/rejected/archived 四态）—— 用 agent 开发 agent 的工程文化，每个架构决策可检索
- 双语文档体系（.md + .zh.md + .i18n.yaml 配对），生成式目录（config-catalog / tool-catalog / module-graph / capability-seams 图）
- 严格规则：非平凡变更必须带 Agent Note；同进程 typed 边界不重复运行时校验；switch on discriminant tags；waterfall 必须调 next()

## Related

- [[cordis]] — 底层插件框架
- [[capability-seam]] — 三角色模块化模式
- [[event-sourced-session-log]] — 会话日志架构
- [[agent-turn-step-loop]] — turn/step 生命周期
- [[plugin-everything-architecture]] — 一切皆插件扩展模型
- [[agent-harness-frameworks]] — 与其他 harness 对比
- [[openharness]] — Claude Code 的 Python 开源复刻（另一条路线）
- [[learn-claude-code]] — 从零构建类 Claude Code agent harness 的课程
- [[agent-loop-architecture]] — agent loop 通用概念
- [[agent-design-principles]] — agent 设计原则

## Sources

- `raw/articles/deepseek-harness-2026.md`（本地仓库 F:\deepseek-harness 完整源码研究，2026-08-14）
