# Stable Diffusion — Latent Diffusion Model for Text-to-Image Generation

**Source:** https://github.com/CompVis/stable-diffusion
**Date:** 2026-04-17
**License:** CreativeML OpenRAIL M

## Overview

Stable Diffusion is a **latent text-to-image diffusion model** developed by CompVis (University of Heidelberg) in collaboration with Stability AI and Runway. It builds upon the Latent Diffusion Models (LDM) architecture from the CVPR 2022 paper "High-Resolution Image Synthesis with Latent Diffusion Models" by Rombach, Blattmann, Lorenz, Esser, and Ommer.

## Architecture

- **Type:** Latent Diffusion Model (LDM) — diffusion in compressed latent space
- **Autoencoder:** Downsampling factor 8, maps images H×W×3 → latents H/8×W/8×4
- **UNet Backbone:** 860M parameters, conditioned on text embeddings via cross-attention
- **Text Encoder:** Frozen CLIP ViT-L/14 (123M parameters), produces non-pooled text embeddings
- **Total Parameters:** ~983M (UNet + text encoder)
- **Training Resolution:** Pretrained on 256×256, finetuned on 512×512
- **VRAM Requirement:** GPU with at least 10GB VRAM

## Training Details

- **Data:** LAION-5B database subset (laion2B-en → laion-high-resolution → laion-aesthetics v2 5+)
- **Hardware:** 32 × 8 × A100 GPUs (256 A100s total)
- **Training Time:** ~150,000 GPU hours
- **Carbon Emissions:** 11,250 kg CO2 eq. (AWS US-east)
- **Optimizer:** AdamW, warmup to 0.0001 for 10K steps then constant
- **Batch Size:** 32 × 8 × 2 × 4 = 2048
- **Gradient Accumulations:** 2

## Model Checkpoints

| Checkpoint | Steps | Resolution | Training Data |
|---|---|---|---|
| sd-v1-1 | 237k + 194k | 256→512 | laion2B-en + laion-high-resolution |
| sd-v1-2 | 515k (from v1-1) | 512 | laion-aesthetics v2 5+ |
| sd-v1-3 | 195k (from v1-2) | 512 | laion-aesthetics v2 5+ + 10% text dropout |
| sd-v1-4 | 225k (from v1-2) | 512 | laion-aesthetics v2 5+ + 10% text dropout |

## Key Modules (ldm/ package)

- `ldm/models/diffusion/ddpm.py` — DDPM diffusion model base class
- `ldm/models/diffusion/ddim.py` — DDIM faster sampling
- `ldm/models/diffusion/plms.py` — PLMS (Pseudo Linear Multistep) sampler
- `ldm/models/diffusion/dpm_solver/` — DPM-Solver ODE-based sampler
- `ldm/models/autoencoder.py` — VAE autoencoder for latent compression
- `ldm/modules/diffusionmodules/openaimodel.py` — UNet backbone architecture
- `ldm/modules/attention.py` — Cross-attention and self-attention layers
- `ldm/modules/encoders/modules.py` — CLIP text encoder module
- `ldm/modules/distributions/` — Variational distributions

## Supported Tasks

- **Text-to-Image** (`scripts/txt2img.py`): Generate images from text prompts
- **Image-to-Image** (`scripts/img2img.py`): Modify images guided by text (strength 0.0–1.0)
- **Inpainting**: Mask-based image modification
- **Upscaling**: Image resolution enhancement

## Dependencies

- Python 3.8.5, PyTorch 1.11.0, CUDA 11.3
- transformers==4.19.2, diffusers, einops, omegaconf
- pytorch-lightning==1.4.2, kornia==0.6
- taming-transformers (CompVis), CLIP (OpenAI)

## Safety Features

- Safety Checker Module (PR #36) — reduces explicit output probability
- Invisible watermarking — outputs tagged as machine-generated via ShieldMnt/invisible-watermark

## License

CreativeML OpenRAIL M — a responsible AI license that permits research and creative use with use-based restrictions to prevent misuse. Commercial use is permitted but additional safety mechanisms are recommended.

## Links

- GitHub: https://github.com/CompVis/stable-diffusion
- Paper: https://arxiv.org/abs/2112.10752
- HuggingFace: https://huggingface.co/CompVis/stable-diffusion
- Original LDM repo: https://github.com/CompVis/latent-diffusion
- Project page: https://ommer-lab.com/research/latent-diffusion-models/
