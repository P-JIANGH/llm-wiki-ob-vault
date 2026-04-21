# VoiceCraft: Zero-Shot Speech Editing and TTS

**Source:** https://github.com/jasonppy/VoiceCraft
**Cloned:** 2026-04-21 via gitcode.com mirror (GitHub timeout)
**arXiv:** https://arxiv.org/abs/2403.16973
**Paper:** VoiceCraft: Zero-Shot Speech Editing and Text-to-Speech in the Wild

## Overview
VoiceCraft is a token infilling neural codec language model that achieves SOTA on:
- Speech editing (modifying words/phrases in existing audio)
- Zero-shot text-to-speech (TTS) on in-the-wild data (audiobooks, internet videos, podcasts)

To clone or edit an unseen voice, VoiceCraft needs only a few seconds of reference audio.

## Architecture
- **Core:** Token infilling neural codec language model
- **Audio Encoding:** Custom Encodec (56M params, 4 codebooks, 2048 codes each, trained on Gigaspeech XL)
- **Codec Sample Rate:** 50Hz (from 16kHz audio with 320x downsample)
- **Token Rearrangement:** DelayedPatternProvider from Meta's audiocraft — interleaves codebooks for autoregressive generation
- **Model Sizes:** giga330M, giga830M (and TTS Enhanced variants)
- **Transformer:** Standard encoder architecture with sinusoidal positional embedding, LayerNorm, multi-head attention
- **Inference:** top-k/top-p filtering + temperature sampling, optional KV cache, beam search via MFA alignment

## Key Features
- **Zero-shot TTS:** Only needs a few seconds of reference audio to clone a voice
- **Speech Editing:** Modify specific words/phrases within existing audio while preserving the rest
- **Smart Transcript:** Write only what you want to generate
- **Long TTS Mode:** Handles long texts by processing part-by-part
- **Multiple Inference Modes:** Gradio UI, Colab, Docker, Command Line, Jupyter Notebook

## Training Data
- Gigaspeech dataset (HuggingFace download requires auth token)
- RealEdit dataset for training/evaluation
- LibriLight for TTS enhancement

## Tech Stack
- Python 3.9, PyTorch 2.0.1, CUDA 11.7
- Meta audiocraft (Encodec)
- Montreal Forced Aligner (MFA) for phoneme alignment
- espeak-ng for phonemization
- xformers for attention optimization
- HuggingFace Hub for model distribution
- Gradio for web UI
- Docker support (Jupyter-based)

## Available Models (HuggingFace)
- giga330M / giga830M — base speech editing + TTS
- giga330M_TTSEnhanced / giga830M_TTSEnhanced — optimized for TTS
- Custom Encodec model (56M, 4 codebooks, 2048 vocab)

## Deployment Options
1. **Google Colab:** Speech Editing / TTS notebooks
2. **Docker:** Full environment with Jupyter
3. **Local:** conda environment with all dependencies
4. **HuggingFace Spaces:** Web demo
5. **Replicate:** Cloud API
6. **Command Line:** tts_demo.py / speech_editing_demo.py as standalone scripts

## Licensing
- Code: CC BY-NC-SA 4.0
- Model Weights: Coqui Public Model License 1.0.0
- Some borrowed code under MIT / Apache 2.0 / GNU 3.0

## Key Files
- `models/voicecraft.py` — main VoiceCraft model class
- `models/codebooks_patterns.py` — token interleaving patterns (from audiocraft)
- `models/modules/` — Transformer, embedding, utilities
- `config.py` — comprehensive argparse configuration
- `inference_tts_scale.py` — TTS inference pipeline
- `gradio_app.py` — Gradio web UI
- `tts_demo.py` / `speech_editing_demo.py` — CLI demos
- `data/phonemize_encodec_encode_hf.py` — data preparation pipeline
- `z_scripts/e830M.sh` — training script for 830M model

## Authors
Puyuan Peng, Po-Yao Huang, Abdelrahman Mohamed, David Harwath
