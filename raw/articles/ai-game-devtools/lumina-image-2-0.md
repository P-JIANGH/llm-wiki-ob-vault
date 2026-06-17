# Lumina-Image 2.0 — Raw Source

**Source**: https://github.com/Alpha-VLLM/Lumina-Image-2.0
**Captured**: 2026-04-17
**License**: Apache 2.0

## README Summary

Lumina-Image 2.0: A Unified and Efficient Image Generative Framework

- **Organization**: Alpha-VLLM Group (Shanghai AI Lab, University of Sydney, Shanghai AI Laboratory, CUHK, SJTU)
- **Paper**: arXiv 2503.21758, accepted by ICCV 2025
- **Model Size**: 2.6B parameters
- **Resolution**: 1024x1024
- **Text Encoder**: Gemma-2-2B (Google)
- **VAE**: FLUX-VAE-16CH (Black Forest Labs)
- **Checkpoints**: HuggingFace (Alpha-VLLM/Lumina-Image-2.0)

## Architecture

Core model files:
- `models/model.py` (930 lines) — Main DiT (Diffusion Transformer) architecture
  - TimestepEmbedder: sinusoidal frequency embedding → MLP
  - PatchEmbed: 2D image patching for transformer input
  - FinalLayer: adaptive normalization + output projection
  - Uses Flash Attention (flash_attn_varlen_func) for efficient attention
  - RMSNorm normalization (with apex FusedRMSNorm fallback)
  - modulate() function for adaptive layer norm conditioning
- `models/components.py` (54 lines) — RMSNorm implementation
- `models/__init__.py` — Module exports

Additional modules:
- `transport/` — ODE transport solver (for diffusion sampling)
- `util/` — Utility functions
- `configs/` — Configuration files (data.yaml etc.)
- `scripts/` — Training/inference shell scripts

## Key Features

1. **Multiple Solvers**: Midpoint, Euler, DPM Solver for inference
2. **Gradio Demo**: Interactive web UI (demo.py)
3. **Diffusers Integration**: Lumina2Pipeline in HuggingFace Diffusers
4. **ComfyUI Support**: Officially supported by ComfyUI Org
5. **LoRA Fine-tuning**: DreamBooth LoRA script via Diffusers
6. **Flash Attention 2.7.4**: GPU-optimized attention
7. **Multi-image generation**: Unified multi-image output
8. **Control**: ControlNet-style conditioning

## Dependencies (requirements.txt)

- diffusers, fairscale, accelerate, tensorboard
- transformers, gradio, torchdiffeq, click, torchvision
- flash-attention (external wheel, v2.7.4.post1)

## Inference

### Gradio Demo
```bash
python demo.py --ckpt /path/to/ckpt --res 1024 --port 10010 --hf_token xxx
```

### Diffusers Pipeline
```python
from diffusers import Lumina2Pipeline
pipe = Lumina2Pipeline.from_pretrained("Alpha-VLLM/Lumina-Image-2.0", torch_dtype=torch.bfloat16)
```

### Batch Inference
```bash
bash scripts/sample.sh
```

## Fine-tuning

Data format: JSON with `image_path` and `prompt` fields.
```bash
bash scripts/run_1024_finetune.sh
```

## Demos

- Huiying: https://magic-animation.intern-ai.org.cn/image/create
- Gradio: http://47.100.29.251:10010/
- HuggingFace Space: https://huggingface.co/spaces/Alpha-VLLM/Lumina-Image-2.0

## Timeline

- 2025-01-25: Initial release (checkpoints, fine-tuning, inference)
- 2025-01-31: Latest .pth weights released
- 2025-02-05: ComfyUI support added
- 2025-02-10: HF Space live; Lumina-Video 1.0 announced
- 2025-02-12: Diffusers integration
- 2025-02-20: Diffusers LoRA fine-tuning script
- 2025-03-28: Tech report (arXiv 2503.21758)
- 2025-04-21: Lumina-Accessory released (fine-tuning framework)
- 2025-06-26: Accepted by ICCV 2025
