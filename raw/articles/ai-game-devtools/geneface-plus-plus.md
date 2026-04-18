# GeneFace++: Generalized and Stable Real-Time 3D Talking Face Generation

**Source:** https://github.com/yerfor/GeneFacePlusPlus (mirrored from gitcode.com)
**Date:** 2026-04-18
**Paper:** arXiv:2305.00787 | arXiv:2301.13430 (GeneFace)
**Demo:** https://genefaceplusplus.github.io/

## Overview
GeneFace++ is a PyTorch implementation for high lip-sync, high video-reality, and high system-efficiency 3D talking face generation. It generalizes across speakers while maintaining real-time performance.

## Architecture (Three-Stage Pipeline)

### Stage 1: Audio2Motion (Audio → 3DMM Parameters)
- **VAE Model**: Converts audio features (HuBERT 1024-dim + F0 pitch) to 3DMM identity/expression parameters
- **PitchContourVAEModel**: Optional pitch-contour-aware variant for prosody-preserving motion
- Input: 16kHz audio → HuBERT features + F0 extraction
- Output: 3DMM ID (80-dim) + EXP (64-dim) parameters

### Stage 2: PostNet (Motion Refinement)
- **PitchContourCNNPostNet**: CNN-based refinement of raw 3DMM predictions
- Uses **LLE (Locally Linear Embedding)** projection to constrain predictions within training data manifold
- K=10 nearest neighbors for LLE fusion
- Refines 68-point 3D landmark predictions

### Stage 3: Motion2Video (NeRF Rendering)
- **RADNeRF** (Radiance-driven Neural Radiance Field): Core renderer
- Variants: RADNeRFwithSR (super-resolution), RADNeRFTorso (with torso), RADNeRFTorsowithSR
- Uses 3DMM SECC (Semantic Expression Canonical Color) rendering for conditioning
- Camera pose + landmark conditioning → 512×512 RGB output
- Supports eye blink injection (periodic blinking pattern)
- FP16 inference with torch.cuda.amp

## Key Technical Features
- **3DMM Foundation**: Uses BFM2009 (Basel Face Model) for parametric face representation
- **Mediapipe Integration**: Face landmark detection (478→68 point mapping), face segmentation
- **Camera Smoothing**: 7-frame kernel for smooth camera path generation
- **Two-Stage Training**: Pre-trained Audio2Motion VAE + speaker-specific NeRF weights
- **Gradio WebUI**: Interactive demo with adjustable mouth amplitude, temperature, blink mode
- **Google Colab**: Full notebook available for zero-setup testing

## Directory Structure
```
modules/
├── audio2motion/     # VAE + PitchContour models for audio-to-motion
├── postnet/          # CNN post-refinement + LLE projection
├── radnerfs/         # RADNeRF renderer (core), torso variants, SR variants
├── commons/          # Shared utilities
└── eg3ds/            # EG3D-style models (metrics, StyleGAN variants)
data_gen/             # Data preprocessing (eg3d conversion, MP feature extraction)
deep_3drecon/         # 3DMM reconstruction (BFM, SECC renderer)
inference/            # Inference scripts + Gradio app
tasks/                # Training task definitions
utils/                # Audio, NN, visualization, commons utilities
```

## Dependencies & Environment
- Python 3.9, PyTorch 2.0.1 + CUDA 11.7 (CUDA 12.* not supported)
- ffmpeg, pytorch3d (from source), mmcv 2.1.0, librosa, opencv
- torch-ngp extensions (custom CUDA kernels)
- A100/V100 GPU verified

## Inference API
```python
from inference.genefacepp_infer import GeneFace2Infer
infer = GeneFace2Infer(
    audio2secc_dir="checkpoints/audio2motion_vae",
    postnet_dir="",
    head_ckpt="",
    torso_model_dir="checkpoints/motion2video_nerf/may_torso"
)
out = infer.infer_once({
    'drv_audio_name': 'audio.wav',
    'drv_pose': 'static',
    'mouth_amp': 1.0,
    'temperature': 0.5,
    'lle_percent': 0.5,
    'blink_mode': 'period',
    'out_name': 'output.mp4',
    'debug': False,
    'low_memory_usage': False,
    'raymarching_end_threshold': 0.01
})
```

## License
Research use (citations required). Check repository LICENSE file.

## Related Work
- GeneFace (arXiv:2301.13430) — predecessor, same authors
- Real3DPortrait (ICLR 2024 Spotlight) — one-shot NeRF talking face, same lead author
- RADNeRF — underlying neural rendering technique
