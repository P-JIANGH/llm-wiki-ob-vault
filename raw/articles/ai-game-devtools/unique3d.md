# Unique3D: High-Quality and Efficient 3D Mesh Generation from a Single Image

**Source:** https://github.com/AiuniAI/Unique3D
**Paper:** https://arxiv.org/abs/2405.20343
**Authors:** Kailu Wu, Fangfu Liu, Zhihan Cai, Runjie Yan, Hanyang Wang, Yating Hu, Yueqi Duan, Kaisheng Ma (Tsinghua University)
**Date analyzed:** 2026-04-18

## Overview

Unique3D generates high-fidelity 3D textured meshes from a single input image in ~30 seconds. It uses a four-stage pipeline: multiview diffusion → normal prediction → mesh reconstruction → texture projection.

## Architecture

### Stage 1: Image-to-Multiview-Image (img2mvimg)
- Custom diffusion pipeline (`custum_3d_diffusion/custum_pipeline/unifield_pipeline_img2mvimg.py`)
- Single front-view image → 4 orthogonal views (front/right/back/left) at 256×256
- Based on Stable Diffusion + ControlNet tile architecture
- Uses IP-Adapter for identity preservation
- Training config: `app/custom_models/image2mvimage.yaml`

### Stage 2: Normal Prediction
- Image-to-normal diffusion model (`app/custom_models/image2normal.yaml`)
- Predicts surface normals for each of the 4 views at 512×512
- Uses `app/custom_models/normal_prediction.py` with guidance_scale=1.5
- Normals provide geometric constraints for mesh reconstruction

### Stage 3: Mesh Reconstruction (2 stages)
**Stage 3a — Coarse mesh (`mesh_reconstruction/recon.py`):**
- `fast_geo()`: Front/back normal projection → join meshes → Poisson smoothing
- `reconstruct_stage1()`: Optimization loop (200 steps) using differentiable normal rendering
- `MeshOptimizer` with adaptive edge length (0.1 → 0.02)
- Loss: normal L2 + alpha mask + expansion regularization
- Uses nvdiffrast for differentiable rendering

**Stage 3b — Mesh Refine (`mesh_reconstruction/refine.py`):**
- `run_mesh_refine()`: 100 step refinement with progressive edge length decay (0.02 → 0.005)
- Updates normal predictions every 20 steps
- Final smoothing + subdivision via PyMeshLab

### Stage 4: Texture Projection
- `multiview_color_projection()`: Projects refined RGB views onto mesh at 1024×1024
- Confidence threshold filtering (0.2) for visible faces
- Completes unseen faces with inpainting

### Key Scripts
- `scripts/mesh_init.py`: Mesh initialization from normal maps
- `scripts/project_mesh.py`: Multiview color projection with camera setup
- `scripts/refine_lr_to_sr.py`: Super-resolution + Stable Diffusion refinement
- `scripts/normal_to_height_map.py`: Normal-to-depth conversion
- `mesh_reconstruction/remesh.py`: Vertex normal computation + continuous remeshing

## Dependencies
- PyTorch 2.3.1 + CUDA 12.1
- diffusers 0.27.2
- PyTorch3D (3D mesh operations)
- nvdiffrast (differentiable rendering)
- PyMeshLab (mesh processing)
- ONNX Runtime GPU (RealESRGAN super-resolution)
- rembg (background removal)
- mmcv-full
- Gradio (UI)

## Usage
```bash
# Setup
conda create -n unique3d python=3.11
pip install ninja diffusers==0.27.2 mmcv-full
pip install -r requirements.txt

# Download weights to ckpt/*
python app/gradio_local.py --port 7860
```

## Key Features
- Single image → textured GLB mesh in ~30 seconds
- 4-view orthogonal reconstruction (front/right/back/left)
- Normal-guided differentiable mesh optimization
- Automatic background removal (rembg)
- Super-resolution input support (RealESRGAN)
- Gradio interactive UI with examples
- ComfyUI integration available
- Windows + Linux + Docker support
- ONNX-based super-resolution for cross-platform compatibility

## License
Not explicitly specified (check repository for details)

## Project Structure
```
unique3d/
├── gradio_app.py                          # Entry point
├── app/
│   ├── gradio_local.py                    # Local Gradio server
│   ├── gradio_3dgen.py                    # Main 3D generation UI
│   ├── gradio_3dgen_steps.py              # Step-by-step generation
│   ├── all_models.py                      # Model zoo initialization
│   └── custom_models/                     # Custom model configs
│       ├── image2mvimage.yaml             # MV diffusion training config
│       ├── image2normal.yaml              # Normal prediction config
│       ├── mvimg_prediction.py            # Multiview prediction pipeline
│       └── normal_prediction.py           # Normal map prediction
├── custum_3d_diffusion/
│   ├── custum_pipeline/                   # Custom diffusers pipelines
│   │   ├── unifield_pipeline_img2mvimg.py # Image→4-view pipeline
│   │   └── unifield_pipeline_img2img.py   # Image→image pipeline
│   ├── custum_modules/                    # Custom attention processors
│   └── trainings/                         # Training code
├── mesh_reconstruction/
│   ├── recon.py                           # Stage 1 reconstruction
│   ├── refine.py                          # Mesh refinement
│   ├── remesh.py                          # Continuous remeshing
│   ├── opt.py                             # Mesh optimizer
│   ├── render.py                          # Differentiable renderer
│   └── func.py                            # Camera utilities
├── scripts/
│   ├── mesh_init.py                       # Mesh initialization
│   ├── project_mesh.py                    # Color projection
│   ├── multiview_inference.py             # Full pipeline orchestration
│   └── refine_lr_to_sr.py                 # Super-resolution
└── requirements.txt                       # Dependencies
```

## Notes
- Sensitive to input image facing direction — orthographic front-facing poses work best
- Occlusions degrade quality (4 views cannot cover fully occluded regions)
- Mesh normalized by longest XYZ edge during training — input should contain longest edge
- Training code not yet released
- Weights hosted on HuggingFace + Tsinghua Cloud Drive
