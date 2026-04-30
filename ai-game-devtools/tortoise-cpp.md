---
title: tortoise.cpp
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, open-source, tool, cpp, ai-model]
sources: [raw/articles/ai-game-devtools/tortoise-cpp.md]
---

# tortoise.cpp — GGML Port of Tortoise-TTS

## Overview

**tortoise.cpp** is a C++/GGML implementation of [tortoise-tts](https://github.com/neonbjb/tortoise-tts), bringing high-quality text-to-speech to CPU and GPU without Python runtime dependencies. Developed by **John Balis**, it leverages the same GGML tensor library used by [[llama-cpp]], enabling efficient on-device inference across platforms.

## Key Facts

| Attribute | Value |
|-----------|-------|
| **Author** | John Balis |
| **License** | MIT (derived from tortoise-tts Apache 2.0 + GGML MIT) |
| **Language** | C++ (C++11) |
| **Backend** | GGML tensor library (Georgi Gerganov) |
| **GPU Support** | CUDA (tested GTX 1070 Ti), Metal (WIP) |
| **Platforms** | Linux x86, macOS ARM, Ubuntu 22.04 |
| **Models** | 3 GGML binaries (AR model, vocoder, diffusion) from HuggingFace |
| **GitHub** | [balisujohn/tortoise.cpp](https://github.com/balisujohn/tortoise.cpp) |
| **Models** | [balisujohn/tortoise-ggml](https://huggingface.co/balisujohn/tortoise-ggml) |

## Architecture

**Build system:** CMake with compile-time options:
- **CPU:** `cmake .. && make` (works on Linux x86 and Mac ARM)
- **CUDA:** `cmake .. -DGGML_CUBLAS=ON && make`
- **Metal:** `cmake .. -DGGML_METAL=ON && make` (WIP)

**Source structure:**
| File | Purpose |
|------|---------|
| `main.cpp` | CLI entry point, model loading, inference pipeline |
| `common.cpp` / `common.h` | Shared utilities, GGML tensor operations |
| `dr_wav.h` | WAV audio I/O (single-header library) |
| `ggml/` | GGML submodule (tensor computation backend) |

**Three-model pipeline:**
1. **Autoregressive model** (`ggml-model.bin`) — Text → audio tokens
2. **Vocoder** (`ggml-vocoder-model.bin`) — Tokens → waveform
3. **Diffusion model** (`ggml-diffusion-model.bin`) — Waveform refinement

## CLI Usage

```
./tortoise --message "based... dr freeman?" \
           --voice "../models/mouse.bin" \
           --seed 0 \
           --output "based?.wav"
```

All arguments optional. Only lowercase letters, spaces, and punctuation supported.

## Voice System

Voice files are binary `.bin` files containing the `auto_conditioning` tensor extracted from tortoise-tts. Users can create custom voices by:
1. Running original tortoise-tts with any audio source
2. Extracting the `auto_conditioning` tensor after line 401 in `tortoise/api.py`
3. Saving as `.bin` and placing in models folder

This means any voice cloned with tortoise-tts is compatible.

## Comparison with Related TTS Tools

| Tool | Backend | Architecture | On-device | Voice Cloning |
|------|---------|-------------|-----------|--------------|
| **tortoise.cpp** | GGML (C++) | AR + Diffusion + Vocoder | ✅ CPU/GPU | ✅ (tortoise-tts compatible) |
| [[bark]] | Python/PyTorch | AR Transformer | Partial | ✅ (speaker IDs) |
| [[chat-tts]] | Python/PyTorch | AR GPT + DVAE | ❌ | ✅ (audio-based) |
| [[glow-tts]] | Python/PyTorch | Flow-based (MAS) | ❌ | ❌ |

Key advantage: **No Python runtime required** — runs standalone as a C++ binary, making it suitable for embedding in game engines or deploying on resource-constrained hardware.

## Game Dev Relevance

- **On-device TTS** — Generate NPC dialogue without cloud API or Python dependency
- **Voice cloning** — Create custom NPC voices from reference audio
- **Cross-platform** — CPU mode works everywhere; CUDA/Metal for GPU acceleration
- **GGML ecosystem** — Same backend as [[llama-cpp]], enabling unified deployment pipeline
- **Lightweight** — Suitable for embedding in game builds or companion apps

## Links

- GitHub: https://github.com/balisujohn/tortoise.cpp
- HuggingFace Models: https://huggingface.co/balisujohn/tortoise-ggml
- Parent: https://github.com/neonbjb/tortoise-tts
- GGML: https://github.com/ggerganov/ggml
