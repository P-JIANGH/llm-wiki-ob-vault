---
title: Wonder3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, image-generation, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/wonder3d.md]
---

# Wonder3D

**Wonder3D: Single Image to 3D using Cross-Domain Diffusion (CVPR 2024 Highlight)**

| Property | Value |
|----------|-------|
| Author | Xiaoxiao Long et al. (HKU) |
| Paper | arXiv 2310.15008 (CVPR 2024 Highlight) |
| License | MIT |
| GitHub | https://github.com/xxlong0/Wonder3D |
| Project Page | https://www.xxlong.site/Wonder3D/ |
| Demo | Hugging Face + Colab |
| Successor | Wonder3D++ (2024.12) |

## What It Is

Wonder3D reconstructs highly-detailed textured meshes from a single-view image in 2–3 minutes. It uses a **cross-domain diffusion model** to generate consistent multi-view normal maps with corresponding color images, then applies a novel normal fusion method for fast 3D reconstruction.

## Key Features

- **Cross-domain diffusion**: Jointly generates normal maps and RGB images in a shared diffusion framework, ensuring cross-view consistency
- **Fast reconstruction**: 2–3 minutes from single image to textured mesh
- **6-view generation**: Azimuth angles at 0°, 45°, 90°, 180°, -90°, -45° (all at 0° elevation in input camera system)
- **Orthographic camera**: Assumes orthographic projection, enabling strong generalization on unreal/CG images
- **Two mesh extraction backends**: Instant-NSR (fast, sharp) and NeuS (slower, smoother, more robust)
- **Gradio demos**: Local interactive inference for both generation and reconstruction

## Architecture

Based on the [[stable-diffusion]] latent diffusion model framework with cross-domain attention extensions:

- **Stage 1**: Train multi-view attentions — randomly sample normal or color flag per training step
- **Stage 2**: Add cross-domain attention modules into the SD model, optimize only newly added parameters
- **Camera system**: Input view-related (not canonical) — Z_v/X_v aligned with UV of input image, Y_v perpendicular to image plane
- **diffusers pipeline**: `flamehaze1115/wonder3d-pipeline` (requires diffusers==0.19.3)

## Technical Specs

| Parameter | Value |
|-----------|-------|
| Input resolution | 256×256 |
| Output views | 6 multi-view normals + colors |
| Reconstruction time | 2–3 minutes |
| Framework | PyTorch + diffusers + Accelerate |
| Foreground mask | SAM / rembg / Clipdrop |

## Use Cases in Game Development

- **Rapid 3D asset generation**: Convert concept art to 3D models in minutes
- **Prototyping**: Quick 3D previews from 2D character/environment designs
- **Normal map pipeline**: Generate multi-view-consistent normals for PBR workflows

## Differences from Related Tools

- vs [[syncdreamer]]: SyncDreamer generates 16 views simultaneously via Volume Feature Field; Wonder3D generates 6 views using cross-domain (RGB+normal) diffusion with orthographic assumption. Wonder3D is faster (2-3 min) but lower resolution (256×256).
- vs **zero123**: Wonder3D uses cross-domain joint generation (normal + RGB), not just novel view synthesis. Camera system is input-view related rather than object-world.
- vs [[hunyuan3d-2-0]]: Hunyuan3D 2.0 uses a two-stage generative model (shape → texture) with higher output quality; Wonder3D uses a single-stage diffusion with explicit normal fusion, trading quality for speed.

## Related Projects

- Successor: **Wonder3D++** (advanced version, 2024.12)
- Related works by same team: [[syncdreamer]] (multiview diffusion), GeoWizard, Era3D, CraftsMan3D
- Built on code from: [[stable-diffusion]], zero123, NeuS, instant-nsr-pl
