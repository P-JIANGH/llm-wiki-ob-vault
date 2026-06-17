# Animate-X: Universal Character Image Animation (ICLR 2025)

**Source:** https://github.com/Lucaria-Academy/Animate-X
**Paper:** https://arxiv.org/abs/2410.10306
**Project Page:** https://lucaria-academy.github.io/Animate-X/
**HuggingFace:** https://huggingface.co/Shuaishuai0219/Animate-X
**Official Code:** https://github.com/antgroup/animate-x

## Overview

Animate-X is a universal animation framework based on latent diffusion models for various character types (collectively named X), including anthropomorphic characters. Published at ICLR 2025.

Authors: Shuai Tan, Biao Gong†, Xiang Wang, Shiwei Zhang, Dandan Zheng, Ruobing Zheng, Kecheng Zheng, Jingdong Chen, Ming Yang

Affiliation: Ant Group | Tongyi Lab

## Core Innovation

Universal applicability to multiple character categories ("X") with improved motion fidelity and consistency. The framework animates static character images across diverse styles/types using enhanced motion representation and latent diffusion.

## Repository Structure

| Path | Purpose |
|---|---|
| `animatex/` | Core model architecture & implementation |
| `configs/` | Training & inference configuration files |
| `data/` | Dataset handling & preprocessing pipelines |
| `dwpose/` | Pose estimation utilities (motion guidance) |
| `utils/` | Helper functions & shared utilities |
| `inference.py` | Main script for generating animations |
| `process_data.py` | Data preparation & formatting script |

## Technical Details

- Framework: PyTorch
- Architecture: Latent Diffusion Models with enhanced motion representation
- Motion guidance: DWPose for pose estimation
- Environment: `conda env create -f environment.yaml` or `pip install -r requirements.txt`

## Important Notes

- The repository redirects inference code to https://github.com/antgroup/animate-x for the latest implementation
- Model weights available on HuggingFace
- Citation required for academic use
- License sections currently unpopulated in this snapshot
