---
title: EmoVOCA
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, 3d, audio, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/emovoca.md]
---

# EmoVOCA

Speech-Driven Emotional 3D Talking Heads — WACV 2025 paper by University of Florence (MICC).

## Overview

EmoVOCA generates emotionally expressive 3D talking head animations from audio input. It solves the lack of 3D datasets combining speech diversity with facial expression variety by creating a synthetic dataset that blends inexpressive talking heads with expressive 3D sequences.

**Input:** 3D face template + audio file + emotion label + intensity value
**Output:** Audio-synchronized 3D talking head animation with emotional expression

## Architecture

Three-component pipeline:

| Component | Pipeline | Model Type |
|-----------|----------|------------|
| DE-SD | Talking + Expressive mesh → Combined mesh | Spiral Autoencoder (dual encoder, shared decoder) |
| ES2L | Audio → 3D facial landmarks | Wav2Vec2 + landmark decoder |
| ES2D | Landmarks → Full 3D mesh | Spiral Decoder |

### Spiral Autoencoder
- Uses spiral convolution on mesh topology (not standard CNN)
- 5-level multi-resolution pyramid (downsampling factors [4,4,4,4])
- FLAME 3D face model with 5023 vertices
- Two separate encoders (talking + emotional) share a decoder
- Latent vectors concatenated at inference for mixed output

### Audio Processing
- Wav2Vec2 (facebook/wav2vec2-base-960h) extracts 768-dim audio features
- Audio resampled to 16kHz via librosa
- Speech features drive lip-sync animation

### Rendering
- pyrender (OpenGL offscreen) for mesh rendering
- OpenCV for frame composition
- ffmpeg for final video + audio muxing
- Output: MP4 video at configurable FPS (default 60)

## Emotion & Intensity

Supports **11 emotion categories**: Afraid, Disgust, Irritated, Sad, Happy/Smile, Drunk, Ill, Moody, Pleased, Suspicious, Upset.

**3 intensity levels**: Low, Mid, High — controlling expression strength via latent vector scaling.

## Datasets

| Dataset | Purpose | Access |
|---------|---------|--------|
| VOCASET | Neutral speech-driven talking heads | Authorization required |
| Florence 4D | Expressive facial sequences | Authorization required |

## Tech Stack

- **Framework:** PyTorch 2.1.0 (CUDA 12.1)
- **Language:** Python 3.8
- **3D:** FLAME model, trimesh, spiral convolutions
- **Audio:** librosa, Wav2Vec2 (transformers)
- **Render:** pyrender, OpenCV, ffmpeg
- **License:** CC BY-NC 4.0 (non-commercial)

## Links

- GitHub: https://github.com/miccunifi/EmoVOCA
- Project Page: https://fedenoce.github.io/emovoca/
- Paper: https://arxiv.org/abs/2403.12886

## Related

- [[echo-mimic]] — Audio-driven talking head generation
- [[aniportrait]] — Portrait animation with audio
- [[dreamtalk]] — Emotional talking head generation
- [[flame-3d-face-model]] — FLAME 3D face model used as base mesh
