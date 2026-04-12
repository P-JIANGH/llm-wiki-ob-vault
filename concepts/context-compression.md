---
title: context-compression
created: 2026-04-13
updated: 2026-04-13
type: concept
tags: [llm, context-window, memory, summarization, agent]
sources: [raw/articles/hermes-agent-source-2026.md]
---

# Context Compression

在大规模多轮对话中管理 LLM 上下文窗口的技术。当对话长度接近模型的 context limit 时，需要压缩历史消息同时保留关键信息。

## 四阶段压缩算法（hermes-agent 实现）

```
┌─────────────────────────────────────────────────────┐
│  1. Prune     : 旧 tool result → "[Old tool...]"  │
│  2. Protect H : 前 N 条（系统提示 + 早期对话）      │
│  3. Protect T : 最近 X tokens（token 预算）          │
│  4. Summarize : Middle turns → LLM 摘要（结构化）   │
└─────────────────────────────────────────────────────┘
```

**hermes-agent（ContextCompressor）的特点：**

- **Prune 先于 Summarize**：先做廉价的字符串替换（无 LLM 调用），减少需要摘要的内容量
- **Tail 按 token 预算而非固定条数**：大上下文模型（128K+ tokens）需要保护的尾部内容更多
- **结构化摘要模板**：Goal / Progress / Decisions / Files / Next Steps / Critical Context / Tools & Patterns
- **迭代摘要**：多次压缩时，新的摘要会增量更新，保留之前已压缩的信息
- **摘要失败冷却**：10 分钟冷却期，失败后跳过摘要直接丢弃中间消息，避免反复失败

## 工具对完整性（Orphan Repair）

压缩后可能出现：
- tool_call 存在但 tool_result 丢失 → API 报错 "No tool call found"
- tool_result 存在但 tool_call 被移除 → API 报错 "Orphaned tool result"

`_sanitize_tool_pairs` 修复这两类孤儿（移除孤立结果，插入空结果桩）。

## 与其他方案对比

| 方案 | 原理 | 优点 | 缺点 |
|------|------|------|------|
| **Context Compression** | 摘要 + 丢弃 | 保留语义，可迭代 | LLM 调用有成本/失败率 |
| **Mixture of Agents** | 多 Agent 分工 | 专业化 | 额外 LLM 调用 |
| **Retrieval** | 向量数据库检索 | 可精确回溯 | 检索质量不稳定 |

## Related

[[hermes-agent]] [[tool-registry-pattern]] [[agent-loop-architecture]]
