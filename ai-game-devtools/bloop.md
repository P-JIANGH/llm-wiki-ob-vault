---
title: bloop
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [tool, open-source, code, rust, tauri, desktop-app, semantic-search]
sources:
  - raw/articles/ai-game-devtools/bloop.md
---

# bloop

BloopAI 的 AI 代码搜索工具，"ChatGPT for your code"。支持自然语言提问、代码搜索、补丁生成，以现有代码库作为上下文。

## 功能

- **AI 对话式搜索**：用自然语言提问代码库，LLM 驱动的多步 Agent 推理
- **Code Studio**：LLM 沙盒，将你的代码作为上下文
- **正则表达式搜索**：高性能 regex 搜索
- **语义搜索**：ONNX 端侧 embedding，隐私友好，无需上传代码到云端
- **符号搜索**：查找函数、变量、trait（基于 Tree-sitter 支持 10+ 语言）
- **精确代码导航**：go-to-definition / go-to-reference
- **仓库同步**：本地 + GitHub 仓库同步索引

## 技术架构

**三层架构**：
- `server/bleep`：Rust 后端核心，包含搜索、导航、AI Agent 逻辑
- `client`：React 前端（Vite 构建）
- `apps/desktop`：Tauri 跨平台桌面应用

**核心子系统**：
- **Tantivy**：全文搜索索引
- **Qdrant**：语义/向量搜索（[[ai-game-devtools/everything-ai]] 也使用 Qdrant 作为向量数据库）
- **Tree-sitter**：多语言 AST 解析，支持精确代码导航
- **ONNX**：端侧 embedding 模型，隐私优先

## Agent 模块

`server/bleep/src/agent` 实现了一个基于步骤的 AI Agent 循环（最大 10 步）：
- **Query** → 解析用户输入，提取关键词，触发代码搜索
- **Code Search** → Tantivy 关键词搜索
- **Path Search** → 模糊文件路径匹配
- **Proc Search** → 针对特定文件的定向查询
- **Answer** → 使用 LLM 综合搜索结果

工具模块：`code.rs`、`path.rs`、`proc.rs`、`answer.rs`。对话历史通过 tiktoken 动态裁剪以适应模型上下文窗口。

## 部署

- **桌面应用**：下载 releases 或从源码构建（需 Tauri + Cargo）
- **命令行**：`server/README.md` 提供 CLI 运行说明
- **Docker**：`docker-compose.yml` 包含 Qdrant 服务
- **自建**：配置 `local_config.json`（GitHub token + OpenAI API key）

## 许可

Apache 2.0

## 相关链接

- GitHub: https://github.com/BloopAI/bloop
- 文档: https://bloop.ai/understand/docs/getting-started
- Gitpod 在线开发: https://gitpod.io/#https://github.com/BloopAI/bloop

## 同类对比

与 [[ai-game-devtools/jan]]（另一个基于 Tauri 的本地 LLM 桌面应用）相比：
- bloop 专注于代码搜索和理解，jan 专注于 LLM 对话和本地推理
- 两者都使用 Tauri + Rust 后端 + 本地模型
- bloop 的语义搜索依赖 Qdrant，jan 依赖 llama.cpp
