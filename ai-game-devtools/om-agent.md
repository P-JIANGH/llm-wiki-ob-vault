---
title: OmAgent
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, agent, framework, python, multimodal, tool]
sources: [raw/articles/ai-game-devtools/om-agent.md]
---

# OmAgent

## 概述

OmAgent 是 OmAI Lab 开源的多模态语言智能体 Python 框架，专注于简化 Agent 开发并提供强大的多模态推理能力。通过封装底层工程复杂性（Worker 编排、任务队列、节点优化），暴露简洁的接口让开发者快速构建 Agent。

- **GitHub:** [om-ai-lab/OmAgent](https://github.com/om-ai-lab/OmAgent)
- **最新版本:** v0.2.4
- **Python:** >= 3.10
- **许可证:** 未明确声明
- **相关论文:** arXiv:2406.16620 (OmAgent 视频理解框架)

## 技术架构

### 核心设计

| 组件 | 描述 |
|------|------|
| **Registry** | 统一注册中心，支持 8 类组件 (prompt/llm/node/worker/tool/encoder/connector/component) |
| **Container** | 单例模式管理连接器和服务组件生命周期 |
| **BotBase** | 所有组件的抽象基类 (Pydantic + ABC)，支持 YAML 配置驱动 |
| **Worker** | 计算基本单元，支持同步/异步执行，通过装饰器注册 |
| **Workflow** | 基于 Conductor 引擎的图编排，支持链式(>>)、fork-join、switch |

### 记忆系统

- **短期记忆 (STM):** Redis STM（分布式）/ SharedMem STM（Lite 模式）
- **长期记忆 (LTM):** Milvus 向量数据库

### LLM 后端

- OpenAI GPT (gpt-4o 等)
- Azure GPT
- Qwen2 / Qwen2-VL (支持本地部署)
- Ollama / LocalAI (本地模型)

### 多模态能力

- VLM 模型原生支持（图像 + 文本推理）
- 视频理解（场景分割 + 问答）
- 语音识别 (STT)
- 目标检测 (OVD)
- 移动设备连接（个人助手模式）

### 内置工具

计算器、代码解释器、文件读写、Web 搜索 (Tavily)、开放词汇检测 (OVD)

## 智能体算子

OmAgent 内置多种推理模式的实现：

| 算子 | 描述 |
|------|------|
| **ReAct / ReAct-Pro** | Reasoning + Acting 交替推理 |
| **CoT** | Chain-of-Thought 链式思维 |
| **SC-CoT** | Self-Consistency CoT 自一致性 |
| **PoT** | Program-of-Thought 程序思维 |
| **Reflexion** | 反思模式（自我修正） |
| **DnC** | Divide-and-Conquer 分治 |
| **GoT** | Graph-of-Thought 图思维 |
| **RAP** | Reasoning via Planning |

性能上 SC-CoT (gpt-3.5-turbo) 在 GSM8K 上达到 80.06 分，显著优于直接 IO 提示 (37.83 分)。

## 部署模式

- **完整版:** 需要 Conductor 中间件（任务队列/调度），支持分布式扩展
- **Lite 模式:** `OMAGENT_MODE=lite`，无需中间件，使用 SharedMem 共享内存，适合本地开发

## 同类工具对比

与 [[ai-game-devtools/langchain]] 的 LCEL 链式编排和 [[ai-game-devtools/autogen]] 的多 Agent 对话不同，OmAgent 采用 **Conductor 工作流引擎** 作为底层调度，Worker 作为计算单元，配置完全由 YAML 驱动。

与 [[ai-game-devtools/aios]] 的 LLM 内核抽象层和 [[ai-game-devtools/chatdev]] 的角色驱动多智能体相比，OmAgent 更注重**多模态能力**和**推理算子多样性**，内置 8+ 种推理模式的统一实现和对比基准。

与 [[ai-game-devtools/dify]] 的可视化平台相比，OmAgent 是纯代码框架，适合研究者和需要定制推理逻辑的开发者。

## 游戏开发相关价值

- NPC 多模态 Agent：支持视觉 + 语音 + 文本的综合决策
- 视频理解 Agent：可用于游戏录像/回放分析
- 多种推理模式可调优：根据场景选择 CoT（复杂逻辑）或 ReAct（工具调用）
- Lite 模式无需中间件：适合游戏内嵌或本地部署

## 关键链接

- [GitHub](https://github.com/om-ai-lab/OmAgent)
- [文档](https://om-ai-lab.github.io/OmAgentDocs/)
- [论文](https://arxiv.org/abs/2406.16620)
- [Discord](https://discord.gg/G9n5tq4qfK)
- [Open Agent Leaderboard](https://github.com/om-ai-lab/open-agent-leaderboard)
