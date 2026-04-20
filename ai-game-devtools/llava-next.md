---
title: LLaVA-NeXT
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, vlm, multimodal, vision, open-source]
sources: [web:https://llava-vl.github.io/llava-next, web:https://github.com/LLaVA-VL/LLaVA-NeXT]
---

# LLaVA-NeXT

**Next-generation LLaVA multimodal model with improved VLM architecture**

## Overview

LLaVA-NeXT is the next generation of the LLaVA (Large Language-and-Vision Assistant) family, featuring significant architectural improvements over the original LLaVA. It supports higher-resolution image inputs, interleaved image-text understanding, and improved visual reasoning. LLaVA-NeXT uses more powerful LLM backbones (Llama 3, Qwen, Mistral) and enhanced visual encoders with better resolution handling through any-resolution image processing.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | UW-Madison + community (LLaVA-VL team) |
| **LLM Backbones** | Llama 3 8B, Qwen 1.5/2, Mistral, Phi-3 |
| **Visual Encoder** | CLIP ViT-L/14, SigLIP, multiple variants |
| **Resolution** | Any-resolution processing (not fixed 336×336) |
| **Context** | Supports image-text interleaved conversations |
| **Training Data** | LLaVA-OneVision data, 4M+ instruction-following samples |
| **Variants** | LLaVA-NeXT (72B), LLaVA-NeXT-Video, LLaVA-OneVision |
| **License** | Apache 2.0 (code), depends on LLM backbone license |

## Architecture

- **High-Res Vision**: Any-resolution image processing via naive high-res patching
- **Improved Projector**: Enhanced visual-to-language projection layer
- **Interleaved Understanding**: Processes multiple images and text in arbitrary order
- **Video Extension**: Temporal pooling for video frame understanding
- **Multi-Image**: Cross-image reasoning capabilities

## Usage in AI Game Development

LLaVA-NeXT enables:
- **High-resolution asset analysis**: Understand detailed game art and textures
- **Multi-image comparison**: Compare game versions, asset variants, or design iterations
- **Video understanding**: Analyze gameplay footage for QA and feedback
- **UI/UX evaluation**: Assess game interfaces and provide design suggestions

## Related Projects

- [[ai-game-devtools/llava]] — Original LLaVA, the foundation for LLaVA-NeXT improvements
- [[ai-game-devtools/mini-gemini]] — Alternative multimodal VLM with dual encoder approach
- [[ai-game-devtools/qwen2-5]] — Qwen 2.5 LLM backbone used in some LLaVA-NeXT variants
- [[ai-game-devtools/cogvlm]] — THUDM open-source VLM with GUI agent capabilities
