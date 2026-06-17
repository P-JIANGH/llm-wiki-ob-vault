# BackgroundRemover — AI Background Removal CLI Tool

> Source: https://github.com/nadermx/backgroundremover
> Analyzed: 2026-04-20
> Clone source: gitcode.com mirror (GitHub timeout)

## Overview
BackgroundRemover is a command line tool to remove background from images and videos using AI. Made by nadermx (Johnathan Nader) to power https://BackgroundRemoverAI.com.

## Key Facts
- **Version:** 0.4.1
- **License:** MIT
- **Author:** Johnathan Nader (john@nader.mx)
- **Python:** >= 3.6, < 4
- **PyPI:** `pip install backgroundremover`
- **Docker:** `docker build -t bgremover .`

## Architecture / Models
- Uses **U2Net** family of models for segmentation:
  - `u2net` — general objects (default)
  - `u2net_human_seg` — humans/people (most accurate for portraits)
  - `u2netp` — faster processing, lower accuracy
- Models auto-downloaded to `~/.u2net/` on first run
- PyTorch backend with automatic GPU detection (CUDA 11.8/12.1)

## Core Features
### Image Processing
- Single image, folder batch, stdin/stdout pipe mode
- Alpha matting for refined edges (-a flag, adjustable erosion/threshold)
- Custom background color or background image replacement
- Binary mask/matte output only (-om)
- HEIC/HEIF support (requires pillow-heif)

### Video Processing
- Transparent .mov output (ProRes 4444 with alpha channel, 10-bit yuva444p10le)
- Transparent .gif output (-tg)
- Matte key file for video editors (-mk)
- Overlay over background video (-tov) or background image (-toi)
- Configurable frame rate (-fr), frame limit (-fl), workers (-wn), GPU batch size (-gb)

### HTTP API Server
- `backgroundremover-server` starts Flask-based HTTP API
- POST file upload or GET from URL
- All CLI options available as query parameters

### Library API
```python
from backgroundremover.bg import remove
img = remove(data, model_name="u2net", alpha_matting=True, background_color=(255,0,0))
```

## Dependencies
torch, torchvision, numpy, scikit-image, scipy, pymatting, Pillow, pillow-heif, moviepy>=2.0.0, ffmpeg-python, flask, waitress, tqdm, requests, filetype, hsh, more_itertools, certifi, charset-normalizer, filelock, idna, PySocks, six, urllib3

## Module Structure (from setup.py entry points)
- `backgroundremover.cmd.cli` — CLI main
- `backgroundremover.cmd.server` — HTTP server main
- `backgroundremover.bg` — core remove() library function
- `models/` — U2Net model weights included
- `translations/` — i18n management commands

## Technical Notes
- GPU acceleration: 5-10x faster than CPU (auto-detected)
- Video multiprocessing requires adequate shared memory (--shm-size=2g for Docker)
- ProRes 4444 output requires compatible player (mpv/QuickTime recommended, VLC may fail)
- Model download validation and retry built-in
- Fallback to CPU if GPU unavailable

## Game Dev Relevance
- Character/sprite asset preparation: batch remove backgrounds from character art
- Video game trailers: remove background from gameplay footage for compositing
- VTuber/streaming: real-time background removal for overlay compositions
- Game UI elements: extract icons/sprites from screenshots
- Can be integrated into game asset pipelines via CLI or Python library API
