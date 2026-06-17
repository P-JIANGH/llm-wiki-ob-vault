# X-Mesh: Text-Driven 3D Stylization

**Source:** https://github.com/xmu-xiaoma666/X-Mesh
**Paper:** "X-Mesh: Towards Fast and Accurate Text-driven 3D Stylization via Dynamic Textual Guidance" (ICCV 2023)
**Project Page:** https://xmu-xiaoma666.github.io/Projects/X-Mesh/
**arXiv:** https://arxiv.org/abs/2303.15764

## Overview

PyTorch implementation of X-Mesh, a text-driven 3D stylization pipeline that uses dynamic textual guidance to fast and accurately stylize 3D meshes. The model takes an input 3D mesh and a text prompt, and outputs a stylized mesh with geometry and texture modifications.

## Key Facts

- **Publication:** ICCV 2023 (Proceedings of the IEEE/CVF International Conference on Computer Vision)
- **Authors:** Yiwei Ma, Xiaoqing Zhang, Xiaoshuai Sun, Jiayi Ji, Haowei Wang, Guannan Jiang, Weilin Zhuang, Rongrong Ji (Xiamen University and collaborators)
- **Framework:** PyTorch, requires CUDA GPU
- **Dataset:** MIT-30 (30 meshes with corresponding text prompts)
- **Evaluation Metrics:** MSE (24 fixed viewing angles) + ITS (Image-Text Similarity)
- **Output:** Stylized .obj files + multi-view renders

## Architecture & Key Modules

| File | Purpose |
|------|---------|
| `main.py` | Training entry point, orchestration |
| `XMesh.py` | Core X-Mesh model with dynamic textual guidance |
| `mesh.py` | Mesh data structures and operations |
| `render.py` | View generation and rendering pipeline |
| `generate_multiviews.py` | Multi-view image generation for evaluation |
| `test_MSE.py` | MSE evaluation (24 fixed angles) |
| `test_ITS.py` | ITS (Image-Text Similarity) metric calculation |
| `save_similarity.py` | Similarity tracking utilities |
| `utils.py` | General utilities |
| `script/` | Shell scripts for batch training on MIT-30 |
| `xmesh.yml` | Conda environment configuration |

## Usage

1. **Setup:** `conda env create --file xmesh.yml && conda activate xmesh`
2. **Training:** Run scripts in `./script/` for single mesh or full MIT-30 dataset
3. **Output:** Stylized `.obj` files, colored/uncolored renders in `./output`
4. **Evaluation:** Generate 24-angle renders → MSE calculation → ITS metric

## Example Outputs

Text-guided stylization examples include:
- Wooden phoenix, Dark castle, Ginger cat with black collar
- Blue whale, Brown owl standing on trunk, Crocodile
- All rendered in Unreal Engine style with dynamic textual guidance

## Technical Notes

- Requires CUDA GPU; CPU-only installation fails
- If `kaolin`/`nvcc` error during install: `export CUDA_HOME=/usr/local/cuda-11.3`
- Uses Score Distillation Sampling (SDS) from diffusion models for text-driven guidance
- Dynamic textual guidance approach for fast and accurate stylization
