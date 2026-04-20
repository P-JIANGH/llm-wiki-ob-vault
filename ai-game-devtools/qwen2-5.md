---
title: Qwen 2.5
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, open-source, code-generation]
sources: [web:https://qwenlm.github.io/blog/qwen2.5, web:https://huggingface.co/Qwen]
---

# Qwen 2.5

**Alibaba Qwen 2.5 LLM series with 0.5B to 72B models, strong coding and math capabilities**

## Overview

Qwen 2.5 is Alibaba's latest open-source large language model series, spanning model sizes from 0.5B to 72B parameters. The series features significant improvements in coding, mathematics, logical reasoning, and structured data processing. Qwen 2.5 models support ultra-long context windows (up to 128K tokens), multi-language understanding (29+ languages), and include instruction-tuned variants optimized for chat and agent applications.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Alibaba Cloud, Tongyi Lab (Qwen team) |
| **Model Sizes** | 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B |
| **Context Length** | Up to 128K tokens |
| **Training Data** | Up to 18T tokens, heavily weighted toward code and STEM |
| **Languages** | 29+ languages including Chinese, English, Japanese, Korean |
| **Architecture** | Decoder-only Transformer, SwiGLU, RoPE, RMSNorm |
| **Variants** | Base, Instruct, Coder (code-specialized), Math (math-specialized) |
| **License** | Apache 2.0 (most sizes), Tongyi Qianwen License (72B) |

## Architecture

- **Decoder-only Transformer**: Standard autoregressive architecture with modern improvements
- **Attention**: Grouped Query Attention (GQA) for efficient inference
- **Positional Encoding**: RoPE (Rotary Position Embedding) with long-context scaling
- **Activation**: SwiGLU activation function for improved training stability
- **Normalization**: RMSNorm for better convergence

## Usage in AI Game Development

Qwen 2.5 is relevant for:
- **Game AI agents**: Strong reasoning capabilities for complex game NPC behavior
- **Code generation**: Qwen-Coder variant for game scripting and tool development
- **RAG systems**: Long context for game lore and world-building knowledge retrieval
- **Multi-language localization**: Native support for 29+ languages in game text generation

## Related Projects

- [[ai-game-devtools/qwen-agent]] — Alibaba Qwen team LLM agent framework
- [[ai-game-devtools/llama]] — Meta foundational LLM series, comparable open-source alternative
- [[ai-game-devtools/dify]] — LLM application platform that supports Qwen models as backends
- [[ai-game-devtools/longcat-flash]] — Meituan 560B MoE LLM, related Chinese-language LLM landscape
