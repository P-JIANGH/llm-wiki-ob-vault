# AniPortrait: Audio-Driven Synthesis of Photorealistic Portrait Animations

**Source:** https://github.com/Zejun-Yang/AniPortrait
**Paper:** https://arxiv.org/abs/2403.17694
**Authors:** Huawei Wei, Zejun Yang, Zhisheng Wang
**Organization:** Tencent Games Zhiji, Tencent
**License:** Apache-2.0

## Overview

AniPortrait is a novel framework for generating high-quality portrait animation driven by audio and a reference portrait image. It also supports face reenactment by providing a driving video instead of audio.

## Pipeline Architecture

The framework uses a multi-stage pipeline:

1. **Reference Image Encoding**: Extract facial features and identity from a single reference portrait
2. **Audio/Motion Conditioning**:
   - Audio-driven mode: wav2vec2 encoder → audio2mesh → audio2pose → 3DMM parameters (facial landmarks + head pose)
   - Video-driven mode (face reenactment): Extract pose/keypoints from source video
3. **Denoising UNet**: 3D UNet (adapted from AnimateDiff) with motion modules generates video frames conditioned on reference features + pose/audio signals
4. **Frame Interpolation** (optional): FILM-Net accelerates inference by generating intermediate frames

## Key Components

### Models (src/models/)
- **UNet3DConditionModel**: 3D denoising UNet with motion modules, adapted from AnimateDiff architecture
- **Reference UNet**: Extracts appearance features from reference image, uses mutual self-attention to inject identity
- **Pose Guider**: Lightweight network that encodes pose/keypoint sequences into condition features
- **Motion Module**: Temporal attention blocks inserted into UNet for consistent frame generation

### Audio Models (src/audio_models/)
- **Audio2MeshModel**: Wav2Vec2 encoder + linear layers → 3DMM vertex displacement (facial expression)
- **Audio2PoseModel**: Wav2Vec2 encoder → head pose parameters (rotation + translation)
- **Wav2Vec2Model**: Custom wrapper around Facebook wav2vec2-base-960h

### Scripts (scripts/)
- `pose2vid.py`: Self-driven generation (reference image + pose video → animated video)
- `vid2vid.py`: Face reenactment (reference image + source face video → target video)
- `audio2vid.py`: Audio-driven generation (reference image + audio → talking head video)
- `vid2pose.py`: Raw video → pose/keypoint sequence extraction
- `app.py`: Gradio web UI demo
- `generate_ref_pose.py`: Extract head pose from reference video for audio-driven mode
- `preprocess_dataset.py`: Dataset preparation (VFHQ, CelebV-HQ)

### Training Pipeline
- **Stage 1**: Train appearance + pose conditioning (reference UNet + denoising UNet + pose guider)
- **Stage 2**: Add motion module training with AnimateDiff pretrained weights (mm_sd_v15_v2.ckpt)

## Technical Specifications

- **Base Model**: Stable Diffusion V1.5 (UNet backbone)
- **VAE**: sd-vae-ft-mse
- **Image Encoder**: CLIP (from sd-image-variations-diffusers)
- **Audio Encoder**: wav2vec2-base-960h (Facebook)
- **Resolution**: 512×512
- **Key Dependencies**: PyTorch 2.0.1, Diffusers 0.24.0, xformers, ControlNet-Aux, MediaPipe, Gradio 4.24.0
- **Acceleration**: FILM-Net frame interpolation (film_net_fp16.pt)

## Use Cases

1. **Self-driven**: Reference image + pose video → animated portrait following the pose
2. **Face reenactment**: Reference image + source face video → reference person mimicking source expressions
3. **Audio-driven**: Reference image + audio → talking head video with natural lip sync and head movement

## Related Work (Acknowledged)

- EMO (HumanAIGC) - inspiration for demo content
- Moore-AnimateAnyone
- magic-animate
- AnimateDiff
- Open-AnimateAnyone

## HuggingFace

- Model weights: https://huggingface.co/ZJYang/AniPortrait/tree/main
- Online demo: https://huggingface.co/spaces/ZJYang/AniPortrait_official
