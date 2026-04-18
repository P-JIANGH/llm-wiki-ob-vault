# Step1X-3D — Raw Source Analysis

**Source:** https://github.com/stepfun-ai/Step1X-3D
**Captured:** 2026-04-18
**Organization:** stepfun-ai (阶跃星辰 / StepFun)

## README Summary

Step1X-3D is an open framework for high-fidelity and controllable generation of textured 3D assets.

### Key Claims
- Processes >5M assets into a 2M high-quality dataset with standardized geometric and textural properties
- Two-stage 3D-native architecture:
  1. Hybrid VAE-DiT geometry generator (perceiver-based latent encoding, sharp edge sampling)
  2. SD-XL-based texture synthesis module (cross-view consistency via geometric conditioning + latent-space sync)
- State-of-the-art open-source performance, competitive with proprietary solutions
- Supports direct transfer of 2D control techniques (e.g., LoRA) to 3D synthesis

### Models
| Model | Size | HuggingFace |
|-------|------|-------------|
| Step1X-3D-Geometry | 1.3B | stepfun-ai/Step1X-3D (subfolder: Step1X-3D-Geometry-1300m) |
| Step1X-3D-Geometry-Label | 1.3B | stepfun-ai/Step1X-3D (subfolder: Step1X-3D-Geometry-Label-1300m) |
| Step1X-3D-Texture | 3.5B | stepfun-ai/Step1X-3D (subfolder: Step1X-3D-Texture) |

### Datasets Released
- Objaverse: 320K UIDs
- Objaverse-XL: 480K UIDs (GitHub URLs)
- Texture synthesis assets: 30K
- Total: 830K available on ModelScope

### Architecture Details
- **Geometry Pipeline**: Step1X3DGeometryPipeline — image → watertight TSDF → .glb mesh
- **Geometry-Label Pipeline**: Supports symmetry/edge_type labels for controllable generation
- **Texture Pipeline**: Step1X3DTexturePipeline — image + mesh → textured .glb
- Uses custom rasterizer (C++/CUDA) for texture baking
- Reuses Hunyuan3D 2.0's custom_rasterizer and differentiable_renderer

### Training Scripts
- VAE training (shape autoencoder)
- 3D DiT diffusion training (from scratch)
- LoRA finetuning support
- SD-XL based multi-view generation (ig2mv) — adapted from MV-Adapter

### Dependencies
- PyTorch 2.5.1 + CUDA 12.4
- torch-cluster, pytorch3d (stable), kaolin 0.17.0
- Custom C++/CUDA rasterizers

### GPU Requirements
- Geometry + Texture: 27G VRAM, ~152 seconds for 50 steps
- Geometry-Label + Texture: 29G VRAM, ~152 seconds

### License
Apache License 2.0

### Key Files Analyzed
- README.md (221 lines) — main documentation
- inference.py (74 lines) — 3-stage pipeline: geometry → geometry-label → texture
- step1x3d_texture/pipelines/ — texture synthesis pipelines
- step1x3d_texture/custom_rasterizer/ — C++/CUDA rasterizer
- train.py — unified training script
- train_ig2mv.py — multi-view texture generation training

### Acknowledgments/Dependencies
FLUX, DINOv2, MV-Adapter, CLAY, Michelangelo, CraftsMan3D, TripoSG, Dora, Hunyuan3D 2.0, FlashVDM, diffusers, HuggingFace
