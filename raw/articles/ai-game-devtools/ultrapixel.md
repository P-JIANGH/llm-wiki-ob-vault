# UltraPixel: Ultra-High-Resolution Image Synthesis (NeurIPS 2024)

**Source:** https://github.com/catcathh/UltraPixel
**Project Page:** https://jingjingrenabc.github.io/ultrapixel/
**Paper:** https://arxiv.org/abs/2407.02158
**Hugging Face:** https://huggingface.co/roubaofeipi/UltraPixel
**Demo:** https://huggingface.co/spaces/roubaofeipi/UltraPixel-demo

## Overview

UltraPixel pushes the boundaries of image generation by creating exceptionally high-quality, detail-rich images at ultra-high resolutions. Built upon StableCascade and Trans-inR, it supports text-to-image, personalized LoRA, and ControlNet workflows.

## Key Architecture

- **Foundation:** Built on [[ai-game-devtools/stable-cascade]] (StableCascade) and Trans-inR
- **Stage C:** Text-to-image generation (big or small model, bfloat16 recommended)
- **Stage B:** Upscaling/refinement stage
- **Stage A:** Final decoding with optional tiled decoding for memory optimization
- **small-big configuration:** Recommended (small model for Stage B, big model for Stage C in bfloat16) for optimal efficiency
- **big-big configuration:** Also supported for maximum quality

## Features

### Text-to-Image Generation
- Gradio UI: `CUDA_VISIBLE_DEVICES=0 python app.py`
- CLI: `CUDA_VISIBLE_DEVICES=0 python inference/test_t2i.py`
- Prompting strategy: detailed descriptions + quality modifiers ("high quality", "rich detail", "8k", "photo-realistic", "cinematic", "perfection")

### Personalized Generation (LoRA)
- LoRA personalization support
- Custom identifier pattern: `cat [roubaobao]`
- Training: `CUDA_VISIBLE_DEVICES=0,1 python train/train_personalized.py`

### ControlNet Generation
- Canny ControlNet support
- Max resolution without fine-tuning: 4K (3840×2160, 2048×2048)
- `CUDA_VISIBLE_DEVICES=0 python inference/test_controlnet.py`

## Hardware Performance

| GPU | Resolution | Stage C | Stage B | Stage A (tiled) |
|---|---|---|---|---|
| A100 (80GB) | 2048×2048 | 15.9G/12s | 14.5G/4s | 11.2G/1s |
| A100 (80GB) | 4096×4096 | 18.7G/52s | 19.7G/26s | 9.3G/128s |
| V100 (32GB)* | 2048×2048 | 16.7G/83s | 11.7G/22s | 10.1G/2s |
| RTX 4090 (24GB) | 2048×2048 | 15.5G/83s | 13.2G/22s | 11.3G/1s |
| RTX 4090 (24GB) | 4096×4096 | 19.9G/153s | 23.4G/44s | 11.3G/114s |

*V100 requires float32 for Stage C & B

## Memory Optimization
- `--stage_a_tiled`: Highly recommended for Stage A at 4K resolution on GPUs ≤40GB VRAM
- Without tiled decoding at 4096×4096: OOM on most GPUs

## Training Workflows
- **T2I:** Multi-GPU training via `CUDA_VISIBLE_DEVICES=0,1,2,3,4,5,6,7 python train/train_t2i.py`
- **LoRA Personalization:** `CUDA_VISIBLE_DEVICES=0,1 python train/train_personalized.py`

## License
Not explicitly stated in README. Academic/research use.

## Last Updated
2024/09/26
