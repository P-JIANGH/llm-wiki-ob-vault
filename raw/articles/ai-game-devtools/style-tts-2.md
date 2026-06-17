# StyleTTS 2

> Source: https://github.com/yl4579/StyleTTS2  
> License: MIT (code) / Pre-trained models have usage restrictions  
> Authors: Yinghao Aaron Li, Cong Han, Vinay S. Raghavan, Gavin Mischler, Nima Mesgarani (Columbia University)  
> Paper: arXiv:2306.07691

## Overview

StyleTTS 2 is a text-to-speech (TTS) model that achieves human-level synthesis through style diffusion and adversarial training with large speech language models (SLMs). It is the first TTS system to surpass human recordings on the single-speaker LJSpeech dataset and match human quality on the multi-speaker VCTK dataset.

## Key Innovations

- **Style Diffusion**: Models styles as a latent random variable through diffusion models to generate the most suitable style for the text without requiring reference speech
- **SLM Adversarial Training**: Uses large pre-trained SLMs (WavLM) as discriminators with differentiable duration modeling for end-to-end training
- **Zero-Shot Speaker Adaptation**: When trained on LibriTTS, outperforms previous publicly available models for zero-shot speaker adaptation

## Architecture Components

### Pre-trained Modules (in Utils/ folder)
- **ASR**: Text aligner pre-trained on English (LibriTTS), Japanese (JVS), Chinese (AiShell)
- **JDC**: Pitch extractor pre-trained on English (LibriTTS)
- **PL-BERT**: Pre-trained on English (Wikipedia); multilingual PL-BERT available for 14 languages

### Core Model Files
- `models.py`: Main model architecture including ResBlk, LearnedDownSample, LearnedUpSample, diffusion modules
- `Modules/diffusion/`: Diffusion sampler (KDiffusion, LogNormalDistribution), Transformer1d, StyleTransformer1d
- `Modules/discriminators.py`: MultiPeriodDiscriminator, MultiResSpecDiscriminator, WavLMDiscriminator
- `losses.py`: Loss functions
- `meldataset.py`: Mel-spectrogram dataset processing
- `train_first.py`: First stage training script
- `train_second.py`: Second stage training script
- `train_finetune.py` / `train_finetune_accelerate.py`: Fine-tuning scripts

## Training Pipeline

### Requirements
- Python >= 3.7
- PyTorch with CUDA support
- Dependencies: SoundFile, torchaudio, munch, pydub, pyyaml, librosa, nltk, matplotlib, accelerate, transformers, einops, monotonic_align
- Optional: phonemizer + espeak-ng for demo

### Data Format
`filename.wav|transcription|speaker`

### Two-Stage Training
1. **First stage**: `accelerate launch train_first.py --config_path ./Configs/config.yml`
2. **Second stage**: `python train_second.py --config_path ./Configs/config.yml` (uses DP; DDP not working)

### Fine-tuning
```bash
python train_finetune.py --config_path ./Configs/config_ft.yml
# Single GPU with accelerate:
accelerate launch --mixed_precision=fp16 --num_processes=1 train_finetune_accelerate.py --config_path ./Configs/config_ft.yml
```

### Key Configurations
- `OOD_data`: Out-of-distribution texts for SLM adversarial training
- `min_length` / `max_len`: Audio length constraints (frame-based; default hop size 300 @ 24kHz)
- `multispeaker`: Enable for multi-speaker models
- `batch_percentage`: Controls batch size during SLM adversarial training to avoid OOM

## Pre-trained Models
- **LJSpeech** (single-speaker, 24kHz): https://huggingface.co/yl4579/StyleTTS2-LJSpeech
- **LibriTTS** (multi-speaker, zero-shot): https://huggingface.co/yl4579/StyleTTS2-LibriTTS

## Inference
- Single-speaker: `Demo/Inference_LJSpeech.ipynb`
- Multi-speaker: `Demo/Inference_LibriTTS.ipynb` (requires reference_audio.zip)
- Colab demos available for both

## Common Issues
- **Loss NaN**: Avoid mixed precision in first stage; use batch size >= 16
- **OOM**: Lower `batch_size` or `max_len`
- **High-pitched noise**: Caused by float precision on older GPUs; use modern GPUs or CPU inference
- **Non-English**: Requires language-specific PL-BERT model

## References
- Paper: https://arxiv.org/abs/2306.07691
- Audio samples: https://styletts2.github.io/
- Online demo: https://huggingface.co/spaces/styletts2/styletts2
- Forks: NeuralVox/StyleTTS2 (GPL, importable + streaming API), PyPI `styletts2` (MIT, uses gruut)
