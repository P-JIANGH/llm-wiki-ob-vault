# LION: Latent Point Diffusion Models for 3D Shape Generation

**Source:** https://github.com/nv-tlabs/LION
**Cloned from:** gitcode.com/nv-tlabs/LION (GitHub timeout fallback)
**Date:** 2026-04-18

## Overview
LION is a latent diffusion model for 3D point cloud generation, published at NeurIPS 2022 by NVIDIA T-Labs (University of Toronto). It generates high-quality 3D shapes by combining a hierarchical VAE with diffusion models in a two-stage pipeline.

## Key Information
- **Authors:** Xiaohui Zeng, Arash Vahdat, Francis Williams, Zan Gojcic, Or Litany, Sanja Fidler, Karsten Kreis
- **Institution:** NVIDIA T-Labs / University of Toronto
- **Publication:** NeurIPS 2022
- **Paper:** https://arxiv.org/abs/2210.06978
- **Project Page:** https://nv-tlabs.github.io/LION
- **License:** NVIDIA proprietary (NVIDIA CORPORATION & AFFILIATES copyright — strict license, not open-source)
- **HuggingFace:** https://huggingface.co/xiaohui2022/lion_ckpt

## Architecture
### Two-Stage Pipeline
1. **VAE (Variational Autoencoder):** Encodes 3D point clouds into hierarchical latent representations
   - Global latent (coarse shape): captures overall shape structure
   - Local latent (fine detail): captures local geometry details
   - Uses AdaIN (Adaptive Instance Normalization) for conditioning
   - Built on PVCNN2 backbone (Point-Voxel CNN)

2. **Diffusion Prior:** Two-level diffusion models operating on the VAE latents
   - Global prior: diffusion model on global latent (shape-level)
   - Local prior: diffusion model on local latent (detail-level)
   - Hierarchical conditioning: global latent conditions the local prior
   - Uses HuggingFace `diffusers` DDPMScheduler

### Conditioning
- **Unconditional:** generates random 3D shapes
- **Text-conditioned (text2shape):** uses CLIP text embeddings as conditioning via AdaGN layer
- **Image-conditioned:** can use rendered image CLIP features for single-view reconstruction

## Technical Details
- **Framework:** PyTorch 1.10.2
- **Diffusion:** `diffusers` 0.11.1 (DDPM)
- **Chamfer Distance:** custom CUDA implementation (ChamferDistancePytorch)
- **Earth Mover's Distance:** custom CUDA implementation (PyTorchEMD)
- **Rendering:** Mitsuba 3 for visualization
- **Monitoring:** comet-ml (primary), wandb, tensorboard (optional)
- **Training:** Multi-GPU (4× A100 for VAE, 8× V100 for prior)

## Dataset
- ShapeNet (PC15k point cloud format from PointFlow)
- Categories: airplane, car, chair (released checkpoints)
- Test data: ShapeNet-Vol, PointFlow test splits

## Key Files
- `models/lion.py` — Main LION class: orchestrates VAE + global/local diffusion priors
- `models/vae_adain.py` — VAE with AdaIN conditioning
- `models/latent_points_ada_localprior.py` — Local diffusion prior (PVCNN2-based)
- `models/shapelatent_modules.py` — Shape latent modules
- `utils/diffusion.py` — Diffusion utilities
- `utils/diffusion_pvd.py` — Discretized diffusion implementation
- `third_party/ChamferDistancePytorch/` — Chamfer distance loss (CUDA)
- `third_party/PyTorchEMD/` — Earth Mover's Distance loss (CUDA)
- `third_party/pvcnn/` — PVCNN backbone
- `demo.py` — Text-to-shape demo with CLIP conditioning
- `config/*.yml` — Configuration files per category

## Comparison to Related Work
- Uses diffusion in latent space (like Stable Diffusion for images, but for 3D point clouds)
- Two-level hierarchy: global shape + local details (more structured than single-level diffusion)
- Point cloud representation (unlike NeRF/mesh-based methods)
- PVCNN backbone for efficient point processing
- Similar to GaussianDreamer but point-cloud based instead of Gaussian splatting

## Game Dev Relevance
- Procedural 3D asset generation (chairs, vehicles, etc.)
- Text-to-3D for game prototyping
- Point cloud data can be converted to meshes for game engines
- NVIDIA technology — potential for integration with Omniverse/GameWorks
