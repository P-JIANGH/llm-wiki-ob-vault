# StableTTS — Raw Source Analysis

**Source:** https://github.com/KdaiP/StableTTS
**Date:** 2026-04-21
**Category:** Speech (TTS)

## Overview
StableTTS is a fast and lightweight TTS model for Chinese, English, and Japanese speech generation, using flow-matching and DiT (Diffusion Transformer). It has 31M parameters (V1.1).

## Key Features
- First open-source TTS combining flow-matching and DiT, inspired by Stable Diffusion 3
- 31M parameters (upgraded from 10M in V1.0)
- Multilingual: Chinese, English, Japanese in a single checkpoint
- Gradio WebUI for interactive use
- Supports CFG (Classifier-Free Guidance)
- FireflyGAN and Vocos vocoder support
- Voice cloning via reference audio (MelStyleEncoder)

## Architecture
- **Text Encoder:** Diffusion Convolution Transformer (DiT + FFT/FastSpeech Feed-forward Transformer)
- **Flow-Matching Decoder:** CFMDecoder with FiLM-conditioned timestep embedding + U-Net-like long skip connections
- **Duration Predictor:** Predicts phoneme-to-mel alignment durations
- **Reference Encoder:** MelStyleEncoder extracts speaker embedding from reference audio
- **Monotonic Alignment Search (MAS):** VITS-style alignment between text and mel spectrogram
- **ODE Solver:** torchdiffeq for diffusion sampling (reversible ODE integration)

## Training Pipeline
1. Generate text-audio filelists (recipes for open-source datasets in `./recipes`)
2. Preprocess with `preprocess.py` (process mel spectrograms + phonemes, multilingual separately)
3. Train with `train.py` (auto-detects pretrained checkpoints for finetuning)
4. Optional vocoder training (Vocos or fishaudio vocoder)

## Technical Details
- Sample rate: 44100 Hz, 128 mel channels
- Hidden channels: 256, 4 attention heads
- Encoder: 3 layers, Decoder: 6 layers (DiT)
- Cosine timestep scheduler (from CosyVoice)
- Training: text+audio pairs only, no speaker ID needed
- Pretrained on 600 hours of data

## Dependencies
PyTorch, torchaudio, tensorboard, numba, torchdiffeq
G2P: pypinyin, jieba (Chinese), eng_to_ipa, unidecode, inflect (English), pyopenjtalk-prebuilt (Japanese)
WebUI: gradio

## License
MIT License

## Notable Design
- Uses fake_speaker and fake_content parameters for CFG dropout training
- Content-masking during flow-matching for better diversity
- Three losses: duration loss (MAS-based), prior loss (encoder-mel), flow matching loss (decoder-mel)
