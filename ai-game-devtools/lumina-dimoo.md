---
title: Lumina-DiMOO
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, model, image-generation, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/lumina-dimoo.md]
---

# Lumina-DiMOO

An **omni foundational model** for seamless multimodal generation and understanding, developed by researchers from Shanghai AI Laboratory, Shanghai Jiao Tong University, Nanjing University, and others.

## Overview

Lumina-DiMOO is a unified discrete diffusion large language model that handles both multimodal generation (text→image, image→image) and multimodal understanding (image understanding/visual QA) in a single architecture. Unlike prior unified models that use autoregressive (AR) or hybrid AR-diffusion approaches, Lumina-DiMOO uses a fully **discrete diffusion** modeling paradigm — images are tokenized into discrete codes via VQ, and generation proceeds via discrete denoising.

## Key Innovations

1. **Unified Discrete Diffusion Architecture** — All modalities processed through discrete diffusion, not AR or continuous diffusion
2. **Versatile Multimodal Capabilities** — Text-to-image, image-to-image (editing, subject-driven, inpainting, style transfer), and image understanding in one model
3. **ML-Cache Speed Optimization** — Max Logit-based Cache delivers 2× speedup for image generation (58.2s → 32.2s on A800 at 1536×768)
4. **High-Resolution Support** — Arbitrary resolution text-to-image generation

## Capabilities

### Generation
- **Text-to-Image** — arbitrary resolution, 64 sampling steps
- **Image-to-Image** — controllable generation (depth, Canny edge, OpenPose, HED), subject-driven, editing (add/remove/replace/background/text transfer), style transfer
- **Image Inpainting & Extrapolation** — outpainting with configurable mask ratios
- **Dense Prediction** — Canny edge map, HED, depth, OpenPose prediction

### Understanding
- **Image Understanding** — visual QA via `inference_mmu.py` with configurable gen_length/block_length

## Architecture

| Component | File | Description |
|-----------|------|-------------|
| Core model | `model/modeling_xllmx_dimoo.py` | DiMOO variant of xLLM architecture |
| Discrete VAE | `model/modeling_llada.py` | LLaDA-style discrete tokenization |
| T2I generator | `generators/image_generation_generator.py` | Text-to-image inference |
| I2I generator | `generators/image_to_image_generator.py` | Image editing, subject-driven, style transfer |
| Understanding | `generators/text_understanding_generator.py` | Image understanding (MMU) |
| Inference | `inference/inference_t2i.py`, `inference_i2i.py`, `inference_mmu.py` | Entry points for each task |
| VLMEvalKit | `VLMEvalKit/` | Benchmark evaluation (POPE, MME, MMBench, SEEDBench, MMMU) |

## Performance

- **UniGenBench** (Tencent Hunyuan Team): Ranked **1st** among all open-source unified models (Sep 2025)
- **GenEval Benchmark**: State-of-the-art among open-source unified models
- **Image generation speed** (A800, 1536×768):
  - Baseline: 58.2s / 38.9 GB GPU memory
  - With ML-Cache: 32.2s / 45.9 GB GPU memory (2× faster, 1.18× more memory)

## Diffusers & ComfyUI Support

Third-party support added via community contributions:
- [Diffusers library integration](https://github.com/qianyu-dlut/diffusers/blob/main/Lumina_DiMOO_README.md)
- [ComfyUI node](https://github.com/L-Hugh/ComfyUI-Lumina-DiMOO)

## Relations

- [[cambrian-1]] — Also a VLM benchmark leader; Cambrian-1 is vision-centric with benchmark focus
- [[minicpm-2b]] — Another compact multimodal model in the same ecosystem
- [[cogvlm2]] — High-capability open-source VLM, overlapping in visual understanding tasks
- [[dots-vlm1]] — RedNote-based VLM; different training data focus

## See Also

- [HuggingFace Model](https://huggingface.co/Alpha-VLLM/Lumina-DiMOO)
- [ArXiv Technical Report](http://arxiv.org/abs/2510.06308)
- [Project Page with Demo](https://synbol.github.io/Lumina-DiMOO/)
