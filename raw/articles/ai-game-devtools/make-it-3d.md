# Make-It-3D: High-Fidelity 3D Creation from A Single Image with Diffusion Prior (ICCV 2023)

**Source:** https://github.com/junshutang/Make-It-3D
**Authors:** Junshu Tang, Tengfei Wang, Bo Zhang, Ting Zhang, Ran Yi, Lizhuang Ma, Dong Chen
**Conference:** ICCV 2023
**Paper:** https://arxiv.org/abs/2303.14184
**Project page:** https://make-it-3d.github.io/

## Abstract

Investigates creating high-fidelity 3D content from only a single image. The challenge: estimating underlying 3D geometry while hallucinating unseen textures.

**Approach:** Leverages prior knowledge from a well-trained 2D diffusion model as 3D-aware supervision for 3D creation.

**Two-stage optimization pipeline:**
1. **Coarse stage:** Optimizes a neural radiance field (NeRF) by incorporating constraints from the reference image at the frontal view and diffusion prior at novel views. Uses progressive training strategy (frontal views first → full 360°).
2. **Refine stage:** Transforms the coarse model into textured point clouds and further elevates realism with diffusion prior while leveraging high-quality textures from the reference image. Uses contextual loss to sharpen texture.

**Key achievements:** First attempt to achieve high-quality 3D creation from a single image for general objects. Enables text-to-3D creation and texture editing applications.

## Architecture

### Core Pipeline

```
Single Image → SAM (foreground mask) → DPT (depth estimation) → BLIP2 (caption generation)
       ↓
Stage 1: Coarse NeRF optimization (SD 2.0 diffusion prior + frontal view constraints)
       ↓
Stage 2: Refine with textured point clouds (diffusion prior + reference image textures + contextual loss)
       ↓
Output: Textured 3D mesh (OBJ export via marching cubes)
```

### Key Dependencies

- **Stable Diffusion 2.0** (diffusion prior for 3D-aware supervision)
- **NeRF** (neural radiance field, based on stable-dreamfusion codebase)
- **Tiny-CUDA-NN** (fast neural network training backbone, tcnn)
- **DPT** (depth estimation for reference image)
- **SAM** (Segment Anything Model for foreground mask)
- **BLIP2** (caption generation from image)
- **CLIP** (alternative guidance, besides SD)
- **PyTorch3D** (point cloud operations)
- **Contextual Loss** (texture sharpening in refine stage)

### Code Structure

- `main.py` — Entry point, argparse config (250 lines): controls coarse/refine stages, SD/CLIP guidance, NeRF parameters
- `nerf/provider.py` — NeRFDataset: camera pose generation, ray sampling
- `nerf/utils.py` — Training loop (1185 lines): SD guidance loss, NeRF rendering, mesh export via marching cubes
- `nerf/refine_utils.py` — Refine stage utilities
- `nerf/unet.py` — UNet architecture for refinement
- `encoding.py` — Feature encoding
- `optimizer.py` — Adan/Adam/AdamW optimizer implementations
- `activation.py` — Custom activation functions
- `raymarching/` — CUDA raymarching kernels (C++/CUDA extension)

### Training Commands

**Coarse stage (frontal):**
```bash
python main.py --workspace ${NAME} --ref_path "${IMGPATH}" --phi_range 135 225 --iters 2000
```

**Coarse stage (full 360°):**
```bash
python main.py --workspace ${NAME} --ref_path "${IMGPATH}" --phi_range 0 360 --albedo_iters 3500 --iters 5000 --final
```

**Refine stage:**
```bash
python main.py --workspace ${NAME} --ref_path "${IMGPATH}" --phi_range 135 225 --refine --refine_iters 3000
```

### Technical Details

- **Backbone options:** tcnn (default), grid, sdf, vanilla, normal
- **Optimizers:** Adan (default), Adam, AdamW
- **SD versions:** 1.5, 2.0 (default)
- **Rendering:** CUDA raymarching (max 512 steps) or PyTorch (64 steps)
- **Training resolution:** 128×128 (configurable)
- **Camera ranges:** phi 0-360°, theta 70-110°, FOV 15-25°
- **Exports:** OBJ mesh with texture via PyMCubes marching cubes

### Limitations

- Works best with centered single objects
- Complex geometry may fail to reconstruct solid shapes
- Requires GPU with CUDA support
- Torch 1.10.0 + CUDA 11.3 (older PyTorch version)

## Acknowledgments

Code borrows heavily from [Stable-Dreamfusion](https://github.com/ashawkey/stable-dreamfusion).

Also available in Jittor framework: [Make-it-3D-Jittor](https://github.com/DMCV-SJTU/Make-it-3D-Jittor)
