---
title: ID-Animator
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [video, avatar, open-source, diffusion, animation]
sources: [raw/articles/ai-game-devtools/id-animator.md]
---

# ID-Animator

Zero-shot ID-Preserving Human Video Generation framework. Generates high-quality identity-specific human videos from a single reference facial image without finetuning.

**Paper:** [arXiv:2404.15275](https://arxiv.org/abs/2404.15275) | [Project Page](https://id-animator.github.io/) | [HuggingFace Demo](https://huggingface.co/spaces/ID-Animator/ID-Animator)

## Overview

ID-Animator solves the identity preservation problem in video generation. Existing methods either require per-person finetuning (slow, impractical) or lose facial identity details during video generation. ID-Animator uses a **Face Adapter** that injects identity-relevant embeddings into a diffusion-based video generation backbone, enabling zero-shot personalized video generation.

## Architecture

| Component | Technology | Role |
|-----------|-----------|------|
| Backbone | AnimateDiff UNet3D + SD 1.5 | Temporal video generation |
| Face Encoder | CLIP Vision (CLIPVisionModelWithProjection) | Extract facial embeddings |
| Projection | Resampler (4 layers, 12 heads, 16 tokens) | Map face embeds to cross-attention space |
| Attention | LoRAFaceAttnProcessor (rank=128) | Inject identity into cross-attention layers |
| Face Detection | insightface (buffalo_l) | Detect & align reference face |
| Scheduler | DDIM (30 steps) | Denoising process |

### Inference Pipeline
1. Detect & align face from reference image (insightface)
2. Encode face via CLIP Vision → extract hidden states
3. Resampler projects to 16 learnable tokens (1024-dim each)
4. Tokens concatenated with text prompt embeddings
5. AnimateDiff UNet3D generates 16-frame video (512×512)

## Key Features

- **Zero-shot**: No finetuning needed — works with any face from a single image
- **Identity Mixing**: Average embeddings from 2+ reference faces to create blended identities
- **ControlNet Compatible**: Combine with sketch/pose control for structured generation
- **Community Model Support**: Works with RealisticVision, AnimateDiff, and other SD-based models
- **Video Editing**: Supports video_latents input for identity-preserving video editing

## Technical Details

- **Output**: 512×512 resolution, 16 frames (~0.5s at 30fps)
- **Guidance Scale**: 8 (CFG)
- **Face Token Count**: 16 learnable tokens per reference image
- **Identity Mixing**: Simple averaging of prompt embeddings from multiple faces
- **Training**: Random face reference method with decoupled attribute+action captioning

## Comparison with Related Tools

| Tool | Task | ID Preservation | Training | Video |
|------|------|----------------|----------|-------|
| ID-Animator | Video generation | Face adapter (zero-shot) | Pre-trained | Yes |
| [[aniportrait]] | Portrait animation | Audio-driven | Pre-trained | Yes |
| [[animatediff]] | General video gen | No (text-only) | Pre-trained | Yes |
| [[liveportrait]] | Portrait animation | Face landmark-driven | Pre-trained | Yes |

## Links

- GitHub: https://github.com/ID-Animator/ID-Animator
- Paper: https://arxiv.org/abs/2404.15275
- Demo: https://huggingface.co/spaces/ID-Animator/ID-Animator
- Weights: https://huggingface.co/ID-Animator/ID-Animator

## Roadmap

- [x] Checkpoints + inference scripts released
- [ ] Dataset + training scripts
- [ ] SDXL version
