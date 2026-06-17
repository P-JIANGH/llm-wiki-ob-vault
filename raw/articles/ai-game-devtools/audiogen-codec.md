# Audiogen Codec (agc) — Raw Source

> Source: https://github.com/AudiogenAI/agc
> Analyzed: 2026-04-20
> License: Other/Proprietary License
> Author: Elio Pascarelli (elio@audiogen.co)

## README Summary

Audiogen Codec (agc) is a low compression 48kHz stereo neural audio codec for general audio, optimizing for audio fidelity.

Two variants:
- **agc-continuous**: KL regularized, 32 channels, 100hz frame rate
- **agc-discrete**: 24 stages of residual vector quantization, 50hz frame rate

Architecture: convolutional autoencoder based on DAC (SOTA). Training improvements:
- EMA (Exponential Moving Average)
- Perceptual loss term with CLAP features

In blind ELO games, AGC outperforms Meta's EnCodec and DAC on general audio.

Purpose: solve low acoustic quality and audible artifacts in general music/audio generation models. Designed for hierarchical generative audio models that efficiently use high sequence length representations without sacrificing semantic abilities.

## Key Architecture (model.py)

### Core Components

| Component | Description |
|-----------|-------------|
| `VectorQuantize` | Factorized VQ layer with L2-normalized codebook distance, commitment + codebook loss |
| `ResidualVectorQuantize` | Multi-stage RVQ (default 9 codebooks, 1024 size, dim 8), supports quantizer dropout |
| `Encoder` | Multi-block CNN encoder with stride-based downsampling [2,4,8,8], input stereo (2ch) |
| `Decoder` | Multi-block CNN decoder with upsampling [8,8,4,2], output stereo (2ch) |
| `Snake1d` | Periodic activation function (learnable alpha parameter) |
| `ResidualUnit` | Residual block with Snake1d + WNConv1d, dilations [1,3,9] |
| `vae_sample` | VAE sampling with mean/scale, KL divergence computation |

### Model Config (AGCConfig)
- `encoder_dim`: 64 (default)
- `encoder_rates`: [2, 4, 8, 8]
- `decoder_dim`: 1536
- `decoder_rates`: [8, 8, 4, 2]
- `latent_dim`: auto = encoder_dim * 2^len(rates) = 1024
- `num_codebooks`: 9
- `codebook_size`: 1024
- `codebook_dim`: 8
- `sample_rate`: 48000

### Key Design Choices
1. **Weight normalization** on all Conv1d layers
2. **Snake1d** activation (periodic, better for audio than ReLU/GELU)
3. **Stereo support** (2-channel input/output)
4. **Transformers PreTrainedModel** base class (from_pretrained support)
5. **TorchScript** compatible (snake function is @torch.jit.script decorated)

## Dependencies
- torch, torchaudio, transformers, einops, numpy
- Python >= 3.9

## Usage
```python
from agc import AGC
agc = AGC.from_pretrained("Audiogen/agc-continuous")  # or "agc-discrete"
audio = torch.randn(1, 2, 480000)  # 48khz stereo
z = agc.encode(audio)  # (1, 32, 6000) continuous or (1, 24, 3000) discrete
reconstructed = agc.decode(z)
```

## Version
- v0.1.1 (tagged release)
- PyPI: audiogen-agc

## Links
- GitHub: https://github.com/AudiogenAI/agc
- Colab: https://colab.research.google.com/drive/1MXeBYMY-dZ3Yas-5rXzggMONIlDDQ5VG
- Examples: https://audiogen.notion.site/Audiogen-Codec-Examples-546fe64596f54e20be61deae1c674f20
