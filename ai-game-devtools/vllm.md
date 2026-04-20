---
title: vLLM
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, tool, open-source]
sources: [web:https://github.com/vllm-project/vllm, web:https://arxiv.org/abs/2309.06180]
---

# vLLM

**High-Throughput LLM Inference Engine by UC Berkeley**

## Overview

vLLM is a high-throughput, memory-efficient LLM inference and serving engine developed at UC Berkeley. Its key innovation is **PagedAttention**, a novel attention algorithm that efficiently manages the KV cache by borrowing ideas from virtual memory paging in operating systems. vLLM achieves 2-4× higher throughput than HuggingFace Transformers and 10-100× higher throughput compared to naive implementations.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developers** | Woosuk Kwon, Zhuohan Li, Siyuan Zhuang, et al. (UC Berkeley) |
| **Core Innovation** | PagedAttention — KV cache managed as non-contiguous blocks like OS virtual memory |
| **Performance** | 24× higher throughput than HuggingFace Transformers (T5-XXL), 2-4× for LLaMA models |
| **Throughput** | 100+ req/s on single A100 (Llama-2-70B) |
| **License** | Apache 2.0 |
| **Stars** | 40K+ on GitHub |
| **First Release** | 2023 |

## Core Features

- **PagedAttention**: Eliminates KV cache memory fragmentation, enabling near-optimal memory utilization
- **Continuous Batching**: Dynamic request scheduling — add new requests as old ones finish without waiting for batch completion
- **Multi-LoRA Support**: Serve multiple fine-tuned adapters on a single base model
- **Tensor Parallelism**: Multi-GPU inference for large models
- **OpenAI-Compatible API**: Drop-in replacement for OpenAI API endpoints
- **Automatic Prefix Caching**: Reuse computed KV prefixes across requests
- **Speculative Decoding**: Draft model proposes tokens, target model verifies — 2× speedup

## Supported Models

LLaMA/2/3, Mistral, Mixtral, Qwen, DeepSeek, Phi, Gemma, Yi, Baichuan, Falcon, GPT-NeoX, OPT, BLOOM, and 50+ more model families.

## Usage in AI Game Development

- **Local game NPC serving**: Deploy fine-tuned NPC dialogue models with low latency
- **Game asset generation pipelines**: Serve image/video generation models alongside LLMs
- **Multi-model orchestration**: Serve multiple LoRA adapters for different game characters from one engine
- **Real-time game tools**: High-throughput inference for game dev assistants

## Related Projects

- [[ai-game-devtools/text-generation-webui]] — Popular web UI that supports vLLM as a backend
- [[ai-game-devtools/llama-3]] — Meta Llama 3 models commonly served via vLLM
- [[ai-game-devtools/sglang]] — Alternative structured generation engine with RadixAttention
- [[ai-game-devtools/mlc-llm]] — Cross-platform LLM deployment engine
