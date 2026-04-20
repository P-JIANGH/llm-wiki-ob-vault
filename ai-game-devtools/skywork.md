---
title: Skywork
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, open-source, chinese-llm]
sources: [raw/articles/ai-game-devtools/skywork.md]
---

# Skywork

**Skywork** is a series of large language models developed by the **Kunlun Group · Skywork team**, released in October 2023. The project open-sources base, chat, math-specialized, and multimodal 13B-scale models, plus the **Skypile-150B** dataset (~150B Chinese tokens, one of the largest open Chinese datasets).

## Overview

Skywork-13B-Base was trained on 3.2T tokens (52.2% English, 39.6% Chinese, 8% code) and achieves top performance among similarly-sized open models on C-Eval, MMLU, and CMMLU benchmarks.

Key variants:
- **Skywork-13B-Chat**: Conversational fine-tune with enhanced creative writing
- **Skywork-13B-Math**: GSM8K #1 among 13B-scale models (72.33%), CMATH 77.27%
- **Skywork-13B-MM**: Multimodal (image + text)
- **Skypile-150B**: 600GB Chinese web corpus, 150B tokens, JSONL format

## Architecture

Skywork-13B uses a **thinner and deeper** structure vs Llama-2-13B:

| | Llama-2-13B | Skywork-13B |
|---|---|---|
| Layers | 40 | **52** |
| Vocab | 32K | **65,536** |
| Hidden Dim | 5,120 | 4,608 |
| FFN Dim | 13,696 | 12,288 |

The 65K BPE tokenizer is specifically designed for Chinese: 32K Latin subwords + 8K Chinese chars/Unicode + 25,519 Chinese words. Training uses **two-stage pretraining** (general → STEM data), totaling 3.2T tokens.

Quantized 8-bit models (BitsAndBytes) reduce GPU memory from 25.91GB (bf16) to 13.57GB.

## Benchmark Performance

### Base Model
| | C-Eval | CMMLU | MMLU | GSM8K |
|---|---|---|---|---|
| Skywork-13B-Base | **60.6** | **61.8** | **62.1** | 55.8 |
| LLaMA-2-13B | 36.5 | 36.6 | 54.8 | 28.7 |
| Qwen-14B | 72.1 | 71.0 | 66.3 | 61.3 |

### Math Model
| | GSM8K | MATH | CMATH |
|---|---|---|---|
| Skywork-13B-Math | **72.33** (#1 13B) | 16.98 | **77.27** |

## Training & Deployment

- **Stack**: Transformers 4.34 + PyTorch 2.1 + DeepSpeed ZeRO
- **Fine-tuning**: Full-parameter SFT and LoRA both supported via provided bash scripts
- **Inference**: HuggingFace transformers, supports `device_map="balanced_low_0"` with bf16/bf16+8bit
- **Platforms**: HuggingFace, ModelScope, Wisemodel, Huawei Ascend (MindSpore MindFormers)

## Relationship to Other Tools

Skywork is a foundational model that can serve as the LLM backbone for AI game development pipelines — similar to [[ai-game-devtools/baichuan-7b]] and [[baichuan-13b]] as Chinese LLM options. Unlike specialized agent frameworks like [[ai-game-devtools/metagpt]] or [[ai-game-devtools/devika]], Skywork provides the base model layer that those agent systems run on top of.

For Chinese-domain game dialogue generation and NPC conversation systems, Skywork-13B's large Chinese vocabulary (65K tokenizer with dedicated Chinese word segmentation) gives it an edge over general-purpose models with smaller vocabularies.

## License

**Skywork Community License** — permits commercial use with restrictions on harmful activities and unapproved internet deployment.

## See Also

- [[baichuan-13b]] — another Chinese 13B LLM
- [[ai-game-devtools/deepseek-r1]] — DeepSeek reasoning model
- [[ai-game-devtools/internlm]] — Shanghai AI Lab model series
