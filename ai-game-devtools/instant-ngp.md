---
title: NVIDIA Instant Neural Graphics Primitives
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source]
sources: [raw/articles/ai-game-devtools/instant-ngp.md]
---

# NVIDIA Instant Neural Graphics Primitives (instant-ngp)

## Overview

NVIDIA's **Instant Neural Graphics Primitives** is a high-performance framework for training and rendering four types of neural graphics primitives: **Neural Radiance Fields (NeRF)**, **Signed Distance Functions (SDFs)**, **neural images**, and **neural volumes**. The key innovation is a **multiresolution hash input encoding** that enables NeRF training in seconds rather than hours.

Published at **SIGGRAPH 2022** (ACM Transactions on Graphics) by Thomas Müller, Alex Evans, Christoph Schied, and Alexander Keller at NVIDIA Research.

## Architecture

| Component | Technology |
|-----------|-----------|
| Core encoding | Multiresolution hash encoding |
| Neural network | MLP via tiny-cuda-nn |
| GPU backend | CUDA (all NVIDIA GPU generations) |
| GUI | Dear ImGui + GLFW + GLEW |
| Python bindings | pybind11 (`pyngp` module) |
| Languages | C++14 + CUDA + Python |

## Four Neural Graphics Primitives

1. **NeRF** — Novel view synthesis from photos; trains in <5 seconds on RTX 3090
2. **SDF** — Signed distance function training from OBJ meshes; mesh conversion via marching cubes
3. **Neural Images** — High-resolution image representation (supports gigapixel images via `.bin` format)
4. **Neural Volumes** — Volumetric rendering for NanoVDB data (e.g., Disney cloud datasets)

## Key Features

- **Interactive GUI**: Comprehensive controls, camera path editor, snapshot save/load
- **VR mode**: OpenXR-compatible (OculusVR, SteamVR), one GPU per eye
- **DLSS support**: Vulkan-based upscaling for improved rendering quality
- **Mesh export**: NeRF→Mesh and SDF→Mesh conversion built-in
- **Python bindings**: Full automated experiment support via `scripts/run.py`
- **Pre-built binaries**: Available for Pascal through Blackwell GPU architectures
- **Headless mode**: `--no-gui` flag or Python API for server use

## Build & Dependencies

- **Build system**: CMake 3.18+ with C++14/CUDA
- **Core dependency**: tiny-cuda-nn (NVIDIA's fast CUDA neural network library)
- **Optional**: OptiX 7.6+ (hardware ray tracing for faster SDF training), Vulkan SDK (DLSS)
- **Sample data**: Includes fox NeRF dataset, armadillo SDF, Einstein image

## License

**NVIDIA Source Code License-NC** — non-commercial use only. Requires separate licensing for business use via NVIDIA research licensing form.

## Related Projects

- [[hunyuan3d-1]] — Tencent's 3D generation framework (alternative approach via multi-view diffusion)
- [[cf-3dgs]] — NVIDIA Labs' camera-free 3D Gaussian Splatting (follow-on NeRF technology)
- [[gaussiandreamer]] — Text-to-3D Gaussian generation (builds on NeRF/SDF concepts)

## Sources

- SIGGRAPH 2022 paper: "Instant Neural Graphics Primitives with a Multiresolution Hash Encoding"
- [Project page](https://nvlabs.github.io/instant-ngp)
- [Paper PDF](https://nvlabs.github.io/instant-ngp/assets/mueller2022instant.pdf)
- GitHub: [NVlabs/instant-ngp](https://github.com/NVlabs/instant-ngp)
