# RPG-DiffusionMaster — Raw Source

**Source**: https://github.com/YangLing0818/RPG-DiffusionMaster
**Captured**: 2026-04-17
**Paper**: "Mastering Text-to-Image Diffusion: Recaptioning, Planning, and Generating with Multimodal LLMs" (ICML 2024)
**Authors**: Ling Yang, Zhaochen Yu, Chenlin Meng, Minkai Xu, Stefano Ermon, Bin Cui
**Affiliations**: Peking University, Stanford University, Pika Labs

## Abstract

RPG is a training-free paradigm that utilizes proprietary MLLMs (GPT-4, Gemini-Pro) or open-source local MLLMs (miniGPT-4) as the prompt recaptioner and region planner with complementary regional diffusion to achieve SOTA text-to-image generation and editing. The framework is flexible and can generalize to arbitrary MLLM architectures and diffusion backbones.

## Key Updates

- **[2025.2]** Enhanced with DeepSeek-R1, OpenAI o3-mini, and o1 for reasoning; integrated IterComp diffusion backbone for compositional image generation
- **[2024.10]** Integrated IterComp as composition-aware backbone, improving compositional generation without extra computational costs
- **[2024.4]** Updated to diffusers-based codebase, supports both ckpts and diffusers diffusion models
- **[2024.1]** Initial release supporting SDXL, SD v2.0/2.1, SD v1.4/1.5 backbones

## Architecture

### Core Components

1. **MLLM Module** (`mllm.py`): Supports GPT-4 (via API) and local LLMs (Llama-2-13b-chat). Takes a text prompt, uses Chain-of-Thought reasoning + in-context examples to output split ratios and regional prompts.

2. **Regional Diffusion Pipeline** (`RegionalDiffusion_base.py`): Custom diffusers pipeline for base models (SD v1.4/1.5/2.0/2.1). Implements region-specific attention through cross-attention hooks (`cross_attention.py`).

3. **Regional Diffusion XL Pipeline** (`RegionalDiffusion_xl.py`): SDXL-specific variant with similar regional attention mechanism.

4. **Matrix Manager** (`matrix.py`): Handles split ratio computation and region mapping for the regional diffusion process.

5. **Cross Attention Hooks** (`cross_attention.py`): Modifies the attention mechanism to apply different prompts to different spatial regions of the image.

### How It Works

1. User provides a text prompt describing a complex scene
2. MLLM (GPT-4 or local) analyzes the prompt and outputs:
   - `Final split ratio`: How to divide the image into regions (e.g., "1:2:1" for 4 regions)
   - `Regional Prompt`: Comma-separated prompts for each region
3. The regional diffusion pipeline applies different prompts to different spatial regions during the denoising process
4. A base prompt + base ratio can be used for entities of the same class

### Key Parameters

- `base_prompt`: Summary prompt for entities of the same class (e.g., "two girls")
- `base_ratio`: Weight of base prompt (recommended: 0.35-0.55)
- `split_ratio`: Image region division ratios
- `regional_prompt`: Region-specific sub-prompts

### Supported Backbones

- SDXL, SDXL-Turbo
- SD v1.4/1.5, SD v2.0/2.1
- Playground v2
- AlbedoBase XL, DreamShaper XL (photorealistic)
- IterComp (composition-aware, recommended for 2024.10+)
- CIVITAI community models

### Supported MLLMs

- GPT-4 / GPT-4o (API, recommended)
- Gemini-Pro (API)
- DeepSeek-R1, OpenAI o3-mini, o1 (2025.2 update)
- miniGPT-4 (local)
- Llama-2-13b-chat, Llama-2-70b-chat (local)

### Dependencies

- Python 3.9, PyTorch 2.2.2, diffusers 0.27.2, transformers 4.39.3
- xformers 0.0.25 for memory-efficient attention
- Minimum VRAM: 10GB with GPT-4 API, more for local LLMs

### ControlNet Integration

RPG works with ControlNet for pose, depth, and edge-conditioned regional generation.

### License

Apache 2.0 (LICENSE file)
