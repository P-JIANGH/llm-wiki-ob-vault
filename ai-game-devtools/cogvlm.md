---
title: CogVLM & CogAgent
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, vlm, tool, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/cogvlm.md]
---

# CogVLM & CogAgent

## Overview

**CogVLM** is an open-source visual language model (VLM) by THUDM (Tsinghua University + ZhipuAI). CogVLM-17B has 10B vision + 7B language parameters, supporting image understanding and multi-turn dialogue at 490×490 resolution.

**CogAgent** is an enhanced version with 11B vision + 7B language parameters, supporting 1120×1120 ultra-high resolution and adding GUI Agent capabilities.

> **Note:** Superseded by [[ai-game-devtools/cogvlm2]] (next-gen, Llama3-8B based, comparable to GPT-4V).

## Key Facts

- **Paper (CogVLM):** arXiv:2311.03079 — "CogVLM: Visual Expert for Pretrained Language Models"
- **Paper (CogAgent):** arXiv:2312.08914 — CVPR 2024 Highlights
- **SOTA benchmarks:** CogVLM on 10 cross-modal tasks; CogAgent on 9 + GUI datasets (AITW, Mind2Web)
- **MM-VET:** 52.8 (vs LLaVA-1.5 at 36.3, Qwen-VL at N/A)
- **POPE adversarial:** 87.6 (vs LLaVA-1.5 at 84.5)
- **INT4 quantization:** Inference with only 11GB GPU memory
- **License:** Apache-2.0 (code), separate model license for weights

## Technical Architecture

- **Framework:** SwissArmyTransformer (SAT) + HuggingFace Transformers
- **Backbone:** Vicuna-7B LLM with visual expert module
- **Inference options:** CLI (SAT/HF), Streamlit/Gradio web demo, OpenAI Vision-compatible API
- **Fine-tuning:** LoRA with DeepSpeed, captcha recognition example provided
- **Quantization:** 4-bit/8-bit support in both SAT and HF versions

## Model Variants

| Model | Resolution | Use Case |
|-------|-----------|----------|
| cogvlm-chat-v1.1 | 490 | Multi-round chat + VQA |
| cogvlm-grounding-generalist | 490 | Visual grounding (REC, Grounding Captioning) |
| cogagent-chat | 1120 | GUI Agent + multi-round chat + grounding |
| cogagent-vqa | 1120 | Single-turn VQA benchmarks |

## Key Capabilities

1. **Multi-round visual dialogue** — conversational image understanding
2. **Visual grounding** — returns bounding box coordinates [[x1,y1,x2,y2]] for mentioned objects
3. **GUI Agent (CogAgent)** — plan inference, next action prediction, coordinate-based operations on any GUI screenshot
4. **OCR enhancements** — improved pre-training for text recognition in images
5. **OpenAI Vision API compatibility** — drop-in replacement for GPT-4V API calls

## Relationships

- **Predecessor to** [[ai-game-devtools/cogvlm2]] — next generation based on Llama3-8B
- **Competes with** [[ai-game-devtools/qwen-vl]] — Alibaba VLM, similar benchmark scope
- **Competes with** [[ai-game-devtools/minigpt-4]] — earlier VLM that CogVLM outperforms on all major benchmarks
- **Competes with** [[ai-game-devtools/llava-onevision]] — LLaVA series, CogVLM has higher MM-VET and POPE scores
- **Uses** [[ai-game-devtools/llm.c|SwissArmyTransformer]] — training framework by THUDM

## Links

- GitHub: https://github.com/THUDM/CogVLM
- HuggingFace: https://huggingface.co/THUDM/cogvlm-chat-hf
- ModelScope: https://modelscope.cn/models/ZhipuAI/CogVLM
- CogVLM2 (successor): https://github.com/THUDM/CogVLM2
