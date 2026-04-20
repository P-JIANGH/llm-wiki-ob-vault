---
title: Amphion
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, ai, audio, music, speech, tts, vocoder, open-source, python]
sources: [raw/articles/ai-game-devtools/amphion.md]
---

# Amphion

**Amphion** is an open-source toolkit for **Audio, Music, and Speech Generation** by OpenMMLab. It provides a comprehensive platform for converting any input into audio, supporting reproducible research across multiple generation tasks.

## Overview

| Field | Value |
|-------|-------|
| Org | OpenMMLab |
| License | MIT |
| Language | Python (PyTorch) |
| GitHub | https://github.com/open-mmlab/Amphion |

## Supported Tasks

- **TTS** (Text to Speech): FastSpeech2, VITS, VALL-E, NaturalSpeech2, Jets, MaskGCT, Vevo-TTS, DualCodec-VALLE
- **VC** (Voice Conversion): Vevo, FACodec, Noro — zero-shot voice imitation
- **SVC** (Singing Voice Conversion): Vevo2, Vevo1.5 — unified speech + singing generation
- **TTA** (Text to Audio): Latent diffusion (AudioLDM-style)
- **AC** (Accent Conversion): Vevo-Style, zero-shot
- **Vocoder**: MelGAN, HiFi-GAN, BigVGAN, WaveGlow, Diffwave, WaveNet, WaveRNN
- **Neural Audio Codec**: DualCodec (12.5/25Hz), FACodec

## Key Features

- **Emilia Dataset**: Exclusive support for 101k-200k hours of in-the-wild speech data with Emilia-Pipe preprocessing pipeline
- **Evaluation Suite**: Comprehensive metrics — F0 modeling, energy, intelligibility (Whisper-based), spectral distortion (FAD/MCD/PESQ/STOI), speaker similarity
- **Visualization**: SingVisio tool for interactive diffusion model visualization in singing voice conversion
- **Docker Support**: `realamphion/amphion` image with NVIDIA GPU support

## Architecture

- `models/` — Core model implementations (tts/vc/svc/tta/codec/vocoders)
- `egs/` — Example recipes for each task with full training/inference pipelines
- `preprocessors/` — Dataset preprocessing (Emilia-Pipe, LibriTTS, LJSpeech, etc.)
- `modules/` — Shared neural network building blocks
- `evaluation/` — Objective metrics pipeline

## Notable Models

| Model | Year | Key Contribution |
|-------|------|-----------------|
| MaskGCT | 2024 | Fully non-autoregressive TTS, eliminates explicit alignment, SOTA zero-shot |
| Vevo/Vevo1.5/Vevo2 | 2024-2026 | Unified speech + singing generation, controllable timbre/style |
| DualCodec | 2025 | Low-frame-rate (12.5Hz) neural audio codec with SSL enhancement |
| Metis | 2025 | Foundation model for unified speech generation (zero-shot TTS/VC/enhancement) |

## Related Tools

- [[ai-game-devtools/academicodec]] — Another open-source audio codec toolkit (EnCodec/SoundStream/HiFi-Codec), shares the neural codec research space
- [[ai-game-devtools/mug-diffusion]] — AI music score generation using diffusion models, complementary audio/music tool
- [[ai-game-devtools/voxcpm]] — Speech synthesis system, shares the TTS domain
