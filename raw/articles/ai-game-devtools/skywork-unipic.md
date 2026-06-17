# SkyworkUniPic — Raw Source

**Source:** https://github.com/SkyworkAI/UniPic
**Extracted:** 2026-04-17 (web extract; GitHub/gitcode/gitee clone all failed)
**License:** MIT

## Overview

Skywork UniPic is an open-source SOTA multi-image editing model from SkyworkAI.
It provides a unified multimodal framework for image editing, generation, and understanding,
hosting official implementations and model weights across three distinct modeling paradigms.

## Model Variants

### UniPic-3 (Latest)
- Open-source SOTA Multi-Image Editing Model
- Unified framework for single-image editing & multi-image composition
- Supports 1–6 input images with flexible resolutions
- 8-steps inference with 12.5× speedup via CM + DMD distillation
- Architecture: Diffusion-based with CM + DMD distillation
- arXiv: 2601.15664
- HuggingFace: https://huggingface.co/collections/Skywork/skywork-unipic3

### UniPic-2
- SD3.5M-Kontext and MetaQuery variants
- Based on Efficient Architectures with Diffusion Post-Training
- Capabilities: Text-to-image, fine-grained editing, multimodal reasoning
- Architecture: Diffusion post-training on efficient backbones
- arXiv: 2509.04548
- HuggingFace: https://huggingface.co/collections/Skywork/skywork-unipic2-6899b9e1b038b24674d996fd

### UniPic-1
- 1.5B parameters
- Unified Autoregressive Modeling for joint visual understanding and generation
- Single transformer handles both perception and synthesis tasks
- Architecture: Autoregressive Transformer
- arXiv: 2508.03320
- HuggingFace: https://huggingface.co/collections/Skywork/skywork-unipic-6888c0789cdb82457b2acf32

## Release Timeline
- 2026-01-09: UniPic-3 released — Multi-image editing, 1–6 inputs, 8-step / 12.5× faster
- 2025-08-13: UniPic-2 released — Diffusion-based Post-Training
- 2025-07-30: UniPic-1 released — Autoregressive unified modeling

## Key Technical Highlights
- Multi-Modal Unification: Single ecosystem covering editing, generation, and visual understanding
- Inference Optimization: CM + DMD distillation enables rapid 8-step generation with 12.5× throughput improvement
- Flexible Input Handling: Concurrent processing of up to 6 images with adaptive resolution scaling
- Dual Paradigm Support: Both Diffusion-based (UniPic-2/3) and Autoregressive (UniPic-1) architectures
- Open-Source Weights: Full model weights, configs, and official training/inference code per variant

## Repository Structure
- UniPic-1/ — Autoregressive model (1.5B)
- UniPic-2/ — Diffusion post-training variants
- UniPic-3/ — Multi-image editing & distillation
- LICENSE — MIT License
- README.md — Project documentation
