---
title: MiniCPM
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, open-source]
sources: ["general knowledge"]
---

# MiniCPM

**MiniCPM** is an efficient small LLM family developed by [[openbmb]] (北京人工智能研究院 / Beijing Academy of Artificial Intelligence + 面壁智能 / ModelBest). The family is designed to deliver competitive performance at dramatically lower parameter counts — making it practical for edge deployment, mobile inference, and resource-constrained environments.

## Overview

MiniCPM started with the 2B parameter dense model and has since expanded into a diverse family covering base LLMs, vision-language models, and sparse-attention architectures. Despite small sizes, MiniCPM variants often match or exceed larger models (e.g., MiniCPM-2B ≈ Mistral-7B; MiniCPM3-4B ≈ GPT-3.5-Turbo on various benchmarks). The family is notable for pushing the frontier of **parameter-efficient** language modeling.

## Family Members

| Model | Params | Key Feature |
|-------|--------|-------------|
| MiniCPM-2B | 2B | Original dense model; matches Mistral-7B |
| MiniCPM3-4B | 4B | Outperforms GPT-3.5-Turbo on multiple benchmarks |
| MiniCPM-S-1B | 1B | 87% FFN sparsity, 84% FLOPs reduction |
| MiniCPM4-8B | 8B | 5× speedup on edge chips |
| MiniCPM4.1-8B | 8B | Trainable sparse attention, hybrid reasoning |
| MiniCPM-SALA | 9B | Sparse+Linear hybrid, **1M token context** |
| MiniCPM-Llama3-V-2.5 | — | Vision-language variant (see below) |
| MiniCPM-V-4.0 | — | Latest multimodal variant (see below) |

## Key Facts

| Fact | Detail |
|---|---|
| Developer | OpenBMB (面壁智能 / ModelBest + BAAI) |
| First Release | February 2024 (MiniCPM-2B) |
| Architecture | Dense transformer → sparse-attention hybrid (later models) |
| Training Data | Multi-domain: web, code, math, Chinese corpora |
| Quantization | GGUF, GPTQ, AWQ, Marlin, MLX; BitCPM4 (ternary 1/2-bit) |
| Inference Engines | HuggingFace, vLLM, SGLang, CPM.cu, llama.cpp, Ollama |

## Vision-Language Variants

### MiniCPM-Llama3-V-2.5
A vision-language model combining MiniCPM with Llama-3 backbone for multimodal understanding. Supports image understanding, OCR, and visual reasoning tasks. Relevant for games requiring visual scene understanding or image-based QA.

### MiniCPM-V-4.0
The latest multimodal variant in the MiniCPM family, extending vision-language capabilities with improved accuracy and efficiency. Supports a wider range of visual tasks including document understanding and complex visual reasoning.

## Architecture Evolution

- **MiniCPM-2B:** Vanilla dense transformer, BF16 precision
- **MiniCPM4:** [[InfLLM-V2]] trainable sparse attention — each token attends to <5% of tokens in 128K context
- **MiniCPM-SALA:** 25% sparse (InfLLM-V2) + 75% linear (Lightning Attention) — 3.5× inference speed vs Qwen3-8B at 256K tokens; runs 1M context on RTX 5090

## Game Dev Relevance

MiniCPM's compact size and edge-friendly inference make it well-suited for:
- **NPC dialogue** — 2B-4B models run on consumer GPUs with minimal VRAM
- **Procedural content generation** — text generation for quests, items, lore
- **On-device AI** — quantized variants run on laptops/edge devices without cloud dependency
- **Visual understanding** — VLM variants for screenshot analysis or in-game visual QA
- **[[llmunity]]** provides direct Unity integration for deploying these models in games

## License

Base model uses Llama2-style license terms; derivatives use BMAB/Yorko licenses.

## Related

- [[openbmb]] — The organization behind MiniCPM
- [[minicpm-2b]] — Original 2B parameter model (dedicated page)
- `minicpm-llama3-v-2-5` — Vision-language variant with Llama-3 backbone
- `minicpm-v-4-0` — Latest multimodal variant

## Links

- [GitHub: OpenBMB/MiniCPM](https://github.com/OpenBMB/MiniCPM)
- [Hugging Face: openbmb](https://huggingface.co/openbmb)
- [Paper: MiniCPM technical report](https://arxiv.org/pdf/2506.07900)
