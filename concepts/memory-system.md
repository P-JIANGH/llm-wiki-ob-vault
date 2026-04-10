---
title: memory-system
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [agent, llm, architecture]
sources: [raw/articles/nanobot-readme-2026.md]
---

# Memory System（记忆系统）

AI Agent 中管理长期知识、对话历史和上下文窗口的架构设计。核心挑战：在有限上下文窗口内，维持"活"的记忆而不变成"噪声堆"。

## 常见模式

| 模式 | 说明 | 缺点 |
|------|------|------|
| 全部保留 | 无截断保留所有历史 | 上下文窗口爆炸 |
| 简单截断 | FIFO 丢弃旧消息 | 丢失重要长期知识 |
| 摘要归档 | 定期摘要旧对话 | 摘要质量不稳定 |
| 分层记忆 | 分 session/history/memory 层 | 架构复杂 |

## MemPalace：Raw Verbatim + Semantic Search

位于 `mempalace/`（v3.1.0），2026 年 3 月开源。

**核心理念**：不摘要，只存储原文，语义搜索找到它。96.6% LongMemEval R@5（raw 模式，0 API 调用）。

### 存储架构

```
ChromaDB（向量）                    SQLite（知识图谱）
mempalace_drawers 集合              knowledge_graph.sqlite3
├── verbatim 原文                   entities + triples
├── metadata: wing/room/hall        valid_from / valid_to 时态窗口
└── 无摘要                         无 LLM 调用
```

### Palace 层级隐喻

```
Wing（人物/项目）
  └─ Hall（走廊类型：facts/events/discoveries/preferences/advice）
       └─ Room（主题，如 auth-migration）
            └─ Closet（摘要指针）→ Drawer（verbatim 原文）
```

同 Room 跨多个 Wing 时产生 **Tunnel**（跨域关联隧道）。

### 4 层记忆栈

| 层 | 内容 | 加载时机 |
|----|------|---------|
| L0 | Identity（身份） | 始终 (~50t) |
| L1 | Critical Facts（关键事实，AAAK） | 始终 (~120t) |
| L2 | Room recall（按 wing/room） | 话题出现时 |
| L3 | Deep Search（全量语义搜索） | 显式搜索时 |

wake-up 总量：L0+L1 ≈ **170 tokens**，$0.70/年。

### Specialist Agents

每个 agent（reviewer/architect/ops）独立 wing + AAAK diary：
```python
mempalace_diary_write("reviewer", "PR#42|auth.bypass.found|pattern:3rd.time|★★★★")
mempalace_diary_read("reviewer", last_n=10)
```

### WAL 审计

每次写入先记 `~/.mempalace/wal/write_log.jsonl`（审计 + 防污染）。

### 与 nanobot 的本质区别

| 维度 | nanobot | MemPalace |
|------|---------|-----------|
| 存储 | LLM 摘要写入文件 | verbatim 原原文 + ChromaDB |
| 触发 | Consolidator（FIFO）+ Cron Dream | Hook 触发（Stop / PreCompact） |
| 检索 | prompt 内追加 | 语义搜索 + KG 查询 |
| 格式 | Markdown 文件 + GitStore | ChromaDB + SQLite |

## nanobot：Dream 两阶段系统

位于 `nanobot/agent/memory.py`（~675行）。

### Stage 1 — Consolidator（压缩）

触发条件：当前对话 token 数接近 context window 阈值。

```
对话历史（膨胀） → LLM 摘要 → 追加写入 history.jsonl
```

`history.jsonl` 格式（append-only，cursor-based）：
```json
{"cursor": 42, "timestamp": "2026-04-03 00:02", "content": "- User prefers dark mode\n- Decided to use PostgreSQL"}
```

关键设计：
- append-only：不怕崩溃，不必原地修改
- cursor-based：Consolidator 写指针 `.cursor`，Dream 消费指针 `.dream_cursor`
- 机器优先：JSONL 格式便于程序解析

### Stage 2 — Dream（整合）

调度方式：Cron（默认每 2 小时）/`/dream` 命令触发。

```
读取：
  - history.jsonl 新条目（自上次 Dream 以来）
  - SOUL.md（bot 风格/voice）
  - USER.md（用户偏好）
  - MEMORY.md（项目事实）

两阶段 LLM 工作：
  Phase 1 — 研究：理解新旧内容关系
  Phase 2 — 编辑：最小改动写入 SOUL.md / USER.md / MEMORY.md
```

关键设计：
- **最小编辑**：不重写，只改必要部分
- **GitStore 版本化**：每次 Dream 变更后 commit，可审计、可还原
- **工具预算**：`maxIterations` 控制编辑阶段 LLM 调用次数（安全上限）

### 文件结构

```
workspace/
├── SOUL.md              # bot 的 voice 和沟通风格
├── USER.md              # 稳定用户知识（偏好/习惯）
└── memory/
    ├── MEMORY.md        # 项目事实、决策记录
    ├── history.jsonl    # append-only 历史摘要（机器用）
    ├── .cursor          # Consolidator 写指针
    ├── .dream_cursor    # Dream 消费指针
    └── .git/            # GitStore 版本历史
```

### 命令接口

- `/dream` — 立即触发 Dream
- `/dream-log` — 查看最近一次 Dream 变更
- `/dream-log <sha>` — 查看指定版本
- `/dream-restore` — 列出可还原版本
- `/dream-restore <sha>` — 还原到指定版本

## 相关概念

- [[nanobot]] — memory-system 的具体实现（Dream 两阶段）
- [[mempalace]] — Raw verbatim + semantic search 系统（无摘要）
- [[deer-flow-memory]] — DeerFlow 的 fact 提取式记忆（LLM 驱动）
- [[agent-loop]] — 上下文构建时调用 MemoryStore
- [[provider-registry]] — 同为"注册表+数据驱动"的可扩展架构
