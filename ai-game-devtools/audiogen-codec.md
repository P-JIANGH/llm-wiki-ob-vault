---
title: Audiogen Codec (AGC)
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, tool, open-source, ai]
sources: [raw/articles/ai-game-devtools/audiogen-codec.md]
---

# Audiogen Codec (AGC)

## Overview

**Audiogen Codec (agc)** is a low compression 48kHz stereo neural audio codec for general audio, optimized for audio fidelity. Developed by Audiogen (Elio Pascarelli), it addresses the problem of low acoustic quality and audible artifacts in generative audio models.

- **GitHub:** https://github.com/AudiogenAI/agc
- **PyPI:** `pip install audiogen-agc`
- **Version:** 0.1.1
- **License:** Other/Proprietary License

## Two Variants

| Variant | Type | Channels | Frame Rate |
|---------|------|----------|------------|
| agc-continuous | KL regularized continuous | 32 | 100 Hz |
| agc-discrete | Residual Vector Quantization (24 stages) | 24 | 50 Hz |

## Architecture

Based on the **DAC** (SOTA) convolutional autoencoder architecture, with key improvements:

1. **EMA training** (Exponential Moving Average)
2. **CLAP perceptual loss** term
3. **Stereo support** (2-channel input/output)
4. **Snake1d periodic activations** (better for audio than ReLU/GELU)
5. **Weight normalization** on all Conv1d layers
6. **Transformers PreTrainedModel** base for `from_pretrained()` support

### Core Components
- **Encoder:** Multi-block CNN with downsampling strides [2,4,8,8]
- **Decoder:** Multi-block CNN with upsampling rates [8,8,4,2]
- **ResidualVectorQuantize:** 9 codebooks, 1024 size each, dim 8 (discrete mode)
- **VectorQuantize:** Factorized VQ with L2-normalized codebook distance

Outperforms Meta's EnCodec and DAC on general audio in blind ELO evaluations.

## Usage

```python
from agc import AGC
agc = AGC.from_pretrained("Audiogen/agc-continuous")  # or "agc-discrete"
audio = torch.randn(1, 2, 480000)  # 48kHz stereo
z = agc.encode(audio)  # (1, 32, 6000) or (1, 24, 3000)
reconstructed = agc.decode(z)  # (1, 2, 480000)
```

## Game Dev Relevance

- **Audio representation learning:** AGC provides high-fidelity audio tokenization for hierarchical generative models (music, sound effects generation)
- **Low compression:** Preserves acoustic quality better than EnCodec, useful for game audio pipelines
- **Can serve as tokenizer** for autoregressive audio generation models in game contexts
- **Related to [[ai-game-devtools/academicodec]]** (another audio codec toolkit with EnCodec/SoundStream/HiFi-Codec training code)
- **Complements audio generation tools** like [[ai-game-devtools/audio-diffusion-pytorch]] by providing better latent representations
