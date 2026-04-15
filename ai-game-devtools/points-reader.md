---
title: POINTS-Reader
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, document-extraction, ocr, tencent, emnlp2025, distillation-free, vision-language-model]
sources: [raw/articles/ai-game-devtools/points-reader.md]
---

# POINTS-Reader

**POINTS-Reader** is a distillation-free vision-language model for end-to-end document conversion, developed by [[Tencent]]. It was accepted to **EMNLP 2025 Main Conference**.

## Overview

POINTS-Reader extracts text, formulas, tables, and reading order from document images in a single end-to-end pass — no post-processing pipeline, no knowledge distillation from larger models. It directly outputs a plain text string from a document image input.

## Architecture

Built on the [[POINTS1.5]] architecture with two modifications:
- **LLM**: [[Qwen2.5]]-3B-Instruct (downscaled from 7B in POINTS1.5)
- **ViT**: 600M [[NaViT]] (moderate-size vision encoder for high throughput)
- **Input**: Fixed prompt + document image
- **Output**: Plain string (no post-processing)

## Key Features

| Feature | Description |
|---------|-------------|
| **End-to-end** | Single model, no post-processing pipeline |
| **Bilingual** | Supports Chinese and English documents |
| **High throughput** | Supports [[SGLang]] and [[vLLM]] inference frameworks |
| **Distillation-free** | Uses two-stage self-evolution instead of distillation from larger VLMs |
| **Lightweight** | 3B parameters — deployable on consumer GPUs |

### Two-Stage Data Augmentation

1. **Stage 1**: Automated data generation to endow basic document extraction capability
2. **Stage 2**: Continuous self-evolution to improve generated data quality (method is extensible to other models)

## Performance

On [[OmniDocBench]] benchmark (lower Overall^Edit↓ is better):

| Model | EN↓ | ZH↓ | Notes |
|-------|-----|-----|-------|
| **POINTS-Reader-3B** | **0.133** | **0.212** | Best EN, tied best ZH |
| Gemini2.5-Pro | 0.148 | 0.212 | Closed AI |
| MinerU2.0-2505-0.9B | 0.133 | 0.238 | Pipeline tool |
| GPT4o | 0.233 | 0.399 | Closed AI |

POINTS-Reader achieves **state-of-the-art English document extraction** (0.133) among all methods including closed AI APIs, and **competitive Chinese performance** tied with Gemini2.5-Pro.

## Comparison with Related VLM Document Tools

Unlike general [[VLM]] approaches (GPT4o, Qwen2-VL), POINTS-Reader is purpose-built for document extraction with:
- No OCR pipeline dependency
- No post-processing stages
- Bilingual support (most alternatives focus on English)
- Self-evolution training that doesn't rely on proprietary teacher models

## Related Links

- [[HuggingFace Model]](https://huggingface.co/tencent/POINTS-Reader)
- [[HuggingFace Demo]](https://huggingface.co/spaces/prithivMLmods/POINTS-Reader-OCR)
- [[arXiv Paper]](https://huggingface.co/papers/2509.01215)
- [[SGLang Deployment Guide]](https://github.com/Tencent/POINTS-Reader#sglang)

## Related Entities

- [[cambrian-1]] — Multi-modal benchmark for VLMs
- [[qwen2]] — Qwen2 series (LLM base for POINTS-Reader)
- [[glm-v]] — GLM-V document understanding VLM
