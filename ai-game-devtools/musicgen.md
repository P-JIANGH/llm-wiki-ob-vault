---
title: MusicGen
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, music, audio, open-source, diffusion]
sources: [web:https://github.com/facebookresearch/audiocraft, web:https://huggingface.co/spaces/facebook/MusicGen]
---

# MusicGen

**Meta AI music generation model**

## Overview

MusicGen is a simple and controllable music generation model developed by Meta AI Research, part of the AudioCraft family. It generates high-quality music samples conditioned on text descriptions and/or audio prompts. Unlike prior autoregressive models, MusicGen uses a single-stage transformer to predict audio tokens in parallel, enabling efficient generation and fine-grained control over melody and harmony.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Meta AI Research (A Défossez et al.) |
| **Architecture** | Single-stage autoregressive Transformer over EnCodec audio tokens |
| **Training Data** | 20K hours of licensed music + internal data |
| **Model Sizes** | 300M (small), 1.5B (medium), 3.3B (large), 3.3B (melody variant) |
| **Input Modalities** | Text prompts, audio prompts, melody conditioning |
| **Tokenization** | EnCodec neural audio codec (50 codebooks, hierarchical RVQ) |
| **Sampling** | Top-K + top-p sampling, classifier-free guidance for text conditioning |
| **License** | CC BY-NC 4.0 (non-commercial) |

## Architecture

- **Tokenizer**: EnCodec neural audio codec compresses raw waveform into discrete tokens
- **Language Model**: Transformer trained to predict audio token sequences conditioned on text embeddings (T5) and/or melody tokens
- **Melody Conditioning**: Chroma features extracted from audio prompts guide the generated melody
- **Decoding**: Generated tokens passed through EnCodec decoder to reconstruct audio waveform

## Usage in AI Game Development

MusicGen enables game developers to:
- **Procedural music generation**: Create dynamic soundtracks that adapt to gameplay states
- **Asset prototyping**: Rapidly generate placeholder music during game development
- **Mood-based audio**: Generate context-aware music from text descriptions of game scenes
- **Audio-driven NPCs**: Pair with [[ai-game-devtools/echo-mimic]] for fully voiced animated characters

## Related Projects

- [[ai-game-devtools/amphion]] — OpenMMLab audio/music/speech generation toolkit
- [[ai-game-devtools/audiogen-codec]] — Audiogen 48kHz neural audio codec, related to AudioCraft family
- [[ai-game-devtools/diffsynth-studio]] — ModelScope diffusion engine supporting audio generation models
- [[ai-game-devtools/edge]] — Music-driven dance generation, complementary to music generation pipelines
