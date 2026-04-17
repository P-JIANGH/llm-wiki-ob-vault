# Qwen-Image — Raw Source

**Source:** https://github.com/QwenLM/Qwen-Image
**Extracted:** 2026-04-17

## Project Overview

Qwen-Image is a **20B MMDiT (Multi-Modal Diffusion Transformer) image foundation model** by Alibaba's Qwen team. It achieves significant advances in **complex text rendering** (especially Chinese) and **precise image editing**. Multiple model variants exist:

| Model | Purpose | Release Date |
|-------|---------|-------------|
| Qwen-Image | Text-to-Image (original) | 2025-08-04 |
| Qwen-Image-Edit | Image Editing (single image input) | 2025-08-18 |
| Qwen-Image-Edit-2509 | Image Editing (multi-image, improved consistency) | 2025-09-22 |
| Qwen-Image-Layered | Layered/transparent image generation | 2025-12-19 |
| Qwen-Image-2512 | Text-to-Image (improved realism, better text) | 2025-12-31 |
| Qwen-Image-Edit-2511 | Image Editing (character consistency, multi-person) | 2025-12-23 |
| Qwen-Image-2.0 | Next-gen: professional typography, 1k-token instructions, native 2K, unified gen+edit | 2026-02-10 |

## Key Capabilities

### Qwen-Image-2512 (T2I)
- Enhanced human realism — reduced "AI look", richer facial & age details
- Finer natural textures — sharper landscapes, water, fur, materials
- Stronger text rendering — better layout, higher accuracy in text-image composition
- Supports multiple aspect ratios: 1:1, 16:9, 9:16, 4:3, 3:4, 3:2, 2:3
- Max resolution: 1664x928 (16:9), native 2K support

### Qwen-Image-Edit-2511 (Editing)
- Character consistency — identity preservation through imaginative edits
- Multi-person consistency — fuse separate person images into coherent group shots
- Built-in community LoRA support (Lighting Enhancement, new viewpoints)
- Geometric reasoning — generate auxiliary construction lines for design
- Industrial design applications — batch product design, material replacement

### Qwen-Image-2.0 (Latest)
- Professional Typography Rendering — 1k-token instructions for PPTs, posters, comics
- Stronger Semantic Adherence — native 2K resolution for realistic scenes
- Improved Text Rendering — unified image generation and editing in single mode
- Lighter Model Architecture — smaller model size, faster inference

## Architecture

- **20B parameter** MMDiT architecture
- Uses **Qwen2.5-VL** text encoder (transformers >= 4.51.3)
- Integrated with HuggingFace **diffusers** library
- Supports **bfloat16** precision on CUDA, **float32** fallback for CPU
- `QwenImagePipeline` for T2I, `QwenImageEditPlusPipeline` for editing

## Code Structure

```
src/
├── examples/
│   ├── demo.py              # Multi-GPU Gradio web interface
│   ├── edit_demo.py          # Image editing demo
│   ├── generate_w_prompt_enhance.py  # T2I with prompt enhancement
│   └── tools/
│       ├── prompt_utils.py          # Prompt rewriting (Qwen-Plus)
│       └── prompt_utils_2512.py     # Enhanced prompt tools for 2512
```

## Key Files

- `src/examples/demo.py` — Multi-GPU parallel processing demo with Gradio web UI
  - `MultiGPUManager` class manages per-GPU workers with spawn-mode multiprocessing
  - Task queue + result queue architecture for high concurrency
  - Configurable via env vars: `NUM_GPUS_TO_USE`, `TASK_QUEUE_SIZE`, `TASK_TIMEOUT`
  - Automatic prompt optimization via `prompt_utils.rewrite()`
  - Aspect ratio presets: 1:1 (1328×1328), 16:9 (1664×928), etc.

- `src/examples/tools/prompt_utils.py` — Prompt enhancement utilities
  - `rewrite(prompt)` — T2I prompt optimization using Qwen-Plus
  - `polish_edit_prompt(prompt, image)` — Edit prompt polishing using Qwen-VL-Max

- `src/examples/generate_w_prompt_enhance.py` — Full pipeline with prompt enhance

- `src/examples/edit_demo.py` — Image editing with QwenImageEditPlusPipeline

## Deployment Options

### Direct diffusers usage
```python
from diffusers import QwenImagePipeline
pipe = QwenImagePipeline.from_pretrained("Qwen/Qwen-Image-2512", torch_dtype=torch.bfloat16)
```

### Multi-GPU API Server
```bash
export NUM_GPUS_TO_USE=4
export TASK_QUEUE_SIZE=100
cd src && DASHSCOPE_API_KEY=*** python examples/demo.py
```

### Community Support
- **SGLang-Diffusion**: Day-0 support for Qwen-Image models
- **WaveSpeedAI**: Cloud deployment on wavespeed.ai
- **LiblibAI**: Native community support
- **ModelScope/DiffSynth-Studio**: Low-VRAM inference (4GB), FP8 quantization, LoRA training
- **vLLM-Omni**: High-performance inference with long-sequence parallelism
- **cache-dit**: Cache acceleration (DBCache, TaylorSeer, Cache CFG)
- **ComfyUI**: Native ComfyUI support since 2025-08-05
- **LightX2V**: Diffusion distillation acceleration (25x DiT NFE reduction, 42.55x overall speedup)

## Evaluation

- **AI Arena** (aiarena.alibabainc.com): Elo-based blind comparison platform
- **T2I-CoreBench**: Comprehensive T2I evaluation in real-world scenarios
- Qwen-Image-2512 ranked as strongest open-source image model on AI Arena

## Benchmark Highlights

- Tested in 10,000+ blind rounds on AI Arena
- Qwen-Image-2512: strongest open-source image model, competitive with closed-source
- Strong Chinese text rendering — unique advantage among open models

## Licensing

**Apache 2.0** — fully open-source, commercial use allowed.

## Links

- GitHub: https://github.com/QwenLM/Qwen-Image
- HuggingFace (T2I): https://huggingface.co/Qwen/Qwen-Image
- HuggingFace (Edit): https://huggingface.co/Qwen/Qwen-Image-Edit-2511
- ModelScope (T2I): https://modelscope.cn/models/Qwen/Qwen-Image
- ModelScope (Edit): https://modelscope.cn/models/Qwen/Qwen-Image-Edit-2511
- Blog (T2I): https://qwenlm.github.io/blog/qwen-image/
- Blog (Edit): https://qwenlm.github.io/blog/qwen-image-edit-2511/
- Tech Report: https://arxiv.org/abs/2508.02324
- Paper: https://arxiv.org/abs/2512.15603
- Qwen Chat: https://chat.qwen.ai/
