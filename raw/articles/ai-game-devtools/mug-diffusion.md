# MuG Diffusion — AI Rhythm Game Charting Tool

**Source:** https://github.com/Keytoyze/Mug-Diffusion
**Extracted:** 2026-04-16 (web extract; GitHub/gitcode/gitee clone all failed)

## Project Overview
- **Core Function:** High-quality, controllable AI that generates rhythm game charts directly from audio files
- **Architecture:** Modified from Stable Diffusion (latent diffusion model) to explicitly incorporate audio waveforms into the generation pipeline
- **Current Support:** 4K Vertical Scroll Rhythm Game (VSRG) only
- **Future Roadmap:** Plans to expand to osu!standard, 5-8K VSRG, maimai, and other formats
- **License:** Charts CC0 1.0; model weights and charts non-commercial
- **Creator:** Keytoyze; WebUI by raber; Logo by RiceSS
- **Platform Support:** Malody community; Windows bundled executable + cross-platform source

## Key Features
- Music-aligned, highly diverse outputs with granular user control over chart generation
- Difficulty control: osu! star rating system (1-8) and Etterna MSD system (5-35)
- Style control: ranked (osu!), stable (Malody), and other chart styles
- Long Note (LN) ratio: 0-100% of total notes
- Pattern control: All Etterna MSD patterns — chordjack, stamina, stream, jumpstream, handstream, technical
- Chart-to-prompt inversion: reverse-engineer existing .osu files into AI-readable prompts
- Automatic AI tagging: AIMode metadata embedded in all generated charts

## Model Architecture
- **Backbone:** DDPM with DDIMSampler for inference
- **Conditioning:** Audio mel-spectrogram + structured feature embeddings (prompts)
- **Training Pipeline:** PyTorch Lightning-based LDM training with YAML configs, distributed DDP support
- **Key Libraries:** torch, gradio, reamber (chart parsing/preview), minacalc (Etterna MSD), eyed3, ffmpeg

## WebUI Controls (Gradio)
- **Input:** Audio file + title/artist metadata
- **Parameters:** Sampling count (1-16), step (10-200), CFG scale (1-30), random seed
- **Output:** .osu chart files + visual playfield preview + .osz package
- **Performance:** ~30 seconds to generate 4 charts for 3-min audio on RTX 3050Ti (4GB VRAM)

## Repository Structure
| Directory/File | Purpose |
|---|---|
| `mug/` | Core AI/charting logic (modified SD) |
| `configs/` | Generation configuration files |
| `models/` | Model weights & architecture definitions |
| `scripts/` | Utility & automation scripts |
| `asset/` | Images, UI assets, documentation |
| `main.py` | Training/evaluation entry point (PyTorch Lightning) |
| `webui.py` | Gradio-based browser interface |
| `requirements.txt` | Python dependencies |

## Data & Transparency
- Full training dataset (chart list) publicly published at mugdiffusion.keytoix.vip/dataset.html
- Community mappers/charters contributed training data
- Financial support from Malody development team
