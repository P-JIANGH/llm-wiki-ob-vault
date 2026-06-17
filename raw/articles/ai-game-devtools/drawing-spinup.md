# DrawingSpinUp — Raw Source

**Source:** https://github.com/LordLiang/DrawingSpinUp
**Paper:** arXiv:2409.08615 (SIGGRAPH Asia 2024)
**Extracted:** 2026-04-19 (web extract; GitHub/gitcode/gitee clone all failed)

## Overview
DrawingSpinUp is a PyTorch implementation of a SIGGRAPH Asia 2024 paper that generates 3D animations from single character drawings. The system takes a 512×512 character drawing with its foreground mask and produces fully rigged, animated 3D character meshes.

## Pipeline (3 Stages)

### 1. Contour Removal (`1_lama_contour_remover`)
- Uses FFC-ResNet (LaMa) backbone to predict and remove contour regions from input drawings
- Training image generation adapted from Wonder3D render codes
- Pretrained weights available via SharePoint link

### 2. Textured Character Generation (`2_charactor_reconstructor`)
- Background removal using pretrained ISNet (isnet_dis.onnx)
- Generates multi-view images from the contour-removed drawing
- Fuses multi-view images into a fully textured 3D character mesh

### 3. Stylized Contour Restoration (`3_style_translator`)
- Leverages Mixamo for automatic rigging (rest_pose.fbx) and animation transfer (dab.fbx, jumping.fbx)
- Requires per-sample training; once trained, model applies to new animation frames without retraining

## Repository Structure
| Directory | Purpose |
|---|---|
| `1_lama_contour_remover` | Contour prediction & removal module |
| `2_charactor_reconstructor` | Multi-view generation & 3D mesh fusion |
| `3_style_translator` | Stylization, rigging & animation pipeline |
| `dataset` | Preprocessed character assets (120 drawings + 3D meshes) |
| `docs` / `pdf` | Documentation & paper PDF |
| `requirements.txt` | Python dependencies |

## Dataset
- 120 processed drawings & reconstructed 3D characters (preprocessed.zip)
- Subset of Facebook's Amateur Drawings Dataset (AnimatedDrawings)
- Input format: 512×512 character drawing 'texture.png' with foreground mask 'mask.png'

## Key Resources
- Project Page: lordliang.github.io/DrawingSpinUp
- Live Demo: OpenBayes
- YouTube video demo
- Hugging Face paper page

## Citation
@inproceedings{zhou2024drawingspinup,
  author = {Zhou, Jie and Xiao, Chufeng and Lam, Miu-Ling and Fu, Hongbo},
  title = {DrawingSpinUp: 3D Animation from Single Character Drawings},
  booktitle = {SIGGRAPH Asia 2024 Conference Papers},
  year = {2024},
}

## Authors
- Zhou, Jie (City University of Hong Kong)
- Xiao, Chufeng
- Lam, Miu-Ling
- Fu, Hongbo
