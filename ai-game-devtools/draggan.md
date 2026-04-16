---
title: DragGAN
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, open-source, python]
sources: [raw/articles/ai-game-devtools/draggan.md]
---

# DragGAN

**Drag Your GAN: Interactive Point-based Manipulation on the Generative Image Manifold**

## Overview

DragGAN is an interactive image manipulation tool developed by researchers at MPI Informatik (Max Planck Institute). Published at **SIGGRAPH 2023**, it allows users to place handle points on GAN-generated images and drag them to target positions, with the system performing real-time optimization on the generative manifold to deform images while maintaining photorealism and semantic consistency.

## Key Features

- **Point-based manipulation**: Place handle points, drag to targets, watch real-time deformation
- **Generative manifold optimization**: Operates in StyleGAN latent space for realistic results
- **Real image editing**: Supports editing real images via PTI (Pseudo-Tuned Inversion)
- **Multiple interfaces**: Desktop GUI (ImGui+OpenGL), Gradio web demo, Docker, Colab
- **Multi-model support**: StyleGAN2/3, StyleGAN-Human, LHQ landscapes, custom checkpoints

## Technical Architecture

| Aspect | Details |
|--------|---------|
| **Base Framework** | NVIDIA StyleGAN3 (dnnlib/torch_utils) |
| **Core Algorithm** | Latent space optimization with point tracking |
| **Inversion** | PTI (Pseudo-Tuned Inversion) for real images |
| **Desktop GUI** | ImGui + PyOpenGL + GLFW |
| **Web UI** | Gradio >= 3.35.2 |
| **Backend** | PyTorch >= 2.0.0 |
| **Deployment** | Conda env / Docker (NGC PyTorch, ~25GB) / Colab |
| **Platform** | Linux (CUDA) / Windows (CUDA) / macOS Silicon (MPS/CPU) |

### Project Structure
- `dnnlib/` / `torch_utils/` / `training/` — StyleGAN3 core library
- `visualizer_drag.py` — Desktop GUI (ImGui+OpenGL)
- `visualizer_drag_gradio.py` — Gradio web demo
- `stylegan_human/pti/` — PTI inversion module for real image editing
- `gui_utils/` / `gradio_utils/` / `viz/` — UI and rendering utilities

## Differences from Similar Tools

| Tool | Approach | DragGAN Difference |
|------|----------|-------------------|
| [[ai-game-devtools/controlnet]] | Conditional diffusion with control maps | DragGAN uses point-based direct manipulation on GAN latent space, not diffusion |
| [[ai-game-devtools/conceptlab]] | VLM-guided creative concept generation | DragGAN focuses on precise geometric/spatial manipulation, not creative generation |
| [[ai-game-devtools/disco-diffusion]] | CLIP-guided diffusion animation | DragGAN operates on StyleGAN manifold for interactive editing, not text-to-image generation |

## License

- **DragGAN algorithm code:** CC-BY-NC 4.0 (non-commercial only)
- **StyleGAN3 derived code:** NVIDIA Source Code License (non-commercial)
- Must preserve "AI Generated" watermark functionality in any derivative work

## Links

- **GitHub:** https://github.com/XingangPan/DragGAN
- **Paper:** https://arxiv.org/abs/2305.10973
- **Project Page:** https://vcai.mpi-inf.mpg.de/projects/DragGAN/
- **HuggingFace Demo:** https://huggingface.co/spaces/radames/DragGan
- **Colab:** Available

## References

- [[ai-game-devtools/controlnet]] — Conditional diffusion model control (alternative approach)
- [[ai-game-devtools/conceptlab]] — VLM-guided creative generation (related image tool)
- [[ai-game-devtools/disco-diffusion]] — Diffusion-based image/animation generation (alternative)
