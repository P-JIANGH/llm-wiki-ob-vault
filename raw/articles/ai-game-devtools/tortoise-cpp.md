# tortoise.cpp — GGML implementation of Tortoise-TTS

**Source:** https://github.com/balisujohn/tortoise.cpp
**Author:** John Balis
**License:** MIT
**Date:** 2026-04-21 (captured)

## Overview

tortoise.cpp is a C++/GGML port of the original [tortoise-tts](https://github.com/neonbjb/tortoise-tts) text-to-speech system, enabling efficient CPU/GPU inference without Python dependencies.

## Architecture

- **Core:** C++ with GGML tensor library (same backend as llama.cpp)
- **Main files:** `main.cpp`, `common.cpp`, `common.h`
- **Dependencies:** GGML (submodule), dr_wav.h (audio I/O), stb_image.h/stb_image_write.h (image utilities)
- **Build:** CMake with options for CPU, CUDA (`-DGGML_CUBLAS=ON`), and Metal (`-DGGML_METAL=ON`)

## Model Components

Requires 3 GGML model files (from HuggingFace `balisujohn/tortoise-ggml`):
1. `ggml-model.bin` — Autoregressive text-to-token model
2. `ggml-vocoder-model.bin` — Vocoder for waveform generation
3. `ggml-diffusion-model.bin` — Diffusion-based refinement model

## CLI Usage

```
./tortoise --message "based... dr freeman?" --voice "../models/mouse.bin" --seed 0 --output "based?.wav"
```

All CLI arguments are optional. Only lowercase letters, spaces, and punctuation supported in prompts.

## Voice Creation

Voice files are `.bin` files containing the `auto_conditioning` tensor extracted from the original tortoise-tts Python implementation. Users can extract voices from any tortoise-tts compatible audio by modifying the Python code to save the conditioning tensor.

## Key Facts

- **Language:** C++ (C++11)
- **Platform:** Linux x86, macOS ARM, Ubuntu 22.04 (CUDA)
- **GPU Support:** CUDA (tested on GTX 1070 Ti), Metal (WIP)
- **License:** MIT (derived from tortoise-tts Apache 2.0 + GGML MIT)
- **Parent:** Derived from neonbjb/tortoise-tts (James Betcker)
- **Backend:** GGML (Georgi Gerganov's tensor library)

## Requirements (for model export)
- accelerate==0.19.0, numpy==1.24.3, sentencepiece==0.1.98
- torch==2.0.1, torchaudio==2.0.2, torchvision==0.15.2
- transformers==4.29.2

## Game Dev Relevance

- Enables on-device TTS for game NPCs without Python runtime
- GGML backend means it can run on low-resource hardware (CPU, mobile GPUs)
- Voice cloning support allows custom NPC voice creation
- Compatible with voice files from the original tortoise-tts ecosystem
