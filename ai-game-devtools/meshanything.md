---
title: MeshAnything — Artist-Created Mesh Generation with Autoregressive Transformers
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, ai-model, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/meshanything.md]
---

# MeshAnything

**MeshAnything: Artist-Created Mesh Generation with Autoregressive Transformers**

## Overview

MeshAnything is an autoregressive transformer-based model that converts existing 3D meshes or point clouds into clean, artist-created-style meshes. Developed by researchers from NTU, Shanghai AI Lab, Fudan University, Peking University, SenseTime, Stepfun, and Westlake University. It takes an input mesh/point cloud and generates a simplified, structured mesh output (up to **800 faces** in V1, **1600 faces** in V2).

Published as arXiv paper **2406.10163** (cs.CV, 2024).

## Key Facts

| Dimension | Details |
|-----------|---------|
| **Parameters** | 350M (based on Facebook OPT-350M) |
| **Codebook** | 8192 size, 1024 dimension (vector quantization) |
| **Max faces** | 800 (V1), 1600 (V2) |
| **VRAM** | ~7GB on A6000 |
| **Inference time** | ~30 seconds per mesh |
| **License** | SLab (custom) |
| **Input** | Mesh (.obj/.ply) or point cloud (.npy with normals) |
| **Output** | Simplified mesh (.obj) |
| **Tested on** | Ubuntu 22, CUDA 11.8, A100/A800/A6000 |

## Architecture

MeshAnything uses a **three-stage pipeline**:

1. **Point Cloud Encoder** — Uses Michelangelo's ASL (Aligned Signed Latent) diffusion model to encode input mesh/point cloud into a latent representation (257 tokens × 768 dim)
2. **Autoregressive Transformer** — Custom Shape-OPT model (350M params) generates mesh tokens autoregressively, conditioned on the encoded point cloud latent. Uses vector quantization with 3-level codebook (8192 codes)
3. **Noise-Resistant Decoder** — BERT-base encoder (6 layers) decodes mesh tokens into 3D face coordinates. Discretized to 128 levels, output as 3×3 vertex positions per face

## Usage

### CLI Inference

```bash
# Mesh input (single file)
python main.py --input_path input.obj --out_dir mesh_output --input_type mesh

# Mesh input with Marching Cubes preprocessing
python main.py --input_dir examples --out_dir mesh_output --input_type mesh --mc

# Point cloud input (N×6 .npy file with coordinates + normals)
python main.py --input_path input.npy --out_dir pc_output --input_type pc_normal
```

### Python API

```python
pip install git+https://github.com/buaacyw/MeshAnything.git
import MeshAnything
```

### Local Demo

```bash
python app.py  # Launches Gradio web UI
```

## Limitations

- **Face count cap:** Cannot generate meshes with more than 800 faces (V1) due to training compute constraints
- **Input quality:** Feed-forward 3D generation methods often produce bad results; best with 3D reconstruction, scanning, or SDS-based (e.g., [[ai-game-devtools/dreamcraft3d]]) inputs
- **Orientation:** Input mesh up vector should be +Y for best results
- **Normalization:** Input is normalized to unit bounding box automatically

## Relationships

- Built on ideas from [[ai-game-devtools/meshgpt]] (mesh tokenization + autoregressive generation)
- Uses [[ai-game-devtools/michelangelo]] point cloud encoder as preprocessing
- V2 successor: [[ai-game-devtools/meshanything-v2]] (1600 face limit, improved performance)
- Related to [[ai-game-devtools/llama-mesh]] — also uses LLM architecture for 3D mesh generation
- Related to [[ai-game-devtools/crm]] — alternative approach to 3D asset generation via multi-view diffusion

## Links

- **GitHub:** https://github.com/buaacyw/MeshAnything
- **Paper:** https://arxiv.org/abs/2406.10163
- **Project Page:** https://buaacyw.github.io/mesh-anything/
- **HuggingFace Weights:** https://huggingface.co/Yiwen-ntu/MeshAnything
- **Gradio Demo:** https://huggingface.co/spaces/Yiwen-ntu/MeshAnything
- **V2:** https://github.com/buaacyw/MeshAnythingV2
