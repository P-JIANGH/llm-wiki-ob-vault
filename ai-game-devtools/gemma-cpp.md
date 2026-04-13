---
title: gemma.cpp
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, model, inference, open-source, google, cpp]
sources: [raw/articles/ai-game-devtools/gemma-cpp.md]
---

# gemma.cpp

## Overview

**gemma.cpp** is a lightweight, standalone C++ inference engine for Google Gemma foundation models (Gemma 2, Gemma 3, RecurrentGemma, PaliGemma 2). It prioritizes simplicity and experimentation over production features — inspired by [[llm.c]], [[ggml]], and [[llama2.c]].

## Key Facts

| | |
|---|---|
| **Developer** | Google (Austin Huang, Jan Wassenberg et al.) |
| **License** | Apache 2.0 |
| **Language** | C++ (C++17), Python bindings via pybind11 |
| **Build** | CMake + Bazel |
| **Models** | Gemma 2/3 (2B-27B), RecurrentGemma (Griffin), PaliGemma 2 |
| **Platforms** | Linux, Windows, macOS, Any CPU |

## What Makes It Different

Unlike the official [[gemma]] PyTorch implementation, gemma.cpp is a from-scratch vertically-integrated C++ inference engine:

- **~2K LoC core** + ~4K LoC utilities — extremely small, auditable codebase
- **No external ML framework** — pure C++ with Google Highway SIMD library
- **Weight compression built-in** — custom fp8 (2-3 mantissa bits) and non-uniform 4-bit (NUQ) formats integrated into GEMM operations
- **Auto-tuning** — runtime autotuning of 7 parameters per matrix shape
- **Single-file model format** (.sbs) — can bundle tokenizer + model type for easy distribution

## Architecture

### Modules
- `gemma/` — Core inference: `gemma.cc/h` (main model class), `attention.cc/h` (attention), `configs.cc/h` (model configs), `weights.cc/h`, `tokenizer.cc/h`, `kv_cache.cc/h`
- `ops/` — Matrix multiplication: `matmul.cc/h`, `matvec-inl.h`, SIMD implementations (bf16/f32/sfp/nuq)
- `compression/` — Weight quantization: `sfp-inl.h` (switched fp8), `nuq-inl.h` (non-uniform 4-bit)
- `paligemma/` — Vision encoder: `vit.cc/h` (ViT), `image.cc/h` (PPM reader)
- `io/` — Model I/O: `blob_store.cc/h`, `migrate_weights.cc` (Safetensors → .sbs converter)

### Inference Flow
1. Load compressed `.sbs` weights via `BlobStore` (memory-map or parallel read)
2. `Gemma::Generate()` — streaming token generation with KV cache
3. Supports batched inference via `GenerateBatch()`
4. For PaliGemma: `GenerateImageTokens()` runs ViT encoder first, then text generation

## Performance Notes

- fp8 switched floating point (`-sfp`) models are half the size of bf16 — recommended for speed
- Second/third query is faster due to auto-tuning warmup
- Supports sequence lengths up to 32K (128K with enough RAM)
- Tensor parallelism for multi-socket CCX-aware systems

## Games/Unity Integration

- **Godot engine demo project** exists at `Gemma-godot-demo-project` (GitHub)
- Embeddable as a library (`libgemma.a`) in any C++ project via CMake FetchContent
- [[llama2.c]] is the most similar project in spirit — both target minimalist C inference for research

## Related Tools

- [[gemma]] — Official PyTorch implementation (training + inference, full generality)
- [[llm.c]] — Karpathy's pure-C LLM inference (C only, no C++)
- [[cosmos]] — NVIDIA world foundation models (different scope: world models vs text inference)
