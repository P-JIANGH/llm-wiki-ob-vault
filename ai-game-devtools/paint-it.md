---
title: Paint-it — Text-to-Texture Synthesis via Deep Convolutional PBR Optimization
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, image-generation, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/paint-it.md]
---

# Paint-it

## Overview

Paint-it is a CVPR 2024 text-driven PBR texture synthesis method by POSTECH AMILab. It generates complete, engine-ready PBR parameter maps (diffuse, roughness, metalness, normal) from text prompts for any 3D mesh with UV coordinates, without modifying the Score-Distillation Sampling (SDS) pipeline.

## Key Innovations

| Feature | Description |
|---------|-------------|
| **Unmodified SDS** | Superior results via novel texture map parameterization rather than SDS modifications |
| **Deep Image Prior** | Architectural bias learns from noisy SDS gradients, no complex denoising needed |
| **Complete PBR Output** | Diffuse + roughness + metalness + normal maps, ready for Unity/Blender/UE |
| **Post-Processing** | Supports relighting and material editing after generation |

## Architecture

| Module | Purpose |
|--------|---------|
| `dc_pbr/` | Deep Convolutional PBR optimization |
| `nvdiff_render/` | Differentiable rendering backend (nvdiffrast) |
| `sd.py` | Score-Distillation Sampling implementation |

## Three Workflows

1. **Custom Mesh** — `.obj` file + text prompt → PBR maps
2. **Objaverse Batch** — Bulk processing with per-object prompts
3. **SMPL Human** — SMPL parameters + text → PBR textured human meshes

## Technical Details

- **Framework:** PyTorch 1.12.0, CUDA 11.3, Python 3.8
- **GPU:** RTX A6000 (48GB) recommended
- **Input requirement:** Mesh must have UV coordinates defined
- **Rendering:** Differentiable via nvdiffrast
- **License:** Academic/research use (cite CVPR 2024 paper)

## Comparison with Similar Tools

Compared to [[intex]] (interactive text-to-texture with inpainting traversal) and [[dreammat]] (geometry+light-aware ControlNet approach), Paint-it's distinguishing feature is its Deep Image Prior integration — it achieves high-quality results by optimizing through convolutional architecture bias rather than modifying SDS or using ControlNet conditioning. Unlike [[crm]] which generates both geometry AND texture, Paint-it focuses purely on texture synthesis for existing meshes.

## Links

- [GitHub](https://github.com/postech-ami/paint-it)
- [Project Page](https://kim-youwang.github.io/paint-it)
- [Paper (arXiv)](https://arxiv.org/abs/2312.11360)
