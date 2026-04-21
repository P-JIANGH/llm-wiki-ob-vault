# XTTS (Coqui TTS)

> Source: https://github.com/coqui-ai/TTS
> Cloned: 2026-04-21
> License: MPL 2.0

## Overview

🐸TTS is a library for advanced Text-to-Speech generation by Coqui.ai. It provides:
- Pretrained models in +1100 languages
- Tools for training new models and fine-tuning existing models in any language
- Utilities for dataset analysis and curation

## Key Features

- High-performance Deep Learning models for Text2Speech tasks
    - Text2Spec models (Tacotron, Tacotron2, Glow-TTS, SpeedySpeech)
    - Speaker Encoder to compute speaker embeddings efficiently
    - Vocoder models (MelGAN, Multiband-MelGAN, GAN-TTS, ParallelWaveGAN, WaveGrad, WaveRNN)
- Fast and efficient model training
- Detailed training logs on the terminal and Tensorboard
- Support for Multi-speaker TTS
- Efficient, flexible, lightweight but feature complete `Trainer API`
- Released and ready-to-use models
- Tools to curate Text2Speech datasets under `dataset_analysis`
- Utilities to use and test your models
- Modular code base enabling easy implementation of new ideas

## Model Implementations

### Spectrogram models
- Tacotron, Tacotron2, Glow-TTS, Speedy-Speech, Align-TTS, FastPitch, FastSpeech, FastSpeech2, SC-GlowTTS, Capacitron, OverFlow, Neural HMM TTS, Delightful TTS

### End-to-End Models
- ⓍTTS v2 (16 languages, streaming <200ms latency)
- VITS
- 🐸 YourTTS
- 🐢 Tortoise
- 🐶 Bark

### Vocoders
- MelGAN, MultiBandMelGAN, ParallelWaveGAN, GAN-TTS discriminators, WaveRNN, WaveGrad, HiFiGAN, UnivNet

### Voice Conversion
- FreeVC

## Installation

```bash
pip install TTS
```

Requires Python >= 3.9, < 3.12

## Python API Example

```python
import torch
from TTS.api import TTS

device = "cuda" if torch.cuda.is_available() else "cpu"

# XTTS v2 voice cloning
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
wav = tts.tts(text="Hello world!", speaker_wav="my/cloning/audio.wav", language="en")
```

## Architecture

```
TTS/
├── bin/             # executables (train*.py, synthesize.py)
├── tts/             # text to speech models
│   ├── layers/      # model layer definitions
│   ├── models/      # model definitions
│   └── utils/       # model specific utilities
├── speaker_encoder/ # Speaker Encoder models
├── vocoder/         # Vocoder models
├── vc/              # Voice Conversion models
├── server/          # TTS server (Flask)
├── utils/           # common utilities
└── demos/           # demo notebooks
```

## Tech Stack

- Python 3.9-3.11
- PyTorch >= 2.1
- Cython
- NumPy, SciPy, librosa
- transformers, einops
- Flask (server)

## Entry Points

- `tts` - Command-line synthesis tool
- `tts-server` - Flask-based TTS server

## Recent News

- ⓍTTSv2 with 16 languages and better performance
- ⓍTTS fine-tuning code released
- ⓍTTS streaming with <200ms latency
- Bark inference with unconstrained voice cloning
- ~1100 Fairseq models support
- Tortoise with faster inference
