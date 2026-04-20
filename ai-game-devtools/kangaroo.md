---
title: Kangaroo
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, video-understanding, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/kangaroo.md]
---

# Kangaroo

A powerful **8B parameter Video-Language Model (Video LMM)** developed by KangarooGroup, capable of processing long videos up to 160 frames (22k tokens). Achieves SOTA performance among open-source models on multiple video understanding benchmarks.

## Overview

Kangaroo extends Large Language Models to video modality, addressing two key challenges:
1. **Insufficient training data** — solved via a data curation system for high-quality vision-language annotations
2. **Excessive visual feature compression** — solved via curriculum training with gradually increasing resolution and frame count

Supports bilingual Chinese/English conversation and single/multi-round dialogue paradigms.

## Key Facts

| Property | Value |
|----------|-------|
| Parameters | 8B |
| Max Frames | 160 frames per video |
| Max Sequence | ~22k tokens |
| Languages | Chinese, English, bilingual |
| License | Apache 2.0 (presumed, per paper) |
| HuggingFace | `KangarooGroup/kangaroo` |

## Architecture

- **Backbone:** LLM-based vision-language model (specific architecture details in [arXiv paper](https://arxiv.org/pdf/2408.15542))
- **Training Pipeline:** Curriculum training — gradually increases resolution and number of input frames to handle long videos
- **Data Curation:** Custom pipeline for generating captions on open-source and internal videos, constructing video instruction-tuning datasets

## Benchmarks

Kangaroo achieves SOTA among open-source models on multiple benchmarks:

| Benchmark | Performance |
|-----------|-------------|
| **Video-MME** | Outperforms most 10B+ parameter models; SOTA among 7B/8B |
| **VideoVista** | SOTA among open-source models |
| **LongVideoBench** | Better than all existing open-source methods |
| **SeedBench-Video** | Competitive results |

## Tech Stack

- PyTorch 2.1.1 / torchvision 0.16.1
- Transformers 4.41.0
- Decord (video loading)
- timm (vision backbones)
- xformers
- flash-attn
- Streamlit 1.36.0 (web UI demo)

## Deployment

### Web UI (Streamlit)
```bash
streamlit run streamlit_app.py --server.port PORT
```

### HuggingFace Transformers
```python
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("KangarooGroup/kangaroo")
model = AutoModelForCausalLM.from_pretrained("KangarooGroup/kangaroo", torch_dtype=torch.bfloat16, trust_remote_code=True)
model.to("cuda")
```

## Comparison with Related VLM Video Models

- **vs [[ai-game-devtools/cambrian-1]]:** Cambrian-1 focuses on fixed 576 visual tokens with SVA aggregator; Kangaroo handles up to 160 frames for long-video understanding
- **vs [[ai-game-devtools/video-llava]]:** Video-LLaVA uses Alignment Before Projection for unified image+video; Kangaroo is specialized for long-video with curriculum training
- **vs [[ai-game-devtools/cogvlm2]]:** CogVLM2 targets image+video understanding with DocVQA SOTA; Kangaroo is purpose-built for long-form video benchmarks

## Related Links

- GitHub: https://github.com/KangarooGroup/Kangaroo
- HuggingFace: https://huggingface.co/KangarooGroup/kangaroo
- Paper: https://arxiv.org/pdf/2408.15542
- Blog: https://kangaroogroup.github.io/Kangaroo.github.io/
