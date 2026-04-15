# VideoMamba — Source Summary

**URL:** https://github.com/OpenGVLab/VideoMamba
**Cloned:** 2026-04-15
**License:** Apache 2.0

## Overview

VideoMamba adapts the Mamba State Space Model (SSM) to video understanding, solving the dual challenges of local redundancy and global dependencies in video. Published March 2024 by OpenGVLab (Shanghai AI Lab).

## Architecture

- **Core:** Mamba SSM (Selective State Space Model) — linear-complexity sequence modeling
- **Key innovation:** 3D convolution replacement with selective SSM operators for efficient long-video modeling
- **Building blocks:**
  - `mamba/` — Mamba SSM implementation (`mamba_ssm` module)
  - `causal-conv1d/` — Causal 1D convolution (Mamba dependency)
  - `videomamba/image_sm/` — Image classification (ImageNet-1K)
  - `videomamba/video_sm/` — Single-modality video tasks (K400, SthSthV2, Breakfast, COIN, LVU)
  - `videomamba/video_mm/` — Multi-modality video-text tasks (Video-Text retrieval)

## Key Capabilities

1. **Scalable** — no extensive dataset pretraining needed; novel self-distillation technique
2. **Short-term sensitive** — fine-grained motion differences in actions
3. **Long-term superior** — linear complexity enables high-res long video understanding
4. **Multi-modal compatible** — robust in video-text retrieval

## Dependencies

apex, av, decord, deepspeed, einops, ftfy, fvcore, imageio, lm_eval, numpy, omegaconf, opencv_python, pandas, Pillow, pytest, PyYAML, regex, Requests, scipy, submitit, tensorboardX, tensorflow, termcolor, timm, tqdm, transformers, wandb, xformers

## Related Projects

Built on: UniFormer, Unmasked Teacher, Vim

## Paper

arXiv:2403.06977 — "VideoMamba: State Space Model for Efficient Video Understanding"
Authors: Kunchang Li, Xinhao Li, Yi Wang, Yinan He, Yali Wang, Limin Wang, Yu Qiao
