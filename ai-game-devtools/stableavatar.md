---
title: StableAvatar
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [tool, open-source, avatar, video, audio]
sources: [raw/articles/ai-game-devtools/stableavatar.md]
---

# StableAvatar

**Infinite-Length Audio-Driven Avatar Video Generation**

## Overview

StableAvatar is the first end-to-end video diffusion transformer (DiT) capable of synthesizing infinite-length, identity-preserving avatar videos directly from a reference image and audio, without requiring any post-processing (no face-swapping or face restoration tools needed). Developed by Fudan University, Microsoft Research Asia, Xi'an Jiaotong University, and Tencent.

**Paper:** arXiv 2508.08248 (2025)
**GitHub:** https://github.com/Francis-Rings/StableAvatar
**HuggingFace:** [Model](https://huggingface.co/FrancisRing/StableAvatar) | [Demo](https://huggingface.co/spaces/YinmingHuang/StableAvatar)
**License:** Research use (weights on HuggingFace)

## Key Innovations

| Component | Purpose | How it works |
|-----------|---------|-------------|
| Time-step-aware Audio Adapter | Prevents error accumulation in long videos | Time-step-aware modulation instead of direct cross-attention injection |
| Audio Native Guidance | Enhances audio-visual synchronization | Uses diffusion's own evolving joint audio-latent prediction as dynamic guidance |
| Dynamic Weighted Sliding-window | Smooth infinite-length video generation | Fuses latent representations across temporal windows with dynamic weighting |

## Architecture & Technical Details

- **Backbone**: Wan2.1-1.3B Video Diffusion Transformer (DiT)
- **Audio Encoder**: Wav2Vec2.0 (wav2vec2-base-960h)
- **Reference Conditioning**: Wan2.1-Fun-V1.1-1.3B-InP (inpainting backbone)
- **Supported Resolutions**: 512×512, 480×832, 832×480
- **Two weight versions**: `transformer3d-square.pt` (512×512 training) and `transformer3d-rec-vec.pt` (mixed resolution training)

## Performance & Requirements

- **Inference speed**: ~3 minutes for 5s video (480×832, 25fps) on RTX 4090
- **VRAM**: ~18GB (full load) → ~3GB (sequential CPU offload, slower)
- **Training**: ~50GB VRAM (mixed-res), ~40GB (512×512 only); 4× A100 80G single machine or 64 GPUs multi-node
- **14B variant**: Available but authors note limited performance-to-resource efficiency vs 1.3B

## Key Features

- **No post-processing**: Direct synthesis — no FaceFusion, GFP-GAN, or CodeFormer needed
- **Infinite-length**: Theoretically capable of hours-long video; 3D VAE decoder is the memory bottleneck for 10k+ frames
- **Multi-modal support**: Speech, singing, and dancing from training data
- **LoRA training/finetuning**: Supported with configurable rank and network_alpha
- **Multi-GPU inference**: Ulysses + Ring parallel attention + optional FSDP
- **Community integrations**: ComfyUI node (3× faster), Gradio interface, HF Spaces demo

## Comparison with Peers

Compared to [[hallo]] and [[hallo2]], StableAvatar's key advantage is **infinite-length generation** via sliding-window latent fusion rather than fixed-length clip output. Unlike [[echomimic]] which uses SD v1.5 diffusion, StableAvatar uses a dedicated video DiT architecture (Wan2.1 backbone) with time-step-aware audio modulation to prevent the latent distribution drift that limits long-video quality in existing models. Compared to [[liveportrait]] (video-driven), StableAvatar is **audio-driven** — the driving signal is speech/music rather than a reference video.

## Training Data Pipeline

Dataset organized by resolution (square/rec/vec) × content type (speech/singing/dancing), with per-frame images, face masks, and lip masks. Includes vocal separation preprocessing (Kim_Vocal_2.onnx model) for cleaner audio conditioning.
