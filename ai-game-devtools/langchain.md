---
title: LangChain
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [framework, ai, llm, agent, workflow, python]
sources: [raw/articles/ai-game-devtools/langchain.md]
---

# LangChain

LangChain 是用于构建 LLM 应用和 AI Agent 的 Python 框架，通过模块化组件和第三方集成简化 AI 应用开发。

## Overview

LangChain 是一个开源的 AI 应用开发框架（MIT 许可证），帮助开发者通过标准接口连接模型、向量存储、工具等组件，快速构建 LLM 驱动的应用程序。最新活跃维护的包为 `langchain_v1`（v1.2.15）。

## Architecture

LangChain 采用 monorepo 结构，主要包包括：

- **langchain-core** — 核心抽象层：BaseChatModel、BaseRetriever、BaseTool 等接口和协议
- **langchain（v1）** — 具体实现层：高-level 公共工具（v1.2.15，MIT）
- **langgraph** — 低-level Agent 编排框架，构建可控的 Agent 工作流
- **langchain-partners** — 第三方集成（OpenAI、Anthropic、Ollama 等）

核心依赖：`langchain-core>=1.2.10`、`langgraph>=1.1.5`、`pydantic>=2.7.4`，Python >= 3.10。

## Key Features

- **数据增强** — 实时连接 LLM 与外部数据源和工具
- **模型互操作性** — 轻松切换不同 LLM 提供商
- **快速原型** — 模块化组件架构，支持快速迭代
- **生产级功能** — 内置监控、评估、调试支持（LangSmith）
- **灵活的抽象层** — 从高-level chains 到低-level 组件

## Ecosystem

- [[langgraph|LangGraph]] — 低-level Agent 编排框架，图形化工作流建模
- **Deep Agents** — 可规划、子 Agent 和文件系统交互的 Agent
- **LangSmith** — Agent 评估、可观测性和调试平台
- **LangSmith Deployment** — 生产级 Agent 部署平台

## 与同类工具的差异

相比 [[autogen|.AutoGen]] 和 [[crewai|.crewAI]]，LangChain 提供更完整的生态系统（从原型到生产）和更细粒度的组件抽象，但配置复杂度也更高。相比轻量级 Agent 框架，LangChain 的优势在于与 LangGraph 的深度集成和 LangSmith 可观测性平台的支持。

## License

MIT

## Related Links

- GitHub: https://github.com/langchain-ai/langchain
- Docs: https://docs.langchain.com/oss/python/langchain/overview
- API Reference: https://reference.langchain.com/python
- Forum: https://forum.langchain.com
