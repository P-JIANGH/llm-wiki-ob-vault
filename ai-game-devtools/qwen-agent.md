---
title: Qwen-Agent
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, agent, tool, framework, python, open-source]
sources: [raw/articles/ai-game-devtools/qwen-agent.md]
---

# Qwen-Agent

## 概述

Qwen-Agent 是阿里巴巴 Qwen 团队开发的 LLM 应用开发框架，基于 Qwen 系列的指令遵循、工具调用、规划和记忆能力构建。该框架是 [Qwen Chat](https://chat.qwen.ai/) 的后端引擎，提供从 Agent 核心组件到 GUI 部署的完整开发链路。

最新版本：**v0.0.34**，许可证：**Apache 2.0**。

## 核心架构

### 组件分层

- **Agent 层** (`qwen_agent/agents/`) — 预设 Agent 实现
  - `Assistant` — 通用助手（支持工具 + 文件阅读）
  - `FnCallAgent` — 函数调用 Agent
  - `ReActChat` — ReAct 推理式 Agent
  - `GroupChat` — 多智能体群聊
  - `TIRAgent` — 工具集成推理 Agent（数学问题）
  - `VirtualMemoryAgent` — 超长文档记忆（1M+ tokens）

- **LLM 适配层** (`qwen_agent/llm/`) — 多后端统一接口
  - `BaseChatModel` — 抽象基类
  - DashScope 原生接口（Qwen/Qwen-VL/Qwen-Audio/Qwen-Omni）
  - OpenAI 兼容接口（vLLM、Ollama）
  - Function Calling 支持（nous 风格 prompt 模板）

- **工具层** (`qwen_agent/tools/`) — 工具注册与实现
  - `@register_tool` 装饰器注册
  - `CodeInterpreter` — Docker 沙箱代码执行
  - `Retrieval` — RAG 检索
  - `WebSearch` / `WebExtractor` — 网络工具
  - `MCPManager` — MCP 服务器管理
  - `PythonExecutor` — Python 代码执行

- **GUI 层** — Gradio 5 快速部署 WebUI

### 关键设计

1. **流式响应** — `run()` 方法返回生成器，支持打字机式输出
2. **并行工具调用** — 默认 tool calling 模板支持并行 Function Calls
3. **Docker 代码沙箱** — 仅挂载指定工作目录，基础隔离
4. **MCP 集成** — 可接入 Model Context Protocol 服务器
5. **超长文档 QA** — RAG + Parallel Doc QA 方案，支持百万 token 上下文

## 安装方式

```bash
# 最小安装
pip install -U qwen-agent

# 完整安装（GUI + RAG + 代码解释器 + MCP）
pip install -U "qwen-agent[gui,rag,code_interpreter,mcp]"
```

## 模型支持

- **DashScope** — Qwen-Max-Latest、Qwen3 系列、Qwen3.5
- **自部署** — vLLM / Ollama（OpenAI 兼容 API）
- **视觉模型** — Qwen3-VL、Qwen2-VL（支持图片搜索、缩放等工具调用）
- **代码模型** — Qwen3-Coder（推荐启用 vLLM 内置 tool parsing）

## 与同类框架的差异

| 维度 | Qwen-Agent | [[langchain]] | [[autogen]] |
|------|-----------|---------------|-------------|
| 生态绑定 | 深度绑定 Qwen 模型 | 模型无关，多 Provider | 微软生态，多模型 |
| 代码解释器 | Docker 沙箱 | 需自行实现 | 需自行实现 |
| 超长上下文 | 原生 1M+ token RAG | LangChain 分块 | 依赖模型窗口 |
| GUI | Gradio 内置 | 无 | 无 |
| MCP 支持 | 原生集成 | 有 | 有 |
| 多智能体 | GroupChat + MultiAgentHub | LangGraph | 原生多 Agent 对话 |

## 相关链接

- GitHub: https://github.com/QwenLM/Qwen-Agent
- 文档: https://qwenlm.github.io/Qwen-Agent/en/
- Qwen Chat: https://chat.qwen.ai/
- DeepPlanning 评测: https://qwenlm.github.io/Qwen-Agent/en/benchmarks/deepplanning/
