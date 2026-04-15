---
title: FastGPT
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, workflow, tool]
sources: [raw/articles/ai-game-devtools/fastgpt.md]
---

# FastGPT

[[labring]] 出品的 **AI Agent 构建平台**，提供开箱即用的数据处理、模型调用能力，支持通过 Flow 可视化工作流编排实现复杂应用场景。

## 概述

FastGPT 是一个企业级 LLM 应用开发平台，核心定位与 [[dify]] 类似，但更强调 **Agent 编排能力** 和 **双向 MCP 协议支持**。提供知识库管理、Workflow 可视化编排、OpenAI 兼容 API、运营管理等功能，支持 Docker 一键部署。

## 核心技术特点

**可视化 Flow 编排** — 基于 ReactFlow 的节点图编辑，支持对话工作流、插件工作流、RPA 节点编排，无需编码即可组合复杂业务流程。

**知识库 + RAG** — 内置多格式文档解析（PDF/DOCX/PPTX/HTML/TXT/MD/CSV/XLSX）、混合检索与重排、chunk 可视化编辑、API 知识库调用。

**双向 MCP 协议** — 支持 MCP (Model Context Protocol) 双向通信，可扩展接入外部工具和数据源。

**OpenAI 兼容 API** — completions 接口与 GPT 接口对齐，便于现有应用迁移。

**多部署方式** — Docker Compose / Sealos Cloud 一键部署 / 本地开发 (Next.js + pnpm)。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js, React, Chakra UI, ReactFlow, ECharts |
| 后端 | Node.js (tsx), TypeScript |
| 存储 | @fastgpt-sdk/storage, MinIO |
| AI 协议 | MCP SDK, Function Calling, ReAct |
| 包管理 | pnpm 9.x, Node.js ≥20 |

## 核心功能模块

### 应用编排
- 规划 Agent 模式
- 对话工作流 / 插件工作流（含 RPA 节点）
- 用户交互节点
- 辅助生成工作流（规划中）

### 知识库
- 多格式文档解析与 QA 拆分导入
- 混合检索 + 重排（Rerank）
- chunk 可视化管理
- API 知识库

### 运营能力
- 免登录分享窗口 / Iframe 嵌入
- 对话记录统一查阅与标注
- 应用运营日志
- 模板市场

## 相关链接

- GitHub: https://github.com/labring/FastGPT
- 文档: https://doc.fastgpt.io/docs/introduction
- 云服务: https://fastgpt.io/

## 相关项目

同属 LLM 应用开发平台，对比 [[dify]]（可视化 Workflow + RAG + [[agent|Agent]]），FastGPT 更偏重开箱即用的企业级 Agent 编排场景。[[autogen]] 和 [[crewai]] 也属多 Agent 协作框架，但 FastGPT 更强调可视化 Flow 而非纯代码编排。
