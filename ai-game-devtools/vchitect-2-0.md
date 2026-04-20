---
title: Vchitect-2.0
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/vchitect-2-0.md]
---

# Vchitect-2.0

**Parallel Transformer for Scaling Up Video Diffusion Models**

## Overview

Vchitect-2.0 is an open-source Text-to-Video (T2V) diffusion model by the Vchitect team, introducing a Parallel Transformer architecture to efficiently scale video generation. The model has 2B parameters (Vchitect-XL-2B) and generates videos at 720×480 / 8fps base resolution, which can be upscaled to 2K / 24fps using the companion VEnhancer tool (not yet indexed in wiki).

## Architecture

- **Parallel Transformer** backbone for video diffusion — designed for efficient scaling
- **2B parameters** (XL-2B variant)
- Base output: 720×480 resolution, 8 fps
- Post-processing via VEnhancer for 2K upscaling + 24fps interpolation

## Key Features

- Text-to-Video generation with high visual quality
- Apache-2.0 license — free for academic research and commercial use
- HuggingFace integration: checkpoint + live demo available
- Companion tool VEnhancer for video enhancement pipeline

## Technical Details

- Custom operation optimizations (`op_replace.py`)
- Conda-based environment setup with CUDA-aware PyTorch
- Simple inference pipeline: download weights → configure → run

## Comparison with Related Models

Part of the broader T2V diffusion ecosystem alongside [[ai-game-devtools/hunyuan-video]], [[ai-game-devtools/cogvideox]], and [[ai-game-devtools/open-sora]]. The Parallel Transformer approach differs from the DiT (Diffusion Transformer) architecture used by most competitors, focusing on efficient scaling.

## Resources

- **GitHub:** https://github.com/Vchitect/Vchitect-2.0
- **HuggingFace Demo:** https://huggingface.co/spaces/Vchitect/Vchitect-2.0
- **Checkpoint:** https://huggingface.co/Vchitect/Vchitect-XL-2B
- **Paper:** arXiv:2501.08453

## License

Apache-2.0
