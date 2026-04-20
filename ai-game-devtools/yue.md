---
title: YuE
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, music, audio, llm]
sources: [raw/articles/ai-game-devtools/yue.md]
---

# YuE (乐)

Open foundation model for full-song music generation — transforms lyrics into complete songs with vocal and accompaniment tracks.

## Overview

YuE is a two-stage music generation model developed jointly by **HKUST** and **M-A-P**. The name means "music" and "happiness" in Chinese. It generates multi-minute songs from text prompts (genre tags + lyrics) and supports in-context learning with reference audio for style transfer.

## Key Facts

- **Released:** January 2025
- **License:** Apache 2.0
- **Paper:** [arXiv:2503.08638](https://arxiv.org/abs/2503.08638)
- **Models:** Stage 1 (7B) + Stage 2 (1B) + Upsampler
- **Languages:** English, Mandarin, Cantonese, Japanese, Korean
- **GPU:** 24GB+ for short segments, 80GB+ for full songs

## Architecture

**Two-stage pipeline:**
1. **Stage 1 (7B):** Generates musical tokens from lyrics + genre tags using transformer architecture. Multiple specialized checkpoints per language/mode (CoT vs ICL).
2. **Stage 2 (1B):** Refines and upsamples tokens for higher quality.
3. **Upsampler:** Converts refined tokens to final audio waveform using xcodec codec.

**Generation modes:**
- **CoT (Chain-of-Thought):** No reference audio — generates diverse output from text alone
- **Single-track ICL:** Uses one reference audio (mix/vocal/instrumental) for style guidance
- **Dual-track ICL:** Uses separate vocal + instrumental references — best musicality
- **Music continuation:** Extends existing audio prompts

## Technical Specs

| Dimension | Detail |
|-----------|--------|
| Stage 1 Model | 7B parameters, multiple language-specific checkpoints |
| Stage 2 Model | 1B parameters, general-purpose refinement |
| Codec | xcodec_mini (descript-audio-codec) |
| Framework | HuggingFace Transformers + FlashAttention 2 |
| Fine-tuning | LoRA support (since 2025-06-04) |
| H800 Performance | 30s audio in ~150s |
| RTX 4090 Performance | 30s audio in ~360s |

## Community Ecosystem

Multiple community projects extend YuE's accessibility:
- [[yue-ui]] - Gradio interface with batch generation and timeline
- [[yue-exllamav2]] - Quantized inference for 8GB VRAM GPUs
- [[yuegp]] - Optimized inference pipeline
- [[yue-extend]] - Music continuation + Google Colab

## Related Projects

Compared to earlier music generation models:
- [[musicgen]] (Meta/AudioCraft): Short-form music generation, not full songs with lyrics
- [[jukebox]] (OpenAI): One of the first neural music generation models, limited quality
- [[riffusion-app]]: Spectrogram-based music generation, simpler architecture
- [[audioldm-2]]: Audio generation model, not specifically for full songs

## Sources

- [GitHub Repository](https://github.com/multimodal-art-projection/YuE)
- [Technical Paper](https://arxiv.org/abs/2503.08638)
- [Demo Page](https://map-yue.github.io/)
- [HuggingFace Models](https://huggingface.co/m-a-p)
