---
title: VideoMamba
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, ml, agent, tool, video, vlm, state-space-model, open-source]
sources: [raw/articles/ai-game-devtools/video-mamba.md]
---

# VideoMamba

**URL:** https://github.com/OpenGVLab/VideoMamba | **HF:** https://huggingface.co/OpenGVLab/VideoMamba | **Paper:** arXiv:2403.06977
**License:** Apache 2.0
**Authors:** Kunchang Li, Xinhao Li, Yi Wang, Yinan He, Yali Wang, Limin Wang, Yu Qiao (OpenGVLab / Shanghai AI Lab)

## Overview

VideoMamba adapts the Mamba State Space Model (SSM) — a selective state space model with linear-complexity sequence modeling — to video understanding. It addresses the dual challenges of **local redundancy** (repeated frames/spatial content) and **global dependencies** (long-range temporal relations) in video understanding.

Published March 2024.

## Key Innovation

Unlike 3D convolution networks (high computational cost for long videos) or video transformers (quadratic complexity), VideoMamba uses the **Mamba SSM operator** which achieves O(n) linear complexity. This enables:

- Efficient processing of high-resolution long videos
- No need for extensive dataset pretraining (via novel self-distillation)
- Superior long-term video modeling

## Architecture

```
videomamba/
├── image_sm/       # Image classification (ImageNet-1K pretraining + large resolution fine-tuning)
├── video_sm/       # Single-modality video tasks
│   ├── Masked Pretraining (CLIP teacher distillation)
│   ├── Short-term: K400, SthSthV2
│   └── Long-term: Breakfast, COIN, LVU
└── video_mm/       # Multi-modality (video-text retrieval)
    ├── Masked pretraining (WebVid)
    └── Zero-shot evaluation (MSRVTT)
```

Core dependencies:
- `mamba/` — Mamba SSM (`mamba_ssm` module, Selective State Space Model)
- `causal-conv1d/` — Causal 1D convolution (required by Mamba)
- Built on UniFormer, Unmasked Teacher, Vim

## Four Core Abilities

1. **Scalable** — Self-distillation enables visual domain scaling without large pretraining datasets
2. **Short-term Sensitive** — Fine-grained motion differences in actions (e.g., K400, SthSthV2)
3. **Long-term Superior** — Linear complexity makes high-resolution long video understanding tractable
4. **Multi-modal Compatible** — Video-text retrieval with CLIP teacher guidance

## Capabilities vs. Alternatives

| Feature | VideoMamba | [[video-llava]] | [[video-ccam]] | [[videollama2]] |
|---------|-----------|----------------------------------|----------------------------------|------------------------------------|
| Complexity | O(n) linear (SSM) | Transformer | Transformer | Transformer |
| Long video | Excellent (linear cost) | Limited | Limited | Moderate |
| Multi-modal | Video-text retrieval | Image+Video | Video-language | Video+Audio |
| License | Apache 2.0 | MIT | Apache 2.0 | Apache 2.0 |

## Game Dev Relevance

Video understanding is critical for:
- **NPC behavior analysis** from recorded gameplay footage
- **Gameplay video captioning / commentary generation**
- **Video-based game state inference** for AI game testing
- **Long-form game demo/stream understanding** for AI-assisted game design review
- Combines well with [[video-agent]] (ECCV 2024 memory-augmented video Agent)

## See Also

- [[videollama2]] — DAMO-NLP-SG video-language MLLM, Transformer-based alternative
- [[video-llava]] — PKU-YuanGroup unified image+video VLM
- [[video-ccam]] — Tencent causal cross-attention video model
- [[video-agent]] — Memory-augmented multimodal Agent for video Q&A
- [[lumina-t2x]] — OpenGVLab multi-modal DiT framework (same lab as VideoMamba)
