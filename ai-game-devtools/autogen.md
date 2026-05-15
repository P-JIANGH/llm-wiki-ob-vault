---
title: AutoGen
created: 2026-04-15
updated: 2026-05-15
type: entity
tags: [tool, multi-agent, agent, llm, open-source, framework]
sources: [raw/articles/ai-game-devtools/autogen.md]
aliases: ["AutoGen", "AG2"]
---

# AutoGen

**AutoGen** 是微软研究院（Microsoft Research）推出的开源多 Agent 协作框架，自 2023 年秋季发布后迅速成为多 Agent 领域最具影响力的框架之一（~55K GitHub stars）。当前已进入维护模式（不新增特性，仅安全修补），微软推荐新项目迁移到 [Microsoft Agent Framework](https://github.com/microsoft/agent-framework)。

## 历史与版本演变

| 版本 | 时间 | 关键变化 |
|------|------|----------|
| v0.1 | 2023.09 | 初始发布：ConversableAgent 对话式 Agent，多 Agent 群聊 |
| v0.2 | 2024.03 | 稳定性改进、社区扩展（MCP、代码执行） |
| v0.4 | 2025.01 | **完全重写**：异步事件驱动 Actor 模型、Core/AgentChat/Extensions 三层架构 |
| 维护模式 | 2025.10 | 微软宣布进入维护模式，推荐迁移到 Microsoft Agent Framework |
| AG2 社区 | 2025+ | 核心贡献者 fork -> AG2（ag2.ai），独立维护 v0.2 生态并开发 v1.0 |

## 架构：v0.4 三层设计

v0.4 是从头重写的版本，采用异步、事件驱动架构（Actor Model），解决了 v0.2 的可观测性、灵活性、交互控制和可扩展性问题。

### 1. Core API（`autogen-core`）

底层运行时，提供事件驱动的消息传递和 Agent 生命周期管理：

- **Agent Runtime** — 两种运行时：`SingleThreadedAgentRuntime`（单进程本地）和分布式运行时（多进程跨语言）
- **RoutedAgent** — 消息路由基类，通过 `@message_handler` 注册消息处理器
- **消息系统** — Agent 间通过类型化消息通信（`@dataclass Message`）
- **Topic/Subscription** — 发布-订阅模式，解耦消息发送方和接收方
- **OpenTelemetry 集成** — 全链路可观测性

```python
from autogen_core import RoutedAgent, AgentId, SingleThreadedAgentRuntime, message_handler

class MyAgent(RoutedAgent):
    @message_handler
    async def handle(self, msg: Message, ctx: MessageContext) -> None:
        print(f"Received: {msg.content}")
```

### 2. AgentChat API（`autogen-agentchat`）

高阶 API，封装常见的多 Agent 模式，适合快速原型开发：

- **AssistantAgent** — 标准 AI Agent（model_client + tools + system_message）
- **CodeExecutorAgent** — 代码执行沙箱
- **GroupChat** — 群聊模式（RoundRobin / MagenticOneGroupChat）
- **Handoffs** — Agent 间任务移交（`AfterWork`, `OnCondition`）
- **设计模式**：顺序工作流、并发 Agent、群聊、Handoffs、Mixture of Agents、辩论、反思、代码执行

### 3. Extensions（`autogen-ext`）

插件生态，集成外部服务和工具：

- **Model Clients** — OpenAI / Azure OpenAI / 自定义 provider
- **MCP 集成** — `McpWorkbench + StdioServerParams` 连接任意 MCP Server
- **Code Execution** — 本地命令行 / Docker 沙箱
- **Web Surfer** — LLM 驱动浏览器控制（Accessibility Tree + set-of-marks）

## 包结构

```
autogen-core/           # 核心运行时：消息、Agent、Runtime
autogen-agentchat/      # 高阶 AgentChat API
autogen-ext/            # 扩展（MCP、代码执行、OpenAI 客户端）
autogen-magentic-one/   # Magentic-One 多 Agent 系统
autogen-studio/         # 无代码 GUI（Streamlit）
magentic-one-cli/       # Magentic-One CLI
pyautogen/              # 遗留 v0.2 兼容层
agbench/                # AutoGenBench 评测套件
```

## 安装

```bash
pip install -U "autogen-agentchat" "autogen-ext[openai]"
pip install -U "autogenstudio"    # AutoGen Studio
```

要求 Python 3.10+。

## 设计模式

AutoGen AgentChat 内置了丰富的多 Agent 设计模式：

| 模式 | 描述 | 适用场景 |
|------|------|----------|
| Sequential | Agent 链式执行 | 数据处理管线，如抓取→分析→报告 |
| Concurrent | 多个 Agent 并行执行 | 多源信息采集 |
| GroupChat | 群聊式协作，Router/Selector 决定谁发言 | 开放式讨论、辩论 |
| Handoffs | 任务定向移交（`AfterWork`, `OnCondition`） | 客服路由、专家咨询 |
| Mixture of Agents | 并行推理→聚合器综合 | 复杂推理、多模型投票 |
| Debate | 多 Agent 辩论与反驳 | 事实核查、决策评估 |
| Reflection | Agent 自我反思修正 | 代码审查、内容审核 |
| Code Execution | Agent 写代码→执行→结果反馈 | 数据分析、自动化任务 |

## Magentic-One

Magentic-One 是基于 AutoGen 构建的通用多 Agent 系统，采用 **Orchestrator + 4 个 Specialist Agent** 架构：

- **Orchestrator** — 维护 Task Ledger + Progress Ledger，内外双循环调度
- **WebSurfer** — 控制 Chromium 浏览器的 LLM Agent
- **FileSurfer** — 本地文件浏览 Agent
- **Coder** — 代码编写 Agent
- **ComputerTerminal** — 命令行执行环境

评测结果：在 GAIA、AssistantBench、WebArena 上达到或接近 SOTA（2024.10 基准）。见 [[concepts/magentic-one]]

## 社区分支：AG2

AG2（ag2.ai）是 AutoGen 原核心贡献者 fork 的社区维护版本，保留 v0.2 的 `ConversableAgent` / `GroupChat` 架构，同时开发全新的 v1.0（基于 `autogen.beta.Agent`）。AG2 不包含 v0.4 的 Actor 模型重写。

> **选择建议**：
> - 维护现有 AutoGen v0.2 代码 → AG2
> - 新项目 → Microsoft Agent Framework（企业级，稳定 API + 长期支持）
> - 研究/原型 → 继续用 v0.4 的 AgentChat API（社区维护）
>
> 参见 [[concepts/microsoft-agent-framework]]

## 与其他框架对比

| 维度 | AutoGen | [[langgraph]] | [[crewai]] | [[agentscope]] |
|------|---------|---------------|------------|----------------|
| 状态 | 维护模式 | 活跃 | 活跃 | 活跃 |
| 架构 | Actor 模型（v0.4） | 有向图（DAG） | 团队-任务 | 微服务 |
| 编程模型 | 异步事件驱动 | 函数式 StateGraph | 声明式 | 声明式+Python SDK |
| 设计模式 | 群聊/Handoff/MoA等 | 循环/条件/并行 | 顺序/层级 | ReAct/多Agent工作流 |
| 可观测性 | OpenTelemetry | LangSmith | 内置 | OpenTelemetry |
| MCP | ✅ McpWorkbench | ✅ | ✅ 插件 | ✅ |
| 学习曲线 | 中等（API 多版本混乱） | 中等 | 低 | 低 |

## 许可证

MIT（社区管理）

## 相关链接

- GitHub: https://github.com/microsoft/autogen
- 文档: https://microsoft.github.io/autogen/
- AG2: https://docs.ag2.ai/
- Microsoft Agent Framework: https://github.com/microsoft/agent-framework
- 迁移指南: https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/

## 相关项目

- [[concepts/magentic-one]] — 基于 AutoGen 的通用多 Agent 系统
- [[agentscope]] — 阿里巴巴多 Agent 平台，强调生产级部署
- [[metagpt]] — 多 Agent 软件开发框架
- [[langchain]] — LLM 应用开发框架
- [[aios]] — AI Agent 操作系统，支持 AutoGen 作为后端
