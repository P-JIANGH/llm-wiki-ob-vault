# Diff-BGM: A Diffusion Model for Video Background Music Generation

Source: https://github.com/sizhelee/Diff-BGM
Paper: CVPR 2024

## Overview
Official implementation of CVPR 2024 paper "Diff-BGM: A Diffusion Model for Video Background Music Generation".

Authors: Sizhe Li, Yiming Qin, Minghang Zheng, Xin Jin, Yang Liu.

## Architecture
- Based on Latent Diffusion Model (LDM) architecture, adapted from [Polyffusion](https://github.com/aik2mlj/polyffusion)
- Uses Stable Diffusion-style U-Net with attention mechanism
- Auto-encoder maps between piano-roll space and latent space
- Diffusion process works on latent piano-roll representations
- Supports multiple conditioning modes: chord (chd), piano-note tree (pnotree), text (txt), visual features, and their combinations

## Key Components
- **Stable Diffusion Module**: UNetModel, LatentDiffusion, DDPM/DDIM samplers
- **Parameter Configs**: Multiple training configurations (ldm_chd8bar, ldm_pnotree, ldm_txt, ldm_txtvnl, ldm_concat)
- **Training Pipeline**: LDM, DDPM, Autoencoder, Chord 8-bar training scripts
- **Inference**: SDF Sampler with inpainting, autoregressive generation, classifier-free guidance

## Datasets
- **POP909**: Pop music dataset with piano-roll features
- **BGM909**: Video background music dataset with video features extracted via VideoCLIP, BLIP captions, Bert-base-uncased language encoder, and TransNetV2 shot detection

## Model Variants & Performance
| Backbone | PCHE | GPS | SI | P@20 |
| -------- | ---- | --- | -- | ---- |
| Diff-BGM (original) | 2.840 | 0.601 | 0.521 | 44.10 |
| Diff-BGM (only visual) | 2.835 | 0.514 | 0.396 | 43.20 |
| Diff-BGM (w/o SAC-Att) | 2.721 | 0.789 | 0.523 | 38.47 |

## Inference Features
- Generate music from video features (visual + caption)
- Inpainting: remaining, below (accompaniment for melody), above (melody for accompaniment), bars
- Autoregressive generation for longer music segments
- Polydis reconstruction for aftertouch and expressive MIDI output
- Output in MIDI format, convertible to WAV/MP3 via fluidsynth + ffmpeg

## Tech Stack
- PyTorch 1.10.1
- librosa, music21, muspy, pretty_midi (MIR libraries)
- OmegaConf (config management)
- OpenCV, PIL (visual processing)

## License
Not explicitly stated in README
