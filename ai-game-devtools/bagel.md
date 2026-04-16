---
title: BAGEL
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai-model, vlm, multimodal, image-generation, image-editing, world-modeling, open-source]
sources: [raw/articles/ai-game-devtools/bagel.md]
---

# BAGEL

## Overview
**BAGEL** (ByteDance-Seed) is an open-source unified multimodal foundation model with **7B active parameters (14B total)**, trained on large-scale interleaved multimodal data. It combines visual understanding, text-to-image generation, image editing, and world-modeling capabilities in a single model.

## Key Facts
- **Organization:** ByteDance Seed
- **Size:** 7B active / 14B total (MoT architecture)
- **License:** Apache 2.0
- **Paper:** arXiv:2505.14683
- **Demo:** demo.bagel-ai.org
- **Website:** bagel-ai.org

## Architecture
- **LLM Backbone:** Qwen2.5 (configurable, default 0.5B-Instruct for training)
- **Visual Encoder:** SigLIP-SO400M-14 with flash attention + NaViT (up to 70 patches/side)
- **VAE:** FLUX VAE for latent diffusion (2px per latent patch)
- **Layer Module:** Qwen2MoTDecoderLayer (Mixture-of-Transformers)
- **Training Strategy:** FSDP HYBRID_SHARD, FLEX token packing, EMA tracking (0.9999)
- **Unified Pipeline:** Single pretraining script handles VLM understanding + T2I generation + editing via interleaved multimodal data

## Benchmark Performance
### Visual Understanding
| Benchmark | BAGEL | Qwen2.5-VL-7B | Janus-Pro-7B |
|---|---|---|---|
| MME | **2388** | 2347 | - |
| MMBench | **85.0** | 83.5 | 79.2 |
| MM-Vet | **67.2** | 67.1 | 50.0 |
| MathVista | **73.1** | 68.2 | - |

### Text-to-Image
| Benchmark | BAGEL | BAGEL+CoT | FLUX-1-dev | SD3 |
|---|---|---|---|---|
| GenEval | 0.82 | **0.88** | 0.82 | 0.74 |
| WISE | 0.52 | **0.70** | 0.50 | - |

### Image Editing
- GEdit-Bench: Silver/Bronze across SC/PQ/O dimensions
- IntelligentBench: 44.0 (vs GPT-4o 78.9)
- BAGEL+CoT reaches Bronze on KISE-Bench (60.18) and RISEBench (11.9)

## Related Projects
- Similar unified multimodal approach to [[ai-game-devtools/janus]] (DeepSeek's unified understanding+generation model)
- Uses Qwen2.5 backbone like [[ai-game-devtools/qwen2.5-coder]] but for multimodal tasks
- ByteDance ecosystem connection to [[ai-game-devtools/seed-oss]] (ByteDance's 36B LLM)
- Competes with [[ai-game-devtools/llava-onevision]] in VLM understanding benchmarks
