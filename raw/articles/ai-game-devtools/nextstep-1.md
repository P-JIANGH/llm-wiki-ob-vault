# NextStep-1: Toward Autoregressive Image Generation with Continuous Tokens at Scale

**Source:** https://github.com/stepfun-ai/NextStep-1
**License:** Apache 2.0
**Captured:** 2026-04-17

## Overview

NextStep-1 is a 14B-parameter autoregressive model by StepFun that generates images using continuous (not discrete/VQ) tokens. It jointly models sequences of discrete text tokens and continuous image tokens — using a standard LM head for text and a lightweight 157M-parameter flow matching head for visuals. This unified next-token prediction framework produces high-quality images without the lossy quantization of traditional VQ-based approaches.

## Key Facts

- **Parameters:** 14B (based on Qwen2.5-14B backbone)
- **Architecture:** Autoregressive LM + Flow Matching Head (157M params)
- **Tokenizer:** Continuous tokens via custom VAE (f8ch16 — 8x downsample, 16 channels)
- **Training Data:** ~1 billion images (proprietary, not open-sourced)
- **Resolution:** 256px pre-training → 512px fine-tuning
- **ICLR 2026 Oral Presentation**
- **arXiv:** 2508.10711

## Model Variants

| Model | Pretrain 256px | Pretrain 512px | Annealing | RL | Diversity | Fine-tunability |
|-------|---------------|---------------|----------|-----|----------|----------------|
| NextStep-1-f8ch16-Tokenizer | ❌ | ❌ | ❌ | ❌ | - | - |
| NextStep-1.1-Pretrain-256px | ✅ | ❌ | ❌ | ❌ | High | Easy |
| NextStep-1.1-Pretrain | ✅ | ✅ | ✅ | ❌ | Medium | Medium |
| NextStep-1.1 | ✅ | ✅ | ✅ | ✅ | Low | Hard |
| NextStep-1-Large-Pretrain | ✅ | ✅ | ✅ | ❌ | High | Medium |
| NextStep-1-Large | ✅ | ✅ | ✅ | ✅ | Low | Hard |
| NextStep-1-Large-Edit | ✅ | ✅ | ✅ | ✅ | Low | Hard |

## Architecture Details

### Dual-Head Design
- **Text Head:** Standard LM head from Qwen2.5 for discrete text token prediction
- **Image Head:** Flow Matching Head (SimpleMLPAdaLN, 157M params, 12 layers, dim=1536)
  - Uses adaptive LayerNorm (adaLN) modulation
  - ResBlock architecture with SiLU activation
  - Timestep embeddings for flow matching
  - ODE/SDE sampling with CFG support

### Patchification
- Images → VAE latents → patchified into continuous token sequences
- Patch size: configurable (default 1)
- Supports multiple aspect ratios via `hw_aspect_ratios_ids`

### Training Pipeline
1. **Pre-training 256px:** Base autoregressive training at 256px resolution
2. **Pre-training 512px:** Upscale resolution training
3. **Annealing:** Refinement phase
4. **RL Post-training:** Flow-based Reinforcement Learning (NextStep-1.1+)

## Technical Stack

- **Framework:** PyTorch + Transformers + Diffusers + DeepSpeed
- **Base Model:** Qwen2.5-14B
- **Config:** Hydra/OmegaConf
- **Distributed:** smartrun (auto-wraps torchrun)
- **Data:** WebDataset (Tar format), megfile
- **Monitoring:** W&B, TensorBoard
- **Data Preview:** Streamlit service

## CLI Tools

- `smartrun` — Intelligent distributed launcher (auto torchrun)
- `gen_meta` — Dataset metadata index generation
- `warmup_data` — Pre-warm/cached data indices
- `eshow` — Inspect/compare experiment configs
- `singlegpu_debug` / `multigpu_debug` — Debug with remote attachment

## Inference

- Standard inference via `python3 inference/inference.py`
- vLLM-Omni support for high-performance inference (NextStep-1.1)
- Supports text-to-image and image editing tasks
- CFG (classifier-free guidance) with optional normalization
- ODE/SDE solvers for sampling

## Capabilities

- **Text-to-Image:** High-quality image generation from text prompts
- **Image Editing:** Modify existing images with text instructions
- **Interleaved Generation:** Multi-image sequences with text interleaving
- **Aspect Ratio Control:** Multiple aspect ratio support

## Key Innovations

1. **Continuous Tokens:** Avoids VQ quantization loss, preserving full visual information
2. **Unified Next-Token Prediction:** Single framework for text + image generation
3. **Lightweight Image Head:** Only 157M params for image generation vs 14B for text
4. **Flow Matching:** Uses flow-based generative modeling instead of diffusion
5. **RL Post-training:** Flow-based RL improves output quality (NextStep-1.1)
