# Video2Game — Raw Source

**Source:** https://github.com/video2game/video2game
**Date:** 2026-04-16
**Extraction method:** web_extract (GitHub/gitcode/gitee clone all failed)

---

# 🎮 Video2Game

Converts a **single video** into a **real-time, interactive, realistic, and browser-compatible 3D environment**.

## Environment Setup

- Python 3.7 required
- PyTorch 1.12.0 + CUDA 11.6
- Tiny-CUDA-NN (with TCNN_HALF_PRECISION patch set to 0)
- PyMesh2, nvdiffrast, torch-scatter

## Dataset Preparation

- COLMAP structure with sparse/, images/, optional normals/, depth/, instance/
- Masks: (H, W) integer .npy arrays, values 0 to N-1
- KITTI-360 support via mmsegmentation

## Core Pipeline (Modular)

1. **Generating Priors:** Omnidata for depth/normal priors
2. **NeRF Training:** scripts/nerf/
3. **Mesh Extraction:** scripts/extract_mesh/ with bbox.json bounds
4. **Baking Pretraining:** baking_pretrain.py + export
5. **Collision Model Generation:** V-HACD convex decomposition, Bounding-mesh for trimesh
6. **Full Pipeline:** Gardenvase example with coordinated scripts

## Game Development Integration

### Three.js (Browser)
- npm install + npm run dev
- Manual config in game_dev/src/ts/world/World.ts line 111
- Requires: rendering_meshes, init_uvmapping(), collision_models, center.json, decomp.glb
- Cannon.js physics needs manual tweaking

### Unreal Engine (Recommended)
- Fully compatible with exported textured meshes
- Use --baking_specular_dim=0 for fully diffuse meshes
- Leverage UE built-in convex decomposition

## Key Repository Structure

| Directory | Purpose |
|---|---|
| datasets/ | Data loaders (colmap.py) |
| game_dev/ | Three.js game engine integration |
| models/ | Neural network architectures & C++ extensions |
| priors/ | Prior generation (depth, normal, semantic) |
| scripts/ | Pipeline runners (nerf, extract_mesh, baking, collisions, eval) |
| train.py / eval_nerf.py | Core training & evaluation |
| extract_mesh.py / baking_pretrain.py | Mesh extraction & texture baking |

## Live Demos

- Project Page: https://video2game.github.io/
- Gardenvase Demo: https://video2game.github.io/src/garden/index.html
