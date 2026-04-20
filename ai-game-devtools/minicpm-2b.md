---
title: MiniCPM-2B
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, open-source, edge-inference, multi-agent]
sources: [raw/articles/ai-game-devtools/minicpm-2b.md]
aliases: ["MiniCPM-2B"]

---

# MiniCPM-2B

**MiniCPM-2B** (OpenBMB/MiniCPM) is an efficient large language model with **2B parameters** released in February 2024. Developed by [[openbmb]] (Beijing Academy of Artificial Intelligence & ModelBest), it achieves performance comparable to Mistral-7B on public benchmarks — with better Chinese, math, and code abilities — while outperforming Llama2-13B, MPT-30B, and Falcon-40B.

## Overview

MiniCPM started as a compact dense Transformer but has evolved into a full model family with multiple architectural innovations:

| Model | Params | Key Feature |
|-------|--------|-------------|
| MiniCPM-2B | 2B | Original dense model |
| MiniCPM-3-4B | 4B | Outperforms GPT-3.5-Turbo |
| MiniCPM-S-1B | 1B | 87% FFN sparsity, 84% FLOPs reduction |
| MiniCPM4-8B | 8B | 5x speedup on edge chips |
| MiniCPM4.1-8B | 8B | Trainable sparse attention, hybrid reasoning |
| MiniCPM-SALA | 9B | Sparse+Linear hybrid, **1M token context** |

## Technical Features

### Architecture
- **MiniCPM-2B:** Vanilla dense Transformer (2B params, BF16)
- **MiniCPM4:** [[InfLLM-V2]] trainable sparse attention — each token attends to <5% of tokens in 128K context
- **MiniCPM-SALA:** 25% sparse (InfLLM-V2) + 75% linear (Lightning Attention) — 3.5x inference speed vs Qwen3-8B at 256K tokens, runs 1M context on RTX 5090

### Inference Engines
- **HuggingFace Transformers** — dense + sparse modes
- **vLLM / SGLang** — with EAGLE3 speculative decoding
- **CPM.cu** — custom CUDA kernel (sparse attention + quantization + speculative sampling)
- **llama.cpp / Ollama** — CPU/edge deployment

### Quantization
BitCPM4: ternary (1/2-bit) quantization achieving 90% bit-width reduction. Formats: GGUF, GPTQ, AWQ, Marlin, MLX.

### Training Stack
- Model Wind Tunnel 2.0 (predictable scaling)
- UltraClean / UltraFinweb (data filtering)
- UltraChat v2 (SFT data)
- FP8 + Multi-token Prediction training

## Game Dev Relevance

MiniCPM's small footprint and edge-friendly inference make it practical for **NPC dialogue**, **game scripting**, and **procedural content generation** running on-device. The 2026 MiniCPM-SALA model (9B, 1M context) could power games with full-codebase narrative memory or game-logic awareness. [[llmunity]] provides direct Unity integration.

## License

Llama2 license terms for base; BMAB/Yorko licenses for derivatives.

## Links

- GitHub: https://github.com/OpenBMB/MiniCPM
- HF: https://huggingface.co/openbmb/MiniCPM-2B-sft-bf16
- Paper: https://arxiv.org/pdf/2506.07900

## See Also

- [[metagpt]] — same org (OpenBMB) multi-agent framework
- [[llmunity]] — Unity integration for LLMs
- [[qwen2]] — comparable Chinese LLM family
- [[internlm]] — another large Chinese LLM
