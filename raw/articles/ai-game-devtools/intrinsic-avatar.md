# IntrinsicAvatar

**Source:** https://github.com/taconite/IntrinsicAvatar
**Paper:** https://arxiv.org/abs/2312.05210
**Project Page:** https://neuralbodies.github.io/IntrinsicAvatar/
**Conference:** CVPR 2024

---

## Title

IntrinsicAvatar: Physically Based Inverse Rendering of Dynamic Humans from Monocular Videos via Explicit Ray Tracing

## Overview

IntrinsicAvatar performs physically based inverse rendering of dynamic human subjects from monocular video inputs using explicit ray tracing. The system decomposes appearance into intrinsic components (albedo, roughness, metallic, normal) and enables novel-view synthesis and relighting of dynamic humans.

## Key Technical Details

### Architecture
- Based on instant-nsr-pl framework
- Uses tiny-cuda-nn for neural network acceleration
- Hydra configuration management
- Weights & Biands logging

### Core Components
- **LBS Deformer:** Linear blend skinning based human deformation, adapted from Fast-SNARF & InstantAvatar
- **Importance Sampling:** NeRFAcc-inspired ray sampling
- **SMPL Rendering:** NeuralBody-inspired mesh visualization
- **SMPL Body Model:** Requires SMPL v1.0 model files (male/female/neutral .pkl)

### Datasets
- **PeopleSnapshot:** Single-camera human capture dataset
- **ZJU-MoCap:** Multi-camera human motion capture dataset (supports 1-4 cameras)

### Training Workflow
- Framework: Hydra config management
- Pose correction via `pose_correction.enable_pose_correction=true`
- Balanced sampling for training stability
- Checkpoints saved to `exp/intrinsic-avatar-{tag}/{dataset}@{timestamp}`

### Testing & Relighting
- Environment lighting via HDRI files (.hdr format)
- Light importance sampling with configurable SPP
- Supports in-distribution and out-of-distribution poses
- Quantitative vs qualitative rendering modes

### Dependencies
- instant-nsr-pl (base architecture)
- NeRFAcc (importance sampling)
- NeuralBody (SMPL rendering)
- Fast-SNARF & InstantAvatar (LBS deformer)

## Repository Structure
```
configs/          - Training configurations
systems/          - System definitions
models/           - Model architectures
lib/nerfacc       - Importance sampling implementation
models/deformers/fast-snarf - LBS deformation module
datasets/         - Data loaders
hdri_images/      - Environment lighting assets
launch.py         - Entry point
DATASET.md        - Dataset preparation guide
```

## Known Issues
- Hydra parsing error when checkpoint path contains `=` character — workaround: double-quote the path
