---
title: RealtimeTTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, ai-model, open-source, speech, tts]
sources: [raw/articles/ai-game-devtools/realtime-tts.md]
---

# RealtimeTTS

**GitHub:** [KoljaB/RealtimeTTS](https://github.com/KoljaB/RealtimeTTS)
**Version:** 0.6.1
**License:** MIT (library); engine providers may restrict commercial use
**Python:** >= 3.9, < 3.15

## Overview

RealtimeTTS is a low-latency text-to-speech library designed for real-time applications. It converts text streams into high-quality audio output with minimal latency, making it especially suitable for LLM output streaming — text generated character-by-character can be spoken almost instantly.

## Key Features

- **Near-instantaneous TTS conversion**, compatible with LLM streaming outputs
- **High-quality audio** with clear, natural-sounding speech
- **20+ TTS engine support** — switch between cloud APIs and local models
- **Fallback mechanism** — automatically switches to alternative engines on disruption
- **Multilingual** support with NLTK and Stanza sentence tokenizers

## Supported Engines

### Local Engines (🏠 no internet required)
- **CoquiEngine** — Neural TTS with voice cloning (~4-5 GB VRAM)
- **PiperEngine** — Very fast, runs on Raspberry Pi
- **KokoroEngine** — Fast local TTS with multi-language support
- **StyleTTS2Engine** — Expressive, natural speech synthesis
- **OrpheusEngine** — Llama-powered TTS with emotion tags
- **SystemEngine** — Built-in system TTS via pyttsx3
- **ParlerEngine** — Local neural TTS for high-end GPUs
- **PocketTTSEngine** — Kyutai Labs 100M model, CPU-optimized (~6x real-time)
- **NeuTTSEngine** — Voice cloning with 3-second reference audio
- **ZipVoiceEngine** — 123M zero-shot model
- **FasterQwenEngine** — Local fast voice cloning
- **OmnivoiceEngine** — Hundreds of languages, high-quality voice cloning

### Cloud Engines (🌐 requires internet)
- **OpenAIEngine** — OpenAI TTS with 6 premium voices
- **AzureEngine** — Microsoft Azure (500k free chars/month)
- **ElevenlabsEngine** — Premium voice quality
- **EdgeEngine** — Microsoft Edge free TTS
- **GTTSEngine** — Google Translate TTS (free, no GPU)
- **CambEngine** — CAMB AI MARS models, 140+ languages
- **MiniMaxEngine** — MiniMax Cloud TTS, 12 voice presets
- **CartesiaEngine** — Fast API-based high-quality synthesis

## Architecture

The library centers on the `TextToAudioStream` class which:
1. Accepts text input as strings, generators, or character iterators
2. Splits incoming text into sentences via NLTK/Stanza tokenizers
3. Synthesizes audio through the configured engine(s)
4. Buffers and streams audio playback via PyAudio
5. Provides callbacks for text/audio stream start/stop events

Key configuration parameters include `buffer_threshold_seconds`, `fast_sentence_fragment`, and `minimum_sentence_length` for fine-tuning latency vs. smoothness tradeoffs.

## Installation

```bash
pip install realtimetts[all]  # Full installation
pip install realtimetts[azure,openai]  # Selective installation
```

## Game Dev Relevance

RealtimeTTS is valuable for AI game development in several scenarios:
- **NPC dialogue**: Stream LLM-generated dialogue directly to speech for real-time NPC conversations
- **Voice assistants**: Build in-game voice assistants with low-latency audio feedback
- **Accessibility**: Provide real-time audio narration for visually impaired players
- **Dynamic narration**: Generate narration for procedurally generated content on-the-fly

## Related Projects

- [[gpt-sovits]] — Popular Chinese/English voice cloning TTS
- [[chat-tts]] — Conversational TTS with emotional control
- [[openvoice]] — MyShell 零样本声音克隆 TTS
