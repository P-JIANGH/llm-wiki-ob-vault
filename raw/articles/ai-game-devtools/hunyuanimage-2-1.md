# HunyuanImage-2.1 — Source Analysis

**Source:** https://github.com/Tencent-Hunyuan/HunyuanImage-2.1
**Date:** 2026-04-17
**Extracted from:** GitHub README (web extract — repo has no README.md file)

## Overview
HunyuanImage-2.1 is Tencent Hunyuan's open-source 17B parameter diffusion model for high-resolution (2K) text-to-image generation. It achieved Top 1 on Arena's leaderboard for open-source text-to-image models.

## Architecture
- **Two-stage diffusion pipeline:** Base/Distilled model → Refiner model
- **17B parameters** total
- **Native 2K resolution** output (2048×2048 for 1:1, 2560×1536 for 16:9)
- **MLLM + byT5 dual text encoders:** Qwen2.5-VL-7B-Instruct as MLLM + Glyph-SDXL-v2 (byT5)
- **DiT (Diffusion Transformer)** backbone with MMDoubleStreamBlock + MMSingleStreamBlock
- **Token Refiner** module for text conditioning
- **FP8 quantization** support for memory efficiency
- **CPU offloading** support for GPUs with limited VRAM

## Key Features
- Prompt enhancement crucial: longer, detailed prompts significantly improve output quality
- Reprompt model integration: PromptEnhancer-32B recommended as pre-processing step
- Two model variants: Base (undistilled, best quality) and Distilled (optimized for speed)
- Refiner stage for detail enhancement

## Model Variants
| Model | Steps | Guidance Scale | Shift | Description |
|-------|-------|----------------|-------|-------------|
| Base (hunyuanimage2.1) | 50 | 3.5 | 5 | Undistilled, best quality |
| Distilled (hunyuanimage2.1-distilled) | 8 | 3.25 | 4 | Speed-optimized |
| Refiner (hunyuanimage-refiner) | N/A | N/A | N/A | Post-generation detail enhancement |

## System Requirements
- Linux OS, NVIDIA GPU with CUDA
- Minimum **24 GB VRAM** (with CPU offloading + FP8)
- Dependencies: PyTorch ≥2.6.0, diffusers ≥0.32.0, transformers 4.56.0, Qwen-VL-Utils

## Checkpoints
- DiT + VAE: `tencent/HunyuanImage-2.1` on HuggingFace
- MLLM: `Qwen/Qwen2.5-VL-7B-Instruct` (open-source alternative for unreleased HunyuanMLLM)
- byT5: `google/byt5-small` + `AI-ModelScope/Glyph-SDXL-v2`
- Reprompt: `PromptEnhancer/PromptEnhancer-32B`
- HF Mirror available for China users: `HF_ENDPOINT=https://hf-mirror.com`

## Benchmarks
- **SSAE (Semantic Alignment):** 0.8888 mean accuracy — leads open-source, near GPT-Image (0.8952)
- **GSB (Human Preference):** vs Seedream 3.0: -1.36% (competitive with closed-source); vs Qwen-Image: +2.89%
- Arena leaderboard Top 1 for open-source text-to-image models

## Code Structure
```
hyimage/
├── models/
│   ├── hunyuan/modules/      # DiT core: hunyuanimage_dit.py (556 lines)
│   │   ├── models.py          # MMDoubleStreamBlock, MMSingleStreamBlock
│   │   ├── token_refiner.py   # SingleTokenRefiner
│   │   └── ...                # embed, activation, norm, pos layers
│   ├── vae/                   # VAE models (base + refiner)
│   ├── text_encoder/          # MLLM + byT5 text encoders
│   ├── reprompt/              # PromptEnhancer integration
│   └── model_zoo.py           # Config registry (LazyCall pattern)
├── diffusion/
│   ├── pipelines/             # HunyuanImage pipeline + Refiner pipeline
│   └── cfg_utils.py           # Classifier-free guidance utilities
└── common/                    # Config system (LazyCall), constants, prompt formatting
```

## License
Not explicitly stated in repository (no LICENSE file found). Check official project page for terms.

## Related Projects
- HunyuanImage-3.0 (successor): Native multimodal MoE architecture (80B total/13B active)
- Hunyuan DiT (1.5B): Earlier single-stage DiT model
- FLUX (Black Forest Labs): Competitor open-source image generation model
