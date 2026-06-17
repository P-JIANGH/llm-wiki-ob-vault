---
title: MiniGPT-4
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, llm, vision-language, open-source, game-asset]
sources: [raw/articles/ai-game-devtools/minigpt-4.md]
---

# MiniGPT-4

## Overview
MiniGPT-4 is a vision-language model (VLM) that connects a frozen ViT encoder + Q-Former to a frozen large language model (LLM). Developed by Vision-CAIR at KAUST, it enables natural language understanding and generation from images. The repo also hosts **MiniGPT-v2**, a major update providing a unified multi-task interface based on Llama2 Chat 7B.

## Technical Architecture

- **ViT encoder**: frozen vision transformer, image size 224×224
- **Q-Former**: BLIP-2 style, 32 query tokens; maps visual features to LLM embedding space via a single linear projection layer
- **LLM backends**: Vicuna v0 (7B or 13B) or Llama-2 Chat 7B (frozen)
- **Training**: two-stage alignment — (1) pretrain on Laion/CC image-text pairs, (2) finetune on curated high-quality conversational image-text data
- **Dependencies**: built on Salesforce [LAVIS](raw/articles/ai-game-devtools/minigpt-4.md) (BLIP-2 implementation), uses [Vicuna](raw/articles/ai-game-devtools/minigpt-4.md) and [LLaMA 2](raw/articles/ai-game-devtools/minigpt-4.md)

## Key Capabilities
- Image description, story writing, poem generation from visuals
- Solving visual problems and answering questions about images
- Advertisements and creative content generation from images
- [[BLIP-2]]-style visual feature extraction feeding into LLM
- Grounded conversation about image content

## Game Development Relevance
- **Game asset understanding**: describe game screenshots, UI mockups, concept art
- **NPC visual perception**: vision-language input for game AI that "sees" the game world
- **Content generation pipeline**: combine with image generation tools for game art workflows
- **Vision-language game agents**: enables AI characters to understand visual game state

## Comparison to Similar VLMs
Unlike end-to-end trained VLMs, MiniGPT-4 leverages frozen pretrained components (ViT + LLM) with only a lightweight projection layer trained — dramatically reducing compute requirements while maintaining strong performance.

## License
BSD 3-Clause License

## Related
- [[LLaVA]] — another lightweight VLM approach
- [[BLIP-2]] — the architecture MiniGPT-4 is based on
- [[MiniGPT-5]] — multimodal generation with visual + language (successor project)
