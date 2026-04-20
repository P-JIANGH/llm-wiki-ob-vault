---
title: AgentScope
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [agent, framework, llm, multi-agent, python, open-source, tool, voice, rl]
sources: [raw/articles/ai-game-devtools/agentscope.md]
aliases: ["AgentScope"]

---

# AgentScope

[[ai-game-devtools/ai-town|ai-town]] | [[ai-game-devtools/autogen|AutoGen]] | [[ai-game-devtools/langchain|LangChain]]

## 概述

AgentScope 是阿里巴巴通义实验室 SysML 团队开发的**生产级 Python Agent 框架**（Apache 2.0），专为日益 Agentic 化的 LLM 设计。核心 philosophy 是**利用模型自身的推理和工具调用能力**，而非用严格 prompt 约束。2024 年发布 v1（arXiv:2402.14034），2025-08 发布 v1.1 论文（arXiv:2508.16279），2026-04 v2.0 路线图进行中。

## 核心特性

| 维度 | 说明 |
|------|------|
| **Simple** | 5 分钟上手：内置 ReAct Agent、Toolkit、Memory、Planning、实时语音、RL 微调 |
| **Extensible** | MCP/A2A 协议支持、Message Hub 多 Agent 编排、丰富生态集成 |
| **Production-ready** | 本地 / Serverless / K8s 部署，OpenTelemetry 链路追踪 |

## 架构模块

AgentScope 核心模块位于 `src/agentscope/`:

- **`agent/`** — ReActAgent（默认）、VoiceAgent、DeepResearchAgent、BrowserAgent、MetaPlannerAgent、A2AAgent、RealtimeVoiceAgent
- **`model/`** — 模型抽象层，支持 DashScope / OpenAI / Anthropic / Gemini 等
- **`tool/`** — Toolkit 工具注册中心，内置 `execute_python_code`、`execute_shell_command`
- **`memory/`** — InMemoryMemory、SQLite 持久化、Memory Compression、ReMe 长期记忆
- **`pipeline/`** — MsgHub 消息中枢 + sequential/concurrent/broadcast 管道
- **`mcp/`** — HTTP MCP Client，可将 MCP 工具转为本地函数
- **`realtime/`** — 实时语音对话（WebRTC）
- **`tts/`** — Text-to-Speech 集成
- **`tuner/`** — Trinity-RFT 强化学习微调（Math Agent / Frozen Lake / Werewolf 等案例）
- **`a2a/`** — Agent-to-Agent 标准化协议
- **`tracing/`** — OpenTelemetry 可观测性

## 与同类工具的差异

| 工具 | 定位 | AgentScope 差异点 |
|------|------|------------------|
| [[ai-game-devtools/langchain|LangChain]] | 通用 LLM 应用框架 | AgentScope 更聚焦 Agent 编排，内置 Game 示例（Werewolf）和 RL 微调 |
| [[ai-game-devtools/autogen|AutoGen]] | 多 Agent 对话框架 | AgentScope 强调生产级部署（K8s/OTel）和 MCP/A2A 协议深度集成 |
| [[ai-game-devtools/ai-town|ai-town]] | 轻量单 Agent 沙盒 | AgentScope 支持复杂多 Agent 工作流 + 实时语音 |
| crewAI | 多 Agent 角色编排 | AgentScope 内置 RL 微调支持和 Game 垂直场景 |

## 游戏相关示例

- **`examples/game/werewolves/`** — 九人狼人杀：多 Agent 策略交互，支持语音模式
- **`examples/agent/voice_agent/`** — 语音驱动 Agent，可玩语音版狼人杀
- **`examples/agent/realtime_voice_agent/`** — 实时语音多 Agent 工作流

## 关键依赖

`dashscope`（阿里云模型服务）、`anthropic`、`openai`、`mcp>=1.13`、`opentelemetry-*`、`sqlalchemy`、`python-socketio`、`sounddevice`

Python >= 3.10

## 相关链接

- GitHub: https://github.com/agentscope-ai/agentscope
- 文档: https://doc.agentscope.io/
- arXiv v1: https://arxiv.org/abs/2402.14034
- arXiv v1.1: https://arxiv.org/abs/2508.16279
