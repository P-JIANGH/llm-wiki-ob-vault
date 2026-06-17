---
title: CogVLM2
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, vlm, multimodal, vision, open-source]
sources: [raw/articles/ai-game-devtools/cogvlm2.md]
---

# CogVLM2

**CogVLM2** is THUDM/ZhipuAI's second-generation Visual Language Model series, based on Meta-Llama-3-8B-Instruct with a visual expert adapter. Released 2024-05-20, it matches or exceeds GPT-4V on most benchmarks while being fully open-source.

## Overview

CogVLM2 introduces a visual expert adaptation mechanism on top of Llama3-8B, enabling powerful image and video understanding without the parameter overhead of previous generations. Key innovations include:

- **Visual Expert Adapter**: Deep fusion of vision transformer features into the LLM backbone via cross-attention layers, preserving language model capabilities while adding visual comprehension
- **8K context** (image models), 2K context (video models)
- **1344×1344 max image resolution** — significantly higher than typical 448×448 or 768×768 limits
- **Int4 quantization** requiring only 16GB VRAM for the 19B model

## Model Family

| Model | Language | Task | Context | Resolution |
|-------|----------|------|---------|------------|
| [[cogvlm2\|cogvlm2-llama3-chat-19B]] | English | Image + Multi-turn | 8K | 1344×1344 |
| [[cogvlm2\|cogvlm2-llama3-chinese-chat-19B]] | Chinese+English | Image + Multi-turn | 8K | 1344×1344 |
| cogvlm2-video-llama3-chat | English | Video, Single-turn | 2K | 24 frames |
| cogvlm2-video-llama3-base | English | Video, Base | 2K | 24 frames avg |

## Benchmark Performance

CogVLM2 achieves **state-of-the-art** open-source results on TextVQA (84.2) and DocVQA (92.3) among models of its size class. Key comparisons:

- **TextVQA**: 84.2 vs GPT-4V's 78.0 (open-source advantage)
- **DocVQA**: 92.3 vs GPT-4V's 88.4
- **MMBench**: 80.5 vs GPT-4V's 75.0
- **MMMU**: 44.3 vs GPT-4V's 56.8 (where closed models retain edge)

For video understanding, CogVLM2-Video achieves SOTA on MVBench (62.3 AVG, tied) and VideoChatGPT-Bench (3.41 VCG-AVG, best).

## Technical Architecture

- **Base**: Meta-Llama-3-8B-Instruct (8B parameters)
- **Vision Encoder**: Eva-CLIP or similar ViT, deep-fused via visual expert cross-attention
- **Training**: Pre-train visual projector → instruction fine-tuning with multi-modal data
- **Quantization**: Int4 via `--quant 4` flag, 16GB VRAM requirement

## Project Structure

- `basic_demo/` — CLI/Web/API inference for image models
  - `cli_demo.py` — single GPU, `cli_demo_multi_gpus.py` — multi-GPU
  - `openai_api_demo.py` — OpenAI-compatible REST API
  - `web_demo.py` — Chainlit web UI
- `finetune_demo/` — PEFT LoRA fine-tuning pipeline
  - `peft_lora.py` (train) + `peft_infer.py` (inference)
- `video_demo/` — Video understanding models
  - `cli_video_demo.py`, `gradio_demo.py`, `api_demo.py`

## Relationship to Other VLMs

- **[[ai-game-devtools/design2code|Design2Code]]**: Finetuned from CogAgent-18B, a predecessor in the CogVLM family — CogVLM2's architecture represents a significant leap over CogAgent
- **GLM-4V-9B**: Uses the same training data and recipes as CogVLM2, but with GLM-9B as the LLM backbone instead of Llama3 — smaller (13B total vs 19B) by removing visual experts
- **[[ai-game-devtools/cambrian-1|Cambrian-1]]**: Another strong open-source VLM benchmark; CogVLM2 excels in OCR-heavy tasks while Cambrian-1 targets broader multimodal reasoning
- **[[ai-game-devtools/internlm-xcomposer|InternLM-XComposer]]**: A concurrent VLM series with unique HTML generation capabilities; CogVLM2 focuses on pure visual Q&A

## Game Development Use Cases

CogVLM2 can serve as a **vision backbone for game AI systems**:

1. **NPC Vision**: Real-time screenshot → LLM understanding of game state for dynamic NPC responses
2. **Asset Pipeline QA**: Automated checking of rendered sprites/UI against reference designs
3. **Document Understanding**: Parsing game design documents, localization files, and spreadsheets
4. **Video Understanding**: Analyzing gameplay footage for AI training data curation

## License

CogVLM2 License + Meta Llama 3 License (dual license; Llama 3 terms apply for base model usage)

## Links

- GitHub: https://github.com/THUDM/CogVLM2
- HF: https://huggingface.co/THUDM/cogvlm2-llama3-chat-19B
- ModelScope: https://modelscope.cn/models/ZhipuAI/cogvlm2-llama3-chat-19B/
