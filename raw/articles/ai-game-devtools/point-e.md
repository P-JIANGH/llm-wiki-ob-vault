# Point·E — Raw Source

**Source:** https://github.com/openai/point-e  
**Paper:** [Point-E: A System for Generating 3D Point Clouds from Complex Prompts](https://arxiv.org/abs/2212.08751)  
**Analyzed:** 2026-04-18

---

## README

This is the official code and model release for Point-E: A System for Generating 3D Point Clouds from Complex Prompts.

### Usage

Install with `pip install -e .`.

Key notebooks:
- `image2pointcloud.ipynb` — sample a point cloud, conditioned on synthetic view images
- `text2pointcloud.ipynb` — pure text-to-3D model (small, limited quality but understands simple categories/colors)
- `pointcloud2mesh.ipynb` — SDF regression model for producing meshes from point clouds

Evaluation scripts:
- `evaluate_pfid.py` — P-FID evaluation
- `evaluate_pis.py` — P-IS evaluation
- `blender_script.py` — Blender rendering code

---

## Architecture Analysis

### Core Modules

**point_e/diffusion/** — Diffusion model implementation
- `gaussian_diffusion.py` (1091 lines) — Core Gaussian diffusion based on openai/guided-diffusion
  - Beta schedules: linear, cosine
  - SpacedDiffusion for custom timestep subsets
  - Channel scales/biases for normalized point cloud data
- `k_diffusion.py` — k-diffusion sampler integration
- `sampler.py` — Point cloud diffusion sampler
- `configs.py` — Diffusion configuration mapping (6 base models + upsample)

**point_e/models/** — Neural network architectures
- `transformer.py` — Multiple transformer variants:
  - `PointDiffusionTransformer` — Unconditional point cloud diffusion
  - `CLIPImagePointDiffusionTransformer` — CLIP image vector conditioned
  - `CLIPImageGridPointDiffusionTransformer` — CLIP image grid conditioned (main model family)
  - `UpsamplePointDiffusionTransformer` — 4x upsampling transformer
  - `CLIPImageGridUpsamplePointDiffusionTransformer` — Upsampling with CLIP conditioning
- `sdf.py` — `CrossAttentionPointCloudSDFModel` for point cloud → mesh via SDF regression
- `perceiver.py` — Perceiver architecture for processing large point clouds
- `pretrained_clip.py` — Pretrained CLIP image encoder integration
- `configs.py` — Model configurations (7 presets from 40M to 1B params)

**point_e/util/** — Utility functions
- `point_cloud.py` — Point cloud data structures and operations
- `mesh.py` — Mesh data structures
- `pc_to_mesh.py` — Point cloud to mesh conversion via SDF
- `ply_util.py` — PLY file format I/O
- `plotting.py` — Visualization utilities

**point_e/evals/** — Evaluation pipeline
- `fid_is.py` — P-FID and P-IS metric computation
- `pointnet2_cls_ssg.py` — PointNet++ feature extractor for evaluation
- `feature_extractor.py` — Feature extraction from point clouds

### Model Zoo

| Config Name | Parameters | Conditioning | Purpose |
|---|---|---|---|
| base40M-imagevec | 40M | CLIP image vector | Image→PointCloud |
| base40M-textvec | 40M | CLIP text vector | Text→PointCloud |
| base40M-uncond | 40M | None | Unconditional generation |
| base40M | 40M | CLIP image grid | Image→PointCloud (higher quality) |
| base300M | 300M | CLIP image grid | Image→PointCloud (larger) |
| base1B | 1B | CLIP image grid | Image→PointCloud (largest) |
| upsample | 40M | CLIP image grid | 4x point cloud upsampling |
| sdf | ~30M | Point cloud | PointCloud→Mesh (SDF regression) |

### Key Technical Details

- **Input channels:** 6 (xyz coordinates + rgb colors)
- **Output channels:** 12 (predicted mean + variance for each of 6 channels)
- **Diffusion timesteps:** 1024 (cosine schedule for base, linear for upsample)
- **Context size:** 1024 tokens (base), 3072 tokens (upsample), 4096 (SDF)
- **Channel normalization:** xyz scaled by 2.0, rgb scaled by 0.007843 (1/127.5)
- **Dependencies:** PyTorch, CLIP, numpy, scipy, matplotlib, scikit-image

### Two-Stage Pipeline

1. **Coarse generation:** Base model generates 1024-point point cloud from image/text
2. **Upsampling:** Upsample model increases to 4096 points (4x resolution)
3. **Optional mesh conversion:** SDF model regresses signed distance field → mesh

### License

MIT (based on openai/guided-diffusion lineage)

---

## Key Source Excerpts

### Gaussian Diffusion Core
Based on `openai/guided-diffusion` repository, uses cosine beta schedule by default. Channel biases handle coordinate normalization: xyz has bias 0.0 with scale 2.0, rgb has bias -1.0 with scale 0.007843.

### Transformer Architecture
The CLIPImageGridPointDiffusionTransformer processes CLIP's 2D image feature grid alongside point cloud tokens, using cross-attention to condition generation on visual features.
