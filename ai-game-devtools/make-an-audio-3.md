---
title: Make-An-Audio 3
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, tool, open-source, music, python, flow-matching, text-to-audio]
sources: [raw/articles/ai-game-devtools/make-an-audio-3.md]
---

# Make-An-Audio 3

## Overview

**Make-An-Audio 3** is a **flow-based large Diffusion Transformer** for text-to-audio and text-to-music generation. It is the third iteration in the Make-An-Audio series, adopting the **Lumina-Next / Lumina-T2X** architecture (Flow-matching DiT) and extending it to the audio domain.

- **GitHub**: https://github.com/Text-to-Audio/Make-An-Audio-3
- **arXiv**: [2305.18474](https://arxiv.org/abs/2305.18474)
- **HuggingFace Demo**: https://huggingface.co/spaces/AIGC-Audio/Make-An-Audio-3
- **License**: Not explicitly stated (academic open-source)

## Key Facts

| Property | Value |
|----------|-------|
| Architecture | Flow-based Diffusion Transformer (CFM + NeuralODE) |
| Model Sizes | M (160M), L (520M), XL (750M), XXL, 3B (music) |
| Training Data | AudioCaption (audio), VGGSound (video→audio), Music datasets |
| Framework | PyTorch 2.1 + PyTorch Lightning 1.7 |
| Vocoder | BigVGAN (alias-free) |
| Sampling | NeuralODE with Euler solver, adjoint sensitivity (torchdyn) |
| Flash Attention | Required (flash-attn) |

## Capabilities

1. **Text-to-Audio**: Generate sound effects and environmental audio from text descriptions
2. **Text-to-Music**: Generate music from text prompts (dedicated config, up to 3B params)
3. **Video-to-Audio**: Generate synchronized audio from video input (MoE variant)

## Architecture Details

### Core: Conditional Flow Matching (CFM)

The model replaces traditional diffusion with **flow matching** — learning a continuous transformation from noise to audio via an ODE. The `CFM` class extends `LatentDiffusion_audio` with:

- Flow-based noise scheduling: `x_noisy = t * x1 + (1 - (1 - σ_min) * t) * x0`
- Target velocity field: `ut = x1 - (1 - σ_min) * x0`
- ODE-based sampling via `torchdyn.NeuralODE` (Euler solver, 25 timesteps default)

### Three-Tier Pipeline

```
Text/Video → DiT Encoder → Flow-Matching Latent Space → BigVGAN Vocoder → Audio Waveform
```

### Training Configs

| Config | Use Case | Model Size |
|--------|----------|------------|
| `txt2audio-cfm-cfg.yaml` | Text-to-audio | M (160M) |
| `txt2audio-cfm-cfg-XL.yaml` | Text-to-audio | XL (750M) |
| `txt2audio-cfm-cfg-XXL.yaml` | Text-to-audio | XXL |
| `txt2music-cfm-cfg.yaml` | Text-to-music | M (160M) |
| `video2audio-cfm-cfg-moe.yaml` | Video-to-audio | M + MoE |

## Relationship to Prior Work

Make-An-Audio 3 is part of a lineage:

1. **[[ai-game-devtools/make-an-audio]]** — Original text-to-audio with prompt-enhanced diffusion (arXiv 2301.12661)
2. **[[audiolcm]]** — Latent Consistency Models for faster audio generation (ACM-MM 2024)
3. **[[audioldm-2]]** — Holistic audio generation via latent diffusion (TASLP 2024)
4. **[[lumina-t2x]]** — Parent architecture: Flow-based DiT for multi-modal generation

The key innovation over prior versions is the **flow matching** approach (replacing standard diffusion) and the adoption of the **Lumina-Next** DiT architecture with Flash Attention.

## Technical Stack

- **Python 3.11**, **PyTorch 2.1.0**, **CUDA 12.1**
- **PyTorch Lightning** for training orchestration (DDP, multi-GPU)
- **torchdyn** for NeuralODE-based sampling
- **BigVGAN** (NVIDIA alias-free GAN vocoder) for waveform synthesis
- **CLAP** for audio-text evaluation scoring
- **omegaconf** for YAML configuration management

## Usage

```bash
# Text-to-audio
python3 scripts/txt2audio_for_2cap_flow.py --prompt "A dog barking in the distance" \
  --outdir output_dir -r checkpoints_last.ckpt \
  -b configs/txt2audio-cfm-cfg.yaml --scale 3.0 --vocoder-ckpt useful_ckpts/bigvnat

# Video-to-audio
python3 scripts/video2audio_flow.py --outdir output_dir -r checkpoints_last.ckpt \
  -b configs/video2audio-cfm-cfg-moe.yaml --scale 3.0 \
  --vocoder-ckpt useful_ckpts/bigvnat --test-dataset vggsound
```

## Game Dev Relevance

For AI game development, Make-An-Audio 3 enables:
- **Procedural sound effects**: Generate environmental audio (footsteps, weather, UI sounds) from text descriptions
- **Dynamic music**: Create context-adaptive background music from mood/scene descriptions
- **Video-to-audio sync**: Generate synchronized audio for game trailers or cutscenes
