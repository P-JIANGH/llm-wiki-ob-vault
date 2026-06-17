---
title: NextStep-1
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, image-generation, open-source, autoregressive, flow-matching]
sources: [raw/articles/ai-game-devtools/nextstep-1.md]
---

# NextStep-1

**14B-parameter autoregressive image generation model with continuous tokens, by StepFun.**

## Overview

NextStep-1 is an autoregressive model that generates images using **continuous tokens** instead of the traditional discrete/vector-quantized (VQ) tokens. It jointly models sequences of discrete text tokens and continuous image tokens through a unified next-token prediction framework.

- **Developer:** StepFun (阶跃星辰)
- **License:** Apache 2.0
- **Paper:** arXiv 2508.10711 (ICLR 2026 Oral)
- **GitHub:** https://github.com/stepfun-ai/NextStep-1
- **Weights:** Hugging Face, ModelScope

## Architecture

### Dual-Head Design

The model uses two specialized heads on top of a shared transformer backbone:

| Component | Params | Purpose |
|-----------|--------|---------|
| Text LM Head | Shared (14B) | Discrete text token prediction |
| Flow Matching Head | 157M | Continuous image token generation |

The **Flow Matching Head** uses a SimpleMLPAdaLN architecture with 12 ResBlocks (dim=1536), adaptive LayerNorm modulation, and timestep embeddings. It is significantly smaller than the backbone, demonstrating that image generation can be handled by a lightweight module when the backbone provides rich conditioning.

### Tokenization Pipeline

1. Images → Custom VAE (f8ch16: 8× downsample, 16 channels)
2. Latents → Patchified into continuous token sequences
3. Tokens → Autoregressive generation via LM + flow matching

### Training Stages

1. **Pre-training 256px** → Base training at lower resolution
2. **Pre-training 512px** → Resolution scaling
3. **Annealing** → Quality refinement
4. **RL Post-training** → Flow-based RL for quality boost (NextStep-1.1+)

## Model Variants

| Model | RL | Diversity | Fine-tuning |
|-------|-----|-----------|-------------|
| NextStep-1.1-Pretrain-256px | ❌ | High | Easy |
| NextStep-1.1-Pretrain | ❌ | Medium | Medium |
| NextStep-1.1 | ✅ | Low | Hard |
| NextStep-1-Large | ✅ | Low | Hard |
| NextStep-1-Large-Edit | ✅ | Low | Hard |

## Capabilities

- **Text-to-Image:** Generate images from text prompts
- **Image Editing:** Modify images with text instructions (NextStep-1-Large-Edit)
- **Interleaved Generation:** Multi-image sequences with text
- **Multi-aspect-ratio:** Configurable output aspect ratios

## Technical Stack

- **Backbone:** Qwen2.5-14B
- **Framework:** PyTorch, Transformers, Diffusers
- **Training:** DeepSpeed, smartrun (distributed launcher)
- **Config:** Hydra/OmegaConf
- **Data:** WebDataset format, ~1B images (proprietary)
- **Inference:** Standard + vLLM-Omni support

## Key Innovations

- **Continuous tokens** avoid VQ quantization artifacts common in [[hunyuanimage-3-0]] and [[flux]]-style models
- **Lightweight image head** (157M) decouples image generation from the massive text backbone
- **Flow-based RL post-training** (NextStep-1.1) improves quality beyond supervised training
- Unlike diffusion models like [[stable-diffusion]] that use iterative denoising, NextStep uses autoregressive next-token prediction + flow matching in a single unified framework

## Differences from Related Tools

| Aspect | NextStep-1 | [[stable-diffusion]] | [[flux]] |
|--------|-----------|-------------------|---------|
| Paradigm | Autoregressive + Flow Matching | Diffusion | Flow Matching / Diffusion |
| Tokens | Continuous | Discrete (VQ) | Discrete (VQ/Flow) |
| Text Encoder | Qwen2.5 (built-in) | CLIP/T5 | T5/CLIP |
| Training Data | ~1B images (proprietary) | LAION | Proprietary |

## References

- arXiv: [2508.10711](https://arxiv.org/abs/2508.10711)
- [Project Page](https://stepfun.ai/research/en/nextstep1)
- [Blog Post](https://stepfun-ai.github.io/NextStep-1/nextstep_1_blog/)
- [NextStep-1.1 Blog](https://stepfun-ai.github.io/NextStep-1/nextstep_1p1_blog/)
- [Hugging Face](https://huggingface.co/collections/stepfun-ai/nextstep-1-689d80238a01322b93b8a3dc)
