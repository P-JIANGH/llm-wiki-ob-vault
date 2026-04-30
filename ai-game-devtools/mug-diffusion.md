---
title: MuG Diffusion — AI Rhythm Game Charting Tool
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [tool, ai, python, project]
sources: [raw/articles/ai-game-devtools/mug-diffusion.md]
---

# MuG Diffusion

AI rhythm game charting tool modified from Stable Diffusion that generates 4K VSRG charts directly from audio files.

## Overview

MuG Diffusion is an AI-powered charting tool for rhythm games, built by **Keytoyze** and supported by the Malody community. It modifies the Stable Diffusion latent diffusion architecture to incorporate audio waveform conditioning, enabling direct audio-to-chart generation with granular user control over difficulty, style, and pattern characteristics.

**GitHub:** https://github.com/Keytoyze/Mug-Diffusion
**License:** Charts CC0 1.0; model weights non-commercial

## Key Features

- **4K VSRG only** (current); roadmap includes osu!standard, 5-8K VSRG, maimai
- **Difficulty control:** osu! star rating (1-8) + Etterna MSD score (5-35)
- **Style control:** ranked (osu!), stable (Malody), custom styles
- **Pattern conditioning:** chordjack, stamina, stream, jumpstream, handstream, technical — each with toggle direction (more/less) and intensity slider
- **LN ratio control:** 0-100% long note proportion
- **Chart-to-prompt inversion:** reverse-engineer existing .osu files back into AI prompts
- **Auto AI tagging:** `AIMode: MuG Diffusion vx.x.x` embedded in all generated charts

## Architecture

| Component | Technology |
|-----------|-----------|
| Backbone | DDPM + DDIMSampler |
| Conditioning | Audio mel-spectrogram + feature embeddings |
| Training | PyTorch Lightning, DDP distributed |
| WebUI | Gradio browser interface |
| Preview | reamber (chart parsing) |
| Difficulty calc | minacalc (Etterna MSD) |

## Performance

~30 seconds to generate 4 charts for a 3-minute audio track on NVIDIA RTX 3050Ti (4GB VRAM). Windows bundled executable available with all dependencies included.

## Related Projects

- Similar to [[gamegen-o]] in spirit — both use generative AI for game content creation, but MuG targets rhythm game charts while GameGen-O targets open-world game video generation
- Uses the latent diffusion model paradigm, adapted with audio conditioning for chart generation; related to [[omnilmm]] in extending base models for domain-specific multimodal tasks

## Community

- Supported by `Malody` development team financially
- Training dataset transparency: public chart list at mugdiffusion.keytoix.vip/dataset.html
- QQ Group 548470510 for discussion
