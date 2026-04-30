---
title: OpenAgents
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, agent, tool, open-source, python, framework]
sources: [raw/articles/ai-game-devtools/openagents.md]
---

# OpenAgents

**XLang NLP Lab** 开源语言 Agent 平台，面向非专业用户提供日常 AI Agent 服务。
arXiv 论文: [2310.10634](https://arxiv.org/abs/2310.10634) | 在线演示: [chat.xlang.ai](https://chat.xlang.ai) | 许可: Apache 2.0

## 概述
OpenAgents 是一个完整的开源 Agent 平台，包含 Web UI、后端服务和三个预构建 Agent，
与 [[langchain]] 代码库兼容，强调实际应用场景而非概念验证。

## 三大 Agent

### 1. Data Agent（数据分析）
- Python/SQL 代码编写与执行，数据搜索/处理/可视化
- Jupyter Kernel 沙箱执行（本地或 Docker 容器 `xlang-code-interpreter-python`）
- 流式输出支持 image/echarts 渲染

### 2. Plugins Agent（插件工具）
- 200+ 第三方插件集成（Klarna 购物、XWeather、Wolfram Alpha 等）
- 组合插件使用（如旅行规划：Klook + 汇率转换 + 天气）
- Auto Plugin Selection：基于 instructor-embedding 的智能工具匹配

### 3. Web Agent（自主网页浏览）
- Chrome 扩展 WeBot 控制浏览器自动导航
- Google Maps 导航、Twitter 发帖、Google Form 填写
- 类似 ChatGPT Plus 的网页操作能力

## 技术架构

| 层级 | 技术栈 | 端口 |
|------|--------|------|
| 前端 | Next.js + React + Tailwind CSS + TypeScript | 3000 |
| 后端 | Flask RESTful API + MongoDB + Redis | 8000 |
| Agent | LangChain AgentExecutor 派生类 | - |
| 部署 | Docker Compose（Redis/MongoDB/Backend/Frontend） | - |

- **存储层**: MongoDB（持久化 user/message/conversation/folder）+ Redis（500MB LRU 缓存）
- **执行层**: 可选 Docker 沙箱，避免多用户/内核并发冲突
- **扩展模式**: "one agent, one folder" — 新增 Agent 只需在 `real_agents/` 下创建文件夹

## 部署方式
- **源码部署**: `flask run -p 8000` + Next.js 开发服务器
- **Docker**: `docker-compose up -d`（含 GPU 支持选项）
- **LLM 支持**: OpenAI API / Azure OpenAI / Anthropic API

## 关键里程碑
- 2023-08: 平台上线，500 用户
- 2023-10-13: 全部代码开源
- 2023-10-26: 3,000 用户

## 相关项目
- 基于 [[langchain]] 构建
- 与 [[autogen]]、[[dify]] 同属 Agent 平台类工具
- XLang Lab 同期发布 [[lemur]]（语言 Agent 基础模型）

## 许可证
Apache 2.0
