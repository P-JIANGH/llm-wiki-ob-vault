---
title: sd-webui-mov2mov
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, video, open-source, image-generation, diffusion]
sources: [raw/articles/ai-game-devtools/sd-webui-mov2mov.md]
---

# sd-webui-mov2mov

## Overview
Mov2mov is a **video-to-video conversion plugin** for [[stable-diffusion-webui]] (Automatic1111). It enables users to transform existing videos by processing each frame through Stable Diffusion's img2img pipeline, then reassembling the results into a new video. Compared to [[img2img-turbo]] which accelerates single-image generation, mov2mov focuses on batch video processing.

## Core Features

### Basic Mode
- **Frame-by-frame processing:** Extracts frames from input video, runs each through SD img2img, reassembles into output video
- **Automatic resolution detection:** Infers video width/height from source
- **Configurable parameters:** Denoising strength, CFG scale, noise multiplier, max frames limit
- **Refiner support:** Compatible with SD refiner models for improved quality

### Video Editor (beta, Windows only)
- **Keyframe compositing:** Dramatically reduces video flicker by processing only keyframes and interpolating between them
- **Flexible keyframe selection:** Manual selection or auto-generation of keyframe positions
- **Backpropel keyframe tag:** Propagates keyframe data backward for better consistency
- **Ebsynth integration:** Uses [[ebsynth]]-style synthesis for smooth frame interpolation

## Technical Architecture

| Component | File | Purpose |
|-----------|------|---------|
| Main processor | `scripts/mov2mov.py` | Frame extraction, img2img processing, video assembly |
| Movie editor | `scripts/movie_editor.py` | Keyframe-based editing with Ebsynth |
| UI | `scripts/m2m_ui.py` | Gradio tab interface |
| Utilities | `scripts/m2m_util.py` | Video I/O, size calculation, encoding |
| Config | `scripts/m2m_config.py` | Output directory defaults |

### Processing Pipeline
1. Load video → extract frames via OpenCV
2. For each frame → `StableDiffusionProcessingImg2Img(init_image=frame)`
3. Run generation → collect output images
4. Reassemble → imageio + ffmpeg → MP4 output

### Dependencies
- `opencv-python` — video frame extraction
- `imageio` / `imageio-ffmpeg` — video assembly
- Bundled `ebsynth/` — keyframe interpolation (Windows only)

## Comparison with Similar Tools

Unlike [[video2game]] which generates game environments from video, mov2mov transforms **existing video** into a new style using SD img2img. It operates as a WebUI extension rather than a standalone tool. The keyframe editing approach complements [[comfyui]]'s more complex video workflows with a simpler, focused style-transfer pipeline.

## Usage Notes
- Works best with the bg-mask plugin (Scholar01/sd-webui-bg-mask) for background separation
- Video editing mode requires Windows (ebsynth limitation)
- Two Bilibili video tutorials available for learning
- Chinese community support via QQ channel and Discord

## Links
- **GitHub:** https://github.com/Scholar01/sd-webui-mov2mov
- **Related:** [[sd-webui-bg-mask]] (companion plugin)
- **Tutorials:** Bilibili BV1Mo4y1a7DF, BV1rY4y1C7Q5
