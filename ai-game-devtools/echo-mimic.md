---
title: EchoMimic
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, avatar, audio, video, open-source, animation]
sources: [web:https://github.com/antgroup/echomimic_v2, web:https://arxiv.org/abs/2407.08136]
---

# EchoMimic

**Audio-driven portrait animation with lip-sync and facial expression generation**

## Overview

EchoMimic is an audio-driven portrait animation framework developed by Ant Group. It generates realistic talking-head videos with accurate lip synchronization and expressive facial movements from a single reference image and audio input. EchoMimic supports three driving modes: audio-only, landmark-only, and hybrid audio+landmark, making it flexible for different use cases. The v2 version significantly improves quality and supports longer video generation.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Developer** | Ant Group (Zhiyuan Chen et al.) |
| **Paper** | arXiv 2407.08136 (AAAI 2025) |
| **Architecture** | SD 1.5 diffusion backbone + Whisper-Tiny audio encoder + lightweight landmark CNN |
| **Driving Modes** | Audio-only / Landmark-only / Hybrid (audio + landmark) |
| **Audio Encoder** | Whisper-Tiny extracts temporal audio features for lip sync |
| **Landmark** | 68-point facial landmarks as spatial control signal |
| **Performance** | HDTF FID 29.13 / FVD 493, outperforms SadTalker, AniPortrait, Hallo |
| **License** | Academic research license |

## Architecture

- **Reference Network**: Preserves identity features from the reference portrait
- **Denoising UNet**: SD 1.5 backbone modified for temporal video generation
- **Pose Guider**: Injects facial motion signals into the generation process
- **Audio Fusion**: Cross-attention mechanism fuses Whisper audio features with visual latents
- **Temporal Attention**: Ensures frame-to-frame consistency in the generated video

## Usage in AI Game Development

EchoMimic enables:
- **NPC dialogue animation**: Generate lip-synced talking head videos for game characters
- **Virtual avatars**: Create animated avatars from static character portraits
- **Cutscene dialogue**: Automate character talking scenes in narrative games
- **Multi-language support**: Same reference image works with different language audio inputs

## Related Projects

- [[hallo]] — Fudan audio-driven portrait animation with SD 1.5 + AnimateDiff
- [[hunyuan-portrait]] — Tencent Hunyuan video-driven portrait animation
- [[sadtalker]] — CVPR 2023 audio-driven portrait animation, earlier approach
- [[liveportrait]] — Kuaishou efficient video-driven portrait animation
