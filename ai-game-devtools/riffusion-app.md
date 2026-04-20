---
title: Riffusion App
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, audio, music, diffusion, open-source, web-app]
sources: [raw/articles/ai-game-devtools/riffusion-app.md]
---

# Riffusion App

**GitHub:** https://github.com/riffusion/riffusion-app
**License:** No explicit license file (project archived)
**Status:** ⚠️ No longer actively maintained
**Authors:** Seth Forsgren & Hayk Martiros (2022)

## Overview

Riffusion App is the interactive web frontend for **real-time music generation** using Stable Diffusion. It converts text prompts into music via a novel **spectrogram-as-image** approach: text → Stable Diffusion → spectrogram image → audio (Griffin-Lim inversion).

## Architecture

### Frontend (This Repo)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 13, React 18, TypeScript |
| Styling | TailwindCSS 3 + DaisyUI + styled-components |
| 3D Visuals | three.js + @react-three/fiber (spectrogram terrain) |
| Audio Engine | Tone.js 14 (Web Audio API wrapper with crossfade) |
| Deployment | Vercel |

### Backend (Separate Repo)

The actual Stable Diffusion inference runs in a **separate Flask server** ([riffusion-inference](https://github.com/hmartiro/riffusion-inference)):
- Default: local Flask at `http://127.0.0.1:3013/run_inference/`
- Cloud: Baseten serverless deployment supported

### Core Pipeline

```
Text Prompt → Stable Diffusion → Spectrogram Image → Griffin-Lim → Audio WAV
     ↑                                                        ↓
  Prompt Queue ← Alpha Interpolation ← Tone.js Crossfade ← Audio Playback
```

### State Machine

- `SAME_PROMPT`: Repeat same prompt, increment seed → variations
- `TRANSITION`: Alpha-blend between old and new prompts → smooth transitions
- Prompt queue of 6 items, alpha velocity controls transition speed

### Key Components

- **ModelInference**: API client — sends start/end prompt pairs with alpha blend factor
- **AudioPlayer**: Tone.js playback with compressor, crossfade, buffer management
- **ThreeCanvas**: 3D spectrogram visualization as interactive terrain
- **PromptPanel**: 6-slot prompt queue UI
- **Settings**: Denoising strength, seed image selection, guidance scale

## Technical Highlights

- **Spectrogram approach**: Treats audio spectrograms as images, leveraging SD's image generation capability for music — no audio-specific model training needed
- **Alpha interpolation**: Smooth transitions between musical styles (e.g., "jazz piano" → "church bells")
- **Seed image conditioning**: Uses pre-generated spectrogram seeds for consistent output
- **Timeout system**: 600-second GPU usage limit prevents resource hogging
- **Baseten integration**: Supports cloud deployment for users without local GPU

## Comparison with Alternatives

| Tool | Approach | Output | Key Difference |
|------|----------|--------|----------------|
| Riffusion | SD on spectrograms | Short clips, real-time streaming | Novel image→audio pipeline, no training needed |
| [[ai-game-devtools/musicgen]] | EnCodec tokens + Transformer | High-quality music | Autoregressive audio model, trained on 20K hours |
| [[ai-game-devtools/flux-music]] | Rectified Flow + Dual Transformer | Music generation | Latest architecture, 5 model sizes |
| [[ai-game-devtools/jukebox]] | Hierarchical VQ-VAE + Transformer | Full songs with lyrics | OpenAI's pioneering work, 3-hour V100 inference |

## Relevance to Game Development

- **Procedural music**: Real-time ambient music generation from text descriptions of game scenes
- **Dynamic soundtracks**: Alpha transitions allow seamless music style changes based on gameplay state
- **Web-based**: Can be embedded in browser games or used as a dev tool
- **API-compatible**: The inference server can be called from any game engine with HTTP support

## Related

- Inference server repo: https://github.com/hmartiro/riffusion-inference
- Built on the [[ai-game-devtools/stable-diffusion]] latent diffusion model
- Similar concept to [[ai-game-devtools/musicgen]] but with different architecture
