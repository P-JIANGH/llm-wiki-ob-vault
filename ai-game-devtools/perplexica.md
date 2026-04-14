---
title: Perplexica (Vane)
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, tool, agent, workflow]
sources: [raw/articles/ai-game-devtools/perplexica.md]
---

# Perplexica (Vane)

**GitHub**: https://github.com/ItzCrazyKns/Perplexica  
**License**: MIT  
**Tech Stack**: Next.js, TypeScript, SearxNG, Drizzle ORM, Docker  
**Category**: LLM & Tool — AI Search Engine

> Note: The repository has been renamed from "Perplexica" to "Vane" but the original URL still works.

## 简介

Perplexica（现更名为 Vane）是一款**隐私优先的 AI 答案引擎**，可完全运行在本地硬件上。它将互联网知识与本地 LLM 支持（Ollama）以及云端提供商（OpenAI、Claude、Groq 等）相结合，在保护搜索隐私的同时提供带引用来源的精准答案。本质上是一个开源的 Perplexity AI 替代品，可自托管。

## 核心功能

| 功能 | 说明 |
|------|------|
| 多 AI 提供商 | 支持 Ollama（本地）、OpenAI、Claude、Gemini、Groq 等 |
| 搜索模式 | 速度模式 / 平衡模式 / 质量模式 |
| 多来源搜索 | 网页、讨论区、学术论文 |
| 组件卡片 | 天气、计算器、股票等快速信息 |
| 文件上传 | 上传 PDF/文本/图片并进行 Q&A |
| 图像/视频搜索 | 多媒体内容检索 |
| 域名筛选搜索 | 限定特定网站的搜索范围 |
| 本地搜索历史 | 所有搜索记录保存在本地 |
| 开发者 API | POST /api/search 供第三方集成 |

## 技术架构

基于 **Next.js** 构建，包含以下核心组件：

1. **Web UI** — 类 Perplexity 的聊天界面，显示引用来源
2. **API 路由**
   - `POST /api/chat` — 驱动聊天 UI
   - `POST /api/search` — 程序化搜索接口
   - `GET /api/providers` — 列出可用的 LLM 提供商
3. **Agent 编排** — 问题分类 → 并行执行研究+组件查询 → 带引用的答案生成
4. **搜索后端** — 通过 **SearxNG** 进行隐私保护的元搜索
5. **LLM 层** — 用于分类、生成答案和引用
6. **嵌入模型** — 对上传文件进行语义搜索
7. **存储层** — Drizzle ORM 持久化对话历史

## 部署方式

```bash
# Docker（推荐，含内置 SearxNG）
docker run -d -p 3000:3000 -v vane-data:/home/vane/data --name vane itzcrazykns1337/vane:latest
```

也支持一键部署到 Sealos、RepoCloud、ClawCloud、Hostinger。

## 与同类工具的对比

- **vs Perplexity AI**（闭源 SaaS）：Perplexica 是完全开源的自托管版本，数据不离开本地
- **vs [[langchain]]**：LangChain 是通用的 LLM 应用框架，Perplexica 专注于搜索增强问答场景
- **vs [[pandallm]]**：PandaLLM 是中文对话模型，Perplexica 是搜索引擎+多模型编排工具
- **vs Open Deep Research**：两者都做研究型搜索，Perplexica 更偏重实时 web 搜索 UI，Open Deep Research 侧重多步骤自动化研究

## 适用场景

- 需要隐私保护的搜索引擎替代品
- 本地运行带引用的 AI 问答系统
- 将 AI 搜索能力集成到自己的应用（通过 API）
- 对本地 LLM（Ollama）进行搜索增强

## 相关资源

- 架构文档：`docs/architecture/README.md`
- API 文档：`docs/API/SEARCH.md`
- Docker Hub：`itzcrazykns1337/vane`

## 关联页面

- [[langchain]] — LangChain 是 Perplexica 中 agent 编排的底层依赖之一
- [[pandallm]] — 同为中文/开源 LLM 生态工具
