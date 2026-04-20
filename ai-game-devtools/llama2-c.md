---
title: llama2.c
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, code, open-source, tool]
sources: [web:https://github.com/karpathy/llama2.c, web:https://github.com/karpathy/llama2.c]
---

# llama2.c

**Karpathy's llama2.c — pure C implementation of Llama 2 inference**

## Overview

llama2.c is a minimal, pure C implementation of Llama 2 inference by Andrej Karpathy. Written in approximately 700 lines of code, it demonstrates how to run Llama 2 models without any external dependencies — no PyTorch, no CUDA, no Python runtime. The project converts PyTorch model weights to a custom binary format and runs inference using only standard C library functions, making it an excellent educational resource for understanding transformer inference at the lowest level.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Andrej Karpathy |
| **Language** | Pure C (~700 lines), optional multithreading with pthreads |
| **Model Support** | Llama 2 (7B), TinyLlama (1.1B), custom trained models |
| **Weight Format** | Custom binary format converted from PyTorch .pth files |
| **Quantization** | FP32 default, INT8 quantization support |
| **Platform** | Linux, macOS, Windows (WSL) — no GPU required |
| **Performance** | ~30 tokens/sec (7B on CPU, single-thread), faster with pthreads |
| **License** | MIT |

## Architecture

- **Tokenizer**: SentencePiece BPE tokenizer ported to C
- **Transformer**: Standard Llama architecture with RMSNorm, RoPE, SwiGLU
- **Matrix Multiplication**: Optimized naive matmul, pthreads for parallelization
- **Weight Loading**: Binary weight files loaded directly into memory-mapped structures
- **No Dependencies**: Only standard C library + optional pthreads

## Usage in AI Game Development

llama2.c demonstrates:
- **Embedded AI**: Run LLMs on resource-constrained game devices without GPU
- **Educational value**: Understand transformer internals for custom game AI
- **Minimal deployment**: Zero-dependency inference for game engines
- **Custom model training**: Train models with [[ai-game-devtools/nanogpt]] and export to llama2.c format

## Related Projects

- [[ai-game-devtools/nanogpt]] — Karpathy's minimalist GPT training code, companion training pipeline
- [[ai-game-devtools/llama-cpp]] — Production-grade C/C++ LLM inference engine (GGUF format, 70K+ stars)
- [[ai-game-devtools/litgpt]] — Lightning AI's lightweight GPT with more features and model support
- [[ai-game-devtools/nanochat]] — Karpathy's even simpler chatbot training code
