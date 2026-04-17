# Stable Cascade — Raw Source Analysis

**Source:** https://github.com/Stability-AI/StableCascade
**Date:** 2026-04-17
**Clone source:** gitcode.com mirror (GitHub timed out)

## README Summary

Stable Cascade is the official codebase from Stability AI for the **Stable Cascade** image generation model. It is built upon the [Würstchen architecture](https://openreview.net/forum?id=gU58d5QeGv) and features a key architectural difference from Stable Diffusion: it operates at a much smaller latent space.

### Key Differentiator: Compression Factor

- **Stable Diffusion**: compression factor of 8 (1024×1024 → 128×128)
- **Stable Cascade**: compression factor of 42 (1024×1024 → 24×24)

This enables 16x cost reduction over SD 1.5 for both training and inference, while maintaining crisp reconstructions.

### Three-Stage Architecture

1. **Stage A** (20M params, VAE): Initial image compression
2. **Stage B** (700M / 1.5B params, Diffusion): Further compression + reconstruction
3. **Stage C** (1B / 3.6B params, Diffusion): Text-conditional generation in compressed latent space

The pipeline: Stage C generates 24×24 latents from text → Stage B upscales/refines → Stage A decodes to final image.

### Supported Features

- Text-to-Image, Image Variation, Image-to-Image
- ControlNet (Inpainting, Outpainting, Face Identity, Canny, Super Resolution)
- LoRA training and inference
- Image reconstruction (can be used as a standalone Diffusion Autoencoder)
- Diffusers 🤗 library integration
- Gradio web app

### Evaluation Results

In human evaluation (parti-prompts + aesthetic prompts), Stable Cascade (30 steps) outperformed:
- Playground v2 (50 steps)
- SDXL (50 steps)
- SDXL Turbo (1 step)
- Würstchen v2 (30 steps)

### Training Code

Provides code for:
- Training from scratch (`train/train_c.py`, `train/train_b.py`)
- Fine-tuning (`train/base.py`)
- LoRA training (`train/train_c_lora.py`)
- ControlNet training (`train/train_c_controlnet.py`)

### GDF Framework

The project includes a custom **GDF** (Generic Diffusion Framework) module:
- `gdf/schedulers.py` — noise schedulers
- `gdf/samplers.py` — sampling algorithms
- `gdf/noise_conditions.py` — noise conditioning
- `gdf/scalers.py`, `gdf/targets.py`, `gdf/loss_weights.py`

### Dependencies

PyTorch 2.1.2, transformers, accelerate, kornia, insightface, opencv-python, einops, wandb. Code licensed under MIT; weights under Stability AI Non-Commercial Research Community License.

### Key Files Analyzed

- `readme.md` — Full project documentation
- `modules/stage_c.py` (252 lines) — Stage C model: text-conditional diffusion with ResBlock, AttnBlock, FeedForwardBlock, TimestepBlock; supports ControlNetDeliverer, CLIP text/image conditioning
- `modules/stage_b.py` (239 lines) — Stage B model: diffusion autoencoder with effnet conditioning, pixel conditioning, similar block structure to Stage C
- `modules/stage_a.py` — VAE for initial compression
- `modules/common.py` — Shared building blocks (AttnBlock, ResBlock, LayerNorm2d, etc.)
- `modules/controlnet.py` — ControlNet implementation
- `modules/lora.py` — LoRA layers
- `requirements.txt` — Full dependency list
- `train/` — Training scripts for all stages, LoRA, ControlNet
- `gdf/` — Generic Diffusion Framework
