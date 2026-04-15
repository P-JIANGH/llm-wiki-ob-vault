---
title: ShareGPT4V
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, model, open-source, captioning, dataset]
sources: [raw/articles/ai-game-devtools/sharegpt4v.md]
---

# ShareGPT4V

Improving Large Multi-modal Models with Better Captions — ECCV 2024.

## Overview

ShareGPT4V is a large-scale **highly descriptive image captioning dataset** and a family of 7B/13B large multimodal models (LMMs) built on LLaVA architecture. The core insight: GPT4-Vision-generated captions dramatically improve LMM training compared to existing datasets. The project provides both the dataset (100K GPT4V + 1.2M GPT4V-processed via ShareCaptioner) and trained models.

## Architecture

- **Base codebase**: LLaVA
- **LLM**: Vicuna-7B / Vicuna-13B
- **Vision Encoder**: CLIP-L-336px fine-tuned L12
- **Projector**: MLP-2x (two-layer MLP)
- **Training**: Two-stage — (1) feature alignment pretraining on 1.2M ShareGPT4V-PT pairs, (2) visual instruction tuning on ShareGPT4V-SFT (665K+23K)

## Models

| Model | Params | LLaVA-Bench-Wild | MME-perception | MM-Vet | VQA-v2 |
|-------|--------|-----------------|----------------|--------|--------|
| ShareGPT4V-7B | 7B | 72.6 | 1567.4 | 37.6 | 80.6 |
| ShareGPT4V-13B | 13B | 79.9 | 1618.7 | 43.1 | 81.0 |

Pretrained vision encoders and projector+LLM weights also available separately for custom fine-tuning.

## Key Capabilities

- **ShareCaptioner**: General image captioner approaching GPT4-Vision caption quality. Can batch-generate high-quality captions for any image dataset at scale (`tools/share-cap_batch_infer.py`).
- **Visual instruction following**: ShareGPT4V-7B/13B models follow multimodal instructions like GPT4V.
- **Local demo**: `python tools/app.py` launches a Gradio chat interface.

## Training Cost

- Pretraining: 16× A100-80G, ~12 hours
- Finetuning: 16× A100-80G, ~7 hours

## Related Links

- Paper: https://arxiv.org/pdf/2311.12793
- HuggingFace: [ShareGPT4V-7B](https://huggingface.co/Lin-Chen/ShareGPT4V-7B), [ShareCaptioner](https://huggingface.co/Lin-Chen/ShareCaptioner)
- Dataset: https://huggingface.co/datasets/Lin-Chen/ShareGPT4V

## Related Models

Shares lineage with [[LLaVA-OneVision]] (successor architecture) and [[CogVLM2]] (concurrent VLM work). Both are LLaVA-style LMMs with CLIP vision encoders — ShareGPT4V's contribution is specifically the **caption quality improvement** via GPT4V data. See also [[MiniGPT-4]] for a lighter-weight vision-language alignment approach.
