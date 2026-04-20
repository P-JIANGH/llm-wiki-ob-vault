---
title: NeuralSound
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, audio, open-source, tool]
sources: [raw/articles/ai-game-devtools/neural-sound.md]
---

# NeuralSound

**Learning-based modal sound synthesis with acoustic transfer (SIGGRAPH 2022)**

## Overview

NeuralSound is a learning-based modal sound synthesis framework developed by Peking University and University of Maryland. It replaces traditional numerical solvers with neural networks to generate physically accurate sounds for 3D objects in under one second, while maintaining quality close to ground truth.

The system consists of two core components: a **mixed vibration solver** for modal analysis and a **radiation network** for acoustic transfer prediction.

## Key Facts

| Aspect | Detail |
|--------|--------|
| **Authors** | Xutong Jin, Sheng Li, Guoping Wang, Dinesh Manocha |
| **Institutions** | Peking University + University of Maryland |
| **Publication** | ACM Transactions on Graphics (SIGGRAPH 2022) |
| **Architecture** | 3D sparse convolution network + LOBPCG iterative optimization + radiation network |
| **Performance** | < 1 second for new objects on RTX 3080 Ti GPU |
| **Dataset** | ABC Dataset (.obj meshes) |
| **Environment** | Ubuntu 20.04, Python 3.7, CUDA 11.1, PyTorch Scatter |
| **License** | Not specified (academic) |

## Technical Architecture

### Vibration Solver
- Matrix multiplication implemented via graph neural network approach (convolution consistency with matrix multiplication)
- Uses PyTorch Scatter for graph convolution (`spmm_conv` in `src/classic/fem/project_util.py`)
- 3D sparse convolution network + Locally Optimal Block Preconditioned Conjugate Gradient (LOBPCG) for iterative optimization

### Radiation Network
- Predicts Far-Field Acoustic Transfer (FFAT) maps from object surface vibration
- Architecture defined in `src/net/acousticnet.py` — more compact than paper design with similar performance
- Generates FFAT map visualizations (ground truth vs prediction)

### DeepModal (Alternative)
- Faster than mixed vibration solver but with larger error
- Uses Sparse-Convolutional Neural Network (SCNN) instead of CNN from original paper
- Three training pipelines: vibration solver → radiation solver → DeepModal

## Usage in AI Game Development

NeuralSound enables game developers to:
- **Procedural physics-based sound**: Generate realistic impact/resonance sounds for arbitrary 3D objects without manual recording
- **Real-time sound synthesis**: < 1s inference time enables on-the-fly sound generation for dynamic game scenes
- **Object-specific audio**: Each 3D mesh gets its own acoustic signature based on material properties and geometry
- **Blender integration**: Scripts in `blender/` directory for generating modal sound videos for game asset pipelines

## Related Projects

- [[ai-game-devtools/amphion]] — OpenMMLab audio/music/speech toolkit covering TTS/VC/SVC
- [[ai-game-devtools/audioldm-2]] — AudioLDM 2 general audio generation via latent diffusion
- [[ai-game-devtools/mmaudio]] — Video-to-audio synchronized generation (ECCV 2025)
