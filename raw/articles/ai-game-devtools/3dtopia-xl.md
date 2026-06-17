# 3DTopia-XL: High-Quality 3D PBR Asset Generation via Primitive Diffusion

**Source:** https://github.com/3DTopia/3DTopia-XL
**Extracted:** 2026-04-18 (web_extract; GitHub/gitcode/gitee clone all failed)

## Overview
- **CVPR 2025 Highlight** paper
- High-quality 3D PBR asset generation via primitive diffusion
- Core architecture: 3D Diffusion Transformer (DiT) on Primitive-Based Representation (PrimX)
- Generates from single image or text prompt

## Key Resources
- Paper: arXiv:2409.12957
- Project Page: https://3dtopia.github.io/3DTopia-XL/
- Weights: HuggingFace (FrozenBurning/3DTopia-XL)
- Live Demos: HuggingFace Spaces, WiseModel

## Timeline
- 09/2024: Technical report, inference code, HuggingFace demo
- 10/2024: WiseModel demo
- 02/2025: Accepted to CVPR 2025 Highlight, training code released

## Architecture
- **PrimX Representation:** Novel primitive-based 3D representation enabling high-fidelity tokenization and efficient compression
- **VAE:** Primitive patch compression
- **DiT:** Diffusion Transformer for 3D generation
- Two modalities: single-view (image-conditioned) and text-conditioned

## Inference
- Gradio demo: `python app.py`
- CLI: `python inference.py --config configs/inference_dit.yml`
- Key params: DDIM steps (25/50/100), CFG scale (4-7), export GLB, decimate (100K faces), MC resolution (256)
- Text-to-3D: switch to `configs/inference_dit_text.yml`

## Training Pipeline
1. **Data:** Subset of Objaverse, captions from Google Drive
2. **Mesh2PrimX:** `python train_fitting.py` — convert textured meshes to PrimX
3. **VAE Training:** `python train_vae.py` — primitive patch compression
4. **DiT Training:** cache features → `python train_dit.py`

## Repository Structure
| File/Dir | Purpose |
|----------|---------|
| `app.py` | Gradio web UI |
| `inference.py` | CLI inference |
| `train_fitting.py` | Mesh-to-PrimX conversion |
| `train_vae.py` | VAE training |
| `train_dit.py` | DiT training |
| `configs/` | YAML configs |
| `models/` | Architecture + conditioners |
| `datasets/` | Data loading |

## Citation
```bibtex
@inproceedings{chen2025primx,
  title={3DTopia-XL: High-Quality 3D PBR Asset Generation via Primitive Diffusion},
  author={Chen, Zhaoxi and Tang, Jiaxiang and Dong, Yuhao and Cao, Ziang and Hong, Fangzhou and Lan, Yushi and Wang, Tengfei and Xie, Haozhe and Wu, Tong and Saito, Shunsuke and Pan, Liang and others}
}
```
