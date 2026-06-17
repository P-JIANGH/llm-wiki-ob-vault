# sd-webui-mov2mov

**Source:** https://github.com/Scholar01/sd-webui-mov2mov
**Date:** 2026-04-20

## Overview
Mov2mov is a plugin for Automatic1111's stable-diffusion-webui that enables video-to-video conversion using Stable Diffusion's img2img pipeline. It processes video frames through SD and reassembles them into output video.

## Features
- Directly process frames from videos
- Package processed frames into output video
- Video Editing (beta): Keyframe compositing to reduce video flicker
  - Customizable keyframe selection or auto-generation
  - Backpropel keyframe tag
  - Uses Ezsynth for automatic frame synthesis based on keyframes
  - Windows-only for video editing features
- Works well with the bg-mask plugin

## Installation
Install via the Extensions tab in stable-diffusion-webui:
1. Open Extensions tab → Install from URL
2. Enter the repository URL
3. Click Install → Restart WebUI

## Technical Architecture
- **Plugin Type:** Extension for stable-diffusion-webui (Automatic1111)
- **Core Pipeline:** Uses StableDiffusionProcessingImg2Img to process each video frame
- **Key Modules:**
  - `mov2mov.py` — Main processing logic: frame extraction, img2img processing, video assembly
  - `movie_editor.py` — Keyframe-based video editing with Ebsynth integration
  - `m2m_ui.py` — Gradio UI components for the plugin tab
  - `m2m_ui_common.py` — Shared UI utilities
  - `m2m_util.py` — Video utilities: width/height calculation, frame extraction, video encoding
  - `m2m_hook.py` — Integration hooks with WebUI
  - `m2m_config.py` — Configuration defaults (output directory)
  - `module_ui_extensions.py` — UI extension modules
- **Dependencies:** opencv-python, imageio, imageio-ffmpeg (or ffmpeg on non-Windows)
- **Video Editing:** Bundles ebsynth for keyframe interpolation (reduces flicker)
- **External Tools Referenced:**
  - MODNet (background matting, temporarily removed)
  - Ezsynth (keyframe synthesis)

## Key Processing Flow
1. Extract frames from input video using OpenCV
2. For each frame, create a StableDiffusionProcessingImg2Img with the frame as init_image
3. Run img2img generation (respecting denoising strength, CFG scale, etc.)
4. Collect generated frames
5. Reassemble frames into video using imageio (with ffmpeg backend)

## Keyframe Editing Flow (beta, Windows only)
1. Parse user-defined or auto-generated keyframe positions
2. Process only keyframe images through SD img2img
3. Use Ebsynth to interpolate between keyframes for smooth transitions
4. Merge sequences and output final video

## Version History (Changelog highlights)
- 2023-09-30: Automatic video FPS parsing, video editing with keyframes, Ezsynth integration
- 2023-09-24: Tab repositioning, Mac video fix, refiner support
- 2023-09-23: SD 1.6 compatibility, video size inference, refiner support, imageio for video synthesis

## Community
- Bilibili video tutorials available
- QQ channel and Discord community
- Chinese README available (README_CN.md)

## License
MIT License (inferred from LICENSE file presence)
