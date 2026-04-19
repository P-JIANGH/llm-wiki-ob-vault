---
title: Index-AniSora
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [ai-model, video-generation, diffusion, open-source, animation]
sources: [raw/articles/ai-game-devtools/index-anisora.md]
---

# Index-AniSora

## Overview

**Index-AniSora** is Bilibili's open-source, state-of-the-art animated video generation model, enabling one-click creation of diverse anime styles including series episodes, Chinese original animations, manga adaptations, VTuber content, and anime PVs. Paper accepted at **IJCAI'25**.

## Versions & Architecture

| Version | Base Model | Key Features |
|:---|:---|:---|
| **V1.0** | CogVideoX-5B | Full training & inference code, CogVideoX-based pipeline |
| **V2.0** | Wan2.1-14B | Enhanced stability & consistency, NPU support |
| **V3.0** | Custom | 360° character rotation from single front-facing image |

### Additional Components
- **anisora_rl**: First RLHF pipeline for anime video generation
- **data_pipeline**: End-to-end dataset pipeline (>10M high-quality clips)
- **reward**: Anime-optimized evaluation benchmark (948 labeled clips)

## Core Technical Features

- **Spatiotemporal Mask Module**: Unified framework enabling image-to-video, frame interpolation, and localized image-guided animation
- **Multi-Guidance Control**: Precise motion control via pose, depth, line art, and audio inputs
- **Video Style Transfer**: Line-art-based generation transforms original videos into target styles using first/last frame conditioning
- **Resolution Upscaling**: 90p → 720p/1080p with richer detail and fewer sampling steps
- **AniMe Integration**: Long-form animation demos (fiction-to-video, 2D/3D cartoon adaptation, comic-to-video)

## Benchmark Performance

### VBench (SOTA)
- Motion Smoothness: **99.34** (highest)
- I2V Subject Consistency: **97.52**
- Subject Consistency: **96.99** (outperforms Vidu, MiniMax, CogVideoX)

### AniSora-Benchmark
| Version | Human Eval | Character Consistency | Visual Smoothness | Text-Video Consistency |
|:---|:---|:---|:---|:---|
| V1 | 70.13 | 94.88 | - | - |
| V2 | - | - | 86.98 | 90.98 |

## Key Differentiator

Unlike natural video models (Sora, Kling, CogVideoX), AniSora is specifically optimized for anime generation — handling unique art styles, physics-violating exaggerated motion, and stylized consistency that general video models struggle with.

## Relationships

- V1 based on CogVideoX-5B, V2 based on Wan2.1-14B (no dedicated wiki pages yet)
- Complements [[ai-game-devtools/animatediff]] in the animation generation space (AniSora is end-to-end video model vs. AnimateDiff's motion module approach)
- Shares benchmark evaluation concerns with [[ai-game-devtools/rpbench-auto]] (both build custom evaluation pipelines for specific domains)
- Related to [[ai-game-devtools/animate-anyone]] in character animation but covers full video generation rather than pose-driven character animation

## Links

- GitHub: https://github.com/bilibili/Index-anisora
- Hugging Face: https://huggingface.co/IndexTeam/Index-anisora
- ModelScope: https://www.modelscope.cn/organization/bilibili-index
- ArXiv: 2412.10255, 2504.10045
