# Direct3D-S2 — Gigascale 3D Generation with Spatial Sparse Attention

## Source Info
- **GitHub**: https://github.com/DreamTechAI/Direct3D-S2
- **Paper**: arXiv 2505.17412 (NeurIPS 2025)
- **Demo**: https://huggingface.co/spaces/wushuang98/Direct3D-S2-v1.0-demo
- **Models**: https://huggingface.co/wushuang98/Direct3D-S2
- **License**: MIT
- **Authors**: Shuang Wu, Youtian Lin, Feihu Zhang, Yifei Zeng, Yikang Yang, Yajie Bao, Jiachen Qian, Siyu Zhu, Philip Torr, Xun Cao, Yao Yao

## Abstract
Direct3D-S2 is a scalable 3D generation framework based on sparse volumes that achieves superior output quality with dramatically reduced training costs. The key innovation is the Spatial Sparse Attention (SSA) mechanism, which greatly enhances the efficiency of Diffusion Transformer (DiT) computations on sparse volumetric data. SSA allows the model to effectively process large token sets within sparse volumes, substantially reducing computational overhead — achieving 3.9× speedup in forward pass and 9.6× in backward pass (v1.0), and 12.2× forward / 19.7× backward (v1.1). The framework includes a variational autoencoder (VAE) that maintains a consistent sparse volumetric format across input, latent, and output stages. The model enables training at 1024³ resolution with just 8 GPUs (a task typically requiring 32+ GPUs for volumetric representations at 256³).

## Key Highlights
- **Gigascale 3D Generation**: Training at 1024³ resolution with only 8 GPUs
- **Spatial Sparse Attention (SSA)**: Novel attention mechanism for sparse volumetric data
- **Unified Sparse VAE**: Consistent sparse volumetric format across all stages

## Architecture

### Pipeline (3-stage cascaded generation)
1. **Dense Stage**: Dense DiT + Dense VAE at low resolution → produces latent index (sparse token coordinates)
2. **Sparse 512 Stage**: Sparse DiT + Sparse VAE at 512³ resolution → intermediate mesh
3. **Sparse 1024 Stage**: Sparse DiT + Sparse VAE at 1024³ resolution → high-res mesh
4. **Refiner**: UNet-based refiner removes interior faces and refines geometry

### Key Modules
- `pipeline.py` — Direct3DS2Pipeline: end-to-end image-to-mesh generation
- `models/transformers/sparse_dit.py` — Sparse Diffusion Transformer with SSA
- `models/transformers/dense_dit.py` — Dense DiT (baseline/initial stage)
- `models/autoencoders/ss_vae.py` — Sparse Structure VAE for sparse volumetric encoding/decoding
- `models/autoencoders/dense_vae.py` — Dense VAE for initial latent extraction
- `models/refiner/unet_refiner.py` — UNet-based mesh refiner
- `modules/attention/modules.py` — Multi-head attention with Rotary Position Embedding (RoPE), RMSNorm
- `modules/sparse/` — Sparse tensor operations and sparse transformer blocks
- `modules/transformer/` — Transformer building blocks (modulated DiT layers)
- `utils/sparse.py` — SparseTensor class for sparse volumetric data
- `utils/mesh.py` — Mesh processing utilities (marching cubes, hole filling, remeshing)

### Dependencies
- PyTorch 2.5.1 + CUDA 12.1
- torchsparse (MIT-Han-Lab sparse tensor library)
- diffusers (HuggingFace diffusion pipeline)
- triton 3.1.0 + flash-attn (GPU acceleration)
- trimesh, pymeshfix, pyvista (mesh processing)
- transformers 4.40.2 (CLIP image encoder)

### Usage
```python
from direct3d_s2.pipeline import Direct3DS2Pipeline
pipeline = Direct3DS2Pipeline.from_pretrained('wushuang98/Direct3D-S2', subfolder="direct3d-s2-v-1-1")
pipeline.to("cuda:0")
mesh = pipeline('input.png', sdf_resolution=1024, remove_interior=True, remesh=False)["mesh"]
mesh.export('output.obj')
```

### VRAM Requirements
- 512 resolution: ~10GB VRAM
- 1024 resolution: ~24GB VRAM
- v1.1 is nearly 2× faster than v1.0

### Version History
- May 26, 2025: Paper and project page released
- May 30, 2025: v1.0 and v1.1 inference code/models released (v1.1: 12.2× forward, 19.7× backward speedup vs FlashAttention-2)
- June 3, 2025: v1.2 planned (enhanced character generation)

### Related Projects (from acknowledgements)
- TRELLIS (Microsoft) — structured 3D generation
- SparseFlex (VAST-AI-Research/TripoSF) — sparse flexible representation
- native-sparse-attention-triton — Triton implementation of native sparse attention
- diffusers (HuggingFace) — diffusion model framework
