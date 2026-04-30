---
title: Hunyuan3D-2
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, 3d, open-source, image-generation]
sources: [web:https://github.com/tencent/Hunyuan3D-2, web:https://github.com/Tencent/Hunyuan3D-2]
---

# Hunyuan3D-2

**Tencent Hunyuan 3D asset generation from text/image to 3D mesh**

## Overview

Hunyuan3D-2 is Tencent's open-source 3D asset generation system that converts text prompts and/or reference images into high-quality 3D mesh assets. It uses a two-stage pipeline: a shape generation model based on DiT (Diffusion Transformer) architecture followed by a PBR texture synthesis model. The system supports multiple model sizes and offers accelerated inference via FlashVDM, making it practical for game development workflows.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Tencent Hunyuan 3D team |
| **Pipeline** | Two-stage: Shape generation (DiT) + PBR texture synthesis |
| **Model Sizes** | Shape: 0.6B (tiny) / 1.3B (small) / 3.0B (large); Paint: 2B |
| **Input** | Text prompt, single image, or text + image combined |
| **Output** | High-resolution textured 3D mesh (OBJ/GLB format) |
| **VRAM** | 6GB (tiny) to 16GB (large) |
| **Acceleration** | FlashVDM for fast shape generation |
| **Integrations** | ComfyUI, Blender plugin |
| **License** | Apache 2.0 |

## Architecture

- **Shape Model**: DiT-based diffusion model generates 3D geometry (SDF/triangles)
- **Texture Model**: PBR texture synthesis with albedo, roughness, metallic prediction
- **Multi-view Consistency**: Generates consistent multi-view images as intermediate representation
- **Mesh Extraction**: Marching cubes + mesh optimization for clean topology

## Usage in AI Game Development

Hunyuan3D-2 enables:
- **Rapid prototyping**: Generate placeholder 3D assets from text descriptions
- **Asset variation**: Create multiple variations of 3D models for game environments
- **Concept-to-asset**: Convert 2D concept art directly into textured 3D models
- **Game-ready exports**: OBJ/GLB output compatible with Unity, Unreal, Godot

## Related Projects

- [[hunyuan3d-2-1]] — Third-gen Hunyuan 3D with fully open weights + training code
- [[hunyuan3d-1]] — First-gen Hunyuan 3D: text/image to 3D in 10-25 seconds
- [[triposr]] — Tripo AI × Stability AI single-image to 3D feed-forward model
- [[stable-fast-3d]] — Stability AI single-image to 3D mesh with PBR materials
