---
title: Mini-Gemini
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [vlm, llm, multimodal, vision-language, open-source, ai-model]
sources: [raw/articles/ai-game-devtools/mini-gemini.md]
---

# Mini-Gemini (MGM)

## Overview
Mini-Gemini (MGM) is a multimodal vision-language model series by DVLab Research (CUHK, Prof. Jia Jiaya's lab), supporting dense and MoE LLMs from 2B to 34B parameters. Built on [[LLaVA]] architecture, it enables simultaneous image understanding, reasoning, and generation.

## Technical Architecture
- **Dual vision encoders**: CLIP-ViT-L (low-res 336px or 672px for HD) + OpenCLIP-ConvNeXt-L (high-res candidates)
- **Patch Info Mining**: novel patch-level mining between HR regions and LR visual queries for fine-grained understanding
- **LLM marries text with images**: single model handles both comprehension and generation
- **Base LLMs**: Gemma-2B, Vicuna-7B/13B, LLaMA-3-8B, Mixtral-8x7B (MoE), Nous-Hermes-2-Yi-34B

## Model Lineup

| Model | Base LLM | Resolution | Key Strength |
|-------|----------|------------|-------------|
| MGM-2B | Gemma-2B | 336/768 | Lightest entry point |
| MGM-7B | Vicuna-7B | 336/768 | Balanced performance |
| MGM-13B | Vicuna-13B | 336/768 | Strong reasoning |
| MGM-8B | LLaMA-3-8B | 336/768 | Modern LLM base |
| MGM-8x7B | Mixtral-8x7B MoE | 336/768 | Best efficiency (MoE) |
| MGM-34B | Yi-34B | 336/768 | Highest capacity |
| HD variants | same | 672/1536 | Superior detail understanding |

## Performance (34B-HD best)
- **TextVQA**: 74.1 (best among MGM variants)
- **MMBench**: 80.6
- **MM-Vet**: 59.3
- **MMMU**: 44.9 (val), 48.0 (test)
- **MathVista**: 43.3
- Trained on 8×A100 80GB GPUs, 2-stage (alignment → instruction tuning)

## Game Development Relevance
- **Game scene understanding**: VLM capable of parsing complex game screenshots, UI layouts, and in-game visual information
- **Visual reasoning for NPCs**: combines perception + reasoning in one model — game agents can "see" and "reason" about visual game state
- **Image generation with reasoning**: unique capability to generate images based on visual understanding (unlike most VLMs which only understand)
- **Local deployment**: supports 4-bit/8-bit quantization, making it feasible to run on consumer GPUs for game dev prototyping
- **Multi-GPU support**: can run across multiple GPUs for higher-res game scene analysis

## Inference
- CLI, Gradio Web UI, 4-bit/8-bit quantized inference
- OCR mode (PaddleOCR integration) and image generation mode (diffusers)
- Model weights on HuggingFace

## License
Code: Apache 2.0. Data & weights: CC BY NC 4.0 (research use only, non-commercial).

## Related
- [[ai-game-devtools/llava-plus-plus]] — LLaVA family VLM, architecture Mini-Gemini is built upon
- [[ai-game-devtools/llava-onevision]] — LLaVA-NeXT unified vision-language model
- [[ai-game-devtools/minigpt-4]] — competing VLM using frozen ViT+Q-Former+LLM approach
- [[ai-game-devtools/gemma]] — Gemma-2B used as the smallest MGM base LLM
