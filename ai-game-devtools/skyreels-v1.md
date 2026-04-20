---
title: SkyReels V1
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, open-source, ai-model, diffusion, tool]
sources: [raw/articles/ai-game-devtools/skyreels-v1.md]
---

# SkyReels V1

## Overview
SkyReels V1 is an open-source human-centric video foundation model by **SkyworkAI** (昆仑万维/Skywork). Released February 2025, it fine-tunes [[hunyuanvideo-1-5]] on O(10M) film/TV clips to produce both **Text-to-Video** (T2V) and **Image-to-Video** (I2V) outputs at 544p/97 frames/24fps.

Achieves **SOTA among open-source T2V models** with VBench overall score of 82.43, comparable to proprietary models like Kling and Hailuo.

## Key Features

### Data Pipeline
- **Facial expression classification**: 33 distinct emotion types
- **Character spatial awareness**: 3D human reconstruction for multi-person positioning
- **Action recognition**: 400+ action semantic units
- **Scene understanding**: Cross-modal correlation analysis of clothing, scenes, plots

### Training (3-Stage)
1. **Domain transfer**: Adapt HunyuanVideo T2V model on film/TV dataset
2. **I2V conversion**: Adjust conv-in parameters to enable image-to-video
3. **Fine-tuning**: High-quality curated subset for superior output

## SkyReelsInfer Framework
The project includes **SkyReelsInfer**, a high-efficiency inference framework:

- **Multi-GPU parallelism**: Context Parallel + CFG Parallel + VAE Parallel (1-8 GPUs)
- **Consumer GPU support**: FP8 quantization + model offload enables RTX 4090 deployment (18.5G VRAM peak)
- **Performance**: 58.3% lower latency vs HunyuanVideo XDiT (293.3s vs 464.3s on 4x RTX 4090)
- **Built on Diffusers**: Non-intrusive parallel implementation for usability

## Technical Architecture

### Core Modules
| Module | File | Description |
|--------|------|-------------|
| Inference Engine | `skyreels_video_infer.py` | SkyReelsVideoInfer class, handles T2V/I2V |
| Offloading | `offload.py` | OffloadConfig: high_cpu_memory, parameters_level, compiler_transformer |
| Pipeline | `pipelines/pipeline_skyreels_video.py` | Video generation diffusion pipeline |

### Key Dependencies
- PyTorch 2.5.1 + xformers 0.0.29
- Diffusers (specific commit), Transformers 4.46.3
- **Quantization**: optimum[quanto], bitsandbytes 0.45.0, torchao 0.7.0
- **Attention optimization**: sageattention 1.0.6, ParaAttention

### Usage Requirements
- Python 3.10, CUDA 12.2
- Prompts must start with `"FPS-24, "` (MovieGen-style FPS control)
- Recommended resolution: 544x960 (9:16), 960x544 (16:9), 720x720 (1:1), all at 97 frames

## Benchmark Results (VBench 540p)

| Model | Overall | Quality | Dynamic Degree | Multi-Object |
|-------|---------|---------|----------------|--------------|
| **SkyReels V1** | **82.43** | **84.62** | **72.5** | **71.61** |
| VideoCrafter-2.0 | 82.24 | 83.54 | 63.89 | 68.84 |
| CogVideoX1.5-5B | 82.17 | 82.78 | 50.93 | 69.65 |
| HunyuanVideo 540P | 81.23 | 83.49 | 51.67 | 70.45 |
| OpenSora V1.3 | 77.23 | 80.14 | 30.28 | 43.58 |

## Related Projects
- **[[skyreels-a1]]**: Sister project — open-sourced portrait image animation model
- **[[hunyuanvideo-1-5]]**: Base model that SkyReels V1 is fine-tuned from
- **[[open-sora]]**: Another open-source video generation model (lower performance)

## License & Links
- **License**: Apache-2.0
- **GitHub**: https://github.com/SkyworkAI/SkyReels-V1
- **HuggingFace T2V**: https://huggingface.co/Skywork/SkyReels-V1-Hunyuan-T2V
- **HuggingFace I2V**: https://huggingface.co/Skywork/SkyReels-V1-Hunyuan-I2V
- **Playground**: https://www.skyreels.ai/home

## Roadmap (from TODO)
- [ ] Prompt Rewrite & Guidance
- [ ] CFG-distilled Model
- [ ] Lite Model
- [ ] 720P Version
- [ ] ComfyUI integration
