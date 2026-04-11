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
Coze Studio 是 Coze（字节跳动）旗下的一站式 AI Agent 开发平台，通过可视化工具简化 Agent 创建、调试和部署。已服务数万企业客户和数百万开发者。

## Key Facts
- **开发者：** Coze / ByteDance
- **许可证：** Apache-2.0
- **Stars：** 20.3k | **Forks：** 2.9k | **Contributors：** 66
- **最新版本：** v0.5.1 (2026-02-05)
- **技术栈：** Go 后端 + React/TypeScript 前端
- **架构：** 微服务 + DDD（领域驱动设计）
- **运行时：** Eino framework
- **HTTP框架：** Hertz（cloudwego）
- **工作流编辑器：** FlowGram

## Core Modules

| 模块 | 功能 |
|------|------|
| Model Service | 模型管理，集成 OpenAI + 火山引擎 |
| Build Agent | 构建/发布/管理 Agent，配置工作流+知识库 |
| Build Apps | 创建应用，工作流编排业务逻辑 |
| Build Workflow | 可视化工作流设计器 |
| Resources | 插件 / 知识库 / 数据库 / Prompts |
| API & SDK | OpenAPI 对话接口 + Chat SDK |

## Architecture

- **Eino**：Agent/工作流运行时引擎，模型抽象层（Coze Studio 的核心运行时）
- **FlowGram**：前端画布式工作流编辑器（拖拽式流程设计）
- **Hertz**：Cloudwego 开源 Go HTTP 框架（高性能微服务）
- **DDD**：Domain-Driven Design，微服务拆分模式

## Deployment
- **推荐：** Docker + Docker Compose
- `make web` 一键启动（macOS/Linux）
- 访问 http://localhost:8888/
- 需要配置模型后才可使用

## Relationships
- [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念
- [[nanobot]] — HKUDS 轻量 Agent（另一个开源 Agent 框架对比）
- [[DeerFlow]] — ByteDance 的 Super Agent Harness（Coze Studio 同源对比）
- [[openmaic]] — THU-MAIC 多智能体互动教室（教育场景对比）
