# Tango — LLM-guided Diffusion-based Text-to-Audio Generation and DPO-based Alignment

Source: https://github.com/declare-lab/tango
Captured: 2026-04-20

## Overview
Tango is a latent diffusion model (LDM) for text-to-audio (TTA) generation. It can generate realistic audios including human sounds, animal sounds, natural and artificial sounds, and sound effects from textual prompts. Uses frozen instruction-tuned LLM Flan-T5 as text encoder and a UNet-based diffusion model for audio generation.

## Tango 2
Tango 2 builds upon Tango for text-to-audio generation, initialized with the Tango-full-ft checkpoint and underwent alignment training using DPO (Direct Preference Optimization) on Audio-Alpaca, a pairwise text-to-audio preference dataset containing ~15k (prompt, audio_w, audio_l) triplets.

## Model Family
| Model | Description |
|---|---|
| Tango | Base text-to-audio LDM (866M params) |
| Tango-Full-FT-Audiocaps | Full fine-tuned on AudioCaps |
| Tango-Full-FT-Audio-Music-Caps | Music variant |
| Mustango | Text-to-music generation variant |
| Tango-Full | Full model |
| Tango-2 | DPO-aligned version |
| Tango-2-full | Full DPO-aligned model |

## Architecture
- **Text Encoder**: Flan-T5 (instruction-tuned LLM), frozen during training
- **Diffusion Model**: UNet2DConditionModel (Diffusers library) with DDPMScheduler
- **VAE**: AutoencoderKL from AudioLDM (variational autoencoder for mel spectrogram ↔ waveform)
- **STFT**: TacotronSTFT for audio processing
- **Training**: Hugging Face accelerate for multi-GPU, SNR gamma weighting (γ=5)
- **Tango 2 Training**: SFT warmup (1 epoch) + DPO alignment (β=2000, lr=9.6e-7)

## Key Files
- `tango.py` — Main Tango class: load checkpoint, generate audio from text prompts
- `models.py` — AudioDiffusion nn.Module: UNet + text encoder + noise scheduler
- `train.py` — Training script with accelerate
- `inference_hf.py` — Hugging Face inference
- `tango2/tango2-train.py` — DPO training script for Tango 2
- `audioldm/` — Borrowed AudioLDM modules (VAE, HiFi-GAN, latent diffusion)
- `audioldm_eval/` — Objective evaluation metrics (FD, KL, FAD, IS, KID)

## Dependencies
torch 1.13.1, torchaudio 0.13.1, transformers 4.27.0, diffusers 0.18.2, accelerate 0.18.0, librosa 0.9.2, soundfile 0.12.1, omegaconf 2.3.0, einops 0.6.1

## Performance
- Tango (866M): FD 24.52, FAD 1.59, OVL 85.94, REL 80.36 (AudioCaps)
- Tango 2 (866M): FAD 2.69, KL 1.12, IS 9.09, CLAP 0.57, OVL 3.99, REL 4.07
- Trained on 63× smaller dataset than AudioLDM-L-Full, comparable performance
- Audio sampling rate: 16kHz

## License
CC BY-NC-ND 4.0 (Creative Commons Attribution-NonCommercial-NoDerivatives)

## Related Projects
- AudioLDM (upstream VAE/evaluation code borrowed)
- Audio-Alpaca dataset (pairwise preference data)
- TangoFlux (successor: 30s audio in <3s)
- Jam (lyrics-to-song generator from same lab)
