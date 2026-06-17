# USO — Unified Style and Subject-Driven Generation via Disentangled and Reward Learning

**Source:** https://github.com/bytedance/USO (mirrored from https://gitee.com/bytedance/USO)
**Date:** 2026-04-18
**Authors:** Shaojin Wu, Mengqi Huang, Yufeng Cheng, Wenxu Wu, Jiahe Tian, Yiming Luo, Fei Ding, Qian He
**Organization:** UXO Team, Intelligent Creation Lab, ByteDance

## Overview

USO (Unified Style driven and subject-driven GeneratiOn) is an image generation framework that unifies style-driven and subject-driven generation into a single model. Built on the FLUX architecture, it treats both tasks as disentanglement and re-composition of "content" and "style".

## Key Features

### 1. Triplet Dataset Construction
Large-scale triplet dataset: content images + style images + stylized content images.

### 2. Disentangled Learning Scheme
- **Style-Alignment Training:** Aligns style features between generated and reference style images
- **Content-Style Disentanglement Training:** Separates content from style representations

### 3. Style Reward-Learning Paradigm
Incorporates reward learning to further enhance style fidelity.

### 4. Supported Generation Modes
- **Subject/Identity-driven:** Place a subject into new scenes using natural language prompts
- **Style-driven:** Generate images matching uploaded style reference(s)
- **Style-Subject combined:** Stylize a content reference with one or two style references
- **Layout-preserved:** Set prompt to empty for style transfer keeping original layout
- **Layout-shifted:** New prompt + style references
- **Multi-style:** Combine multiple style references

## Technical Architecture

### Base Model
- Built on **FLUX** (flux-dev, flux-dev-fp8, flux-schnell variants)
- Uses SigLIP (google/siglip-so400m-patch14-384) as vision encoder for style feature extraction
- LoRA-based adaptation (rank=128, configurable)

### Inference Pipeline (`uso/flux/pipeline.py`)
- `USOPipeline` class handles the full generation pipeline
- `preprocess_ref()` for content reference preprocessing
- Multi-GPU support via `accelerate`

### Key Modules
```
uso/flux/
├── pipeline.py      # Main USOPipeline class
├── model.py         # Model architecture
├── sampling.py      # Sampling logic
├── math.py          # Mathematical utilities
├── util.py          # Utility functions
└── modules/
    ├── conditioner.py  # Conditioning modules
    ├── autoencoder.py  # VAE components
    └── layers.py       # Network layers
```

### Dependencies
- PyTorch 2.4.0, CUDA 12.4
- diffusers 0.30.1, transformers 4.43.3
- accelerate 1.1.1, deepspeed 0.14.4
- gradio 5.22.0 (demo)
- CLIP (openai/CLIP)
- SigLIP vision model

## Hardware Requirements
- Standard mode: ~24GB VRAM
- FP8 mode (--offload --model_type flux-dev-fp8): ~16GB VRAM (single reference) to ~18GB (multi reference)
- Python 3.10-3.12

## ComfyUI Integration
- Native support added 2025-09-03
- Requires ComfyUI >= 0.3.57
- Provided workflow examples in `./workflow/` directory (6 example workflows)
- Compatible with ControlNet, LoRA, and other ComfyUI plugins

## CLI Usage
```bash
# Subject-driven
python inference.py --prompt "The man in flower shops..." --image_paths "identity1.jpg"

# Style-driven (first image path empty)
python inference.py --prompt "A cat sleeping." --image_paths "" "style1.webp"

# Style + Subject combined
python inference.py --prompt "The woman gave an impassioned speech..." --image_paths "identity2.webp" "style2.webp"

# Low VRAM mode
python inference.py --prompt "your prompt" --image_paths "your_image.jpg" --offload --model_type flux-dev-fp8
```

## Links
- Paper: https://arxiv.org/abs/2508.18966
- Project Page: https://bytedance.github.io/USO/
- HuggingFace Model: https://huggingface.co/bytedance-research/USO
- HuggingFace Demo: https://huggingface.co/spaces/bytedance-research/USO
- ComfyUI Tutorial: https://docs.comfy.org/tutorials/flux/flux-1-uso
- Related: [UMO](https://github.com/bytedance/UMO) (multiple identities, successor)

## License
Apache 2.0 (code). Base model weights may have separate licensing.

## Timeline
- 2025.08.27: Technical report, inference code, model checkpoints, project page released
- 2025.08.28: HuggingFace demo released, FP8 mode added (~16GB VRAM)
- 2025.09.03: Native ComfyUI support added
- 2025.09.12: Successor UMO released (multi-identity focus)

## Notes
- Training code and dataset not yet open-sourced (planned)
- Uses `.env` file for weight paths (no auto-download by default)
- Supports both LoRA-only mode and full model mode
