---
title: Buffer of Thoughts
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, reasoning, framework]
sources: [raw/articles/ai-game-devtools/buffer-of-thought-llm.md]
---

# Buffer of Thoughts

北京大学 & UC Berkeley & Stanford 联合开发的**思维增强推理框架**，获 NeurIPS 2024 Spotlight。核心思想是将 LLM 解题过程中的高层推理模式蒸馏为可复用的「思维模板」，存入 **Meta Buffer**（基于 LightRAG 的向量存储），新问题来临时检索最相关的模板并实例化执行。

## 概述

- **类型:** LLM 推理增强框架
- **开源:** [YangLing0818/buffer-of-thought-llm](https://github.com/YangLing0818/buffer-of-thought-llm)
- **License:** MIT
- **论文:** [arXiv:2406.04271](https://arxiv.org/abs/2406.04271)
- **衍生:** ReasonFlux-PRM、ReasonFlux-F1、SuperCorrect

## 技术特点

### Meta Buffer 架构

基于 [LightRAG](https://github.com/HKUDS/LightRAG) 构建 RAG 系统存储思维模板：
- **检索**：hybrid 模式（关键词+语义）从模板库召回相关模板
- **动态更新**：Buffer Manager 判断新思维是否足够新颖，必要时更新模板库
- **轻量**：模板以自然语言描述问题类型+定量关系+策略，而非完整解题过程

### 流水线

```
问题 → 蒸馏(distill) → 检索(retrieve) → 实例化(instantiate) → 推理(reason)
                                                              ↓
                              Buffer Manager ← 蒸馏新思维(distill thought)
```

1. **Problem Distillation** — 提取问题关键信息
2. **Buffer Retrieve** — 从 Meta Buffer 召回思维模板
3. **Buffer Instantiation** — 将模板适配到当前问题
4. **Reasoner Instantiation** — 执行推理；含代码则提取执行（含 self-correction 循环，最多3次）
5. **Buffer Manager** — 从「问题-答案对」蒸馏新思维模板，判断是否值得加入 Meta Buffer

### 性能

| 任务 | GPT-4 | PAL | ToT | BoT |
|------|-------|-----|-----|-----|
| Game of 24 | 3.0 | 64.0 | 74.0 | **82.4** |
| Checkmate-in-One | 36.4 | 10.8 | 49.2 | **86.4** |
| Geometric Shapes | 52.6 | 51.2 | 56.8 | **93.6** |
| Word Sorting | 80.4 | 93.2 | 96.4 | **100.0** |

**核心结论：** Llama3-8B + BoT 可超越 Llama3-70B；成本仅为多查询提示方法（如 ToT）的 **12%**。

## 目录结构

```
bot_pipeline.py          # 主流水线（BoT class）
meta_buffer.py           # MetaBuffer（LightRAG 封装）
meta_buffer_utilis.py    # 蒸馏 prompt / 代码提取
run_benchmarks.py        # 评测入口（Game of 24 / Checkmate / Word Sorting）
inference.py             # 数学问题推理（GSM8K）
test_templates.py        # 各任务的思维模板（game24 / checkmate / word_sorting）
lightrag/                # LightRAG 子模块（作为 git submodule 或内嵌）
benchmarks/              # 评测数据集
math.txt                 # 数学思维模板库
```

## 与同类工具的差异

| 维度 | [[ai-game-devtools/autoagents\|AutoAgents]] | [[ai-game-devtools/autogen\|AutoGen]] | **Buffer of Thoughts** |
|------|---------------------|--------------------|----------------------|
| 方向 | 多 Agent 协作生成 | 多 Agent 对话协作 | 单 Agent 思维增强 |
| 核心 | 工作流自动化 | Agent 间通信 | 可复用推理模板 |
| 推理 | 下游 LLM 决策 | 多方协商 | 模板蒸馏+检索 |

## 相关链接

- [arXiv 论文](https://arxiv.org/abs/2406.04271)
- [HuggingFace: ReasonFlux-PRM-7B](https://huggingface.co/Gen-Verse/ReasonFlux-PRM-7B)
- [SuperCorrect (BoT 自纠正版)](https://github.com/YangLing0818/SuperCorrect-llm)
