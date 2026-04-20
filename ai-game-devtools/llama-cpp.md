---
title: llama.cpp
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, tool, open-source]
sources: [web:https://github.com/ggerganov/llama.cpp]
---

# llama.cpp

**Pure C/C++ LLM Inference Engine by ggerganov**

## Overview

llama.cpp is a pure C/C++ implementation for LLM inference that enables running large language models on consumer hardware without GPU dependencies. Created by Georgi Gerganov, it introduced the **GGUF** (GGML Universal Format) model format and supports quantization down to 2-4 bits, making it possible to run 70B+ parameter models on a laptop CPU. It has become the de facto standard for local LLM deployment.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Georgi Gerganov (ggerganov) |
| **Language** | Pure C/C++ (no Python dependencies for inference) |
| **Model Format** | GGUF (GGML Universal Format) — replaced older GGML format |
| **Quantization** | Q2_K through Q8_0, IQ2/IQ3/IQ4 variants — 2-8 bit quantization |
| **Hardware** | CPU (x86/ARM), GPU (CUDA, Metal, Vulkan, SYCL, OpenCL) |
| **License** | MIT |
| **Stars** | 70K+ on GitHub |
| **Created** | March 2023 |

## Core Features

- **CPU-first inference**: Runs LLMs on any CPU with optimized BLAS backends
- **GGUF format**: Self-contained model files with metadata, supports quantization at conversion time
- **Multi-platform**: Windows, macOS, Linux, Android, iOS — even runs on Raspberry Pi
- **GPU acceleration**: Optional CUDA (NVIDIA), Metal (Apple Silicon), Vulkan (cross-platform) backends
- **Server mode**: Built-in HTTP server with OpenAI-compatible API
- **Speculative decoding**: Draft model speeds up generation
- **Embedding support**: Text embeddings for RAG pipelines
- **LoRA support**: Load LoRA adapters on top of base models

## Quantization Levels

| Level | Bits | Quality | Typical Use |
|-------|------|---------|-------------|
| Q8_0 | ~8.0 | Near lossless | High quality, larger models |
| Q5_K_M | ~5.5 | Excellent | Recommended default |
| Q4_K_M | ~4.5 | Very good | Best balance |
| Q3_K_M | ~3.5 | Good | Memory-constrained |
| Q2_K | ~2.5 | Acceptable | Minimum viable |

## Usage in AI Game Development

- **Local game NPC deployment**: Run character LLMs on player machines without cloud dependency
- **Embedded game AI**: Deploy on edge devices, consoles, or mobile for in-game AI
- **Game dev tooling**: Local code assistants, documentation search, and design helpers
- **Offline game features**: Privacy-preserving AI features that work without internet

## Related Projects

- [[ai-game-devtools/text-generation-webui]] — Web UI with native llama.cpp backend support
- [[ai-game-devtools/gpt4all]] — Desktop LLM platform built on llama.cpp
- [[ai-game-devtools/everything-ai]] — Docker multi-task AI tool using llama.cpp backend
- [[ai-game-devtools/llama-3]] — Meta Llama models commonly quantized to GGUF format
