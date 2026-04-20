---
title: MiniCPM-Llama3-V 2.5
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai-model, vlm, multimodal, on-device, open-source, llm]
sources: [raw/articles/ai-game-devtools/minicpm-llama3-v-2.5.md]aliases: ["MiniCPM-Llama3-V-2_5"]

---

# MiniCPM-Llama3-V 2.5

**MiniCPM-Llama3-V 2.5** (OpenBMB, 2024.05.20) is an open-source visual language model achieving GPT-4V-level performance with only ~3B parameters. It was the first end-deployable multimodal LLM supporting bilingual (English/Chinese) interaction.

## Overview

Built on a **SigLip-400M** vision encoder + **MiniCPM-2.4B** causal LLM, connected by a perceiver resampler that compresses image representations into just **64 tokens** — far fewer than typical MLP-based LMMs (which use 512+ tokens). This makes MiniCPM-V dramatically more memory-efficient and faster at inference.

## Architecture

| Component | Detail |
|-----------|--------|
| Vision encoder | SigLip-400M (`vit_so400m_patch14_siglip_384`) via timm |
| LLM backbone | MiniCPM-2.4B causal LM (40 layers, hidden 2304, 36 heads) |
| Vision-to-LLM bridge | Perceiver resampler → 64 tokens |
| Image resolution | 448×448 |
| Quantization | BF16 / FP16; 4-bit / 8-bit via quantization libraries |

## Performance

Despite its compact size (3B total), MiniCPM-Llama3-V 2.5 matches or exceeds much larger models:

| Model | Size | MME | MMB-dev (en) | MMB-dev (zh) | MMMU-val |
|-------|------|-----|---------------|--------------|----------|
| Qwen-VL-Chat | 9.6B | 1487 | 60.6 | 56.7 | 35.9 |
| CogVLM | 17.4B | 1438 | 63.7 | 53.8 | 32.1 |
| **MiniCPM-Llama3-V 2.5** | **3B** | **1452** | **67.9** | **65.3** | **37.2** |

## Key Technical Features

- **64-token vision compression**: Perceiver resampler reduces visual tokens 8-16x vs typical LMMs
- **Bilingual support**: First end-deployable LMM supporting English + Chinese multimodal interaction
- **Mobile deployment**: Runs on Android/Harmony phones via [[MLC-LLM]] (see `mlc-MiniCPM`)
- **Per-device inference**: Efficient enough for personal computers and edge devices
- **Multi-version family**: MiniCPM-V 2.0 → 2.6 → 4.0 → 4.5 → MiniCPM-o (with speech)

## Compared to Related Models

- vs [[MiniGPT-4]]: MiniCPM-V is much smaller (3B vs 13B) and focuses on efficient on-device; MiniGPT-4 has a heavier architecture
- vs [[LLaVA]]: Both open-source MLLMs; MiniCPM-V offers bilingual support and much lower compute requirements
- vs [[Qwen-VL]]: Qwen-VL is larger (9.6B+) but MiniCPM-V achieves comparable benchmarks at 3B
- Part of [[OmniLMM]] family: MiniCPM-V 2.5 is the predecessor to the more capable MiniCPM-V 4.0/4.5 and MiniCPM-o series

## Game Dev Use Cases

- **On-device NPC vision**: Small footprint enables local vision understanding in games without cloud API
- **Bilingual game UIs**: Chinese + English image captioning/QA for game menus and tutorials
- **Mobile game tools**: Run on-device image understanding for player assistance features
- Integrates with [[LLMUnity]] for direct Unity integration

## Related Links

- GitHub: https://github.com/OpenBMB/MiniCPM-V
- HuggingFace: https://huggingface.co/openbmb/MiniCPM-Llama3-V-2_5
- Mobile: https://github.com/OpenBMB/mlc-MiniCPM
- Parent project: [[minicpm-2b]] (LLM backbone)
