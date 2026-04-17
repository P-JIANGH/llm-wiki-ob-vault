# DreamGaussian4D — Generative 4D Gaussian Splatting

**Source:** https://github.com/jiawei-ren/dreamgaussian4d
**Date:** 2026-04-18
**Paper:** arXiv:2312.17142 (2023)
**Authors:** Jiawei Ren*, Liang Pan*, Jiaxiang Tang, Chi Zhang, Ang Cao, Gang Zeng, Ziwei Liu†
**Affiliations:** S-Lab NTU, Shanghai AI Lab, Peking University, University of Michigan

## Overview

DreamGaussian4D generates animated 4D (3D + time) scenes from a single input image.
The approach combines 3D Gaussian Splatting for efficient rendering with a deformation
field that models temporal dynamics. The pipeline supports both image-to-4D and video-to-4D.

## Architecture

### Two-Stage Pipeline

**Stage 1 — Static 3D Generation:**
- Two backends supported:
  - **LGM** (Large Gaussian Model, from 3DTopia/LGM): Default, faster inference
  - **DreamGaussian** (dreamgaussian/dreamgaussian): Alternative, higher quality
- Uses Zero123 / Stable-Zero123 guidance for novel view synthesis
- Outputs a static Gaussian point cloud (.ply) or mesh (.obj)

**Stage 2 — Dynamic 4D Generation:**
- Loads static 3D from Stage 1
- Applies a **deformation field** to model time-varying motion
- Deformation field architecture: K-planes with MLP
  - 4D input coordinates (x,y,z,t)
  - Resolution: [32, 32, 32, 12] (spatial + temporal)
  - Output dimension: 32
  - Regularization: plane TV, time smoothness, L1 on time planes
- Supports loading pre-generated driving videos or generating them via SVD
- Renders 4D output using modified diff-gaussian-rasterization (+ depth, alpha)

### Guidance Losses

- **Zero123/Stable-Zero123** (λ=1): Novel view synthesis guidance
- **Stable Video Diffusion** (λ=0, optional): Video generation guidance
- **Multi-View Dream** (optional): Alternative multi-view guidance

### Mesh Export & Refinement

- Exports mesh per-frame (or single .obj)
- Stop-motion-OBJ Blender addon for animation import
- Optional mesh refinement stage (main2_4d.py with refine.yaml)
- Uses nvdiffrast for differentiable rendering during refinement

## Key Files

| File | Purpose |
|------|---------|
| `main_4d.py` | Main 4D generation entry point, GUI (viser), training loop |
| `main2_4d.py` | Mesh refinement stage |
| `dg.py` | DreamGaussian static 3D generation (alternative to LGM) |
| `gs_renderer.py` | Gaussian Splatting renderer (depth+alpha output) |
| `gs_renderer_4d.py` | 4D variant with deformation field |
| `lgm/infer.py` | LGM static 3D inference |
| `scripts/gen_vid.py` | Driving video generation |
| `scripts/process.py` | Input image preprocessing (background removal) |
| `configs/4d.yaml` | Default 4D training config (120 lines) |
| `configs/dg.yaml` | DreamGaussian static generation config |
| `configs/4d_low.yaml` | Memory-friendly low-res config |
| `configs/refine.yaml` | Mesh refinement config |
| `configs/4d_c4d.yaml` | Consistent4D benchmark config |

## Dependencies

- Python 3.10, CUDA 11.8, PyTorch 2.1.0, xformers 0.0.23
- diff-gaussian-rasterization (custom fork with depth+alpha)
- simple-knn (CUDA spatial indexing)
- nvdiffrast (NVIDIA differentiable rasterizer)
- rembg (background removal)
- Gradio (web demo), viser (3D GUI)
- HuggingFace Diffusers, Transformers

## Usage Modes

1. **Image-to-4D:** Single RGBA image → animated 4D Gaussian scene
2. **Video-to-4D:** Input video frames → 4D reconstruction (Consistent4D benchmark)
3. **Interactive GUI:** viser-based 3D viewer with real-time training monitoring
4. **Gradio Demo:** HuggingFace-hosted web interface

## Config Highlights (4d.yaml)

- Training: 500 iterations stage 1, 50 iterations stage 2
- Batch size: 14 (multi-view)
- Camera: radius 1.5, FOV 49.1°, elevation ±30°
- 4D deformation: K-planes [32³×12], MLP depth 1
- Gaussian params: 5000 initial points, SH degree 0
- Mesh export: per-frame or OBJ format

## Differences from Related Tools

- **vs DreamGaussian:** Adds temporal dimension via deformation field (4D vs 3D)
- **vs 4DGaussians:** Uses generative pipeline (text/image prompt) vs multi-view video input
- **vs threestudio:** Specialized for 4D Gaussian Splatting, not a general framework
