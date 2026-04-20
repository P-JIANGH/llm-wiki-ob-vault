---
title: GaussianCube
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, image-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/gaussiancube.md]
---

# GaussianCube

**Structured and Explicit Radiance Representation for 3D Generative Modeling** — NeurIPS 2024

## Overview
GaussianCube introduces a radiance representation that is both **structured** (fits standard 3D U-Net backbones) and **fully explicit** (no implicit feature decoder). It achieves high-quality 3D representation with **1-2 orders of magnitude fewer parameters** than previous structured representations.

The representation is derived through a two-step process:
1. **Densification-constrained Gaussian fitting** — fits a fixed number of free Gaussians with high accuracy
2. **Optimal Transport rearrangement** — maps Gaussians into a predefined voxel grid

## Key Facts
- **Conference:** NeurIPS 2024
- **Paper:** [arXiv:2403.19655](https://arxiv.org/abs/2403.19655)
- **Project Page:** [gaussiancube.github.io](https://gaussiancube.github.io/)
- **GitHub:** [GaussianCube/GaussianCube](https://github.com/GaussianCube/GaussianCube)
- **Authors:** Bowen Zhang, Yiji Cheng, Jiaolong Yang et al. (Microsoft Research / USTC)

## Technical Architecture

### Core Components
| Component | Description |
|-----------|-------------|
| **3D U-Net** (705 lines) | Standard 3D U-Net backbone with timestep embeddings, attention blocks, 3D upsampling/downsampling, xformers memory-efficient attention support |
| **Gaussian Diffusion** (948 lines) | Port of OpenAI improved-diffusion with custom beta schedules (linear/cosine/sigmoid), DDIM sampling, DPM-Solver |
| **Gaussian Renderer** | Gaussian splatting renderer using diff-gaussian-rasterization (graphdeco-inria) |
| **Rendering Losses** | L1 + LPIPS perceptual loss for training supervision |

### Supported Tasks
| Task | Dataset | Conditioning |
|------|---------|-------------|
| Text-to-3D | Objaverse (170k assets) | CLIP text features (GPT-4o captions in v1.1) |
| Class-conditioned | OmniObject3D | Class labels |
| Unconditional | ShapeNet Car/Chair | None |
| Image-conditioned | Synthetic Avatars | DINO image features |

### Environment
- Python 3.8, PyTorch 1.12.1, CUDA 11.6
- MPI distributed training (8 GPUs recommended)
- FP16 mixed precision

### Pre-trained Models
All available on HuggingFace:
- `objaverse_v1.0` — Text-conditioned (paper version)
- `objaverse_v1.1` — Improved text capabilities (GPT-4o captions)
- `omniobject3d` — Class-conditioned
- `shapenet_car` / `shapenet_chair` — Unconditional

## Mesh Conversion
Generated GaussianCube results can be converted to mesh using the LGM approach (requires nerfacc, nvdiffrast, PyMCubes).

## Relationships
- Built on `openai-improved-diffusion` architecture
- Uses `3d-gaussian-splatting` as rendering primitive
- Related to `trellis-3d` (successor 3D diffusion model by same team)
- Data construction via separate repo: GaussianCube_Construction

## Source
- [[raw/articles/ai-game-devtools/gaussiancube]] — Full analysis of codebase
