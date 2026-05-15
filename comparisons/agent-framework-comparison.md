---
title: 多 Agent 框架深度对比：LangGraph vs CrewAI vs AgentScope vs AutoGen vs MAF
created: 2026-05-15
updated: 2026-05-15
type: comparison
tags: [multi-agent, framework, comparison, ai, agent]
sources: [raw/articles/ai-game-devtools/langgraph.md, raw/articles/ai-game-devtools/crewai.md, raw/articles/ai-game-devtools/agentscope.md, raw/articles/ai-game-devtools/autogen.md]
---

# 多 Agent 框架深度对比

> 2026年5月更新。基于源码深度分析 + 官方文档 + 社区动态。

## 一句话总结

| 框架 | 一句话定位 |
|------|-----------|
|| **LangGraph** | 生产级有状态 Agent 图编排，持久化/人机交互是一等公民 |
|| **CrewAI** | 上手最快的角色驱动 Agent 团队，YAML 配置即用，~47K stars |
|| **AgentScope** | 唯一带 RL 微调的 AOP Agent 框架，阿里云生态原生 |
|| **MAF (Microsoft)** | 微软官方企业级框架，AutoGen+Semantic Kernel 融合，.NET/Python 双一等公民 |
|| **AutoGen** | 先驱已退役，分裂为三条路（维护模式 / AG2 社区 / MAF） |

## 核心架构对比

| 维度 | LangGraph | CrewAI | AgentScope | AutoGen |
|------|-----------|--------|------------|---------|
| **编程范式** | 声明式有向图 | 声明式角色团队 | 过程式 AOP | 事件驱动 Actor 模型 |
| **核心抽象** | StateGraph + Pregel | Crew + Agent + Task | AgentBase + ReActAgent | RoutedAgent + AgentChat |
| **执行模型** | BSP 并行（Graph 步） | 顺序/层级串行 | 过程式 pipeline | 事件驱动消息传递 |
| **状态管理** | ✅ 一等公民（checkpoint/reducer） | ⚠️ 有限（传上下文） | ✅ Session 持久化 | ✅ Runtime + logging |
| **持久化** | SQLite/PostgreSQL 可插拔 | SQLiteProvider/JSONProvider | Redis/SQLAlchemy/TableStore | OpenTelemetry |
| **图拓扑** | 任意有向图（含循环） | DAG（线性） | 过程 pipeline | 对话图/群聊 |
| **并行执行** | 同一步内节点并行 | async_execution | asyncio.gather | 事件驱动 |
| **人机交互** | ✅ 原生 interrupt/resume | ⚠️ human_input 字段 | ⚠️ UserAgent | ✅ Handoff |
| **流式** | 5种模式（values/updates/messages/custom/debug） | 有限 | AsyncGenerator | 基本流式 |

## 生态对比

| 维度 | LangGraph | CrewAI | AgentScope | AutoGen |
|------|-----------|--------|------------|---------|
| **LLM Provider** | LangChain 生态 | litellm 适配器 | 原生（OpenAI/Anthropic/Gemini/DashScope/Ollama） | autogen-ext 扩展 |
| **MCP 协议** | ✅ 通过工具适配 | ✅ 原生 MCPToolWrapper | ✅ 原生（有状态/无状态双模式） | ✅ McpWorkbench |
| **A2A 协议** | ❌ | ✅ 完整实现 | ✅ 原生 A2AAgent | ✅ 社区支持 |
| **RL 微调** | ❌ | ❌ | ✅ Trinity-RFT | ❌ |
| **部署方案** | LangSmith Deployment（免费10万节点/月） | CrewAI AMP Suite | K8s Runtime + Studio | 需自建 |
| **可视化 IDE** | LangGraph Studio | Web UI (AMP) | AgentScope Studio | AutoGen Studio |
| **可观测性** | LangSmith | OpenTelemetry | OpenTelemetry | OpenTelemetry |
| **实时语音** | ❌ | ❌ | ✅ 原生 | ❌ |
| **SaaS 平台** | LangSmith（企业） | AMP Suite（商业） | 阿里云 PAI | ❌（退役中） |

## 社区与生态

| 指标 | LangGraph | CrewAI | AgentScope | AutoGen |
|------|-----------|--------|------------|---------|
| **GitHub Stars** | ~32K | ~47K | ~25K | ~38K |
| **License** | MIT | MIT | Apache 2.0 | MIT |
| **版本** | langgraph==1.2.0 | v1.14.5a3 | v1.0.19.post1 | 维护模式 |
| **语言** | Python + JS/TS | Python | Python | Python |
| **依赖** | LangChain | 零外部（litellm + pydantic） | 原生 | autogen-ext |
| **贡献者** | 200+ | ~150+ | ~50+ | 社区维护 |
| **融资** | LangChain $35M+ | $18M Series A | 阿里内部 | N/A |

## 技术选型决策树

```
你的需求是什么？
│
├── 需要精确控制工作流拓扑 + 持久化 + 人机交互
│   └── → LangGraph（生产首选）
│
├── 快速原型 + 多角色协作 + 团队编排
│   ├── Python 团队 → CrewAI（上手最快）
│   └── 阿里云生态 → AgentScope（无缝集成）
│
├── 需要 Agent RL 微调优化
│   └── → AgentScope（唯一选项）
│
├── 需要实时语音 Agent
│   └── → AgentScope（原生支持）
│
├── 研究/原型，已有 AutoGen 代码
│   └── → AG2（社区分支）或 Microsoft Agent Framework
│
└── 部署方案自己做还是用平台？
    ├── 自己做 → LangGraph 自托管 / CrewAI FastAPI
    └── 用平台 → LangSmith Deployment / AMP Suite / K8s Runtime
```

## 设计哲学差异

### LangGraph：图即运行时

> 将 Agent 工作流建模为可持久化、可中断、可恢复的图执行。与 Google Pregel（大规模图计算）和 Apache Beam（数据管道）一脉相承。

关注点：**状态如何转换**（数据如何通过图流动和变化）

### CrewAI：角色即分工

> 模拟人类团队：每个 Agent 有角色/目标/背景故事，通过任务委派协作。独立自建，无框架包袱。

关注点：**谁做什么**（角色分工和任务分配）

### AgentScope：Agent 即编程单元

> LLM 足够聪明，给它 ReAct 循环就够。自由推理，过程式编排，需要时 RL 微调优化。

关注点：**Agent 如何思考和进化**（推理-行动循环 + RL 优化）

### AutoGen：对话即协作

> 开创性的多 Agent 对话式协作。Agent 间像人一样用自然语言讨论、辩论、协调。

关注点：**Agent 间如何交流**（谁说给谁听，讨论什么）

### MAF：企业即标准

> AutoGen + Semantic Kernel 融合产物。聚焦生产级 Workflow 编排，.NET/Python 双栈支持，Durable Task 持久化引擎。

关注点：**如何可靠地交付**（类型安全/持久化/中间件/可观测）

## 相关页面

|- [[ai-game-devtools/langgraph]] — 有状态图编排
|- [[ai-game-devtools/crewai]] — 角色团队编排
|- [[ai-game-devtools/agentscope]] — AOP Agent 框架
|- [[ai-game-devtools/autogen]] — 先驱框架（维护模式）
|- [[concepts/microsoft-agent-framework]] — MAF（AutoGen+SK 融合）
