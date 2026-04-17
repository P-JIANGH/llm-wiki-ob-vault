# Infinity ∞ — FoundationVision

**Source:** https://github.com/FoundationVision/Infinity
**Fetched:** 2026-04-17 (web_extract; GitHub/gitcode/gitee clone all failed due to network timeout in WSL)
**License:** See repo
**Conference:** CVPR 2025 Oral

## Overview

Infinity is a bitwise visual autoregressive framework for high-resolution, photorealistic image synthesis. It replaces conventional index-based prediction with a bitwise token prediction framework, enabling theoretical scaling to infinite vocabulary sizes while drastically reducing compute/memory overhead.

## Core Innovations

### Infinite-Vocabulary Tokenizer
- Bitwise multi-scale residual quantizer enabling massive vocabularies (e.g., V_d = 2^32 or 2^64)
- Minimal memory footprint

### Infinite-Vocabulary Classifier (IVC)
- Predicts d bits instead of 2^d indices
- Reduces parameters from 8.8T → 0.13M (for d=32, h=2048)
- Provides stable supervision despite feature perturbations

### Bitwise Self-Correction (BSC)
- Mitigates teacher-forcing train-test discrepancy
- Enables transformer to recognize and correct its own mistakes
- Prevents error propagation/amplification

## Performance Benchmarks

Autoregressive text-to-image model outperforming top diffusion models (SD3-Medium, SDXL):
- **GenEval:** 0.62 → 0.73
- **ImageReward:** 0.87 → 0.96
- **Win Rate:** 66%
- **Inference Speed:** 1024×1024 image in 0.8s (2.6× faster than SD3-Medium)

## Model Zoo

### Visual Tokenizers
| Vocabulary | IN-512 rFID ↓ | IN-512 PSNR ↑ |
|---|---|---|
| V_d=2^16 | 0.31 | 22.6 |
| V_d=2^32 | 0.23 | 24.4 |
| V_d=2^64 | 0.15 | 26.4 |

### Generative Models
| Model | Resolution | GenEval | DPG | HPSv2.1 |
|---|---|---|---|---|
| Infinity-2B | 1024 | 0.69/0.73† | 83.5 | 32.2 |
| Infinity-8B | 1024 | 0.79† | 86.6 | - |
| Infinity-20B | 1024 | Coming Soon | - | - |

† Tested with prompt rewriter

## Installation
- Requires PyTorch >= 2.5.1 (for FlexAttention acceleration)
- Dependencies: pip install -r requirements.txt
- Text Encoder: google/flan-t5-xl

## Data Format
Dataset uses JSONL files grouped by aspect ratio. Required fields:
- image_path (required)
- h_div_w (required, float)
- long_caption (required)
- long_caption_type (required, InternVL 2.0)
- text (optional)
- short_caption_type (optional)

## Training
- Supports model sizes {125M, 1B, 2B} and resolutions {256, 512, 1024}
- Auto-resumes from last checkpoint
- Fine-tuning via --rush_resume=[checkpoint.pth]

## Key Files
- scripts/train.sh — Training script
- scripts/eval.sh — Benchmark evaluation
- tools/interactive_infer.ipynb — 2B interactive inference
- tools/interactive_infer_8b.ipynb — 8B interactive inference
- tools/reproduce.py — Docker-based reproduction
- tools/prompt_rewriter.py — Prompt rewriting for evaluation

## Links
- GitHub: https://github.com/FoundationVision/Infinity
- HuggingFace: https://huggingface.co/FoundationVision/infinity
- ByteDance Demo: https://opensource.bytedance.com/gmpt/t2i/invite
- Video extension: https://github.com/FoundationVision/InfinityStar

## Timeline
- Jun 24, 2025: Infinity image generation released
- Nov 7, 2025: Text-to-Video generation released (InfinityStar)
