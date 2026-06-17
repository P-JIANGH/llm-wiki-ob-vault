# Stable Diffusion web UI

**Source:** https://github.com/AUTOMATIC1111/stable-diffusion-webui
**Captured:** 2026-04-17
**License:** AGPL-3.0

## Overview

A web interface for Stable Diffusion, implemented using the Gradio library. One of the most popular and widely-used interfaces for running Stable Diffusion models locally, serving as the foundation for many derivative projects.

## Key Features

- **txt2img and img2img modes** — Original text-to-image and image-to-image generation
- **Inpainting / Outpainting** — Edit parts of existing images or extend beyond borders
- **Attention control** — Use `((keyword))` or `(keyword:1.21)` syntax to weight prompt elements
- **X/Y/Z plot** — 3-dimensional parameter sweep visualization
- **Textual Inversion** — Train custom embeddings on 8GB+ VRAM
- **Extras tab** — Face restoration (GFPGAN, CodeFormer), upscalers (RealESRGAN, ESRGAN, SwinIR, Swin2SR, LDSR)
- **Negative prompt** — Specify what NOT to generate
- **Checkpoint merger** — Merge up to 3 checkpoints into one
- **Styles system** — Save and reuse prompt templates via dropdown
- **Prompt editing** — Change prompt mid-generation (e.g., watermelon → anime girl)
- **Batch processing** — Process multiple files via img2img
- **Highres fix** — Generate high-res images without distortion in one click
- **Custom scripts/extensions** — Extensive extension ecosystem
- **API** — REST API for programmatic access
- **CLIP skip, Hypernetworks, LoRAs** — Fine-tuning integration
- **Safetensors support** — Secure checkpoint loading
- **xformers optimization** — Major speed increase for supported GPUs

## Architecture

### Core Modules (`modules/`)
- `processing.py` — Core image generation pipeline (1792 lines)
- `sd_models.py` — Checkpoint loading and management
- `sd_hijack.py` — Model hijacking for optimization
- `sd_samplers.py` — Sampler implementations (k-diffusion, DDIM, Euler, etc.)
- `ui.py` — Gradio UI construction
- `api/` — REST API endpoints
- `textual_inversion/` — Training pipeline for embeddings
- `hypernetworks/` — Hypernetwork model support

### Key Dependencies
- Gradio (web UI framework)
- PyTorch (deep learning)
- transformers (CLIP text encoder)
- k-diffusion (samplers)
- GFPGAN, CodeFormer (face restoration)
- RealESRGAN, ESRGAN (upscaling)
- xformers (attention optimization)

### Multi-Platform Support
- NVidia GPUs (recommended, full feature set)
- AMD GPUs (DirectML/Rocm)
- Intel CPUs and GPUs (OpenVINO)
- Ascend NPUs
- Apple Silicon (MPS)
- As low as 4GB VRAM (reports of 2GB working)

## Installation

- **Windows:** One-click release package (`sd.webui.zip`) or manual git clone + `webui-user.bat`
- **Linux:** `webui.sh` auto-installer or manual clone
- **Colab:** Multiple online service options available
- Python 3.10.6 recommended for PyTorch compatibility

## Related Projects

This project is the basis for many forks and derivatives:
- Fooocus (simplified UI)
- ComfyUI (node-based workflow)
- sd-webui-controlnet (extension, now widely used)
- WebUI Forge (performance-optimized fork)

## Credits

Built on Stable Diffusion (CompVis/Stability AI), with contributions from k-diffusion, GFPGAN, CodeFormer, ESRGAN, SwinIR, LDSR, MiDaS, xformers, DeepDanbooru, and many others. Initial Gradio script concept credited to an anonymous 4chan user.
