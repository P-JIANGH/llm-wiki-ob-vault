# HunyuanWorld 1.0 — Raw Source

> Cloned from: https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0
> Clone date: 2026-04-16
> Original README.md + key source file summaries

## README Summary

**Project:** HunyuanWorld 1.0 by Tencent Hunyuan (released 2025-07-26)
**ArXiv:** https://arxiv.org/abs/2507.21809

### What It Does
Open-source framework for generating immersive, explorable, and interactive 3D worlds from text prompts or single images. Combines panoramic proxy generation with semantic layering and hierarchical 3D reconstruction.

### Key Features
1. **360° immersive experiences** via panoramic world proxies
2. **Mesh export** for compatibility with existing CG pipelines (exports to .obj/.glb with Draco compression)
3. **Disentangled object representations** for augmented interactivity
4. **Two-stage pipeline**: (1) Panorama generation, (2) Layered 3D world composition

### Architecture
- **PanoDiT** (based on Flux): Text-to-panorama and Image-to-panorama generation
- **WorldComposer**: Semantic layering, depth estimation, adaptive depth compression, sheet warping → 3D mesh layers
- **Layered representation**: Background layer + up to 2 foreground object layers + sky layer
- **Depth model**: Omnidata (for depth estimation from single images)
- **Dependencies**: PyTorch 2.5.0+cu124, diffusers, Open3D, Real-ESRGAN, ZIM, GroundingDINO

### Models (HuggingFace)
| Model | Description | Size |
|-------|-------------|------|
| HunyuanWorld-PanoDiT-Text | Text→Panorama | 478MB |
| HunyuanWorld-PanoDiT-Image | Image→Panorama | 478MB |
| HunyuanWorld-PanoInpaint-Scene | Scene inpainting | 478MB |
| HunyuanWorld-PanoInpaint-Sky | Sky inpainting | 120MB |

### Performance (vs baselines)
- Text→Pano: BRISQUE 40.8 (SOTA), NIQE 5.8 (SOTA), Q-Align 4.4 (SOTA), CLIP-T 24.3 (SOTA)
- Image→World: BRISQUE 36.2, NIQE 4.6, CLIP-I 84.5 (all SOTA)
- Text→World: BRISQUE 34.6, NIQE 4.3, Q-Align 4.2, CLIP-T 24.0 (all SOTA)

### Two-Stage Usage
```bash
# Stage 1: Generate panorama (text or image)
python3 demo_panogen.py --prompt "..." --output_path test_results/case7
# Stage 2: Compose 3D world from panorama
python3 demo_scenegen.py --image_path test_results/case7/panorama.png --classes outdoor --output_path test_results/case7
```

Supports FP8 quantization and KV-cache for faster inference on consumer GPUs (4090).

### License
Apache 2.0 (code), custom model license (checkpoints)

### Related Projects (Tencent HunyuanWorld family)
- HY-World-2.0 (2026-04-16): state-of-the-art 3D world model
- HunyuanWorld-1.5 / WorldPlay (2025-12-18): real-time world creation and play
- HunyuanWorld-1.1 / WorldMirror (2025-10-22): video/multi-view to 3D world
- FlashWorld (2025-10-16): 3DGS world generation in 5-10 seconds on single GPU
- HunyuanWorld-Voyager (2025-09-02): RGB-D video diffusion, 3D-consistency exploration + fast reconstruction
- HunyuanWorld-1.0-lite (2025-08-15): quantized version for consumer GPUs (4090)
