# GIFfusion — Stable Diffusion GIF & Video Generator

**Source URL:** https://github.com/DN6/giffusion
**Extraction Date:** 2026-04-17
**Extraction Method:** web_extract (GitHub/gitcode/gitee clone all failed — network timeout)

---

## Overview

**Repository:** `DN6/giffusion`
**Purpose:** Web UI for generating GIFs and videos using Stable Diffusion with advanced animation, control, and tracking features.

## Quick Start

### Local Installation
```bash
git clone https://github.com/DN6/giffusion.git && cd giffusion
pip install -r requirements.txt
python app.py
```

### Cloud
- **Google Colab:** https://colab.research.google.com/github/DN6/giffusion/blob/main/Giffusion.ipynb
- **Comet ML:** https://www.comet.com/team-comet-ml/giffusion/view/CzxqbNrydKqHCaYhNEnbyrpnz/panels

## Core Features

- **Session Management:** Save/load generations & UI settings via Hugging Face Hub.
  - Requires: `huggingface-cli login`
  - Saves to dataset repos with auto-generated or custom `Repo ID` & `Session Name`.
- **Prompt Inspiration:** `Give me some inspiration` button auto-generates prompts; supports custom topic lists.
- **Multimedia Input:**
  - **Image:** Seed generation with an initial image.
  - **Audio:** Drive animations; auto-extracts keyframes & timestamps. *(Note: Keyframes adapt to UI frame rate)*
  - **Video:** Use existing video frames as initialization. Auto-extracts max frames & syncs UI frame rate.
- **Output Resampling:** Extract specific frames from generated GIFs/videos and route them back to `Image Input` or `Video Input` for iterative refinement.

## Pipeline & Model Support

- **Bring Your Own Pipeline:** Fully compatible with any [Hugging Face Diffusers](https://huggingface.co/docs/diffusers/index) pipeline/checkpoint.
- **ControlNet:** Supports `StableDiffusionControlNetPipeline` & MultiControlNet.
  - **Preprocessing Rule:** Preprocessors must match model order. Use `no-processing` for models requiring none.
  - *Example MultiControlNet:* `lllyasviel/control_v11p_sd15_softedge, lllyasviel/control_v11f1p_sd15_depth`
- **Custom Pipelines:** Paste path to custom pipeline file (must follow [Diffusers community pipeline format](https://github.com/huggingface/diffusers/tree/main/examples/community)).
- **Prompt Weighting:** Powered by [Compel](https://github.com/damian0815/compel) for advanced prompt syntax.

## Multiframe & Animation Syntax

### Keyframe Prompts
Interpolates noise & text embeddings between defined frames:
```
0: a picture of a corgi
60: a picture of a lion
```

### Interpolation Types
- `linear` (default)
- `sine`: Uses `np.sin(np.pi * frequency) ** 2` (default `1.0`). Supports multiple frequencies (e.g., `1.0, 2.0`).
- `curve`: Manual Deforum-style curve. Values must be `0.0`–`1.0`.
  - *Example:* `0: (0.0), 50: (1.0), 60: (0.5)`

### Motion Control (2D)
Uses Deforum-compatible keyframe strings for:
- **Zoom:** `0: (1.05),1: (1.05),...`
- **Angle:** `0: (10.0),1: (10.0),...`
- **Translation X/Y:** `0: (5.0),1: (5.0),...`

### Coherence
Preserves visual features across frames by computing the gradient of the current latent against a reference latent (typically the previous frame).

## Configuration Settings (Diffusion)

| Setting | Description |
|---|---|
| `Use Fixed Latent` | Keeps noise latent constant across frames (useful for prompt-only interpolation) |
| `Use Prompt Embeds` | Interpolates embeddings (default). Disable to forward-fill text or use `ComposableDiffusion` |
| `Numerical Seed` | Controls noise generation. If fixed latent is off, generates unique seeds per keyframe |
| `Image Strength Schedule` | Img2Img denoising strength (`0`–`1`). Supports scheduling: `0:(0.5), 10:(0.7)` |
| `Scheduler` | Select & configure diffusion schedulers |
| `Batch Size` | Increase for faster generation on high-memory GPUs |
| `Image Height/Width` | Default `512`. Auto-matches input dimensions if image/video is provided |
| `Latent Channels` | Default `4`. Adjust for pipelines like `InstructPix2Pix` |
| `Additional Pipeline Args` | Pass dictionary kwargs directly to the pipeline object |

## Integrations & Tracking

- **Comet ML:** Automatically logs prompts, generated media, and settings for experiment tracking & versioning.
- **Hugging Face Hub:** Used for session persistence, dataset storage, and model/pipeline loading.

## Key Technical Notes

- **Interpolation Mechanism:** Works by interpolating noise tensors & text embedding latents between keyframes, then decoding to images.
- **Audio Sync:** Timestamps are extracted alongside keyframes for precise prompt-to-audio alignment.
- **Deforum Compatibility:** Animation strings, curve syntax, and motion parameters directly mirror the [Deforum Art format](https://docs.google.com/document/d/1RrQv7FntzOuLg4ohjRZPVL7iptIyBhwwbcEYEW2OfcI/edit).
- **Preprocessing Order:** Critical for MultiControlNet. Mismatched order will break conditioning signals.
