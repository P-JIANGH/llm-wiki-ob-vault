---
title: CrewAI
created: 2026-04-15
updated: 2026-05-15
type: entity
tags: [ai, agent, framework, python, llm, open-source, multi-agent]
sources: [raw/articles/ai-game-devtools/crewai.md]
aliases: ["CrewAI"]
---

# CrewAI

**CrewAI** 是 João Moura 开发的**角色驱动多 Agent 框架**（MIT），完全独立于 LangChain 构建（使用 litellm + Pydantic v2）。~47k GitHub Stars，$18M Series A 融资，是当前开发者上手门槛最低、最流行的多 Agent 框架之一。

## 核心抽象

CrewAI 将多 Agent 协作建模为**角色团队**模式：

```
Crew（编排器）
 ├── agents: list[Agent]    # 角色代理人
 ├── tasks: list[Task]      # 原子任务单元
 ├── process: sequential | hierarchical  # 执行策略
 └── memory / knowledge / security / cache
```

### Agent（角色代理人）

```python
class Agent(BaseModel):
    role: str              # "Market Researcher"
    goal: str              # "分析市场趋势"
    backstory: str         # 背景故事（prompt 注入）
    llm: LLM | BaseLLM
    tools: list[BaseTool]
    allow_delegation: bool # 是否允许委派
    max_iter: int
    planning: bool         # 计划模式
    guardrails: list       # 护栏（Guardrails 集成）
```

### Task（原子任务）

```python
class Task(BaseModel):
    description: str
    expected_output: str
    agent: Agent
    context: list[Task]         # 前置任务上下文
    tools: list[BaseTool]       # 覆盖 Agent 工具
    output_json / output_pydantic
    async_execution: bool       # 并行执行
    human_input: bool           # 人工确认
    condition: bool             # 条件任务（ConditionalTask）
```

## 执行流程

### Sequential（顺序流程）
逐个遍历 tasks，支持 `async_execution=True` 的并行执行。

### Hierarchical（层级流程）
自动创建 Manager Agent，由其 Coordinator 所有下属 Agent。

### Flows（事件驱动工作流）

```python
class MyFlow(Flow[MyState]):
    @start()
    def step1(self): ...

    @listen(step1)
    def step2(self, result): ...

    @router(step2)
    def route(self, result):
        return "path_a" if condition else "path_b"

    @listen("path_a")
    def handler_a(self): ...
```

Flows 独立于 Crews，可嵌套组合：
- `@start` / `@listen` / `@router` 装饰器
- `@persist` 持久化（SQLite / JSON）
- `or_()` / `and_()` 逻辑组合
- `flow.plot()` 自动生成流程图

## 生态体系

| 组件 | 说明 |
|------|------|
| **CrewAI AMP Suite** | 企业平台（Tracing/Observability/部署） |
| **A2A 协议** | Google Agent-to-Agent 协议完整实现（Server/Client/Polling/Push/Streaming） |
| **MCP 集成** | 原生 MCP 工具包装器（`MCPToolWrapper`） |
| **CLI** | `crewai create/run/install/train/test/replay` |
| **记忆系统** | LanceDB / Qdrant Edge 向量存储，短期/长期/实体记忆 |
| **事件总线** | 全局 EventBus + BaseEventListener，监控/日志/追踪 |
| **Checkpoint** | SQLiteProvider / JSONProvider 状态持久化 |
| **安全** | OAuth2 认证（Auth0/Okta/Keycloak/Entra ID）、指纹 |

## 代码组织

```
lib/crewai/src/crewai/
├── agent/          # Agent 核心（~1890 行）
├── agents/         # Agent 构建器 + 执行器 + 适配器（LangGraph/OpenAI SDK）
├── a2a/            # Agent-to-Agent 协议
├── crew.py         # Crew 编排器（~2305 行）
├── task.py         # Task 定义（~1468 行）
├── flow/           # Flows 引擎（~3636 行）
├── llm.py / llms/  # LLM 封装层（~2557 行）
├── project/        # @CrewBase 装饰器框架
├── tools/          # 工具系统（BaseTool/Cache/MCP/AgentTools）
├── memory/         # 记忆系统
├── mcp/            # MCP 协议集成
├── state/          # Checkpoint + 持久化
└── events/         # 事件系统
```

## 设计特点

| 特点 | 说明 |
|------|------|
| **零外部框架依赖** | 不自建 LangChain，错误栈清晰，执行路径短 |
| **Pydantic v2 全栈** | 所有核心对象为 BaseModel 子类，天然序列化 |
| **循环引用解析** | `model_rebuild(force=True)` 解决 Agent/Crew/Task 相互引用 |
| **YAML 配置 + 装饰器** | @CrewBase/@agent/@task/@crew 声明式构建 |
| **Adapter 模式** | LangGraphAdapter / OpenAIAdapter 跨框架互操作 |
| **Type Registry** | BaseTool.__init_subclass__ 自动注册 |

## 仓库概况

| 指标 | 数值 |
|------|------|
| GitHub Stars | ~47,000 |
| License | MIT |
| 语言 | Python |
| 版本 | v1.14.5a3 |
| 融资 | $18M Series A (Insight Partners) |
| 课程 | DeepLearning.AI 2门专项课程 |
| 社区 | 10 万+ 认证开发者 |

## 相关链接

- GitHub: https://github.com/crewAIInc/crewAI
- 文档: https://docs.crewai.com
- 社区: https://community.crewai.com

## 相关项目

- [[ai-game-devtools/langgraph]] — 有状态图 Agent 框架，与 CrewAI 互补
- [[ai-game-devtools/agentscope]] — 阿里巴巴 AOP Agent 框架
- [[ai-game-devtools/autogen]] — 微软多 Agent 框架（维护模式）
