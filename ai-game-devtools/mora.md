---
title: Mora
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, ai-model, open-source, diffusion, tool]
sources: [raw/articles/ai-game-devtools/mora.md]
---

# Mora

**Mora: Enabling Generalist Video Generation via A Multi-Agent Framework** — Open-source multi-agent framework for generalist video generation, designed to replicate and extend OpenAI Sora's capabilities. Paper arXiv:2403.13248 (March 2024), code released June 2024.

## Overview

Mora uses multiple visual AI agents in a collaborative pipeline to handle the full spectrum of video generation tasks — from text-to-video to video editing, extension, and digital world simulation. Each agent specializes in a different aspect (image generation, video generation, prompt enhancement, task planning).

## Architecture

```
Multi-Agent Pipeline:
  SoPGenerator (ProjectManager) → Task decomposition & planning
  ImageProducer (Text→Image)    → GeneratePrompt → GenerateImageWithTextAPI
  VideoProducer (Image→Video)   → GenerateImageWithText → GenerateVideoWithImage
  VideoProducerExtension        → Extend existing videos
  VideoProducerWithText         → Text-conditional image-to-video
```

### Key Components

| Component | Description |
|-----------|-------------|
| **Agent Layer** | Role-based agents (VideoProducer, ImageProducer, SoPGenerator) with react modes: `by_order` and `plan_and_act` |
| **Action Layer** | Pydantic-based Action classes with async `run()` — GenerateImageWithText (SDXL), GenerateVideoWithImage (SVD-XT), SEINE video diffusion |
| **LLM Integration** | 12+ providers: OpenAI, Anthropic, Ollama, Qianfan, DashScope, Moonshot, Mistral, Yi, etc. |
| **Message System** | Inter-agent message passing with content/image_content/caused_by fields |

### Model Stack

- **Image Generation**: Stable Diffusion XL base-1.0 + refiner-1.0, 576×1024, 40 steps (80/20 split)
- **Video Generation**: Stable Video Diffusion XT (stabilityai/stable-video-diffusion-img2vid-xt), iterative 3-round for longer videos
- **Video Diffusion**: SEINE (custom Gaussian diffusion + UNet + CLIP)
- **GPU Allocation**: cuda:1 for image models, cuda:2 for video models

## Supported Tasks

| Task | Capability | Demo Quality |
|------|-----------|-------------|
| Text-to-video | Text prompt → video | 1024×576, 12s+ |
| Image-to-video | Static image → animated video | 1024×576 |
| Extend video | Extend video duration | 80s total (Sora-comparable) |
| Video editing | Style/setting changes via text | 1920s car, space rainbow road |
| Connect videos | Seamless video joining | Transition generation |
| World simulation | Digital world physics simulation | Basic physics |

## Technical Details

- **Framework**: Python + PyTorch + diffusers
- **Agent Base**: Role/Action/Message pattern inspired by MetaGPT architecture
- **Config**: YAML-based LLM configuration with Pydantic validation
- **Multi-GPU**: Requires multiple GPUs (image on cuda:1, video on cuda:2)
- **License**: MIT (inferred from academic open-source pattern)

## Comparison with Sora

Mora matches Sora in video duration (80s) but has significant gaps in:
- Resolution
- Object consistency
- Motion smoothness

## Related Projects

- [[ai-game-devtools/cogvideox]] — THUDM's open-source video generation model family (2B/5B), Apache 2.0
- [[ai-game-devtools/hunyuan-video]] — Tencent's 13B+ parameter video generation model with Full Attention
- [[ai-game-devtools/gamegen-o]] — Tencent's open-world game video generation Transformer
- [[ai-game-devtools/ltx-video]] — Lightricks DiT video generation model, Apache 2.0
