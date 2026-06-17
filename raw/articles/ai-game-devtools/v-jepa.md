# V-JEPA: Video Joint Embedding Predictive Architecture

Source: https://github.com/facebookresearch/jepa
Organization: Meta AI Research (FAIR)
Authors: Adrien Bardes, Quentin Garrido, Jean Ponce, Xinlei Chen, Michael Rabbat, Yann LeCun, Mahmoud Assran, Nicolas Ballas
License: CC BY-NC 4.0 (Attribution-NonCommercial 4.0 International)

## Overview

V-JEPA is an official PyTorch implementation of the Video Joint Embedding Predictive Architecture, a self-supervised learning method for visual representations from video. V-JEPA models are trained by passively watching video pixels from the VideoMix2M dataset, producing versatile visual representations that perform well on downstream video and image tasks without parameter adaptation — using a frozen backbone and only a lightweight task-specific attentive probe.

## Method

- **Core idea**: Unsupervised feature prediction objective — predicts missing video regions in latent space
- **NO pretrained image encoders, text, negative examples, human annotations, or pixel-level reconstruction**
- Uses a mask-based approach: encoder processes visible patches, predictor forecasts masked patches in representation space
- Feature predictions are spatio-temporally consistent with unmasked regions

## Architecture

### VisionTransformer (Encoder)
- ViT-Tiny (192 dim, 12 layers, 3 heads) through ViT-Gigantic (1664 dim, 48 layers, 16 heads)
- Supports both 2D (image) and 3D (video) via PatchEmbed/PatchEmbed3D
- Tubelet size of 2 for temporal patching
- Sincos positional embeddings (2D/3D) with interpolation support
- Masked token processing during pretraining

### VisionTransformerPredictor
- Maps context tokens to lower-dimensional predictor space (e.g., 1024→384 for ViT-L)
- 6-12 transformer blocks for prediction
- Uses forward diffusion noise on target tokens or dedicated mask tokens
- Projects back to encoder embedding dimension for loss computation

### Mask Strategy
- Two-level masking: 8 small blocks (15% spatial scale) + 2 large blocks (70% spatial scale)
- Temporal scale: 1.0 (full temporal coverage)
- Multi-block 3D masking with aspect ratio variation

## Pretrained Models (Model Zoo)

| Model | Patch Size | Resolution | Iterations | Batch | Data |
|-------|-----------|------------|-----------|-------|------|
| ViT-L | 2×16×16 | 224×224 | 90K | 3072 | VideoMix2M |
| ViT-H | 2×16×16 | 224×224 | 90K | 3072 | VideoMix2M |
| ViT-H | 2×16×16 | 384×384 | 90K | 2400 | VideoMix2M |

## Downstream Performance (Frozen Backbone + Attentive Probe)

### K400 Video Classification (16×8×3)
- ViT-L/16 @ 224: 80.8%
- ViT-H/16 @ 224: 82.0%
- ViT-H/16 @ 384: 81.9%

### SSv2 (16×2×3)
- ViT-L/16 @ 224: 69.5%
- ViT-H/16 @ 224: 71.4%
- ViT-H/16 @ 384: 72.2%

### ImageNet-1K Image Classification
- ViT-L/16 @ 224: 74.8%
- ViT-H/16 @ 224: 75.9%
- ViT-H/16 @ 384: 77.4%

## Code Structure

```
app/                    # Training loops
├── vjepa/              #   Video JEPA pre-training
├── main_distributed.py #   Slurm cluster entrypoint
└── main.py             #   Local multi-GPU entrypoint

evals/                  # Evaluation scripts
├── image_classification/ # Frozen backbone image classification
├── video_classification/ # Frozen backbone video classification
├── main_distributed.py
└── main.py

src/                    # Core package
├── datasets/           #   Data loaders
├── models/             #   VisionTransformer, Predictor, AttentivePooler
├── masks/              #   Mask collators (random tube, multi-block 3D)
└── utils/              #   Distributed training, logging, schedulers

configs/                # YAML config files
├── evals/              #   Evaluation configs
└── pretrain/           #   Pretraining configs
```

## Dependencies

torch>=2, torchvision, pyyaml, numpy, opencv-python, submitit, braceexpand, webdataset, timm, decord, pandas, einops, beartype

## Training Setup

- Distributed training via submitit on Slurm clusters
- 16 nodes × 8 GPUs = 128 GPUs for ViT-L pretraining
- Batch size: 24 per GPU, total 3072
- 300 epochs, 90K iterations
- Learning rate: 0.000625 with warmup (40 epochs)
- bfloat16 precision, SDPA attention
- EMA: [0.998, 1.0]

## Key Innovations

1. **Joint Embedding Predictive Architecture**: Instead of reconstructing pixels, predicts representations of masked regions
2. **No negative samples**: Pure predictive learning without contrastive objectives
3. **Zero-shot transfer**: Frozen backbone works across image/video tasks with only a lightweight probe
4. **Feature-space visualization**: Trained conditional diffusion decoder to visualize latent predictions as interpretable pixels
