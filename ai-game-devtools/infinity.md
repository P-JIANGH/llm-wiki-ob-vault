---
title: Infinity ∞ — FoundationVision
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, autoregressive, open-source, python]
sources: [raw/articles/ai-game-devtools/infinity.md]
---

# Infinity ∞ — FoundationVision

**Infinity** is a bitwise visual autoregressive framework for high-resolution, photorealistic image synthesis by **FoundationVision**. Published as CVPR 2025 Oral. Replaces conventional index-based AR prediction with bitwise token prediction, enabling theoretical scaling to infinite vocabulary sizes (2^64) while drastically reducing compute/memory overhead.

## Core Innovations

### Infinite-Vocabulary Tokenizer
Bitwise multi-scale residual quantizer enabling massive vocabularies (V_d = 2^32 or 2^64) with minimal memory footprint.

### Infinite-Vocabulary Classifier (IVC)
Predicts d bits instead of 2^d indices. Reduces parameters from **8.8T → 0.13M** (for d=32, h=2048) and provides stable supervision despite feature perturbations.

### Bitwise Self-Correction (BSC)
Mitigates teacher-forcing train-test discrepancy by enabling the transformer to recognize and correct its own mistakes, preventing error propagation.

## Performance

| Metric | Before | After Infinity |
|--------|--------|----------------|
| GenEval | 0.62 | **0.73** (2B), **0.79†** (8B) |
| ImageReward | 0.87 | **0.96** |
| Inference Speed (1024²) | ~2.1s (SD3) | **0.8s** (2.6× faster) |
| Win Rate | — | **66%** vs SD3/SDXL |

### Model Zoo
| Model | Vocab Size | GenEval (1024) | DPG | HPSv2.1 |
|---|---|---|---|---|
| Infinity-2B | 2^32 | 0.69 / 0.73† | 83.5 | 32.2 |
| Infinity-8B | 2^32 | **0.79†** | **86.6** | — |
| Infinity-20B | 2^64 | Coming Soon | — | — |

† With prompt rewriter

## Architecture & Tech Stack

- **PyTorch >= 2.5.1** — FlexAttention acceleration required
- **Tokenization**: Bitwise multi-scale residual quantizer
- **Classifier**: Bitwise output head (d bits per token vs 2^d softmax)
- **Training**: Auto-resume from checkpoint, supports 125M–2B models at 256–1024 resolution
- **Text Encoder**: google/flan-t5-xl
- **Docker**: One-click reproducible environment for inference

## Key Files
- `scripts/train.sh` — Training (125M/1B/2B, 256/512/1024)
- `scripts/eval.sh` — Benchmark evaluation (GenEval/ImageReward/HPSv2.1/FID)
- `tools/interactive_infer.ipynb` — 2B interactive notebook
- `tools/interactive_infer_8b.ipynb` — 8B interactive notebook
- `tools/reproduce.py` — Docker reproduction script
- `data/infinity_toy_data/` — Toy dataset for reference

## Licensing
Checkpoints on HuggingFace; see repo for specific terms.

## Game Dev Use Cases
- **High-res asset generation**: 1024×1024 images in 0.8s — suitable for game concept art, UI elements
- **Scaling potential**: 20B model promises even higher quality
- **ByteDance platform**: Live demo available for quick prototyping
- **Video generation**: InfinityStar extension supports text-to-video (Nov 2025)

## Links
- GitHub: https://github.com/FoundationVision/Infinity
- HuggingFace: https://huggingface.co/FoundationVision/infinity
- ByteDance Demo: https://opensource.bytedance.com/gmpt/t2i/invite
- Video (InfinityStar): https://github.com/FoundationVision/InfinityStar

## Relationships
- Part of [[ai-game-devtools/catalyst]] research lineage (FoundationVision/CVPR)
- Alternative approach to diffusion-based generators like [[ai-game-devtools/flux]] — uses autoregressive bitwise prediction instead of flow matching
- Complements [[ai-game-devtools/stable-diffusion-webui]] as a model that could be integrated into existing UI workflows
