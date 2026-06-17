---
title: Tora — Trajectory-oriented Diffusion Transformer for Video Generation
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/tora.md]
---

# Tora

**Trajectory-oriented Diffusion Transformer for Video Generation**

CVPR'25 | Alibaba Research (ali-videoai)

## Overview

Tora is the **first trajectory-oriented DiT (Diffusion Transformer) framework** for controllable video generation. It concurrently integrates textual, visual, and trajectory conditions, allowing users to control the motion dynamics of generated videos through input trajectory paths.

## Key Architecture

Tora consists of three core components:

| Component | Function |
|-----------|----------|
| **Trajectory Extractor (TE)** | Encodes arbitrary trajectories into hierarchical spacetime motion patches using a 3D video compression network |
| **Spatial-Temporal DiT** | Core diffusion transformer backbone for video synthesis |
| **Motion-guidance Fuser (MGF)** | Injects motion patches into DiT blocks to ensure generated videos strictly follow input trajectories |

## Capabilities

- **Text-to-Video (T2V):** Generate videos from text prompts with trajectory-guided motion control
- **Image-to-Video (I2V):** Animate static images following specified trajectories
- **Scalable:** Supports diverse durations, aspect ratios, and resolutions
- **High motion fidelity:** Precisely simulates physical world movement patterns

## Technical Details

- **Base framework:** Built on [[cogvideox]] (CogVideoX)
- **Python:** 3.10–3.12
- **GPU requirements:** ~30 GiB inference, ~60 GiB training (A100)
- **Trajectory canvas:** 256×256 for input coordinates
- **Weights available:** HuggingFace, ModelScope
- **License:** CogVideoX License

## Related Tools

- [[cogvideox]] — Tora is built on CogVideoX as its base framework
- [[hunyuan-video]] — Another DiT-based video generation model from Tencent
- [[open-sora]] — Open-source Sora-like video generation
- [[animatediff]] — Diffusion-based animation generation tool

## Links

- [GitHub](https://github.com/ali-videoai/Tora)
- [Paper (ArXiv)](https://arxiv.org/abs/2407.21705)
- [Project Page](https://ali-videoai.github.io/tora_video/)
- [Demo (ModelScope ZH)](https://www.modelscope.cn/studios/xiaoche/Tora)
- [Demo (ModelScope EN)](https://www.modelscope.cn/studios/Alibaba_Research_Intelligence_Computing/Tora_En)
- [Weights (HuggingFace)](https://huggingface.co/Alibaba-Research-Intelligence-Computing/Tora)
