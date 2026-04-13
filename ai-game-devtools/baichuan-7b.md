---
title: Baichuan-7B
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai-model, llm, chinese-llm, open-source]
sources: [raw/articles/ai-game-devtools/baichuan-7b.md]
---

# Baichuan-7B

## Overview
Baichuan-7B 是由[[百川智能]]开发的70亿参数开源大语言模型，基于Transformer架构，在约1.2万亿tokens上训练，支持中英双语，上下文窗口长度为4096。在C-Eval和MMLU等权威benchmark上达到同尺寸SOTA水平。

## Key Facts
| Hyperparameter | Value |
|---|---|
| Parameters | 7B (7,000,559,618) |
| Layers | 32 |
| Heads | 32 |
| Hidden Size | 4096 |
| Vocab Size | 64000 |
| Context Length | 4096 |
| Training Tokens | ~1.2T |
| License | Baichuan-7B License (允许商业使用) |

## Architecture
标准Transformer结构，与[[LLaMA]]架构设计一致：
- **Position Embedding**: [[Rotary Embedding]] (RoPE)，优秀的外推能力
- **Feedforward**: [[SwiGLU]] 激活函数，intermediate_size=11008
- **Layer Normalization**: [[RMSNorm]] Pre-Normalization

基于[[Hugging Face Transformers]]实现，支持`AutoModelForCausalLM`直接加载。

## Performance
| Benchmark | Score | Notes |
|---|---|---|
| C-Eval | 42.8 | 中文评测，同尺寸SOTA |
| MMLU | 42.3 | 英文评测 |
| Gaokao | 36.24 | 高考基准 |
| AGIEval | 34.44 | 通用AI能力 |

## 与同类工具的差异
- 相比[[LLaMA-7B]]：允许商业使用，训练数据针对中英双语优化
- 相比ChatGLM-6B：中文C-Eval更高（42.8 vs 34.5），但参数量相同
- 采用更宽松的开源许可，不像LLaMA完全禁止商业用途

## Related Links
- GitHub: https://github.com/baichuan-inc/baichuan-7B
- HuggingFace: https://huggingface.co/baichuan-inc/Baichuan-7B
- Email: opensource@baichuan-inc.com
