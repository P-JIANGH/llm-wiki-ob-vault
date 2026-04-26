# HuggingChat / chat-ui

> Source: https://github.com/huggingface/chat-ui
> Captured: 2026-04-26

## Overview

HuggingChat 是 Hugging Face 官方开源的 LLM 聊天界面产品，通过 `huggingface/chat-ui` 仓库提供源码。它本质上是一个 SvelteKit 应用，通过 OpenAI 兼容 API 与任意 LLM 后端通信，驱动着 hf.co/chat 上的 HuggingChat 应用。

## 技术栈

- **框架**: SvelteKit 2 + Svelte 5 (使用 runes: `$state`, `$effect`, `$bindable`)
- **样式**: TailwindCSS
- **数据库**: MongoDB (支持 Atlas 云部署；开发模式可无数据库运行，数据持久化到 `./db`)
- **认证**: OpenID Connect
- **AI SDK**: `openai` (官方 Node.js SDK) + `@huggingface/inference`
- **测试**: Vitest (Playwright 浏览器端测试 / Vitest SSR / Node 环境测试)
- **构建**: Vite 6

## 核心架构

### 目录结构
```
src/
├── lib/
│   ├── components/    # Svelte 组件 (chat/, mcp/, voice/, icons/)
│   ├── server/
│   │   ├── api/utils/      # API 辅助 (auth, model/conversation 解析)
│   │   ├── textGeneration/  # LLM 流式推理管线
│   │   ├── mcp/            # Model Context Protocol 集成
│   │   ├── router/         # Omni 智能模型路由
│   │   ├── database.ts     # MongoDB 集合定义
│   │   ├── models.ts       # 模型注册表 (从 /models 端点发现)
│   │   └── auth.ts         # OpenID 认证
│   ├── types/          # TypeScript 接口
│   └── utils/          # 工具函数
└── routes/             # SvelteKit 文件路由
    ├── conversation/[id]/  # 聊天页面 + 流式端点
    ├── settings/           # 用户设置页
    ├── api/v2/            # REST API v2
    └── r/[id]/            # 分享对话视图
```

### LLM 推理流程
1. `POST /conversation/[id]` 接收用户消息
2. 服务端验证用户，获取对话历史
3. 构建消息树结构 (tree/ 模块)
4. 通过 OpenAI 客户端调用 LLM 端点
5. 流式返回响应，持久化到 MongoDB

## 主要功能

### 1. OpenAI 兼容 API 接入
仅支持 `OPENAI_BASE_URL` + `/models` 端点。支持的提供商:
- Hugging Face Inference Providers (`router.huggingface.co/v1`)
- llama.cpp server (本地)
- Ollama (本地)
- OpenRouter
- Poe
- 任何兼容 OpenAI 协议的服务

### 2. LLM Router (Omni) — 智能路由
- 使用 [katanemo/Arch-Router-1.5B](https://huggingface.co/katanemo/Arch-Router-1.5B) 作为路由模型
- 用户选择 "Omni" 虚拟别名时，后台调用 Arch 端点自动选择最优模型
- 支持多模态/工具调用快捷路由
- 可配置路由策略 JSON (`LLM_ROUTER_ROUTES_PATH`)

### 3. MCP Tools (Model Context Protocol)
- 通过 `MCP_SERVERS` 环境变量配置 MCP 服务器
- 支持 Exa Web Search 等官方 MCP
- 自动将工具暴露为 OpenAI function calling
- Omni 路由器可自动选择支持工具调用的模型

### 4. 数据库选项
- MongoDB Atlas (托管云数据库)
- 本地 MongoDB (Docker 容器)
- 开发模式: 无需配置 MongoDB，自动回退到嵌入的 MongoDB Memory Server

### 5. Docker 部署
- `chat-ui-db` 镜像内置 MongoDB，一行命令启动
- 所有 `.env.local` 环境变量均可通过 `-e` 传入

## 版本与许可证

- **版本**: 0.20.0
- **许可证**: Apache 2.0
- **版权**: Copyright 2018- The Hugging Face team

## 快速启动

```bash
git clone https://github.com/huggingface/chat-ui
cd chat-ui
npm install
# 创建 .env.local:
echo "OPENAI_BASE_URL=https://router.huggingface.co/v1" > .env.local
echo "OPENAI_API_KEY=hf_你的token" >> .env.local
npm run dev
```

## 关键源码文件

| 文件 | 说明 |
|------|------|
| `src/lib/server/textGeneration/index.ts` | LLM 流式推理核心 |
| `src/lib/server/models.ts` | 模型注册与发现 |
| `src/lib/server/router/chat.ts` | Omni 路由器实现 |
| `src/lib/server/mcp/index.ts` | MCP 工具集成 |
| `src/routes/conversation/[id]/+server.ts` | 聊天 API 端点 |
| `src/lib/types/Conversation.ts` | 对话数据结构 |
