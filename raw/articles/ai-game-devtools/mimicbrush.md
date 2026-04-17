# MimicBrush — Zero-shot Image Editing with Reference Imitation

**Source:** https://github.com/ali-vilab/MimicBrush
**Archived:** 2026-04-17
**arXiv:** https://arxiv.org/abs/2406.07547
**Project Page:** https://xavierchen34.github.io/MimicBrush-Page/

## Overview

MimicBrush is a zero-shot image editing tool that enables reference-based image imitation. Given a source image (with a user-drawn mask indicating the region to edit) and a reference image, MimicBrush transfers the visual appearance/texture from the reference to the masked region of the source, while preserving the original geometry/shape when desired.

## Architecture

### Core Components

- **MimicBrushPipeline** (`models/pipeline_mimicbrush.py`, 1256 lines): Custom DiffusionPipeline extending Stable Diffusion inpainting pipeline. Supports text-guided image inpainting with reference imitation.
  - Inherits from `DiffusionPipeline`, `TextualInversionLoaderMixin`, `LoraLoaderMixin`, `FromSingleFileMixin`
  - Uses `UNet2DConditionModel` with 9 input channels (supports inpainting)
  - Integrates `ReferenceNetAttention` for cross-image feature injection
  - Full CFG (classifier-free guidance) support with positive/negative prompts

- **ReferenceNet** (`models/ReferenceNet.py`, 1146 lines): A secondary U-Net that encodes the reference image and extracts features for imitation.
  - Standard SD-1.5 UNet architecture (CrossAttnDownBlock2D ×3 + DownBlock2D, UNetMidBlock2DCrossAttn, UpBlock2D + CrossAttnUpBlock2D ×3)
  - Replaces cross-attention layers with Identity when not needed
  - LoRA-compatible linear layers
  - Gradient checkpointing support

- **ReferenceNetAttention** (`models/ReferenceNet_attention.py`): Injects reference image features into the main UNet's attention layers, enabling style/texture transfer from reference to target.

- **DepthGuider** (`models/depth_guider.py`): Optional depth guidance module using Depth Anything (facebookresearch/dinov2) to preserve geometric structure during editing.

- **Attention Module** (`models/attention.py`): Custom attention processing for cross-image feature fusion.

### Pipeline Flow

1. Encode source image + mask → masked image latents
2. Encode reference image through ReferenceNet → reference features
3. Encode depth map (optional) → depth guidance
4. Run denoising loop: UNet conditioned on text prompt + reference features + depth + mask
5. Decode latents → edited image

### Model Requirements

- **Base Models:** Stable Diffusion 1.5 + SD-1.5-inpainting
- **MimicBrush Checkpoint:** Two U-Nets (main + reference), available on HuggingFace (`xichenhku/MimicBrush`) and ModelScope (`xichen/MimicBrush`)
- **Additional:** VAE, CLIP encoder (clip-vit-large-patch14), Depth Anything (DINOv2)
- **Clean SD weights** provided at `xichen/cleansd` (ModelScope) to avoid downloading unused models

## Key Features

- **Zero-shot editing:** No fine-tuning needed for new images
- **Reference imitation:** Transfers texture/style/appearance from any reference image
- **Shape preservation:** "Keep the original shape" mode for texture-only transfer
- **Depth-guided:** Optional depth conditioning for structural consistency
- **LoRA compatible:** Supports LoRA loading for customization
- **Gradio demo:** Interactive web UI with mask drawing, image upload, reference selection

## Tech Stack

- Python 3.8.5
- PyTorch 2.0.1 + CUDA
- Diffusers 0.23.0
- Transformers 4.25.1
- Gradio 3.39.0 / 4.x
- OpenCV, PIL, NumPy
- ModelScope + HuggingFace Hub integration
- DINOv2 (via torchhub) for depth estimation

## Authors & Institutions

- Xi Chen (The University of Hong Kong)
- Yutong Feng (Alibaba Group)
- Mengting Chen (Ant Group)
- Yiyang Wang, Shilong Zhang, Yu Liu, Yujun Shen, Hengshuang Zhao

## License

Not explicitly stated in repository. Based on SD-1.5 foundation (CreativeML Open RAIL-M) and derived from IP-Adapter + MagicAnimate codebases.

## Related Codebase

- Built on [IP-Adapter](https://github.com/tencent-ailab/IP-Adapter) architecture
- Built on [MagicAnimate](https://github.com/magic-research/magic-animate) codebase
- Community ComfyUI integration: [ComfyUI-MimicBrush](https://github.com/AIFSH/ComfyUI-MimicBrush)
