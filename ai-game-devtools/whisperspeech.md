---
title: WhisperSpeech
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, speech, audio, tts, python, pytorch, multimodal]
sources: [raw/articles/ai-game-devtools/whisperspeech.md]
---

# WhisperSpeech

**WhisperSpeech** is an open-source text-to-speech (TTS) system by [Collabora](https://www.collabora.com) that creates speech by "inverting" OpenAI [[whisper]] — instead of audio→text, it generates text→audio. The project aims to be for speech what Stable Diffusion is for images: powerful, hackable, and commercially safe.

## Overview

| Attribute | Value |
|-----------|-------|
| **Developer** | Collabora + LAION community |
| **License** | MIT (code) / Apache-2.0 (models) |
| **Language** | Python 3.7+, PyTorch ≥2.0 |
| **Version** | 0.8.9 |
| **Current Language** | English (LibreLight) |
| **Status** | Active, multilingual release planned |

## Architecture

WhisperSpeech uses a **two-stage token-based pipeline** inspired by [[audiogpt|AudioLM]], SPEAR-TTS, and [[musicgen]]:

| Stage | Component | Technology | Purpose |
|-------|-----------|------------|---------|
| 1. Semantic | **T2S** | `TSARTransformer` | Text → semantic tokens (Whisper-based) |
| 2. Acoustic | **S2A** | `SADelARTransformer` | Semantic tokens → acoustic tokens (EnCodec) |
| 3. Vocoder | **A2WAV** | `Vocoder` (Vocos) | Acoustic tokens → high-fidelity waveform |

### Voice Cloning

Speaker embeddings are extracted via **SpeechBrain ECAPA-TDNN** from the first 30 seconds of a reference audio file. The pipeline supports one-click voice cloning — demonstrated with historical recordings (e.g., Winston Churchill's radio broadcasts).

### Performance

- **12× real-time** on RTX 4090 (with `torch.compile`, KV-caching, layer optimizations)
- **Multilingual evidence**: a tiny S2A model trained on en+pl+fr successfully cloned French voices using semantic tokens frozen on English + Polish, suggesting one tokenizer could cover all languages
- Supports **code-switching** within a single sentence

## Tech Stack

- **Core**: PyTorch 2.0+, torchaudio, soundfile
- **Vocoder**: [Vocos](https://github.com/charactr-platform/vocos)
- **Speaker encoder**: SpeechBrain (`spkrec-ecapa-voxceleb`)
- **Data loading**: webdataset
- **Dev framework**: nbdev (Jupyter notebooks → source code)
- **Inference interfaces**: Python API, Jupyter notebooks, Colab

## Key Files

| File | Purpose |
|------|---------|
| `pipeline.py` | High-level `Pipeline` class coordinating T2S → S2A → Vocoder |
| `t2s_up_wds_mlang_enclm.py` | Text-to-semantic transformer model |
| `s2a_delar_mup_wds_mlang.py` | Semantic-to-acoustic transformer model |
| `modules.py` | Transformer blocks, multi-head attention, μP initialization |
| `vq_stoks.py` | Vector quantization for semantic tokens |
| `a2wav.py` | Vocoder wrapper |
| `inference.py` | Model loading and compute device utilities |

## Pre-trained Models

Models and datasets hosted on HuggingFace:
- **Models**: `collabora/whisperspeech`
- **Datasets**: `collabora/whisperspeech`

## Comparison with Similar TTS Tools

| Tool | Architecture | Voice Cloning | License | Key Difference |
|------|-------------|---------------|---------|----------------|
| **WhisperSpeech** | Whisper inversion + EnCodec + Vocos | ✅ Yes | MIT/Apache-2.0 | Commercially safe, fully open data |
| [[bark]] | GPT-style autoregressive | ✅ Yes | MIT | Direct waveform generation, heavier |
| [[cosyvoice]] | Flow matching + LLM | ✅ Yes | Apache-2.0 | Alibaba, ultra-low latency |
| [[chattts]] | GAN + VAE | ✅ Yes | AGPL-3.0 | Chinese-optimized, conversational |
| [[style-tts-2]] | Style diffusion + adversarial | ✅ Zero-shot | MIT | Human-level quality on LJSpeech |

WhisperSpeech's unique position is its **wholly open pipeline** — both code and training data are properly licensed, making it suitable for commercial game development without legal uncertainty.

## Roadmap

- [ ] Large emotive-speech dataset
- [ ] Emotion & prosody conditioning
- [ ] Community multilingual data drive
- [ ] Final multilingual model release

## Related Pages

- [[whisper]] — OpenAI's speech recognition model that WhisperSpeech inverts
- [[bark]] — Suno AI's generative TTS model
- [[tts-generation-webui]] — Unified web UI for TTS models including WhisperSpeech

## References

- GitHub: https://github.com/collabora/WhisperSpeech
- Colab demo: https://colab.research.google.com/drive/1xxGlTbwBmaY6GKA24strRixTXGBOlyiw
- HuggingFace: https://huggingface.co/collabora/whisperspeech
