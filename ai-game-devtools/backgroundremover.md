---
title: BackgroundRemover
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, ai, open-source, python, image-generation]
sources: [raw/articles/ai-game-devtools/backgroundremover.md]
---

# BackgroundRemover

AI-powered command line tool for removing backgrounds from images and videos using U2Net neural network models.

**GitHub:** https://github.com/nadermx/backgroundremover
**PyPI:** `pip install backgroundremover`
**License:** MIT
**Author:** Johnathan Nader

## Overview

BackgroundRemover provides a simple CLI interface to segment foreground subjects from backgrounds using deep learning. Built to power [BackgroundRemoverAI.com](https://backgroundremoverai.com), it supports single images, batch folders, video processing, pipe mode, HTTP API server, and Python library usage.

## Core Models (U2Net Family)

| Model | Use Case | Speed |
|-------|----------|-------|
| `u2net` | General objects (default) | Standard |
| `u2net_human_seg` | Humans/portraits | Standard |
| `u2netp` | Quick processing | Fast, lower accuracy |

Models auto-download to `~/.u2net/` on first run.

## Key Features

### Image Processing
- **Single / batch / pipe mode** — stdin/stdout for Unix pipeline integration
- **Alpha matting** — refined edges with adjustable erosion size (1-25) and thresholds
- **Background replacement** — custom color (RGB tuple) or background image
- **Mask output** — binary matte only mode (`-om`)
- **Format support** — JPG, PNG, HEIC, HEIF

### Video Processing
- **Transparent .mov** — ProRes 4444 codec with alpha channel (10-bit yuva444p10le)
- **Transparent .gif** — simpler but lower quality output
- **Matte key file** — for Premiere/After Effects compositing
- **Overlay modes** — over background video (`-tov`) or image (`-toi`)
- **Tunable** — frame rate, frame limit, workers, GPU batch size

### HTTP API Server
```bash
backgroundremover-server --addr 0.0.0.0 --port 8080
# POST file upload or GET from URL
```

### Python Library
```python
from backgroundremover.bg import remove
img = remove(data, model_name="u2net", alpha_matting=True)
```

## Technical Details

- **GPU acceleration:** Auto-detected, 5-10x speedup over CPU
- **Docker support:** Models persist via `~/.u2net` volume mount
- **Multiprocessing:** Video processing uses Python multiprocessing (adjustable workers)
- **Fallback:** Automatically uses CPU if GPU unavailable

## Game Dev Use Cases

- **Character art preparation:** Batch-remove backgrounds from sprite sheets and character art
- **Trailer compositing:** Remove background from gameplay footage for marketing videos
- **VTuber/streaming overlay:** Extract foreground subjects for live compositing
- **UI asset extraction:** Isolate icons and sprites from screenshots
- **Asset pipeline integration:** CLI or Python API for automated game asset processing

## Dependencies

PyTorch/torchvision (with optional CUDA), ffmpeg 4.4+, numpy, scikit-image, moviepy>=2.0.0, Pillow, pymatting, Flask/waitress (server mode)

## Related

- [[segment-anything-2]] — Meta's general-purpose segmentation model (SAM 2), more versatile but heavier
- [[grounded-segment-anything]] — Open-vocabulary segmentation combining GroundingDINO + SAM, supports text prompts
- [[facefusion]] — Face manipulation platform that includes background removal as a processor module
