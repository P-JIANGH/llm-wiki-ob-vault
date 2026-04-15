---
title: Dify
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, workflow, framework, tool]
sources: [raw/articles/ai-game-devtools/dify.md]
---

# Dify

开源 LLM 应用开发平台，结合 AI Workflow、RAG Pipeline、Agent 能力、模型管理和可观测性功能。

## Overview

Dify 是一个开源的 LLM 应用开发平台，提供直观的界面让用户快速从原型过渡到生产环境。核心功能包括可视化工作流构建、100+ 模型接入、Prompt IDE、RAG 检索增强、Agent 能力（Function Calling/ReAct）以及 LLMOps 监控。

由 **LangGenius** 开发，2025 年发布，GitHub stars 持续增长，是 LangChain、Flowise 等工具的直接竞品。

## Technical Architecture

### Backend (`/api`)
- **语言/框架**: Python Flask，Domain-Driven Design 架构
- **异步任务**: Celery + Redis
- **数据库 ORM**: SQLAlchemy，模型继承自 `models.base.TypeBase`
- **包管理**: `uv`
- **代码规范**: Ruff formatting/linting、Pydantic v2、TypedDict、max 120 chars/line、文件 < 800 lines
- **分层架构**: controller → service → core/domain
- **多租户**: 所有查询按 `tenant_id` 隔离

### Frontend (`/web`)
- Next.js + TypeScript + React

### Deployment (`/docker`)
- Docker Compose 一键部署，最小要求：2 Core CPU + 4 GiB RAM

## Key Features

| Feature | Description |
|---------|-------------|
| **Workflow** | 可视化画布构建和测试 AI 工作流 |
| **Model Support** | 100+ 专有/开源 LLM（GPT/Mistral/Llama3 等），支持 OpenAI API 兼容模型 |
| **Prompt IDE** | Prompt 编写、模型性能对比、TTS 扩展 |
| **RAG Pipeline** | 文档摄取→检索，支持 PDF/PPT 等常见格式 |
| **Agent** | LLM Function Calling 或 ReAct 推理，50+ 内置工具（Google/DALL·E/Stable Diffusion/WolframAlpha） |
| **LLMOps** | 日志分析、性能监控、基于生产数据的持续优化 |
| **Backend-as-a-Service** | 所有功能均有 REST API，可集成到自有业务 |

## 与同类工具对比

Dify vs. [[ai-game-devtools/xagent]]（OpenBMB）：XAgent 是纯研究导向的自主 Agent 框架，强调Dispatcher+Planner+Actor 三层架构和 Docker 沙箱隔离；Dify 更偏向生产级应用开发平台，强调可视化工作流和一站式部署。

Dify vs. [[ai-game-devtools/langflow]]：LangFlow 是纯可视化 LangChain 工作流构建器，专注于流程编排；Dify 功能更广泛，涵盖模型管理、LLMOps、RAG 和 Agent，比 LangFlow 更接近"一站式 LLM 平台"。

Dify vs. [[ai-game-devtools/agentbench]]：AgentBench 是评测基准而非开发框架，用于评估 LLM 作为自主 Agent 的规划与工具使用能力；Dify 是使用这些能力的应用平台。

## License

**Dify Open Source License**（基于 Apache 2.0）附加条件：
- 多租户服务需商业许可
- 前端 LOGO/版权信息不得移除
- © 2025 LangGenius, Inc.

## Links

- GitHub: https://github.com/langgenius/dify
- Docs: https://docs.dify.ai
- Cloud: https://cloud.dify.ai
- Discord: https://discord.gg/FngNHpbcY7
