---
title: VI-SVS — Variational Inference SVS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, open-source, audio, singing-voice-synthesis]
sources: [raw/articles/ai-game-devtools/vi-svs.md]
---

# VI-SVS — Variational Inference SVS

**GitHub:** https://github.com/PlayVoice/VI-SVS
**License:** Apache 2.0

## Overview

VI-SVS (Variational Inference with adversarial learning for Singing Voice Synthesis) is a simplified VITS-based singing voice synthesis system. It removes the Monotonic Alignment Search (MAS) and DurationPredictor from the original VITS architecture, making it suitable as a learning project for understanding end-to-end SVS.

## Architecture

### Model Components
- **TextEncoder**: Embeds 4 input types — phone labels (63 vocab), pitch notes (MIDI, 128), pitch values (256), slur marks (2) — summed and passed through a 6-layer Transformer encoder
- **PosteriorEncoder**: 16-layer WaveNet posterior encoder encoding mel spectrograms to latent space
- **ResidualCouplingBlock**: 4-flow normalizing flow for variational inference
- **Generator**: BigVGAN-inspired neural vocoder with upsampling rates [5,4,4,2,2] producing 32kHz audio
- **Discriminators**: MPD (Multi-Period) + MRD (Multi-Resolution) for adversarial training

### Training Configuration
| Parameter | Value |
|-----------|-------|
| Sampling rate | 32kHz |
| Hidden channels | 192 |
| Filter channels | 640 |
| Batch size | 6 |
| Learning rate | 1e-4 |
| Hop length | 320 |
| Segment size | 8000 frames |

### Inference Modes
1. **F0 from score** — Uses MIDI pitch directly (recommended, better quality)
2. **F0 predicted** — Uses separate diffusion-based pitch model (author notes this needs improvement)

## Pipeline

```
Data (OpenCpop) → Resample 32kHz → Generate labels → Train SVS → [Optional: Train Pitch] → Infer/Synthesize
```

## Relationships

- **vs [[diffsinger]]**: DiffSinger uses shallow diffusion for end-to-end SVS with MIDI control; VI-SVS uses VITS-style variational inference — both support OpenCpop dataset but different architectural approaches
- **vs [[so-vits-svc]]**: so-vits-svc focuses on singing voice *conversion* (source voice → target timbre), VI-SVS focuses on singing voice *synthesis* (lyrics + score → voice)
- **vs [[vi-svs]]'s predecessor VISinger**: VI-SVS is a simplified learning variant without MAS/DurationPredictor; VISinger includes full alignment modeling

## Status

Author explicitly states this is a learning project with known limitations in pitch prediction. Pitch and duration modules planned as future add-ons.
