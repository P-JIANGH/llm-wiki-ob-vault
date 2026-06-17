---
title: StoryMaker
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [image-generation, diffusion, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/storymaker.md]
---

# StoryMaker

**StoryMaker: Towards consistent characters in text-to-image generation**

- **GitHub:** https://github.com/RedAIGC/StoryMaker
- **arXiv:** https://arxiv.org/pdf/2409.12576
- **HuggingFace:** https://huggingface.co/RED-AIGC/StoryMaker
- **License:** Apache 2.0
- **Organization:** RED-AIGC (RED: Re-imagined Experience Design)

## Overview

StoryMaker is a personalization solution for **character consistency** in text-to-image generation. Unlike face-only identity preservation methods, StoryMaker maintains consistency of faces, clothing, hairstyles, and bodies across multiple characters in the same scene — enabling sequential image storytelling.

## Architecture

- **Base:** StableDiffusionXLPipeline (diffusers), built on SDXL
- **Face Encoder:** InsightFace (buffalo_l) — face detection + 512-dim embeddings
- **Adapter:** Custom `faceid_plus` module fusing:
  - InsightFace ID embeddings → MLP → 4 tokens
  - CLIP ViT-H-14 visual features → Resampler (Perceiver Attention) → 16 tokens
  - Positional embeddings supporting up to **3 persons + background**
- **Attention Injection:** LoRA-IP attention processors (`LoRAIPAttnProcessor2_0`) injected into UNet cross-attention layers
- **Multi-Character Input:** Each character accepts separate `image`, `mask_image`, `face_info` parameters

## Key Features

| Feature | Description |
|---------|-------------|
| Single Portrait | Generate consistent character in new scenes from one reference photo |
| Two Portraits Synthesis | Place two consistent characters together in the same generated scene |
| Clothing Transfer | Swap clothing between reference images while preserving face identity |
| Story Series | Generate a sequence of images telling a story with consistent characters |

## Usage

```python
from pipeline_sdxl_storymaker import StableDiffusionXLStoryMakerPipeline

pipe = StableDiffusionXLStoryMakerPipeline.from_pretrained(
    'huaquan/YamerMIX_v11', torch_dtype=torch.float16
)
pipe.cuda()
pipe.load_storymaker_adapter(
    'laion/CLIP-ViT-H-14-laion2B-s32B-b79K',
    './checkpoints/mask.bin',
    scale=0.8, lora_scale=0.8
)
# Generate with face image, mask, and face_info from InsightFace
output = pipe(image=face_image, mask_image=mask_image, face_info=face_info,
              prompt=prompt, ip_adapter_scale=0.8, lora_scale=0.8,
              num_inference_steps=25, guidance_scale=7.5)
```

## Dependencies

- `diffusers`, `transformers`, `accelerate`, `insightface`, `opencv-python`
- Base model: YamerMIX v1.1 (Civitai)
- CLIP encoder: laion/CLIP-ViT-H-14-laion2B-s32B-b79K

## Related

- Closely inspired by [[instantid]] (zero-shot identity preservation) and [[pulid]] (contrastive alignment for identity)
- Uses IP-Adapter pattern for cross-attention injection
- Extends SDXL with LoRA-based identity adapters, similar approach to [[controlnet]] conditional generation

## Timeline

- **2024-09-02:** Model weights released on HuggingFace
- **2024-09-20:** Technical report published (arXiv 2409.12576)
- **2024-11-09:** Training code released
