# GaussCtrl — Raw Source

**Source:** https://github.com/ActiveVisionLab/gaussctrl
**Extracted:** 2026-04-18
**Method:** web_extract (GitHub/gitcode/gitee clone all failed)

## Project Info

- **Name:** GaussCtrl: Multi-View Consistent Text-Driven 3D Gaussian Splatting Editing
- **Venue:** ECCV 2024
- **License:** BSD
- **Authors:** Jing Wu*, Jia-Wang Bian*, Xinghui Li, Guangrun Wang, Ian Reid, Philip Torr, Victor Adrian Prisacariu
- **Affiliations:** University of Oxford, MBZUAI
- **Links:** [arXiv 2403.08733](https://arxiv.org/abs/2403.08733) | [Project Page](https://gaussctrl.active.vision/) | [Data](https://github.com/jingwu2121/gaussctrl/tree/main/data)

## Overview

GaussCtrl enables multi-view consistent, text-driven editing of 3D Gaussian Splatting (3DGS) models. Built on NeRFStudio, it leverages diffusion models to apply semantic edits while preserving geometric and appearance consistency across all viewpoints.

## Installation

- Recommended Stack: NeRFStudio v1.0.0 + gsplat v0.1.3
- Conda setup: install NeRFStudio + Lang-SAM, then GaussCtrl dependencies
- Docker image provided as alternative
- tiny-cuda-nn may need manual compilation

## Data Preparation

- Preprocessed datasets: fangzhou, bear, face, garden, stone horse, dinosaur
- Custom data: resize to 512x512, process via NeRFStudio Custom Dataset Guide

## Usage Workflow

1. Train base 3DGS model using NeRFStudio's splatfacto trainer
2. Run text-driven editing pipeline:
   - `--pipeline.diffusion_ckpt` — SD model checkpoint
   - `--pipeline.guidance_scale` — classifier-free guidance strength
   - `--pipeline.chunk_size` — batch size (3 on RTX A5000 24GB)
   - `--pipeline.ref_view_num` — reference views (default: 4)
   - Lang-SAM optional for mask extraction
   - chunk_size=3 consumes ~22GB VRAM on RTX A5000

## Reproducing Results

- All paper experiments in `/scripts`
- View sampling: 40 randomly sampled views (4 subsets × 10 images)
- Customize via subset-num, sampled-views-every-subset, load-all flags

## Evaluation

- Metrics: Instruct-NeRF2NeRF metrics codebase
- Visualization: NeRFStudio Viewer for interactive inspection

## Citation

```bibtex
@article{gaussctrl2024,
  author = {Wu, Jing and Bian, Jia-Wang and Li, Xinghui and Wang, Guangrun and Reid, Ian and Torr, Philip and Prisacariu, Victor},
  title = {GaussCtrl: Multi-View Consistent Text-Driven 3D Gaussian Splatting Editing},
  journal = {ECCV},
  year = {2024},
}
```
