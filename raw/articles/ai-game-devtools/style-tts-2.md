# StyleTTS 2: Towards Human-Level Text-to-Speech through Style Diffusion and Adversarial Training with Large Speech Language Models

## Source
- GitHub: https://github.com/yl4579/StyleTTS2
- Paper: https://arxiv.org/abs/2306.07691
- Audio samples: https://styletts2.github.io/
- HuggingFace Demo: https://huggingface.co/spaces/styletts2/styletts2
- License: MIT (code) / Special conditions (pre-trained models)
- Authors: Yinghao Aaron Li, Cong Han, Vinay S. Raghavan, Gavin Mischler, Nima Mesgarani

## README Summary

StyleTTS 2 is a text-to-speech (TTS) model that leverages style diffusion and adversarial training with large speech language models (SLMs) to achieve human-level TTS synthesis.

Key innovations over StyleTTS 1:
1. **Style as latent random variable** — Models styles through diffusion models to generate the most suitable style for text without requiring reference speech
2. **Efficient latent diffusion** — Benefits from diverse speech synthesis offered by diffusion models
3. **SLM adversarial training** — Uses large pre-trained SLMs (e.g., WavLM) as discriminators with novel differentiable duration modeling for end-to-end training

Results:
- Surpasses human recordings on single-speaker LJSpeech dataset
- Matches human recordings on multispeaker VCTK dataset
- Outperforms previous publicly available models for zero-shot speaker adaptation on LibriTTS

## Architecture

### Two-Stage Training
1. **First stage** — Pre-training with TMA (Text-Model Alignment) loss, monotonic alignment
2. **Second stage** — Joint training with style diffusion + SLM adversarial training

### Key Components
- **PL-BERT** — Pre-trained phoneme-level BERT for text encoding (English Wikipedia, 14-language multilingual available)
- **Text Aligner (ASR)** — Pre-trained on LibriTTS (EN), JVS (JP), AiShell (ZH)
- **Pitch Extractor (JDC)** — Pre-trained F0 extractor
- **Style Diffusion Model** — Transformer-based diffusion for latent style generation
- **SLM Discriminator** — WavLM-base-plus (768 hidden, 13 layers) as adversarial discriminator
- **Decoder** — HiFi-GAN or iSTFTNet vocoder (configurable)

### Model Configuration (LJSpeech default)
- Sample rate: 24kHz
- Style dimension: 128
- Hidden dimension: 512
- Diffusion transformer: 3 layers, 8 heads, 64 head features
- Hop length: 300 frames
- Phoneme tokens: 178

## Dependencies
torch, torchaudio, transformers, accelerate, librosa, nltk, phonemizer, einops, monotonic_align

## Pre-trained Models
- LJSpeech (single-speaker): https://huggingface.co/yl4579/StyleTTS2-LJSpeech
- LibriTTS (multi-speaker): https://huggingface.co/yl4579/StyleTTS2-LibriTTS

## File Structure
- `train_first.py` — First stage training script
- `train_second.py` — Second stage training (DP, DDP not working)
- `train_finetune.py` — Fine-tuning script for new speakers
- `train_finetune_accelerate.py` — Single-GPU accelerated fine-tuning
- `models.py` — Core model architecture
- `meldataset.py` — Mel-spectrogram dataset loader
- `Modules/` — HiFi-GAN, iSTFTNet, SLM adversarial module, discriminators
- `Utils/` — Pre-trained ASR, JDC, PL-BERT modules
- `Configs/` — YAML configs (LJSpeech, LibriTTS, fine-tuning)
- `Demo/` — Inference notebooks (LJSpeech, LibriTTS)
- `Colab/` — Google Colab demo notebooks

## Known Issues
- DDP (accelerator) does not work for `train_second.py` (uses DP instead)
- NaN loss possible with improper batch size or mixed precision
- Inference depends on GPL-licensed phonemizer package (forks available for MIT-compliant usage)
- High-pitched background noise on older GPUs (FP32 precision differences)

## Game Dev Relevance
- **NPC Dialogue** — Human-level natural speech synthesis for game characters
- **Zero-shot Voice Cloning** — Generate new character voices from short reference samples
- **Multilingual Support** — PL-BERT supports 14 languages via multilingual variant
- **Fine-tuning** — Can fine-tune on custom character voices with ~1 hour of data
- **Style Control** — Diffusion-based style generation allows diverse emotional/tonal variations
