# HuMo: Human-Centric Video Generation via Collaborative Multi-Modal Conditioning

**Source URL:** https://github.com/Phantom-video/HuMo
**arXiv:** https://arxiv.org/abs/2509.08519
**Project Page:** https://phantom-video.github.io/HuMo/
**Extracted:** 2026-04-20

## Overview
HuMo is a unified framework for generating high-quality, fine-grained, and highly controllable human-centric videos. Developed by Tsinghua University and ByteDance's Intelligent Creation Team.

## Key Features
- **Unified Framework:** Generates high-quality, fine-grained, and highly controllable human-centric videos.
- **Multi-Modal Conditioning:** Seamlessly integrates **text, images, and audio** as input signals.
- **Core Capabilities:** 
  - Strong text prompt adherence
  - Consistent subject identity preservation across frames
  - Synchronized, audio-driven motion generation

## Architecture & Models
- **HuMo-17B:** Main model supporting 480P & 720P resolution
- **HuMo-1.7B:** Lightweight variant (runs on 32G GPU)
- **HuMo-Longer:** Extended generation capability (released Oct 2025)
- **Dependencies:** Built on Wan2.1 (VAE & Text encoder), Whisper-large-v3 (Audio encoder), and Audio Separator (optional background noise removal)

## Quickstart
```bash
conda create -n humo python=3.11
conda activate humo
pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1 --index-url https://download.pytorch.org/whl/cu124
pip install flash_attn==2.6.3
pip install -r requirements.txt
conda install -c conda-forge ffmpeg
```

## Supported Input Pipelines
1. `Text + Audio` → Video
2. `Text + Image + Audio` → Video

## Resolution
Supports 480P and 720P. 720P strongly recommended for significantly higher output quality.

## Configuration
Customize generation length, resolution, and modality weighting via: `humo/configs/inference/generate.yaml`

## HuMoSet Dataset
- Purpose: Stage 2 training, adaptable for fine-tuning existing video foundation models
- Structure: video/, reference_image/, video_caption.parquet
- Access: ModelScope (leoniuschen/HuMoSet)

## Acknowledgements
Built upon and inspired by: Wan2.1, Phantom, SeedVR, MEMO, Hallo3, OpenHumanVid, OpenS2V-Nexus, ConsisID, Qwen2.5-VL, and Whisper.

## Authors
Liyang Chen*, Tianxiang Ma*, Jiawei Liu, Bingchuan Li†, Zhuowei Chen, Lijie Liu, Xu He, Gen Li, Qian He, Zhiyong Wu§
- Institutions: Tsinghua University | ByteDance Intelligent Creation Team
- * Equal contribution | † Project lead | § Corresponding author

## Citation
arXiv: 2509.08519
