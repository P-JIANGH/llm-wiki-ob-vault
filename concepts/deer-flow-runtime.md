---
title: DeerFlow-Runtime
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [runtime, langgraph, streaming, architecture]
sources: [modules:runtime/__init__.py+runtime/runs/manager.py+runtime/stream_bridge/base.py+runtime/serialization.py]
---

# DeerFlow Runtime 系统

DeerFlow 中 LangGraph agent 的执行环境，包括：RunManager（生命周期）、StreamBridge（流式解耦）、Checkpointer（状态持久化）、Store（KV存储）。

## RunManager（Run 生命周期）

内存中的 run 记录表（asyncio.Lock 保护）：

```python
@dataclass
class RunRecord:
    run_id: str
    thread_id: str
    status: RunStatus  # PENDING/RUNNING/CANCELLED/FAILED/COMPLETED
    multitask_strategy: str  # reject/parallel/cancel
    task: asyncio.Task | None  # 关联的 asyncio task
    abort_event: asyncio.Event  # 中断信号
    error: str | None
```

**状态流转**：`PENDING → RUNNING → COMPLETED/FAILED/CANCELLED`

**multitask_strategy**（同一 thread_id 多个并发 run 时）：
- `reject`：后来的 run 被拒绝（默认）
- `parallel`：允许并行
- `cancel`：取消旧 run

## StreamBridge（生产者-消费者解耦）

**问题**：LangGraph agent（生产者）在 asyncio task 中运行，SSE endpoint（消费者）在 HTTP 连接中。如何桥接？

**解决**：发布-订阅队列 + 事件迭代器。

```python
class StreamBridge(ABC):
    async def publish(self, run_id: str, event: str, data: Any) -> None:
        """生产者：发布单个事件"""

    async def publish_end(self, run_id: str) -> None:
        """生产者：结束信号"""

    def subscribe(self, run_id: str, *, last_event_id=None, heartbeat_interval=15.0):
        """消费者：async iterator"""
        # yield HEARTBEAT_SENTINEL（保活）
        # yield END_SENTINEL（结束）
```

**MemoryStreamBridge**：内存队列实现，存储在 `_queues: dict[str, deque]`。

**事件类型**：`metadata` / `updates` / `events` / `error` / `__end__`

**Sentinel**：`HEARTBEAT_SENTINEL`（15s 无数据保活）+ `END_SENTINEL`（结束）

## Checkpointer（状态持久化）

LangGraph 的 checkpointing = 对话状态快照，可中断恢复：

| Backend | Package | 持久性 |
|---------|---------|--------|
| `memory` | 内置 `InMemorySaver` | 进程内，非持久 |
| `sqlite` | `langgraph-checkpoint-sqlite` | 单机文件 |
| `postgres` | `langgraph-checkpoint-postgres` | 跨机器 |

**工厂模式**：`get_checkpointer()` 根据 config 返回对应实现。

**用途**：Agent 对话中断后，可以从上一个 checkpoint 恢复而不丢失状态。

## Store（KV 存储）

跨 run 的持久 KV 层（`runtime/store/`）：
- 进程内 store（`MemoryStore`）
- 跨进程 store（`AsyncProvider`）

用于跨对话记忆（如用户偏好、工作区元数据）。

## 序列化

`runtime/serialization.py` 将 LangGraph 内部对象（messages/tool calls/LC objects）序列化为 JSON：

```python
serialize_messages_tuple(messages) -> list[dict]
serialize_lc_object(obj) -> dict
serialize_channel_values(state) -> dict
```

用于：SSE 传输（JSON）、checkpointing（JSON）、持久化。

## 整体进程架构

```
nginx (port 2026)
  ├── frontend (port 3000) — Next.js Web UI
  ├── langgraph_server (port 2024) — agent runtime
  │     └── RunManager + StreamBridge + Checkpointer
  └── gateway_api (port 8001) — REST API
        └── FastAPI routes（models/mcp/skills/memory/uploads/threads/artifacts/channels）
```

**Gateway mode**：LangGraph Server 嵌入 Gateway API，无需独立进程。

## 相关概念

- [[langgraph]] — DeerFlow runtime 基于 LangGraph 的 checkpointing 和 streaming
- [[deer-flow]] — runtime 系统的宿主框架
- [[deer-flow-sandbox]] — runtime 中的 sandbox 生命周期（acquire/release）
- [[deer-flow-subagent]] — runtime 中的 subagent 执行（scheduler pool）
