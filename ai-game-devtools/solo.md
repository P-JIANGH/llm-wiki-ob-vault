---
title: SOLO - Single Transformer Vision-Language Model
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, llm, open-source, training]
sources: [raw/articles/ai-game-devtools/solo.md]
---

## Overview

**SOLO** (A Single Transformer for Scalable Vision-Language Modeling) is a unified VLM architecture published at TMLR (2024). Its key innovation: uses a **single Transformer** (based on Mistral-7B) to process both raw image patches (in pixels) and text — no separate frozen vision encoder required.

- **Paper**: [arXiv:2407.06438](https://arxiv.org/abs/2407.06438)
- **Model**: [SOLO-7B on HuggingFace](https://huggingface.co/YangyiYY/SOLO-7B) (🤗)
- **License**: Custom proprietary license

## Architecture

SOLO replaces the standard VLM approach (frozen vision encoder + LLM projector) with a single model that handles vision and language natively:

- **Base**: Mistral-7B-v0.1
- **Multimodal adaptation**: "MMistral" — resizes token embeddings and adds multimodal attention to support raw pixel patches as input
- **Training infra**: Megatron-LLM for distributed pre-training; HuggingFace for inference
- **Tensor parallelism**: TP=2 recommended for 7B model on 8×A100/H100 80GB

This contrasts with [[qwen-vl]] / [[minicpm-llama3-v-2.5]] / [[llava-plus-plus]] which all use a separate frozen vision encoder + LLM architecture. SOLO's single-transformer approach may offer faster adaptation to domain-specific visual tasks (e.g., game screenshots) since the entire model is fine-tuned end-to-end.

## Pre-training

- **Data**: CC3M, LAION-400M subset, ImageNet-21K (5M+ samples total)
- **Pipeline**: Raw images → base64 → OpenAI chat completion format → Megatron dataset → training
- **Conversion steps**: HF Mistral → MMistral (custom multimodal version) → Megatron format → tensor-parallel sharding

## Instruction Fine-tuning

- **Data**: [VLM-SFT dataset](https://huggingface.co/datasets/YangyiYY/VLM-SFT) on HuggingFace
- **Config**: `config/SFT.yml` (train_data, img_dir, proj_dir, checkpoint paths)
- **Script**: `scripts/sft/run.sh`

## Relevance to Game Dev AI

SOLO's end-to-end single-transformer VLM is architecturally interesting for game AI:

1. **Real-time game state analysis** — no frozen vision encoder bottleneck; the full model can adapt to game-specific visuals
2. **Game agent training** — unified vision-language-action modeling potential (currently pre-trained only, no game-specific RLHF shown)
3. **[[design2code]]-style UI understanding** — could parse game UIs, inventory screens, quest logs

The approach is still research-stage (7B only, no smaller variants publicly released as of 2024). Compare with [[glm-v]] for another unified VLM approach.

## Key Links

- Paper: https://arxiv.org/abs/2407.06438
- Model: https://huggingface.co/YangyiYY/SOLO-7B
- GitHub: https://github.com/Yangyi-Chen/SOLO

## See Also

- [[qwen-vl]] — Qwen Vision-Language model (separate encoder approach)
- [[minicpm-llama3-v-2.5]] — MiniCPM VLM (separate encoder approach)
- [[design2code]] — VLM for code/generative UI tasks
- [[glm-v]] — GLM Vision (unified VLM alternative)
