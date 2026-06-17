---
title: TaskGen
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [tool, agent, llm, open-source, workflow]
sources: [raw/articles/ai-game-devtools/taskgen.md]
---

# TaskGen (Simbian)

**TaskGen** 是一个基于任务的 AI Agent 框架，核心特色是使用 StrictJSON 实现 LLM Agent 的结构化 JSON 输出。由 John Tan Chong Min 创建，Simbian AI 支持。2024 年 10 月后，原作者在 https://github.com/tanchongmin/taskgen 维护独立版本。

## 概述

TaskGen 将复杂任务自动分解为子任务，通过 JSON 格式而非自由文本进行 Agent 间通信，使 Agent 输出更简洁、结构化、可解析。与 [[autogen]] 等基于对话文本的框架相比，TaskGen 使用 JSON 天然支持 Chain-of-Thought，且通过 StrictJSON 确保类型安全和格式正确。

## 核心架构

```
taskgen/
├── base.py          # strict_json — 核心 JSON 解析与类型检查
├── agent.py         # Agent / AsyncAgent — 主 Agent 循环与任务分解
├── function.py      # Function / AsyncFunction — 工具包装器（自动转换 Python 函数）
├── memory.py        # Memory — RAG 函数空间检索 + 文档分块
├── ranker.py        # Ranker — 函数排序（基于余弦相似度）
└── wrapper.py       # ConversableAgent / ConversationWrapper
```

## 关键特性

| 特性 | 说明 |
|------|------|
| 任务分解 | 自动将任务拆分为子任务，逐步执行 |
| StrictJSON | 带类型检查的 JSON 输出，确保下游处理格式正确 |
| 函数/工具集成 | 支持 LLM 函数和外部 Python 函数，自动从签名/文档字符串提取元数据 |
| 元 Agent | 可将内部 Agent 作为函数，支持分层 Agent 架构 |
| Shared Variables | 跨函数/内部 Agent 共享多模态状态（图片、PDF、音频等） |
| Memory Bank | 支持函数空间 RAG，自动为任务推荐合适的工具 |
| Global Context | 可注入持久状态到 Agent 提示词，跨任务保留学习经验 |
| Async 模式 | AsyncAgent 支持并行化任务执行 |
| Agent 序列化 | 支持 pickle 保存/加载 Agent 状态，跨任务复用 |
| 社区生态 | 支持 Agent 和函数上传/下载，含多个教程（Jupyter Notebook） |

## 与同类框架的差异

- vs **[[autogen]]**：TaskGen 使用 JSON 消息（结构化、非冗长），AutoGen 使用自由文本对话
- vs **[[crewai]]**：TaskGen 内置 StrictJSON 类型检查，架构更轻量
- vs **[[langchain]]**：TaskGen 专注 Agent 任务分解，LangChain 侧重 Chain/Pipeline 编排
- vs **[[dify]]**：TaskGen 是代码级框架，Dify 是可视化平台

## LLM 兼容性

- 默认模型：`gpt-4o-mini`
- 推荐：`gpt-4o`、`gpt-4o-mini`、Llama 3 70B+
- 较弱模型（gpt-3.5-turbo、Llama 3 8B）需要更清晰的指令和示例
- 兼容 ChatGPT，但复杂任务建议使用更强的模型

## 安装

```bash
pip install taskgen-ai==3.4.3
```

**依赖：** openai>=1.59.6, langchain, dill, termcolor, requests, python-docx, pandas, xlrd

## 许可证

MIT

## 相关链接

- GitHub (Simbian): https://github.com/simbianai/taskgen
- GitHub (原作者): https://github.com/tanchongmin/taskgen
- 论文: https://web3.arxiv.org/pdf/2407.15734
- PyPI: https://pypi.org/project/taskgen-ai/
- 相关仓库: StrictJSON https://github.com/tanchongmin/strictjson

## 相关项目

- [[autogen]] — 微软多 Agent 协作框架（基于对话）
- [[crewai]] — Python 角色驱动多 Agent 框架
- [[dify]] — 可视化 LLM 应用开发平台
- [[langchain]] — LLM 应用编排框架
- [[aios]] — AI Agent 操作系统，LLM 内核抽象
