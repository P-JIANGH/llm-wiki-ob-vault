---
title: Diff-BGM
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [music-generation, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/diff-bgm.md]
---

# Diff-BGM

Video Background Music Generation via Latent Diffusion Models.

## Overview
**Diff-BGM** is a CVPR 2024 research project that generates background music for videos using a latent diffusion model. It takes video features (visual embeddings, text captions, shot boundaries) as conditioning signals and produces MIDI piano-roll outputs that musically align with the video content.

## Architecture
- **Latent Diffusion backbone**: Adapts the Stable Diffusion architecture (auto-encoder + U-Net with cross-attention) from image space to piano-roll music representation
- **Multiple conditioning modes**: Chord progression, piano-note tree, text descriptions, visual features, and concatenation of multimodal signals
- **SAC-Attention**: Scene-Aware Cross-Modal Attention module that fuses video and music representations
- **Classifier-free guidance**: Supports unconditional scaling for better generation quality

## Key Features
- **Video-to-Music**: Extracts visual, caption, and shot features from videos to condition music generation
- **Inpainting**: Can fill in missing musical sections — melody above accompaniment, accompaniment below melody, or specific bars
- **Autoregressive generation**: Generates longer music by autoregressively inpainting 4-bar segments
- **Multiple datasets**: Trained on POP909 (pop music) and BGM909 (video background music)
- **MIDI output**: Generates piano-roll MIDI files, convertible to audio via fluidsynth + ffmpeg

## Performance
| Variant | PCHE ↓ | GPS ↑ | SI ↑ | P@20 ↑ |
| ------- | ------ | ----- | ---- | ------ |
| Diff-BGM (full) | 2.840 | 0.601 | 0.521 | 44.10 |
| w/o SAC-Attention | 2.721 | 0.789 | 0.523 | 38.47 |
| Visual only | 2.835 | 0.514 | 0.396 | 43.20 |

## Tech Stack
- PyTorch, librosa, music21, muspy, pretty_midi
- OmegaConf for configuration management

## Game Development Relevance
Diff-BGM enables automated background music generation for game cutscenes, trailers, and dynamic gameplay sequences. By conditioning on video features, it can adapt music style and tempo to match on-screen action — useful for procedural game content generation.

## Related
- See [[ai-game-devtools/mmaudio]] for video-to-audio generation (sound effects)
- See [[ai-game-devtools/audioldm-2]] for general audio/music diffusion generation
- See [[ai-game-devtools/syncfusion]] for video Foley sound effect generation
