# Shap-E — Raw Source

**Source:** https://github.com/openai/shap-e  
**Paper:** [Shap-E: Generating Conditional 3D Implicit Functions](https://arxiv.org/abs/2305.02463)  
**Analyzed:** 2026-04-18

## Overview

Official code and model release for Shap-E: a conditional 3D implicit function generation system by OpenAI (April 2023). Generates 3D assets from text descriptions or images using latent diffusion.

## Key Facts

- **Released:** April 2023
- **License:** MIT
- **Author:** OpenAI
- **Architecture:** Encoder + Latent Diffusion Model (300M parameters)
- **Output:** Implicit neural representations (NeRF/NeSTF), renderable or exportable as mesh

## Model Zoo

| Checkpoint | Description |
|---|---|
| `transmitter` | Full encoder + projection layers for implicit neural representations |
| `decoder` | Just the final projection layer — smaller, for diffusion output → implicit function |
| `text300M` | Text-conditional latent diffusion model (300M params) |
| `image300M` | Image-conditional latent diffusion model (300M params) |

## Architecture (Key Modules)

### shap_e/models/transmitter/
- **base.py** — Encoder/Transmitter/Decoder classes: VectorEncoder, ChannelsEncoder, Transmitter (encoder→renderer pipeline), VectorDecoder, ChannelsDecoder
- **bottleneck.py** — Latent bottleneck layers (identity, VQ, etc.)
- **params_proj.py** — Projects latents to implicit function parameters
- **pc_encoder.py** — Point cloud encoder
- **channels_encoder.py** — Multiview + point cloud channels encoder

### shap_e/models/generation/
- **transformer.py** — Transformer-based latent diffusion backbone (MultiheadAttention, MLP, timestep embeddings, CLIP conditioning)
- **perceiver.py** — Perceiver architecture for cross-modal processing
- **pretrained_clip.py** — Frozen/Image CLIP integration for conditioning

### shap_e/models/nerf/
- **model.py** — NeRFModel interface: density + channel prediction at query points
- **ray.py** — Ray marching / volumetric rendering

### shap_e/models/nerstf/
- Neural Shape, Texture, Field renderer — extended implicit representation

### shap_e/models/nn/
- **encoding.py** — Positional encoding, spherical harmonics
- **camera.py** — Camera models
- **meta.py** — Meta-learning module support
- **checkpoint.py** — Gradient checkpointing

### shap_e/rendering/
- **raycast/** — Raycasting renderer for implicit functions
- **blender/** — Blender integration for multiview rendering
- **view_data.py** — View data structures
- **torch_mesh.py** — PyTorch mesh utilities

### shap_e/util/
- **data_util.py** — Data loading utilities
- **image_util.py** — Image processing utilities
- **notebooks.py** — Notebook helper functions

## Dependencies (setup.py)

- torch, Pillow, numpy, scipy, matplotlib, scikit-image
- filelock, fire, humanize, requests, tqdm
- blobfile, clip (from git+https://github.com/openai/CLIP.git)

## Usage

```bash
pip install -e .
```

Three notebooks provided:
1. `sample_text_to_3d.ipynb` — text→3D generation
2. `sample_image_to_3d.ipynb` — image→3D generation
3. `encode_model.ipynb` — load 3D model → encode → render (requires Blender 3.3.1+)

## Training Data

- Same dataset as Point-E, but with 60 views instead of 20, 16K points per cloud instead of 4K
- ~1M additional 3D assets for text-conditional model
- 120K human-annotated captions for high-quality subset
- Diffuse materials only (simplified lighting)

## Quality Notes

- Lower fidelity than professional 3D assets
- Common issues: rough edges, holes, blurry surface textures
- Text conditioning: can produce diverse objects, struggles with multi-object scenes and attribute binding
- Bias: text prompts can reflect gender stereotypes
- Dataset bias: cartoonish, simple 3D assets

## Comparison with Point-E

- Point-E (2022): generates point clouds → SDF mesh conversion
- Shap-E (2023): generates implicit neural functions directly → better surface quality but similar fidelity constraints
- Both released by OpenAI with MIT license
- Shap-E uses latent diffusion; Point-E uses guided diffusion
