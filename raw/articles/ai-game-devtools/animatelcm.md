# AnimateLCM — Computation-Efficient Personalized Style Video Generation

> Source: https://github.com/G-U-N/AnimateLCM (cloned via gitcode.com mirror)
> Date: 2026-04-19
> Authors: Fu-Yun Wang, Zhaoyang Huang, Xiaoyu Shi, Weikang Bian, Guanglu Song, Yu Liu, Hongsheng Li

## Paper
- arXiv: https://arxiv.org/abs/2402.00769
- Title: "AnimateLCM: Accelerating the Animation of Personalized Diffusion Models and Adapters with Decoupled Consistency Learning"

## Project Page
- https://animatelcm.github.io/
- HuggingFace Demo: https://huggingface.co/spaces/wangfuyun/AnimateLCM-SVD
- Pre-trained Models: https://huggingface.co/wangfuyun/AnimateLCM
- Civitai: https://civitai.com/models/290375/animatelcm-fast-video-generation

## Overview

AnimateLCM is a **pioneer work in fast animation generation** following consistency models, capable of generating animations in good quality with just **4 inference steps**.

The key innovation is a **decoupled learning paradigm**:
1. First learning image generation prior
2. Then learning temporal generation prior for fast sampling
3. This greatly boosts training efficiency

## Three Released Models

### 1. AnimateLCM-T2V (Text-to-Video)
- Spatial LoRA weight + motion module for personalized video generation
- Compatible with many personalized models tuned for LCM (e.g., Dreamshaper-LCM)
- Usage tips: 4 steps work well; 6-8 steps for better quality
- CFG scale: 1-2 (CFG=1 halves sampling cost; CFG=1.5 with negative prompts for better quality)
- Video length: 16 frames (trained length)
- Works with IP-Adapter, ControlNet, and SD adapters in zero-shot manner

### 2. AnimateLCM-SVD (Image-to-Video, based on Stable Video Diffusion)
- Two variants: AnimateLCM-SVD-xt (tuned from SVD-xt) and AnimateLCM-SVD-xt 1.1 (tuned from SVD-xt 1.1)
- High-resolution image animation with 25 frames, 1-8 steps
- Requires two CFG values: CFG_min (default 1) and CFG_max (1-1.5 recommended)
- Setting CFG=1 reduces inference cost

### 3. AnimateLCM-I2V (Image-to-Video, SD15-based)
- Spatial LoRA + motion module + additional image encoder
- Direct image animation model for fast sampling without teacher models
- 2-4 steps for personalized image animation
- CFG=1 recommended (no CFG needed in most cases)
- Additional `motion scale` hyper-parameter (default 0.8; 0.0 = static; higher = more motion but may fail)

## Architecture

### SD15 Pipeline
- Based on Stable Diffusion v1.5
- Custom motion module for temporal generation
- Gradio app (app.py) and batch inference support
- Environment: Python 3.9, diffusers ecosystem

### SVD Pipeline
- Custom `StableVideoDiffusionPipeline` (modified diffusers pipeline)
- Components: VAE (AutoencoderKLTemporalDecoder), CLIP Vision encoder, UNetSpatioTemporalConditionModel, EulerDiscreteScheduler
- Training script: `train_svd_lcm.py` for accelerating Stable Video Diffusion
- Environment: Python 3.9, diffusers 0.25.1, PyTorch 2.2.0, xformers

## Key Files
- `animatelcm_sd15/` — SD15-based T2V and I2V models
- `animatelcm_svd/` — SVD-based image animation models
  - `pipeline.py` — Custom StableVideoDiffusionPipeline (711 lines)
  - `train_svd_lcm.py` — Training script for SVD-LCM acceleration
  - `app.py` — Gradio demo
  - `safetensors/` — Pre-trained model weights
- `metrics/` — Evaluation tools (FVD, CLIP score, PyTorch I3D)

## Comparison
AnimateLCM significantly reduces inference steps compared to standard diffusion:
- Standard video diffusion: 25-50 steps
- AnimateLCM: 1-8 steps (typically 4)
- Quality comparable to full-step generation

## ComfyUI Support
- Tutorial: https://www.youtube.com/watch?v=HxlZHsd6xAk
- ComfyUI integration: https://github.com/dezi-ai/ComfyUI-AnimateLCM

## License
LICENSE.txt file present (need to check exact license)

## Citation
```
@article{wang2024animatelcm,
  title={AnimateLCM: Accelerating the Animation of Personalized Diffusion Models and Adapters with Decoupled Consistency Learning},
  author={Wang, Fu-Yun and Huang, Zhaoyang and Shi, Xiaoyu and Bian, Weikang and Song, Guanglu and Liu, Yu and Li, Hongsheng},
  journal={arXiv preprint arXiv:2402.00769},
  year={2024}
}
```
