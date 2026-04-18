# Ditto: Motion-Space Diffusion for Controllable Realtime Talking Head Synthesis

**Source:** GitHub README (web extract; GitHub/gitcode/gitee clone all failed)
**URL:** https://github.com/antgroup/ditto-talkinghead
**Conference:** ACM MM 2025
**Organization:** Ant Group
**Branch:** inference (training code in `train` branch)
**Extracted:** 2026-04-18

---

## Project Overview

Ditto is a diffusion-based framework for generating controllable, real-time talking head videos. Based on the ACM MM 2025 paper "Ditto: Motion-Space Diffusion for Controllable Realtime Talking Head Synthesis" by researchers at Ant Group.

Key claim: Uses motion-space diffusion (diffusing in motion representation space rather than pixel space) to achieve real-time performance for talking head synthesis.

## Architecture

### Foundation
- Built upon **S2G-MDDiffusion** (Speech2Gesture Multi-Modal Diffusion)
- Built upon **LivePortrait** for facial landmark manipulation
- Core innovation: diffusion in motion space for efficiency

### Backends
1. **TensorRT Backend** (default)
   - Optimized for NVIDIA GPUs with Ampere_Plus architecture compatibility
   - Pre-compiled .engine files (FP16/FP32)
   - Config files: `v0.4_hubert_cfg_trt.pkl`, `v0.4_hubert_cfg_trt_online.pkl`

2. **PyTorch Backend** (new, community-requested)
   - Broader hardware compatibility, research flexibility
   - Core .pth weights: appearance, decoder, lmdm, motion, stitch, warp
   - Aux models: face detection & landmark ONNX/task files

### Key Pipeline Components
- **HuBERT** audio encoder for speech feature extraction
- **LM** (Landmark Motion Diffusion Model) — motion-space diffusion
- **Appearance Model** — visual generation
- **Decoder** — output reconstruction
- **Warp Module** — facial warping
- **Stitch Module** — seamless frame composition

## File Structure
```
./checkpoints/
├── ditto_cfg/          # Configuration pickle files
├── ditto_trt_Ampere_Plus/  # Pre-compiled TensorRT engines
├── ditto_onnx/         # General ONNX fallbacks
└── ditto_pytorch/      # PyTorch weights (new)
    ├── aux_models/     # Face detection & landmarks
    └── models/         # Core .pth weights
```

## Key Scripts
- `inference.py` — Primary inference execution
- `stream_pipeline_offline.py` — Offline streaming pipeline
- `stream_pipeline_online.py` — Online (real-time) streaming pipeline
- `cvt_onnx_to_trt.py` — ONNX to TensorRT conversion for non-Ampere GPUs

## Installation
- **Recommended:** Conda with `environment.yaml`
- **Fallback:** Manual pip install (pytorch, cuda, cudnn, ffmpeg)
- **Cloud:** Google Colab notebook available (auto-handles dependencies)

## Licensing
- **Apache-2.0** — permissive open source license
- Citation required for research use (BibTeX in repo)

## Resources
- Project Page: https://digital-avatar.github.io/ai/Ditto/
- HuggingFace Weights: https://huggingface.co/digital-avatar/ditto-talkinghead
- Google Colab: Available
