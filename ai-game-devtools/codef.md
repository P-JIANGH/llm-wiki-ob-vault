---
title: CoDeF
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, tool, open-source, diffusion]
sources:
  - raw/articles/ai-game-devtools/codef.md
---

# CoDeF

**Content Deformation Fields for Temporally Consistent Video Processing**

CVPR 2024 Highlight · Ant Group / HKUST / Zhejiang University

## Overview

CoDeF introduces a **content deformation field** representation for videos, consisting of two jointly optimized components:

1. **Canonical content field** — an implicit neural field (MLP) that aggregates all static content across the entire video into a single canonical image
2. **Temporal deformation field** — an MLP that records the 2D transformation offsets from the canonical image to each individual frame over time

This design enables **lifting any image algorithm to videos without training**: apply an image operation to the canonical image, then propagate results across all frames via the learned deformation field.

## Key Capabilities

- **Zero-shot video-to-video translation**: Apply [[ai-game-devtools/controlnet]] to the canonical image → propagate to entire video with superior cross-frame consistency
- **Zero-shot keypoint tracking**: Detect keypoints on canonical frame → track via deformation field (works on non-rigid objects like water/smog)
- **Semantic inheritance**: Regularization during optimization encourages the canonical field to preserve object shapes and semantics
- **Single GPU training**: Only 10GB VRAM needed, 10K steps per sequence

## Architecture

| Component | Implementation | Details |
|-----------|---------------|---------|
| Canonical content field | `ImplicitVideo` MLP | 8 layers × 256 wide, skip at layer 4, outputs RGB from 2D coordinates |
| Temporal deformation field | `TranslationField` MLP | 6 layers × 128 wide, outputs 2D warping offsets |
| Hash encoding variant | `ImplicitVideo_Hash` + `Deform_Hash3d` | TCNN (tiny-cuda-nn) hash encoding for faster convergence |
| Positional encoding | `Embedding` / `AnnealedEmbedding` | NeRF-style sinusoidal encoding with optional annealing schedule |

### Training Pipeline

1. **Preprocessing**: SAM-Track segmentation masks + RAFT optical flow extraction
2. **Joint optimization**: Canonical field + deformation field co-trained for 10K steps
3. **Regularization losses**:
   - Gradient loss (Sobel-based edge consistency)
   - Optical flow loss (RAFT-guided deformation smoothness)
   - Background consistency loss (regularizes non-masked regions)
4. **Video translation**: Edit canonical image with ControlNet → propagate via deformation field

## Technical Details

- **Framework**: PyTorch 2.0.0 + PyTorch Lightning 2.0.2
- **GPU requirement**: 10GB+ VRAM (tested on RTX A6000, CUDA 11.7)
- **Key dependencies**: tiny-cuda-nn, einops, kornia, RAFT (optical flow), SAM-Track (segmentation)
- **Config system**: YAML per-sequence configs + argparse override
- **License**: Not specified (research code)

## Comparison with Related Tools

Compared to [[ai-game-devtools/animatediff]] which generates video frames via diffusion, CoDeF takes a different approach: it represents an **existing** video as a deformable canonical image, enabling consistent post-processing rather than generation. Unlike [[ai-game-devtools/animate-anyone]] which animates a static figure from pose sequences, CoDeF works with arbitrary video content and is algorithm-agnostic — any image operation can be lifted.

The approach shares conceptual similarities with [[ai-game-devtools/animate3d]] in using neural implicit representations, but focuses on 2D video processing rather than 3D animation.

## Links

- **GitHub**: https://github.com/ant-research/CoDeF (original: https://github.com/qiuyu96/codef)
- **Project Page**: https://qiuyu96.github.io/CoDeF/
- **Paper**: https://arxiv.org/abs/2308.07926
- **Colab Demo**: https://colab.research.google.com/github/camenduru/CoDeF-colab
- **High-Res Demo**: https://ezioby.github.io/CoDeF_Demo/
