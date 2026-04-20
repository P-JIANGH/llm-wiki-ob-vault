---
title: "GeneFace++"
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, 3d, audio, open-source, python, tool]
sources: [raw/articles/ai-game-devtools/geneface-plus-plus.md]
---

# GeneFace++

**GeneFace++: Generalized and Stable Real-Time 3D Talking Face Generation** — PyTorch implementation for high lip-sync, high video-reality, high system-efficiency 3D talking face generation from audio input.

**GitHub:** [yerfor/GeneFacePlusPlus](https://github.com/yerfor/GeneFacePlusPlus) (mirrored: gitcode.com)
**Paper:** arXiv:2305.00787 | arXiv:2301.13430 (GeneFace predecessor)
**Demo:** https://genefaceplusplus.github.io/

## Architecture: Three-Stage Pipeline

### 1. Audio2Motion (Audio → 3DMM Parameters)
- **VAE Model**: Converts HuBERT audio features (1024-dim) + F0 pitch contour to 3DMM ID (80-dim) + EXP (64-dim) parameters
- **PitchContourVAEModel**: Pitch-aware variant for prosody-preserving motion
- Temperature-controlled sampling for motion diversity

### 2. PostNet (Motion Refinement)
- **PitchContourCNNPostNet**: CNN-based refinement of raw 3DMM predictions
- Uses **LLE (Locally Linear Embedding)** projection — K=10 nearest neighbors — to constrain predictions within training data manifold, reducing artifacts
- Refines 68-point 3D landmark predictions with pitch conditioning

### 3. Motion2Video (NeRF Rendering)
- **RADNeRF** (Radiance-driven Neural Radiance Field): Core neural renderer
- Variants: `RADNeRFwithSR` (super-resolution), `RADNeRFTorso` (full body), `RADNeRFTorsowithSR`
- SECC (Semantic Expression Canonical Color) rendering for conditioning
- FP16 inference with `torch.cuda.amp`, camera smoothing (7-frame kernel)
- Periodic blink injection for natural eye movement

## Key Technical Features
- **3DMM Foundation**: BFM2009 (Basel Face Model) for parametric face representation
- **Mediapipe Integration**: 478→68 point landmark mapping, face segmentation
- **Two-Stage Training**: Pre-trained Audio2Motion VAE (generalized) + speaker-specific NeRF weights
- **Real-Time**: Designed for real-time generation with efficient ray-marching
- **Gradio WebUI**: Interactive demo with adjustable mouth amplitude, temperature, blink mode
- **Google Colab**: Zero-setup demo notebook available

## Project Structure
| Directory | Purpose |
|-----------|---------|
| `modules/audio2motion/` | VAE + PitchContour models |
| `modules/postnet/` | CNN refinement + LLE projection |
| `modules/radnerfs/` | RADNeRF renderer core + torso/SR variants |
| `modules/eg3ds/` | EG3D-style models (StyleGAN variants, metrics) |
| `deep_3drecon/` | 3DMM reconstruction (BFM, SECC renderer) |
| `data_gen/` | Data preprocessing (eg3d conversion, MP features) |
| `inference/` | Inference scripts + Gradio app + Colab demo |
| `tasks/` | Training task definitions |

## Environment & Dependencies
- Python 3.9, PyTorch 2.0.1 + CUDA 11.7 (CUDA 12.* **not** supported)
- pytorch3d (from source), mmcv 2.1.0, ffmpeg, librosa, opencv
- torch-ngp custom CUDA extensions (built from source)
- Verified on A100/V100 GPUs

## Usage Example
```python
from inference.genefacepp_infer import GeneFace2Infer
infer = GeneFace2Infer(
    audio2secc_dir="checkpoints/audio2motion_vae",
    postnet_dir="",
    torso_model_dir="checkpoints/motion2video_nerf/may_torso"
)
infer.infer_once({
    'drv_audio_name': 'audio.wav',
    'drv_pose': 'static',
    'mouth_amp': 1.0,
    'temperature': 0.5,
    'lle_percent': 0.5,
    'blink_mode': 'period',
    'out_name': 'output.mp4'
})
```

## Game Dev Relevance
- **NPC Dialogue Animation**: Generate realistic talking face animations for game NPCs from voice-over audio
- **Virtual Streamers**: Real-time avatar animation for VTuber-style applications
- **Cutscene Generation**: Automated lip-sync for game cinematics without manual keyframe animation

## Comparison with Related Tools
- vs [[ai-game-devtools/aniportrait]]: AniPortrait uses AnimateDiff Motion Module + 3DMM for audio-driven animation; GeneFace++ uses RADNeRF neural rendering + VAE-based audio2motion, offering better generalization across speakers
- vs [[ai-game-devtools/emovoca]]: EmoVOCA generates 3D FLAME-based emotional talking heads; GeneFace++ focuses on photorealistic NeRF rendering with real-time performance, no explicit emotion control
- vs [[ai-game-devtools/echomimic]]: EchoMimic uses SD v1.5 diffusion + Whisper for audio-driven 2D animation; GeneFace++ is 3D-aware with NeRF, providing view-consistent rendering
- vs [[ai-game-devtools/chatdollkit]]: ChatdollKit is a Unity SDK for interactive virtual assistants with LLM+STT/TTS pipeline; GeneFace++ is a standalone Python research framework for high-quality face rendering

## Related Work
- **GeneFace** (arXiv:2301.13430): Predecessor, same authors
- **Real3DPortrait** (ICLR 2024 Spotlight): One-shot NeRF talking face, same lead author (Zhenhui Ye)
