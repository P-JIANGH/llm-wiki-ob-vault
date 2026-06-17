---
title: Ditto — Motion-Space Diffusion for Talking Head Synthesis
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, diffusion, ai, open-source, python, tool]
sources: [raw/articles/ai-game-devtools/ditto-talkinghead.md]
---

# Ditto: Motion-Space Diffusion for Controllable Realtime Talking Head Synthesis

**ACM MM 2025** | **Ant Group** | **Apache-2.0**

## Overview

Ditto is a diffusion-based framework for **controllable real-time talking head video synthesis**. Its core innovation is performing diffusion in **motion-space** (landmark/motion representation space) rather than pixel space, enabling significantly faster inference suitable for real-time applications.

Built on two foundational projects: [[ai-game-devtools/liveportrait|LivePortrait]] for facial landmark manipulation and **S2G-MDDiffusion** (Speech2Gesture Multi-Modal Diffusion) for motion generation.

## Key Features

- **Real-time synthesis**: Motion-space diffusion enables low-latency generation
- **Dual backends**: TensorRT (optimized for Ampere_Plus GPUs) and PyTorch (broader compatibility)
- **Streaming pipelines**: Both offline (`stream_pipeline_offline.py`) and online (`stream_pipeline_online.py`) modes
- **Audio-driven**: Uses **HuBERT** audio encoder for speech feature extraction
- **Controllable**: Supports custom audio input with fine-grained motion control

## Architecture

| Module | Function |
|--------|----------|
| HuBERT Encoder | Speech feature extraction from audio |
| LMDM (Landmark Motion Diffusion Model) | Motion-space diffusion for facial landmark generation |
| Appearance Model | Visual appearance encoding |
| Decoder | Output reconstruction |
| Warp Module | Facial warping from landmarks |
| Stitch Module | Frame composition and blending |

## Pipeline

```
Audio → HuBERT Features → LMDM (motion diffusion) → Landmarks → Warp → Stitch → Video Output
```

## Installation

```bash
# Recommended: Conda
conda env create -f environment.yaml

# PyTorch backend: place weights in checkpoints/ditto_pytorch/
# TensorRT backend: place weights in checkpoints/ditto_trt_Ampere_Plus/

python inference.py  # Run with default config
```

For non-Ampere GPUs: `python cvt_onnx_to_trt.py` to convert ONNX models to hardware-specific TensorRT engines.

## Comparison with Related Tools

- vs [[ai-game-devtools/liveportrait|LivePortrait]]: Ditto adds audio-driven motion generation via diffusion; LivePortrait focuses on image-driven facial re-enactment
- vs [[ai-game-devtools/aniportrait|AniPortrait]]: Both are audio-driven; Ditto uses motion-space diffusion for real-time, AniPortrait uses 3DMM + AnimateDiff Motion Module
- vs [[ai-game-devtools/chatdollkit|ChatdollKit]]: ChatdollKit is a Unity SDK for VRM avatars with LLM+STT/TTS pipeline; Ditto is a Python video synthesis model

## Resources

- **GitHub**: https://github.com/antgroup/ditto-talkinghead
- **Project Page**: https://digital-avatar.github.io/ai/Ditto/
- **HuggingFace**: https://huggingface.co/digital-avatar/ditto-talkinghead
- **Conference**: ACM MM 2025
