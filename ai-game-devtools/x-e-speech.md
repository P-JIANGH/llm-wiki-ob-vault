---
title: X-E-Speech
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, audio, speech, python]
sources: [raw/articles/ai-game-devtools/x-e-speech.md]
---

# X-E-Speech

Cross-lingual emotional speech generation framework that jointly trains non-autoregressive (NAR) text-to-speech (TTS) and voice conversion (VC) in a single model.

## What it is

X-E-Speech disentangles speaker style and cross-lingual content features through joint TTS+VC training. It can synthesize emotional speech in one language using a speaker from another language — without accent artifacts. The model is based on the VITS architecture with a frozen [[ai-game-devtools/whisper]] encoder providing content representations.

## Key Features

- **Cross-lingual TTS**: Generate Chinese/English/Japanese speech with speakers from other languages
- **Emotional TTS**: Control emotion (happy, sad, angry, surprise, etc.) via the ESD dataset
- **Cross-lingual VC**: Convert voice while preserving emotion and enabling language transfer
- **Joint Training**: Single model trained on both TTS and VC objectives simultaneously
- **Freeze-Finetune Strategy**: Freeze speaker-related layers, fine-tune content layers for accent-free cross-lingual synthesis

## Architecture

| Component | Details |
|-----------|---------|
| Base | VITS with hierarchical multi-pure modifications |
| Content Encoder | Whisper-large-v2 (frozen) |
| Text Encoder | Phoneme → hidden representations |
| Duration Predictor | Flow-based stochastic duration modeling |
| Vocoder | HiFi-GAN style with residual blocks |
| Speaker Embedding | 256-dim global conditioning |
| Languages | Chinese, English, Japanese (extensible via `n_langs`) |

## Training Pipeline

1. **Preprocess**: Resample to 16KHz, extract Whisper features, G2P conversion
2. **Joint Train**: Train on VCTK + Aishell3 + JVS datasets (cross-lingual TTS + VC)
3. **Emotional Train**: Add ESD dataset for emotion control
4. **Freeze-Finetune**: Freeze speaker parameters, fine-tune content parameters on mono-lingual data

## Inference Modes

- Cross-lingual Chinese TTS (`inference-cross-lingual-TTS-cn.py`)
- Cross-lingual English TTS (`inference-cross-lingual-TTS-en.py`)
- Cross-lingual emotional English TTS (`inference-cross-lingual-emotional-TTS-en.py`)
- Cross-lingual emotional VC (`inference-cross-lingual-emotional-VC.py`)

## Technical Specs

- **Parameters**: ~192 hidden channels, 6 layers, 2 attention heads
- **Audio**: 16KHz, 80-channel mel spectrogram, hop length 320
- **Training**: FP16, batch size 28, Adam (β=0.8, 0.99), lr=2e-4
- **Dependencies**: Python 3.7, PyTorch 1.13, transformers 4.25.1, Cython
- **License**: MIT

## Datasets

- VCTK (English), Aishell3 (Chinese), JVS (Japanese) — for cross-lingual training
- ESD (Emotional Speech Data) — for emotion control

## Related Work

Compared to [[ai-game-devtools/gpt-sovits]] (zero-shot TTS with reference audio), X-E-Speech focuses on cross-lingual emotional control through joint TTS+VC training rather than few-shot adaptation. Unlike [[ai-game-devtools/bert-vits2]] which uses BERT for Chinese TTS, X-E-Speech uses Whisper encoder for cross-lingual content features.

## Links

- GitHub: https://github.com/X-E-Speech/X-E-Speech-code
- Paper: https://openreview.net/forum?id=J4fL6FDz36
- Demo: https://X-E-Speech.github.io/X-E-Speech-demopage
- Pretrained: https://huggingface.co/x-e-speech/x-e-speech
