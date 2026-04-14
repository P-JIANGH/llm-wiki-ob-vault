---
title: MobiLlama
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, slm, mbzuai, open-source, text-generation, mobile, game-dev]
sources: [raw/articles/ai-game-devtools/mobillama.md]
---

# MobiLlama

Fully transparent open-source Small Language Model (SLM) for resource-constrained devices. Developed by MBZUAI (UAE) and Linköping University (Sweden). Accepted as **ICLR'25 SLLM Workshop Spotlight**.

## Overview

MobiLlama applies the **"less is more"** paradigm — it initiates from a larger model and uses a **careful parameter sharing scheme** to reduce both pre-training and deployment cost. Available in 0.5B, 0.8B, and 1B parameter variants.

Designed for on-device processing, energy efficiency, low memory footprint, and fast response — critical for privacy, security, and sustainable deployment.

## Model Variants

| Model | Params | Type |
|-------|--------|------|
| MobiLlama-05B | 0.5B | Base |
| MobiLlama-08B | 0.8B | Base |
| MobiLlama-1B | 1B | Base |
| MobiLlama-05B-Chat | 0.5B | Chat |
| MobiLlama-1B-Chat | 1B | Chat |

## Architecture

- **Base:** LLaMA-7B architecture (LlamaForCausalLM)
- **Config (0.5B):** hidden_size=2048, num_hidden_layers=8, num_attention_heads=32, num_key_value_heads=4, intermediate_size=5632, vocab_size=32000
- **Training:** PyTorch + **Lightning FSDP** (Fully Sharded Data Parallel), bf16-mixed precision
- **Optimizer:** AdamW, cosine LR decay (3e-5 → 3e-6), warmup 2000 steps
- **Training code:** `main_mobillama.py`, `main_largebase.py` (1.2B variant)

## Training Data

Amber dataset — **1.2 Trillion tokens** from LLM360:

| Source | Tokens (B) |
|--------|-----------|
| Refined-Web | 665.01 |
| StarCoder | 291.92 |
| C4 | 197.67 |
| Book | 28.86 |
| Arxiv | 30.00 |
| Wikipedia | 23.90 |
| StackExchange | 21.75 |

## Performance

Outperforms similarly-sized open models despite smaller parameter count:

| Model | Params | HellaSwag | MMLU | piqa | winogrande | Average |
|-------|--------|-----------|------|------|------------|---------|
| Pythia-410m | 0.51B | 40.85 | 27.25 | 67.19 | 53.12 | 43.57 |
| **MobiLlama-0.5B** | **0.5B** | **52.52** | **26.45** | **72.03** | **57.53** | **46.00** |
| Lamini-GPT-LM | 0.77B | 43.83 | 26.24 | 69.31 | 56.59 | 45.49 |
| **MobiLlama-0.8B** | **0.8B** | **54.09** | **26.92** | **73.17** | **57.45** | **46.67** |

The 1.2B large-base variant achieves **49.06 average** — outperforming TinyLlama-1.1B and OLMo-1.2B (both trained on 3T tokens).

## Game Dev Relevance

- **On-device NPC dialogue**: 0.5B model can run locally on mobile/low-end hardware for game NPCs
- **Lightweight text generation**: Embedded devices, no cloud dependency
- **Contrast with [[llama-3]]**: Llama 3 targets server/gPU部署; MobiLlama targets edge/mobile
- **Contrast with [[tinyllama]]**: TinyLlama is 1.1B; MobiLlama achieves similar/higher benchmarks at 0.5B via parameter sharing

## Links

- [GitHub](https://github.com/mbzuai-oryx/MobiLlama) | [HuggingFace](https://huggingface.co/collections/MBZUAI/mobillama-65dd4182d588c91e8230332e) | [arXiv](https://arxiv.org/abs/2402.16840) | [Demo](https://f7ad4fb8ab0fcefaba.gradio.live/)
- Built on [LLM360 Amber](https://github.com/LLM360/amber-train)
