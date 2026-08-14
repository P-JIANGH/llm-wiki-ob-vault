---
title: Event-Sourced Session Log
created: 2026-08-14
updated: 2026-08-14
type: concept
tags: [event-sourcing, event-driven, memory, context, agent-framework, architecture]
sources: [raw/articles/deepseek-harness-2026.md]
confidence: high
---

# Event-Sourced Session Log（事件溯源会话日志）

## Definition

**事件溯源会话日志** 是 [DeepSeek Harness](deepseek-harness.md) 会话的核心架构：`Session` 是 **append-only** 的 `SessionEvent` 日志 —— 一个 agent 完整交互历史的**单一事实来源**。LLM 消息历史**从日志派生**（`deriveMessages()`），**不单独存储**；重放就是重新派生。

核心不变式：**"模型可见 ⇒ 已记录"**（Model-visible ⟺ logged）。任何到达模型请求的内容必须能从日志重构 —— 新的模型可见输入必须新增 session event 类型。

## SessionEventMap（事件词汇）

**merge-extensible**：插件通过 TypeScript declaration merging 扩展事件类型（如 compaction 插件添加 `compaction/start`/`summary`/`end`）。

Core 事件：

| 事件 | 内容 |
|---|---|
| `turn/start` / `turn/end` | 打开/关闭 turn（reason: completed/blocked/max-tokens/aborted/error） |
| `step/start` / `step/end` | 打开/关闭 step（一次模型请求 + 工具执行） |
| `user/message` | 用户角色消息（直接 prompt / agent.inject() 注入 / goal 续轮） |
| `assistant/chunk` | 原始流块 —— token 级重放保真 |
| `assistant/message` | 组装好的助手消息（含 usage） |
| `tool/call` | 模型请求的工具调用（raw arguments JSON） |
| `tool/result` | 工具结果（message + error identity + opaque meta） |
| `todo/write` | 整个 todo 列表快照 |
| `request/header` | EpochHeader（call config + system prompt + tool schemas） |
| `request/context` | 路由容量元数据 |
| `session/end-seed` | 构造种子结束标记 |

## SessionEvent 结构

- proper discriminated union over `type`：`switch (event.type)` 窄化 `event.data`，无需 cast
- `seq = log.length` 单调连续；事件不可变 deep-frozen
- `Session.append()` 在 append 时校验 JSON 可序列化（BigInt/function/Map/Date 等拒绝）和 surface 契约 —— 坏事件在源头失败而非后端 flush 时
- **`ignorable: true`** 标记纯信息记录；缺省 = required（reader 遇到未识别类型必须 refuse 而非静默丢弃）

## Surface 机制（模型可见历史）

三个**消息产生型事件**（`SurfaceEventType`: user/message, assistant/message, tool/result）带 `SurfaceOp`：
- `'append'` — 正常尾部追加
- `{ op: 'replace', start, end }` — 用新节点替换 start..end 表面节点（compaction 用）

`Session.surface` 是 readonly live 投影；`deriveMessages()` 按 surface 节点顺序折叠派生模型历史。**compaction 通过 replace 把一段 surface 摘要成一个 user/message**，被影子的原始事件仍在日志中（可审计、可追溯）。

## 为什么这是上下文管理的根基

1. **重放保真**：raw `assistant/chunk` 保留 token 级流式细节，UI 渲染和重放一致
2. **可压缩**：surface replace 让 compaction 无模型改写历史，影子节点不丢
3. **可派生**：fork、resume、transcript、telemetry、title 全部从同一 log 派生
4. **可持久化**：`SessionPersistence` seam（JSONL / SQLite 后端）+ session/flush checkpoint + 崩溃恢复
5. **可审计**：坏事件源头拒绝；unrecognized 事件 refuse 而非静默丢

## 相关类型

- `EpochHeader`（request/header 事件）：call config + adapterDefaults + system + tools，最新快照重构；`foldRequestHeader(events)` 选择最新 snapshot
- `Branded ID`：`CallId`（工具调用关联）、`SessionId`（agent/session 共享身份）—— 跨包边界类型安全

## Open Questions / Debates

- 日志增长 → 需要 compaction（surface replace）作为一等公民；token-meter 测量影子内容
- 事件溯源 vs 直接存消息数组：前者强在重放/审计/派生，后者简单但不可重放

## Related

- [[deepseek-harness]] — 架构宿主
- [[agent-turn-step-loop]] — 事件在 turn/step 生命周期中的位置
- [[capability-seam]] — 持久化也是 seam（JSONL/SQLite 可换）
- [[plugin-everything-architecture]] — SessionEventMap 通过声明合并扩展
- [[deepseek-harness]] — 上下文管理根基（compaction 是 surface replace 的主要消费者）

## Sources

- `raw/articles/deepseek-harness-2026.md`（docs/subsystems/session.md、persistence.md、core.md）
