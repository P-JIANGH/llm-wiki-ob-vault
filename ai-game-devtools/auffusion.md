---
title: Auffusion
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, tool, open-source, audio, diffusion]
sources: [raw/articles/ai-game-devtools/auffusion.md]
---

# Auffusion

## Overview
Auffusion is a latent diffusion model (LDM) for **text-to-audio (TTA) generation** that adapts Stable Diffusion's text-to-image framework to the audio domain. It generates realistic sounds including human/animal voices, natural/artificial sounds, and sound effects from text prompts.

## Architecture
- **Backbone:** Latent Diffusion Model adapted from T2I (Stable Diffusion) to TTA
- **Text Encoder:** CLIPTextModel
- **UNet:** UNet2DConditionModel with cross-attention conditioning
- **VAE:** AutoencoderKL for audio latent space encoding/decoding
- **Condition Adapter:** Linear projection + LayerNorm mapping CLIP embeddings to UNet cross-attention space
- **Vocoder:** HiFi-GAN style neural vocoder for waveform reconstruction
- **Scheduler:** KarrasDiffusionSchedulers (PNDM default)
- **Memory:** xformers attention optimization support

## Model Variants
Three checkpoints available on HuggingFace:
- **Auffusion** — base model
- **Auffusion-Full** — full training variant
- **Auffusion-Full-no-adapter** — full model without condition adapter

## Audio Manipulation
Supports five modes via Jupyter notebooks:
1. **Text-to-audio generation** — text prompt → audio waveform
2. **Text-guided style transfer** — audio input + text style description → styled audio
3. **Audio inpainting** — fill missing/masked audio regions
4. **Word swap control** — attention-based word substitution in prompts
5. **Reweight control** — attention-based emphasis adjustment

## Key Facts
| Property | Value |
|----------|-------|
| Paper | arXiv:2401.01044 (2024) |
| License | Apache 2.0 |
| Framework | PyTorch 2.0.1 + diffusers 0.18.2 |
| Evaluation | AudioCaps test set + CLAP scoring |
| Authors | Jinlong Xue et al. (BUPT) |
| Code | ~1000 lines (auffusion_pipeline.py) |

## Related Tools
- [[ai-game-devtools/audioldm-2]] — another text-to-audio diffusion framework, uses similar diffusion approach
- [[ai-game-devtools/tango]] — code borrowed from TANGO project; Auffusion improves on its approach
- [[ai-game-devtools/audio-diffusion-pytorch]] — audio diffusion generation library, complementary to Auffusion

## Game Dev Relevance
Useful for game audio asset generation — sound effects (birds singing, thunder, footsteps, ambient sounds) from text descriptions without needing to record or source existing audio. Can be integrated into game asset pipelines alongside tools like [[ai-game-devtools/audiogen-codec]] for audio compression and [[ai-game-devtools/mug-diffusion]] for rhythm game chart generation.
