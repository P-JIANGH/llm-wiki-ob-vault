# Stable Video Diffusion (generative-models)

**Source:** https://github.com/Stability-AI/generative-models
**Captured:** 2026-04-20

## Overview
Stability AI's generative models repository — the official codebase for Stable Video Diffusion (SVD), SV3D, SV4D, SV4D 2.0, SDXL, and SDXL-Turbo. Package name: `sgm` (Stability Generative Models).

## Key Models Released

### Stable Video Diffusion (SVD) — Nov 2023
- **SVD**: Image-to-video model, 14 frames at 576x1024, uses SD 2.1 image encoder + temporally-aware deflickering decoder
- **SVD-XT**: Same architecture, finetuned for 25 frame generation

### SV3D — Mar 2024
- Image-to-video for novel multi-view synthesis, 21 frames at 576x576
- **SV3D_u**: Orbital video from single image, no camera conditioning
- **SV3D_p**: Supports single images + orbital views with specified camera paths

### SV4D — Jul 2024
- Video-to-4D diffusion model for novel-view video synthesis
- 40 frames (5 video frames x 8 camera views) at 576x576
- Uses SV3D to generate reference multi-views from first frame

### SV4D 2.0 — May 2025
- Enhanced video-to-4D model, 48 frames (12 x 4 views) at 576x576
- Higher fidelity, sharper motion details, better spatio-temporal consistency
- No longer requires reference multi-views from SV3D (more robust to self-occlusions)
- Autoregressive sampling for longer videos

### SDXL — Jul 2023
- SDXL-base-1.0 + SDXL-refiner-1.0, 1024x1024 resolution
- OpenCLIP-ViT/G + CLIP-ViT/L text encoding
- CreativeML Open RAIL++-M license for weights

### SDXL-Turbo — Nov 2023
- Lightning fast text-to-image via adversarial diffusion distillation

## Architecture (sgm package)

### Core Components
- **DiffusionEngine**: Main model class (formerly LatentDiffusion), cleaned up with no extensive subclassing
- **GeneralConditioner**: Handles all conditioning types (vectors, sequences, spatial, combinations) in one class
- **Denoisers**: Continuous-time and discrete-time denoiser framework
- **Guiders**: Classifier-free guidance and other guidance strategies (separate from samplers)
- **Samplers**: Model-independent numerical solvers

### Key Modules (sgm/modules/)
- `attention.py`, `spacetime_attention.py`, `video_attention.py` — attention mechanisms
- `diffusionmodules/` — denoiser, discretizer, guiders, loss, sampling, video_model
- `encoders/modules.py` — GeneralConditioner and embedders
- `autoencoding/` — autoencoder models
- `distributions/` — probability distributions
- `ema.py` — exponential moving average

### Models (sgm/models/)
- `diffusion.py` — DiffusionEngine (PyTorch Lightning-based)
- `autoencoder.py` — Autoencoding models

### Config-Driven Design
- YAML configs define model/training/data setups
- `instantiate_from_config()` builds and combines submodules
- `configs/inference/` — inference configs for SVD/SV3D/SV4D
- `configs/example_training/` — training examples (MNIST, ImageNet, text2img)

## Installation
- Python 3.10 recommended
- PyTorch 2.0+ with CUDA 11.8
- pip install . (sgm package)
- Stability-AI/datapipelines (sdata) for training

## License
- Code: MIT License
- Model weights: Varies (CreativeML Open RAIL++-M for SDXL, research licenses for some models)

## Technical Report
- SVD: https://stability.ai/research/stable-video-diffusion-scaling-latent-video-diffusion-models-to-large-datasets
- SDXL: https://arxiv.org/abs/2307.01952
- SV4D 2.0: https://arxiv.org/pdf/2503.16396
