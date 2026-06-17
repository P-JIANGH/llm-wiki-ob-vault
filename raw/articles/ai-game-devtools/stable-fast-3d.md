# SF3D: Stable Fast 3D Mesh Reconstruction

**Source:** https://github.com/Stability-AI/stable-fast-3d
**Date:** 2026-04-18

## README Summary

SF3D (Stable Fast 3D) is a state-of-the-art open-source model for fast feedforward 3D mesh reconstruction from a single image.

Based on [[ai-game-devtools/triposr]] but introduces several new key techniques:
- Explicitly optimized to produce good meshes without artifacts
- Textures with UV unwrapping built-in
- Illumination disentanglement (delights color, predicts material parameters)
- Maintains fast inference speeds of TripoSR

## Key Architecture (from source code)

### Main Pipeline (sf3d/system.py - SF3D class)
- **Image Tokenizer**: DINOv2-based image encoder
- **Camera Embedder**: Encodes camera intrinsics/extrinsics
- **Triplane Tokenizer**: Learnable triplane representation
- **Backbone**: Transformer-based transformer processing tokens
- **Post Processor**: Processes raw triplane outputs
- **Decoder (MaterialMLP)**: Multi-head MLP predicting density, vertex_offset, features (albedo), roughness, metallic, perturb_normal
- **Image Estimator**: CLIP-based global image property estimation
- **Global Estimator**: Illumination prediction from scene codes

### Inference Flow
1. Input RGBA image → rembg background removal → foreground resize
2. Image encoded via DINOv2 + camera embedding
3. Backbone generates triplane scene codes (3 × C × H × W)
4. Marching Tetrahedra extracts mesh from density field
5. UV unwrapping via custom uv_unwrapper module
6. Texture baking via custom texture_baker (CUDA/Metal kernels)
7. Material prediction: albedo, roughness, metallic, normal/bump maps
8. Export as GLB with PBR textures

### Key Modules
- `texture_baker/`: Custom CUDA/Metal texture rasterization and interpolation kernels
- `uv_unwrapper/`: Custom UV unwrapping implementation
- `sf3d/models/tokenizers/dinov2.py`: DINOv2 image feature extraction
- `sf3d/models/tokenizers/triplane.py`: Triplane tokenization
- `sf3d/models/transformers/backbone.py`: Transformer backbone
- `sf3d/models/isosurface.py`: Marching Tetrahedra helper
- `sf3d/models/mesh.py`: Mesh class with remeshing (triangle/quad) and UV unwrap
- `sf3d/models/network.py`: MaterialMLP with multiple output heads

### Remeshing Options
- `none`: Mesh unchanged
- `triangle`: Botsch-Kobbett remeshing (triangle topography)
- `quad`: Instant Field-Aligned Meshes (Jakob et al.), quad flow then triangulated

## Requirements
- Python >= 3.8
- PyTorch (CUDA or MPS)
- ~6GB VRAM for single image inference
- Dependencies: einops, jaxtyping, omegaconf, transformers, open_clip_torch, trimesh, rembg, pynanoinstantmeshes, gpytoolbox

## ComfyUI Integration
Provides 4 custom nodes:
- **StableFast3DLoader**: Load the model
- **StableFast3DSampler**: Image → Mesh (supports mask, remesh, vertex count)
- **StableFast3DPreview**: Preview GLB in UI
- **StableFast3DSave**: Save GLB to output directory

## License
Stability AI Non-Commercial Research Community License

## Citation
Boss, M., Huang, Z., Vasishta, A., & Jampani, V. (2024). SF3D: Stable Fast 3D Mesh Reconstruction with UV-unwrapping and Illumination Disentanglement. arXiv:2408.00653.
