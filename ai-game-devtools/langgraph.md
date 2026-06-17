---
title: LangGraph
created: 2026-05-15
updated: 2026-05-15
type: entity
tags: [ai, agent, framework, python, llm, open-source, multi-agent, state-machine]
sources: [raw/articles/ai-game-devtools/langgraph.md]
aliases: ["LangGraph", "LangGraph Platform"]
---

# LangGraph

**LangGraph** 是 LangChain（langchain-ai）开发的**有状态多 Agent 编排框架**，基于 Pregel 图执行引擎，将 Agent 工作流建模为持久化、可中断、可恢复的有向图。当前是生产级 Agent 框架中**最成熟、最活跃**的选择（~32k stars，月末首个 100M+ PyPI 下载）。

## 核心架构：Pregel 引擎

LangGraph 的底层核心是 **Pregel 执行引擎**（Google Pregel 论文/BSP 模型），所有上层 API（StateGraph、Functional API）最终都编译为 `Pregel` 实例。

### Pregel BSP 执行模型（三阶段循环）

```
1. Plan（计划） — 确定哪些节点在本步执行（基于通道更新触发）
2. Execute（执行） — 所有选中节点并行执行，通道写入隔离
3. Update（更新） — 将节点写入应用到通道，下一步可见
```

### StateGraph（图 API）

```python
from langgraph.graph import StateGraph
from typing import TypedDict, Annotated
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    next_step: str

graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.add_node("tools", tool_node)
graph.add_conditional_edges("agent", router, {"continue": "tools", "end": "__end__"})
graph.set_entry_point("agent")
app = graph.compile(checkpointer=checkpointer)
```

### Functional API（函数式 API）

```python
from langgraph.func import entrypoint, task

@task(retry_policy=..., timeout=60)
def process_data(raw: str) -> str: ...

@entrypoint(checkpointer=checkpointer)
def workflow(input_data: str) -> str:
    result = process_data(input_data).result()
    return result
```

两种 API 共享同一 Pregel 运行时。

## 状态管理

| 机制 | 说明 |
|------|------|
| **State Schema** | TypedDict / Pydantic BaseModel / dataclass |
| **Reducer** | 字段注解函数控制合并逻辑（add_messages 等） |
| **LastValue** | 默认，只保留最后一次写入 |
| **BinaryOperatorAggregate** | reducer 合并多节点写入 |
| **Topic** | 消息累加 + 去重（配合 add_messages） |
| **Checkpoint** | 可插拔（内存 / SQLite / PostgreSQL），每步持久化 |
| **Interrupt** | `interrupt()` / `Command(resume=...)` 实现人机交互 |

### 通道系统（Channel System）

`BaseChannel` 抽象定义了节点间数据流动语义：
- `LastValue` — 保留最新值
- `Topic` — 发布-订阅消息流
- `EphemeralValue` — 临时值（不持久化）
- `BinaryOperatorAggregate` — 聚合归约
- `NamedBarrierValue` — 同步屏障
- `DeltaChannel`（v1.2+）— 增量通道

## 流式输出

LangGraph 提供多种 `stream_mode`：

| 模式 | 输出内容 |
|------|----------|
| `"values"` | 每步完整 state |
| `"updates"` | 每步节点增量更新 |
| `"messages"` | LLM token 级流式 |
| `"custom"` | 节点内 StreamWriter 自定义数据 |
| `"debug"` | 调试追踪 |

## 生态体系

### LangSmith Deployment（原 LangGraph Platform）

| 层级 | 说明 | 价格 |
|------|------|------|
| Developer | 自托管 Docker 容器 | 每月前 10 万节点免费 |
| Production | 托管部署 | 按用量付费 |
| Enterprise | RBAC、工作空间 | 企业定价 |

### 工具链

- **LangGraph Server** — FastAPI REST API 运行和管理 Agent
- **LangGraph Studio** — 可视化 IDE 查看图拓扑和执行状态
- **CLI** — `langgraph dev / build / deploy` 命令
- **LangSmith** — 全链路可观测性（追踪、eval、回归测试）

### 预构建组件（`prebuilt`）

- `create_react_agent()` — ReAct 模式高阶函数
- `ToolNode` — 工具调用节点
- `tools_condition` — 工具路由条件边
- `ValidationNode` — 工具参数验证
- Checkpoint 实现：SQLite / PostgreSQL 后端

## 代码组织（monorepo）

```
libs/
├── langgraph/         # 核心框架（StateGraph/Pregel/Functional API）
│   ├── graph/         # Graph API（StateGraph, CompiledStateGraph）
│   ├── pregel/        # Pregel 执行引擎（~4300 行 main.py）
│   ├── channels/      # 通道系统
│   ├── func/          # Functional API
│   └── managed/       # Managed Values
├── prebuilt/          # 预构建组件
├── checkpoint/        # 基础接口
├── checkpoint-sqlite/ # SQLite 实现
├── checkpoint-postgres/ # PostgreSQL 实现
├── cli/               # CLI 工具
└── sdk-py/ / sdk-js/  # API SDK
```

## 仓库概况

| 指标 | 数值 |
|------|------|
| GitHub Stars | ~32,000 |
| License | MIT |
| 语言 | Python + JS/TS |
| 版本 | langgraph==1.2.0 |
| 首次发布 | 2023-08 |
| 贡献者 | 200+ |
| 最新动态 | 每日活跃（2026-05） |

## 相关链接

- GitHub: https://github.com/langchain-ai/langgraph
- 文档: https://langchain-ai.github.io/langgraph/
- 官网: https://langchain.ai/

## 相关项目

- [[ai-game-devtools/langchain]] — 上层 LLM 应用框架，LangGraph 基于 LangChain 构建
- [[ai-game-devtools/crewai]] — 角色驱动的 Agent 团队框架，与 LangGraph 形成互补
- [[ai-game-devtools/agentscope]] — 阿里巴巴 AOP Agent 框架
- [[ai-game-devtools/autogen]] — 微软多 Agent 框架（维护模式），语言选择参考
