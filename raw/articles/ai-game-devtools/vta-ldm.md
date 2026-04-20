# VTA-LDM: Video-to-Audio Generation with Hidden Alignment

## Source
- GitHub: https://github.com/ariesssxu/vta-ldm
- Paper: https://arxiv.org/abs/2407.07464
- Extracted: 2026-04-21 (web extract; GitHub/gitcode/gitee clone all failed)

## Project Overview
- **Title:** Video-to-Audio Generation with Hidden Alignment
- **Authors:** Manjie Xu, Chenxing Li, Yong Ren, Rilin Chen, Yu Gu, Wei Liang, Dong Yu (Tencent AI Lab)
- **Objective:** Generate semantically and temporally aligned audio from video inputs
- **License:** Not explicitly stated in README
- **Commits:** 8 on main branch

## Architecture
- Built on latent diffusion model (LDM) architecture
- Video encoder extracts visual features for audio generation conditioning
- Hidden alignment mechanism for temporal synchronization between video and generated audio
- Uses CLIP4CLIP for video feature extraction

## Key Components
- **audioldm/** — Model architecture (built upon AudioLDM codebase)
- **configs/** — Configuration files for training and inference
- **models.py** — Core model definition
- **train.py / train.sh** — Training pipeline (accelerate framework)
- **inference_from_video.py** — Video-to-audio inference script
- **tools/** — Utilities (data_tools.py for preprocessing, merge_video_audio.sh for ffmpeg merge)

## Training
- Framework: accelerate for distributed training
- Data format: JSONL with video_path, audio_file (mandatory), feature_file, description (optional)
- Hardware: ~3 days on 8x NVIDIA A100 GPUs
- Key optimization: Pre-extract key frames before training to avoid I/O bottleneck

## Inference
- Input: videos in data/ directory
- Output: generated audio, mergeable with original video via ffmpeg
- Checkpoints available on HuggingFace: ariesssxu/vta-ldm-clip4clip-v-large

## Dependencies
- Built upon: diffusers, Tango (declare-lab/tango), AudioLDM (haoheliu/AudioLDM)
- Python 3.10, conda environment

## Notable Notes
- "This is not an official product by Tencent Ltd."
- I/O bottleneck warning: pre-extract key frames before training
