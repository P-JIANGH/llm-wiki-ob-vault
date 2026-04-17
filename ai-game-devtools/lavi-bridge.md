---
title: LaVi-Bridge
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, multimodal, image-generation, diffusion, llm, open-source, tool]
sources: [raw/articles/ai-game-devtools/lavi-bridge.md]
---

# LaVi-Bridge

[ECCV 2024] Bridging Language & Vision Models for Text-to-Image Generation

## Overview
LaVi-Bridge is a **plug-and-play framework** that connects diverse pre-trained language models (LLMs/text encoders) with generative vision models (diffusion transformers) for text-to-image generation. The key innovation is using **LoRA and adapters** to bridge models without modifying their original frozen weights, enabling flexible modular combinations.

## Key Features
- **Frozen-weight integration:** Both language and vision models remain unchanged; only lightweight LoRA/adapters are trained
- **Flexible model pairing:** Mix and match different LMs with different vision backbones
- **Built on cloneofsimo/lora:** Leverages existing LoRA infrastructure for Stable Diffusion

## Supported Model Combinations
| Language Model | Vision Model | Status |
|---|---|---|
| T5-Large | U-Net (Stable Diffusion) | Pre-trained weights available |
| Llama-2-7b | U-Net (Stable Diffusion) | Pre-trained weights available |
| T5-Large | Transformer (PixArt) | Pre-trained weights available |

All weights hosted on [HuggingFace](https://huggingface.co/shihaozhao/LaVi-Bridge/tree/main).

## Architecture
- **Language encoder side:** T5-Large / Llama-2-7b / CLIP / T5-Small / T5-Base
- **Vision generation side:** SD U-Net / PixArt Transformer / LDM U-Net
- **Bridge mechanism:** LoRA adapters that map language embeddings to vision model conditioning space
- **Training data:** COCO2017, JourneyDB, or custom datasets (tab-separated `image_path\tcaption` format)

## Technical Details
- **Training:** Conda-based setup, `./train/run.sh` entry point
- **Inference:** `./test/run.sh` with configurable checkpoint and output directories
- **Llama-2 integration:** Requires manual download from Meta; `--llama2_dir` flag
- **Extensible:** Alternative encoders/backbones supported via `t5_unet.py` modification

## Repository
- **GitHub:** https://github.com/ShihaoZhaoZSH/LaVi-Bridge
- **Paper:** [arXiv:2403.07860](https://arxiv.org/abs/2403.07860)
- **Project Page:** https://shihaozhaozsh.github.io/LaVi-Bridge/
- **Concurrent work:** ELLA (arxiv.org/abs/2403.05135)

## Relation to Other Tools
Similar to [[ai-game-devtools/controlnet]] in its adapter-based approach — both add conditioning to diffusion models without retraining the base. LaVi-Bridge focuses on **language model bridging** while ControlNet focuses on **spatial condition injection** (canny/depth/pose). Both complement [[ai-game-devtools/comfyui]]'s modular pipeline philosophy.
