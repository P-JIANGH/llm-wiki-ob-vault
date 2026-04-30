---
title: ChatTTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, speech, tts]
sources: [raw/articles/ai-game-devtools/chat-tts.md]
---

# ChatTTS

## Overview

ChatTTS is a generative speech model (TTS) designed specifically for dialogue scenarios such as LLM assistant applications. Developed by **2noise**, it supports English and Chinese with fine-grained prosodic control (laughter, pauses, interjections).

## Key Facts

| Attribute | Value |
|-----------|-------|
| **Organization** | 2noise (open-source@2noise.com) |
| **License** | AGPLv3+ (code), CC BY-NC 4.0 (model) |
| **Model Size** | Open-source: 40k-hours pre-trained base (no SFT) |
| **Training Data** | 100k+ hours (main model), 40k hours (open-source) |
| **Languages** | English, Chinese |
| **Min VRAM** | 4GB (30s clip), RTX 4090 RTF ~0.3 |
| **PyPI** | `pip install ChatTTS` |
| **HuggingFace** | [2Noise/ChatTTS](https://huggingface.co/2Noise/ChatTTS) |

## Architecture

**Autoregressive TTS pipeline** inspired by [[bark]] and VALL-E:

1. **Text Normalization** — Homophone replacement, text cleaning (Chinese/English)
2. **Text Refinement** — GPT-based prosody token insertion (`[oral_X]`, `[laugh]`, `[break_X]`)
3. **Audio Token Generation** — Autoregressive GPT predicts audio tokens
4. **Waveform Decoding** — DVAE decoder + Vocos vocoder → 24kHz waveform

### Components
- **GPT** — Autoregressive language model for audio token prediction
- **DVAE** — Discrete Variational Autoencoder (encoder + decoder)
- **Vocos** — Pretrained vocoder for waveform reconstruction
- **Speaker** — Random Gaussian speaker sampling + zero-shot audio-based voice cloning

## Technical Features

- **Streaming generation** — Real-time audio output with configurable batch size and speed
- **Speaker control** — Random speaker sampling or reference audio encoding (zero-shot voice cloning)
- **Prosody tokens** — Fine-grained control: `[oral_0-9]` (oral style), `[laugh_0-2]` (laughter), `[break_0-7]` (pauses), `[uv_break]`, `[lbreak]`
- **Multi-speaker** — Different speakers per text segment in a single generation
- **WebUI + CLI** — Gradio interface and command-line batch processing
- **Model flexibility** — HuggingFace, local, or custom path loading

## Comparison with Similar Tools

| Feature | ChatTTS | [[bark]] | [[bert-vits2]] | [[chatterbox]] |
|---------|---------|-----------|-------------------------------|--------------------------------|
| **Architecture** | Autoregressive GPT | Autoregressive Transformer | VITS (variational) | Flow-matching |
| **Dialogue optimized** | ✅ | Partial | ❌ | ✅ |
| **Zero-shot voice** | Audio-based | Speaker ID | Fine-tuning | Speaker ID |
| **Prosody control** | Text tokens | Text tags | Style tokens | Emotion tags |
| **Languages** | EN/CN | EN | Multi | EN |
| **Commercial use** | ❌ (CC BY-NC) | ✅ (MIT) | ✅ (Apache) | ✅ (MIT) |
| **Min VRAM** | 4GB | 4GB | 6GB | 4GB |

## Use Cases in Game Development

- **NPC dialogue** — Natural-sounding conversational speech for AI-driven characters
- **LLM assistant integration** — Voice output for in-game AI companions
- **Dynamic narration** — Streaming TTS for real-time story narration
- **Multi-character scenes** — Different speakers per line in automated dialogue

## Disclaimer

The released model intentionally includes high-frequency noise and compressed audio quality to prevent malicious use. A detection model is planned for open-source release.

## Links

- GitHub: https://github.com/2noise/ChatTTS
- HuggingFace: https://huggingface.co/2Noise/ChatTTS
- Discord: https://discord.gg/Ud5Jxgx5yD
- PyPI: https://pypi.org/project/ChatTTS
