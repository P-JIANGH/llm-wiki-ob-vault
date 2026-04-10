---
title: langchain
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [framework, llm, agent]
sources: [web:https://github.com/langchain-ai/langchain]
---

# LangChain

LLM 应用开发框架，提供：Chain（链式调用）/ Agent（工具 + 推理）/ Memory（上下文持久化）/ Tool（工具集成）/ Prompt（模板管理）。

## 核心组件

| 组件 | 说明 |
|------|------|
| **LangChain Core** | 抽象接口：Chain / Agent / Memory / Tool / Prompt |
| **LangChain Community** | 第三方集成（200+ 工具/API） |
| **LangGraph** | 多 agent 编排（图结构） |
| **LangServe** | REST API 部署 |
| **LangSmith** | 可观测性（tracing / 评估） |

## 与 DeerFlow 的关系

DeerFlow 基于 LangChain 构建 LLM 交互层，使用 `langchain_openai:ChatOpenAI` 等集成多种模型。DeerFlow 的 tracing 支持 LangSmith + Langfuse。

## 相关概念

- [[langgraph]] — LangChain 的多 agent 编排子框架
- [[deer-flow]] — 基于 LangChain/LangGraph 的具体应用
