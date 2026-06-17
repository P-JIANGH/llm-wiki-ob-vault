---
title: DreamSpace
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, image-generation, open-source, 3d, texture]
sources: [raw/articles/ai-game-devtools/dreamspace.md]
---

# DreamSpace

## Overview
DreamSpace is an indoor scene texturing framework presented at IEEE VR 2024 that allows users to personalize the appearance of real-world scene reconstructions using text prompts, delivering immersive VR experiences on HMD devices. The key insight is generating a stylized 360° panoramic texture from the central viewpoint, then propagating it to the rest of the scene with inpainting and imitating techniques.

## Key Facts
- **Publication**: IEEE VR 2024 (arXiv:2310.13119, 2023)
- **Authors**: Bangbang Yang, Wenqi Dong, Lin Ma, Wenbo Hu, Xiao Liu, Zhaopeng Cui, Yuewen Ma
- **GitHub**: [ybbbbt/dreamspace](https://github.com/ybbbbt/dreamspace) — project landing page only (no source code released)
- **Project Page**: [ybbbbt.com/publication/dreamspace](https://ybbbbt.com/publication/dreamspace/)
- **Datasets**: DreamSpot (custom indoor capture) + Replica Dataset (office0/room0/room1)

## Technical Architecture
- **Coarse-to-fine panoramic texture generation** with dual texture alignment (geometry + texture cues)
- **Separated propagation strategy**: texture inpainting in confident regions, then implicit imitating network for occluded/tiny structural areas
- **Text-driven style transfer**: supports cyberpunk, anime landscape, nebula, Harry Potter and other styles
- **VR-ready output**: generates textured meshes deployable on HMD devices

## Use Cases in Game Dev
- Indoor scene stylization for game environments
- Rapid prototyping of room-level textures from text descriptions
- VR/AR environment personalization

## License
Not specified (project page repo, no LICENSE file)

## Related
- [[dreammat]] — PBR material generation via diffusion + SDS optimization (SIGGRAPH 2024)
- [[crm]] — Single image to 3D textured mesh via two-stage diffusion (清华大学)
- [[dream-textures]] — Blender Stable Diffusion texture painting integration
