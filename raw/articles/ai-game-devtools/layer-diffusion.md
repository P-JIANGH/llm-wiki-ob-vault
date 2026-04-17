# LayerDiffuse — Transparent Image Layer Diffusion

**Source:** https://github.com/layerdiffusion/LayerDiffusion
**Date:** 2026-04-17
**Author:** lllyasviel (Lvmin Zhang)

## Project Overview

LayerDiffuse is a research project enabling **native transparent image layer diffusion using latent transparency**. Unlike post-processing background removal methods, it directly diffuses alpha channels within the diffusion process, preserving complex semi-transparency effects (glass, glowing effects, fine fur/hair, skeletal structures).

The main repository serves as an entry page pointing to platform-specific implementations.

## Platform Implementations

### 1. Stable Diffusion WebUI (via Forge)
- Repo: https://github.com/layerdiffusion/sd-forge-layerdiffuse
- Extension for SD WebUI via Forge framework
- Supports SDXL and SD1.5
- Batch size requirements: multiple of 3 (generate everything) or 2 (BG→FG / FG→BG)
- SDXL requires 2-step workflow; SD1.5 supports 1-step
- ~680MB model weights (auto-download)
- Model types: attention injection, convolution, FG2BG/BG2FG, VAE encoder/decoder

### 2. Diffusers CLI
- Repo: https://github.com/lllyasviel/LayerDiffuse_DiffusersCLI
- Pure diffusers implementation without GUI
- Uses k-diffusion for sampling (not diffusers' scheduling)
- Minimum 8GB Nvidia VRAM
- Features: RGB padding demo, SDXL transparent T2I, SDXL transparent I2I
- Roadmap: SD1.5 support, layer systems, mask-based inpainting

## Technical Architecture

### Latent Transparency
- Extends standard latent space to include alpha channel encoding
- VAE transparent encoder/decoder handles RGBA ↔ latent conversion
- Attention injection and convolution-based approaches for different workflows

### Workflow Methods
1. **Only Generate Transparent Image** — single transparent PNG output
2. **Generate Everything Together** (SD1.5 only) — FG, BG, blended in one pass
3. **From Background to Foreground/Blending** — uses existing BG to generate FG
4. **From Foreground to Background/Blending** — uses existing FG to generate BG

### Key Models
- `layer_xl_transparent_attn` — SDXL attention-based transparent generation
- `layer_xl_transparent_conv` — SDXL convolution-based transparent generation
- `layer_xl_fg2ble` / `layer_xl_bg2ble` — SDXL foreground/background blending
- `layer_sd15_transparent_attn` — SD1.5 attention-based
- `layer_sd15_joint` — SD1.5 joint generation
- `vae_transparent_encoder/decoder` — VAE for transparent encoding/decoding

## Usage Rules
- Batch size must be divisible by 3 (3-image output) or 2 (2-image output)
- SDXL 2-step sampler: use Euler A or UniPC (avoid DPM samplers)
- Independent layer prompts prevent global prompt corruption
- Multi-step compositing chains possible for complex scenes

## License

Apache-2.0 (DiffusersCLI). Forge extension license per upstream.

## Game Development Applications
- Game asset generation with transparent backgrounds (items, effects, UI elements)
- Character sprite creation with clean alpha channels
- Layer-based compositing for game art pipelines
- Background generation from foreground game objects
- Procedural lighting-consistent asset placement
