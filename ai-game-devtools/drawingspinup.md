---
title: DrawingSpinUp
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [3d, animation, image-generation, tool, python, blender]
sources: [raw/articles/ai-game-devtools/drawingspinup.md]
---

# DrawingSpinUp

**DrawingSpinUp: 3D Animation from Single Character Drawings (SIGGRAPH Asia 2024)**

| Property | Value |
|----------|-------|
| Authors | Jie Zhou, Chufeng Xiao, Miu-Ling Lam, Hongbo Fu (CityU HK) |
| Paper | arXiv:2409.08615 |
| Conference | SIGGRAPH Asia 2024 |
| License | Not explicitly stated |
| GitHub | https://github.com/LordLiang/DrawingSpinUp |
| Project Page | https://lordliang.github.io/DrawingSpinUp/ |

## What It Is

DrawingSpinUp converts a single 2D character drawing into a stylized 3D animated character. Unlike existing methods that produce flat 2D motions, it reconstructs a full 3D textured mesh and renders animation frames while preserving the original hand-drawn artistic style.

## Three-Stage Pipeline

**Stage 1: Contour Removal**
- Uses FFC-ResNet (LaMa backbone) to detect and remove black contour lines from the input drawing
- Produces a contour-free texture suitable for 3D reconstruction

**Stage 2: Textured Character Generation**
- Generates multi-view images from the contour-free texture using diffusers-based diffusion model
- Reconstructs textured 3D mesh via instant-NSR neural surface reconstruction
- Uses ISNet for background removal of generated views
- Output: textured `.obj` mesh

**Stage 3: Stylized Contour Restoration**
- Renders animated keyframes in Blender (EEVEE or CYCLES engine)
- Two-stage neural training restores stylized contours on rendered frames
- Technique borrowed from Few-Shot Patch-Based Training
- Once trained per character, applies to any new animation without retraining

## Technical Specs

| Parameter | Value |
|-----------|-------|
| Input | 512×512 character drawing + foreground mask |
| Output | Animated GIF with stylized 3D motion |
| GPU | RTX 4090 (RTX 2080 Ti also works) |
| Framework | PyTorch 2.0.0 + diffusers 0.19.3 + CUDA 11.8 |
| Rendering | Blender 3.6.14 (EEVEE or CYCLES) |
| Rigging | Mixamo auto-rigging + retargeting |

## Use Cases in Game Development

- **Indie game asset creation**: Turn hand-drawn character concepts into animated 3D assets
- **2D-to-3D pipeline**: Bridge traditional 2D art styles with 3D game engines
- **Rapid prototyping**: Generate animated character previews from sketches without manual 3D modeling
- **Style-preserving animation**: Maintain hand-drawn aesthetics while gaining 3D depth and motion

## Differences from Related Tools

- vs [[wonder3d]]: Wonder3D focuses on static 3D reconstruction from single images; DrawingSpinUp extends this with animation and stylized contour restoration specifically for character drawings. DrawingSpinUp borrows rendering codes from Wonder3D.
- vs [[animate3d]]: Animate3D generates 3D motion from single images; DrawingSpinUp starts from 2D drawings and specifically preserves hand-drawn artistic contours during animation.
- vs [[animatediff]]: AnimateDiff animates existing images/drawings in 2D; DrawingSpinUp reconstructs full 3D geometry and renders from novel viewpoints.

## Related Projects

- Further work: [From-Rigging-to-Waving](https://lordliang.github.io/From-Rigging-to-Waving/) by same authors
- Built on: LaMa (contour removal), [[wonder3d]] (rendering codes), Few-Shot-Patch-Based-Training (style transfer)
- Dataset: Amateur Drawings Dataset (Facebook Research / Meta AI)
