---
title: CityDreamer
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, image-generation]
sources: [raw/articles/ai-game-devtools/city-dreamer.md]
---

# CityDreamer

**CityDreamer: Compositional Generative Model of Unbounded 3D Cities**

| Property | Value |
|----------|-------|
| Conference | CVPR 2024 |
| Authors | Haozhe Xie, Zhaoxi Chen, Fangzhou Hong, Ziwei Liu |
| Institution | S-Lab, Nanyang Technological University |
| License | NTU S-Lab License 1.0 |
| GitHub | https://github.com/hzxie/city-dreamer |
| Paper | [arXiv:2309.00610](https://arxiv.org/abs/2309.00610) |
| Demo | [HuggingFace](https://huggingface.co/spaces/hzxie/city-dreamer) |

## What It Is

CityDreamer is a compositional generative model that creates unbounded, large-scale 3D city environments. It decomposes city generation into three independently trained components — layout, background, and building instances — enabling patch-based infinite city synthesis on consumer GPUs.

## Architecture

The system uses a **compositional three-component pipeline**:

| Component | Architecture | Role |
|-----------|-------------|------|
| **Unbounded Layout Generator** | VQVAE + Sampler | Infinite city layout via patch-based sampling |
| **Background Stuff Generator** | GAN-based (GANcraft-style) | Terrain, roads, vegetation |
| **Building Instance Generator** | GAN-based (GANcraft-style) | Individual 3D building meshes |

### Key Technical Features
- **Patch-based generation**: Splits city generation into patches to manage GPU memory; adjustable `--patch_height` / `--patch_width`
- **VRAM optimized**: Runs on RTX 3090 (24GB) with patch settings of 5×5
- **Custom CUDA extensions**: Performance-critical operations implemented as compiled CUDA kernels
- **Interactive web demo**: Browser UI at localhost:3186
- **CLI inference**: Produces rendering video output (`output/rendering.mp4`)

## Technical Specs

| Parameter | Value |
|-----------|-------|
| Stack | Python 3.8 / PyTorch 1.13.1 / CUDA 11.7 |
| Datasets | OSM (OpenStreetMap) + GoogleEarth imagery |
| Storage requirement | ~1TB for full GoogleEarth instance segmentation |
| Entry point | `run.py`, `scripts/inference.py` |

## Use Cases in Game Development

- **Procedural city generation**: Generate infinite 3D urban environments from seed layouts
- **Open-world game environments**: Create large-scale city backdrops for exploration games
- **Urban simulation**: Training environments for autonomous driving or robotics
- Can complement [[syncdreamer]] for object-level 3D asset generation within the city

## Differences from Related Tools

- vs [[syncdreamer]]: SyncDreamer generates multiview-consistent images of individual objects; CityDreamer generates entire city-scale 3D environments with compositional pipeline
- vs **GANcraft**: CityDreamer extends GANcraft with a VQVAE-based layout generator enabling unbounded (infinite) city generation via patch-based sampling
- Unlike end-to-end approaches, the three-component design allows independent training and modular replacement of any component
