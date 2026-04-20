---
title: DiffSinger
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, audio, singing-voice-synthesis]
sources: [raw/articles/ai-game-devtools/diffsinger.md]
---

# DiffSinger

Singing Voice Synthesis (SVS) system using shallow diffusion mechanism. Official PyTorch implementation of the AAAI-2022 paper.

## Overview

DiffSinger generates singing voices from lyrics and musical scores (MIDI) using a diffusion-based approach. The key innovation is the **shallow diffusion mechanism** — instead of running the full diffusion process from pure noise, it starts from a coarse prediction and applies fewer denoising steps, significantly accelerating inference while maintaining synthesis quality.

The project also includes **DiffSpeech**, a TTS variant that applies the same shallow diffusion approach to text-to-speech synthesis.

## Technical Architecture

### Core Pipeline

1. **Input**: Lyrics (Chinese/English) + MIDI pitch + note durations + slur marks
2. **Encoder**: FastSpeech2-based encoder with MIDI embeddings (pitch, duration, slur)
3. **Variance Predictors**: Duration predictor, pitch predictor, energy predictor
4. **Diffusion Decoder**: GaussianDiffusion with shallow diffusion (configurable timesteps and K_step)
5. **Vocoder**: NSF-HiFiGAN (Neural Source Filter HiFiGAN) for waveform generation

### Model Variants

| Variant | Input | F0 Handling | Acceleration |
|---------|-------|-------------|--------------|
| DiffSinger (Cascade) | Lyric + MIDI | Explicit F0 prediction | Shallow Diffusion |
| DiffSinger (E2E) | Lyric + MIDI | Implicit (end-to-end) | None |
| DiffSinger + PNDM | Lyric + MIDI | Implicit | PLMS (Pseudo Linear Multi-Step) |
| DiffSpeech (TTS) | Text only | Explicit | Shallow Diffusion |

### Key Components

- **FastSpeech2MIDI**: Extends FastSpeech2 with MIDI pitch embedding, MIDI duration layer, and slur embedding
- **GaussianDiffusion**: Core diffusion model with configurable shallow diffusion parameters
- **PitchExtractor (PE)**: Optional standalone pitch prediction module
- **NSF-HiFiGAN**: Vocoder with neural source filter, optimized for singing voice

## Technologies

- **Framework**: PyTorch + PyTorch Lightning
- **Architecture**: Transformer (FFT-based encoder), Diffusion model, HiFiGAN vocoder
- **Languages**: Chinese (g2pM pinyin), English (g2p_en)
- **GPU**: RTX 2080Ti (CUDA 10.2) or RTX 3090 (CUDA 11.4)

## Datasets

- **PopCS**: Pop song dataset released by the authors
- **OpenCpop**: Open Chinese pop singing dataset
- **LJSpeech**: English TTS dataset (DiffSpeech)

## Links

- **GitHub**: https://github.com/MoonInTheRiver/DiffSinger
- **Paper**: https://arxiv.org/abs/2105.02446
- **SVS Demo**: https://huggingface.co/spaces/Silentlin/DiffSinger
- **TTS Demo**: https://huggingface.co/spaces/NATSpeech/DiffSpeech

## Related Projects

- [[musicgen]] — Facebook's music generation model using EnCodec and autoregressive transformers
- [[audiocraft]] — (via [[musicgen]]) Meta's audio generation framework
- [[so-vits-svc]] — SVC-based singing voice conversion (alternative approach to singing voice AI)
- [[jukebox]] — OpenAI's neural audio generation for music
- [[riffusion-app]] — spectrogram-based music generation using Stable Diffusion
- [[neural-svb]] — Singing voice beautification, by the same authors (ACL-2022)
- [[portaspeech]] — Portable high-quality TTS, by the same authors (NeurIPS-2021)

## Notes

- The project has been community-maintained by **Team OpenVPI** at https://github.com/openvpi/DiffSinger with ongoing updates
- Supports both cascade (explicit F0) and end-to-end (implicit F0) inference modes
- PNDM plugin provides additional inference acceleration without quality loss
