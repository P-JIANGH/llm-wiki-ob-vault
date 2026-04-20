---
title: Janus — DeepSeek Unified Multimodal Model
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [multimodal, vlm, image-generation, deepseek, open-source]
sources: [raw/articles/ai-game-devtools/janus.md]
---

# Janus — DeepSeek Unified Multimodal Understanding and Generation

## Overview

Janus is DeepSeek's family of unified multimodal models that simultaneously handle visual understanding (VLM) and text-to-image generation in a single autoregressive framework. Three variants exist: **Janus** (original 1.3B), **JanusFlow** (rectified flow variant 1.3B), and **Janus-Pro** (advanced, 1B/7B). The key innovation is **decoupled visual encoding** — separate vision encoders for understanding vs. generation tasks — processed through a single unified transformer backbone.

[[ai-game-devtools/deepseek-r1]] | [[ai-game-devtools/deepseek-v3]]

## Variants

### Janus (Oct 2024)
- 1.3B parameters, 4096 seq length
- Decoupled visual encoding: SigLIP/ViT encoder for understanding, VQ model for generation
- Single autoregressive LLM handles both modalities
- Paper: [arXiv:2410.13848](https://arxiv.org/abs/2410.13848)

### JanusFlow (Nov 2024)
- 1.3B parameters
- Integrates **rectified flow** (ODE-based image generation) directly into LLM framework
- No complex architectural modifications needed
- Uses SDXL VAE for decoding
- Paper: [arXiv:2411.07975](https://arxiv.org/abs/2411.07975)

### Janus-Pro (Jan 2025)
- 1B and 7B parameter variants
- Optimized training strategy + expanded training data + model scaling
- Significant improvements in multimodal understanding and text-to-image instruction-following
- Enhanced generation stability
- Paper: [janus_pro_tech_report.pdf](https://github.com/deepseek-ai/Janus/blob/main/janus_pro_tech_report.pdf)

## Architecture

```
User Input (text + optional image)
        │
        ▼
┌───────────────────────────────┐
│  Vision Encoder (understanding) │ ← SigLIP ViT
│  Vision Encoder (generation)   │ ← VQ model / Vision-Gen-Enc
│  (decoupled pathways)          │
└───────────────┬───────────────┘
                │ image embeddings
                ▼
┌───────────────────────────────┐
│   Unified Transformer LLM     │ ← DeepSeek-style autoregressive
│   (language_model)             │
└───────────────┬───────────────┘
                │
        ┌───────┴───────┐
        ▼               ▼
  Text Output     Image Tokens
  (understanding) (generation)
        │               │
        ▼               ▼
  Response      VQ Decode / VAE Decode → Image
```

**Key insight:** Decoupling visual encoding paths eliminates the conflict between the visual encoder's dual roles in understanding vs. generation, while a single transformer handles both.

## Multimodal Understanding Capabilities

- Image captioning and VQA
- Document/figure understanding
- Code generation from visual input
- Instruction following

## Text-to-Image Generation

- Natural language to image synthesis
- CFG (Classifier-Free Guidance) for quality
- Parallel sampling (up to 16 images)
- 384×384 output resolution (Janus/JanusPro), 48×48 latent → SDXL VAE (JanusFlow)

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | PyTorch + HuggingFace Transformers |
| Vision Encoders | SigLIP ViT, CLIP |
| Quantization | Custom VQ model |
| Generation | Rectified flow (JanusFlow) |
| VAE | Stable Diffusion XL VAE |
| Demos | Gradio, FastAPI |

## Models

| Model | Params | Use Case |
|-------|--------|----------|
| Janus-1.3B | 1.3B | Lightweight unified multimodal |
| JanusFlow-1.3B | 1.3B | Rectified flow image generation |
| Janus-Pro-1B | 1B | Advanced lightweight |
| Janus-Pro-7B | 7B | Full-scale advanced |

Available on [HuggingFace](https://huggingface.co/deepseek-ai): `deepseek-ai/Janus-1.3B`, `deepseek-ai/JanusFlow-1.3B`, `deepseek-ai/Janus-Pro-1B`, `deepseek-ai/Janus-Pro-7B`

## Game Dev Relevance

Janus-Pro's simultaneous image understanding + generation capabilities make it relevant for:
- **Game asset generation**: Text-to-texture/sprite synthesis
- **UI/UX prototyping**: Rapid visual mockups from descriptions
- **Procedural content**: NPC appearance generation from text descriptions
- **Game agent vision**: Unified perception + generation in NPC AI systems

Unlike [[ai-game-devtools/imagebind]] (which focuses on zero-shot cross-modal retrieval across 6 modalities), Janus focuses on **unified understanding + generation** in a single model.

## License

- **Code:** MIT License
- **Model:** DeepSeek Model Agreement (permitted for commercial use under terms)

## Related

- [[ai-game-devtools/deepseek-r1]] — DeepSeek reasoning model
- [[ai-game-devtools/deepseek-v3]] — DeepSeek base LLM
- [[ai-game-devtools/imagebind]] — Meta's multimodal embedding model
- [[ai-game-devtools/internlm-xcomposer]] — Another multimodal LVLM from Shanghai AI Lab
