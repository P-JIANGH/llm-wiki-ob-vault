---
title: Wan2.1
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/wan2-1.md]
---

# Wan2.1

Open and Advanced Large-Scale Video Generative Models by Alibaba (Wan team).

## Overview

Wan2.1 is a comprehensive suite of video foundation models built on the **Diffusion Transformer (DiT)** paradigm with **Flow Matching**. It delivers state-of-the-art performance in text-to-video, image-to-video, first/last frame interpolation, and video editing tasks. Technical report: [arXiv 2503.20314](https://arxiv.org/abs/2503.20314).

## Available Models

| Model | Task | Resolution | Parameters |
|---|---|---|---|
| T2V-14B | Text-to-Video | 480P & 720P | 14B |
| T2V-1.3B | Text-to-Video | 480P | 1.3B |
| I2V-14B-720P | Image-to-Video | 720P | 14B |
| I2V-14B-480P | Image-to-Video | 480P | 14B |
| FLF2V-14B | First/Last Frame-to-Video | 720P | 14B |
| VACE-14B | Video/Condition Editing | 480P & 720P | 14B |
| VACE-1.3B | Video/Condition Editing | 480P | 1.3B |

## Architecture

### Wan-VAE (3D Causal VAE)
- Novel spatio-temporal compression architecture with **temporal causality**
- Encodes/decodes **unlimited-length 1080P videos** without losing historical temporal info
- Outperforms open-source VAEs in efficiency

### Video Diffusion DiT
- **Text Encoding:** T5 encoder with cross-attention in every transformer block
- **Time Embeddings:** Shared MLP (Linear + SiLU) predicts 6 modulation parameters per block — each learning distinct biases, boosting performance at same parameter scale
- **Model Specifications:**
  - 1.3B: dim=1536, FFN=8960, 12 heads, 30 layers
  - 14B: dim=5120, FFN=13824, 40 heads, 40 layers
- **Flow Matching** training paradigm (not traditional DDPM)

### Data Pipeline
- Massive curated image/video dataset with **4-step cleaning process**: fundamental dimensions → visual quality → motion quality refinement

## Key Features

- **Prompt Extension:** Remote (DashScope API via qwen-plus/qwen-vl-max) or local (Qwen2.5-Instruct/VL variants)
- **Multi-GPU Acceleration:** FSDP + xDiT USP — Ulysses/Ring parallelism strategies
- **Low VRAM Mode:** `--offload_model True --t5_cpu` makes 14B model accessible
- **Gradio UI:** Local web interfaces for all task types
- **Diffusers Integration:** Available for T2V (basic version, lacks prompt extension & multi-GPU)
- **T2I Support:** Trained on mixed image/video data, can generate images too

## Performance

Evaluated on 1,035 internal prompts across **14 major dimensions & 26 sub-dimensions**. Weighted scoring shows Wan2.1 outperforms competing open-source models. Widely adopted as a **base model** for fine-tuning by the community (e.g., [[ai-game-devtools/ruyi]], [[ai-game-devtools/lynx]], [[ai-game-devtools/moviigen-1-1]]).

## Ecosystem Impact

Wan2.1 has become a popular **foundation model** for video generation research and applications:
- [[ai-game-devtools/hunyuan-video]] and [[ai-game-devtools/cogvideox]] are competing open-source video models
- Multiple derivative projects fine-tune on Wan2.1: [[ai-game-devtools/ruyi]] (I2V), [[ai-game-devtools/lynx]] (personalized video), [[ai-game-devtools/moviigen-1-1]] (cinematic), [[ai-game-devtools/stableavatar]] (avatar animation)

## Links

- **GitHub:** https://github.com/Wan-Video/Wan2.1
- **Hugging Face:** https://huggingface.co/Wan-AI/
- **ModelScope:** https://modelscope.cn/organization/Wan-AI
- **Technical Report:** https://arxiv.org/abs/2503.20314
- **Blog:** https://wan.video
