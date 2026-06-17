# MOFA-Video — Source Analysis

**URL:** https://github.com/MyNiuuu/MOFA-Video
**Analyzed:** 2026-04-20

## Project Overview

MOFA-Video: Controllable Image Animation via Generative Motion Field Adaptions in Frozen Image-to-Video Diffusion Model (ECCV 2024)

**Authors:** Muyao Niu (The University of Tokyo / Tencent AI Lab), Xiaodong (corresponding, Tencent AI Lab), Xintao Wang, Yong Zhang, Ying Shan (Tencent AI Lab), Yinqiang Zheng (corresponding, The University of Tokyo)

**Published:** ECCV 2024
**arXiv:** 2405.20222

## TL;DR

Image 🏞️ + Hybrid Controls 🕹️ = Videos 🎬🍿

## Core Method

MOFA-Video adapts motions from different domains to a frozen Video Diffusion Model (SVD). Two key techniques:

1. **Sparse-to-Dense (S2D) motion generation:** Sparse control signals → dense motion fields
2. **Flow-based motion adaptation:** Different MOFA-Adapters combined to jointly control frozen SVD

During training: sparse control signals generated through sparse motion sampling → train different MOFA-Adapters via pre-trained SVD.
During inference: different MOFA-Adapters combined to jointly control the frozen SVD.

## Three Control Modes

### 1. Hybrid Control (Trajectory + Landmark)
- Location: MOFA-Video-Hybrid/
- Gradio demo with two modes:
  - Audio-driven facial animation (run_gradio_audio_driven.py)
  - Video-driven facial animation (run_gradio_video_driven.py)
- Checkpoints: CMP (Conditional Motion Propagation) + MOFA-Adapter ckpts from HuggingFace
- Key dependencies: diffusers 0.24.0, gradio 4.5.0, torch 2.0.1, pytorch3d, facexlib, mediapipe, gfpgan, librosa

### 2. Trajectory-based Control
- Location: MOFA-Video-Traj/
- Gradio demo (run_gradio.py)
- Checkpoints: SVD_xt + MOFA-Adapter + CMP
- ControlNet-based architecture

### 3. Keypoint-based Control
- Location: MOFA-Video-Keypoint/
- Supports **long video generation** via periodic sampling strategy
- Inference script (inference.sh / inference_opendomain.py)

## Training Pipeline
- Location: Training/
- Two-stage training:
  - Stage 1: train_stage1.py + train_stage1.sh
  - Stage 2: train_stage2.py + train_stage2.sh (requires controlnet_model_name_or_path from Stage 1)
- Dataset: WebVid-10M (customizable)
- Base model: SVD_xt (stable-video-diffusion-img2vid-xt-1-1)
- Optical flow: Unimatch (gmflow-scale2-regrefine6)
- Motion propagation: CMP (Conditional Motion Propagation, ResNet50 backbone)

## Technical Stack
- Python 3.10
- PyTorch 2.0.1 + CUDA 11.7
- HuggingFace Diffusers 0.24.0
- Gradio 4.5.0 (strictly required)
- pytorch3d, OpenCV, einops, accelerate, transformers
- Audio processing: librosa, mediapipe
- Face processing: facexlib, gfpgan
- Optical flow: cupy-cuda117

## License
Apache 2.0 (Tencent)

## Key Links
- arXiv: https://arxiv.org/abs/2405.20222
- Project page: https://myniuuu.github.io/MOFA_Video
- HuggingFace (Traj): https://huggingface.co/MyNiuuu/MOFA-Video-Traj
- HuggingFace (Hybrid): https://huggingface.co/MyNiuuu/MOFA-Video-Hybrid

## Acknowledgements
DragNUWA, SadTalker, AniPortrait, Diffusers, SVD_Xtend, Conditional-Motion-Propagation (CMP), Unimatch
