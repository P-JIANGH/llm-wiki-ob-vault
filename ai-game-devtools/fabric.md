---
title: fabric — AI Augmentation Framework
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, cli, framework, llm, agent, workflow, open-source]
sources: [raw/articles/ai-game-devtools/fabric.md]
---

# fabric — AI Augmentation Framework

## Overview

**fabric** 是用 Go 编写的开源 AI 增强框架，核心理念：*"AI 没有能力问题——它有的是集成问题。"* 通过将 AI 的基本单元（prompts）组织成可复用、可组合的 **Patterns**，让用户把 AI 能力整合进日常生活和工作流程。创始人和主要贡献者是 Daniel Miessler。

## Key Facts

| Field | Value |
|-------|-------|
| Language | Go |
| License | MIT |
| Primary Contributor | Daniel Miessler |
| Architecture | CLI + REST API Server + Plugin System |
| Config Dir | `~/.config/fabric/` |
| First Release | 2023 |

## Philosophy

> AI isn't a thing; it's a _magnifier_ of a thing. And that thing is **human creativity**.

Fabric 认为现代 AI 的核心挑战不是能力不足，而是**集成困难**。项目采用"分而治之"策略：将复杂问题拆解为独立步骤，再逐一用 AI 处理。同时解决 prompts 数量过多、难以发现和管理的痛点。

## Architecture

### Core Components

- **`cmd/fabric/main.go`** — CLI 主入口
- **`internal/plugins/`** — 插件系统
  - `ai/` — AI 提供商集成（OpenAI、Anthropic Claude、Google Gemini、Ollama、Azure、Bedrock、Vertex、Perplexity 等 20+ 提供商）
  - `template/` — 模板扩展系统（text、file、fetch、datetime、sys 等内置扩展）
  - `strategy/` — 模型路由策略选择
  - `db/` — 持久化层（fsdb 基于文件系统）
- **`internal/server/`** — REST API 服务器（Swagger UI）
- **`web/`** — Svelte Web UI
- **Helper apps**: `to_pdf`、`code2context`、`generate_changelog`

### Patterns（核心抽象）

Patterns 是 fabric 的核心——存储在 `~/.config/fabric/patterns/` 目录下的 Markdown 文件。每个 Pattern 包含：
- Frontmatter 元数据（变量定义、模型偏好）
- 系统提示词
- 用户提示模板

Pattern 覆盖领域：视频/播客内容提取、论文总结、代码解释、文案写作、AI 图像提示生成、YouTube 字幕提取、文档转换、社交媒体内容生成等。

## Features

- **CLI**: `fabric -p <pattern>` 运行指定 Pattern
- **REST API Server**: `fabric --serve`，Swagger UI 在 `/swagger/index.html`
- **Ollama 兼容模式**
- **多提供商支持**: 20+ AI 提供商（原生 + OpenAI 兼容）
- **Speech-to-text**: `--transcribe-file`
- **全国际化**: 10 种语言
- **Docker 支持**: Docker Hub / GHCR 预构建镜像
- **Shell 别名**: 可为所有 Pattern 生成命令别名

## 与同类工具对比

| Dimension | fabric | [[ai-game-devtools/metagpt|MetaGPT]] | [[ai-game-devtools/autogen|AutoGen]] | [[ai-game-devtools/langchain|LangChain]] |
|-----------|--------|-------------------------------|------------------------------|--------------------|
| Language | Go | Python | Python | Python |
| Core Focus | Prompt pattern management | Multi-agent software dev | Multi-agent collaboration | LLM app framework |
| CLI-first | ✅ | ❌ | ❌ | ❌ |
| REST API | ✅ | ❌ | ❌ | ✅ |
| Provider count | 20+ | Depends on backend | Depends on backend | 20+ |
| Pattern system | Markdown files | Python code | Python code | Python code |
| License | MIT | MIT | MIT | MIT |

## 安装方式

```bash
# Unix/Linux/macOS 一键安装
curl -fsSL https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.sh | bash

# Windows PowerShell
iwr -useb https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.ps1 | iex

# 从源码（需要 Go）
go install github.com/danielmiessler/fabric/cmd/fabric@latest

# Docker
docker run --rm -it kayvan/fabric:latest -p summarize
docker run --rm -it -p 8080:8080 kayvan/fabric:latest --serve
```

## 相关链接

- GitHub: https://github.com/danielmiessler/fabric
- DeepWiki: https://deepwiki.com/danielmiessler/Fabric
- YouTube: Network Chuck, David Bombal 等频道介绍
