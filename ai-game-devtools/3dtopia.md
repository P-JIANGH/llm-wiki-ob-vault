---
title: 3DTopia
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/3dtopia.md]
---

# 3DTopia

**Large Text-to-3D Generation Model with Hybrid Diffusion Priors**

## Overview

3DTopia is a two-stage text-to-3D generation model that combines diffusion-based candidate generation with mesh refinement. Released in January 2024, it produces 3D meshes (PLY/GLB) from natural language prompts.

**Paper:** [arXiv:2403.02234](https://arxiv.org/pdf/2403.02234.pdf)
**GitHub:** [3DTopia/3DTopia](https://github.com/3DTopia/3DTopia)
**Weights:** [HuggingFace](https://huggingface.co/hongfz16/3DTopia)
**Released:** 2024-01-18
**Authors:** Fangzhou Hong, Jiaxiang Tang, Ziang Cao, et al. (NTU, Tencent, CUHK)

## Two-Stage Pipeline

### Stage 1 — Diffusion Generation
- Latent diffusion model generates 3D candidates from text prompts
- Supports DDPM (1000 steps), DDIM, DPM-Solver, PLMS samplers
- Uses triplane representation with EG3D-style renderer
- Outputs: multi-view rendered videos + marching cubes mesh (PLY)
- Configurable: sampling steps, CFG scale, mesh resolution, render resolution

### Stage 2 — Mesh Refinement (threefiner)
- **Step 1:** SD-based texture refinement (`threefiner sd`)
- **Step 2:** IF2 final refinement (`threefiner if2`)
- Input: Stage 1 mesh → Output: refined GLB mesh
- Separate repo: [3DTopia/threefiner](https://github.com/3DTopia/threefiner)

## Technical Details

| Aspect | Detail |
|--------|--------|
| Architecture | Stable Diffusion backbone + triplane + EG3D renderer |
| Text Encoder | CLIP (OpenAI) + OpenCLIP |
| Framework | PyTorch 1.12.0, PyTorch Lightning 2.0.2 |
| 3D Representation | Triplane (EG3D-style) |
| Mesh Extraction | Marching Cubes (configurable resolution) |
| Python Version | 3.8 |
| CUDA | 11.3 |

## Usage

```bash
# Stage 1
python -u sample_stage1.py --text "a robot" --sampler ddim --steps 200 --cfg_scale 7.5

# Stage 2 (requires threefiner installed)
threefiner sd --mesh results/default/stage1/a_robot_0_0.ply --prompt "a robot"
threefiner if2 --mesh results/default/stage2/a_robot_0_0_sd.glb --prompt "a robot"
```

## Related Tools

- Similar to [[ai-game-devtools/stable-dreamfusion]] (DreamFusion SDS-based text-to-3D) but uses hybrid two-stage diffusion
- Part of the text-to-3D ecosystem alongside [[ai-game-devtools/hunyuan3d-2-0]] and [[ai-game-devtools/mvdream]]
- Uses EG3D renderer, building on NVIDIA's `entities/nvidia-research` EG3D work
- Trained on Objaverse dataset (captions released by 3DTopia team)

## Key Facts

- Released Objaverse captions on 2024-03-10
- Technical report published 2024-03-04
- Gradio demo included (`gradio_demo.py`, 422 lines)
- Automatic checkpoint download from HuggingFace
- Known issue: GLIBC 2.25 error in stage 2 → fix: `pip install pymeshlab==0.2`
