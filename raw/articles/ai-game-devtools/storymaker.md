# StoryMaker — towards consistent characters in text-to-image generation

Source: https://github.com/RedAIGC/StoryMaker

## Overview

StoryMaker is a personalization solution that preserves not only the consistency of faces but also clothing, hairstyles and bodies in multi-character scenes, enabling the potential to make a story consisting of a series of images.

Technical Report: https://arxiv.org/pdf/2409.12576
Model Weights: https://huggingface.co/RED-AIGC/StoryMaker

## Key Architecture

- **Base Model**: Stable Diffusion XL (SDXL) pipeline, extended with custom adapter
- **Face Encoder**: InsightFace (buffalo_l model) for face detection and embedding extraction
- **IP-Adapter Integration**: Custom `faceid_plus` module combining:
  - Face ID embeddings (512-dim from InsightFace) → MLP projection → 4 tokens
  - CLIP ViT-H-14 visual embeddings → Resampler → 16 tokens
  - Positional embeddings for up to 3 persons + background
  - Cross-attention injection into UNet via LoRA-IP attention processors
- **Attention Mechanism**: Custom `LoRAIPAttnProcessor2_0` and `LoRAAttnProcessor2_0` for self/cross attention modification
- **Multi-character Support**: Accepts up to 3 reference images with individual masks and face info

## Pipeline: StableDiffusionXLStoryMakerPipeline

Inherits from `diffusers.StableDiffusionXLPipeline`. Key additions:
- `load_storymaker_adapter()`: Loads face adapter + CLIP image encoder + Resampler
- Accepts `image`, `mask_image`, `face_info` for first character
- Accepts `image_2`, `mask_image_2`, `face_info_2` for second character
- Accepts `cloth` for clothing transfer
- `ip_adapter_scale` and `lora_scale` control identity/clothing strength

## Training

- Uses Accelerate for distributed training
- Loss: Standard diffusion denoising loss with face ID + CLIP visual conditioning
- Data: Custom `mp_dataset.py` providing image pairs, face embeddings, CLIP images, masks, keypoints
- Training script: `train_storymaker.py` (872 lines)

## Usage Examples

1. **Single Portrait**: Reference face + mask → generate in new scenes
2. **Two Portraits**: Two reference faces → generate together in same scene
3. **Clothing Swap**: Reference face + separate clothing image → generate with swapped clothes

## Dependencies

```
opencv-python, transformers, accelerate, insightface, diffusers, pillow-heif
```

Base model: `huaquan/YamerMIX_v11` (Civitai)
CLIP encoder: `laion/CLIP-ViT-H-14-laion2B-s32B-b79K`

## License

Apache License 2.0 (pipeline file header confirms)

## Timeline

- 2024/09/02: Model weights released on HuggingFace
- 2024/09/20: Technical report published (arXiv 2409.12576)
- 2024/11/09: Training code released

## Key Files

| File | Purpose |
|------|---------|
| `pipeline_sdxl_storymaker.py` (680 lines) | Custom SDXL pipeline with StoryMaker adapter |
| `ip_adapter/faceid_plus.py` | Face ID + CLIP fusion module (position-aware for multi-character) |
| `ip_adapter/attention_processor_faceid.py` | LoRA-based IP attention processors |
| `ip_adapter/resampler.py` | Perceiver Attention + FeedForward resampler |
| `infer.py` (141 lines) | Inference demos (single/two/clothing swap) |
| `train_storymaker.py` (872 lines) | Distributed training script |
| `train.sh` | Training launch script |
| `mp_dataset.py` | Multi-person dataset loader |
