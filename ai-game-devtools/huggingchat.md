---
title: HuggingChat
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [tool, llm, frontend, typescript, open-source]
sources: [raw/articles/ai-game-devtools/huggingchat.md]
---

# HuggingChat

## 概述

HuggingChat 是 Hugging Face 官方的开源 LLM 聊天界面产品，通过开源仓库 `huggingface/chat-ui` 提供源码。它是一个 [[SvelteKit]] 2 应用，通过 OpenAI 兼容 API 与任意 LLM 后端通信，驱动着 [hf.co/chat](https://huggingface.co/chat) 上的 HuggingChat 产品。相比 [[dify]] 等国内平台，HuggingChat 更轻量，专注聊天界面而非工作流编排。

## 技术特点

**技术栈：** SvelteKit 2 + Svelte 5 (使用 runes 响应式系统) / TailwindCSS / MongoDB / TypeScript

**核心特性：**
- 仅通过 `OPENAI_BASE_URL` + `/models` 端点接入 LLM，支持 Hugging Face Inference Providers / llama.cpp / Ollama / OpenRouter / Poe 等任意 OpenAI 兼容后端
- **Omni 智能路由器** — 基于 katanemo/Arch-Router-1.5B，自动为每条消息选择最优模型
- **MCP Tools 集成** — 通过 Model Context Protocol 调用外部工具，暴露为 OpenAI function calling
- MongoDB 持久化（支持 Atlas / 本地 / 无配置开发模式）
- Docker 一键部署 (`chat-ui-db` 镜像内置 MongoDB)

**LLM 推理流程：** `POST /conversation/[id]` → MongoDB 获取历史 → 构建消息树 → OpenAI 客户端流式推理 → 响应流式返回并持久化

## 与同类工具对比

| 特性 | HuggingChat | [[dify]] | [[text-generation-webui]] |
|------|-------------|---------------------------|-------------------------------------------|
| 框架 | SvelteKit | Next.js/FastAPI | Gradio |
| LLM 接入 | OpenAI 兼容 API | 100+ 模型原生集成 | 多后端（llama.cpp/TensorRT 等） |
| 工作流编排 | ❌ | ✅ 可视化 | ❌ |
| MCP/Tools | ✅ | ✅ MCP | ❌ |
| 许可证 | Apache 2.0 | Dify Open Source License | MIT |

## 应用场景

- 快速部署私有 ChatGPT 替代品，接入本地 Ollama 或云端模型
- 作为 Omni 路由器的前端，统一管理多个 LLM 提供商
- 游戏 NPC 对话后端 — 通过 OpenAI 兼容 API 与 [[cradle]] 或 [[larp]] 等 Agent 框架集成

## 相关链接

- GitHub: https://github.com/huggingface/chat-ui
- 产品: https://huggingface.co/chat/
- 许可证: Apache 2.0
