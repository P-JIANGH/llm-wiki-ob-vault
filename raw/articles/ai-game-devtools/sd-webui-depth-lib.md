# sd-webui-depth-lib — Depth map library and poser

**Source:** https://github.com/jexom/sd-webui-depth-lib
**Captured:** 2026-04-17

## Overview

Depth map library for use with the [Control Net extension](https://github.com/Mikubill/sd-webui-controlnet) for [Automatic1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

Provides a "Depth Library" tab within the Stable Diffusion WebUI that allows users to browse, compose, and edit depth maps using a canvas-based editor (Fabric.js). Depth maps can be saved as PNG or sent directly to the ControlNet extension.

## Key Features

- **Depth Map Browser:** Pre-built depth maps organized by category tabs (hands, shapes)
- **Canvas Composer:** Fabric.js-based canvas for composing depth maps from multiple elements
- **Controls:** Width/height sliders (64–2048), base depth brightness (0–255), opacity
- **Background Image:** Add/remove background images for reference while composing
- **Save PNG:** Export composed depth map as PNG download
- **Send to ControlNet:** One-click send to txt2img ControlNet extension input
- **Add Own Maps:** Users can add custom depth maps to `extensions/sd-webui-depth-lib/maps/<category>/`

## Architecture

### Backend (Python)
- `scripts/main.py` — Gradio-based Script for A1111 WebUI
  - Registers a new UI tab "Depth Library" via `script_callbacks.on_ui_tabs`
  - Uses `gr.Blocks` with sliders for canvas resolution, base depth, opacity
  - All interactive logic delegated to JavaScript via `_js` callbacks

### Frontend (JavaScript)
- `javascript/main.js` — Canvas manipulation using Fabric.js
  - `depth_lib_canvas` — Fabric.js Canvas instance for depth map composition
  - Functions: add/remove images, resize canvas, save PNG, send to ControlNet
  - `depth_sendImage()` — creates a File blob and dispatches a change event to the ControlNet file input
  - MutationObserver waits for Gradio app to render before initializing canvas

### Assets
- `maps/hands/` — ~30 hand pose depth map images (front/back/side views, numbers, gestures)
- `maps/shapes/` — 4 shape depth maps (circle, square, star, hexagon)
- `javascript/fabric.js` — Bundled Fabric.js library (canvas manipulation)

## Installation

1. WebUI → Extensions tab → Install from URL
2. Enter `https://github.com/jexom/sd-webui-depth-lib.git`
3. Install and restart WebUI

## Usage Notes

- Do NOT select anything for the Preprocessor in ControlNet when using library maps
- Library maps are ready-to-use depth images — preprocessing would corrupt them

## License

Not explicitly stated in repository (no LICENSE file found)
