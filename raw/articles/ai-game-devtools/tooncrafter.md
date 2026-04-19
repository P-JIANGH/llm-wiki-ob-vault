# ToonCrafter: Generative Cartoon Interpolation

## Source
- **GitHub**: https://github.com/ToonCrafter/ToonCrafter
- **arXiv**: https://arxiv.org/abs/2405.17933
- **Project Page**: https://doubiiu.github.io/projects/ToonCrafter/
- **Authors**: Jinbo Xing, Hanyuan Liu, Menghan Xia, Yong Zhang, Xintao Wang, Ying Shan, Tien-Tsin Wong
- **Institutions**: CUHK + Tencent AI Lab
- **Published**: SIGGRAPH Asia 2024, Journal Track

## Overview
ToonCrafter is an image-to-video diffusion model that interpolates between two cartoon/animation frames, generating smooth in-between frames. It leverages pre-trained image-to-video diffusion priors to create cartoon motion from just a starting frame and ending frame.

## Key Features
- **Cartoon Interpolation**: Input two cartoon frames → generates smooth 16-frame video (512x320)
- **Sparse Sketch Guidance**: Supports additional sketch input for controlled interpolation
- **Cartoon Sketch Interpolation**: Apply animation between different sketch styles
- **Reference-based Sketch Colorization**: Input sketch + reference image → colorized animated sequence
- **Gradio Web UI**: Interactive local demo application

## Architecture
- **Core Model**: LatentVisualDiffusion (lvdm.models.ddpm3d)
- **UNet**: 3D UNet with temporal convolution + temporal attention (self-attention only, no causal)
  - Input channels: 8 (dual-frame conditioning)
  - Output channels: 4
  - Model channels: 320, Attention at [4,2,1] resolutions
  - Transformer depth: 1, Context dim: 1024
  - Temporal length: 16 frames
  - Image cross-attention enabled
  - FPS conditioning
- **VAE**: AutoencoderKL_Dualref (dual-reference autoencoder)
- **Text Encoder**: FrozenOpenCLIPEmbedder (penultimate layer, frozen)
- **Image Encoder**: FrozenOpenCLIPImageEmbedderV2 (frozen)
- **Image Projector**: Resampler (dim=1024, depth=4, 12 heads, 16 queries)
- **Sampling**: DDIM with v-parameterization, 1000 timesteps trained
- **Dynamic Rescale**: Enabled, base_scale=0.7
- **Loop Video**: Enabled for seamless animation

## Model Specs
- **Resolution**: 320x512 (height x width)
- **GPU Memory**: ~24GB A100 (community lowered to ~10GB)
- **Inference Time**: 24s on A100 with DDIM 50 steps, perframe_ae=True
- **Output**: Up to 16 frames
- **Checkpoint**: ~24GB model.ckpt on HuggingFace

## Tech Stack
- **Framework**: PyTorch 2.0.0 + PyTorch Lightning 1.9.3
- **Key Dependencies**: einops, open_clip_torch, xformers, transformers, gradio, omegaconf
- **Python**: 3.8.5 (conda environment)
- **Inference**: DDIM sampler, configurable steps (1-60)

## Usage
1. Download model.ckpt to checkpoints/tooncrafter_512_interp_v1/
2. Run: `sh scripts/run.sh` (command line) or `python gradio_app.py` (Gradio UI)
3. Input: two cartoon frames (start + end), optional text prompt
4. Output: 16-frame interpolated video

## Community Extensions
- ComfyUI: ComfyUI-DynamiCrafterWrapper (fp16 pruned, 12GB VRAM)
- ComfyUI: ComfyUI-ToonCrafter
- Colab demos available
- Windows support: ToonCrafter-for-windows
- Sketch guidance: ToonCrafter_with_SketchGuidance

## License
Research code — no explicit license stated on repo. Checkpoint has separate terms.
