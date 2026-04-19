---
title: DrawingSpinUp
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [3d, animation, image-generation, open-source, ai-model, tool]
sources: [raw/articles/ai-game-devtools/drawing-spinup.md]
---

# DrawingSpinUp

## Overview
DrawingSpinUp is a PyTorch implementation of a SIGGRAPH Asia 2024 paper that converts a **single 2D character drawing** into a **fully rigged, animated 3D character mesh**. The system automates the entire pipeline from contour removal through 3D reconstruction to stylized animation transfer.

**Paper:** [arXiv:2409.08615](https://arxiv.org/abs/2409.08615) | **SIGGRAPH Asia 2024**

## Architecture: 3-Stage Pipeline

| Stage | Module | Technology | Function |
|---|---|---|---|
| 1 | Contour Removal | LaMa (FFC-ResNet) | Predict and remove line-art contours from input drawing |
| 2 | Character Reconstruction | ISNet + multi-view fusion | Generate multi-view images → textured 3D mesh |
| 3 | Style Translation | Mixamo rigging + per-sample training | Automatic rigging, animation transfer, contour restoration |

## Key Features
- **Single-image input:** Only needs a 512×512 character drawing + foreground mask
- **Automated rigging:** Uses Mixamo for skeleton binding and animation retargeting
- **Pre-trained models:** LaMa contour remover, ISNet background remover
- **Dataset:** 120 preprocessed drawings with 3D reconstructions (from Facebook AnimatedDrawings)
- **Per-sample training:** Stage 3 trains once per character, then applies to any animation

## Input/Output
- **Input:** `texture.png` (512×512 character drawing) + `mask.png` (foreground mask)
- **Output:** Animated 3D character with stylized contours restored

## Technical Details
- **Framework:** PyTorch
- **Pretrained weights:** LaMa (experiments.zip), ISNet (ONNX)
- **Animation assets:** rest_pose.fbx (base rig), dab.fbx, jumping.fbx (pre-retargeted)
- **Training data generation:** Adapted from [[triposr]]/Wonder3D render codes

## Related Projects
- Related to 3D generation tools like [[triposr]] and [[shap-e]] for mesh creation
- Animation pipeline connects to motion tools like [[motiongpt]] for character animation
- Contour/sketch processing similar to [[clipasso]] for drawing understanding

## Links
- [GitHub](https://github.com/LordLiang/DrawingSpinUp)
- [Project Page](https://lordliang.github.io/DrawingSpinUp)
- [Live Demo (OpenBayes)](https://openbayes.com/console/public/tutorials/7r7H1en6BiN)
- [YouTube Demo](https://www.youtube.com/watch?v=tCkX6hLXaO4&t=3s)

## License
Not explicitly stated in README. Paper: SIGGRAPH Asia 2024 Conference Papers.

## Authors
Zhou, Jie; Xiao, Chufeng; Lam, Miu-Ling; Fu, Hongbo (City University of Hong Kong)
