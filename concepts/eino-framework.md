---
title: Eino Framework
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [ai, llm, framework, backend]
sources: [raw/articles/coze-studio-github-2026.md]
---

# Eino Framework

## Definition
Eino 是字节跳动自研的 LLM 应用开发框架，属于 CloudWeGo 生态的一部分（与 Hertz HTTP 框架并列）。为 LLM 应用提供 Agent、Workflow、Chain、Memory、Tool、Prompt 等抽象层，支持多模型统一接入。

## Core Position
- **定位：** 字节自研的 LangChain 替代品
- **生态：** CloudWeGo（字节微服务技术体系）
- **上游：** Coze Studio / 扣子平台的 Agent/Workflow 运行时
- **同类对比：** LangChain / LangGraph / DSPy

## 核心抽象

| 抽象 | 说明 |
|------|------|
| Model | 多模型统一接入（Ark/OpenAI/Claude/Gemini/DeepSeek/MiniMax） |
| Chain | LLM 调用链编排 |
| Agent | 智能体（LLM + Tool + Memory） |
| Workflow | DAG 工作流编排 |
| Memory | 对话记忆管理 |
| Tool | 工具/插件扩展 |

## 模型接入扩展（eino-ext）
```go
github.com/cloudwego/eino-ext/components/model/ark       // 火山方舟
github.com/cloudwego/eino-ext/components/model/openai    // OpenAI
github.com/cloudwego/eino-ext/components/model/claude   // Anthropic
github.com/cloudwego/eino-ext/components/model/gemini   // Google
github.com/cloudwego/eino-ext/components/model/deepseek // DeepSeek
github.com/cloudwego/eino-ext/components/model/minimax  // MiniMax
```
> 通过 `eino-ext` 实现厂商无关的模型抽象层，业务层不感知底层模型差异

## 与 Coze Studio 的关系
Eino 是 Coze Studio 的核心运行时引擎：
- 后端 DDD 架构中，Workflow / Agent / Knowledge 的运行时都基于 Eino
- FlowGram 编排的可视化流程，最终通过 Eino 执行

## Related
- [[coze-studio]] — Eino 的主要应用场景
- [[langchain]] — 同类框架（对比）
- [[langgraph]] — 同类框架（DeerFlow 使用的编排引擎）
- [[ai-agent-development-platform]] — Eino 在 Agent 平台中的角色
