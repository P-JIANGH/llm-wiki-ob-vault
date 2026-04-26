---
title: Mixtral 8x7B
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [ai, llm, moe, open-source, inference, benchmark]
sources: [raw/articles/ai-game-devtools/mixtral-8x7b.md]
---

# Mixtral 8x7B

High-quality Sparse Mixture-of-Experts (SMoE) model with open weights, released by [[Mistral AI]].

## Overview

Mixtral 8x7B is a decoder-only transformer with a **Sparse Mixture-of-Experts** architecture. Each feedforward block selects from 8 expert groups; a router picks 2 experts per token per layer. This yields **46.7B total parameters** but only **12.9B active per token** — matching the speed and cost of a 12.9B dense model while achieving 46.7B-level quality.

- **License:** Apache 2.0
- **Training:** Open Web data; experts and routers trained jointly
- **Languages:** English, French, German, Spanish, Italian

## Architecture

[[ai-game-devtools/mixtral-8x7b|Mixtral]] uses SMoE to decouple model capacity from inference cost. The router network at each transformer layer dynamically selects 2 out of 8 experts, and their outputs are combined additively. This sparse activation means the model is significantly cheaper to serve than an equivalent dense model of the same parameter count.

Key architectural properties:
- Decoder-only transformer (same family as [[ai-game-devtools/llama|Llama]])
- 8 expert groups per FFN layer
- Router selects top-2 experts per token per layer
- Comparable to [[ai-game-devtools/grok-1|Grok-1]] (another open MoE model) in approach

## Performance

Mixtral 8x7B **outperforms Llama 2 70B** on most benchmarks and **matches or exceeds GPT3.5**:

| Benchmark | Mixtral 8x7B | Llama 2 70B | GPT3.5 |
|---|---|---|---|
| MMLU | competitive | lower | comparable |
| GSM8K | strong | lower | strong |
| MT-Bench | 8.30 | — | ~7.94 |
| HellaSwag | high | lower | high |

The Instruct variant (SFT + DPO) scores **8.30 on MT-Bench**, the best open-source model at release.

### Inference Efficiency

6× faster than a 46.7B dense model in practice. Compatible with [[ai-game-devtools/vllm|vLLM]] (via Megablocks CUDA kernels) and [[ai-game-devtools/sglang|SGLang]] for high-throughput serving.

## Deployment

- **vLLM:** Megablocks CUDA kernels — fully open-source serving stack
- **Skypilot:** Cloud deployment on any instance
- **Mistral Platform:** Behind `mistral-small` endpoint (beta)
- Also served via [[ai-game-devtools/llama-cpp|llama.cpp]] variants in community builds

## Comparison with Related Models

- vs [[ai-game-devtools/grok-1|Grok-1]]: Both are open MoE models; Grok-1 is larger (314B) but also uses sparse experts
- vs [[ai-game-devtools/llama|Llama 2 70B]]: Mixtral 8x7B matches/exceeds on benchmarks while using fewer active parameters
- vs [[ai-game-devtools/llama-cpp|llama.cpp]] ecosystem: Community GGUF quantized versions enable CPU inference
