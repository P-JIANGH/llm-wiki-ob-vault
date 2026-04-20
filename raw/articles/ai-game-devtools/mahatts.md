# MahaTTS: Open-Source Large Speech Generation Model

**Source:** https://github.com/dubverse-ai/MahaTTS
**Retrieved:** 2026-04-21 (web_extract; GitHub/gitcode/gitee clone all failed)

## Overview
- **Developer:** Dubverse.ai
- **License:** Apache 2.0
- **Name Origin:** "Maha" signifies 'Great' in Sanskrit
- **Core Architecture:** Multilingual TTS model inspired by Tortoise TTS, integrates seamless M4T wav2vec2 for semantic token extraction
- **Pretrained checkpoints:** Ready for inference, cleared for commercial use

## Technical Specifications & Architecture

Three sequential pipeline stages:

| Component | Parameters | Model Type | Output |
|---|---|---|---|
| Text to Semantic (M1) | 84M | Causal LM | 10,001 Tokens |
| Semantic to MelSpec (M2) | 430M | Diffusion | 2x 80x Melspec |
| HiFi-GAN Vocoder | 13M | GAN | Audio Waveform |

**Available Checkpoints:**
- `smolie-en` (English)
- `smolie-in` (Indic Multilingual)

## Supported Languages
English (en), Hindi, Indian English, Bengali, Tamil, Telugu, Punjabi, Marathi, Gujarati, Assamese (all in)

## Repository Structure
- `maha_tts/` — Core model package & utilities
- `tts.py` — Primary inference script
- `requirements.txt` & `setup.py` — Dependency management

## Roadmap
- Next: 1B parameter model on 20K hours across 15 languages (including 10 Indic languages)
- Known limitation: Inference latency still being optimized
- Recent checkpoints: 2023-11-13, 2024-01-07

## License
Apache 2.0 — pretrained weights explicitly licensed for commercial deployment.
