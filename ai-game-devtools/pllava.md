---
title: PLLaVA
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, vlm, video, model, architecture]
sources: [raw/articles/ai-game-devtools/pllava.md]
---

# PLLaVA

**PLLaVA** (Pooling LLaVA) is a parameter-free LLaVA extension that adapts image-language pretrained models for video understanding via temporal pooling, achieving SOTA on Video ChatGPT benchmark (3.48/5, +0.31 over GPT4V) and MVBench (58.1%, +14.5% over GPT4V).

## Overview

Developed by researchers at **National University of Singapore**, PLLaVA addresses a key problem in video-language models: directly fine-tuning image-pretrained models with multiple video frames causes performance saturation and prompt vulnerability due to **dominant patches** that overwhelm the temporal dimension.

The solution is a simple **temporal pooling strategy** that smooths feature distribution across time, reducing the impact of extreme tokens without requiring full model retraining.

## Key Facts

| | |
|---|---|
| **Authors** | Lin Xu, Yilin Zhao, Daquan Zhou, Zhijie Lin, See-Kiong Ng, Jiashi Feng |
| **Institution** | National University of Singapore |
| **Released** | April 2024 |
| **arXiv** | [2404.16994](https://arxiv.org/abs/2404.16994) |
| **License** | Research use (LLaVA/Vicuna base) |
| **Framework** | transformers + accelerate |

## Models

| Model | Base Model | Parameters | HuggingFace |
|-------|-----------|------------|-------------|
| PLLaVA-7B | LLaVA-v1.6-Vicuna-7B | 7B | [ermu2001/pllava-7b](https://huggingface.co/ermu2001/pllava-7b) |
| PLLaVA-13B | LLaVA-v1.6-Vicuna-13B | 13B | [ermu2001/pllava-13b](https://huggingface.co/ermu2001/pllava-13b) |
| PLLaVA-34B | LLaVA-v1.6-34B | 34B | [ermu2001/pllava-34b](https://huggingface.co/ermu2001/pllava-34b) |

## Core Innovation: Temporal Pooling

**Problem:** When fine-tuning image-language models (e.g. LLaVA) with multiple video frames:
1. Performance saturates or drops on captioning tasks
2. Model becomes vulnerable to prompt variations
3. Outputs tend to be short descriptions

**Root Cause:** Some video patches contain dominant visual features that overpower temporal information during training.

**Solution:** Reduce spatial dimension with larger temporal pooling window — empirically more effective than reducing temporal dimension directly. This smooths the feature distribution across time and reduces the impact of dominant tokens.

Training only trains LoRA adapters + projector weights (parameter-efficient).

## Performance

### Video ChatGPT Benchmark
- **Score: 3.48/5** (average of 5 dimensions)
- New SOTA, **+0.31** over previous best (GPT4V / IG-VLM)

### MVBench (20 sub-tasks)
- **58.1% accuracy** average
- **+14.5%** over GPT4V (IG-VLM)

Benchmarks: ActivityNet QA, MSRVTT QA, MSVD QA, TGIF-QA, video captioning (multiple tasks).

## Architecture

- **Base:** [[LLaVA]] (image-language pretrained model from Haotian Liu)
- **Training data:** Based on [[Video-LLaVA]] / VideoChat2 instruction tuning data
- **Framework:** HuggingFace `transformers` + `accelerate`
- **Training strategy:** LoRA only (projector + LoRA weights), no full model fine-tuning
- **Codebase build:** Built upon [Videochat2](https://github.com/OpenGVLab/Ask-Anything/tree/main/video_chat2)

## Related Tools

PLLaVA sits in the Video-LLM ecosystem alongside:
- [[Video-LLaVA]] — unified video-language representation learning
- [[LLaVA-OneVision]] — single LLaVA variant for images, videos, and PDFs
- [[MiniGPT-4]] — image understanding from LLaVA architecture
- [[MotionLLM]] — video + motion joint understanding (from IDEA/Tsinghua/CUHK-SZ)
- [[Cambrian-1]] — vision-centric multimodal LLMs benchmark

## Usage

```bash
# Environment
conda create -n pllava python=3.10
pip install -r requirements.txt

# Download models
python python_scripts/hf.py

# Run demo
model_dir="MODELS/pllava-7b"
weights_dir="${model_dir}"
bash scripts/demo.sh ${model_dir} ${weights_dir}
```

Training uses Accelerate with configurable multi-GPU settings (bf16 mixed precision, DDP).

## Citation

```bibtex
@misc{xu2024pllava,
  title={PLLaVA: Parameter-free LLaVA Extension from Images to Videos for Video Dense Captioning},
  author={Lin Xu and Yilin Zhao and Daquan Zhou and Zhijie Lin and See Kiong Ng and Jiashi Feng},
  year={2024},
  eprint={2404.16994},
  archivePrefix={arXiv},
  primaryClass={cs.CV}
}
```
