---
title: TinyChatEngine
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, inference, edge, quantization, open-source]
sources: [raw/articles/ai-game-devtools/tinychatengine.md]
---

# TinyChatEngine

On-device LLM/VLM inference engine from MIT Han Lab. Runs 4-bit quantized LLaMA-3/CodeLLaMA/Mistral and VILA/LLaVA on laptops (RTX 4070), Apple M1/M2, and Raspberry Pi — pure C/C++, no external ML framework.

## Overview

TinyChatEngine addresses the challenge of running large language models on resource-constrained edge devices. By co-designing with [AWQ (Activation-aware Weight Quantization)](https://github.com/mit-han-lab/llm-awq) and [SmoothQuant](https://github.com/mit-han-lab/smoothquant) — which won **Best Paper at MLSys 2024** — it achieves real-time inference with minimal memory footprint.

The project differentiates itself by being **dependency-free at runtime**: the inference engine is a from-scratch C/C++ implementation. Python is used only for model downloading and conversion.

## Technical Architecture

### Quantization Pipeline

| Method | Description | Precision |
|--------|-------------|-----------|
| AWQ | Activation-aware weight quantization, protects salient channels | INT4 |
| SmoothQuant | Migrates activation quantization difficulty to weights | INT8 |

### Backend Support

| Platform | ISA | Quantization |
|----------|-----|-------------|
| Intel/AMD (x86) | x86-64 | FP32, W4A32, W4A8, W8A8 |
| Apple M1/M2, RPi | ARM | FP32, W4A32, W4A8, W8A8 |
| NVIDIA GPU | CUDA (≥ cc 6.1) | FP32, W4A16 |

Weight layouts are device-specific (QM_x86, QM_ARM, QM_CUDA) with SIMD optimizations (128-bit ARM, 256-bit x86) applied offline during model conversion to eliminate runtime reordering overhead.

### Supported Models

- **LLMs:** LLaMA-3 8B, LLaMA-2 7B/13B, CodeLLaMA 7B/13B, Mistral-7B, OPT 125M–6.7B, StarCoder 15.5B
- **VLMs:** VILA-7B, LLaVA-1.5 7B/13B

All available via the [TinyChatEngine Model Zoo](https://huggingface.co/mit-han-lab/tinychatengine-model-zoo) on HuggingFace.

## Comparison with Similar Tools

| Feature | TinyChatEngine | [[gemma-cpp]] | [[lit-llama]] |
|---------|---------------|-------------------------------|-------------------------------|
| Language | Pure C/C++ | Pure C++ | PyTorch-based |
| Dependencies | None at runtime | None (Google Highway) | PyTorch |
| Quantization | AWQ, SmoothQuant | Custom SFP/NUQ | GPTQ, int8 |
| VLM support | ✅ VILA, LLaVA | ❌ | ❌ |
| ARM backend | ✅ M1/M2, RPi | Limited | ❌ |
| GPU backend | CUDA | ❌ | ❌ |

## Game Dev Relevance

For AI-augmented games, TinyChatEngine enables:
- **In-game NPC dialogue** — run a local 7B chat model on the player's laptop without internet
- **On-device AI assistant** — coding copilot in game editors (CodeLLaMA 7B on RTX 4070 laptop)
- **Privacy-sensitive AI** — all inference stays local, no data leaves the device
- **Vision-language NPCs** — VILA support enables image understanding for game scene analysis

## Related

- [[gemma-cpp]] — Google pure C++ inference engine for Gemma models
- [[lit-llama]] — Lightning-AI's PyTorch-based LLaMA implementation
- [[llmunity]] — Unity plugin for local GGUF/llama.cpp inference
- [AWQ](https://github.com/mit-han-lab/llm-awq) — MLSys 2024 Best Paper quantization method
- [TinyEngine](https://github.com/mit-han-lab/tinyengine) — Related: MCU neural network library from same lab
