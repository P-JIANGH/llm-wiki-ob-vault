---
title: Capability Seam
created: 2026-08-14
updated: 2026-08-14
type: concept
tags: [architecture, design-pattern, plugin, capability-seam, agent-framework]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: high
---

# Capability Seam（能力接缝）

## Definition

**Capability Seam（能力接缝）** 是 [DeepSeek Harness](deepseek-harness.md) 中"可替换能力"的模块化模式：一个可替换能力拆成**三个角色**，分别放在独立包中：

1. **Service Definition** — Cordis `Service` + vocabulary types，拥有 `ctx.<key>`，只依赖契约所需词汇。它是一个 `Service`（抽象类或具体注册表服务），**绝不**是 TS `interface`
2. **Service Provider** — 提供/注册实现的插件（如 `dsh-bash-local`、`dsh-bash-sandbox`）
3. **Consumer** — 模型和插件编程对向（如 `dsh-tool-bash`：`bash` 工具 schema）

三者中**任何一个角色都不构成 seam**。一个完整的接缝 = Service Definition + 一个或多个 Provider + 一个或多个 Consumer。

## Why

可替换能力的三个关注点以**不同速率、因不同原因**变化：
- **契约**（能力是什么）—— 极少变
- **实现**（怎么跑）—— 常变（本地 → 沙箱 → 远程）
- **消费者 API**（模型/插件对向）—— 变但独立

如果合并一个包，换本地 executor 为沙箱 executor 会牵连模型看到的工具 schema，即使模型契约从未变。拆分后：**Service Provider 和 Consumer 独立演进，新后端永不冒模型契约风险**。

这不同于"运行时谁提供/谁需要能力"（Cordis services + `inject` 已解决），seam 决定的是**包边界**。

## Canonical Example（bash 三件套）

| 角色 | 包 | 内容 |
|---|---|---|
| Service Definition | `dsh-shell` | `ShellExecutor`、`ShellRunResult`、`ShellProcess` 词汇，`ctx.shell` |
| Service Provider | `dsh-bash-local` / `dsh-bash-sandbox` / `dsh-pwsh-local` | 子进程、进程组 kill、沙箱包装 |
| Consumer | `dsh-tool-bash` / `dsh-tool-pwsh` | `bash` 工具 schema + 后台任务注册 |

换执行器（本地 bash → landlock 沙箱 → Windows pwsh）不影响模型怎么请求 bash。

## Variants（何时不分拆）

- **LLM seam 折叠了 Definition 和 Consumer**：Consumer 是 loop 本身（不是可替换的 schema 表面），适配器作为 Provider 包（`llm-deepseek` / `llm-pi-ai` / `llm-replay`）
- **subagent 是"多 provider 并存"变体**：`ctx.subagents` 按名注册多个 provider（in-process / acp / codex / claude-code / dsh-sdk），不同于 bash 的单执行器 —— 其注册表跟随 LLM adapter registry 模式
- **web 是一个接缝两个操作**（search + fetch）：一个 provider-selection 政策所有者、一个 abort/error 词汇，但 Provider 分 `WebSearchProvider` / `WebFetchProvider` 注册能力（非工具）

## Full Seam Inventory（dsh）

`ctx.llm`、`ctx.shell`、`ctx.subprocess`、`ctx.fs`、`ctx.terminal`、`ctx.web`、`ctx.lsp`、`ctx.skills`、`ctx.subagents`、`ctx.sandbox`、`ctx.compaction`、`ctx.codeRuntime`、`ctx.jobs`、`ctx.approval`、`ctx.sessionPersistence`、`ctx.settings`、`ctx.credentials`、`ctx.sessionTelemetry`、`ctx.storage`、`ctx.sessionQuery`、`ctx.sessionTitle`、`ctx.userQuestions`、`ctx.directoryPicker`、`ctx.workflowEngine`、`ctx.spillStore`、`ctx.attachments`

## Trade-offs

- **代价**：拆分增加包和样板（package.json、tsconfig、README、injection wiring）
- **收益**：Provider 和 Consumer 独立发布/版本化；新后端零风险触碰模型契约
- **不预拆分**：一个能力只有一个想象 provider 和一个 Consumer 时保持单包，直到第二个出现

## Related

- [[deepseek-harness]] — 模式起源
- [[cordis]] — 底层框架（service + inject + events）
- [[plugin-everything-architecture]] — "一切皆插件"总架构
- [[agent-loop-architecture]] — 核心 spine 如何消费 seams
- [[agent-design-principles]] — 更通用的 agent 设计原则

## Sources

- `raw/articles/deepseek-harness-2026.md`（docs/capability-seams.md、Agent Note 2026-06-13-capability-seams）
