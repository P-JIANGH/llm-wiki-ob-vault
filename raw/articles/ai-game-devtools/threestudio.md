# threestudio — Unified Framework for 3D Content Generation

> threestudio is a unified framework for 3D content creation from text prompts, single images, and few-shot images, by lifting 2D text-to-image generation models.

## Source Information

- **GitHub:** https://github.com/threestudio-project/threestudio
- **License:** Apache-2.0
- **Language:** Python (28.3%), Jupyter Notebook (71.4%)
- **Stars:** ~7k

## Architecture Overview

threestudio uses a plugin-based architecture with OmegaConf YAML configuration files. The framework consists of four core components:

### Core Modules

| Module | Path | Description |
|--------|------|-------------|
| **Systems** | `threestudio/systems/` | Training and inference pipelines combining all components |
| **Models** | `threestudio/models/` | 3D representations (NeRF, DMTet, VolumeSDF, Gaussian Splatting) |
| **Guidance** | `threestudio/models/guidance/` | 2D diffusion model backends (SD, IF, Zero123, etc.) providing gradients |
| **Data** | `threestudio/data/` | Datasets and data loaders for various input modalities |

### Plugin System

Each module is a pluggable component registered via `threestudio.utils.config.config`:
- `@threestudio.register("model-name", "module-type")` decorator registers new components
- New methods can be added by creating a file in the appropriate subdirectory

## Supported Methods

| Method | Input | Key Features |
|--------|-------|--------------|
| **SDS (Score Distillation Sampling)** | Text | Original DreamFusion approach |
| **SDI** | Text | SDS + DDIM inversion, fixes over-blurring, sharper details |
| **ProlificDreamer** | Text | 3-stage: NeRF → Geometry Refinement → Texturing (VSD guidance) |
| **HiFA** | Text/Image | Suite: image-space SDS, z-variance loss, noise annealing |
| **DreamFusion / Magic3D** | Text | Coarse NeRF → DMTet refinement |
| **Zero-1-to-3 / Stable Zero123** | Single Image | Image-conditioned 3D generation |
| **Magic123** | Single Image | Zero123 + SD combined guidance |
| **InstructNeRF2NeRF** | Image/Video | 3D editing via instruction-following |
| **Gaussian Splatting** | Various | 3DGS-based fast rendering |
| **MVDream** | Various | Multi-view diffusion for 3D |

## VRAM Optimization

Built-in memory management options:
- `system.cleanup_after_validation_step` - Clean VRAM after validation
- `system.guidance.enable_memory_efficient_attention` - PyTorch attention optimization
- `system.guidance.enable_attention_slicing` - ~20% slower but saves VRAM
- `system.guidance.token_merging` - Drastic speedup, may lower quality
- `system.guidance.enable_sequential_cpu_offload` - Saves VRAM, extremely slow

## Quality Tips

- Increase batch size: `data.batch_size=N` or `trainer.accumulate_grad_batches=N`
- Train longer: `trainer.max_steps=N`
- Change seed to avoid Janus (multi-face) problem
- Use prompt debiasing: `system.prompt_processor.use_prompt_debiasing=true`
- Use Perp-Neg: `system.prompt_processor.use_perp_neg=true` (reduces Janus artifacts)

## Quick Start

```bash
# DreamFusion with Stable Diffusion (~6GB VRAM)
python launch.py --config configs/dreamfusion-sd.yaml --train --gpu 0 \
  system.prompt_processor.prompt="a baby bunny sitting on a stack of pancakes"

# DreamFusion with DeepFloyd IF (>20GB VRAM, higher quality)
python launch.py --config configs/dreamfusion-if.yaml --train --gpu 0 \
  system.prompt_processor.prompt="a baby bunny sitting on a stack of pancakes"

# Export mesh
python launch.py --config trial/configs/parsed.yaml --export --gpu 0 \
  system.exporter_type=mesh-exporter
```

## Gradio Web UI

```bash
python gradio_app.py launch
```

## Dependencies

- PyTorch 1.12.1+ / 2.0.0+
- CUDA (NVIDIA GPU ≥6GB VRAM)
- OmegaConf for configuration
- Various guidance backends via HuggingFace

## Key Files

| File | Purpose |
|------|---------|
| `launch.py` | Main entry point for training/export |
| `gradio_app.py` | Web-based Gradio demo interface |
| `configs/` | YAML configuration files for all methods |
| `threestudio/` | Core framework code |
| `requirements.txt` | Python dependencies |
