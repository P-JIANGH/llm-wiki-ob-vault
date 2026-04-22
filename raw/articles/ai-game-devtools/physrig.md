# PhysRig

**Source:** https://github.com/haoz19/PhysRig  
**Paper:** arXiv:2506.20936 (ICCV 2025)  
**Project Page:** https://physrig.github.io

## Overview

PhysRig is a differentiable, physics-based skinning and rigging framework for realistic deformation of articulated 3D objects. Unlike traditional Linear Blend Skinning (LBS), PhysRig embeds skeletons into a deformable soft-body volume simulated using the Material Point Method (MPM), capturing soft tissues, tails, ears, and other elastic structures in a physically plausible way.

## Key Features

- **Physics-Based Rigging**: Uses MPM simulation instead of traditional LBS for realistic soft-body deformation
- **Differentiable Pipeline**: End-to-end differentiable, enabling gradient-based optimization of material parameters
- **Mesh Infilling**: Volumetric point cloud generation from mesh sequences using voxel-based sampling
- **Skeleton-Driven Animation**: Cuboid-based velocity boundary conditions drive the physics simulation
- **Material Parameter Training**: Optimizes Young's modulus and Poisson's ratio to match target deformations

## Tech Stack

- Python 3.10+
- PyTorch 2.3.0 + CUDA 11.8
- Warp-lang 0.10.1 (MPM solver)
- Trimesh, Open3D, PLYfile (3D geometry)
- Blender (FBX-to-OBJ conversion, local only)
- ChamferDistance, point-cloud-utils

## Project Structure

```
PhysRig/
├── inference.sh              # Main inference pipeline
├── train.sh                  # Material training pipeline
├── infill.sh                 # Mesh infill generation
├── blender/                  # FBX conversion scripts
├── exp_motion/
│   ├── train/
│   │   ├── interface.py      # MPM simulation interface
│   │   ├── cuboid_utils.py   # Cuboid finding & velocity
│   │   └── config.yml        # Configuration
│   └── utils/
│       ├── mesh_infill.py    # Volumetric infilling
│       └── apply_deformation.py  # PLY -> deformed mesh
└── thirdparty_code/          # Warp MPM solver
```

## Pipeline

1. **Data Preparation**: FBX animations converted to OBJ sequences via Blender, or manual OBJ preparation
2. **Mesh Infilling**: Generates volumetric point clouds inside the mesh using voxel grid sampling
3. **Skeleton Generation**: Converts skeleton_mesh OBJs into centroid PLY files
4. **Physics Inference**: MPM simulation driven by skeleton velocities, applies deformations to mesh
5. **Material Training**: Gradient descent optimization of Young's modulus and Poisson's ratio

## Citation

```bibtex
@inproceedings{zhang2025physrig,
    title={{PhysRig}: Physics-Based Rigging for Realistic Articulated Object Modeling},
    author={Zhang, Tianyuan and others},
    booktitle={ICCV},
    year={2025}
}
```
