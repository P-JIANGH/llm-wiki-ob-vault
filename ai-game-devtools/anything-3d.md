---
title: Anything-3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [open-source, 3d, ai, tool, multimodal]
sources: [raw/articles/ai-game-devtools/anything-3d.md]
---

# Anything-3D

**GitHub:** https://github.com/Anything-of-anything/Anything-3D
**arXiv:** https://arxiv.org/abs/2304.10261
**Authors:** Qiuhong Shen, Xingyi Yang, Xinchao Wang (2023)

## Overview

Anything-3D is a framework that combines [Segment Anything Model (SAM)](https://github.com/facebookresearch/segment-anything) with various 3D reconstruction and generation models to enable single-view 3D object reconstruction from in-the-wild images. The core idea: use SAM's zero-shot segmentation to isolate objects from complex backgrounds, then feed the masked regions into downstream 3D models.

## Key Demos / Modules

| Module | SAM + Model | Purpose |
|--------|------------|---------|
| Anything-3D-Objects | SAM + 3DFuse | Segment & reconstruct 3D objects from images |
| Anything-3DNovel-View | SAM + Zero-1-to-3 | Generate novel views from single image |
| Anything-NeRF | SAM + NeRF | Improve NeRF reconstruction by removing backgrounds |
| Any-3DFace | SAM + HRN | Detailed face reconstruction from wild images |

## Technical Architecture

**Pipeline:**
1. **Segmentation:** SAM (ViT-H) takes a user point prompt, generates object mask
2. **Crop & Transform:** Affine warp to 512×512 object-centric image
3. **Captioning:** BLIP (large_coco) auto-generates text descriptions
4. **3D Generation:** 3DFuse pipeline — diffusion image sampling + VoxNeRF + point cloud projection → 3D mesh

**Tech Stack:** PyTorch 1.11, Diffusers, PyTorch3D, Open3D, Gradio, SalesForce LAVIS, CLIP

## Key Files

- `AnyObject3D/src/main.py` — Main pipeline: SAM → BLIP → 3DFuse
- `AnyObject3D/src/mono_rec.py` — Monocular 3D reconstruction utilities
- `AnyObject3D/src/3DFuse/` — 3DFuse integration (VoxNeRF, diffusion sampling)
- `AnyObject3D/src/3DFuse/voxnerf/` — Voxel-based NeRF implementation

## Significance for Game Development

- **Asset pipeline automation:** Convert single photos into 3D game assets automatically
- **Background removal:** Improves 3D reconstruction quality for object-centric workflows
- **Interactive segmentation:** Click-to-select objects in reference images for rapid prototyping
- Related to [[animate3d]] (3D animation generation) and [[crm]] (3D generative models) in the broader AI 3D tool ecosystem

## Related Projects

- [[segment-anything-2]] — SAM's successor for improved segmentation
- [[grounded-segment-anything]] — Grounded-DINO + SAM for open-vocabulary detection
- [[crm]] — Comprehensive 3D reconstruction framework
- [[animate3d]] — 3D animation generation
