# HunyuanVideo-Foley — Raw Source

**Source:** https://github.com/Tencent-Hunyuan/HunyuanVideo-Foley
**Archived:** 2026-04-20
**License:** Apache-2.0

---

## README Summary

HunyuanVideo-Foley: Multimodal Diffusion with Representation Alignment for High-Fidelity Foley Audio Generation.

Professional-grade AI sound effect generation for video content creators. Designed for video content creation, film production, advertising creativity, and game development.

### Key Highlights
- **Multi-scenario Sync**: High-quality audio synchronized with complex video scenes
- **Multi-modal Balance**: Perfect harmony between visual and textual information
- **48kHz Hi-Fi Output**: Professional-grade audio generation with crystal clarity

### Architecture
- **TV2A (Text-Video-to-Audio) task**: Complex multimodal generation challenge
- **Hybrid Architecture**:
  - Multimodal Transformer Blocks: Process visual-audio streams simultaneously
  - Unimodal Transformer Blocks: Focus on audio stream refinement
  - Visual Encoding: Pre-trained encoder extracts visual features from video frames
  - Text Processing: Semantic features extracted via pre-trained text encoder
  - Audio Encoding: Latent representations with Gaussian noise perturbation
  - Temporal Alignment: Synchformer-based frame-level synchronization with gated modulation

### Model Variants
| Model | Checkpoint | VRAM (Normal) | VRAM (Offload) |
|-------|------------|---------------|----------------|
| XXL (Default) | hunyuanvideo_foley.pth | 20GB | 12GB |
| XL | hunyuanvideo_foley_xl.pth | 16GB | 8GB |

### Performance (MovieGen-Audio-Bench)
- **PQ**: 6.59 (best), **PC**: 2.74, **CE**: 3.88 (best), **CU**: 6.13 (best)
- **IB**: 0.35 (best), **DeSync**: 0.74 (best), **CLAP**: 0.33
- **MOS-Q**: 4.14±0.68 (best), **MOS-S**: 4.12±0.77 (best), **MOS-T**: 4.15±0.75 (best)
- Outperforms FoleyGrafter, V-AURA, Frieren, MMAudio, ThinkSound on all metrics

### Performance (Kling-Audio-Eval)
- **FD_PANNs**: 6.07 (best), **FD_PASST**: 202.12 (best)
- **KL**: 1.89 (best), **IS**: 8.30, **PQ**: 6.12 (best)
- Surpasses all open-source solutions across all evaluation metrics

### Technical Details
- **Self-developed 48kHz audio VAE** for perfect reconstruction of sound effects, music, and vocals
- **Paper**: arXiv 2508.16930 (eess.AS)
- **Authors**: Sizhe Shan, Qiulin Li, Yutao Cui, Miles Yang, Yuehai Wang, Qun Yang, Jin Zhou, Zhao Zhong
- **Affiliations**: Tencent Hunyuan, Zhejiang University, Nanjing University of Aeronautics and Astronautics

### Installation & Usage
- Python 3.8+, CUDA 12.4/11.8
- Dependencies: PyTorch, diffusers, transformers (SigLIP-2 fork), omegaconf, gradio, DAC (audio codec), Synchformer
- CLI: `python3 infer.py --model_path PATH --single_video VIDEO --single_prompt PROMPT --output_dir OUTPUT`
- Batch: CSV-based processing with video paths and prompts
- Web UI: `python3 gradio_app.py` (Gradio interface)

### ComfyUI Integration
- Community nodes: if-ai/ComfyUI_HunyuanVideoFoley (CPU offload + FP8), phazei/ComfyUI-HunyuanVideo-Foley (precision modes)

### Acknowledgements
- Stable Diffusion 3, FLUX, MMAudio, HuggingFace, DAC (Descript Audio Codec), Synchformer

### Code Structure
```
hunyuanvideo_foley/          # Main package
  cli.py                     # CLI entry point
  constants.py               # Version and constants
  utils/
    model_utils.py           # Model loading, denoise processing
    feature_utils.py         # Feature extraction pipeline
    media_utils.py           # Audio/video merge utilities
configs/
  hunyuanvideo-foley-xl.yaml   # XL model config
  hunyuanvideo-foley-xxl.yaml  # XXL model config
infer.py                     # Main inference script (single + batch)
gradio_app.py                # Web UI application
setup.py                     # Package setup
tests/                       # Unit tests for config/media utils
```
