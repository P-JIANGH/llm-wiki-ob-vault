---
title: Dream Textures
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, blender, texture, image-generation, diffusion, open-source, ai]
sources: [raw/articles/ai-game-devtools/dream-textures.md]
aliases: ["DreamTextures"]

---

# Dream Textures

**GitHub:** [carson-katri/dream-textures](https://github.com/carson-katri/dream-textures)
**License:** GPL-3.0
**Version:** 0.4.0
**Requires:** Blender 3.1+

## Overview

Dream Textures is a Blender add-on that brings **Stable Diffusion** image generation directly into Blender's interface. It enables artists and game developers to create textures, concept art, and visual assets using text prompts without leaving the 3D workspace. Models run locally for fast iteration, with cloud fallback via DreamStudio.

## Key Features

- **Text-to-Texture** — Generate unique textures from text prompts inside Blender's Image Editor
- **Seamless Tiling** — Create perfectly tileable textures with no visible seams
- **Texture Projection** — Use depth-to-image to texture entire models and scenes in 3D
- **Inpaint/Outpaint** — Fix images, convert existing textures to seamless, extend images
- **Cycles Render Pass** — Re-style rendered animations using the Dream Textures node system
- **AI Upscaling** — 4x upscale of low-resolution generations
- **Generation History** — Recall, export, and import past generations

## Architecture

| Component | Description |
|-----------|-------------|
| **DiffusersBackend** | Default backend using HuggingFace `diffusers` for local generation |
| **Backend API** | Abstract interface allowing community backends (Cloud, local, etc.) |
| **Generator Process** | Subprocess-based isolation from Blender's Python environment |
| **Render Engine** | Custom Blender render engine with AI-driven effects |
| **Cycles Pass Integration** | Monkey-patched Cycles render passes for AI restyling |

## Supported Platforms

- **Linux/Windows:** NVIDIA GPU (CUDA)
- **macOS:** Apple Silicon (MPS, M1/M2)
- **Linux:** AMD GPU (ROCm)
- **Windows:** DirectX 12 GPU (DirectML)
- **Cloud:** DreamStudio (any hardware)

## Performance Features

- **Attention Slicing** — Reduces memory at small speed cost
- **SDP Attention** — Scaled dot-product attention for memory savings + speedup
- **CPU Offload** — Dynamic model loading for low-VRAM systems
- **Half Precision** — FP16 generation with minimal quality loss
- **VAE Slicing/Tiling** — Memory-efficient decoding for large images
- **SDXL Refiner** — Automatic two-stage refinement for SDXL models

## Comparison with Related Tools

| Tool | Scope | Relationship |
|------|-------|-------------|
| [[ai-game-devtools/blender-controlnet]] | ControlNet in Blender | Focuses on ControlNet guidance; Dream Textures is broader |
| [[ai-game-devtools/stable-diffusion-webui]] | Standalone WebUI | Dream Textures integrates into Blender 3D workflow |
| [[ai-game-devtools/comfyui]] | Node-based SD UI | ComfyUI is standalone; Dream Textures is Blender-native |
| [[ai-game-devtools/stable-diffusion]] | Core model | Dream Textures builds on SD via diffusers |
| [[ai-game-devtools/unity-ml-stable-diffusion]] | Unity SD integration | Similar concept but for Unity instead of Blender |

## Use Cases for Game Development

1. **Texture Creation** — Generate PBR-ready seamless textures for 3D models
2. **Concept Art** — Rapid ideation with text prompts inside the 3D workspace
3. **Scene Styling** — Restyle entire rendered scenes with AI
4. **Asset Extension** — Outpaint textures for larger UV maps
5. **Animation Restyling** — Apply AI-driven style transfer to rendered animations
