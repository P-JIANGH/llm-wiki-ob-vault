---
title: CoNR — Collaborative Neural Rendering using Anime Character Sheets
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, avatar, animation, open-source, ai]
sources: [raw/articles/ai-game-devtools/conr.md]
---

# CoNR — Collaborative Neural Rendering using Anime Character Sheets

**GitHub:** https://github.com/megvii-research/CoNR
**Paper:** https://arxiv.org/abs/2207.05378 (IJCAI 2023 Special Track)
**Dataset:** https://github.com/P2Oileen/CoNR_Dataset
**Category:** Video / Avatar (AI Game DevTools)

## Overview

CoNR (Collaborative Neural Rendering) generates vivid animated videos from static hand-drawn anime character sheets (ACS). Users provide a character sheet (multiple views of a character in PNG with transparency) and a target pose sequence (Ultra-Dense Pose), and the system renders the character performing those poses as a video — effectively animating 2D art assets without 3D modeling.

## Key Architecture

Four collaborating sub-networks form the rendering pipeline:

| Component | Backbone | Role |
|---|---|---|
| **UDPParserNet** | ResNet50 (Danbooru pretrained) | Parses character sheets & pose images into RGBA + Ultra-Dense Pose |
| **Target Pose Encoder** | ResNet18 (Danbooru pretrained) | Extracts features from target pose for rendering |
| **CINN Shader** | Conditional Invertible NN | Texture/shader transfer from reference character to target pose |
| **RGBADecoderNet** | Custom decoder | Final RGBA compositing output |

### Pipeline Flow

1. **Character Parser** → Input PNG character sheet → RGBA representation + multi-scale feature maps
2. **Pose Parser** → Target pose images → UDP (Ultra-Dense Pose) representation
3. **Shader Pose Encoder** → Encodes target pose features
4. **CINN Shader Forward** → Transfers texture from character sheet to target pose via feature warping
5. **RGBA Decoder** → Composites final RGBA output for video frame

## Technical Details

| Aspect | Detail |
|---|---|
| **Framework** | PyTorch + DistributedDataParallel (multi-GPU) |
| **Input** | Anime character sheets (PNG transparent) + pose sequences (UDP) |
| **Output** | Per-frame rendered PNGs → FFmpeg 30fps video |
| **Web UI** | Streamlit interface (`streamlit run streamlit.py`) |
| **Training** | DDP with mixed precision, LPIPS perceptual loss |
| **Dependencies** | PyTorch ≥1.3, CUDA, OpenCV, LPIPS, Streamlit |
| **Weights** | Downloaded via Google Drive / Baidu Netdisk |

## Game Dev Relevance

- **Anime character animation** — Generate dancing/posing videos from static character art
- **VTuber avatar generation** — Pose-driven 2D character animation without Live2D rigging
- **Dance animation from 2D assets** — MMD2UDP tool converts MikuMikuDance motions to UDP sequences
- **No 3D modeling required** — Works purely with 2D character sheets

## Related Tools

| Tool | Function | Difference from CoNR |
|---|---|---|
| [[ai-game-devtools/animate-anyone]] | Person image animation | Uses diffusion, requires reference video; CoNR uses character sheets + UDP |
| [[ai-game-devtools/wav2lip]] | Lip-sync animation | Audio-driven facial animation; CoNR is full-body pose-driven |
| [[ai-game-devtools/sadtalker]] | Talking head generation | Face-only audio-driven; CoNR is full-body pose-driven |

## Links

- Demo: https://transpchan.github.io/live3d/
- Colab Notebook: [English](https://colab.research.google.com/github/megvii-research/CoNR/blob/main/notebooks/conr.ipynb) / [中文](https://colab.research.google.com/github/megvii-research/CoNR/blob/main/notebooks/conr_chinese.ipynb)
- BiliBili: https://www.bilibili.com/video/BV19V4y1x7bJ/
- YouTube: https://youtu.be/Z4HXWBF7mLI
- Successor: https://github.com/transpchan/Live3D-v2
