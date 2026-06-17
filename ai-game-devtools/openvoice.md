---
title: OpenVoice
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, speech, ai]
sources: [raw/articles/ai-game-devtools/openvoice.md]
---

# OpenVoice

Instant voice cloning framework by MyShell AI, capable of accurate tone color cloning, flexible voice style control, and zero-shot cross-lingual voice cloning.

## Overview

OpenVoice provides instant voice cloning with three key capabilities:

1. **Tone Color Cloning** — accurately clone reference voice timbre
2. **Style Control** — granular control over emotion, accent, rhythm, pauses
3. **Cross-lingual** — zero-shot voice cloning across languages without multilingual training data

V2 (April 2024) adds better audio quality and native support for English, Spanish, French, Chinese, Japanese, and Korean. MIT licensed for free commercial use.

## Architecture

Based on VITS architecture with a reference encoder (`ref_enc`) for speaker embedding extraction:

- **BaseSpeakerTTS** — text-to-speech using built-in speaker voices
- **ToneColorConverter** — voice style transfer between source and target speakers
- **Speaker Extractor** — uses Whisper or VAD to segment audio, then extracts speaker embeddings (se.pth)
- **Watermarking** — built-in wavmark for output audio provenance

## Key Facts

| Attribute | Value |
|-----------|-------|
| Organization | MyShell AI |
| License | MIT (V1 & V2) |
| Python | >= 3.9 |
| Languages | EN, ES, FR, ZH, JA, KO (native) |
| Paper | arXiv:2312.01479 |
| Web UI | Gradio-based |
| Usage | Powers myshell.ai since May 2023 |

## Technical Stack

- **Core:** PyTorch, VITS-based synthesis
- **Audio:** librosa, faster-whisper, pydub
- **Watermark:** wavmark
- **Text Processing:** pypinyin, cn2an, jieba (Chinese), langid
- **UI:** Gradio

## Differences from Similar Tools

- vs [[chat-tts]] — OpenVoice focuses on voice cloning/style transfer, while ChatTTS focuses on conversational TTS quality
- vs [[bert-vits2]] — Both VITS-based, but OpenVoice adds zero-shot cross-lingual cloning and watermarking
- vs [[cosyvoice]] — Both support multi-lingual TTS; OpenVoice has MIT license, CosyVoice has different architecture
- vs [[gpt-sovits]] — Both offer voice cloning; OpenVoice uses VITS2-style ref_enc, GPT-SoVITS uses GPT+SoVITS pipeline

## Links

- [GitHub](https://github.com/myshell-ai/OpenVoice)
- [Website](https://research.myshell.ai/open-voice)
- [Paper](https://arxiv.org/abs/2312.01479)
