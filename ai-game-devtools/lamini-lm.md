---
title: LaMini-LM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, distilled-model, instruction-tuning, nlp, mbzuai]
sources: [raw/articles/ai-game-devtools/lamini-lm.md]
---

# LaMini-LM

## Overview
LaMini-LM is a family of small, efficient language models distilled from ChatGPT (gpt-3.5-turbo) via sentence/offline distillation (Kim & Rush, 2016). Trained on **2.58M instruction-response pairs** from self-instruct, P3, Flan, and Alpaca datasets. Developed by MBZUAI, UBC, and Monash. Released 2023.

## Model Sizes
| Base Model | Sizes |
|------------|-------|
| T5 | 61M / 223M / 738M |
| Flan-T5 (recommended ✩) | 77M / 248M / 783M |
| Cerebras-GPT | 111M / 256M / 590M / 1.3B |
| GPT-2 (recommended ✩) | 124M / 774M / 1.5B |
| GPT-Neo | 125M / 1.3B |
| LLaMA | coming soon |

Best performers per size: LaMini-Flan-T5 variants and LaMini-GPT-1.5B are recommended.

## Key Facts
- **Paper**: [arXiv:2304.14402](https://arxiv.org/abs/2304.14402)
- **License**: Code Apache 2.0 / Data CC BY-NC 4.0
- **HuggingFace**: All models at `MBZUAI/` prefix (e.g., `MBZUAI/lamini-flan-t5-248m`)
- **Data**: 2.58M instruction pairs at [MBZUAI/LaMini-instruction](https://huggingface.co/datasets/MBZUAI/LaMini-instruction)

## Architecture
- **Encoder-decoder** (T5, Flan-T5): use `text2text-generation` pipeline
- **Decoder-only** (GPT-2, GPT-Neo, Cerebras-GPT): require instruction wrapper prompt at inference
  ```
  Below is an instruction that describes a task. Write a response that appropriately completes the request.
  
  ### Instruction:
  {instruction}
  
  ### Response:
  ```

## Evaluation
- 15 NLP benchmarks via EleutherAI lm-evaluation-harness
- Human evaluation on 114 user-oriented instructions
- Outperforms Alpaca-7B and LLaMA-7B on most tasks at much smaller sizes

## Related
- [[chinese-llama-alpaca-3]] — another Chinese LLaMA variant from the same era
- [[baichuan-7b]] — another efficient Chinese LLM for comparison
- [[gemma]] — Google's small efficient open LLM family
