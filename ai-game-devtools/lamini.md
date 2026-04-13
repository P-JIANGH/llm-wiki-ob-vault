---
title: Lamini
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, tool, open-source]
sources: [raw/articles/ai-game-devtools/lamini.md]
---

# Lamini

## 概述

Lamini 是一个 Python SDK + 云端平台，用于快速构建和微调自定义生成式 AI 模型。提供从数据上传、模型微调、推理到评估的完整 LLM 工作流，并支持基于链式生成器/验证器的 Agentic Pipeline 架构。v3.2.22，Apache 2.0。

## 技术架构

|| 组件 | 说明 ||
|------|------|------|
| `lamini.api.Lamini` | 核心 API 类 | 生成调用、数据上传、训练编排、评估 |
| `lamini.runners.BaseRunner` | 训练运行器 | CSV/JSONL/DataFrame 数据加载，`train()`/`tune()` 微调，`evaluate()` 评估 |
| `lamini.experiment.BaseAgenticPipeline` | 链式工作流 | 串联多个 Generator + Validator，支持分支和结果记录 |
| `lamini.generation` | 推理层 | GenerationNode、Streaming、Token 优化 |
| `lamini.index.LaminiIndex` | RAG 索引 | FAISS 向量检索增强生成 |
| `lamini.api.train.Train` | 训练管理 | 训练任务启动/取消/恢复/评估，数据集操作 |

### 训练类型

- `memory_tuning` — 默认微调
- `memory_rag` — RAG 增强训练
- `mome_mini` — MoME mini 训练

### 推理引擎

- `Completion` — 标准 LLM 生成
- `StreamingCompletion` — Token 流式输出
- `SQLCompletion` — SQL 生成专用（带缓存）
- 支持 OpenAI 兼容 API 模式

## 核心功能

- **LLM 生成**：`llm.generate(prompt, model_name, output_type, max_new_tokens)`
- **结构化输出**：`output_type` dict 指定输出格式
- **微调训练**：上传 input/output 数据对 → `train()` → 获取自定义模型
- **Streaming**：流式推理
- **数据上传**：CSV 或 JSONL（`input`/`output` key）
- **Agentic Pipeline**：`BaseAgenticPipeline` 链式 Generator/Validator，支持分支
- **SQL 生成**：`generate_sql()` 带 cache_id
- **RAG**：`MemoryRAG` 基于 FAISS
- **模型下载**：将 HuggingFace 模型下载到 Lamini 平台缓存

## 游戏开发场景

Lamini 可用于游戏 AI 场景：

- **NPC 对话微调**：上传游戏对话数据，微调专属对话模型
- **游戏内文本生成**：通过 Pipeline 构建剧情生成工作流
- **Agent 行为控制**：Generator/Validator Pipeline 架构可构建复杂游戏 Agent 逻辑
- **RAG 知识库**：结合游戏世界观文档做问答

## 与同类工具比较

|| 工具 | 定位 | 微调方式 | Pipeline ||
||------|------|---------|----------|
|| [[ai-game-devtools/gpt4all]] | 本地 LLM 运行平台 | 无（本地推理） | 无 |
|| [[ai-game-devtools/autogen]] | 多 Agent 协作框架 | 支持微调 | Agent 对话 |
|| [[ai-game-devtools/flowise]] | 可视化 LLM 应用 | API 调用 | 可视化 RAG/Agent |
|| **Lamini** | **云端微调 + SDK** | **平台微调** | **Generator/Validator Chain** |

## 许可证

Apache License 2.0

## 参考

- GitHub: https://github.com/lamini-ai/lamini
- 官方文档: https://lamini-ai.github.io/
- API Key: https://app.lamini.ai/account
- PyPI: `pip install lamini`
