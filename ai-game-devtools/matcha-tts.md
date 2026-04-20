---
title: Matcha-TTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, flow-matching, open-source, tool, python, ai-model]
sources: [raw/articles/ai-game-devtools/matcha-tts.md]
---

# Matcha-TTS — Conditional Flow Matching TTS

## Overview

**Matcha-TTS** 🍵 is a fast, non-autoregressive text-to-speech system developed by Shivam Mehta et al. at KTH Royal Institute of Technology. Published at ICASSP 2024, it uses **conditional flow matching** (similar to rectified flows) to speed up ODE-based speech synthesis while maintaining high naturalness.

- **Paper:** ICASSP 2024 — [arXiv:2309.03199](https://arxiv.org/abs/2309.03199)
- **GitHub:** [shivammehta25/Matcha-TTS](https://github.com/shivammehta25/Matcha-TTS)
- **License:** MIT
- **Stack:** PyTorch 2.0+ / PyTorch Lightning / Hydra / Cython (MAS)
- **Demo:** [HuggingFace Space](https://huggingface.co/spaces/shivammehta25/Matcha-TTS)

## Architecture

```
Text → TextEncoder (Conformer + RoPE) → mu_x + logw
  → MAS Alignment → mu_y → CFM Decoder (U-Net + Conformer) → Mel → HiFi-GAN → Audio
```

| Component | Description |
|-----------|-------------|
| **TextEncoder** | Conformer encoder with RoPE position encoding, outputs mel mean and log-durations |
| **Duration Predictor** | 2-layer Conv1d for phoneme duration prediction |
| **MAS** | Cython monotonic alignment search — optimal text→mel alignment (inherited from [[ai-game-devtools/glow-tts]]) |
| **CFM Decoder** | Conditional flow matching with U-Net + Conformer blocks, Euler ODE solver |
| **HiFi-GAN** | Built-in vocoder for mel→waveform |

## Key Features

- **Probabilistic synthesis** — diverse output via latent noise sampling
- **Fast inference** — configurable ODE steps (default 10), much faster than autoregressive TTS
- **Controllable** — speaking rate, temperature, speaker identity parameters
- **Multi-speaker** — speaker embedding layer for diverse voices
- **ONNX export** — deployable to edge/mobile, can embed vocoder in graph
- **CLI + Gradio** — easy integration into pipelines

## Training & Customization

Uses Hydra + PyTorch Lightning for training. Supports custom datasets (LJSpeech, Hi-Fi-Captain, etc.):
```bash
python matcha/train.py experiment=ljspeech
matcha-tts --text "<INPUT>" --checkpoint_path <CUSTOM_CKPT>
```

Phoneme-level alignments can be extracted from trained models for duration-guided training.

## Game Dev Relevance

Matcha-TTS provides a fast, MIT-licensed TTS backbone for game NPC voice generation:
- Low-latency inference (few ODE steps) suitable for dynamic dialogue
- Multi-speaker support for diverse character voices
- ONNX export enables deployment on game consoles or mobile devices
- Controllable speaking rate and temperature for expressive dialogue
- Works well with [[ai-game-devtools/cosyvoice]] (also uses flow matching) and [[ai-game-devtools/glow-tts]] (MAS alignment predecessor)
