# EasyPhoto — AI Portrait Generator (sd-webui-EasyPhoto)

**Source:** https://github.com/aigc-apps/sd-webui-EasyPhoto
**Captured:** 2026-04-17

## Overview
EasyPhoto is a Stable Diffusion WebUI plugin for generating AI portraits that can train digital doppelgangers from user photos. Uses 5-20 portrait images to train a face LoRA, then generates portraits using preset templates or user-uploaded reference images.

## Key Facts
- **Publisher:** Alibaba PAI (aigc-apps) / Alibaba Cloud
- **License:** Apache License 2.0
- **Paper:** arXiv 2310.04672
- **Demo:** Hugging Face Spaces, ModelScope
- **Also available as:** Standalone Diffusers Edition at github.com/aigc-apps/EasyPhoto

## Architecture
- **Plugin for:** AUTOMATIC1111/stable-diffusion-webui
- **Core pipeline:** Two-stage diffusion generation
  - First Diffusion: Face detection → face fusion → inpainting with ControlNet (canny + openpose) → SD + LoRA generation
  - Second Diffusion: Higher resolution re-generation with face fusion
- **Training:** Face LoRA fine-tuning (kohya-style), 5-20 input images, default 800 max steps
- **Dependencies:** ControlNet (requires Multi ControlNet ≥ 3), insightface, ModelScope models

## Main Modules (scripts/)
- `easyphoto_train.py` — Model training pipeline (LoRA fine-tuning with kohya-style trainer)
- `easyphoto_infer.py` — Two-stage inference pipeline
- `easyphoto_tryon_infer.py` — Virtual try-on inference
- `easyphoto_ui.py` — Gradio WebUI interface (train/inference tabs)
- `easyphoto_config.py` — Configuration management
- `preprocess.py` — Image preprocessing (face detection, saliency, skin beautification)
- `api.py` — REST API endpoints
- `easyphoto_utils/` — Face processing, fire processing, try-on utilities, LoRA-CTL utilities
- `easyphoto_utils/animatediff/` — AnimateDiff integration for video generation
- `train_kohya/` — Kohya-style training modules (DDPO, etc.)

## Features
- Digital doppelganger training from 5-20 photos
- Preset template images or custom template upload
- Multi-person generation (configurable num_of_faceid)
- LCM-LoRA sampling acceleration (12 steps vs 50 steps)
- Concepts-Sliders attribute editing
- Virtual Try-On support
- Video inference without additional training
- SDXL support (requires 16GB GPU memory)
- Background fine-tuning + similarity scoring
- Docker deployment support

## Tech Stack
- Python 3.10/3.11
- PyTorch 2.0.1
- diffusers >= 0.18.2
- ControlNet (Mikubill/sd-webui-controlnet)
- ModelScope 1.9.3
- OpenCV, TensorFlow CPU, ONNX/ONNXRuntime
- insightface (face detection/recognition)
- segment-anything, shapely (try-on)

## Environment Requirements
- GPU: NVIDIA 3060 12G+ (min), A10 24G / V100 16G / A100 40G (recommended)
- Disk: ~60GB for weights and datasets
- CUDA: 11.7+, CUDNN: 8+
- OS: Windows 10, Ubuntu 20.04, CentOS

## Deployment
- Aliyun DSW (free GPU tier)
- AutoDL / lanrui-ai mirrors
- Docker: registry.cn-beijing.aliyuncs.com/mybigpai/sd-webui-easyphoto
- Local install as WebUI extension

## Related Projects
- ModelScope FaceChain
- sd-webui-controlnet
- sd-webui-roop
- sd-webui-deforum
