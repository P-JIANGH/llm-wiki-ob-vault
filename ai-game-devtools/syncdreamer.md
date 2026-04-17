---
title: SyncDreamer
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [image-generation, diffusion, 3d, open-source, tool]
sources: [raw/articles/ai-game-devtools/syncdreamer.md]
---

# SyncDreamer

**SyncDreamer: Generating Multiview-consistent Images from a Single-view Image**

| Property | Value |
|----------|-------|
| Author | Yuan Liu et al. (HKU, HKUST, UPenn, etc.) |
| Paper | arXiv 2309.03453 (2023-09) |
| License | MIT |
| GitHub | https://github.com/liuyuan-pal/SyncDreamer |
| Demo | https://huggingface.co/spaces/liuyuan-pal/SyncDreamer |

## What It Is

SyncDreamer is a multiview diffusion model that generates 16 consistent images of an object from predefined viewpoints, given only a single input image. The generated multiview images serve as input for 3D reconstruction (NeuS/NeRF), enabling a complete single-image-to-3D pipeline.

## Key Features

- **16-view synchronous generation**: All 16 viewpoints generated simultaneously via depth-wise volume attention, ensuring cross-view consistency
- **Minimal input**: Single RGBA image + rough elevation angle ([-10, 40]°, no precision needed)
- **GPU efficient**: Runs on ≥10G VRAM (reduced batch mode), tested on 40G A100
- **Full pipeline**: Inference → foreground segmentation (carvekit) → multiview generation → NeuS/NeRF reconstruction → mesh export
- **Training code + data released**: Full training set (~1.6T) + zero123-xl finetuning pipeline

## Architecture

Built on the Latent Diffusion Model (LDM) framework inherited from [[ai-game-devtools/stable-diffusion]]. Core innovations:

- **DepthWiseAttention**: Volume-aware cross-view attention mechanism that ensures multiview consistency
- **CLIP ViT-L-14 encoder**: Single-image conditioning
- **Finetuned from zero123-xl**: Leverages pretrained novel view synthesis as initialization
- **16-view synchronization**: Unlike sequential approaches, all views denoised jointly

## Technical Specs

| Parameter | Value |
|-----------|-------|
| Image size | 256×256 |
| View count | 16 predefined viewpoints |
| CFG scale | 2.0 (recommended) |
| Crop size | 200 (default, controls object region scaling) |
| UNet channels | 320, attention at [4, 2, 1] |
| Transformer depth | 1, context dim 768 |
| Training GPUs | 8× (multi-GPU) |
| Framework | PyTorch Lightning 1.9.0 |

## Use Cases in Game Development

- **Single-image 3D asset creation**: Generate 3D models from concept art or photographs
- **Game asset prototyping**: Quick 3D previews from 2D design drafts
- **Texture/multi-angle reference**: Generate consistent views for texture painting
- Can be integrated with [[ai-game-devtools/comfyui]] for workflow automation

## Differences from Related Tools

- vs **zero123**: SyncDreamer generates all 16 views *simultaneously* (not one at a time), ensuring consistency across views
- vs **Magic123/One-2-3-45**: Synchronous diffusion vs. sequential/SDS-based optimization — faster and more consistent
- vs [[ai-game-devtools/threestudio]]: SyncDreamer is a specific multiview generator, while threestudio is a general 3D generation framework supporting multiple backends

## Related Projects

- Inherits code from: [[ai-game-devtools/stable-diffusion]], zero123, threestudio
- Related: Magic123, RealFusion, One-2-3-45
