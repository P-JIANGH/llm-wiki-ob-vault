---
title: OneLLM
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/onellm.md]
---

# OneLLM

OneLLM (One Framework to Align All Modalities with Language) is a CVPR 2024 unified multimodal framework that aligns **8 modalities** with language via a single LLM backbone. Developed by Han et al.

## Overview

OneLLM-7B uses LLaMA-2 7B as the backbone and connects modality-specific encoders to the LLM. The key innovation is a unified encoding pipeline that handles image, video, audio, point cloud, depth, normal map, IMU sensor data, and fMRI brain signals — all through language-aligned representations.

## Architecture

- **Modality Encoders**: ImageBind (for 6 modalities) + dedicated IMU/fMRI encoders
- **Unified Projection**: All modality embeddings projected into LLaMA-2's embedding space
- **Three-Stage Pretraining**:
  1. Image-text pretraining
  2. Multimodal-text pretraining (video-audio-point-text)
  3. Depth-normal-IMU-fMRI-text pretraining
- **Instruction Tuning**: Multimodal instruction tuning on curated datasets

## Supported Modalities

| Modality | Encoder | Pretraining | Finetuning |
|---|---|---|---|
| Image | ImageBind | LAION-400M | LLaVA-mix665K |
| Video | ImageBind | WebVid-2.5M | MSRVTT |
| Audio | ImageBind | WavCaps | AudioCaps |
| Point | PointNet++ | Cap3D | PointLLM |
| Depth | DPT | CC3M | LLaVA-150K |
| Normal | DPT | CC3M | LLaVA-150K |
| IMU | Invariant | Ego4D | Ego4D |
| fMRI | MLP | NSD | NSD |

## Key Facts

- **Paper**: [arXiv:2312.03700](https://arxiv.org/abs/2312.03700)
- **Accepted**: CVPR 2024
- **Model**: [csuhan/OneLLM-7B](https://huggingface.co/csuhan/OneLLM-7B)
- **License**: LLaMA 2 Community License
- **Demos**: HuggingFace Spaces, CLI, Gradio

## Comparison

- vs [[OmniLMM]]: OneLLM focuses on more modalities (8 vs 4) but lacks speech output; OmniLMM has real-time streaming and voice capabilities
- vs [[ImageBind]]: ImageBind is the encoder backbone OneLLM uses; OneLLM adds the LLM alignment layer on top
- vs [[LLaVA]]: LLaVA handles image-text only; OneLLM unifies 8 modalities

## Related Pages

- [[omnilmm]] — OpenBMB's omni-modal model with speech and streaming
- [[cambrian-1]] — Another multi-encoder VLM
- [[mplug-owl]] — Alibaba's multimodal LLM series
