---
title: DeerFlow-Subagent
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [subagent, agent, executor, architecture]
sources: [modules:subagents/executor.py+subagents/registry.py+subagents/config.py+subagents/builtins/*]
---

# DeerFlow Subagent 系统

DeerFlow 中将复杂任务委托给后台子 Agent 执行的机制，核心是 `SubagentExecutor` + 三线程池架构。

## SubagentConfig

```python
@dataclass
class SubagentConfig:
    name: str
    description: str
    max_turns: int              # 最大 LLM 推理轮数
    timeout_seconds: int        # 超时（默认900秒=15分钟）
    allowed_tools: list[str]    # 工具白名单（非 all）
```

两种内置类型：
- **general-purpose**：完整工具集（除 task tool 本身）
- **bash**：命令执行专家（只有 bash 工具）

## 三线程池架构

```python
_scheduler_pool = ThreadPoolExecutor(max_workers=3, thread_name_prefix="subagent-scheduler-")
_execution_pool = ThreadPoolExecutor(max_workers=3, thread_name_prefix="subagent-exec-")
_isolated_loop_pool = ThreadPoolExecutor(max_workers=3, thread_name_prefix="subagent-isolated-")
```

| 池 | 用途 | 等待什么 |
|---|------|---------|
| `_scheduler_pool` | 接收 task tool 调用，提交执行任务 | 编排调度 |
| `_execution_pool` | 实际运行 LangGraph sub-agent | 有超时支持（15min） |
| `_isolated_loop_pool` | sync 调用（事件循环已运行时） | 避免死锁 |

## 执行流程

```
主 Agent
  └── task({"prompt": "...", "agent": "general-purpose"})  # tool_call
        │
        ▼
SubagentExecutor.submit()
  ├── scheduler pool: 包装 SubagentTask，提交到 execution pool
  │
  ▼
execution pool: SubagentExecutor._execute()
  ├── 创建 LangGraph sub-agent（对应 agent type）
  ├── 以 task_id 为 thread_id 运行
  ├── 超时控制（asyncio.wait_for + SubagentConfig.timeout_seconds）
  └── 状态更新: PENDING → RUNNING → COMPLETED/FAILED/TIMED_OUT
        │
        ▼
SSE events 流向订阅者
  task_started → task_running (×N) → task_completed/task_failed/task_timed_out
        │
        ▼
_background_tasks[task_id] = SubagentResult(result/error)
```

## SubagentResult

```python
@dataclass
class SubagentResult:
    task_id: str
    trace_id: str          # 分布式 tracing ID，连接父子日志
    status: SubagentStatus  # PENDING/RUNNING/COMPLETED/FAILED/CANCELLED/TIMED_OUT
    result: str | None
    error: str | None
    started_at: datetime
    completed_at: datetime
    ai_messages: list[dict]  # 完整 AI 消息列表（用于审计/回放）
    cancel_event: threading.Event
```

## Registry：config.yaml 覆盖

`get_subagent_config(name)` 查 BUILTIN_SUBAGENTS → 合并 config.yaml overrides：

```python
effective_timeout = app_config.get_timeout_for(name)    # YAML 覆盖
effective_max_turns = app_config.get_max_turns_for(name, config.max_turns)
config = replace(config, timeout_seconds=effective_timeout, max_turns=effective_max_turns)
```

允许在 config.yaml 中按 subagent 名称调整超时和最大轮数，无需改代码。

## 并发上限

`MAX_CONCURRENT_SUBAGENTS = 3`，`SubagentLimitMiddleware` 在超限时截断 task tool_calls。

## 与 Agent Swarm 的区别

| 维度 | DeerFlow Subagent | ClawTeam Swarm |
|------|-----------------|---------------|
| 架构 | 单进程多线程池 | 多进程 tmux session |
| 隔离 | 同一 LangGraph 内 | git worktree 真实分支 |
| 通信 | SSE events | inbox 文件消息 |
| 工具 | 继承主 agent 工具集 | 独立 CLI agent |
| 适用 | 短时专项任务 | 长时间独立 Agent 协作 |

DeerFlow subagent 是"同进程内委托"，ClawTeam 是"真实多 Agent 协作"。

## 相关概念

- [[deer-flow]] — subagent 系统的宿主框架
- [[agent-swarm]] — ClawTeam 的真实多 Agent swarm 方案
- [[deer-flow-runtime]] — SubagentExecutor 在 runtime 中的生命周期
