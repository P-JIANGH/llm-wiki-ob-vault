# YuE - Open Foundation Model for Music Generation

**Source:** https://github.com/multimodal-art-projection/YuE
**Retrieved:** 2026-04-21

## Overview

YuE (乐) is an open-source foundation model for music generation, specifically designed for transforming lyrics into full songs (lyrics2song). It can generate complete songs lasting several minutes with both vocal and accompaniment tracks. The name means "music" and "happiness" in Chinese.

**Project:** multimodal-art-projection/YuE
**License:** Apache 2.0
**Paper:** https://arxiv.org/abs/2503.08638
**Demo:** https://map-yue.github.io/

## Key Features

- **Full Song Generation:** Generates complete songs with vocal + accompaniment tracks
- **Multi-Language Support:** English, Mandarin Chinese, Cantonese, Japanese, Korean
- **Dual-Track ICL:** In-context learning with reference songs for style transfer and voice cloning
- **Single-Track ICL:** Use mix/vocal/instrumental as reference
- **Chain-of-Thought (CoT) Mode:** Generate without reference audio for more diverse output
- **Music Continuation:** Extend existing audio prompts
- **LoRA Fine-tuning:** Support for custom fine-tuning (added 2025-06-04)

## Architecture

**Two-Stage Pipeline:**
1. **Stage 1 (7B parameter model):** Generates musical tokens from lyrics + genre tags
   - Multiple checkpoints: English (en-cot, en-icl), Chinese (zh-cot, zh-icl), Japanese/Korean (jp-kr-cot, jp-kr-icl)
2. **Stage 2 (1B parameter model):** Refines and upsamples the generated tokens
3. **Upsampler:** Converts tokens to final audio output

**Model Variants on HuggingFace:**
- `m-a-p/YuE-s1-7B-anneal-en-cot` - English CoT mode
- `m-a-p/YuE-s1-7B-anneal-en-icl` - English ICL mode
- `m-a-p/YuE-s1-7B-anneal-zh-cot` - Chinese CoT mode
- `m-a-p/YuE-s1-7B-anneal-zh-icl` - Chinese ICL mode
- `m-a-p/YuE-s1-7B-anneal-jp-kr-cot` - Japanese/Korean CoT mode
- `m-a-p/YuE-s1-7B-anneal-jp-kr-icl` - Japanese/Korean ICL mode
- `m-a-p/YuE-s2-1B-general` - Stage 2 refinement model
- `m-a-p/YuE-upsampler` - Audio upsampler

## Technical Details

### Hardware Requirements
- **24GB GPU or less:** Up to 2 sessions (verse + chorus)
- **80GB+ GPU (H800/A800):** Full song generation (4+ sessions)
- **Community alternatives:** YuE-exllamav2 and YuEGP for lower VRAM

### Performance
- H800: 30s audio in ~150 seconds
- RTX 4090: 30s audio in ~360 seconds

### Dependencies
```
torch, omegaconf, torchaudio, einops, numpy
transformers, sentencepiece, tqdm, tensorboard
descript-audiotools>=0.7.2, descript-audio-codec
scipy, accelerate>=0.26.0, flash-attn
```

### Key Source Files
- `inference/infer.py` - Main inference pipeline
- `inference/codecmanipulator.py` - Codec manipulation utilities
- `inference/mmtokenizer.py` - Multimodal tokenizer
- `finetune/` - LoRA fine-tuning code

### Prompt Engineering
Genre tags (5 components): genre, instrument, mood, gender, timbre
Lyrics structured with section labels: [verse], [chorus], [bridge], [outro]
Reference audio: ~30s recommended, chorus part works best

## Community Ecosystem
- **YuE-UI** by joeljuvel: Gradio interface with batch generation
- **YuE-extend** by Mozer: Music continuation + Google Colab support
- **YuE-for-Windows** by sdbds: Docker-based Windows deployment
- **YuE-exllamav2** by sgsdxzy: Quantized inference for low VRAM
- **YuEGP** by deepbeepmeep: Optimized inference pipeline
- **YuE-Interface** by alisson-anjos: Alternative Gradio UI
- **Pinokio:** One-click Windows installer

## Timeline
- 2025-01-26: YuE series released
- 2025-01-30: Dual-track ICL mode + Apache 2.0 license
- 2025-02-07: Windows support via Pinokio
- 2025-02-17: Music continuation + Google Colab
- 2025-03-11: YuE-UI released
- 2025-03-12: Technical paper on arXiv
- 2025-06-04: LoRA fine-tuning support
