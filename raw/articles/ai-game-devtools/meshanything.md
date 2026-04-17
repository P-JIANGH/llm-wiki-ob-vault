# MeshAnything — Raw Source

**Source:** https://github.com/buaacyw/MeshAnything
**Captured:** 2026-04-18
**Paper:** https://arxiv.org/abs/2406.10163
**Project Page:** https://buaacyw.github.io/mesh-anything/

---

## README Summary

**MeshAnything: Artist-Created Mesh Generation with Autoregressive Transformers**

- **Authors:** Yiwen Chen (NTU, Shanghai AI Lab), Tong He (Shanghai AI Lab), Di Huang (Shanghai AI Lab), Weicai Ye (Shanghai AI Lab), Sijin Chen (Fudan University), Jiaxiang Tang (Peking University), Xin Chen (UCAS), Zhongang Cai (SenseTime), Lei Yang (SenseTime), Gang Yu (Stepfun), Guosheng Lin (NTU), Chi Zhang (Westlake University)
- **Paper:** arXiv 2406.10163 (cs.CV), 2024
- **License:** SLab (custom license, not open-source in the traditional sense)
- **HuggingFace:** Weights + Gradio Demo available

### Core Concept

MeshAnything converts existing 3D meshes (or point clouds) into clean, artist-created-style meshes using an autoregressive transformer approach. It takes an input mesh/point cloud and generates a simplified, structured mesh output (up to 800 faces).

### Key Capabilities

1. **Mesh-to-Mesh generation:** Takes .obj/.ply files as input, outputs simplified .obj meshes
2. **Point Cloud input:** Accepts .npy files with point cloud + normal data (shape N×6)
3. **Marching Cubes preprocessing:** Optional `--mc` flag to first convert meshes via Marching Cubes before processing
4. **Local Gradio demo:** `python app.py`
5. **CLI inference:** Single file or batch folder processing

### Architecture

- **Base model:** 350M parameter autoregressive transformer (built on Facebook OPT-350M)
- **Codebook:** 8192 size, 1024 dimension (vector quantization for mesh representation)
- **Max triangles:** 800 (limited by training compute)
- **Point cloud encoder:** Based on Michelangelo's ASL (Aligned Signed Latent) diffusion model
- **Noise-Resistant Decoder:** BERT-base encoder (6 layers) for decoding mesh tokens to coordinates
- **Shape-OPT:** Custom LLM config extending OPT for shape generation

### Dependencies / Tech Stack

- Python 3.10, PyTorch 2.1.1, CUDA 11.8
- accelerate (distributed training/inference)
- transformers (HuggingFace)
- trimesh (mesh I/O)
- flash-attn
- Michelangelo (point cloud encoding, vendored submodule)
- safetensors (model weight loading)
- HuggingFace Hub (weight download)

### Performance

- ~7GB VRAM on A6000 GPU
- ~30 seconds per mesh generation

### Limitations

- Cannot generate meshes with more than 800 faces (training constraint)
- Input mesh should have sharp geometry; feed-forward 3D methods often produce bad results
- Best with 3D reconstruction, scanning, or SDS-based (DreamCraft3D) inputs
- Input mesh up vector should be +Y for best results
- Input normalized to unit bounding box

### Installation

```bash
git clone https://github.com/buaacyw/MeshAnything.git && cd MeshAnything
conda create -n MeshAnything python==3.10.13 -y
conda activate MeshAnything
pip install torch==2.1.1 torchvision==0.16.1 torchaudio==2.1.1 --index-url https://download.pytorch.org/whl/cu118
pip install -r requirements.txt
pip install flash-attn --no-build-isolation
```

Or pip install directly:
```bash
pip install git+https://github.com/buaacyw/MeshAnything.git
import MeshAnything
```

### Usage Examples

```bash
# Mesh input (folder)
python main.py --input_dir examples --out_dir mesh_output --input_type mesh

# Mesh input (single file)
python main.py --input_path examples/wand.obj --out_dir mesh_output --input_type mesh

# With Marching Cubes preprocessing
python main.py --input_dir examples --out_dir mesh_output --input_type mesh --mc

# Point cloud input
python main.py --input_dir pc_examples --out_dir pc_output --input_type pc_normal
```

### Acknowledged Dependencies

- MeshGPT (nihalsid.github.io/mesh-gpt/)
- meshgpt-pytorch (lucidrains)
- Michelangelo (NeuralCarver)
- transformers (HuggingFace)
- vector-quantize-pytorch (lucidrains)

### V2 Release

- MeshAnything V2 released on same day (https://github.com/buaacyw/MeshAnythingV2)
- V2 supports up to 1600 faces (vs 800 in V1)
- V2 has separate training code available

### Key Files

- `main.py` — CLI inference entry point, Dataset class, model loading, batch generation
- `app.py` — Gradio web demo
- `mesh_to_pc.py` — Mesh to point cloud conversion (marching cubes + sampling)
- `MeshAnything/models/meshanything.py` — Core model: NoiseResistantDecoder + MeshAnything class
- `MeshAnything/models/shape_opt.py` — Shape-OPT model configuration
- `MeshAnything/miche/` — Vendored Michelangelo point cloud encoder
