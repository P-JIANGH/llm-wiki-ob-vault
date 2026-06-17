---
title: Hunyuan-GameCraft
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai, tool, video, game, open-source]
sources: [raw/articles/ai-game-devtools/hunyuan-gamecraft.md]
---

# Hunyuan-GameCraft

## Overview

**Hunyuan-GameCraft** is a Tencent research framework for high-dynamic interactive game video generation. Given a reference game screenshot + text prompt + keyboard/mouse action signals (WASD/mouse), it generates temporally coherent gameplay videos autoregressively — essentially predicting what the game would look like as the player moves the camera.

Released August 2025 (arXiv:2506.17201), with inference code and model weights publicly available.

## Key Capabilities

- **Action-controllable video generation**: Keyboard (WASD) and mouse input unified into a continuous camera representation space — enables smooth interpolation between camera operations
- **Hybrid history conditioning**: Variable mask indicator distinguishes history frames (1) from predicted frames (0), enabling long-horizon autoregressive extension while preserving scene identity
- **Model distillation**: Distilled checkpoint reduces inference from 50 steps (cfg=2.0) to 8 steps (cfg=1.0), ~6× speedup with quality preservation
- **Large-scale training**: 1M+ gameplay recordings across 100+ AAA game titles, fine-tuned on synthetic annotated data for enhanced control precision
- **Multi-resolution output**: 704×1216 resolution, 33 frames per action chunk at 25 FPS

## Architecture

```
Input: reference image + text prompt + action list + action speeds
         │
         ▼
Lightweight Action Encoder (CameraNet) ──► camera trajectory embedding
         │
Reference Image ──► Patchify + Image Features
         │
         ▼
     Feature Fusion (after patchify, action + image features added)
         │
         ▼
  Hybrid History Conditioning (variable mask: 1=history, 0=predict)
         │
         ▼
  DiT-based Video Diffusion (same architecture family as HunyuanVideo)
         │
         ▼
  Causal 3D VAE decoder ──► output video
```

**Core modules:**
- `hymm_sp/modules/cameranet.py` — Camera network encoding keyboard/mouse into unified camera space
- `hymm_sp/modules/models.py` — Core DiT-based diffusion model
- `hymm_sp/vae/vae.py` — Causal 3D VAE for video compression/decompression
- `hymm_sp/text_encoder/` — Text encoder for prompt conditioning

## Inference Modes

| Mode | GPUs | VRAM | Steps | Speed |
|------|------|------|-------|-------|
| Full (8-GPU) | 8× H20/H800 | 80GB | 50 | Baseline |
| Distilled (8-GPU) | 8× H20/H800 | 80GB | 8 | ~6× faster |
| Low-VRAM (1-GPU) | 1× 24GB+ | 24GB | 50+cpu-offload | Slow |

Supports FP8 optimization and [SageAttention](https://github.com/thu-ml/SageAttention) for further acceleration.

## Differences from Related Tools

| Feature | Hunyuan-GameCraft | [[hunyuan-video]] | [[CogVideoX]] | [[Open-Sora]] |
|---------|-------------------|-------------------|----------------|---------------|
| Action control | Keyboard/mouse → camera space | Text only | Text only | Text only |
| Game-specific | Yes (100+ AAA games) | General video | General video | General video |
| History conditioning | Hybrid (mask-based) | Standard | Standard | Standard |
| Distilled model | Yes (8 steps) | No | No | No |

## License & Access

- **License**: Custom research license (see `LICENSE` / `Notice.txt`)
- **Code**: Open-source (GitHub)
- **Weights**: Download from [HuggingFace](https://huggingface.co/tencent/Hunyuan-GameCraft-1.0) or internal `weights/` directory
- **ArXiv**: [2506.17201](https://arxiv.org/abs/2506.17201)
- **Project Page**: [hunyuan-gamecraft.github.io](https://hunyuan-gamecraft.github.io/)

## Related

- [[hunyuan-video]] — Parent video generation model family
- [[hunyuan-mt]] — Hunyuan multimodal training infrastructure
- [[video-agent]] — Another video generation/agent tool in the wiki
- [[CogVideoX]] — THUDM's text-to-video model (different approach)
