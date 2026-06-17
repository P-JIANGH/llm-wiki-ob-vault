---
title: AudioLDM 2
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, tool, open-source, music, speech, python]
sources: [raw/articles/ai-game-devtools/audioldm-2.md]
---

# AudioLDM 2

## Overview
AudioLDM 2 is a general framework for holistic audio generation using latent diffusion models with self-supervised pretraining. It supports **text-to-audio** (sound effects), **text-to-music**, and **text-to-speech** generation from natural language descriptions.

Published in IEEE/ACM Transactions on Audio, Speech, and Language Processing (TASLP), 2024.

## Key Capabilities
| Feature | Description |
|---------|-------------|
| Text-to-Audio | Generate sound effects from text (e.g., "A cat is meowing for attention") |
| Text-to-Music | Generate music from descriptions (e.g., "Techno music with strong upbeat tempo") |
| Text-to-Speech | Speech generation with speaker description + phoneme transcription |
| Super Resolution | Enhance low-quality audio to higher fidelity |
| Inpainting | Fill missing audio segments conditioned on text |

## Architecture
- **Latent Diffusion Model (DDPM)** — Core generative backbone
- **AudioMAE** — Self-supervised audio representation learning (masked autoencoder)
- **CLAP** — Contrastive Language-Audio Pretraining for text conditioning
- **HiFi-GAN** — Neural vocoder for high-fidelity waveform reconstruction
- **Phoneme Encoder** — VITS-style phoneme encoding for TTS support
- **T5 Text Encoder** — Cross-attention text conditioning

## Available Models
| Checkpoint | Sample Rate | Use Case |
|------------|------------|----------|
| audioldm2-full | 16kHz | General audio + music (default) |
| audioldm_48k | 48kHz | High-fidelity audio/music |
| audioldm2-full-large-1150k | 16kHz | Large model, higher quality |
| audioldm2-music-665k | 16kHz | Music generation only |
| audioldm2-speech-gigaspeech | 16kHz | TTS (GigaSpeech dataset) |
| audioldm2-speech-ljspeech | 16kHz | TTS (LJSpeech dataset) |

## Technical Stack
- **Framework**: PyTorch >= 1.13.0
- **Dependencies**: torchaudio, transformers (T5), librosa, soundfile
- **UI**: Gradio web application
- **CLI**: `pip install audioldm2` → `audioldm2 -t "prompt"`
- **Devices**: CPU, CUDA, MPS (Apple Silicon, ~20GB RAM required)
- **Diffusers Integration**: Available since diffusers v0.21.0 (3x faster inference)

## Game Dev Relevance
AudioLDM 2 enables **procedural audio generation** for game development:
- Generate sound effects from text descriptions during prototyping
- Create dynamic music matching game mood and scenes
- Generate NPC voice lines with described speaker characteristics
- Audio asset creation pipeline for indie game developers

## Links
- GitHub: https://github.com/haoheliu/audioldm2
- Paper: https://arxiv.org/abs/2308.05734
- HuggingFace: https://huggingface.co/spaces/haoheliu/audioldm2-text2audio-text2music
- Diffusers Docs: https://huggingface.co/docs/diffusers/main/en/api/pipelines/audioldm2

## Related
- [[academicodec]] — Audio codec training framework
- [[amphion]] — OpenMMLab 音频/音乐/语音生成工具包
- [[audio-editing]] — 零样本音频编辑（支持 AudioLDM2 后端）
