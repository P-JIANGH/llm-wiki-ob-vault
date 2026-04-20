---
title: nanoGPT
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, ml, code, open-source, learning]
sources: ["web:https://github.com/karpathy/nanoGPT", "web:https://www.youtube.com/watch?v=kCc8FmEb1nY"]
---

# nanoGPT

**Minimal GPT Training Code by Andrej Karpathy**

## Overview

nanoGPT is a minimal, clean, and educational implementation of GPT model training by Andrej Karpathy. At approximately 300 lines of code, it reproduces the core architecture and training loop of GPT-2/GPT-3 in a single file. It was created as part of Karpathy's "Let's build GPT" educational video series and serves as a foundational learning resource for understanding transformer-based language models from scratch.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Author** | Andrej Karpathy |
| **Language** | Python + PyTorch |
| **Size** | ~300 lines of code (train.py) |
| **Purpose** | Educational — understand GPT training from first principles |
| **License** | MIT |
| **Stars** | 18K+ on GitHub |
| **Created** | 2022 |
| **Companion** | "Let's build GPT" YouTube video (4+ hours, step-by-step walkthrough) |

## Architecture

- **Single file**: `train.py` contains the entire model, training loop, and utilities
- **GPT-2 compatible**: Reproduces GPT-2 architecture (layer norm, GELU, multi-head attention)
- **Data loading**: Simple character-level or byte-level tokenization from text files
- **Training loop**: Standard autoregressive next-token prediction with cross-entropy loss
- **Optimization**: AdamW optimizer, learning rate warmup + cosine decay, gradient clipping
- **Mixed precision**: fp16/bf16 support for faster training on modern GPUs
- **Distributed training**: Supports DDP (Distributed Data Parallel) for multi-GPU

## Training Recipe

```
Dataset: Shakespeare (character-level) or TinyStories (word-level)
Model: ~124M parameters (GPT-2 small config)
Hardware: Single GPU (A100/V100) or multi-GPU with DDP
Time: ~minutes for Shakespeare, ~hours for TinyStories
```

## Why It Matters for AI Game Development

- **Foundation understanding**: Essential for developers who want to understand how LLMs work before using them in games
- **Custom game LLMs**: Starting point for training domain-specific models (game dialogue, quest generation, NPC behavior)
- **Educational value**: Most accessible path from zero to a working GPT implementation
- **Building block**: Basis for more complex projects like [[nanochat]] and [[autoresearch]]

## Related Projects

- [[ai-game-devtools/nanochat]] — Karpathy's even simpler minimal chatbot training code
- [[ai-game-devtools/autoresearch]] — Karpathy's autonomous LLM research framework (builds on similar principles)
- [[ai-game-devtools/llama-3]] — Production-scale LLMs that share the same GPT architecture principles
- [[ai-game-devtools/chatrwkv]] — Alternative RWKV architecture that achieves similar goals differently
