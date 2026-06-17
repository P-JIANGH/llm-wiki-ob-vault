# CF-3DGS: COLMAP-Free 3D Gaussian Splatting

**Source:** https://github.com/NVlabs/CF-3DGS
**Paper:** https://arxiv.org/abs/2312.07504 (CVPR 2024)
**Project Page:** https://oasisyang.github.io/colmap-free-3dgs/

## Overview

CF-3DGS (COLMAP-Free 3D Gaussian Splatting) by NVIDIA Labs enables 3D scene reconstruction and novel view synthesis directly from raw video/images **without requiring COLMAP for camera pose estimation**. It jointly optimizes camera poses and 3D Gaussian scene representation through a progressive training pipeline.

## Key Features

- **No COLMAP dependency:** Eliminates the traditional Structure-from-Motion (SfM) preprocessing step
- **Joint pose + scene optimization:** Camera poses and 3D Gaussians optimized together
- **Progressive training:** Two-view initialization → sequential frame addition → global refinement
- **Video-to-3D pipeline:** Can run directly on arbitrary videos by converting to frames

## Architecture

### Core Components
- `run_cf3dgs.py` — Main entry point: train / render / eval_nvs / eval_pose modes
- `trainer/cf3dgs_trainer.py` (907 lines) — Progressive training pipeline (CFGaussianTrainer)
- `trainer/trainer.py` — Base GaussianTrainer class
- `scene/gaussian_model_cf.py` — CF3DGS_Render: Gaussian model with camera pose optimization
- `scene/gaussian_model.py` — Standard 3DGS model (from original 3DGS)
- `train.py` — Original 3DGS training script (Inria base)
- `gaussian_renderer/` — Rasterizer built on original 3DGS renderer
- `utils/utils_poses/` — Pose alignment (ATE), trajectory evaluation utilities

### Training Pipeline
1. **Two-view initialization:** Select frame pair, build initial point cloud, optimize Gaussian representation
2. **Sequential frame addition:** `add_view_v2()` — incrementally add frames, estimate relative poses via local optimization
3. **Global refinement:** Joint optimization of all poses + Gaussians with random frame sampling

### Key Techniques
- **Depth regularization:** Uses monocular depth estimates for geometry constraints
- **Progressive densification:** Adaptive Gaussian densify/prune during training
- **Pose chain construction:** `contruct_pose()` builds cumulative pose chain from relative transforms
- **ATE evaluation:** Computes Absolute Trajectory Error for pose accuracy

## Installation & Dependencies

```bash
conda create -n cf3dgs python=3.10
conda install pytorch==2.0.0 torchvision==0.15.0 pytorch-cuda=11.7
pip install -r requirements.txt  # includes diff-gaussian-rasterization, simple-knn, pytorch3d, lietorch
```

Key dependencies: PyTorch 2.0, CUDA 11.7+, PyTorch3D, lietorch, kornia, open3d, timm, diff-gaussian-rasterization (submodule), simple-knn (submodule)

## Supported Datasets

- **Tanks and Temples** — Preprocessed by Nope-NeRF
- **CO3D** — Preprocessed data (Facebook Common Objects in 3D)
- **Custom video** — Convert video to frames + heuristic camera intrinsics

## Evaluation Metrics

- **Novel View Synthesis (NVS):** PSNR, SSIM, LPIPS
- **Pose Estimation:** ATE (Absolute Trajectory Error), RPE (Relative Pose Error)
- Released results on Google Drive for benchmark comparison

## License

- Core code: NVIDIA proprietary (strictly prohibited without express license)
- Training/render base: Inria LICENSE_inria.md (non-commercial research/evaluation use)
- Renderer built upon [3DGS](https://github.com/graphdeco-inria/gaussian-splatting)

## Authors

Yang Fu (UCSD), Sifei Liu (NVIDIA), Amey Kulkarni (NVIDIA), Jan Kautz (NVIDIA), Alexei A. Efros (UC Berkeley), Xiaolong Wang (UCSD)

## Citation

```
@InProceedings{Fu_2024_CVPR,
    author    = {Fu, Yang and Liu, Sifei and Kulkarni, Amey and Kautz, Jan and Efros, Alexei A. and Wang, Xiaolong},
    title     = {COLMAP-Free 3D Gaussian Splatting},
    booktitle = {CVPR},
    year      = {2024}
}
```
