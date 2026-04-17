# GaussianCube: A Structured and Explicit Radiance Representation for 3D Generative Modeling

**Source:** https://github.com/GaussianCube/GaussianCube
**Paper:** https://arxiv.org/abs/2403.19655
**Project Page:** https://gaussiancube.github.io/
**Conference:** NeurIPS 2024

## Authors
Bowen Zhang, Yiji Cheng, Jiaolong Yang, Chunyu Wang, Feng Zhao, Yansong Tang, Dong Chen, Baining Guo (Microsoft Research / USTC)

## Abstract
Introduces a radiance representation that is both structured and fully explicit, greatly facilitating 3D generative modeling. Existing radiance representations either require an implicit feature decoder (degrading modeling power) or are spatially unstructured (difficult to integrate with mainstream 3D diffusion methods).

GaussianCube is derived by:
1. A novel densification-constrained Gaussian fitting algorithm — yields high-accuracy fitting using a fixed number of free Gaussians
2. Rearranging these Gaussians into a predefined voxel grid via Optimal Transport

Since GaussianCube is a structured grid representation, it allows using standard 3D U-Net as the backbone in diffusion modeling without elaborate designs. The high-accuracy fitting achieves comparable quality with orders of magnitude fewer parameters than previous structured representations (1-2 orders of magnitude reduction).

## Applications
- Unconditional and class-conditioned object generation
- Digital avatar creation (image-conditioned)
- Text-to-3D synthesis

## Architecture

### Core Modules
| Module | File | Description |
|--------|------|-------------|
| 3D U-Net | `model/unet.py` | 705-line 3D U-Net with timestep embeddings, attention blocks, upsampling/downsampling (1D/2D/3D), xformers support |
| Gaussian Diffusion | `model/gaussian_diffusion.py` | 948-line diffusion process: linear/cosine/sigmoid beta schedules, DDIM sampling, CLIP/DINO feature conditioning |
| DPM-Solver | `model/dpmsolver.py` | Fast ODE solver for diffusion sampling |
| Losses | `model/losses.py` | Normal KL divergence, discretized gaussian log-likelihood |
| Inference | `inference.py` | Text/Class/Unconditional generation, auto-download from HuggingFace |
| Training | `train.py` | Diffusion training with rendering losses (L1 + LPIPS) |
| Main Entry | `main.py` | MPI distributed training orchestration |

### Configurations
| Config | Task |
|--------|------|
| `configs/shapenet_uncond.yml` | Unconditional generation (ShapeNet Car/Chair) |
| `configs/omni_class_cond.yml` | Class-conditioned generation (OmniObject3D) |
| `configs/objaverse_text_cond.yml` | Text-conditioned generation (Objaverse) |
| `configs/avatar_img_cond.yml` | Image-conditioned avatar generation |

### Training Pipeline
1. Data construction via separate repo (GaussianCube_Construction)
2. Pre-compute mean/std statistics for volume activations
3. MPI distributed training (8 GPUs) with rendering losses (L1 + LPIPS)
4. FP16 mixed precision support
5. Text conditioning via CLIP features; Image conditioning via DINO features

### Inference Pipeline
- Auto-download model checkpoints from HuggingFace
- Support for text-conditioned (Objaverse), class-conditioned (OmniObject3D), and unconditional (ShapeNet) generation
- Mesh conversion via LGM approach (nerfacc + nvdiffrast)

## Environment
- Python 3.8, PyTorch 1.12.1, CUDA 11.6
- Dependencies: mpi4py, omegaconf, plyfile, opencv-python, huggingface_hub
- Custom: diff-gaussian-rasterization (from graphdeco-inria)

## Models Available (HuggingFace)
| Model | Task |
|-------|------|
| Objaverse v1.0 | Text-conditioned Generation (paper version) |
| Objaverse v1.1 | Text-conditioned (improved, 170k 3D assets, GPT-4o captions) |
| OmniObject3D | Class-conditioned Generation |
| ShapeNet Car | Unconditional Generation |
| ShapeNet Chair | Unconditional Generation |

## License
Not explicitly stated in README. Code built upon openai/improved-diffusion.

## Key Files Summary
- `model/unet.py` (705 lines) — 3D U-Net backbone
- `model/gaussian_diffusion.py` (948 lines) — Diffusion process
- `train.py` (19521 bytes) — Training loop
- `inference.py` (10076 bytes) — Inference with HuggingFace auto-download
- `main.py` (6034 bytes) — Entry point
- `gaussian_renderer/` — Gaussian splatting renderer
- `utils/lpips/` — LPIPS perceptual loss
- `data_construction/` — Data preparation scripts
