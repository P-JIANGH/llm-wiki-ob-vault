# Open-Sora — hpcaitech/Open-Sora

**Source:** https://github.com/hpcaitech/Open-Sora
**Cloned:** 2026-04-20
**Version:** 2.0 (latest on main branch)

## Overview

Open-Sora is an open-source initiative by HPCAitech (ColossalAI team) to democratize efficient video production. The project provides a complete pipeline for video data preprocessing, training with acceleration (via ColossalAI), inference, and evaluation.

## Key Facts

- **Latest model:** Open-Sora 2.0 (11B parameters)
- **Training cost:** ~$200K
- **Resolution:** 256px and 768px
- **Capabilities:** Text-to-Video (T2V), Image-to-Video (I2V)
- **VBench performance:** On-par with HunyuanVideo 11B & Step-Video 30B
- **Human preference:** Comparable to HunyuanVideo 11B and Step-Video 30B

## Architecture

### Model Components (opensora/models/)
- **mmdit/** — Multi-Modal Diffusion Transformer (DiT), the core video generation model
- **hunyuan_vae/** — Hunyuan VAE for video encoding/decoding
- **vae/** — Standard 2D/3D VAE components (autoencoder, discriminator, losses, LPIPS)
- **dc_ae/** — Deep Compression AutoEncoder for image compression
- **text/** — Text conditioning (T5 encoder, CLIP embeddings)

### Key Architectural Features
- **Rectified Flow** training objective
- **3D-VAE** with shift-window attention for unified spatial-temporal encoding
- **Score condition** for motion quality control
- **ColossalAI acceleration:** Tensor parallelism (1-4 GPU), Sequence parallelism (8 GPU)
- **Flash Attention 3** support for faster inference
- **xformers** integration for memory efficiency

### Pipeline
1. Text-to-Image-to-Video (T2I2V): Uses Flux text-to-image model as intermediate step
2. Direct Text-to-Video (T2V): Direct generation from text prompt
3. Image-to-Video (I2V): Reference image + prompt → video

### Training
- Multi-GPU distributed training with ColossalAI
- Configurable via YAML configs (configs/diffusion/train/)
- Supports multi-resolution, multi-aspect-ratio, variable-length training
- Motion score embedding in text prompts

## Computational Efficiency (H100/H800, 50 steps)

| Resolution | 1x GPU | 2x GPUs | 4x GPUs | 8x GPUs |
|------------|--------|---------|---------|---------|
| 256x256 | 60s/52.5GB | 40s/44.3GB | 34s/44.3GB | — |
| 768x768 | 1656s/60.3GB | 863s/48.3GB | 466s/44.3GB | 276s/44.3GB |

## Version History

| Version | Date | Key Features |
|---------|------|-------------|
| 2.0 | 2025-03 | 11B model, T2V+I2V unified, $200K training cost |
| 1.3 | 2025-02 | 1B model, upgraded VAE + Transformer |
| 1.2 | 2024-06 | 3D-VAE, rectified flow, score condition |
| 1.1 | 2024-04 | Multi-resolution/length/aspect-ratio, I2V/V2V |
| 1.0 | 2024-03 | Full pipeline: data/train/inference |

## Tech Stack
- Python 3.10+
- PyTorch ≥ 2.4.0
- ColossalAI (distributed training)
- xformers, Flash Attention
- Gradio (web demo)

## License
Apache 2.0

## Key Files
- `opensora/models/mmdit/` — Core DiT architecture
- `opensora/models/vae/` — Autoencoder components
- `opensora/models/hunyuan_vae/` — Hunyuan VAE integration
- `opensora/datasets/` — Data loading & preprocessing
- `opensora/acceleration/` — ColossalAI parallel strategies
- `scripts/diffusion/inference.py` — Main inference script
- `scripts/diffusion/train.py` — Training entry point
- `configs/diffusion/` — YAML configuration files
- `gradio/app.py` — Web UI demo

## Acknowledgements
ColossalAI, DiT, OpenDiT, PixArt, Flux, Latte, HunyuanVideo, StabilityAI VAE, DC-AE, CLIP, T5, LLaVA, PLLaVA, MiraData
