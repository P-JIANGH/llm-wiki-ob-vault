---
title: LongVA
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, model, open-source, long-context]
sources: [raw/articles/ai-game-devtools/longva.md]
---

# LongVA

> Long Context Transfer from Language to Vision

## Overview

**LongVA** (Long Vision Assistant) is a large multimodal model (LMM) developed by S-Lab at Nanyang Technological University (NTU), led by researchers including Ziwei Liu. Its core innovation: **long context capability zero-shot transfers from language to vision** — techniques for extending LLM context windows (YaRN, sparse attention) are applied to visual token sequences, enabling processing of up to 2000 frames or 200K+ visual tokens. Released 2024-06-24, it achieves SOTA on Video-MME among 7B models.

## Key Facts

| Property | Value |
|----------|-------|
| **Release** | 2024-06-24 |
| **Paper** | arXiv:2406.16852 |
| **License** | S-Lab License 1.0 (non-commercial) |
| **HF Models** | [LongVA-7B-DPO](https://huggingface.co/lmms-lab/LongVA-7B-DPO), [LongVA-7B](https://huggingface.co/lmms-lab/LongVA-7B) |
| **Demo** | [longva-demo.lmms-lab.com](https://longva-demo.lmms-lab.com) |
| **Blog** | [lmms-lab.github.io/posts/longva/](https://lmms-lab.github.io/posts/longva/) |

## Architecture

Built on [[LLaVA-NeXT]] architecture with Qwen2-7B as the language backbone:

- **Vision Encoder**: CLIP-ViT (L/14 variant, following LLaVA-NeXT convention)
- **Language Model**: Qwen2-7B-Instruct with text context extended to 224K tokens
- **Multimodal Projector**: 2-layer MLP connecting vision encoder to LLM
- **Multimodal Resampler**: Perceiver Resampler for temporal/spatial vision modeling
- **Key innovation**: Text context extension techniques (YaRN/sparse attention) applied to vision tokens

### Core Modules

| Module | Path | Purpose |
|--------|------|---------|
| `llava_arch.py` | `longva/model/` | Base LlavaArchitecture class |
| `llava_qwen.py` | `longva/model/language_model/` | Qwen2 + vision integration |
| `multimodal_projector/` | `longva/model/` | Vision-language projection |
| `multimodal_encoder/` | `longva/model/` | CLIP vision encoder |
| `multimodal_resampler/` | `longva/model/` | Perceiver Resampler |
| `builder.py` | `longva/model/` | `load_pretrained_model()` entry point |

## Performance

- **Video-MME**: SOTA among 7B models
- Processes **2000 frames** or **200K+ visual tokens** in a single forward pass
- DPO-trained version (LongVA-7B-DPO) available for better instruction following

## Key Capabilities

1. **Long Video Understanding**: Needle-in-a-haystack evaluation (V-NIAH) on 1h+ movies — tests retrieval across thousands of frames
2. **High-Frame-Count Inference**: Up to 2000 uniformly-sampled video frames with decord backend
3. **Image Understanding**: Standard image inputs with detailed captioning/QA
4. **Zero-Shot Transfer**: Text context extension techniques transfer directly to vision domain

## Evaluation

- **lmms-eval** framework (EvolvingLMMs-Lab): Image tasks (MME) and video tasks (Video-MME)
- **V-NIAH** (Vision Needle-in-a-Haystack): Generation and PPL-based evaluation on long video
- **Text NIAH**: Separate text-only needle evaluation for language context

## Inference

```python
from longva.model.builder import load_pretrained_model
from longva.mm_utils import tokenizer_image_token, process_images

model_path = "lmms-lab/LongVA-7B-DPO"
tokenizer, model, image_processor, _ = load_pretrained_model(
    model_path, None, "llava_qwen", device_map="cuda:0"
)
# Supports image + video input up to 2000 frames
```

## Training

- **Vision-Text Alignment**: Training code released; data from LLaVA-NeXT-Data (`lmms-lab/LLaVA-NeXT-Data`)
- **Text Context Extension**: ~2 days on 8x A100 GPUs
- Extended Qwen2-7B-224K available at `lmms-lab/Qwen2-7B-Instrcuct-224K`

## Related Models

| Model | Relationship |
|-------|-------------|
| [[LLaVA-NeXT]] | Base architecture foundation |
| [[Cambrian-1]] | Also VLM from academic lab; different vision encoder approach |
| [[Qwen-VL]] | Shares Qwen2 LLM backbone; different multimodal architecture |
| lmms-eval | Evaluation framework from same lab |

## Comparison to Related VLMs

| Feature | LongVA | LLaVA-NeXT | Qwen-VL |
|---------|--------|------------|---------|
| Max visual tokens | 200K+ | ~2880 | ~80K |
| Max frames | 2000 | ~32 | ~64 |
| Base LLM | Qwen2-7B | Vicuna/Llama3 | Qwen-VL |
| Context transfer | Yes (key innovation) | No | Partial |
| License | S-Lab 1.0 | Apache 2.0 | Tongyi Qianwen |

## Dependencies

`torch==2.1.2`, `transformers` (modified HF fork), `accelerate==0.28.0`, `decord` (video), `open_clip_torch`, `deepspeed==0.14.0`, `peft`, `wandb`, `gradio==4.29.0`

## Why It Matters for Game Dev

LongVA's ability to process thousands of frames makes it suitable for:
- **Gameplay video understanding**: Analyze long gameplay sessions for AI agent training
- **Cinematic cutscene understanding**: Process full game narratives
- **Training data curation**: Extract information from hours of recorded gameplay for RLHF
- **NPC vision systems**: Enable game NPCs to "remember" long visual sequences

Unlike most VLMs limited to ~32-64 frames, LongVA's 2000-frame capacity is closer to what games need for meaningful visual understanding.
