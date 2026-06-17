---
title: Interactive3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/interactive3d.md]
---

# Interactive3D

**Interactive3D: Create What You Want by Interactive 3D Generation**

| Property | Value |
|----------|-------|
| Author | Shaocong Dong\*, Lihe Ding\*, Zhanpeng Huang, Zibin Wang, Tianfan Xue, Dan Xu |
| Paper | CVPR 2024 (arXiv:2404.16510) |
| License | Not specified in README |
| GitHub | https://github.com/interactive-3d/interactive3d |
| Project Page | https://interactive-3d.github.io/ |
| Demo Video | https://youtu.be/ZYSOonigv3s |

## What It Is

Interactive3D is an interactive framework for iterative 3D asset generation, enabling users to progressively generate, edit, and refine 3D models through direct user input. Unlike one-shot 3D generation methods, it supports a multi-step refinement workflow where users guide the generation process interactively.

Published at CVPR 2024.

## Key Features

- **Interactive generation paradigm:** Iterative generation → edit → refine cycle with user feedback, rather than single-pass generation
- **Gradio Web UI:** Browser-based interactive interface via `gradio_app.py` for real-time control
- **Keyboard input support:** Custom `keyboard.py` module for real-time interactive controls during generation
- **Built on threestudio:** Integrates the threestudio 3D generation framework as its computational backbone
- **Configurable pipeline:** YAML configs under `configs/` for model and pipeline customization

## Technical Architecture

| Module | Purpose |
|--------|---------|
| `gsgen/` | Core 3D generation module — implements the generative pipeline |
| `threestudio/` | Integrated 3D generation framework (dependency/submodule) |
| `gradio_app.py` | Gradio-based web interactive UI |
| `launch.py` | Main execution entry point |
| `keyboard.py` | Real-time keyboard input handling |
| `configs/` | Model & pipeline configuration (YAML) |
| `docker/` | Docker environment setup |

## Setup

- Depends on threestudio framework for installation and environment
- tmux users need `export TERMINFO=/usr/share/terminfo` for keyboard input
- Docker support provided for environment isolation

## Comparison with Related Tools

- **vs [[hunyuan3d-1]]:** Hunyuan3D is a one-shot text/image-to-3D pipeline (10-25s), while Interactive3D focuses on iterative user-guided generation with real-time editing
- **vs [[syncdreamer]]:** SyncDreamer generates multiview images for 3D reconstruction (one-shot), while Interactive3D provides a continuous interactive loop for progressive refinement
- **vs [[dreamgaussian4d]]:** DreamGaussian4D extends 3D to 4D (dynamic scenes); Interactive3D stays in 3D but adds the human-in-the-loop editing capability

## Source References

- arXiv preprint: https://arxiv.org/abs/2404.16510
- Project page: https://interactive-3d.github.io/
- YouTube demo: https://youtu.be/ZYSOonigv3s
