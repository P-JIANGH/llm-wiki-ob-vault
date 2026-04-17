---
title: Hua — AI Image Editor with Stable Diffusion
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, open-source]
sources: [raw/articles/ai-game-devtools/hua.md]
---

# Hua (画)

## Overview

Hua (画, meaning "paint" in Chinese) is an AI image editor frontend built by **BlinkDL** (also known for [[ai-game-devtools/chatrwkv]] and RWKV-LM). It provides a canvas-based visual interface for Stable Diffusion operations including text-to-image, image-to-image, inpainting, and outpainting.

Website: https://www.PaintHua.com | Discord: https://discord.gg/y9kMYtjgFZ

## Key Features

| Feature | Description |
|---------|-------------|
| **txt2img** | Text-to-image generation via SD API |
| **img2img** | Image-to-image transformation |
| **Inpainting** | Canvas brush mask for selective region editing |
| **Outpainting** | Extend images beyond their borders |
| **Colab support** | Works with fast-stable-diffusion Colab notebooks |
| **Local mode** | 100% free when connected to local A1111 server |

## Architecture

- **Frontend:** 100% vanilla JavaScript (no framework), single `index.js` (~168KB)
- **Backend:** Delegates entirely to AUTOMATIC1111 WebUI REST API
- **Deployment:** GitHub Pages static hosting
- **CORS Security:** Requires A1111 server with `--cors-allow-origins=https://www.painthua.com`
- **Recommended model:** `sd-v1.5-inpainting` for best inpainting results

## Connection Setup

Users must configure their A1111 WebUI server with:
```
--api --port xxxxx --cors-allow-origins=https://www.painthua.com
```
Where `xxxxx` is a random port between 10000-60000 for safety.

## Status

Closed Alpha. The author (BlinkDL) plans to:
1. Finish all major frontend functions and refactor from "hacks" to clean code
2. Write a clean & efficient backend, open-source from the beginning

## License

Apache 2.0

## Related Tools

- **[[ai-game-devtools/comfyui]]** — Node-based SD frontend with 578 Python files, more comprehensive pipeline support
- **[[ai-game-devtools/fooocus]]** — Offline SDXL image generation tool, zero-config approach
- **[[ai-game-devtools/chatrwkv]]** — Same author's RWKV-based chat application
