# Hua — AI Image Editor with Stable Diffusion

## Project Overview

- **Name:** Hua (画 = "paint" in Chinese)
- **Author:** BlinkDL (also creator of [[RWKV-LM]])
- **Website:** https://www.PaintHua.com
- **License:** Apache 2.0
- **GitHub:** https://github.com/BlinkDL/Hua

## Description

Hua is an AI image editor frontend that connects to Stable Diffusion's AUTOMATIC1111 WebUI API. It provides a visual canvas-based interface for:
- **txt2img** — Text-to-image generation
- **img2img** — Image-to-image transformation
- **Inpainting** — Mask-based selective region editing
- **Outpainting** — Extending images beyond their borders

## Architecture

- **Frontend:** 100% vanilla JavaScript (no framework), ~168KB single `index.js`
- **Backend:** Delegates to local AUTOMATIC1111 WebUI server via REST API
- **Deployment:** GitHub Pages (docs/ directory), served statically
- **CORS:** Requires A1111 server to be started with `--cors-allow-origins=https://www.painthua.com`

### Connection Modes

1. **Colab:** Connects to fast-stable-diffusion Colab notebook via `--api` + CORS flag
2. **Local A1111:** Connects to user's own AUTOMATIC1111 WebUI server (100% free)
   - Requires `--api --port xxxxx --cors-allow-origins=https://www.painthua.com`

### Key Design Choices

- Canvas-based brush tool for inpainting masks (mouse left/right/wheel controls)
- No server-side code — purely client-side UI that talks to SD API
- Recommended model: `sd-v1.5-inpainting` for best results
- Vanilla JS chosen for maximum control; author plans to refactor to cleaner codebase

## Status

- **Closed Alpha** as of project analysis date
- Frontend planned to be open-source after major functions complete
- Backend (clean & efficient) planned to be open-source from the beginning
- Author has Stability-sponsored RWKV training background, project considered safe

## Related Projects

- **[[ai-game-devtools/comfyui]]** — Another SD frontend (node-based, more features)
- **[[ai-game-devtools/chatrwkv]]** — Same author (BlinkDL), RWKV-based chat application
- **[[ai-game-devtools/sd-webui-depth-lib]]** — A1111 plugin ecosystem (depth map library)
