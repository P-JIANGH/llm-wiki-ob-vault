---
title: coze-dev/coze-studio GitHub Repository
url: https://github.com/coze-dev/coze-studio
created: 2026-04-10
type: source
tags: [source]
---

# coze-dev/coze-studio

## Basic Info
- **Repository:** coze-dev/coze-studio
- **License:** Apache-2.0
- **Stars:** 20.3k | **Forks:** 2.9k | **Contributors:** 66 | **Commits:** 388
- **Latest Release:** v0.5.1 (Feb 5, 2026)

## Overview
Coze Studio 是一站式 AI Agent 开发平台，通过可视化工具简化 Agent 创建、调试和部署。源自 Coze 开发平台，已服务数万企业客户和数百万开发者。

**核心定位:** "Prompt, RAG, plugin, workflow — 让开发者聚焦 AI 核心价值创造"

## Tech Stack
| Component | Technology |
|-----------|------------|
| Backend | Go (Golang) |
| Frontend | React + TypeScript |
| Architecture | Microservices, Domain-Driven Design (DDD) |
| Runtime | Eino framework (agent/workflow runtime) |
| HTTP Framework | Hertz (cloudwego) |
| Workflow Editor | FlowGram |

**语言分布:** TypeScript 80.3% | Go 13.6% | Less 2.7% | Thrift 1.4% | JavaScript 1.0%

## Features
| 模块 | 功能 |
|------|------|
| Model Service | 模型列表管理，集成 OpenAI 和火山引擎服务 |
| Build Agent | 构建、发布、管理 Agent；配置工作流、知识库 |
| Build Apps | 创建/发布应用；通过工作流构建业务逻辑 |
| Build Workflow | 创建、修改、发布、删除工作流 |
| Resources | 插件、知识库、数据库、Prompts |
| API & SDK | OpenAPI 对话接口；Chat SDK 集成 |

## Quickstart
```bash
git clone https://github.com/coze-dev/coze-studio.git
cd coze-studio
make web    # macOS/Linux

# Windows:
cp ./docker/.env.example ./docker/.env
docker compose -f ./docker/docker-compose.yml up
```
访问：http://localhost:8888/

## Project Structure
```
coze-studio/
├── backend/       # 后端服务
├── frontend/      # 前端应用
├── common/       # 共享工具
├── docker/       # Docker 配置
├── docs/         # 文档
├── helm/charts/  # Kubernetes Helm charts
├── idl/          # 接口定义语言
├── scripts/      # 构建/部署脚本
├── Makefile      # 构建自动化
└── rush.json    # Monorepo 管理
```

## 核心依赖
- **Eino** — Agent/工作流运行时引擎，模型抽象层
- **FlowGram** — 前端画布工作流编辑器
- **Hertz** — Cloudwego Go HTTP 框架

## Security Notes
- 公网部署需注意：账户注册功能、工作流代码节点 Python 执行环境
- SSRF 风险、API 水平权限提升
- 安全报告：security@bytedance.com

## 社区
- 飞书群
- Discord: Coze Community
- Telegram: Coze Group
