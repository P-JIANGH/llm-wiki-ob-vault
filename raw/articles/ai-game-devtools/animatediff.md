# AnimateDiff — Source Analysis

**Source:** https://github.com/guoyww/animatediff/
**Mirror:** gitcode.com (GitHub clone timeout)
**Date:** 2026-04-19

## README Summary

AnimateDiff is the official implementation of the ICLR 2024 Spotlight paper "Animate Your Personalized Text-to-Image Diffusion Models without Specific Tuning".

Key claim: A plug-and-play module that turns most community Stable Diffusion models into animation generators, without additional training.

**Authors:** Yuwei Guo, Ceyuan (corresponding), Anyi Rao, Zhengyang Liang, Yaohui Wang, Yu Qiao, Maneesh Agrawala, Dahua Lin, Bo Dai (Shanghai AI Lab)

**Papers:**
- AnimateDiff: https://arxiv.org/abs/2307.04725 (ICLR 2024 Spotlight)
- SparseCtrl: https://arxiv.org/abs/2311.16933

**Four versions:**
- v1, v2, v3: for Stable Diffusion V1.5
- sdxl-beta: for Stable Diffusion XL

### v3 (2023.12) — Latest
- Domain Adapter LoRA for image model finetuning (more flexibility at inference)
- SparseCtrl Encoders: RGB image / scribble conditional control
- Domain Adapter LoRA trained on static frames of training video dataset
- Motion Module: 1.56 GB, 453M params
- SparseCtrl Encoder: ~1.85 GB each

### v2 (2023.09)
- Trained on larger resolution & batch size (significant quality improvement)
- MotionLoRA: 8 camera movement controls (ZoomIn, ZoomOut, PanLeft, PanRight, TiltUp, TiltDown, RollingClockwise, RollingAnticlockwise)
- Each MotionLoRA: 74 MB, 19M params
- Motion Module mm_sd_v15_v2.ckpt: 1.7 GB, 453M params

### v1 (2023.07)
- mm_sd_v14.ckpt / mm_sd_v15.ckpt: 1.6 GB, 417M params

### SDXL-Beta (2023.11)
- Motion Module for SDXL: 950 MB
- Supports 1024x1024x16 frames with various aspect ratios
- Requires ~13GB VRAM

## Architecture

### Core Components
1. **UNet3DConditionModel** — extends SD's 2D UNet with temporal attention
2. **VanillaTemporalModule** — motion module with Temporal Self-Attention
   - Uses CrossAttention + FeedForward from diffusers
   - Supports temporal position encoding (max 24 frames)
   - Can use Cross-Frame Attention mode
3. **SparseControlNetModel** — conditional control from sparse inputs (RGB/scribble)
4. **AnimationPipeline** — custom diffusers pipeline extending DiffusionPipeline

### Key Design Pattern
- Motion Module is injected into the UNet's temporal layers
- Zero-initialized motion module parameters (starts from no motion, learns gradually)
- Plug-and-play: can be added to any community SD model without retraining
- Uses xformers for memory-efficient attention

### Tech Stack
- Python 3.10, PyTorch 1.13.1, CUDA 11.7
- diffusers 0.11.1, transformers 4.25.1, xformers 0.0.16
- einops, omegaconf, safetensors
- Gradio for web demo
- Built upon Tune-a-Video codebase

### Community Integrations
- A1111 Extension: sd-webui-animatediff
- ComfyUI Extension: ComfyUI-AnimateDiff-Evolved
- Google Colab support

## License
Academic use only (disclaimer in README). No explicit open-source license file found (LICENSE.txt present but academic use disclaimer takes precedence).

## Key Files
- `animatediff/models/motion_module.py` — VanillaTemporalModule (core motion modeling)
- `animatediff/models/unet.py` — UNet3DConditionModel
- `animatediff/models/sparse_controlnet.py` — SparseControlNetModel
- `animatediff/pipelines/pipeline_animation.py` — AnimationPipeline (465 lines)
- `scripts/animate.py` — inference entry point (195 lines)
- `train.py` — training script (20K+)
- `app.py` — Gradio demo (15K+)
