---
title: Open-Sora Plan
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, tool]
sources:
  - raw/articles/ai-game-devtools/open-sora-plan.md
---

# Open-Sora Plan

## Overview

[Open-Sora Plan](https://github.com/PKU-YuanGroup/Open-Sora-Plan) is an open-source video generation project initiated by PKU-TuZhan AIGC Joint Laboratory (Peking University + Rabbitpre Intelligence) to reproduce OpenAI's Sora. The project has iterated through 5 major versions (v1.0 → v1.5), evolving from 2+1D attention to full 3D sparse attention architectures.

Latest version: **v1.5.0** (June 2025) — 8.5B parameter model trained on 40M videos + 1.1B images, fully on Ascend 910B NPUs.

## Key Facts

| Attribute | Value |
|-----------|-------|
| **Organization** | PKU-TuZhan AIGC Joint Lab (北大-兔展) |
| **Latest Version** | v1.5.0 (2025-06) |
| **Model Size** | 8.5B parameters (SUV architecture) |
| **Training Data** | 40M videos + 1.1B images |
| **Hardware** | Ascend 910B (512 GPUs for training) |
| **License** | MIT |
| **Max Resolution** | 121×576×1024 (frames×height×width) |
| **VBench Total** | 83.02% (comparable to HunyuanVideo's 83.24%) |

## Technical Architecture

### SUV (Sparse U-shaped DiT)
The core innovation in v1.5.0. Builds on **Skiparse Attention** (introduced in v1.3.0) — a global sparse attention that selects 1/k tokens for interaction:

- **U-shaped sparsity**: Low sparsity in shallow layers (fine-grained), high sparsity in deep layers (semantic), Full 3D Attention at shallowest layer
- **Long skip connections** between stages with identical sparsity (UNet-inspired)
- **35%+ faster** than Dense DiT on Ascend 910B at 121×576×1024
- Attention operation alone gains **45%+ speedup**
- Dynamic sparsity adjustment during training without weight modification

### WFVAE (Wavelet-Driven Energy Flow VAE)
- **8×8×8** temporal-spatial downsampling (vs. 4×8×8 in most competitors)
- Reduces latent shape to **half**, shortening attention sequence length
- PSNR 36.91 vs. Wan2.1's 35.77 — higher reconstruction quality despite 2× compression
- Enables higher frame count video generation

### Adaptive Gradient Clipping
- EMA-based dynamic gradient norm threshold (3-sigma rule)
- Replaces complex batch-dropping from v1.3.0
- Simpler implementation, compatible with various parallel training strategies

## Training Pipeline

### Text-to-Image (4 stages)
1. Dense MMDiT on 256² images (512 GPUs, 225k steps)
2. 384² images (384 GPUs, 150k steps)
3. 288×512 images (256 GPUs, 110k steps)
4. Fine-tune Dense→SUV with zero-init skip connections (256 GPUs, 160k steps)

### Text-to-Video (5 stages)
1. 57×288×512 @ 24fps (512 GPUs, 40k steps) — image→video adaptation
2. 57×288×512 @ 12fps (512 GPUs, 45k steps) — temporal learning
3. 121×288×512 @ 24fps (512 GPUs, 25k steps) — high frame count
4. 121×576×1024 (512 GPUs, 25k steps) — high resolution
5. High-quality fine-tuning (512 GPUs, 5k steps)

## Performance Comparison

| Model | Params | VBench Total | Aesthetic Quality |
|-------|--------|-------------|-------------------|
| HunyuanVideo | 13B | **83.24%** | 60.36% |
| **Open-Sora Plan v1.5.0** | 8B | 83.02% | **66.89%** |
| CogVideoX1.5-5B | 5B | 82.17% | 62.79% |
| Gen-3 | - | 82.32% | 63.34% |
| Mochi-1 | 10B | 80.13% | 56.94% |

Open-Sora Plan achieves **near-parity with 13B HunyuanVideo** at 8B parameters, with superior aesthetic quality scoring.

## Differences from Similar Tools

- vs [[ai-game-devtools/hunyuan-video]]: Open-Sora Plan uses **sparse attention** (SUV) for 35%+ speedup; HunyuanVideo uses dense Full Attention. Open-Sora Plan is trained on Ascend NPUs, HunyuanVideo on GPUs. Both achieve comparable VBench scores.
- vs [[ai-game-devtools/open-sora]]: Both aim to reproduce Sora. HPC-AI's [[ai-game-devtools/open-sora]] uses ColossalAI framework and MMDiT architecture with Rectified Flow; Open-Sora Plan uses custom Skiparse/SUV sparse attention with Wavelet-Driven VAE. Open-Sora Plan has deeper version iterations (5 versions).
- vs [[ai-game-devtools/cogvideox]]: CogVideoX uses 3D Causal VAE (4×8×8) vs. Open-Sora's WFVAE (8×8×8); both are DiT-based. CogVideoX offers GPU inference out-of-box; Open-Sora Plan v1.5.0 currently NPU-only (GPU version pending).

## Related Projects

- **Helios** — Same team's real-time video generation breakthrough (19.5 FPS on single H100)
- **WF-VAE** — Standalone VAE paper (arXiv:2411.17459)
- **Allegro** — Built on Open-Sora Plan foundation, generates 6s 720p@15fps videos
- [[ai-game-devtools/hunyuanvideo-1-5]] — Competing 8B video model from Tencent

## Links

- [GitHub](https://github.com/PKU-YuanGroup/Open-Sora-Plan)
- [arXiv Paper (v1.3)](https://arxiv.org/abs/2412.00131)
- [WF-VAE Paper](https://arxiv.org/abs/2411.17459)
- [Helios Paper](https://arxiv.org/abs/2603.04379)
- [v1.5.0 Report](docs/Report-v1.5.0.md)
- [Discord](https://discord.gg/DFZg5678)
- [HuggingFace Models](https://huggingface.co/LanguageBind/Open-Sora-Plan-v1.5.0)
