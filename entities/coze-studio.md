---
title: Coze Studio
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [ai, llm, agent, project]
sources: [raw/articles/coze-studio-github-2026.md]
---

# Coze Studio

## Overview
Coze Studio 是字节跳动 Coze（扣子）平台的本地私有化部署版本。开源核心功能包括完整的工作流引擎、插件核心框架、开箱即用的开发环境。上线两天 GitHub Star 量破万。

## Key Facts
- **开发者：** Coze / ByteDance（字节跳动）
- **许可证：** Apache-2.0
- **Stars：** 20.3k | **Forks：** 2.9k | **Contributors：** 66
- **最新版本：** v0.5.1 (2026-02-05)
- **开源时间：** 2025-07-26
- **技术栈：** Go 后端 + React/TypeScript 前端
- **架构：** 微服务 + DDD（领域驱动设计）

## Tech Stack（四层技术栈）

| 层级 | 技术 | 说明 |
|------|------|------|
| HTTP框架 | Hertz | 字节自研，CloudWeGo 生态 |
| LLM应用框架 | **Eino** | 字节自研，Agent/Workflow 运行时 |
| 工作流编辑器 | FlowGram | 字节自研，拖拽式可视化 |
| 微服务治理 | CloudWeGo | 字节内部成熟体系 |

## Core Architecture（DDD）

```
backend/
├── domain/      # 领域层：agent / workflow / knowledge
├── application/ # 应用层（协调业务流程）
├── infra/       # 基础设施层（外部依赖解耦）
└── api/         # HTTP API
```

## 六大功能模块

| 模块 | 核心能力 |
|------|----------|
| 模型服务 | 多模型统一接入（豆包/OpenAI/Claude/Gemini/DeepSeek/MiniMax） |
| Build Agent | 可视化构建 Agent，配置 Workflow + 知识库 + 记忆 |
| Build Apps | 创建应用，工作流编排业务逻辑 |
| Build Workflow | 拖拽式可视化工作流设计（FlowGram） |
| Resources | 插件 / 知识库(RAG) / 数据库 / Prompts |
| API & SDK | OpenAPI + Chat SDK（个人令牌鉴权） |

## 工作流节点类型
开始/结束 · LLM调用 · 条件分支 · 循环执行 · 嵌套子流程 · 插件 · Python代码 · 知识库检索 · 变量

## 模型抽象设计（Eino 框架核心价值）
```go
// 对上层业务逻辑透明，底层可切换
eino-ext/components/model/ark       // 火山方舟
eino-ext/components/model/openai    // OpenAI
eino-ext/components/model/claude   // Claude
eino-ext/components/model/gemini   // Gemini
eino-ext/components/model/deepseek // DeepSeek
eino-ext/components/model/minimax  // MiniMax
```
> 避免单一厂商锁定，这是平台级产品的关键架构设计

## Deployment
- **最低配置:** 2核4G + Docker
- **macOS/Linux:** `make web`
- **Windows:** `docker compose -f ./docker/docker-compose.yml up`
- 访问 http://localhost:8888/

## 战略定位
- 与 Dify、HiAgent 竞争私有化部署市场
- 推动火山引擎（字节云）增长
- 建立企业级 AI Agent 标准

## Relationships
- [[DeerFlow]] — 字节跳动另一个 Agent 框架（LangGraph + Sandbox）
- [[ai-agent-development-platform]] — AI Agent 开发平台通用概念
- [[Eino]] — Coze Studio 的核心 LLM 运行时框架
- [[FlowGram]] — Coze Studio 的可视化工作流编辑器
- [[nanobot]] — HKUDS 轻量 Agent（对比）
- [[openmaic]] — THU-MAIC 多智能体教育（对比）
