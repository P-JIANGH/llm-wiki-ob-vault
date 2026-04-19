# MIMO: Controllable Character Video Synthesis with Spatial Decomposed Modeling

**Source:** GitHub README + Project Page
**URL:** https://github.com/menyifang/MIMO
**Date Extracted:** 2026-04-20
**Note:** Clone failed (GitHub timeout, gitcode 403, gitee unreachable) — source extracted via web extract only.

---

## Project Overview

- **Name:** MIMO (MiMic anyOne with Motions and Objects)
- **Authors:** Yifang Men, Yuan Yao, Miaomiao Cui, Liefeng Bo
- **Institution:** Institute for Intelligent Computing, Alibaba Group (Tongyi Lab)
- **Venue:** CVPR 2025
- **Paper:** [arXiv:2409.16160](https://arxiv.org/abs/2409.16160)
- **Project Page:** https://menyifang.github.io/projects/MIMO/index.html
- **Online Demo:** [ModelScope Studio](https://modelscope.cn/studios/iic/MIMO)
- **Weights:** [ModelScope](https://modelscope.cn/models/iic/MIMO/files) | [HuggingFace](https://huggingface.co/menyifang/MIMO/tree/main)
- **Code Release:** 2025-06-11 (simplified version with comparable performance)

## Abstract

MIMO is a generalizable model for controllable character video synthesis that can synthesize realistic character videos with controllable attributes (character, motion, scene) from simple user inputs. It achieves scalability to arbitrary characters, generality to novel 3D motions, and applicability to interactive real-world scenes in a unified framework.

## Core Architecture

### Spatial Decomposed Modeling

The core idea is to encode 2D video to compact spatial codes based on the inherent 3D nature of video:

1. **Lift 2D frame pixels into 3D** using monocular depth estimators
2. **Decompose video clip into three spatial components** in hierarchical layers based on 3D depth:
   - **Main Human** → disentanglement into identity code (C_id) and motion code (C_mo)
   - **Underlying Scene** → embedded via shared VAE encoder
   - **Floating Occlusion** → embedded via shared VAE encoder
3. Scene and occlusion components reorganized as **full scene code (C_so)**
4. Latent codes inserted into a **diffusion-based decoder** as conditions for video reconstruction

### Disentanglement Strategy

- **Identity Code (C_id):** Captures canonical appearance via appearance transfer and structured body codes
- **Motion Code (C_mo):** Structured motion representation from pose sequences
- **Full Scene Code (C_so):** Combined scene + occlusion representation

### User Input Flexibility

Users can provide:
- A single image for character identity
- A pose sequence for motion control
- A single video/image for scene context
- Or a direct driving video as complete input

## Usage

| Task | Script |
|:---|:---|
| Character Animation | `python run_animate.py` |
| Video Editing | `python run_edit.py` |
| Local Gradio UI | `python app.py` (requires ≥ 40GB VRAM) |

## Technical Requirements

- PyTorch implementation
- GPU ≥ 40GB VRAM for Gradio demo
- Pre-trained weights: denoising_unet.pth, motion_module.pth, pose_guider.pth, reference_unet.pth
- Dependencies: sd-vae-ft-mse, stable-diffusion-v1-5, image_encoder

## Directory Structure

```
./pretrained_weights/
|-- image_encoder/
|-- denoising_unet.pth
|-- motion_module.pth
|-- pose_guider.pth
|-- reference_unet.pth
|-- sd-vae-ft-mse/
`-- stable-diffusion-v1-5/

./assets/video_template/
|-- template1/ (vid.mp4, mask.mp4, sdc.mp4, bk.mp4, occ.mp4)
|-- template2/
`-- ...
```

## Acknowledgments

Built upon: Moore-AnimateAnyone, SAM, 4D-Humans, ProPainter

## Citation

```bibtex
@article{men2024mimo,
  title={MIMO: Controllable Character Video Synthesis with Spatial Decomposed Modeling},
  author={Men, Yifang and Yao, Yuan and Cui, Miaomiao and Liefeng, Bo},
  booktitle={arXiv preprint arXiv:2409.16160},
  year={2024}
}
```
