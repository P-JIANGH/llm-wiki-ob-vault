# CatVTON — Virtual Try-On Diffusion Model

**Source:** https://github.com/Zheng-Chong/CatVTON
**Paper:** https://arxiv.org/abs/2407.15886
**License:** CC BY-NC-SA 4.0
**Publication:** ICLR 2025

## Overview

CatVTON is a simple and efficient virtual try-on diffusion model with three key advantages:
1. Lightweight Network — 899.06M parameters total
2. Parameter-Efficient Training — only 49.57M trainable parameters
3. Simplified Inference — < 8GB VRAM for 1024×768 resolution

## Core Specifications

| Feature | Detail |
|:---|:---|
| **Total Parameters** | 899.06M |
| **Trainable Parameters** | 49.57M (Parameter-Efficient) |
| **Inference VRAM** | < 8GB for 1024×768 resolution |
| **Base Architecture** | Stable Diffusion v1.5 Inpainting (via Diffusers) |
| **License** | CC BY-NC-SA 4.0 |

## Key Milestones

- **2025/02/24**: CatV2TON announced (DiT-based, supports image & video try-on)
- **2025/01/24**: Accepted to ICLR 2025
- **2024/12/19**: CatVTON-FLUX released (37.4M LoRA for FLUX.1-Fill-dev)
- **2024/10/17**: Mask-free version released
- **2024/07/27**: ComfyUI workflow & evaluation code released
- **2024/07/21**: Inference code & official weights released

## Architecture

- Base: Stable Diffusion v1.5 Inpainting model via HuggingFace Diffusers
- Parameter-efficient training: only ~5.5% of parameters are trainable
- Concatenation-based fusion: person image + garment image directly concatenated as input

## Supported Datasets

- **VITON-HD:** High-definition virtual try-on dataset
- **DressCode:** Fashion dataset with agnostic mask preprocessing

## Deployment Options

### ComfyUI Workflow
- Custom node package available as zip release
- Drag-and-drop workflow JSON
- First run auto-downloads weights (~dozens of minutes)

### Gradio App
- Supports bf16 mixed precision for 1024×768 on ~8GB VRAM
- CUDA_VISIBLE_DEVICES=0 python app.py --mixed_precision=bf16

### Inference Pipeline
- inference.py supports dresscode/vitonhd datasets
- eval.py calculates paired/unpaired metrics (FID, etc.)
- Batch processing with configurable workers

## Mask Generation Tools
- SCHP (Self-Correction Human Parsing)
- DensePose (Facebook Research)
- Both localized within project to prevent environment conflicts

## Language Composition
- Python 90.5%
- JavaScript 3.3%
- CUDA 3.3%
- C++ 2.3%

## Repository Stats
- 1.6k Stars, 208 Forks
- Latest Release: v1.0.0-ComfyUI

## Citation
```bibtex
@misc{chong2024catvtonconcatenationneedvirtual,
  title={CatVTON: Concatenation Is All You Need for Virtual Try-On with Diffusion Models},
  author={Zheng Chong and Xiao Dong and Haoxiang Li and Shiyue Zhang and Wenqing Zhang and Xujie Zhang and Hanqing Zhao and Xiaodan Liang},
  year={2024},
  eprint={2407.15886},
  archivePrefix={arXiv},
  primaryClass={cs.CV},
  url={https://arxiv.org/abs/2407.15886}
}
```
