# VGen (i2vgen-xl) — Source Analysis

**Source URL:** https://github.com/ali-vilab/i2vgen-xl
**Redirect:** This repo redirects to https://github.com/ali-vilab/VGen (actual codebase)
**Developer:** Alibaba Tongyi Lab (阿里巴巴通义实验室)
**Release Date:** 2023-09-06

## Overview

VGen is a holistic video generation ecosystem built on diffusion models. The `i2vgen-xl` GitHub repo is a redirect stub pointing to the main `ali-vilab/VGen` repository. I2VGen-XL was the first model released in this ecosystem, announced on September 6, 2023, and made available on ModelScope (魔搭社区).

## Key Features

### I2VGen-XL (Image-to-Video)
- **Two-stage architecture:**
  1. Low-resolution stage: ensures semantic matching between input image and generated video
  2. Video Latent Diffusion Model (VLDM): upscales to 1280×720 resolution while improving temporal and spatial consistency
- **Output:** 1280×720 HD video from single image + text prompt
- **Inference time:** ~2 minutes
- **Training data:** Multi-style video dataset (sci-fi, cinematic, cartoon, sketch)
- **Limitations:** Inadequate on anime images and black backgrounds (training data gap)
- **Availability:** Gradio local UI (`gradio_app.py`), ModelScope, HuggingFace

### T2V (Text-to-Video)
- Train via `train_net.py --cfg configs/t2v_train.yaml`
- Infer via `inference.py --cfg configs/t2v_infer.yaml`
- Pretrained weights available from ModelScope

### HiGen
- T2V generation + Super-resolution (SR600)
- Download via ModelScope: `snapshot_download('iic/HiGen')`

### DreamVideo (Subject & Motion Customization)
- Based on ModelScopeT2V V1.5 (365K iterations fine-tuned)
- **Two-phase personalization:**
  1. Subject Learning: Textual Inversion + Identity Adapter (1500-3000 steps)
  2. Motion Learning: Motion pattern learning (500-2000 steps)
- **Joint inference:** Combines subject + motion with appearance guidance
- Supports mask diffusion for precise subject control

### TF-T2V (CVPR 2024)
- 16-frame (448×256) and 32-frame modes
- Super-resolution (SR600) — only supports 32-frame input
- Compositional generation up to 896×512 resolution

## Architecture

- **Framework:** Modular registration system for ENGINE, MODEL, DATASETS, EMBEDDER, AUTO_ENCODER, VISUAL, DIFFUSION, PRETRAIN
- **Tech Stack:** Python 3.8, PyTorch 1.12.0 (CUDA 11.3), FFmpeg
- **Config:** YAML-driven (configs/*.yaml)
- **Training:** Distributed training support
- **Acceleration & Super-Resolution:** Built-in modules

## Installation

```bash
git clone https://github.com/ali-vilab/VGen.git && cd VGen
conda create -n vgen python=3.8 && conda activate vgen
pip install torch==1.12.0+cu113 torchvision==0.13.0+cu113 torchaudio==0.12.0
pip install -r requirements.txt
sudo apt-get install ffmpeg libsm6 libxext6
```

## Models & Weights

| Model | Download Source |
|-------|----------------|
| I2VGen-XL | `damo/I2VGen-XL` (ModelScope) / `damo-vilab/i2vgen-xl` (HuggingFace) |
| HiGen | `iic/HiGen` (ModelScope) |
| DreamVideo | `iic/dreamvideo-t2v` (ModelScope) |
| TF-T2V | `iic/tf-t2v` (ModelScope) |

## License

Model and code are open source (specific license not declared in repo; Alibaba open-source convention typically follows Tongyi Lab terms).

## Related Projects from Alibaba

- 通义万相 (Composer) — AI image generation model
- VideoComposer — Controllable video generation
- EMO — Audio-driven portrait animation
- Motionshop — 3D model replacement in videos
- This team has published 60+ CCF-A papers and won 10+ international vision competition awards

## Notable Reception

- Featured by AI analyst Ahsen Khaliq on Twitter for clarity, texture, semantic and temporal continuity
- Generated viral content: dinosaur on castle, astronaut in spaceship sci-fi scenes
- Model and code both open sourced after launch
