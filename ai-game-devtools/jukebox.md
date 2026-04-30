---
title: Jukebox
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai, music, audio, open-source, autoregressive, code-generation]
sources: [raw/articles/ai-game-devtools/jukebox.md]
---

# Jukebox

**OpenAI's pioneering autoregressive music generation model — raw audio with singing and lyrics**

## Overview

Jukebox is a generative model for music released by OpenAI in 2020 that produces raw audio waveforms, including rudimentary singing and lyrics. It uses a three-level hierarchical architecture: a VQ-VAE for audio compression, autoregressive transformer priors for code generation, and upsamplers for waveform reconstruction. The project is now archived but remains a foundational reference in AI music generation.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | OpenAI (Dhariwal, Jun, Payne, Kim, Radford, Sutskever) |
| **Release** | 2020 (arXiv:2005.00341) |
| **Status** | Archived (no updates expected) |
| **Models** | 5B (11.5 GB), 5B_lyrics (~12.5 GB), 1B_lyrics (3.8 GB) |
| **Architecture** | 3-level VQ-VAE + hierarchical autoregressive transformers |
| **Input** | Artist/genre labels, lyrics text, audio prompts |
| **Output** | Raw 44.1kHz audio waveforms with vocals and lyrics |
| **License** | Noncommercial Use License |

## Architecture

### Three-Level Hierarchical Design

1. **VQ-VAE (Vector Quantized Variational Autoencoder)**
   - Compresses raw waveform into discrete codes at 3 levels
   - Downsampling: 32× (level 0) and 256× (level 1)
   - Codebook: 2048 bins per level, embedding width 64
   - Trained with multi-scale spectral loss

2. **Upsamplers (Levels 0 & 1)**
   - Autoregressive transformers upsample coarse → fine codes
   - width=1920, depth=72, 128 blocks
   - Conditioned on lower-level codes via conditional convolutions

3. **Top-Level Prior (Level 2)**
   - 5B: width=4800, depth=72, 8 heads — pure music generation
   - 5B_lyrics: adds lyric encoder (prime_width=1280, prime_depth=18)
   - 1B_lyrics: single encoder-decoder, n_ctx=6144, more accessible

### Conditioning Mechanisms

- **Labels**: Artist (4111 IDs) + Genre (120 IDs) via learned style embeddings
- **Lyrics**: Linear-aligned character tokens interleaved with audio sequence
  - `single_enc_dec` mode merges lyric + audio vocab into unified token stream
  - Attention layers learn lyric-to-music alignment
- **Timing**: Song duration, position, and fraction embeddings (t_bins)
- **Priming**: User audio files can prompt generation via `--mode=primed`

## Sampling Modes

| Mode | Description |
|------|-------------|
| `default` | Generate from scratch |
| `continue` | Extend previously generated audio |
| `upsample` | Upsample saved low-res codes to full quality |
| `primed` | Generate conditioned on user's audio files |

## Usage in AI Game Development

Jukebox enables game developers to:
- **Procedural music generation**: Generate background music tailored to game states
- **Lyric-conditioned songs**: Create songs with specific lyrics for narrative moments
- **Style transfer**: Condition on artist/genre for genre-consistent soundtracks
- **Audio prompting**: Feed existing game audio to continue/extend it

However, practical use is limited by:
- **Compute cost**: ~3 hours on V100 for 20 seconds of audio
- **VRAM requirements**: 11.5+ GB for 5B models
- **Noncommercial license**: Cannot be used in commercial games

## Comparison with Modern Alternatives

Unlike [[musicgen]] which uses EnCodec tokenization with single-stage Transformer and supports melody conditioning, Jukebox's multi-level hierarchy was pioneering but computationally expensive. [[flux-music]] (Flux-based) and [[audiocraft]] represent newer, more efficient approaches.

## Links

- [GitHub](https://github.com/openai/jukebox)
- [Paper (arXiv:2005.00341)](https://arxiv.org/abs/2005.00341)
- [Blog Post](https://openai.com/blog/jukebox)
- [Interactive Explorer](http://jukebox.openai.com/)
- [Colab Notebook](https://colab.research.google.com/github/openai/jukebox/blob/master/jukebox/Interacting_with_Jukebox.ipynb)
