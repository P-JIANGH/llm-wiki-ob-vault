---
title: StarCoder 2
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, code-completion, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/starcoder-2.md]
---

# StarCoder 2

**StarCoder2** 是 BigCode 项目（Hugging Face + ServiceNow）推出的第二代代码生成模型家族，包含 3B、7B、15B 三种规模，基于 600+ 编程语言和自然语言文本训练，是 [[starcoder]] 的全面升级版。

## Overview

StarCoder2 采用 Grouped Query Attention (GQA) 架构，支持 16,384 tokens 上下文窗口（4,096 sliding window），在 The Stack v2 数据集上训练。3B/7B 模型使用 3+ 万亿 tokens，15B 模型使用 4+ 万亿 tokens。模型专注于代码补全（code completion），而非指令微调的对话式编码。

## Key Facts

| 维度 | 详情 |
|------|------|
| **开发者** | BigCode（Hugging Face + ServiceNow） |
| **模型规模** | 3B / 7B / 15B 三档 |
| **训练数据** | The Stack v2（600+ 语言）+ Wikipedia/Arxiv/GitHub Issues |
| **训练 Tokens** | 3B/7B: 3T+; 15B: 4T+ |
| **上下文窗口** | 16,384 tokens |
| **注意力机制** | Grouped Query Attention (GQA) + Sliding Window (4,096) |
| **许可证** | Apache 2.0（BigCode 项目标准） |
| **论文** | arXiv 2402.19173 |
| **HuggingFace** | https://huggingface.co/bigcode/starcoder2-* |

## 硬件需求（15B 模型）

| 精度 | 显存占用 |
|------|---------|
| BF16/FP16 | ~32 GB |
| 8-bit (bitsandbytes) | ~17 GB |
| 4-bit (bitsandbytes) | ~9 GB |

## Architecture & Tech

- **模型架构**: 因果自回归解码器（AutoModelForCausalLM）
- **GQA**: Grouped Query Attention 降低 KV cache 内存开销
- **Sliding Window**: 4,096 局部窗口注意力，支持更长上下文
- **量化**: 支持 bitsandbytes 8-bit/4-bit 量化推理和训练
- **部署**: HuggingFace Transformers / TGI Docker / 多 GPU device_map="auto"
- **微调**: PEFT LoRA + TRL SFTTrainer，提供完整 fine-tune.py 脚本

## 与 StarCoder v1 的差异

| 维度 | StarCoder v1 | StarCoder 2 |
|------|-------------|-------------|
| 模型规模 | 15.5B 单一尺寸 | 3B / 7B / 15B 三档 |
| 支持语言 | 80+ | 600+ |
| 上下文 | 8,192 tokens | 16,384 tokens |
| 注意力 | 标准 | GQA + Sliding Window |
| 数据集 | The Stack v1 | The Stack v2 |
| 许可证 | OpenRAIL-M | Apache 2.0 |

## Game Dev Relevance

- 游戏脚本代码补全（GDScript/C#/Lua/C++）
- 在游戏引擎代码库上 LoRA 微调获得领域专精
- 配合 [[codegeex2]]、[[codegeex4]] 等形成代码模型选型矩阵
- 与 [[deepseek-coder]] 同属开源代码生成模型竞品

## Links

- **GitHub**: https://github.com/bigcode-project/starcoder2
- **Hugging Face**: https://huggingface.co/bigcode/starcoder2-*
- **Paper**: https://arxiv.org/abs/2402.19173
- **Evaluation**: https://github.com/bigcode-project/bigcode-evaluation-harness
