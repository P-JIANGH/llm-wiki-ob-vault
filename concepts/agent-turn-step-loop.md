---
title: Agent Turn-Step Loop
created: 2026-08-14
updated: 2026-08-14
type: concept
tags: [agent, agent-framework, workflow, state-machine, event-driven, architecture]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: high
---

# Agent Turn-Step Loop（回合-步骤循环）

## Definition

**Turn-Step 循环** 是 [DeepSeek Harness](deepseek-harness.md) agent 驱动（agent-loop）的核心执行模型：

- **step（步骤）** = 一次模型请求 + 它调用的工具
- **turn（回合）** = 0+ 个 step：在第一个输入被认领前打开，一旦没有欠账就关闭

一个 agent 交互被建模为嵌套的 turn → step → 工具执行，每一层都有 durable session event（见 [[event-sourced-session-log]]）。

## Turn Flow（完整流水线）

```
turn/start
  claim next-step input + 1 queued next-turn message
  assemble prompt sections + tool schemas（ctx.systemPrompt）
  -> agent/pre-step                [waterfall] reject | enter(messages)
     reject / 空 enter → turn 无 step 关闭
     step/start
     append user/message
     deriveMessages → agent/request [waterfall] → llm/stream
       → assistant/chunk* → assistant/message
     tool/call* → tools/pre-execute → tools/execute → tools/post-execute → tool/result*
     step/end
     工具还欠请求，或 next-step 输入到达 → claim → 下一 step
  -> agent/turn-stopping           [serial]
turn/end
```

事件分三类：
- **Durable session events**：`turn/*`、`step/*`、`user/message`、`assistant/*`、`tool/*` —— 持久化事实
- **Live agent events**（`agent/*`）：`created`、`disposed`、`status`、`inbox/*`、`pre-step`、`request`、`request-error`、`session-start`、`turn-stopping` —— 观察/拦截在飞工作
- **Capability events**（`fs/*`、`tools/*`、`telemetry/*`）：给 seam 挂政策和适配器

## Agent Handle

`Agent` 是每个插件（UI、hooks、orchestrators）编程对向的接口：

- `send(message, target, wakeup)` — 路由到 inbox 边界（`next-turn` / `next-step`）
- `followup()` — 排队普通后续回合并唤醒
- `steer()` — 最近 step 的转向输入（运行中在下一步边界消费）
- `inject()` — 排队模型面向上下文，**不唤醒**（下一 pre-step 认领）
- `cancel(cause, options)` — 清队列 + abort 活跃 turn；cause: user | parent | hook | disposed
- `whenIdle()` — 整个 agent 活动达到静止
- `runMaintenance()` — turn 间维护任务（compaction 用）
- Status: `idle` | `running`

Inbox = 两个有序 pending 队列（next-turn / next-step），agent 拥有作为 durable 投影；`claim()` 移除 proposed step batch（所有 next-step + turn 边界时 1 个 next-turn）。

## 关键机制

### agent/pre-step（waterfall）
唯一在请求派生前的 serial listener chain。监听器可以 **reject**（不开 step）或 **enter**（替换进入 step 的消息批次）。被 reject 的消息不丢弃也不重发，turn 无 step 关闭并记录尝试。`PreStepDecision = { kind: 'reject' } | { kind: 'enter'; messages }`。

### agent/request（waterfall）
替换冻结的 call config。`await next()` 得到机器将用的 config（首次请求用 agent options，之后用 logged header）；可返回替换。**不能改消息** —— 模型可见内容必须走 logged channels。

### 工具调度（executeToolCalls）
- **exclusive** 调用形成屏障（单独跑）；**parallel** 调用滚动池并行（`isConcurrencySafe` 决定）
- 结果按**模型顺序**提交；abort 为未启动调用记录合成 error result 保持 replay 有效
- `deferContext()` 给复合工具嵌套派发上下文；`concludeTurn()` 标记终端结果（提前结束 turn）
- Code Mode：`run_code` 子调度经 `tools/code-dispatch-log` waterfall

### max-tokens sticky
一旦某 step 达 max-tokens 上限，后续正常完成的 step **不得降级** turn 结局。

### 错误恢复
`agent/request-error`（waterfall）：failed model step 关闭后、turn 关闭前运行；监听器可返回 `{ kind: 'retry' }`（拥有恢复）或 delegate（默认 terminal）。

## 设计要点

- **输入经一个 inbox**：某些消息立即唤醒驱动；injected context 在 inbox 等另一消息唤醒
- **turn/end 在无 step 时也记录**（reject / empty / cancelled / failure）—— 尝试本身可审计
- 扩展插件依赖 `agent`（含需要 initiator 时），**不依赖 agent-loop** —— loop 保持可替换

## Related

- [[deepseek-harness]] — 架构宿主
- [[event-sourced-session-log]] — 循环的 durable 记录层
- [[agent-loop-architecture]] — agent loop 通用概念
- [[plugin-everything-architecture]] — pre-step/request 是插件扩展点
- [[capability-seam]] — 工具执行经 ctx.tools seam
- [[agent-design-principles]] — 更通用原则

## Sources

- `raw/articles/deepseek-harness-2026.md`（docs/architecture.md、docs/subsystems/core.md、packages/core/agent-loop/src/agent.ts）
