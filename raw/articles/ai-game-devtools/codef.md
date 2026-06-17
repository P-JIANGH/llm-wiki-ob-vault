# CoDeF: Content Deformation Fields for Temporally Consistent Video Processing

**Source:** https://github.com/ant-research/CoDeF (original: https://github.com/qiuyu96/codef)
**Paper:** https://arxiv.org/abs/2308.07926
**CVPR 2024 Highlight**

## Overview

CoDeF presents a content deformation field as a new type of video representation, consisting of:
1. **Canonical content field** — aggregates static contents across the entire video
2. **Temporal deformation field** — records transformations from the canonical image to each individual frame along the time axis

These two fields are jointly optimized to reconstruct the video through a tailored rendering pipeline. Regularizations are introduced during optimization, urging the canonical content field to inherit semantics (e.g., object shape) from the video.

## Key Capabilities

- **Lift image algorithms to videos** — apply an image algorithm to the canonical image and propagate outcomes to the entire video via the temporal deformation field
- **Image-to-image translation → video-to-video translation** — zero training required
- **Keypoint detection → keypoint tracking** — zero training required
- **Superior cross-frame consistency** in translated videos vs existing video-to-video translation approaches
- **Track non-rigid objects** like water and smog

## Architecture

### Core Modules

| Module | Description |
|--------|-------------|
| `ImplicitVideo` | MLP (8 layers, 256 wide) encoding the canonical content field — outputs RGB from 2D spatial coordinates |
| `TranslationField` | MLP (6 layers, 128 wide) encoding temporal deformation — outputs 2D warping offsets |
| `ImplicitVideo_Hash` | TCNN-based variant using Hash Encoding for faster convergence |
| `Deform_Hash3d` | TCNN 3D hash encoding for deformation field |
| `Embedding` / `AnnealedEmbedding` | Positional encoding with optional annealing schedule |

### Key Design Patterns

- **NeRF-inspired implicit representation** — canonical content as implicit neural field (similar to NeRF's radiance field)
- **MLP with skip connections** — standard NeRF-style architecture (skip at layer 4)
- **Hash encoding (tiny-cuda-nn)** — optional TCNN integration for faster training
- **Annealed positional encoding** — gradually activates frequency bands during training
- **Optical flow regularization** — optional RAFT flow loss for deformation smoothness
- **Mask-guided deformation** — SAM-Track segmentation masks for object-level deformation fields

### Training Pipeline

1. **Data preprocessing**: SAM-Track segmentation → RAFT optical flow extraction
2. **Joint optimization**: Canonical field + deformation field co-trained for 10K steps
3. **Regularization**: Gradient loss (Sobel-based), optical flow loss, background consistency loss
4. **Video translation**: Apply ControlNet to canonical image → propagate via deformation field

## Technical Specs

- **Framework**: PyTorch 2.0.0 + PyTorch Lightning 2.0.2
- **GPU**: 10GB+ VRAM (tested on RTX A6000, CUDA 11.7)
- **Dependencies**: tiny-cuda-nn, einops, kornia, torch_optimizer, scikit-image
- **License**: Not specified in repository (research code)

## Data Requirements

- Input: Video sequences organized as `all_sequences/{NAME}/{NAME}_frames/`
- Optional: SAM-Track masks (`{NAME}_masks_0/`), RAFT optical flow (`{NAME}_flow/`)
- Pretrained checkpoints available for: beauty_0, beauty_1, white_smoke, lemon_hit, scene_0

## Key Files

| File | Purpose |
|------|---------|
| `opt.py` | Argument parsing + YAML config loading (177 lines) |
| `models/implicit_model.py` | Core neural modules: ImplicitVideo, TranslationField, Hash variants (347 lines) |
| `losses.py` | MSELoss + gradient loss (Sobel-based) (51 lines) |
| `datasets/video_dataset.py` | Video frame + mask + flow data loading |
| `scripts/train_multi.sh` | Multi-GPU training entry point |
| `scripts/test_multi.sh` | Reconstruction testing |
| `scripts/test_canonical.sh` | Video translation (propagate edited canonical image) |
| `configs/*/base.yaml` | Per-sequence hyperparameter configs |

## Links

- Project Page: https://qiuyu96.github.io/CoDeF/
- High-Res Translation Demo: https://ezioby.github.io/CoDeF_Demo/
- Colab Demo: https://colab.research.google.com/github/camenduru/CoDeF-colab/blob/main/CoDeF_colab.ipynb
- Authors: Hao Ouyang, Qiuyu Wang, Yuxi Xiao et al. (Ant Group / HKUST / Zhejiang University)
