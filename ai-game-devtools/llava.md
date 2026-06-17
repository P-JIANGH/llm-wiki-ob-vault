---
title: LLaVA (Large Language-and-Vision Assistant)
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, vlm, multimodal, vision, open-source]
sources: [web:https://llava-vl.github.io, web:https://github.com/haotian-liu/LLaVA]
---

# LLaVA (Large Language-and-Vision Assistant)

**Multimodal Vision-Language Model by UW-Madison**

## Overview

LLaVA (Large Language-and-Vision Assistant) is a multimodal vision-language model (VLM) that combines a pre-trained large language model (LLaMA/Vicuna) with a vision encoder (CLIP) through a simple linear projection layer. Developed by researchers at the University of Wisconsin-Madison, LLaVA was one of the first open-source VLMs to demonstrate strong visual instruction-following capabilities comparable to proprietary models like GPT-4V.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developers** | Haotian Liu, Chunyuan Li, Qingyang Wu, Yong Jae Lee (UW-Madison, Microsoft, NYU) |
| **Architecture** | CLIP ViT-L/14 vision encoder + Vicuna LLM (7B/13B) + linear projector |
| **Training Data** | 158K instruction-tuning samples (LLaVA-Instruct) |
| **Method** | Two-stage: (1) visual-language alignment with image-text pairs, (2) visual instruction tuning |
| **Performance** | ~85% of GPT-4V level on scientific chart tasks, SOTA among open-source VLMs at time of release |
| **License** | LLaMA community license / Apache 2.0 |
| **Variants** | LLaVA-1.5 (7B/13B), LLaVA-NeXT, LLaVA-Next (interleaved) |

## Architecture

- **Vision Encoder**: OpenAI CLIP ViT-L/14 extracts image features
- **Projection Layer**: Simple linear layer maps visual features into LLM token embedding space
- **Language Model**: Vicuna (fine-tuned LLaMA) processes combined text + visual tokens
- **Key Insight**: LLMs already contain visual reasoning capabilities; simple projection is sufficient to unlock them

## Usage in AI Game Development

LLaVA is widely used in AI game development tools for:
- **Visual game asset understanding**: Describing sprites, textures, and scenes
- **Screenshot analysis**: Analyzing game states from screenshots for AI agents
- **NPC vision systems**: Providing multimodal perception for game NPCs
- **QA testing**: Automated visual analysis of game renders and builds

## Related Projects

- [[llava-onevision]] — Extended LLaVA variant with unified vision capabilities
- [[llava-plus-plus]] — Enhanced version with improved instruction following
- [[cogvlm]] — Another open-source VLM alternative (THUDM/ZhipuAI)
- [[mini-gemini]] — Mini-Gemini multimodal VLM series with similar goals
