---
title: LangChain
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, agent, framework, tool, open-source]
sources: [raw/articles/ai-game-devtools/langchain.md]
---

# LangChain

LLM 应用开发框架，通过 Chain/Agent/Memory/Tool/Prompt 抽象简化 AI 应用构建。MIT 许可，Python monorepo 架构。

## Overview

LangChain 是一个用于构建 LLM 驱动应用的框架，通过可组合的组件和第三方集成简化 AI 应用开发。核心定位是"agent 工程平台"（The agent engineering platform）。

## Architecture

**Monorepo 结构**（`libs/`）：
- `core/` — `langchain-core` 基元抽象层，包含 BaseModel、Runnable 接口、序列化协议
- `langchain_v1/` — **活跃维护的主包**（`langchain` v1.2.15），依赖 `langchain-core` + `langgraph>=1.1.5`
- `partners/` — 第三方集成（openai/anthropic/ollama/groq/aws/deepseek 等，均为独立包）
- `text-splitters/` — 文档分块工具
- `standard-tests/` — 集成测试标准套件

**核心模块**（`langchain_v1/langchain/`）：
- `agents/` — Agent 实现
- `chat_models/` — 聊天模型接口
- `embeddings/` — Embedding 模型接口
- `messages/` — 消息类型与工具
- `tools/` — 工具定义与工具集
- `rate_limiters/` — 限流器

## Key Features

| Feature | Description |
|---------|-------------|
| Model Interoperability | 模型可替换，标准接口抽象（ChatModel/Embeddings/VectorStore） |
| Real-time Data Augmentation | 连接外部数据源和系统 |
| Rapid Prototyping | 模块化组件架构，快速迭代 |
| Production-ready | 内置 LangSmith 可观测性支持 |
| Flexible Abstractions | 从高层 Chain 到低层组件，灵活选择 |

## Ecosystem

- **[[langgraph]]** — 低层 Agent 编排框架，处理复杂工作流和状态管理
- **LangSmith** — Eval/可观测性/调试平台
- **LangChain.js** — JS/TS 版本

## Dependencies

Core: `langsmith>=0.3.45`, `tenacity>=8.1.0`, `pydantic>=2.7.4`, `PyYAML>=5.3.0`, `jsonpatch>=1.33.0`

## License

MIT

## Links

- GitHub: https://github.com/hwchase17/langchain
- Docs: https://docs.langchain.com/oss/python/langchain/overview
- API Ref: https://reference.langchain.com/python
