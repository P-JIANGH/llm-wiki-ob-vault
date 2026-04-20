---
title: Glow-TTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, open-source, tool, python, ai-model]
sources: [raw/articles/ai-game-devtools/glow-tts.md]
---

# Glow-TTS — Flow-based Parallel TTS via Monotonic Alignment Search

## Overview

**Glow-TTS** is a flow-based generative model for parallel text-to-speech (TTS) that eliminates the need for external aligners. Developed by Jaehyeon Kim et al. (Seoul National University), it uses **Monotonic Alignment Search (MAS)** — combining normalizing flows with dynamic programming to automatically discover the optimal monotonic alignment between text and speech.

- **Paper:** arXiv 2005.11129 (NeurIPS 2020)
- **GitHub:** [jaywalnut310/glow-tts](https://github.com/jaywalnut310/glow-tts)
- **License:** MIT
- **Stack:** PyTorch + Cython (MAS) + NVIDIA Apex (mixed-precision)
- **Demo:** [jaywalnut310.github.io/glow-tts-demo](https://jaywalnut310.github.io/glow-tts-demo/index.html)

## Architecture

```
Text → TextEncoder → (mean, logvar, duration) → FlowSpecDecoder → Mel Spectrogram → Vocoder (HiFi-GAN) → Audio
```

| Component | Description |
|-----------|-------------|
| **TextEncoder** | Transformer encoder + DurationPredictor (2-layer Conv1d), outputs mean/logvar per token |
| **FlowSpecDecoder** | 12 flow blocks (ActNorm → InvConvNear → CouplingBlock with WaveNet conditioning) |
| **Monotonic Alignment Search** | Cython DP algorithm finds optimal text→speech alignment, no external teacher needed |
| **Duration Predictor** | Predicts phoneme durations from encoder hidden states, used for path generation at inference |

## Key Innovations

- **Self-supervised alignment:** No external aligner (e.g., Tacotron 2 attention) needed — MAS discovers alignment during training via maximum likelihood path search
- **Parallel synthesis:** Order-of-magnitude faster than autoregressive TTS models (comparable quality)
- **Diverse output:** Flow-based generative model enables controllable, diverse speech synthesis via latent sampling
- **Multi-speaker:** Easily extensible with speaker embedding layer

## Quality Improvements (Post-paper)

Two modifications found after paper publication:
1. **HiFi-GAN vocoder** replaces WaveGlow for cleaner audio output (fine-tuned on Tacotron 2 mel targets)
2. **Blank token insertion** between input tokens improves pronunciation accuracy

## Comparison with Related TTS Models

| Model | Alignment | Architecture | Speed | External Aligner |
|-------|-----------|--------------|-------|-----------------|
| **Glow-TTS** | MAS (self-supervised DP) | Flow-based | Fast (parallel) | ❌ No |
| **Tacotron 2** | Attention (autoregressive) | Seq2Seq + CBHG | Slow (sequential) | N/A |
| **FastSpeech** | Teacher-student distillation | Transformer | Fast (parallel) | ✅ Yes (Tacotron 2) |
| **VITS** | MAS + end-to-end | Flow + GAN vocoder | Fast (parallel) | ❌ No |

Glow-TTS is the direct predecessor of VITS — VITS combined the MAS alignment from Glow-TTS with a GAN-based vocoder into a single end-to-end model (used in [[ai-game-devtools/retrieval-based-voice-conversion-webui]] and [[ai-game-devtools/so-vits-svc]]).

## Training Setup

- **Dataset:** LJ Speech (single speaker, ~24h English)
- **Multi-GPU:** DDP distributed training with apex O1 mixed-precision
- **Loss:** MLE (maximum likelihood) + duration loss (dual objective)
- **Optimizer:** Adam with warmup scheduler
- **Inference notebooks:** `inference.ipynb` (WaveGlow vocoder), `inference_hifigan.ipynb` (HiFi-GAN vocoder)

## Game Dev Relevance

Provides a lightweight, MIT-licensed TTS backbone for game NPC voice generation. Can be paired with emotion-controlled variants like [[ai-game-devtools/emotivoice]] for expressive dialogue. The MAS alignment approach is also used in modern TTS systems like [[ai-game-devtools/cosyvoice]].
