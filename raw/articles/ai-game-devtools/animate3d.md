# Animate3D: Animating Any 3D Model with Multi-view Video Diffusion

**Source:** https://github.com/yanqinJiang/Animate3D
**Extracted:** 2026-04-18 (web extract; GitHub/gitcode/gitee clone all failed)
**Paper:** NeurIPS 2024, arXiv:2407.11398

---

## Authors & Affiliations
- Yanqin Jiang, Chaohui Yu, Chenjie Cao, Fan Wang, Weiming Hu, Jin Gao
- CASIA, DAMO Academy (Alibaba Group)

## Core Methodology
Animate3D addresses limitations in current 4D generation (reliance on text/single-view distillation, spatiotemporal inconsistency, poor compatibility with off-the-shelf 3D assets) via a **two-fold framework**:

### 1. Multi-View Video Diffusion Model (MV-VDM)
- Conditioned on multi-view renderings of static 3D objects to preserve identity
- Trained on novel large-scale dataset: **MV-Video** (released on Hugging Face)
- Introduces **spatiotemporal attention module** integrating 3D and video diffusion priors for enhanced spatial/temporal consistency

### 2. Two-Stage Animation Pipeline
- **Stage 1:** Reconstruct motion directly from generated multi-view videos
- **Stage 2:** Apply **4D Score Distillation Sampling (4D-SDS)** to refine both appearance and motion
- Enables straightforward, high-fidelity **mesh animation** (~15 mins total)

## Key Milestones
| Date | Event |
|------|-------|
| 2024.10.24 | Training data (MV-Video) released on Hugging Face |
| 2024.10.10 | Code & pretrained models released |
| 2024.09.26 | Accepted at NeurIPS 2024 |
| 2024.09.10 | Mesh Animation feature added, FBX examples for Blender |
| 2024.07.17 | Paper published on arXiv |

## Installation & Setup
- Dependencies via `requirements.txt`
- Full setup: `docs/install.md`
- Pretrained weights: `animate3d_motion_modules.ckpt` → `pretrained_models/`
- MVDream weights: auto-downloads from `yanqinJiang/mvdream-sd1.5-diffusers`

## Key Directories & Modules
- `threestudio/` / `extern/` / `custom/threestudio-animate3d/`
- `data/animate3d/` / `data/vdm/`
- `pretrained_models/`
- `configs/inference/inference.yaml`
- `tools/mesh_animation/process_rodin_gen1.py` (Rodin Gen1 mesh preprocessing)

## Usage
### Mesh Animation
- Input: `.obj` format
- Rodin Gen1 models missing `base.mtl`? → Run `python tools/mesh_animation/process_rodin_gen1.py`
- Pipeline: inference.sh / inference.py

### Gaussian Splatting
- Pre-trained static gaussians & RGBA animation videos in `data/animate3d/testset`

## Tunable Parameters
- `freeinit_num_iters` — FreeInit refinement iterations
- `system.loss.lambda_arap` — ARAP loss weight for mesh deformation
- `seed` — Reproducibility

## Acknowledgements
- Codebase: AnimateDiff, threestudio
- Inspiration: Consistent4D, STAG4D, Track-Anything

## Links
- Project Page: https://animate3d.github.io/
- Paper: https://arxiv.org/abs/2407.11398
- Demo: https://www.youtube.com/watch?v=qkaeeGzLnY8
- Training Data: https://huggingface.co/datasets/yanqinJiang/MV-Video
