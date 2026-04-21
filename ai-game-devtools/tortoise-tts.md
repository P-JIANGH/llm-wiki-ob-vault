---
title: TorToiSe TTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, open-source, tool, python, ai-model, diffusion, autoregressive]
sources: [raw/articles/ai-game-devtools/tortoise-tts.md]
---

# TorToiSe TTS

**TorToiSe** is a high-quality multi-voice text-to-speech (TTS) library built with priorities on strong multi-voice capabilities and highly realistic prosody/intonation.

- **Author:** James Betker (neonbjb)
- **GitHub:** [neonbjb/tortoise-tts](https://github.com/neonbjb/tortoise-tts)
- **Version:** 3.0.0
- **License:** Apache 2.0
- **Paper:** [arXiv:2305.07243](https://arxiv.org/abs/2305.07243)
- **HF Demo:** [Manmay/tortoise-tts](https://huggingface.co/spaces/Manmay/tortoise-tts)
- **pip:** `pip install tortoise-tts`

## Architecture

TorToiSe uses a **two-stage generation pipeline** inspired by DALL-E:

1. **Autoregressive token prediction** — A 30-layer GPT2-based model (UnifiedVoice, 1024 dim, 16 heads) generates discrete speech tokens conditioned on text and voice reference clips. Uses rotary embeddings and supports KV cache + DeepSpeed + FP16 for fast inference.

2. **Diffusion-based spectrogram refinement** — A 10-layer diffusion model (DiffusionTts, 1024 channels, 16 heads) converts the discrete tokens into a mel spectrogram. Uses sinusoidal timestep embeddings and conditioning-free diffusion (blending conditioned and unconditioned outputs).

3. **Neural vocoder** — UnivNetGenerator converts the mel spectrogram to 24kHz waveform audio.

### Output Selection

Multiple autoregressive samples are generated and ranked using:
- **CLVP** (Contrastive Language-Voice Prediction): A CLIP-like model that scores text-voice alignment
- **CVVP** (Contrastive Voice-Voice Prediction): Optional voice similarity scoring

## Key Features

| Feature | Detail |
|---------|--------|
| **Multi-voice cloning** | 2+ ~10s reference clips to clone any voice |
| **4 quality presets** | ultra_fast (30 iters), fast (80), standard (200), high_quality (400) |
| **Streaming TTS** | Socket server (port 5000), <500ms latency |
| **Performance** | 0.25-0.3 RTF on 4GB VRAM with DeepSpeed+KV cache+FP16 |
| **Prompt injection** | Bracket text redacted from speech but influences model |
| **Platform support** | NVIDIA GPU, Apple Silicon (MPS), Docker |
| **API** | Python API + CLI scripts (do_tts, read, read_fast) |

## Model Weights

8 models hosted on HuggingFace: autoregressive, classifier, clvp2, cvvp, diffusion_decoder, vocoder, rlg_auto, rlg_diffuser. Auto-downloaded on first use.

## Game Dev Application

TorToiSe is one of the highest-quality open-source TTS systems available, making it suitable for:
- **NPC voice generation**: Clone voice actors or create unique character voices from reference audio
- **Dialogue prototyping**: Generate placeholder voice lines with realistic prosody during development
- **Multi-language support**: The tokenizer supports multiple languages

However, it requires significant GPU resources compared to lighter alternatives like [[ai-game-devtools/kitten-tts]] or [[ai-game-devtools/matcha-tts]].

## Comparison with Other TTS Systems

- vs [[ai-game-devtools/style-tts-2]]: Both use diffusion. StyleTTS 2 is faster and focuses on style transfer; TorToiSe prioritizes multi-voice cloning quality.
- vs [[ai-game-devtools/glow-tts]]: TorToiSe is autoregressive+diffusion (higher quality, slower); Glow-TTS uses flow-based parallel generation (faster, simpler alignment via MAS).
- vs [[ai-game-devtools/chat-tts]]: ChatTTS is optimized for conversational speech with prosody control; TorToiSe is a general-purpose high-fidelity TTS.
- A C++ port exists: [[ai-game-devtools/tortoise-cpp]] for deployment without Python dependency.

## Related Projects

- [[ai-game-devtools/tortoise-cpp]] — C++ inference port of TorToiSe
- [[ai-game-devtools/style-tts-2]] — Diffusion-based TTS with style transfer
- [[ai-game-devtools/chat-tts]] — Conversational TTS with fine-grained control
- [[ai-game-devtools/cosyvoice]] — Industrial-grade TTS with streaming support
- [[ai-game-devtools/kitten-tts]] — Lightweight on-device TTS
