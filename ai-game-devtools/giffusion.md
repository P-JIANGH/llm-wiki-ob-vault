---
title: GIFfusion — Stable Diffusion GIF & Video Generator
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, image-generation, diffusion, open-source, python]
sources: [raw/articles/ai-game-devtools/giffusion.md]
---

# GIFfusion — Stable Diffusion GIF & Video Generator

**GIFfusion** is an open-source web UI for generating animated GIFs and videos using **Stable Diffusion** via the Hugging Face Diffusers library. It specializes in keyframe-driven animation with support for audio-driven sequences, motion control, and iterative refinement — making it useful for game asset animation, cinematic mockups, and procedural content generation.

## Core Features

- **Keyframe animation:** Define prompts at specific frames (e.g., `0: a corgi`, `60: a lion`), with automatic interpolation between them
- **Three interpolation modes:** `linear`, `sine` (with configurable frequency), and `curve` (Deforum-compatible)
- **Multimedia input:** Image seeds, audio-driven animation (auto-extracts keyframes + timestamps), and video frame initialization
- **Output resampling:** Extract frames from generated GIFs and feed them back as new image/video input for iterative refinement
- **Session persistence:** Save/load generations and UI settings via Hugging Face Hub datasets
- **Prompt inspiration:** Auto-generate prompts or use custom topic lists
- **Comet ML integration:** Automatic logging of prompts, media, and settings for experiment tracking

## Technical Architecture

### Pipeline System

- **Hugging Face Diffusers compatible:** Works with any Diffusers pipeline/checkpoint — bring-your-own-model approach
- **ControlNet support:** Single and MultiControlNet via `StableDiffusionControlNetPipeline`
  - Preprocessor order must match model order; `no-processing` available for models needing none
  - Example: `lllyasviel/control_v11p_sd15_softedge, lllyasviel/control_v11f1p_sd15_depth`
- **Custom pipelines:** Supports community pipeline format from the Diffusers examples
- **Prompt weighting:** Powered by [Compel](https://github.com/damian0815/compel) library for advanced prompt syntax

### Animation Engine

| Component | Mechanism |
|---|---|
| **Keyframe interpolation** | Interpolates noise tensors + text embedding latents between defined frames |
| **Coherence** | Gradient of current latent vs. reference latent (typically previous frame) preserves visual continuity |
| **Motion control (2D)** | Deforum-compatible keyframe strings for zoom, angle, translation X/Y |
| **Audio sync** | Timestamp extraction alongside keyframes for prompt-to-audio alignment |

### Diffusion Settings

- **Fixed latent mode:** Keep noise constant across frames for prompt-only interpolation
- **Prompt embedding interpolation:** Default mode; can disable for forward-fill text or ComposableDiffusion
- **Image strength scheduling:** Per-frame denoising strength (`0:(0.5), 10:(0.7)`)
- **Configurable scheduler:** With extra kwargs passthrough
- **Batch size scaling:** For high-memory GPUs
- **Auto-dimension matching:** From input image/video

## Dependencies & Setup

- **Installation:** `pip install -r requirements.txt` then `python app.py`
- **Cloud options:** Google Colab notebook available, Comet ML integration
- **Hugging Face CLI:** Required for session management (`huggingface-cli login`)

## Licensing

Open-source (specific license from repository — check GitHub for details).

## Links

- GitHub: https://github.com/DN6/giffusion
- Google Colab: https://colab.research.google.com/github/DN6/giffusion/blob/main/Giffusion.ipynb
- Comet ML Demo: https://www.comet.com/team-comet-ml/giffusion/

## Relationships

- Uses **Hugging Face Diffusers** as its pipeline backbone — compatible with any Diffusers model
- **ControlNet integration** — supports [[controlnet]] models for structured generation
- **Deforum-compatible** animation syntax (keyframe strings, curve format, motion parameters)
- Shares the diffusion-based animation domain with [[fooocus]] (static image generation) and [[comfyui]] (node-based generation)
- Game dev use cases: animated sprite generation, cinematic prototyping, asset variation with temporal consistency
