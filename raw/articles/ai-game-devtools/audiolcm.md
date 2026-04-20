# AudioLCM: Text-to-Audio Generation with Latent Consistency Models

**Source**: https://github.com/liuhuadai/AudioLCM
**Date**: 2026-04-20
**arXiv**: https://arxiv.org/abs/2406.00356v1

## README Summary

AudioLCM is a PyTorch implementation of text-to-audio generation using Latent Consistency Models (LCM). It produces high-fidelity audio samples from text descriptions with very few sampling steps (as low as 2 steps).

### Authors
Huadai Liu, Rongjie Huang, Yang Liu, Hengyuan Cao, Jialei Wang, Xize Cheng, Siqi Zheng, Zhou Zhao

### Key Links
- arXiv: 2406.00356v1
- HuggingFace Space: https://huggingface.co/spaces/AIGC-Audio/AudioLCM
- HuggingFace Weights: https://huggingface.co/liuhuadai/AudioLCM
- Demo: https://audiolcm.github.io/

### Architecture
- **Base framework**: Latent Diffusion Model (LDM) adapted from Stable Diffusion / Make-An-Audio
- **Sampler**: LCM (Latent Consistency Model) sampler — enables 2-step generation vs 100+ for standard DDIM
- **Text encoder**: T5-v1_1-large + BERT-base-uncased
- **Audio encoder**: CLAP (Contrastive Language-Audio Pretraining) for text-audio alignment
- **Vocoder**: BigVGAN (neural vocoder, converts mel-spectrograms to waveform at 16kHz)
- **VAE**: Variational AutoEncoder for compressing mel-spectrograms to latent space

### Training Pipeline
1. **VAE Training**: `python main.py --base configs/train/vae.yaml` (multi-GPU, 8 GPUs)
2. **Latent Diffusion Training**: `python main.py --base configs/autoencoder1d.yaml`
3. Both use pytorch-lightning with multi-GPU support

### Inference
```bash
python scripts/txt2audio_for_lcm.py --ddim_steps 2 -b configs/audiolcm.yaml \
  --sample_rate 16000 --vocoder-ckpt vocoder/logs/bigvnat16k93.5w \
  --outdir results --test-dataset audiocaps -r ckpt/audiolcm.ckpt
```

Supports both LCM sampler (fast, 2 steps) and PLMS sampler (slower, traditional).

### Dependencies
- torch 1.12.1+cu113, torchaudio 0.12.1, torchvision 0.13.1
- pytorch-lightning 1.7.0
- librosa 0.10.1, torchlibrosa 0.1.0
- huggingface_hub 0.20.2
- taming-transformers-rom1504
- omegaconf 2.3.0

### Dataset Preparation
- Dataset must be in TSV format with columns: name, dataset, audio_path, caption, mel_path
- Mel-spectrogram preprocessing: `python ldm/data/preprocess/mel_spec.py --tsv_path tmp.tsv`
- Sample TSV provided: audiocaps_test_16000_struct.tsv

### Acknowledgements
Code based on Make-An-Audio, CLAP, and Stable Diffusion.

### License
No explicit LICENSE file found.

### Key Source Files
- `main.py` (845 lines) — Training entry point, pytorch-lightning trainer setup
- `scripts/txt2audio_for_lcm.py` (274 lines) — Text-to-audio inference script with LCM sampler
- `ldm/modules/new_attention.py` — Custom attention modules
- `ldm/modules/losses_audio/` — Perceptual loss functions for audio (VQ, contperceptual, LPAPS)
- `ldm/modules/encoders/open_clap/` — CLAP text encoder wrapper
- `vocoder/bigvgan/` — BigVGAN vocoder implementation
- `wav_evaluation/` — Audio quality evaluation (CLAP score, FAD score)
- `configs/` — YAML configuration files for training and inference
