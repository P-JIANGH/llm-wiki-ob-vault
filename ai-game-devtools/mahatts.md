---
title: MahaTTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai, tool, open-source, speech, multimodal]
sources: [raw/articles/ai-game-devtools/mahatts.md]
---

# MahaTTS

## Overview
**MahaTTS** ("Maha" = 'Great' in Sanskrit) is an open-source multilingual TTS model by **Dubverse.ai**, inspired by [[tortoise-tts]] architecture but uniquely integrating **M4T wav2vec2** for semantic token extraction, providing strong cross-language scalability.

## Architecture

Three-stage pipeline:

| Stage | Name | Params | Type |
|---|---|---|---|
| M1 | Text → Semantic | 84M | Causal LM (10,001 tokens) |
| M2 | Semantic → MelSpec | 430M | Diffusion |
| M3 | MelSpec → Audio | 13M | HiFi-GAN Vocoder |

**Total:** ~527M parameters across the full pipeline.

## Available Checkpoints
- **`smolie-en`** — English TTS
- **`smolie-in`** — Indic multilingual (Hindi, Bengali, Tamil, Telugu, Punjabi, Marathi, Gujarati, Assamese, Indian English)

## Key Features
- **Apache 2.0 licensed** — pretrained weights cleared for commercial use
- **11 languages** supported (1 English + 10 Indic languages)
- Colab notebook available for immediate testing
- Local setup via `pip install -e .` + `python tts.py`

## Repository Structure
- `maha_tts/` — Core model package
- `tts.py` — Inference entry point
- `setup.py` / `requirements.txt` — Dependencies

## Roadmap
- **Next release:** 1B parameter model, 20K hours training data, 15 languages
- **Known limitation:** Inference latency still being optimized
- Last checkpoint updates: 2023-11-13, 2024-01-07

## Comparison with Related TTS
- Based on [[tortoise-tts]] design but replaces semantic tokenizer with M4T wav2vec2
- Smaller than [[gpt-sovits]] but broader language coverage (11 Indic+English)
- More lightweight than [[cosyvoice]] pipeline; focused on Indic language market

## Links
- GitHub: https://github.com/dubverse-ai/MahaTTS
- Colab Demo: https://colab.research.google.com/drive/1qkZz2km-PX75P0f6mUb2y5e-uzub27NW
- Developer: Dubverse.ai
