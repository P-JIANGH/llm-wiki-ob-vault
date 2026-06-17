# Isotropic3D — Image-to-3D Generation Based on a Single CLIP Embedding

**Source:** https://github.com/pkunliu/Isotropic3D
**Paper:** https://arxiv.org/abs/2403.10395
**Project Page:** https://pkunliu.github.io/Isotropic3D/
**Weight:** https://huggingface.co/pkunliu/Isotropic3D

## Overview

Official implementation for Isotropic3D: Image-to-3D Generation Based on a Single CLIP Embedding. The method generates 3D content from a single RGBA image using only a single CLIP image embedding as guidance — no text prompt needed. This is a significant simplification over SDS-based approaches that require carefully crafted text prompts.

Built on top of threestudio framework (MVDream-threestudio fork), using PyTorch Lightning for training orchestration.

## Key Technical Points

- **Single CLIP Embedding Guidance:** Unlike DreamFusion/SDS methods that use text embeddings via CLIP text encoder, Isotropic3D uses only the CLIP *image* embedding of the input RGBA image as guidance signal. This eliminates the need for text prompt engineering.
- **Multi-view Diffusion Guidance:** Uses a multiview diffusion model (`multiview-diffusion-guidance`) with pretrained weights (`isotropic3d.ckpt`) loaded from HuggingFace. The guidance operates on multiple camera views simultaneously.
- **Soft Shading:** Primary config uses `diffuse-with-point-light-material` with `soft_shading: true` (Magic3D paper's approach) — randomly samples ambient/diffuse light colors during training for better geometry.
- **Implicit Volume Geometry:** Uses `implicit-volume` with HashGrid positional encoding (TCNN), softplus density activation, blob_magic3d density bias. Normal computed via analytic auto-differentiation.
- **NeRF Volume Rendering:** Uses `nerf-volume-renderer` with 512 samples per ray, grid pruning via NeRFAcc.
- **Two-Stage Resolution:** Training starts at 64x64 (steps 0-4999), then switches to 256x256 (step 5000+). 4 views per batch, batch size [8,4].
- **Total Training:** 10,000 steps max, AdamW optimizer, 16-bit mixed precision.

## Architecture

```
launch.py (entry) → threestudio framework →
  data: random-multiview-camera-datamodule
  system: mvdream-system
    geometry: implicit-volume (HashGrid + MLP)
    material: diffuse-with-point-light-material (soft shading)
    renderer: nerf-volume-renderer
    guidance: multiview-diffusion-guidance (CLIP image embedding)
    prompt_processor: dummy-prompt-processor (no text needed)
```

## Dependencies

- PyTorch 2.0.1 + CUDA 11.8
- PyTorch Lightning 2.0.0
- threestudio (MVDream-threestudio fork)
- diffusers, transformers, accelerate
- tiny-cuda-nn, nerfacc, nvdiffrast
- CLIP, ControlNet, MVDream (open-clip-torch)
- xatlas, trimesh, PyMCubes (mesh export)

## Usage

```bash
# Download weights
# ckpt/isotropic3d.ckpt from HuggingFace

# Generate 3D from RGBA image
export PYTHONPATH=$PYTHONPATH:./isotropic
python launch.py \
    --config configs/isotropic3d-shading.yaml \
    --train \
    --gpu 0 \
    system.guidance.cond_image_path=assets/wolf_rgba.png

# Export as OBJ+MTL mesh
python launch.py --config path/to/trial/dir/configs/parsed.yaml \
    --export --gpu 0 resume=path/to/trial/dir/ckpts/last.ckpt \
    system.exporter_type=mesh-exporter
```

## License

Not explicitly specified in repository.

## Authors

Pengkun Liu, Yikai Wang, Fuchun Sun, Jiafang Li, Hang Xiao, Hongxiang Xue, Xinzhou Wang

## Citing

```
@article{liu2024isotropic3d,
  title={Isotropic3D: Image-to-3D Generation Based on a Single CLIP Embedding},
  author={Liu, Pengkun and Wang, Yikai and Sun, Fuchun and Li, Jiafang and Xiao, Hang and Xue, Hongxiang and Wang, Xinzhou},
  journal={arXiv preprint arXiv:2403.10395},
  year={2024}
}
```
