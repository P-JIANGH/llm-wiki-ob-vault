# CRM: Single Image to 3D Textured Mesh with Convolutional Reconstruction Model

> Source: https://github.com/thu-ml/CRM
> Captured: 2026-04-17

## Project Overview

**CRM** (Convolutional Reconstruction Model) is a feed-forward model for generating 3D textured mesh from a single image in **10 seconds**. Developed by researchers from Tsinghua University.

- **Project Page**: https://ml.cs.tsinghua.edu.cn/~zhengyi/CRM/
- **Arxiv**: https://arxiv.org/abs/2403.05034
- **HF-Demo**: https://huggingface.co/spaces/Zhengyi/CRM
- **Weights**: https://huggingface.co/Zhengyi/CRM

## Architecture

Two-stage diffusion pipeline:

### Stage 1: Multi-View Pixel Generation
- Takes a single pre-processed image as input
- Generates 6-view consistent pixel images
- Based on ImageDream (SD v2.1) latent diffusion architecture
- Config: `configs/nf7_v3_SNR_rd_size_stroke.yaml`
- Model weights: `pixel-diffusion.pth` (from HuggingFace)

### Stage 2: Color & Geometry CCM Generation
- Takes multi-view pixel images from Stage 1
- Generates CCMs (Color Coordinate Maps) containing 3D geometry and texture
- Config: `configs/stage2-v2-snr.yaml`
- Model weights: `ccm-diffusion.pth` (from HuggingFace)

### 3D Mesh Reconstruction
- Uses the CRM (Convolutional Reconstruction Model) network
- Loads pretrained weights: `CRM.pth`
- Outputs 3D textured mesh in OBJ format
- Rendering: nvdiffrast for high-quality differentiable rendering
- FlexiCubes for mesh optimization

## Key Source Files

| File | Purpose |
|------|---------|
| `run.py` | Main inference entry — preprocesses image, loads models, runs two-stage pipeline, exports OBJ |
| `pipelines.py` | `TwoStagePipeline` — orchestrates Stage1 (pixel) + Stage2 (CCM) diffusion models |
| `model.py` | CRM model definition — reconstructs 3D mesh from CCMs |
| `inference.py` | `generate3d()` — converts diffusion outputs to 3D mesh via kaolin + flexicubes |
| `util/renderer.py` | nvdiffrast-based rendering utilities |
| `util/flexicubes_geometry.py` | FlexiCubes differentiable mesh representation |
| `imagedream/ldm/` | ImageDream latent diffusion module (Stable Diffusion v2.1 backbone) |
| `train.py` | Stage1 multi-view generation training script |
| `train_stage2.py` | Stage2 CCM generation training script |
| `app.py` | Gradio web interface for visualization |

## Inference

```bash
# Command line
CUDA_VISIBLE_DEVICES="0" python run.py --inputdir "examples/kunkun.webp"

# Web UI
gradio app.py
```

**Tips**: Input image should have grey/white background. The official implementation uses UV texture (not vertex color) — better quality than the HuggingFace demo but slower.

## Dependencies

- Python 3.9
- PyTorch 1.13.0 + CUDA 11.7
- kaolin 0.14.0 (NVIDIA 3D deep learning library)
- xformers (from Facebook Research)
- nvdiffrast (NVIDIA differentiable rendering)
- rembg (background removal preprocessing)
- accelerate (training)
- omegaconf

## Citation

```bibtex
@article{wang2024crm,
  title={CRM: Single Image to 3D Textured Mesh with Convolutional Reconstruction Model},
  author={Zhengyi Wang and Yikai Wang and Yifei Chen and Chendong Xiang and Shuo Chen and Dajiang Yu and Chongxuan Li and Hang Su and Jun Zhu},
  journal={arXiv preprint arXiv:2403.05034},
  year={2024}
}
```
