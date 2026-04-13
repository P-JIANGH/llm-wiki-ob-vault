---
title: CoreNet
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, ml, tool, open-source]
sources: [raw/articles/ai-game-devtools/corenet.md]
---

# CoreNet

Apple's open-source library for training deep neural networks at scale. Evolved from CVNets, expanded beyond computer vision to cover foundation models including LLMs.

## Overview

CoreNet provides reproducible training recipes and pretrained model weights for Apple's published research. It supports a wide range of tasks: image classification, object detection, semantic segmentation, language modeling, multi-modal (CLIP-level), and audio classification.

## Key Models Built with CoreNet

| Model | Task | Description |
|-------|------|-------------|
| [[ai-game-devtools/aios|OpenELM]] | LLM | Efficient open language model family with open training/inference |
| KV Prediction | LLM Inference | Improves Time-to-First-Token using auxiliary transformer |
| CatLIP | Pre-training | CLIP-level accuracy with 2.7x faster pre-training |
| FastVit | Vision | Fast hybrid vision transformer with structural reparam |
| MobileViTv2 | Mobile Vision | Separable self-attention for mobile devices |
| MobileOne | Mobile Vision | One-millisecond mobile backbone |
| ByteFormer | Multi-modal | Transformers operating directly on file bytes |

## Architecture

```
corenet/
├── corenet/
│   ├── modeling/models/        # classification, detection, segmentation, language_modeling, multi_modal_img_text, audio_classification
│   ├── data/datasets/          # task-specific datasets
│   ├── loss_fn/               # loss functions per task
│   ├── optims/scheduler/      # optimizers and LR schedulers
│   └── engine/                # training pipelines, FSDP trainer, evaluation
├── projects/                   # training recipes per publication (yaml configs)
├── mlx_examples/              # Apple Silicon MLX examples
└── tutorials/                 # jupyter notebooks for CLIP, detection, segmentation, etc.
```

**Key design**: `@MODEL_REGISTRY.register(name="<model>", type="<task>")` decorator for model registration. YAML config files define training/evaluation pipelines.

## Training Infrastructure

- **FSDP** (Fully Sharded Data Parallel) for distributed training
- **Multi-node Slurm** support with `corenet-train` CLI
- `corenet-train --common.config-file <yaml> --ddp.rank <rank> --ddp.world-size <size>`

## Dependencies

- Python 3.10+ (Linux) / 3.9+ (macOS)
- PyTorch >= 2.1.0
- Git LFS (large model weights)
- Optional: libsox-dev, ffmpeg (audio/video)

## Relationship to Game Dev

CoreNet's foundation model implementations (CLIP, ViT, language models) serve as building blocks for game AI pipelines:

- **Multi-modal understanding**: CLIP-level image-text models for game asset tagging, NPC dialogue systems
- **Efficient mobile backbones**: MobileOne/MobileViT for on-device game AI
- **LLM training**: OpenELM family for NPC dialogue generation
- **KV Prediction**: Faster first-token for real-time LLM inference in games

## See Also

- [[ai-game-devtools/aios]] — AIOS, OS-level LLM infrastructure
- [[ai-game-devtools/ai-scientist]] — AI Scientist, LLM-driven scientific discovery
- [[ai-game-devtools/chatgpt-api-unity]] — Unity integration for LLM APIs
