# DeepFloyd IF — Raw Source

**Source**: https://github.com/deep-floyd/IF (cloned from gitcode.com mirror)
**Date**: 2026-04-17

## Project Overview

DeepFloyd IF is a novel state-of-the-art open-source text-to-image model developed by DeepFloyd Lab at StabilityAI. It features high photorealism and strong language understanding capabilities.

## Architecture: Cascaded Pixel Diffusion

DeepFloyd IF uses a **modular cascaded architecture** with three pixel diffusion modules:

1. **Stage I (Base Model)** — Generates 64×64 px images from text prompts
   - IF-I-XL: 4.3B parameters (best model)
   - IF-I-L: 900M parameters
   - IF-I-M: 400M parameters

2. **Stage II (Super-Resolution)** — Upscales to 256×256 px
   - IF-II-L: 1.2B parameters (best model)
   - IF-II-M: 450M parameters

3. **Stage III (Super-Resolution)** — Upscales to 1024×1024 px
   - Uses Stable Diffusion x4 upscaler (stabilityai/stable-diffusion-x4-upscaler)
   - IF-III-L: 700M parameters (not yet released)

All stages share a **frozen T5 text encoder** that extracts text embeddings, which are fed into a UNet architecture enhanced with cross-attention and attention pooling.

## Key Technical Features

- **Frozen T5 Transformer** for text embedding (no text encoder training)
- **UNet with cross-attention + attention pooling** for each stage
- **Cascaded pixel diffusion** — each stage builds on the previous
- **Zero-shot FID score of 6.66** on COCO dataset (state-of-the-art at release)
- **Memory-efficient attention** via xformers (FORCE_MEM_EFFICIENT_ATTN=1)

## Hardware Requirements

- 16GB vRAM: IF-I-XL (4.3B) + IF-II-L (1.2B) — stages I & II
- 24GB vRAM: Full pipeline (I + II + III) up to 1024×1024
- With diffusers CPU offloading: as low as 14GB VRAM

## Pipeline Modes

1. **Dream** — Text-to-image generation (full 3-stage cascade)
2. **Style Transfer** — Zero-shot image-to-image translation with style prompts
3. **Super Resolution** — Upscale any image (2-stage cascade)
4. **Inpainting** — Zero-shot inpainting with mask support

## Code Structure

- `deepfloyd_if/modules/` — Stage modules (stage_I.py, stage_II.py, stage_III.py, t5.py)
- `deepfloyd_if/pipelines/` — Pipeline implementations (dream.py, style_transfer.py, super_resolution.py, inpainting.py)
- `deepfloyd_if/model/` — Core model components (unet.py, gaussian_diffusion.py, resample.py, respacing.py, nn.py)
- `deepfloyd_if/resources/` — Built-in resources (images, numpy arrays)

## Dependencies

- torch < 2.0.0, torchvision, xformers
- transformers ~= 4.25.1, accelerate ~= 0.15.0, diffusers ~= 0.16.0
- huggingface_hub, tokenizers, sentencepiece, fty, beautifulsoup4
- numpy, omegaconf, matplotlib, Pillow, tqdm

## Integration

- **Native Python package**: `pip install deepfloyd_if==1.0.2rc0`
- **Hugging Face Diffusers**: `DiffusionPipeline` integration with CPU offloading
- **DreamBooth fine-tuning** supported via diffusers scripts (~28GB VRAM with PEFT)

## License

- Code: Modified MIT (bespoke license with point two restrictions)
- Weights: DeepFloyd IF specific license (research-purposes-only initially)
- Intent to release fully open-source after feedback collection period

## Creators

- Alex Shonenkov (DeepFloyd Lab)
- Misha Konstantinov
- Daria Bakshandaeva
- Christoph Schuhmann (LAION)
- Ksenia Ivanova
- Nadiia Klokova

## Notable External Contributors

- Apolinário — documentation, demos, community support
- patrickvonplaten (Hugging Face) — 80% loading time improvement, diffusers integration
- Dango233 — xformers memory efficient attention adaptation
- hysts — Gradio demo creation

## Model Zoo Performance

| Model | Cascade | Params | FID | Batch Size | Steps |
|-------|---------|--------|-----|------------|-------|
| IF-I-M | I | 400M | 8.86 | 3072 | 2.5M |
| IF-I-L | I | 900M | 8.06 | 3200 | 3.0M |
| IF-I-XL | I | 4.3B | 6.66 | 3072 | 2.42M |
| IF-II-M | II | 450M | — | 1536 | 2.5M |
| IF-II-L | II | 1.2B | — | 1536 | 2.5M |

Inspired by Google's "Photorealistic Text-to-Image Diffusion Models with Deep Language Understanding" (Imagen paper, arxiv:2205.11487).
