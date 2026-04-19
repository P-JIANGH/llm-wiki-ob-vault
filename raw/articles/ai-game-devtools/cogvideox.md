# CogVideo & CogVideoX — Raw Source

**Source:** https://github.com/THUDM/CogVideo
**Captured:** 2026-04-20
**License:** Apache 2.0 (code, CogVideoX-2B), CogVideoX LICENSE (CogVideoX-5B)

## Overview

CogVideoX is THUDM/ZhipuAI's open-source video generation model family, originating from the commercial QingYing product. The project encompasses both the original CogVideo (ICLR'23) and the modern CogVideoX series (2024-2025).

## Model Variants

| Model | Release | Resolution | Frames | Precision | Min VRAM (diffusers) |
|-------|---------|-----------|--------|-----------|---------------------|
| CogVideoX1.5-5B | Nov 2024 | 1360×768 | 81 (16N+1) | BF16 | 10GB* |
| CogVideoX1.5-5B-I2V | Nov 2024 | Min=768, Max≤1360 | 81 (16N+1) | BF16 | 10GB* |
| CogVideoX-2B | Aug 2024 | 720×480 | 49 (8N+1) | FP16 | 4GB* |
| CogVideoX-5B | Aug 2024 | 720×480 | 49 (8N+1) | BF16 | 5GB* |
| CogVideoX-5B-I2V | Sep 2024 | 720×480 | 49 (8N+1) | BF16 | 5GB* |

*With diffusers optimizations (enable_sequential_cpu_offload, VAE slicing/tiling)

## Key Technical Details

- **Architecture:** Transformer-based text-to-video diffusion model
- **Position Encoding:** 3d_rope_pos_embed (latest), 3d_sincos_pos_embed (CogVideoX-2B)
- **VAE:** 3D Causal VAE for near-lossless video reconstruction
- **Frame Rate:** 16 fps (1.5 series), 8 fps (original series)
- **Video Length:** 5-10 seconds (1.5), 6 seconds (original)
- **Prompt Limit:** 224-226 tokens, English only
- **Quantization:** INT8 via TorchAO (down to 3.6GB for 2B), FP8 on H100+

## Project Structure

```
├── inference/          # CLI demos (cli_demo.py, cli_demo_quantization.py)
├── finetune/           # Fine-tuning guides (diffusers + SAT)
├── sat/               # SwissArmyTransformer weights & code
├── tools/
│   ├── caption/       # CogVLM2-Caption video captioning tool
│   ├── convert_*.py   # Model weight conversion (SAT↔HF, DeepSpeed)
│   ├── lora/          # LoRA export & loading tools
│   ├── llm_flux_cogvideox/  # LLM + Flux + CogVideoX auto-generation
│   ├── parallel_inference/  # xDiT multi-GPU parallel inference
│   ├── replicate/     # Replicate deployment configs
│   └── venhancer/     # Video enhancement tools
└── resources/         # Logos, demo videos, WeChat group info
```

## Ecosystem & Integrations

- **ComfyUI:** ComfyUI-CogVideoXWrapper (kijai)
- **DiffSynth-Studio:** ModelScope diffusion engine adaptation
- **VideoSys:** NUS high-performance video generation infrastructure
- **xDiT:** Scalable multi-GPU inference for DiTs
- **LeMiCa:** China Unicom 2.5x lossless acceleration
- **RIFLEx:** Training-free video length extension (one-line code fix)
- **CogVideoX-Fun:** Flexible resolution & launch methods
- **CogStudio:** Extended Gradio Web UI
- **cogvideox-factory:** Cost-effective fine-tuning (single 4090)
- **CogVideoX-Controlnet:** Simple ControlNet module
- **ConsisID:** Identity-preserving T2V (frequency decomposition)
- **VideoTuna:** Multi-model aggregation (T2V, I2V, T2I)

## Fine-tuning

- **Diffusers LoRA:** Updated Nov 2024, lower GPU memory usage
- **SAT:** Full fine-tuning with SwissArmyTransformer weights
- **cogvideox-factory:** Community framework, multi-resolution support, single 4090 compatible

## Inference Performance

| Hardware | CogVideoX-2B | CogVideoX-5B | 1.5-5B |
|----------|-------------|-------------|--------|
| A100 (50 steps) | ~90s | ~180s | ~1000s (5s video) |
| H100 (50 steps) | ~45s | ~90s | ~550s (5s video) |
| Minimum VRAM (INT8) | 3.6GB | 4.4GB | 7GB |

## Quick Start

```bash
pip install -r requirements.txt
# Text-to-Video
python inference/cli_demo.py
# Prompt optimization via LLM
python inference/convert_demo.py
# Quantized inference (low VRAM)
python inference/cli_demo_quantization.py
```

## Online Demo

- HuggingFace Space: https://huggingface.co/spaces/THUDM/CogVideoX-5B
- ModelScope: https://modelscope.cn/studios/ZhipuAI/CogVideoX-5b-demo
- QingYing: https://chatglm.cn/video

## Key Dependencies

- Python 3.10-3.12
- PyTorch, diffusers, transformers
- SwissArmyTransformer (SAT mode)
- TorchAO (quantization, optional)

## Colab Support

- CogVideoX-5B T2V (free T4 Colab)
- CogVideoX-5B T2V INT8 (~30 min/run)
- CogVideoX-5B I2V
- CogVideoX-5B V2V

## Paper & Citation

- CogVideoX: https://arxiv.org/abs/2408.06072
- CogVideo (ICLR'23): https://arxiv.org/abs/2205.15868
