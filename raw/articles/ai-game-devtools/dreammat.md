# DreamMat — Source Extract

> Source: https://github.com/zzzyuqing/DreamMat
> Extracted: 2026-04-18
> Method: web_extract (GitHub clone timed out; gitcode 403; gitee unavailable)

## Project Overview

**DreamMat**: High-quality PBR Material Generation with Geometry- and Light-aware Diffusion Models

- **Published**: SIGGRAPH 2024 (ACM Trans. Graph., Vol. 43, No. 4, Article 39)
- **DOI**: 10.1145/3658170
- **License**: MIT
- **Language**: Python (98.1%)
- **Stars**: 395 | Forks: 19 | Issues: 18
- **Focus**: 3D generation, text-guided texturing, inverse rendering

## Authors

Yuqing Zhang, Yuan Liu, Zhiyu Xie, Lei Yang, Zhongyuan Liu, Mengzhou Yang, Runze Zhang, Qilong Kou, Cheng Lin, Wenping Wang, Xiaogang Jin

## Core Innovation

Geometry- and light-aware diffusion models for generating physically-based rendering (PBR) materials. Uses a light-conditioned ControlNet built on Stable Diffusion 2.1 to generate albedo, roughness, and metallic properties from text prompts and initial geometry.

## Architecture

- **Base Model**: stabilityai/stable-diffusion-2-1-base
- **ControlNet**: Custom light-aware ControlNet (trained separately)
- **Positional Encoding**: HashGrid (16 levels, log2_hashmap_size=19)
- **Geometry**: dreammat-mesh with UV-based HashGrid encoding (3D→5D: albedo×3 + roughness×1 + metallic×1)
- **Renderer**: CUDA raytracing renderer with diffuse (200 samples) + specular (128 samples)
- **Material**: dreammat-material with sigmoid activation, metallic bounds [0.0, 0.9], roughness² bounds [0.01, 0.9]
- **Guidance**: SDS (Score Distillation Sampling) with annealed control scales
- **Framework**: Built on threestudio framework

## Training Pipeline

1. **Data Generation**: Blender scripts render geometry and light conditions from 3D models
   - Geometry rendering → depth/normal maps
   - Light rendering → light-conditioned color maps with environment maps
2. **ControlNet Training**: accelerate launch diffusers_train_controlnet.py
3. **Material Generation**: Text prompt + initial mesh → SDS-guided optimization (30,000 steps)

## Key Dependencies

- lightning==2.0.0, omegaconf==2.3.0
- diffusers, transformers==4.28.1, accelerate
- nerfacc v0.5.2, tiny-cuda-nn
- opencv-python, tensorboard, matplotlib, imageio, trimesh
- bitsandbytes==0.38.1
- CUDA 11.8 + PyTorch 2.0.0 (tested on RTX 3090/4090/V100/A6000)
- Blender 3.2.2 (required for rendering)

## Usage Examples

```bash
python launch.py --config configs/dreammat.yaml --train --gradio --gpu 0 \
  system.prompt_processor.prompt="A cute striped kitten" \
  system.geometry.shape_init=mesh:load/shapes/objs/cat.obj \
  trainer.max_steps=4000 system.geometry.shape_init_params=0.85 \
  data.blender_generate=true
```

## Resources

- Paper: https://arxiv.org/abs/2405.17176
- Project Page: https://zzzyuqing.github.io/dreammat.github.io/
- Checkpoints: HuggingFace (zzzyuqing/light-geo-controlnet), ZJU Pan
- Docker: hub.docker.com/zzzyuqing/dreammat_image

## Acknowledgements

Codebases: threestudio, stable-diffusion, CSD, NeRO, Fantasia3D, SyncDreamer, diffusers, ControlNet
3D Assets: Objaverse + curated Sketchfab/Artstation models
Support: Information Technology Center & Tencent Lightspeed Studios
