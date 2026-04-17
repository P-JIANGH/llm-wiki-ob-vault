# Paint-it: Text-to-Texture Synthesis via Deep Convolutional Texture Map Optimization

**Source URL:** https://github.com/postech-ami/paint-it
**Conference:** CVPR 2024
**Extracted:** 2026-04-18

## Project Overview

Paint-it is an official PyTorch implementation of the CVPR 2024 paper "Paint-it: Text-to-Texture Synthesis via Deep Convolutional Texture Map Optimization and Physically-Based Rendering" by Kim Youwang et al. from POSTECH AMILab and MPI RVH Group.

## Core Innovations

- **Text-driven PBR texture synthesis:** Generates high-quality, physically-based rendering parameter maps (diffuse, roughness, metalness, normal) from text prompts for any 3D mesh with UV coordinates.
- **Unmodified SDS pipeline:** Achieves superior results without altering Score-Distillation Sampling. Instead, optimizes variables directly through novel texture map parameterization.
- **Deep Image Prior integration:** Leverages architectural bias to robustly learn from inherently noisy SDS gradients, eliminating need for complex gradient denoising techniques.
- **Engine-ready outputs:** Complete PBR parameterization makes textures immediately usable in Blender, Unity, Unreal Engine and other graphics engines.

## System Requirements

- OS: Ubuntu 18.04+
- Python: 3.8
- CUDA/PyTorch: 11.3 / 1.12.0
- GPU: NVIDIA RTX A6000 (48GB) recommended

## Key Files & Architecture

| File | Purpose |
|------|---------|
| `paint_it.py` | Main entry point for custom .obj meshes |
| `paint_it_objaverse.py` | Batch processing for Objaverse dataset |
| `paint_it_human.py` | SMPL-based human mesh texturing |
| `dc_pbr/` | Deep Convolutional PBR optimization modules |
| `nvdiff_render/` | Differentiable rendering backend (nvdiffrast) |
| `sd.py` | Score-Distillation Sampling implementation |
| `utils.py` | Helper functions |

## Three Workflows

1. **Custom 3D Mesh:** .obj file + text prompt → PBR maps
2. **Objaverse Batch:** Bulk processing with configurable prompts per object
3. **3D Human Meshes (SMPL):** SMPL parameters (.npz) + text prompt → PBR textured human meshes

## Key Technical Details

- Input meshes must have defined UV texture coordinates (vt lines in .obj)
- Uses differentiable rendering (nvdiffrast) for gradient-based optimization
- Supports post-processing: relighting and material editing after generation
- SMPL workflow requires basicmodel_neutral_lbs_10_207_0_v1.1.0.pkl from SMPL webpage

## Contact & Citation

- Contact: Kim Youwang (youwang.kim@postech.ac.kr)
- Funding: Carl Zeiss Foundation, DFG Emmy Noether Programme, BMBF Tübingen AI Center, IITP Korea
- Collaboration: AMILab (POSTECH) & RVH Group (MPI)
