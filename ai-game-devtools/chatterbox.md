---
title: Chatterbox TTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, speech, tts, python, ai]
sources: [raw/articles/ai-game-devtools/chatterbox.md]
---

# Chatterbox TTS

**Chatterbox** is a family of open-source text-to-speech (TTS) and voice conversion models by **Resemble AI**. The latest version, **Chatterbox-Turbo**, is a 350M parameter model with single-step speech-token-to-mel decoding and native paralinguistic tag support.

## Model Variants

| Model | Size | Languages | Best For |
|-------|------|-----------|----------|
| **Chatterbox-Turbo** | 350M | English | Zero-shot voice agents, production (low latency) |
| Chatterbox-Multilingual | 500M | 23+ | Global applications, localization |
| Chatterbox (original) | 500M | English | Creative TTS with CFG/exaggeration controls |

## Architecture

The Turbo model consists of four components:

1. **T3 (Text-to-Token)** — GPT2-medium autoregressive transformer that converts text tokens (50276 vocab via HuggingFace tokenizer) to discrete speech tokens (6561 vocab). Supports top-k/top-p sampling with repetition penalty.

2. **S3Gen (Speech Token Generator)** — Distilled decoder using **MeanFlow** (integral mean flow matching) to reduce mel spectrogram generation from 10 steps to **1 step**. Includes HiFiGAN vocoder for waveform synthesis at 24kHz.

3. **VoiceEncoder** — Extracts speaker embeddings from ~15s reference audio for zero-shot voice cloning.

4. **Perth Watermarker** — Built-in imperceptible neural watermark for responsible AI; survives MP3 compression and common audio editing.

## Key Features

- **Paralinguistic Tags**: Native support for `[laugh]`, `[cough]`, `[chuckle]` etc. in generated speech
- **Zero-shot Voice Cloning**: Clone any voice from a single 10+ second reference clip
- **Multilingual Support**: 23 languages including Chinese, Japanese, Korean, Arabic, Hindi
- **Low Latency**: Sub-200ms for production use in voice agents
- **Built-in Watermarking**: Neural watermark survives compression and editing

## Game Dev Use Cases

- **NPC Dialogue Generation**: Zero-shot TTS for character voices from short voice actor references
- **Voice Agents**: Low-latency speech synthesis for in-game AI assistants
- **Localization**: Multilingual model supports 23 languages for game localization
- **Dynamic Narration**: Creative speech generation with paralinguistic tags for realistic emotion

## Dependencies

- PyTorch 2.6.0+, torchaudio
- Transformers 5.2.0, Diffusers 0.29.0
- Librosa, Conformer, S3Tokenizer

## License

Apache-2.0

## Links

- [GitHub](https://github.com/resemble-ai/chatterbox)
- [HuggingFace Demo](https://huggingface.co/spaces/ResembleAI/chatterbox-turbo-demo)
- [Podonos Evaluation](https://podonos.com/resembleai/chatterbox)

## Related

- [[cosyvoice]] — FunAudioLLM's TTS system, acknowledged by Chatterbox
- [[gpt-sovits]] — Popular open-source zero-shot TTS, alternative approach
- [[diffsinger]] — Diffusion-based singing voice synthesis by same paradigm
