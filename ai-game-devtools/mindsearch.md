---
title: MindSearch
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, agent, tool, open-source, python, llm]
sources: [raw/articles/ai-game-devtools/mindsearch.md]
---

# MindSearch

## Overview

MindSearch 是上海 AI Lab（InternLM）开发的开源 AI 深度搜索框架，模拟人类认知模式实现深层搜索能力。它将简单查询动态分解为子问题图，每个子问题通过独立网络搜索解决，最终综合生成完整答案。

论文：arXiv 2407.20183 | 在线演示：https://internlm-chat.intern-ai.org.cn/

## 核心架构

### 三层 Agent 结构

1. **MindSearchAgent（规划器）** — 主 Agent，基于 [[internlm]] 的 Lagent 框架构建，负责将用户查询分解为子问题图
2. **WebSearchGraph（执行图）** — 动态图结构，支持并行执行多个子问题搜索（ThreadPoolExecutor max_workers=10），异步模式使用 32 个独立 event loop
3. **SearcherAgent（搜索器）** — 每个图节点运行独立 SearcherAgent，配备 WebBrowser 插件执行网络搜索

### 搜索流程

```
用户查询 → LLM 规划器生成子问题 → WebSearchGraph 动态建图
→ 并行执行 SearcherAgent（各带搜索引擎）
→ 收集结果构建引用图 → 最终总结回答
```

## 技术特点

- **框架：** Lagent v0.5（InternLM 轻量 Agent 框架）
- **后端：** FastAPI + uvicorn，SSE 流式输出
- **前端：** React（Vite）/ Gradio / Streamlit 三种选项
- **搜索引擎：** DuckDuckGo / Bing / Brave / Google / Tencent（5 种）
- **LLM 支持：** InternLM2.5-7B / GPT-4 / Qwen / SiliconFlow
- **并发模式：** 同步（ThreadPoolExecutor）和异步（asyncio event loop）
- **许可证：** Apache 2.0

## 与同类工具差异

- 相比 [[perplexica]] 等传统 RAG 搜索，MindSearch 采用动态图分解而非静态检索
- 与 [[open-deep-research]] 类似但更注重搜索过程的可视化和流式展示
- 基于 [[internlm]] 生态，与 [[cradle]] 共享 Lagent Agent 框架基础
