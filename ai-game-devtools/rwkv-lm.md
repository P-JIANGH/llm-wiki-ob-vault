---
title: RWKV-LM
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, open-source]
sources: ["general knowledge"]
---

# RWKV-LM

**RWKV** (Receptance Weighted Key Value) is a language model architecture developed by **BlinkDL** (pseudonymous AI researcher). It represents a fundamentally different approach from the dominant transformer architecture: RWKV achieves transformer-comparable quality while using an **RNN-style** forward pass, enabling **O(n) inference complexity** (linear in sequence length) instead of the O(n²) attention cost of standard transformers.

## Overview

RWKV combines the parallelizable training of transformers with the efficient constant-memory, constant-per-token inference of RNNs. The architecture was designed to solve the key limitation of transformers — quadratic memory and compute scaling with context length — while maintaining competitive generation quality. RWKV-LM is the core language model repository; several downstream projects build on it including [[chatrwkv]] (chat interface) and [[visualrwkv]] (vision-language adaptation).

## Key Facts

| Fact | Detail |
|---|---|
| Developer | BlinkDL (AI researcher) |
| Architecture | 100% RNN (Time Mixing + Channel Mixing) |
| Inference Complexity | **O(n)** — linear in sequence length |
| Context | Effectively unbounded (stateful, no fixed limit) |
| Latest Version | RWKV-7 (paper: arXiv 2503.14456, Mar 2025) |
| License | Apache 2.0 |
| Community | 7k+ Discord members |

## Architecture: RWKV = R + W + K + V

The name encodes the four key components:

| Component | Role |
|---|---|
| **R**ecurrent | RNN-style state passing between tokens |
| **W**eighted | Learnable time-decay weights |
| **K**ey | Key vectors (similar to transformer attention) |
| **V**alue | Value vectors (similar to transformer attention) |

### Core Mechanisms

1. **Time Mixing** — Replaces self-attention with a recurrent formula. Each token's output is computed from a weighted combination of the current token and a decaying running state. This avoids the O(n²) attention matrix entirely.
2. **Channel Mixing** — Inter-mixes information across feature dimensions using square ReLU activation (inspired by Primer paper).
3. **Stateful Inference** — Hidden state is maintained between tokens, enabling true streaming generation without recomputing past context.

### Generations

| Version | Key Features |
|---|---|
| RWKV-4 | First production-quality version; 1B–14B models |
| RWKV-5 | Matrix-valued state ("Multi-Head RWKV") |
| RWKV-6 | Per-channel mixing, improved scaling |
| RWKV-7 | Latest (Mar 2025); further quality improvements |
| RWKV-World | Domain-specific variants for game/world understanding |

## Inference Efficiency

| Strategy | VRAM (14B model) | Relative Speed |
|---|---|---|
| CUDA BF16 | High | Fastest |
| INT8 | ~7GB | Fast |
| Stream + Split (v2) | **3GB** | Medium |
| CPU FP32 | Large RAM | Slow |

The 3GB figure for a 14B model is remarkable — comparable transformer models would need 28GB+ for BF16.

## Community Ecosystem

- **rwkv.cpp** — C++ inference (CPU/cuBLAS/CLBlast), int4/int8/fp16/fp32
- **RWKV-Runner** — Windows GUI for running RWKV models
- **ai00_rwkv_server** — Vulkan-based inference API (NVIDIA/AMD/Intel)
- **RWKV-PEFT** — LoRA/Pissa/QLoRA/State Tuning support
- **RWKV APP** — Android/iOS local inference
- **RWKV-infctx-trainer** — Infinite context training

## Game Dev Relevance

RWKV's unique properties make it especially well-suited for game AI:

- **Local deployment** — No API dependency; works offline on consumer hardware
- **Persistent state** — RNN architecture naturally supports NPC memory across game sessions
- **Long context** — No fixed context limit; NPCs can remember entire game histories
- **Low VRAM** — 14B model runs in 3GB VRAM with streaming, fitting on integrated GPUs
- **World models** — RWKV-World variants trained on game-specific data
- **[[ai-writer]]** — AI novel-writing tool built on RWKV for narrative generation
- **[[chatrwkv]]** — ChatGPT-style interface using RWKV models

## Related

- [[chatrwkv]] — ChatGPT-style interface built on RWKV
- [[visualrwkv]] — Vision-language model using RWKV architecture
- [[ai-writer]] — AI novel-writing tool powered by RWKV
- [[llama]] — Mainstream transformer-based LLM (contrasting architecture)

## Links

- [GitHub: BlinkDL/RWKV-LM](https://github.com/BlinkDL/RWKV-LM)
- [RWKV Discord](https://discord.gg/bDSUMEeCPC)
- [RWKV-7 Paper (arXiv 2503.14456)](https://arxiv.org/abs/2503.14456)
- [Hugging Face: BlinkDL](https://huggingface.co/BlinkDL)
