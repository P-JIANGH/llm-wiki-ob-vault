# MIGC: Multi-Instance Generation Controller for Text-to-Image Synthesis

**Source:** https://github.com/limuloo/MIGC
**Papers:** CVPR 2024 Highlight (MIGC) | TPAMI 2024 (MIGC++)
**Project Page:** https://migcproject.github.io/
**COCO-MIG Bench:** https://github.com/LeyRio/MIG_Bench

## Abstract

MIGC (Multi-Instance Generation Controller) is an adapter-based approach for precise multi-instance text-to-image synthesis. It addresses the challenge of generating images with multiple distinct objects at specified locations with correct attributes, a common failure mode for standard diffusion models.

## Key Architecture Components

### Core Module Structure
- **migc/migc_arch.py** — Main architecture: PositionNet (Fourier embedding for box coordinates), SAC (Spatially-Adaptive Controller) with CBAM attention
- **migc/migc_layers.py** — Custom layers: CBAM (Convolutional Block Attention Module), CrossAttention, LayoutAttention
- **migc/migc_pipeline.py** — Diffusers-based pipeline (927 lines): AttentionStore for attention map recording, MIGCPipeline extending StableDiffusionPipeline
- **migc/migc_utils.py** — Utility functions for data processing and visualization

### MIGC++ Extensions (TPAMI 2024)
- **migc_plus/migc_plus_arch.py** — Extended architecture supporting simultaneous box AND mask control
- **migc_plus/migc_plus_utils.py** — Additional utilities for dual-modal control
- **migc_plus/migc_plus_pipeline.py** — Pipeline with mask+box joint conditioning

### GUI
- **migc_gui/app.py** — WebUI based on GLIGEN-GUI integration, port 3344
- Supports EditMode (Consistent-MIG iterative editing)

### Key Technical Innovations

1. **Position-aware Control**: Fourier embedding of bounding box coordinates → PositionNet (512→512→out_dim MLP) generates position embeddings
2. **SAC (Spatially-Adaptive Controller)**: Combines features with guidance masks via CBAM, computes adaptive scale for each instance
3. **CrossAttention + LayoutAttention**: Injects instance-specific text and positional information into the diffusion process
4. **NaiveFuser**: Fuses controlled instances with the base generation

### Inference Modes
- **Single Image**: `inference_single_image.py` — basic MIGC with box control
- **MIGC++**: `migc_plus_inference_single_image.py` — box + mask simultaneous control
- **InferenceV2**: `inferencev2_single_image.py` — enhanced attribute control, reduces attribute leakage (66%→68% success rate)
- **Consistent-MIG**: `inference_consistent_mig.py` — iterative editing with region consistency
- **Benchmark**: `inference_mig_benchmark.py` — COCO-MIG evaluation

## Performance (COCO-MIG Benchmark)

| Method | Avg MIOU↑ | Avg Success Rate↑ | Type | Publication |
|--------|-----------|-------------------|------|-------------|
| Box-Diffusion | 0.26 | 0.16 | Training-free | ICCV 2023 |
| GLIGEN | 0.27 | 0.30 | Adapter | CVPR 2023 |
| ReCo | 0.49 | 0.55 | Full model tuning | CVPR 2023 |
| InstanceDiffusion | 0.46 | 0.51 | Adapter | CVPR 2024 |
| **MIGC (Ours)** | **0.56** | **0.66** | Adapter | CVPR 2024 |

## Checkpoints
- MIGC_SD14.ckpt (219M) — Stable Diffusion 1.4 base
- MIGC++_SD14.ckpt (191M) — re-implemented weights (smaller batch size than original)

## Training
Training code is NOT open source (company requirement). Only dataset preparation scripts for COCO are provided in `data_preparation/`.

## Compatible Base Models
- SD1.4 (official), SD1.5 (MIGC_SD14.ckpt works directly)
- Third-party: RealisticVision V60B1, Cetus-Mix, GhostMix
- SDXL support planned but not yet released

## Dependencies
- PyTorch, diffusers, transformers, CLIP
- OpenCV, scipy, numpy, PIL
- Gradio (for GUI)

## License
Non-commercial research only. No commercial use permitted.

## Team
- Zhejiang University ReLER Lab (supervisor: Prof. Yang Yi)
- HUAWEI collaboration
- Authors: Dewei Zhou, You Li, Ji Xie, Fan Ma, Zongxin Yang, Yi Yang
