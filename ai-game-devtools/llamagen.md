---
title: LlamaGen
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, autoregressive, tool, open-source, python, ai]
sources: [raw/articles/ai-game-devtools/llamagen.md]
---

# LlamaGen

## Overview
LlamaGen is a family of image generation models by HKU & ByteDance that applies the **next-token prediction** paradigm of large language models to visual generation. It demonstrates that vanilla autoregressive models without visual-specific inductive biases can achieve state-of-the-art image generation when scaled properly.

Paper: [Autoregressive Model Beats Diffusion: Llama for Scalable Image Generation](https://arxiv.org/abs/2406.06525) (arXiv:2406.06525)

## Key Facts
- **Developers:** Peize Sun, Yi Jiang, Shoufa Chen et al. (HKU, ByteDance)
- **License:** MIT
- **GitHub:** https://github.com/FoundationVision/LlamaGen
- **Framework:** PyTorch >= 2.1.0
- **Project Page:** https://peizesun.github.io/llamagen/

## Architecture

### Two-Stage Pipeline
1. **VQ-VAE Tokenizer** — Compresses images to discrete token grids (16x16 or 32x32), codebook size 16384
2. **Autoregressive GPT** — Generates image tokens sequentially via next-token prediction, then VQ-VAE decoder reconstructs the image

### Model Scale Comparison (Class-conditional on ImageNet)
| Model | Params | Token Grid | FID@256 | Training |
|-------|--------|-----------|---------|----------|
| LlamaGen-B | 111M | 16x16 | 5.46 | DDP |
| LlamaGen-L | 343M | 24x24 | 3.07 | DDP |
| LlamaGen-XL | 775M | 24x24 | 2.62 | DDP |
| LlamaGen-XXL | 1.4B | 24x24 | 2.34 | FSDP |
| LlamaGen-3B | 3.1B | 24x24 | 2.18 | FSDP |

### Text-conditional Generation
- LlamaGen-XL (775M) trained on LAION COCO (50M images)
- Two-stage: 256px → 512px resolution

## Key Findings
- **AR > Diffusion:** Autoregressive models surpass diffusion when properly scaled
- **Scaling law:** FID improves monotonically with model size (111M → 3B)
- **Tokenizer quality:** Finer tokenization (ds8 vs ds16) significantly improves reconstruction
- **vLLM acceleration:** 300-400% inference speedup via vLLM serving

## Technical Details
- **Training strategy:** DDP for models ≤775M, FSDP for ≥1.4B
- **Serving:** vLLM integration for high-throughput inference
- **Demo:** Gradio-based web UI, HuggingFace Spaces
- **Requirements:** A100 GPUs, Linux, Python ≥3.7

## Related
- Contrasts with diffusion-based approaches like [[flux]] and [[stable-diffusion]]
- Uses VQ-VAE tokenization similar to [[disco-diffusion]] ecosystem
- vLLM serving enables production deployment
