# PhysRig — Source Analysis

**Source:** https://github.com/haoz19/PhysRig
**Ingested:** 2026-04-18
**Method:** web_extract (GitHub/gitcode/gitee clone all failed — network timeout)

## README Summary

PhysRig: Differentiable Physics-Based Rigging for Realistic Articulated Object Modeling
- Conference: ICCV 2025
- Paper: arXiv:2506.20936
- Project Page: physrig.github.io

Core Concept: PhysRig is a differentiable, physics-based skinning and rigging framework that enables realistic deformation of articulated 3D objects. Unlike traditional methods like Linear Blend Skinning (LBS), PhysRig embeds skeletons into a deformable soft-body volume simulated using Material Point Method (MPM) — capturing the behavior of soft tissues, tails, ears, and other elastic structures in a physically plausible way.

## Technical Architecture

### Pipeline
1. `infill.sh` — Mesh Infilling: Generates volumetric infill point clouds (frame 0) and GT point clouds (all frames)
2. `inference.sh` — Physics Inference: Full pipeline: skeleton generation → infill → MPM simulation → mesh deformation
3. `train.sh` — Material Training: Optimizes material parameters (Young's modulus, Poisson's ratio) via gradient descent

### Codebase Structure
```
PhysRig/
├── inference.sh / train.sh / infill.sh  # Main pipeline entry points
├── blender/                             # FBX-to-OBJ conversion (local execution)
├── exp_motion/
│   ├── train/                           # Core MPM interface, cuboid utils, training/inference entry points
│   └── utils/                           # Deformation, cuboid mesh, skeleton centroid, & infill utilities
├── thirdparty_code/                     # Warp MPM solver
└── motionrep/                           # Motion representation library
```

### Key Dependencies
- Custom Extensions: Gaussian rasterization, simple-knn
- Physics Solver: Warp MPM solver (bundled in thirdparty_code/)
- Blender: Required for FBX-to-OBJ conversion (must run locally)

### Data Structure
```
data/<dataset_name>/
├── mesh/              # OBJ mesh sequence (mesh_frame_0000.obj, ...)
├── skeleton_mesh/     # Skeleton OBJ sequence (skeleton_frame_0000.obj, ...)
├── skeleton/          # (auto) Skeleton centroid PLYs
├── infilled/          # (auto) Infilled point clouds
└── gt/                # (auto) Ground truth point clouds
```

### Inference Parameters
- POSITION_METHOD: mean/median/weighted/bbox/adaptive/pca/optimized (default: adaptive)
- CUBOID_SIZE_MODE: fixed/adaptive/knn/hybrid/ceil_and_floor/raycast (default: fixed)
- SUBSTEP_INF: 100 (simulation substeps per frame)
- YOUNGS_INF: 6e4 (Young's modulus)
- NU_INF: 0.3 (Poisson's ratio)

### Output
- `output/inference/<dataset>/` — Raw inference PLY frames
- `output/animation/<dataset>/` — Deformed mesh OBJ sequence (final output)

## Key Takeaway
PhysRig bridges the gap between skeletal animation and soft-body physics by making MPM differentiable and trainable. It replaces rigid LBS deformations with physically grounded, material-aware simulations, enabling highly realistic secondary motion (jiggle, stretch, compression) for articulated characters and objects.
