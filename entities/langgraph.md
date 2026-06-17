---
title: langgraph
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [framework, llm, agent, orchestration]
sources: [web:https://github.com/langchain-ai/langgraph]
---

# LangGraph

由 [[langchain]] 开发的 **multi-agent 编排框架**，以 **graph** 结构建模 agent 工作流：节点 = 工具/LLM/代码，边 = 控制流。

## 核心概念

- **Node**: LLM 调用、工具执行、代码逻辑
- **Edge**: 条件路由、循环、并行分支
- **State**: 在节点间传递的共享上下文（Pydantic model / TypedDict）
- **Checkpointing**: 内置状态持久化，支持多轮对话恢复
- **Streaming**: 支持 token-level 流式输出

## 与 DeerFlow 的关系

DeerFlow 2.0 的核心编排层：lead_agent 基于 LangGraph 构建，通过 `make_lead_agent()` 注册 agent factory，通过 `langgraph.json` 配置 agent 入口点。

LangGraph Server (port 2024) 运行 DeerFlow 的 agent runtime（标准模式），Gateway mode 时嵌入 Gateway API。

## 相关概念

- [[langchain]] — LangGraph 的上层框架
- [[deer-flow]] — LangGraph 的具体应用
