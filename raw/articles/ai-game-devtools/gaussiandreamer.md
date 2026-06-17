# GaussianDreamer — Raw Source Analysis

**Source:** https://github.com/hustvl/GaussianDreamer
**Date:** 2026-04-18
**Category:** 3D Model

## README Summary

GaussianDreamer: Fast Generation from Text to 3D Gaussians by Bridging 2D and 3D Diffusion Models (CVPR 2024)

Authors: Taoran Yi (HUST), Jiemin Fang (Huawei), Junjie Wang (Huawei), Guanjun Wu (HUST), Lingxi Xie (Huawei), Xiaopeng Zhang (Huawei), Wenyu Liu (HUST), Qi Tian (Huawei), Xinggang Wang (HUST)

Institution: HUST (Huazhong University of Science and Technology) + Huawei Inc.

Published: CVPR 2024 (accepted 2/27/2024)

arXiv: https://arxiv.org/abs/2310.08529
Project Page: https://taoranyi.com/gaussiandreamer/
Pro Version: https://taoranyi.com/gaussiandreamerpro/ (released 6/26/2024)

### Problem Statement

3D diffusion models have good 3D consistency but limited quality/generalization. 2D diffusion models have strong generalization but lack 3D consistency. GaussianDreamer bridges both using 3D Gaussian Splatting as the explicit representation.

### Core Approach

1. **3D diffusion model (Shap-E)** → provides 3D-consistent initialization (point cloud → Gaussians)
2. **2D diffusion model (Stable Diffusion)** → enriches geometry and appearance via SDS guidance
3. **Noisy point growing** → expands Gaussian count for finer detail
4. **Color perturbation** → adds appearance diversity

Generation time: ~15 minutes on one GPU. Real-time rendering after generation.

### Key Features

- Text-to-3D: "a fox" → 3D fox model in 15 min
- Text-to-Avatar: "Spiderman stands with open arms" → avatar with SMPL initialization
- Unity export: sh_degree=3 for import via UnityGaussianSplatting
- HuggingFace Gradio demo + Colab notebook
- threestudio extension available (community-contributed)

### Architecture

Built on threestudio framework:
- `launch.py` — main entry point, PyTorch Lightning trainer
- `configs/gaussiandreamer-sd.yaml` — training configuration
- `threestudio/` — threestudio framework (embedded copy)
- `gaussiansplatting/` — 3DGS submodules (diff-gaussian-rasterization, simple-knn)
- System type: `gaussiandreamer-system`
- Prompt processor: `stable-diffusion-prompt-processor` (SD 2.1 base)
- Guidance: SDS with stabilityai/stable-diffusion-2-1-base, guidance_scale=100
- Light sampling: dreamfusion3dgs strategy
- Data module: random-camera-datamodule

### Dependencies

- PyTorch 2.0.1 + CUDA 11.7
- lightning 2.0.0
- diffusers + transformers 4.28.1
- OpenAI Shap-E (finetuned with 330k Cap3D data)
- nvdiffrast, nerfacc, tiny-cuda-nn
- wandb, gradio, tensorboard
- trimesh, xatlas, PyMCubes, libigl

### Evaluation Results

**ViT Similarity (ViT-bigG-14):**
- Shap-E: 32.21 | DreamFusion: 37.46 | ProlificDreamer: 42.98 | Instant3D: 41.77 | Ours: 41.88
- Generation time: 15 min (vs Shap-E 6s, DreamFusion 1.5h, ProlificDreamer 10h, Instant3D 20s)

**T³Bench Average Score:**
- ProlificDreamer: 43.3 | Ours: 45.7 (best)
- Single Obj: 54.0 (best) | Single w/ Surr: 48.6 (best) | Multi Obj: 34.5

### Updates Timeline
- 10/16/2023: Initial code release
- 10/24/2023: SMPL initialization support (avatar generation)
- 11/27/2023: Colab + HuggingFace demos
- 2/27/2024: Accepted by CVPR 2024
- 5/14/2024: T³Bench results updated
- 6/26/2024: GaussianDreamerPro released (enhanced quality)
- 1/13/2025: GaussianDreamerPro code released

### Code Structure
```
GaussianDreamer/
├── launch.py                 # Main entry (PyTorch Lightning)
├── configs/
│   └── gaussiandreamer-sd.yaml  # SD-based config
├── gaussiansplatting/
│   └── submodules/           # diff-gaussian-rasterization, simple-knn
├── threestudio/              # Embedded threestudio framework
├── scripts/                  # Utility scripts
├── load/                     # Model weights (finetuned Shap-E)
├── requirements.txt          # Dependencies
└── LICENSE                   # Apache-2.0 (borrowed 3DGS has separate license)
```

### License

Apache-2.0 for GaussianDreamer code. 3D Gaussian Splatting has its own research license.
