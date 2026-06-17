# ExAvatar — Expressive Whole-Body 3D Gaussian Avatar

**Source:** https://github.com/mks0601/ExAvatar_RELEASE
**Extracted:** 2026-04-18

## Overview
ExAvatar combines SMPL-X whole-body (body + hands + face) drivability with 3D Gaussian Splatting (3DGS) appearance modeling to create expressive, animatable 3D human avatars from monocular video (phone scans). ECCV 2024.

## Key Architecture
- **Fitting pipeline:** DECA (face) + Hand4Whole (hands) + mmpose (body) + SAM (segmentation) + Depth-Anything-V2 (depth) + COLMAP (camera) → optimized SMPL-X parameters
- **Avatar creation:** Modified 3DGS (supports depth map + mask rendering) driven by SMPL-X + FLAME parameters
- **Animation:** SMPL-X parameters from any video can drive the trained avatar

## Tech Stack
- PyTorch 2.6.0 + CUDA 12.1
- Python 3.10
- diff-gaussian-rasterization (modified for depth+mask)
- SMPL-X 1.1 + FLAME 2020 parametric models
- PyTorch Lightning, Hydra config

## Directory Structure
- `fitting/` — SMPL-X fitting to monocular video (prerequisite for avatar creation)
- `avatar/` — Avatar creation pipeline + animation + visualization
- Supports Custom videos, NeuMan dataset, XHumans dataset

## Pipeline
1. Fit SMPL-X to video → camera params + optimized SMPL-X params
2. Segment foreground (SAM) + estimate depth (Depth-Anything-V2)
3. Train 3D Gaussian avatar from fitted params
4. Animate with new SMPL-X motion sequences

## License
Not specified in repo (research code)

## Authors
Moon, Gyeongsik; Shiratori, Takaaki; Saito, Shunsuke

## Links
- Project Page: https://mks0601.github.io/ExAvatar
- Paper: https://arxiv.org/abs/2407.21686
- Video: https://www.youtube.com/watch?v=GzXlAK-sBKY
- GitHub: https://github.com/mks0601/ExAvatar_RELEASE
