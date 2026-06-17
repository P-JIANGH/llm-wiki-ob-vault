# SkyReels-A1: Expressive Portrait Animation in Video Diffusion Transformers

**Source:** https://github.com/SkyworkAI/SkyReels-A1
**Paper:** https://arxiv.org/abs/2502.10841
**Homepage:** https://skyworkai.github.io/skyreels-a1.github.io/

## Overview

SkyReels-A1 is a video diffusion transformer (DiT) based framework for generating high-fidelity, expressive portrait animations. Given a reference portrait image and a driving video (or audio), it transfers not only facial expressions and lip-sync but also natural body dynamics, producing realistic and lifel character animations. The model supports arbitrary-length video generation via a long video inference pipeline.

## Key Features

- **Video/Image-driven:** Transfer expressions and body motion from driving video to reference portrait
- **Audio-driven:** Audio-to-portrait animation via DiffPoseTalk FLAME coefficient pipeline
- **Long video:** Arbitrary-length generation via `inference_long_video.py`
- **Dynamic resolution:** Supports 12fps (native), 24fps, 48fps, 60fps output
- **Gradio interface:** Interactive web UI via `app.py`
- **Evaluation:** Automated metrics (SimFace, FID, L1 distance) in `eval/` folder

## Architecture

- **Video Diffusion Transformer (DiT):** Conditional video generation framework based on CogVideoX architecture
- **Expression-aware conditioning:** Facial expression-aware landmarks extracted from driving video serve as motion descriptors
- **Latent space integration:** Landmarks directly integrated into input latent space
- **Facial image-text alignment:** Deep fusion of facial features with video dynamics for identity consistency
- **Frame interpolation:** FILM (frame-interpolation-pytorch) for smoother temporal transitions

## Repository Structure

| Path | Purpose |
|---|---|
| `skyreels_a1/` | Core model architecture & logic |
| `scripts/` | Inference & utility runners |
| `eval/` | Automated metric evaluation |
| `diffposetalk/` | Audio-to-motion coefficient pipeline |
| `inference.py` | Standard image/video-driven generation |
| `inference_audio.py` | Audio-driven generation |
| `inference_long_video.py` | Arbitrary-length video generation |
| `app.py` | Gradio web interface |

## Dependencies

- FLAME model (external)
- mediapipe (external)
- smirk (external)
- DiffPoseTalk (for audio-driven pipeline)
- FILM (frame interpolation)
- PyTorch

## License

Not explicitly stated in README. Based on Skywork AI projects, likely Apache 2.0 or community license.

## Related Projects

- CogVideoX (THUDM) - Architecture foundation
- DiffPoseTalk - Audio-to-motion pipeline
- finetrainers - Training framework
