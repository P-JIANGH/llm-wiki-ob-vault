# NeuralSound & DeepModal: Official Implementation

**Source:** https://github.com/hellojxt/NeuralSound
**arXiv:** https://arxiv.org/abs/2108.07425
**Project Page:** https://hellojxt.github.io/NeuralSound/
**Published:** ACM Transactions on Graphics (SIGGRAPH 2022)
**Authors:** Xutong Jin, Sheng Li, Guoping Wang, Dinesh Manocha (Peking University + University of Maryland)

## Project Overview

Official implementation of **NeuralSound**, a learning-based modal sound synthesis framework, and **DeepModal**, a faster but less accurate alternative.

Key innovations:
- **Mixed vibration solver** for modal analysis: 3D sparse convolution network + LOBPCG module for iterative optimization
- **Radiation network** for acoustic transfer: predicts Far-Field Acoustic Transfer (FFAT) maps from surface vibration
- Overall running time < 1 second for new objects on RTX 3080 Ti GPU
- Sound quality close to ground truth solved by standard numerical methods

## Environment

- Tested: Ubuntu 20.04, Python 3.7, CUDA 11.1
- Setup script available in `environment.md`
- Uses PyTorch Scatter for graph convolution implementation (`spmm_conv` in `src/classic/fem/project_util.py`)

## Dataset

- Source: ABC Dataset (`.obj` meshes in `dataset/mesh/`)
- Generated data types: voxel models, eigenvectors/eigenvalues, vibration solver dataset, radiation solver dataset, DeepModal dataset

## Training Pipelines

1. **Vibration Solver** — logs: `vibration/runs/`, weights: `vibration/weights/`
2. **Radiation Solver** — logs: `acoustic/runs/`, weights: `acoustic/weights/`, FFAT map visualizations in `acoustic/images/`
3. **DeepModal** — logs: `deepmodal/runs/`, weights: `deepmodal/weights/`
   - Uses Sparse-Convolutional Neural Network (SCNN) rather than CNN from original paper
   - Faster than mixed vibration solver but with larger error

## Technical Insights

- Vibration solver matrix multiplication implemented via graph neural network approach (consistency of convolution with matrix multiplication)
- Radiation network (`src/net/acousticnet.py`) is more compact than paper architecture with similar performance
- Blender scripts in `blender/` directory for generating videos with modal sound

## Repository Structure (inferred)

```
src/
├── classic/fem/project_util.py    # spmm_conv graph convolution
├── net/acousticnet.py             # radiation network architecture
vibration/                          # vibration solver training
acoustic/                           # radiation solver training
deepmodal/                          # DeepModal training
blender/                            # video generation scripts
dataset/                            # ABC dataset + generated data
```
