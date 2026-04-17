# Neuralangelo — Raw Source Analysis

**Source URL:** https://github.com/NVlabs/neuralangelo
**Capture Date:** 2026-04-18
**Category:** Texture (3D Asset Generation)

## Project Overview

Neuralangelo is an official implementation of **"Neuralangelo: High-Fidelity Neural Surface Reconstruction"** from NVIDIA. Published at CVPR 2023 by Zhaoshuo Li, Thomas Müller, Alex Evans, Russell H. Taylor, Mathias Unberath, Ming-Yu Liu, and Chen-Hsuan Lin.

The code is built upon the **Imaginaire** library from NVIDIA's Deep Imagination Research Group.

## Key Capabilities

1. **High-Fidelity Neural Surface Reconstruction** — Reconstructs detailed 3D surfaces from video/image sequences using neural SDF (Signed Distance Field) representation
2. **Isosurface Mesh Extraction** — Extracts textured 3D meshes with configurable resolution (default 2048) and block size (128)
3. **Multi-GPU Training** — Supports distributed training with torchrun
4. **COLMAP Integration** — Full pipeline from video frames → COLMAP SfM → JSON config (same format as Instant NGP)
5. **Weigths & Biases Logging** — Optional W&B integration for experiment tracking
6. **Background Modeling** — Optional background NeRF for unbounded scenes

## Technical Architecture

### Core Model Components

- **NeuralSDF**: SDF network with hashgrid encoding
  - MLP: 1 layer, 256 hidden dim, softplus activation (beta=100)
  - Hashgrid: 16 levels, min_logres=5, max_logres=11, dict_size=22, dim=8
  - Coarse-to-fine training (init_active_level=4, step=5000)
  - Geometric initialization with weight normalization
  - Numerical gradient computation (4 taps)

- **NeuralRGB**: RGB network for surface appearance
  - MLP: 4 layers, 256 hidden dim, ReLU activation
  - IDR (Implicit Differentiable Renderer) mode
  - Spherical harmonic view encoding (3 levels)

- **BackgroundNeRF**: Optional background model
  - 8-layer MLP (256 dim) + 2-layer RGB MLP (128 dim)
  - Fourier position encoding (10 levels)
  - View-dependent rendering

### Training Pipeline

1. **Data Preparation**: Video → frame extraction (ffmpeg) → COLMAP SfM → transforms.json
2. **Config Generation**: Auto-generate YAML config based on scene type (outdoor/indoor/object)
3. **Training**: torchrun with AdamW (lr=1e-3, weight_decay=1e-2), two_steps_with_warmup scheduler
4. **Loss Function**: render (1.0) + eikonal (0.1) + curvature (5e-4)
5. **Mesh Extraction**: Multi-block isosurface extraction with optional texturing

### Dependencies

- **Core**: PyTorch, tiny-cuda-nn (NVIDIA hash encoding)
- **Data Processing**: COLMAP, OpenCV, Open3D, trimesh
- **Visualization**: K3D, matplotlib, plotly, wandb
- **Mesh Processing**: PyMCubes, trimesh, OpenEXR

### GPU Memory Requirements

| VRAM | Configuration |
|------|--------------|
| 24GB+ | Default settings |
| 16GB | dict_size=21, dim=8 |
| 12GB | dict_size=21, dim=4 |
| 8GB | dict_size=20, dim=4 |

## Supported Datasets

- **NeRF Synthetic** (Blender objects: lego, etc.)
- **DTU Dataset** (preprocessed by NeuS authors)
- **Tanks and Temples** (with COLMAP/camera/alignment data)
- **Custom Video** (self-captured sequences)

## Project Structure

```
neuralangelo/
├── projects/
│   ├── neuralangelo/       # Main Neuralangelo implementation
│   │   ├── model.py        # Model class (build_model, forward, inference)
│   │   ├── trainer.py      # Training loop with eikonal/curvature loss
│   │   ├── configs/        # YAML configs (base.yaml, dtu.yaml, tnt.yaml, custom/)
│   │   ├── utils/          # MLP, mesh extraction, spherical harmonics
│   │   ├── data.py         # Data loading utilities
│   │   └── scripts/        # COLMAP, preprocessing, mesh extraction, visualization
│   └── nerf/               # Shared NeRF utilities (rendering, datasets, models)
├── imaginaire/             # NVIDIA Imaginaire base library
├── train.py                # Main training entry point
├── docker/                 # Dockerfiles for COLMAP and Neuralangelo
├── requirements.txt        # Python dependencies
└── DATA_PROCESSING.md      # Detailed data preparation guide
```

## License

NVIDIA proprietary license. Commercial use requires submitting the NVIDIA research licensing form.

## Relevance to Game Development

- **3D Asset Creation**: Generate high-fidelity 3D meshes from real-world objects
- **Environment Scanning**: Reconstruct game environments from video footage
- **Prototyping**: Rapid 3D model generation for level design
- **Texture Generation**: Extract textured meshes with PBR-ready outputs
