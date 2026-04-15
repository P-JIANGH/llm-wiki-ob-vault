# Qwen-VL Source

**Project:** https://github.com/QwenLM/Qwen-VL
**Cloned from:** gitcode.com/QwenLM/Qwen-VL
**License:** Custom license (see LICENSE / NOTICE files)
**Date:** 2026-04-15

## Overview

Qwen-VL (Qwen Large Vision Language Model) is Alibaba Cloud's multimodal extension of the Qwen (Tongyi Qianwen) LLM series. It accepts image + text + bounding box as input and outputs text and bounding boxes. Released August 2023.

## Model Family

| Model | Description |
|-------|-------------|
| Qwen-VL | Base pretrained LVLM; Qwen-7B + OpenCLIP ViT-bigG + cross-attention |
| Qwen-VL-Chat | Aligned chat model; supports multi-image, multi-turn, creative tasks |
| Qwen-VL-Plus | Enhanced LVLM; higher resolution (millions of pixels), better text recognition |
| Qwen-VL-Max | Most capable; best visual reasoning and instruction-following |
| Qwen-VL-Chat-Int4 | Int4 quantized Qwen-VL-Chat (~12GB GPU memory for encoding) |

## Key Capabilities

- **Multilingual LVLM** with native English/Chinese and bilingual text recognition in images
- **Multi-image interleaved conversations** — compare images, multi-image storytelling
- **Grounding in Chinese** — first open-source model supporting Chinese open-domain grounding via bounding boxes
- **Fine-grained recognition** — 448×448 resolution (vs typical 224×224), enables document QA, text extraction
- **Bounding box output** — `<ref>text</ref><box>(x1,y1),(x2,y2)</box>` format

## Architecture

- **LLM backbone:** Qwen-7B (from Alibaba's Qwen series)
- **Visual encoder:** OpenCLIP ViT-bigG (pretrained on 2B image-text pairs)
- **Connector:** Randomly initialized cross-attention layer
- **Position:** 448×448 image resolution (vs standard 224×224)
- **Special tokens:** `<img>`, `</img>`, `<ref>`, `</ref>`, `<box>`, `</box>`

## Benchmark Results

### Qwen-VL-Plus / Qwen-VL-Max vs. Closed-Source

| Benchmark | GPT-4V | Gemini Ultra | Qwen-VL-Plus | Qwen-VL-Max |
|-----------|--------|-------------|-------------|-------------|
| DocVQA | 88.4% | 90.9% | 91.4% | **93.1%** |
| ChartQA | 78.5% | 80.8% | 78.1% | **79.8%** |
| TextVQA | 78.0% | 82.3% | 78.9% | **79.5%** |
| MMMU | 56.8% | 59.4% | 45.2% | **51.4%** |

### Qwen-VL (base) Zero-shot Performance

- Flickr30K zero-shot captioning: **85.8** SOTA among generalist LVLMs
- VQAv2 zero-shot: **78.8** SOTA
- RefCOCO grounding: **89.36/92.26/85.34** SOTA on val/test-A/test-B

### TouchStone Chat Evaluation

- Qwen-VL-Chat-1.1: EN **711.6**, ZH **481.7** — best among all open-source LVLMs
- Surpasses GPT-4V on Chinese QA and Chinese text comprehension (Qwen-VL-Max)

## Training

- Pretraining on large-scale image-text pairs (with Chinese data)
- Aligned with RLHF/DPO for chat versions
- Supports full-parameter finetuning, LoRA, Q-LoRA
- Data format: JSON with conversations containing `<img>path</img>` and `<box>` tokens

## Quantization (Int4)

| Metric | BF16 | Int4 |
|--------|------|------|
| Peak GPU memory (encoding 2048 tokens) | 22.60 GB | **11.82 GB** |
| Speed (tokens/s, 2048 ctx) | 28.87 | **37.79** |
| TouchStone EN | 645.2 | 651.4 |
| TouchStone ZH | 401.2 | 386.6 |

## Files in Repo

```
README.md / README_CN.md / README_JA.md / README_KO.md
requirements.txt / requirements_openai_api.txt
TUTORIAL.md / TUTORIAL_zh.md
finetune.py  # Official finetuning script (DeepSpeed / FSDP)
finetune/    # Shell scripts for full/LoRA/Q-LoRA
openai_api.py
web_demo_mm.py
eval_mm/     # Evaluation scripts
touchstone/  # TouchStone benchmark
LICENSE / NOTICE
```

## Related Models in Qwen VL/LLM Family

- Qwen-VL-Plus / Qwen-VL-Max (API-only, hosted on Alibaba Cloud)
- Qwen-VL2 (successor)
- Qwen2 / Qwen2.5 (text-only LLMs)
- Qwen2.5-Coder (code-specialized)
- [[qwen2]] — Qwen2 base model wiki page
- [[qwen3]] — Qwen3 base model wiki page
- [[glm-v]] — GLM-V, another Chinese VLM
- [[cogvlm2]] — CogVLM2, competing VLM
- [[llava-onevision]] — LLaVA-OneVision, similar VLM architecture
