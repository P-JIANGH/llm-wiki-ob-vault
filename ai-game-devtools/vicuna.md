---
title: Vicuna LLM
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, llm, open-source, python]
sources: []
---

## Overview

**Vicuna** is an open-source chatbot developed by Large Model System Organization (LMSYS Org), a collaborative academic research group. It is fine-tuned from Meta's [[llama]] models using approximately 70K user-shared conversations from ShareGPT, achieving near-commercial LLM quality in chat capabilities.

## Key Facts

| Attribute | Value |
|-----------|-------|
| Organization | LMSYS Org (UC Berkeley + UIUC + UC San Diego + CMU) |
| Base Model | LLaMA (7B, 13B, 33B variants) |
| Training Data | ~70K ShareGPT conversations |
| License | LLaMA-derived (non-commercial for research) |
| Evaluation | >90% ChatGPT quality (GPT-4 evaluation) |
| GitHub | https://github.com/lm-sys/FastChat |

## Architecture & Training

- **Base**: Fine-tuned from Meta LLaMA using supervised fine-tuning (SFT)
- **Data**: Conversations scraped from ShareGPT.com, cleaned and filtered
- **Cost**: ~$300 to train the 13B model (significantly cheaper than training from scratch)
- **Variants**: Vicuna-7B, Vicuna-13B, Vicuna-33B; later versions based on LLaMA-2 and LLaMA-3

## FastChat

Vicuna is served through **FastChat**, an open platform that includes:
- Distributed multi-model serving system
- OpenAI-compatible REST API
- Web UI for interactive chat
- Supports dozens of model backends beyond Vicuna

## Significance

Vicuna demonstrated that high-quality chat models could be built affordably using community-shared data, sparking a wave of open-source LLM fine-tuning projects. It serves as a common base model for many downstream projects including [[llava]] (which uses Vicuna as its language backbone).

## Game Development Applications

- **NPC Dialogue Systems**: Vicuna's strong conversational abilities make it suitable for dynamic NPC interactions
- **Local Deployment**: Can run on consumer hardware with quantization, enabling offline game AI
- **Character Roleplay**: Fine-tuned variants excel at maintaining consistent character personas

## Related Projects

- [[llava]] — Uses Vicuna as its language component for vision-language tasks
- [[llama]] — Base model that Vicuna is fine-tuned from
- [[stanford-alpaca]] — Another early LLaMA instruction-tuned model, similar era

## References

- Paper: "Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90%* ChatGPT Quality" (2023)
- GitHub: https://github.com/lm-sys/FastChat
- Blog: https://lmsys.org/blog/2023-03-30-vicuna/
