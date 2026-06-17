---
title: LongWriter
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, open-source, game-content]
sources: [raw/articles/ai-game-devtools/longwriter.md]
---

# LongWriter

Long Context LLM 超长文本生成模型，支持 **10,000+ 词**输出。由 THU-KEG 团队开发，开源模型基于 GLM-4-9B 和 Llama-3.1-8B 微调。

## Overview

LongWriter 解决大语言模型长输出能力不足的问题。通过 DPO (Direct Preference Optimization) 微调，让模型能够稳定生成超长文本而不丢失连贯性。

两个基础模型：
- **LongWriter-glm4-9b** — 基于 GLM-4-9B 微调
- **LongWriter-llama3.1-8b** — 基于 Meta-Llama-3.1-8B 微调

进阶模型 **LongWriter-Zero-32B**（2025/06 发布）使用纯 RL 训练，无需合成数据，在长文本写作任务上超越 DeepSeek-R1 和 Qwen3。

## Core Components

### Models
- 基础版：LongWriter-glm4-9b / LongWriter-llama3.1-8b（HuggingFace 可直接加载）
- Zero 版：LongWriter-Zero-32B（HuggingFace: THU-KEG/LongWriter-Zero-32B）

### AgentWrite Pipeline
位于 `agentwrite/`，超长输出数据构建流水线：
- `plan.py` — 生成写作大纲
- `write.py` — 执行长文本生成
- 需要配置 API Key

### Training
- 数据集：LongWriter-6k（HuggingFace: THUDM/LongWriter-6k）
- 基于 [LongAlign](https://github.com/THUDM/LongAlign) 训练框架
- 依赖 FlashAttention 2

### Evaluation
- **LongBench-Write**：长输出质量 + 长度评估
- **LongWrite-Ruler**：最大输出长度压力测试
- GPT-4o 作为质量评判器

### Inference
- `trans_web_demo.py` — Web 聊天机器人部署
- `vllm_inference.py` — vLLM 加速推理，可达 **10,000+ 词/分钟**

## AI 游戏开发用途

可用于游戏内容自动生成：
- `game-narrative-generation` — 长篇游戏剧情、任务描述生成
- 开放世界游戏物品描述、百科条目批量生成
- NPC 对话树长文本扩展
- 游戏设计文档自动化撰写

## 相关链接
- GitHub: https://github.com/THUDM/LongWriter
- Paper: https://arxiv.org/abs/2408.07055
- LongWriter-Zero Paper: https://arxiv.org/abs/2506.18841
- HuggingFace: https://huggingface.co/THUDM/LongWriter-glm4-9b
