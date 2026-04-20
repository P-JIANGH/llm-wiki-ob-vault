---
title: AnimateDiff
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, animation, diffusion, open-source, image-generation]
sources: [web:https://github.com/guoyww/AnimateDiff, web:https://arxiv.org/abs/2307.04725]
---

# AnimateDiff

**Open-source diffusion model for text-to-video animation**

## Overview

AnimateDiff is a plug-and-play module that converts existing text-to-image (T2I) diffusion models into animation generators. By inserting a temporal motion module into pre-trained Stable Diffusion models, AnimateDiff enables animation synthesis without fine-tuning the base model. It supports multiple T2I backends (SD 1.5, SDXL) and has become the foundation for numerous video generation and character animation pipelines.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Yanwei Zhang (guoyww) et al., CUHK |
| **Paper** | arXiv 2307.04725 (ICLR 2024) |
| **Architecture** | Temporal attention modules inserted into frozen SD UNet, 16-frame motion module |
| **Backends** | Stable Diffusion 1.5, SDXL, ComfyUI integration |
| **Motion Modules** | v1 (SD1.5), v2 (SD1.5, extended frames), v3 (SDXL support) |
| **Frame Capacity** | 16 frames base, extended via sliding window/context |
| **Resolution** | 256×256 to 768×768 depending on base model |
| **License** | Apache 2.0 |

## Architecture

- **Motion Module**: Temporal attention layers injected between spatial blocks of SD UNet
- **Zero-initialization**: All temporal layers start at zero, preserving base model behavior initially
- **Domain Adapter**: Optional LoRA layers to reduce domain gap between image and video
- **Sampling**: Standard DDIM/DDPM samplers, no special inference changes needed

## Usage in AI Game Development

AnimateDiff is widely used for:
- **Sprite animation**: Converting static character designs into animated sequences
- **Cutscene generation**: Creating short animated clips from concept art
- **Motion transfer**: Applying motion from reference videos to generated characters
- **Asset variation**: Generating multiple animation styles from the same base model

## Related Projects

- [[ai-game-devtools/comfyui]] — Modular AI engine with extensive AnimateDiff node support
- [[ai-game-devtools/motiondirector]] — Dual-path LoRA for motion customization on top of AnimateDiff
- [[ai-game-devtools/mofa-video]] — Controllable image animation using frozen SVD + MOFA-Adapter
- [[ai-game-devtools/story-diffusion]] — Long-range consistent image+video generation with AnimateDiff pipeline
