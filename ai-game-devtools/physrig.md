---
title: PhysRig
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [tool, 3d, animation, game-dev, python, blender]
sources: [raw/articles/ai-game-devtools/physrig.md]
---

# PhysRig

**PhysRig** is a differentiable, physics-based skinning and rigging framework for realistic articulated 3D object modeling. Unlike traditional Linear Blend Skinning (LBS), it embeds skeletons into a deformable soft-body volume simulated with the Material Point Method (MPM), capturing soft tissues, tails, ears, and elastic structures in a physically plausible way.

## Overview

- **GitHub**: https://github.com/haoz19/PhysRig
- **Paper**: arXiv:2506.20936 — ICCV 2025
- **Project Page**: https://physrig.github.io
- **Tech Stack**: Python 3.10, PyTorch 2.3, CUDA 11.8, Warp MPM
- **License**: Not specified

## Key Features

| Feature | Description |
|---------|-------------|
| Physics-Based Rigging | MPM simulation instead of LBS for realistic soft-body deformation |
| Differentiable | End-to-end differentiable pipeline enabling gradient-based material optimization |
| Mesh Infilling | Volumetric point cloud generation from mesh sequences via voxel sampling |
| Skeleton-Driven | Cuboid velocity boundary conditions drive the physics simulation |
| Material Training | Optimizes Young's modulus & Poisson's ratio to match target deformations |

## Architecture

The pipeline consists of three stages:

1. **Preprocessing** — FBX animations are converted to OBJ sequences via Blender scripts, or prepared manually
2. **Infilling** — `mesh_infill.py` generates volumetric point clouds inside the mesh using adaptive voxel grids
3. **Simulation** — Warp MPM solver simulates soft-body deformation driven by skeleton velocities; `apply_deformation.py` generates the final deformed mesh sequence

## Key Modules

- `exp_motion/train/interface.py` — MPM differentiable simulation wrapper
- `exp_motion/train/cuboid_utils.py` — Cuboid finding and velocity assignment
- `exp_motion/utils/mesh_infill.py` — Volumetric mesh infilling
- `exp_motion/utils/apply_deformation.py` — PLY to deformed mesh conversion
- `blender/` — FBX-to-OBJ conversion scripts (requires local Blender)

## Differences from Traditional Rigging

| Dimension | Linear Blend Skinning (LBS) | PhysRig |
|-----------|---------------------------|---------|
| Deformation | Linear vertex weights | Physics-based MPM simulation |
| Soft Tissue | Approximated or ignored | Explicitly simulated |
| Differentiability | Non-differentiable | Fully differentiable |
| Material | Fixed | Optimizable via gradient descent |
| Elasticity | Artist-tuned | Physically accurate |

## Related Tools

- [[genesis]] — General-purpose physics engine with MPM solver, also ICCV 2025
- [[hunyuan3d-2]] — Tencent's 3D asset generation pipeline, complementary for asset creation

## Citation

```bibtex
@inproceedings{zhang2025physrig,
    title={{PhysRig}: Physics-Based Rigging for Realistic Articulated Object Modeling},
    author={Zhang, Tianyuan and others},
    booktitle={ICCV},
    year={2025}
}
```
