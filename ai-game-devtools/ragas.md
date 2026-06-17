---
title: Ragas
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, llm, tool, python, framework]
sources: [raw/articles/ai-game-devtools/ragas.md]
---

# Ragas

LLM 应用评估框架，由 VibrantLabs 开发。提供 RAG 和 LLM 应用的客观指标评估、测试数据生成和生产反馈循环。

## 概述

Ragas 是 LLM 应用的评估工具箱，提供基于 LLM 和传统的客观评估指标。支持自动生成测试数据集，并与 LangChain、LlamaIndex 等主流框架无缝集成。

- **许可证:** Apache-2.0
- **组织:** VibrantLabs
- **文档:** https://docs.ragas.io/
- **PyPI:** `pip install ragas`
- **Python:** >= 3.9

## 核心功能

### 评估指标
- `DiscreteMetric` — 自定义方面评估（用户可定义 prompt + 允许值）
- AspectCritic、AnswerCorrectness、ContextPrecision、ContextRecall、Faithfulness 等预构建指标
- 支持 LLM-based 和传统文本相似度指标（rouge、sacrebleu 等）

### 测试数据生成
- 自动创建覆盖多场景的测试数据集
- 支持生产数据反馈循环

### CLI 工具
- `ragas quickstart` — 脚手架生成评估项目模板
- 模板: `rag_eval`（RAG 评估），计划支持 agent_evals、prompt_evals 等

### 实验管理
- Dataset & Experiment management（`ragas.experimental`）
- 多后端支持：CSV、JSONL、Google Drive、in-memory
- 插件化后端系统（entry points: `ragas.backends`）

## 技术架构

```
src/ragas/          # 核心源码 + 实验性功能
├── experimental/   # 实验性 Dataset/实验管理
├── metrics/        # 评估指标实现
├── llms/           # LLM 适配器（llm_factory）
└── backends/       # 数据存储后端插件
examples/           # 示例代码（UV workspace 成员）
docs/               # MkDocs 文档
```

**包管理:** UV workspace（ragas + ragas-examples）
**开发工具:** Ruff（lint）、Pyright（type check）、pytest（test）、MkDocs（docs）

## 集成生态

- [[langchain]] — 深度集成，支持 LangChain Chain/Agent 评估
- [[llama-index]] — 支持 LlamaIndex pipeline 评估
- **Haystack** — ai-frameworks 可选集成
- **DSPy** — dspy-ai 可选集成
- **Langfuse / MLflow / Arize Phoenix** — Tracing 集成

## 在游戏开发中的应用场景

- NPC 对话质量与一致性评估（LLM 驱动 NPC）
- RAG 游戏知识系统评估（剧情/任务信息检索准确性）
- 游戏内容生成 prompt 效果评估
- 游戏 AI Agent 行为评估
