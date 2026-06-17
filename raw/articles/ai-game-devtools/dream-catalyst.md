# DreamCatalyst — Raw Source

**Date:** 2026-04-18
**Source:** https://github.com/kaist-cvml-lab/DreamCatalyst

## Paper Info

- **Title:** DreamCatalyst: Fast and High-Quality 3D Editing via Controlling Editability and Identity Preservation
- **Conference:** ICLR 2025
- **Authors:** Jiwook Kim*, Seonho Lee*, Jaeyo Shin, Jiho Choi, Hyunjung Shim (KAIST CVML Lab)
- **arXiv:** 2407.11394
- **Project Page:** https://dream-catalyst.github.io/

## Overview

DreamCatalyst is a novel framework that considers the sampling dynamics of diffusion models in the SDS (Score Distillation Sampling) framework. It can be applied to various 3D editing models, including NeRF and 3DGS (3D Gaussian Splatting). The method aims to reduce training time and improve editing quality.

## Architecture

DreamCatalyst works by controlling the balance between **editability** (how much the scene changes) and **identity preservation** (how much the original scene is maintained) through three key parameters:

- **chi (χ):** Weight for identity preservation (default: 0.075)
- **delta (δ):** Weight for editability (default: 0.2 for NeRF, 0.05 for GaussianEditor)
- **gamma (γ):** Weight for editability (default: 0.8 for NeRF, 0.2 for GaussianEditor)

The method provides two implementations:

### 1. NerfStudio Implementation (NeRF + 3DGS editing)

- Based on Nerfstudio framework
- Provides `dc` (NeRF editing) and `dc_splat` (3DGS editing) pipelines
- Uses InstructPix2Pix (timbrooks/instruct-pix2pix) as the base diffusion model
- Integrates FreeU (Free Upsampling) for quality improvement
- Fast mode: 1000 iterations (vs. standard 3000)
- Training command: `ns-train dc` / `ns-train dc_splat`

**Key modules:**
- `3d_editing/` — DreamCatalyst implementation for Nerfstudio
- Supports both nerfacto (NeRF) and splatfacto (3DGS) initial scenes
- PDS (Posterior Distillation Sampling) training procedure

### 2. Threestudio Implementation (GaussianEditor + DreamCatalyst)

- Based on GaussianEditor (buaacyw/GaussianEditor)
- Uses Wonder3D multi-view diffusion for multi-view consistency
- COLMAP-processed datasets + initialized 3DGS point cloud as input
- Segmentation prompt constrains editing region via mask
- Fast mode: 1200 iterations (vs. standard 1500)
- Training command: `python launch.py --config configs/edit-dc.yaml`

**Key modules:**
- `gaussiansplatting/` — Original 3DGS submodules (diff-gaussian-rasterization, simple-knn)
- `threestudio/threestudio/utils/wonder3D/` — Wonder3D multi-view diffusion integration
- `threestudio/threestudio/utils/wonder3D/instant-nsr-pl/` — NeuS/NeRF system for 3D reconstruction
- Anchor-based Gaussian editing with densification control

## Technical Stack

- **Python:** 3.8-3.9
- **PyTorch:** 2.0.1-2.1.2 + CUDA 11.7-11.8
- **Dependencies:** diffusers, gsplat, tiny-cuda-nn, numpy
- **Base frameworks:** Nerfstudio, Threestudio, GaussianEditor, Wonder3D

## Key Findings

- DreamCatalyst reduces training time while maintaining or improving editing quality compared to baseline methods (Instruct-NeRF2NeRF, PDS)
- The three-parameter control (chi/delta/gamma) allows fine-grained tuning of the editability vs. identity preservation trade-off
- Fast mode (1000-1200 iterations) achieves comparable quality to full training (3000-1500 iterations)
- Compatible with both NeRF (nerfacto) and 3DGS (splatfacto) scene representations

## Acknowledgements

The project builds on: PDS, Instruct-Nerf2NeRF, InstructPix2Pix, GaussianEditor, FreeU, DreamSampler, SDEdit.
