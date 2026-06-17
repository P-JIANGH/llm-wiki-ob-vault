# CityDreamer: Compositional Generative Model of Unbounded 3D Cities

**Source:** https://github.com/hzxie/city-dreamer
**Conference:** CVPR 2024
**Institution:** S-Lab, Nanyang Technological University
**Authors:** Haozhe Xie, Zhaoxi Chen, Fangzhou Hong, Ziwei Liu
**Extracted:** 2026-04-18 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview

CityDreamer is a compositional generative model for creating unbounded 3D cities. It generates large-scale, realistic 3D urban environments through a multi-component pipeline that handles layout, background elements, and building instances separately.

## Architecture

### Multi-Component Design
The system decomposes city generation into three independently trained components:

| Component | Architecture | Purpose |
|-----------|-------------|---------|
| **Unbounded Layout Generator** | VQVAE + Sampler | Generates infinite city layouts via patch-based sampling |
| **Background Stuff Generator** | GAN-based (GANcraft-style) | Generates terrain, roads, vegetation |
| **Building Instance Generator** | GAN-based (GANcraft-style) | Generates individual 3D building meshes |

### Repository Structure
```
city-dreamer/
├── core/          # Core logic & pipelines
├── demo/          # Interactive web demo
├── extensions/    # Custom CUDA kernels
├── losses/        # Training loss functions
├── metrics/       # Evaluation metrics
├── models/        # Network architectures
├── scripts/       # Training & inference runners
├── utils/         # Helper utilities
├── config.py      # Central configuration file
├── requirements.txt
└── run.py         # Main entry point
```

## Technical Details

### Environment Requirements
- Python 3.8
- PyTorch 1.13.1
- CUDA 11.7
- Custom CUDA extensions (compiled during setup)

### Inference
- **Iterative Demo**: Web UI at localhost:3186
- **CLI**: `scripts/inference.py` → output as `output/rendering.mp4`
- **VRAM Optimization**: Patch-based generation (`--patch_height` / `--patch_width`)
  - RTX 3090 (24GB VRAM): patch_height=5, patch_width=5
  - Adjustable based on available GPU memory

### Training Pipeline
- **Dataset**: OSM (OpenStreetMap) + GoogleEarth imagery
- **Storage Warning**: Instance segmentation annotations for GoogleEarth dataset require ~1TB disk space
- Each component trained separately with config.py updates

### Pretrained Weights
- `output/sampler.pth` — Unbounded Layout Generator
- `output/gancraft-bg.pth` — Background Stuff Generator
- `output/gancraft-fg.pth` — Building Instance Generator

## Links
- arXiv: https://arxiv.org/abs/2309.00610
- HuggingFace Demo: https://huggingface.co/spaces/hzxie/city-dreamer
- YouTube: https://youtu.be/te4zinLTYz0

## License
NTU S-Lab License 1.0 — All redistribution and usage must comply with this license.
