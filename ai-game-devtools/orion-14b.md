---
title: Orion-14B
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, agent, tool, project]
sources: [raw/articles/ai-game-devtools/orion-14b.md]
---

# Orion-14B

## Overview

Orion-14B 是由 **OrionStarAI（猎户星空）** 从零训练的开源多语言大语言模型系列，参数规模 14B，预训练语料 2.5T tokens，覆盖中文、英文、日文、韩文等语言。在 20B 参数级别模型中综合评测领先，尤其在日语和韩语测试集上显著优于竞品。

## 模型变体

| 变体 | 说明 |
|------|------|
| Orion-14B-Base | 基座模型，14B 参数，2.5T tokens 预训练 |
| Orion-14B-Chat | 对话模型，高质量语料微调 |
| Orion-14B-LongChat | 长上下文版，支持 200k tokens（最大 320k） |
| Orion-14B-Chat-RAG | 检索增强生成专用微调 |
| Orion-14B-Chat-Plugin | 函数调用/插件场景专用，Agent 场景 |
| Orion-14B-Base-Int4 | INT4 量化基座，体积减少 70%，速度提升 30% |
| Orion-14B-Chat-Int4 | INT4 量化对话模型 |

## 核心性能

### 基座模型 benchmark（vs 同级别竞品）
- **C-Eval**: 72.9（最佳，超越 QWEN-14B 71.7）
- **CMMLU**: 70.6（最佳）
- **MMLU**: 69.9（最佳）
- **OpenCompass 平均**: 64.3（最佳）
- **日语评测平均**: 69.1（最佳，超越 Yi-34B 67.1）

### 对话模型
- **MTBench**: 7.37（最佳，超越 Qwen-14B-Chat 6.96）
- **AlignBench**: 5.51

### 长上下文（LongBench）
- DuReader: 37.02（最佳，超越 GPT-3.5/LongChat/Yi-6B-200K）

### Plugin 模型（函数调用）
- 意图识别（完整参数）: 92.5（vs GPT-4 95）
- 意图识别（缺失参数）: 60.32（最佳）
- 非插件调用识别: 90（最佳）

## 技术特点

- **从零训练**：非基于已有开源模型的继续预训练
- **多语言**：中日韩英四语种，2.5T tokens 预训练语料
- **长上下文**：LongChat 版本支持 320k token 最大上下文
- **量化**：INT4 量化版体积压缩 70%，推理速度提升 30%，性能损失 <1%
- **推理支持**：Transformers / vLLM (≥v0.3.3) / llama.cpp
- **模型权重**：HuggingFace / ModelScope / OpenXLab 均有发布

## 推理示例

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from transformers.generation.utils import GenerationConfig

tokenizer = AutoTokenizer.from_pretrained("OrionStarAI/Orion-14B", use_fast=False, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("OrionStarAI/Orion-14B", device_map="auto",
                                             torch_dtype=torch.bfloat16, trust_remote_code=True)
model.generation_config = GenerationConfig.from_pretrained("OrionStarAI/Orion-14B")
messages = [{"role": "user", "content": "Hello, what is your name? "}]
response = model.chat(tokenizer, messages, streaming=False)
print(response)
```

## 许可证

- 代码: Apache License 2.0
- 模型权重: Orion-14B Series Models Community License Agreement（可免费商用，需阅读协议）

## 相关链接

- GitHub: https://github.com/OrionStarAI/Orion
- HuggingFace: https://huggingface.co/OrionStarAI
- ModelScope: https://modelscope.cn/organization/OrionStarAI
- Tech Report: https://arxiv.org/pdf/2401.12246.pdf

## 相关模型

Orion-14B 的竞品和同类多语言 LLM 包括 [[baichuan-13b]]（百川 13B）、[[baichuan-2]]（百川 2）、[[qwen2]] 等。在 Agent 函数调用场景下，可与 [[ai-game-devtools/cogvlm2]] 等 VLM 配合使用实现多模态 Agent。

在游戏开发场景中，Orion-14B-Chat-Plugin 可作为游戏内 NPC 对话引擎，配合 [[agentgpt]] 等 Agent 框架实现智能 NPC 行为控制。
