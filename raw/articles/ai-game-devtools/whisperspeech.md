# WhisperSpeech

**GitHub:** https://github.com/collabora/WhisperSpeech  
**License:** MIT (code), Apache-2.0 (models trained on properly licensed data)  
**Author:** Jakub Piotr Cłapa (Collabora)  
**Version:** 0.8.9

## Overview

WhisperSpeech is an open-source text-to-speech (TTS) system created by "inverting" OpenAI Whisper. The project's goal is to be for speech what Stable Diffusion is for images — powerful, hackable, and commercially safe. All code is Apache-2.0 / MIT, and models are trained only on properly licensed data.

Current release supports English (LibreLight dataset). Multilingual release is planned.

## Architecture

WhisperSpeech follows the two-stage, token-based pipeline popularized by AudioLM, Google's SPEAR TTS, and Meta's MusicGen:

| Stage | Model | Purpose |
|-------|-------|---------|
| **Semantic** | Whisper | Transcription → semantic tokens |
| **Acoustic** | EnCodec | Tokenize waveform (1.5 kbps) |
| **Vocoder** | Vocos | High-fidelity audio reconstruction |

### Pipeline Components

1. **T2S (Text-to-Semantic)** — `TSARTransformer` converts text to semantic tokens
2. **S2A (Semantic-to-Acoustic)** — `SADelARTransformer` converts semantic tokens to acoustic tokens
3. **Vocoder** — `Vocoder` decodes acoustic tokens to waveform

### Key Features

- Voice cloning from short audio samples (speaker embedding extraction via SpeechBrain ECAPA-TDNN)
- Multilingual capability: tiny model trained on en+pl+fr successfully clones French voices using semantic tokens frozen on English + Polish
- 12× real-time inference on RTX 4090 (with torch.compile, KV-caching, layer tweaks)
- Code-switching within one sentence
- Default speaker embedding included (192-dim)

## Tech Stack

- Python 3.7+
- PyTorch >= 2.0
- torchaudio, soundfile
- vocos (vocoder)
- speechbrain (speaker encoder)
- webdataset, huggingface_hub
- fastprogress, fastcore

## Repository Structure

```
whisperspeech/
├── whisperspeech/          # Main package
│   ├── pipeline.py         # High-level inference Pipeline
│   ├── modules.py          # Neural modules (Transformer blocks, attention)
│   ├── t2s_up_wds_mlang_enclm.py   # T2S model (Text-to-Semantic)
│   ├── s2a_delar_mup_wds_mlang.py  # S2A model (Semantic-to-Acoustic)
│   ├── s2a_delar_mup_wds_mlang_cond.py  # Conditional S2A
│   ├── a2wav.py            # Vocoder wrapper
│   ├── vq_stoks.py         # Vector quantization for semantic tokens
│   ├── vad.py / vad_merge.py  # Voice activity detection
│   ├── inference.py        # Inference utilities
│   ├── languages.py        # Language code mappings
│   ├── train.py / train_multi.py  # Training scripts
│   └── ...
├── examples/               # Usage examples
├── nbs/                    # Jupyter notebooks (nbdev)
├── whisper-finetuning/     # Whisper fine-tuning utilities
├── Inference example.ipynb
├── Long-form inference.ipynb
├── setup.py
└── settings.ini
```

## Training Data

- English: LibreLight dataset
- Multilingual experiments: English + Polish + French
- Goal: community-driven freely licensed multilingual speech dataset

## Pre-trained Models

- HuggingFace: https://huggingface.co/collabora/whisperspeech
- Datasets: https://huggingface.co/datasets/collabora/whisperspeech

## Roadmap

- [ ] Gather large emotive-speech dataset
- [ ] Condition generation on emotion & prosody
- [ ] Community drive for freely licensed multilingual speech
- [ ] Train final multilingual models

## Key People & Organizations

- **Collabora** — code & training
- **LAION** — community & datasets
- **Jülich Supercomputing Centre** — compute (JUWELS Booster)
- Additional compute: Gauss Centre for Supercomputing / John von Neumann Institute for Computing (NIC)

## Citations

Based on: SPEAR-TTS, MusicGen, Whisper, EnCodec, Vocos
