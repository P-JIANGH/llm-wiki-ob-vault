---
title: Microsoft Agent Framework
created: 2026-05-15
updated: 2026-05-15
type: concept
tags: [agent, framework, llm, multi-agent, microsoft, enterprise, python, dotnet]
sources: [raw/articles/ai-game-devtools/autogen.md]
aliases: ["MAF", "Microsoft Agent Framework"]
---

# Microsoft Agent Framework

**Microsoft Agent Framework（MAF）** 是微软推出的**企业级多 Agent 开发框架**，2026 年 4 月 3 日发布 1.0 GA。它是 [[ai-game-devtools/autogen]]（微软研究院）和 Semantic Kernel 的**统一后继者**，由同一团队打造，同时支持 .NET 和 Python 作为一等公民。

## 定位：AutoGen + Semantic Kernel 的融合

MAF 合并了两条产品线的核心能力：

| 来源 | 继承的能力 |
|------|-----------|
| **AutoGen** | 多 Agent 对话模式（GroupChat/Handoff/Magentic）、Agent 抽象、MCP/A2A 协议支持 |
| **Semantic Kernel** | 企业级特性（Session 状态管理、Middleware 管道、Telemetry）、插件模型 |

> "Agent Framework is the direct successor, created by the same teams. In short, Agent Framework is the next generation of both Semantic Kernel and AutoGen."

## 核心架构

MAF 提供两大核心能力：**Agent** 和 **Workflow**。

### Agents

LLM 驱动的智能体，支持：
- 6+ LLM Provider：Azure OpenAI/OpenAI/Anthropic/Ollama/Gemini/Bedrock
- 工具调用：FunctionTool、MCP Server、Code Interpreter
- 中间件系统：拦截 Agent run()、Chat get_response()、Function 调用
- Session 管理：状态持久化（内存/文件/Azure Cosmos/Redis）
- Context Provider：RAG、记忆系统、Compaction

```python
from agent_framework import Agent
from agent_framework.openai import OpenAIChatClient

agent = Agent(
    client=OpenAIChatClient(),
    instructions="You are helpful.",
    tools=[my_function],
)
response = await agent.run("Hello")
```

### Workflows

基于**有向图（DAG）** 的显式编排，两种 API：

| API | 控制流 | 适合场景 |
|-----|--------|----------|
| **Functional** (`@workflow`) | 原生 Python（if/for/asyncio.gather） | 顺序管道、自定义循环 |
| **Graph** (`WorkflowBuilder`) | 边和条件路由 | 固定拓扑、Fan-out/Fan-in |

核心概念：
- **Executor** — 基本工作单元（`Executor<TInput, TOutput>`），强类型输入输出
- **Edge** — 连接 Executor 的边，可带条件路由
- **Orchestrator** — 编排模式：Sequential / Concurrent / Handoff / GroupChat / Magentic

```python
# Functional API
from agent_framework import workflow

@workflow
async def my_workflow(ctx):
    step1 = await ctx.call(executor1, input_data)
    step2 = await ctx.call(executor2, step1)
    return step2
```

### Durable Workflows（持久化工作流）

通过 `Microsoft.Agents.AI.DurableTask` 包实现，**不改 workflow 定义**即可获得：
- Checkpointing：保存每步状态，崩溃后恢复
- 分布式执行：跨机器编排
- 已完成 Agent 不重复执行
- Azure Functions 托管

## 生态体系

### Python 包结构

```
agent-framework/python/packages/
├── core/             # 核心抽象（Agent/ChatClient/Session/Middleware/Workflow）
├── openai/           # OpenAI Responses API + Chat Completions
├── anthropic/        # Anthropic Claude
├── ollama/           # 本地 Ollama
├── gemini/           # Google Gemini
├── foundry/          # Azure AI Foundry
├── a2a/              # Agent-to-Agent 协议
├── ag-ui/            # AG-UI 协议
├── devui/            # 开发者 UI
├── declarative/      # YAML/JSON Agent 定义
├── durabletask/      # 持久化执行引擎
├── mem0/             # Mem0 记忆集成
├── redis/            # Redis 存储
├── azure-cosmos/     # CosmosDB
└── ...
```

### Provider 矩阵（6+ 模型供应商）

OpenAI / Azure OpenAI / Anthropic Claude / Ollama / Gemini / AWS Bedrock / Azure AI Foundry

### 协议支持

- **MCP** — 原生 `McpClient` 和 `use_mcp_tools()` 支持
- **A2A** — Agent-to-Agent 协议（独立包）
- **AG-UI** — Agent 用户界面协议

## 与 AutoGen 的迁移关系

| 概念 | AutoGen v0.4 | MAF |
|------|-------------|-----|
| Agent | RoutedAgent | Agent / BaseAgent |
| Chat Client | ModelClient | BaseChatClient |
| 工具 | Tool | FunctionTool / @tool |
| 会话 | 无 | AgentSession |
| 中间件 | 无 | AgentMiddleware / ChatMiddleware |
| 工作流 | GroupChat / Handoff | Workflow + Orchestrator |
| Checkpoint | 无 | DurableTask |

官方迁移指南：https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/

## 仓库概况

| 指标 | 数值 |
|------|------|
| GitHub Stars | ~10K+（快速增长的官方仓库） |
| License | MIT |
| 语言 | Python + C# (.NET) |
| 1.0 GA | 2026-04-03 |
| 组织 | microsoft |
| 开发者预览 | 2025 年底开始 |

## 相关页面

- [[ai-game-devtools/autogen]] — 前身，维护模式，推荐迁移至此
- [[concepts/magentic-one]] — 基于 AutoGen 的通用 Agent 系统（MAF 中也包含 Magentic Orchestrator）
- [[comparisons/agent-framework-comparison]] — 与 LangGraph/CrewAI/AgentScope 的详细对比
