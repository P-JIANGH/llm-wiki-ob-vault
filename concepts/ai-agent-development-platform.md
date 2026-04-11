---
title: AI Agent Development Platform
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [ai, llm, agent, framework]
sources: [raw/articles/coze-studio-github-2026.md]
---

# AI Agent Development Platform

## Definition
AI Agent 开发平台是提供可视化工具用于创建、调试和部署 AI Agent 的集成开发环境。核心能力通常包括：提示词编排、检索增强生成（RAG）、插件系统、工作流引擎、模型管理。

## Core Components

| 组件 | 说明 |
|------|------|
| Prompt Engineering | 提示词编写、调试、优化 |
| RAG | 知识库构建 + 检索增强 |
| Plugin System | 工具/接口扩展机制 |
| Workflow Engine | 可视化流程编排（LLM 调用链） |
| Model Management | 多模型统一接入 |
| Agent Builder | Agent 构建/发布/管理 UI |

## 代表平台

| 平台 | 开发方 | 特点 |
|------|--------|------|
| [[coze-studio]] | ByteDance/Coze | 可视化 Agent/Workflow 构建，微服务+DDD，Eino 运行时 |
| [[DeerFlow]] | ByteDance | LangGraph + LangChain，12步 middleware，Sandbox 隔离 |
| [[nanobot]] | HKUDS | 轻量极简，22+ Provider，13消息渠道 |
| [[openmaic]] | THU-MAIC | 教育场景，多 Agent 课堂互动 |
| [[openclaw]] | HKUDS | 43万行压缩到4000行，极简消息 Agent |
| [[ClawTeam]] | HKUDS | Agent Swarm，git worktree 隔离协作 |

## 技术架构模式

### 工作流编排
平台普遍采用 DAG/LangGraph 类工作流引擎：
- [[DeerFlow]]：LangGraph + 12步 middleware chain
- [[coze-studio]]：FlowGram 可视化画布 + Eino 运行时
- [[ClawTeam]]：CLI Agent 组队协作

### 多 Agent 模式
- [[multi-agent-ai-simulation]]：通用多智能体概念（记忆/任务/感知/决策）
- [[agent-swarm]]：Leader 拆解 + Worker 并行 + inbox 消息模式

## 与本项目（一人 AI 游戏自媒体）的关联
老板的 AI 游戏自媒体项目可利用 Agent 开发平台：
- 用 Coze Studio 或 DeerFlow 构建客服/运营 Agent
- 用 [[openmaic]] 模式做游戏教程类内容
- 参考 [[coze-studio]] 的工作流设计（Build Agent → Build Workflow）构建游戏内 AI NPC 对话流程

## Related
- [[coze-studio]] — Coze Studio 实体页
- [[DeerFlow]] — ByteDance Super Agent Harness
- [[nanobot]] — HKUDS 轻量 Agent
- [[multi-agent-ai-simulation]] — 多智能体通用概念
