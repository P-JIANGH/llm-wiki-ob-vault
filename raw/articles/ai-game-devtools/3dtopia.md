# 3DTopia — Large Text-to-3D Generation Model with Hybrid Diffusion Priors

**Source:** https://github.com/3DTopia/3DTopia
**Captured:** 2026-04-18
**Category:** 3D Model (Text-to-3D Generation)

## Project Overview

A two-stage text-to-3D generation model. The first stage uses a diffusion model to quickly generate candidates. The second stage refines the assets chosen from the first stage.

**Paper:** [arXiv:2403.02234](https://arxiv.org/pdf/2403.02234.pdf)
**Released:** 2024-01-18

## Key Features

- **Two-stage generation pipeline:**
  - Stage 1: Diffusion model for fast candidate generation (DDPM/DDIM/DPM-Solver samplers)
  - Stage 2: Mesh refinement via [threefiner](https://github.com/3DTopia/threefiner) — two-step process (SD texture refinement → IF2 final refinement)
- **Text-to-3D:** Input natural language prompts → output 3D mesh (PLY/GLB)
- **Multi-view rendering:** Auto-generates multi-view videos of generated 3D models
- **Marching cubes:** Volumetric 3D sampling with configurable resolution
- **Triplane representation:** Uses EG3D-style triplane renderer for 3D representation

## Technical Architecture

- **Backbone:** Based on Stable Diffusion architecture (ldm directory)
- **3D Representation:** Triplane + EG3D renderer
- **Sampling:** DDPM (1000 steps default), DDIM, DPM-Solver, PLMS
- **Text Encoder:** CLIP (OpenAI) + OpenCLIP
- **Framework:** PyTorch Lightning, PyTorch 1.12.0, CUDA 11.3
- **Python:** 3.8
- **Key libraries:** trimesh, mcubes, kornia, timm, transformers, einops, safetensors

## Project Structure

| File/Dir | Description |
|----------|-------------|
| `sample_stage1.py` | Stage 1 inference script (299 lines) — text-to-3D sampling with multiple samplers |
| `gradio_demo.py` | Gradio web demo (422 lines) — interactive text-to-3D UI |
| `ldm/` | Latent Diffusion Models core implementation |
| `taming/` | Taming Transformers for high-resolution synthesis |
| `model/` | Model definitions |
| `module/` | Neural network modules |
| `utility/` | Utilities: triplane renderer (EG3D), ray generation, image processing |
| `configs/` | YAML configuration files |
| `environment.yml` | Conda environment specification |

## Inference Examples

```bash
# Stage 1: Generate "a robot"
python -u sample_stage1.py --text "a robot" --samples 1 --sampler ddim --steps 200 --cfg_scale 7.5 --seed 0

# Stage 2: Refine (via threefiner)
threefiner sd --mesh results/default/stage1/a_robot_0_0.ply --prompt "a robot" --text_dir --front_dir='-y' --outdir results/default/stage2/ --save a_robot_0_0_sd.glb
threefiner if2 --mesh results/default/stage2/a_robot_0_0_sd.glb --prompt "a robot" --outdir results/default/stage2/ --save a_robot_0_0_if2.glb
```

## Dependencies & Environment

- PyTorch 1.12.0 + CUDA 11.3
- PyTorch Lightning 2.0.2
- CLIP (OpenAI, git)
- OpenCLIP 2.20.0
- HuggingFace Transformers
- trimesh 4.0.2, PyMCubes 0.1.4
- kornia, timm, einops
- Gradio (for demo)

## Acknowledgements

Built on foundations from: EG3D (NVIDIA), Stable Diffusion (CompVis), Objaverse dataset (AllenAI).

## Dataset

Released Objaverse captions (2024-03-10).

## License

See LICENSE file in repository.
