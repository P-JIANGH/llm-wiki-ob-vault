# Stable-Dreamfusion — Source Analysis

**Source:** https://github.com/ashawkey/stable-dreamfusion
**Analyzed:** 2026-04-18
**Mirror:** gitcode.com (GitHub timed out)

---

## README Summary

A PyTorch implementation of the text-to-3D model **DreamFusion**, powered by the **Stable Diffusion** text-to-2D model.

**Key Features:**
- Text-to-3D generation using SDS (Score Distillation Sampling) loss
- Supports multiple diffusion backends: Stable Diffusion (1.5/2.0/2.1), DeepFloyd-IF, Zero-1-to-3
- Two NeRF backbones: Instant-NGP (fast, CUDA/Taichi) and Vanilla NeRF (pure PyTorch)
- DMTet finetuning for high-resolution mesh generation and texture extraction
- Image-conditioned 3D generation via Zero-1-to-3
- PerP-Neg (Perpendicular Negative) guidance to alleviate multi-head/Janus problem
- GUI visualization with DearPyGui
- Supports negative text prompts
- Colab notebooks available

## Architecture

### Core Components

| Module | Path | Function |
|--------|------|----------|
| **Main Entry** | `main.py` | Training/testing loop, argument parsing |
| **NeRF Backbone** | `nerf/` | Network definitions (network.py, network_grid.py, network_grid_taichi.py), renderer, GUI |
| **Guidance** | `guidance/` | Diffusion guidance modules: SD (sd_utils.py), IF (if_utils.py), Zero-1-to-3 (zero123_utils.py), CLIP (clip_utils.py), PerP-Neg (perpneg_utils.py) |
| **Grid Encoder** | `gridencoder/` | Multi-resolution grid encoder (Instant-NGP style) |
| **Ray Marching** | `raymarching/` | CUDA/Taichi ray marching for volume rendering |
| **DPT** | `dpt.py` | Depth prediction (Omnidata-based) |
| **Image Preprocessing** | `preprocess_image.py` | RGBA extraction, depth & normal estimation for image-to-3D |
| **DMTet** | `dmtet.py` | Differentiable tetrahedron mesh extraction |

### Key Differences from Original DreamFusion Paper

1. Uses **Stable Diffusion** (latent diffusion) instead of Imagen — loss propagates through VAE encoder, adding time cost
2. Uses **multi-resolution grid encoder** (torch-ngp) for fast rendering (~10FPS at 800x800)
3. Uses **Adan optimizer** as default
4. Supports **PerP-Neg** to mitigate multi-head artifacts

### Dependencies

- PyTorch, diffusers, transformers, accelerate
- tiny-cuda-nn (optional, for grid_tcnn backend)
- DearPyGui (GUI)
- trimesh, PyMCubes, xatlas, pymeshlab, nvdiffrast (DMTet + mesh export)
- CLIP, carvekit-colab (Zero-1-to-3)
- Taichi-nightly (optional CUDA-free backend)

### Usage Flow

```
Text Prompt → Stable Diffusion/IF Guidance → NeRF Training (SDS Loss) → DMTet Finetuning → Mesh Export (.obj/.glb)
```

### Notable Features

- **Instant-NGP Backbone:** `-O` flag enables `--cuda_ray --fp16`, fast rendering, ~16GB VRAM
- **Vanilla Backbone:** `-O2` flag, pure PyTorch, no CUDA needed, slower
- **Taichi Backend:** `--backbone grid_taichi`, comparable performance to CUDA, no CUDA build required
- **VRAM Optimization:** `--vram_O` enables various VRAM savings from diffusers docs
- **DMTet Finetuning:** Higher resolution mesh extraction from trained NeRF
- **Image-to-3D:** Zero-1-to-3 backend with optional depth guidance

### License

Not explicitly stated in README. Project by Jiaxiang Tang (2022).
