---
title: Topo4D
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [3d, avatar, open-source, python, gaussian-splatting]
sources: [raw/articles/ai-game-devtools/topo4d.md]
---

# Topo4D — Topology-Preserving Gaussian Splatting for 4D Head Capture

**Publications:** ECCV 2024 + IEEE T-PAMI 2025 (Topo4D++)
**GitHub:** https://github.com/XuanchenLi/Topo4D
**Project Page:** https://xuanchenli.github.io/Topo4D/
**arXiv:** https://arxiv.org/pdf/2406.00440/

## Overview

Topo4D is a research project that automates high-fidelity 4D head capture from calibrated multi-view time-series images. It uses **topology-preserving 3D Gaussian splatting** where Gaussian centers are explicitly bound to mesh vertices, enabling extraction of dynamic facial meshes with regular wiring and 8K pore-level texture detail.

## Core Methodology

### Topology-Preserving Representation
- Dynamic 3D Gaussians with **fixed topology** across all frames
- Gaussian centers bound to mesh vertices — ensures temporal consistency
- Eliminates the error-prone manual alignment step of traditional 4D head capture

### Alternating Optimization
- Frame-by-frame joint optimization of geometry and texture
- Ensures high fidelity while maintaining temporal topology stability
- Two modes: geometry-only or geometry+texture optimization

### Output Quality
- Regularly wired dynamic facial meshes (suitable for animation rigs)
- **8K texture maps** with pore-level detail
- Superior mesh and texture quality vs. SOTA face reconstruction methods

## Technical Architecture

| Component | Description |
|---|---|
| `train.py` | Main training/optimization entry point |
| `camera.py` | Camera calibration & projection (Metashape XML) |
| `diff-gaussian-rasterization-w-depth/` | Custom differentiable rasterizer with depth support |
| `face3d/` | 3D face processing & topology utilities |
| `assets/facial_regions.pkl` | Predefined facial region partitions |
| `loss_util.py` | Custom geometry + texture loss functions |

## Datasets

| Dataset | Contents |
|---|---|
| Example Test Data | 24-view images, face masks, 4K keyframes, camera calibration |
| Topo4D++ JHead Benchmark | 20 identities (10 talking + 10 expression sequences) |

## Game Dev Relevance

- **NPC/character pipelines:** Generates animation-ready facial meshes with consistent topology — directly usable in game engines
- **Digital humans:** Pore-level 8K textures suitable for AAA-quality character rendering
- **Animation rigging:** Fixed topology across frames means a single rig works for all expressions
- **Complements avatar tools:** Provides the high-quality geometry/texture base that [[geneavatar]] and similar tools build upon

## Differences from Related Tools

- vs [[gaussiandreamer]]: GaussianDreamer generates 3D from text/image; Topo4D captures real faces from multi-view video with guaranteed topology
- vs [[hunyuan3d-2-1]]: Hunyuan3D generates generic 3D assets; Topo4D specializes in facial capture with temporal consistency
- vs [[dreamgaussian4d]]: DreamGaussian4D generates 4D content from text; Topo4D reconstructs real faces from multi-view capture

## Authors

Xuanchen Li, Yuhao Cheng, Xingyu Ren, Haozhe Jia, Di Xu, Wenhan Zhu, Yichao Yan (+ additional for Topo4D++)
