# FLUX — Black Forest Labs

> Source: https://github.com/black-forest-labs/flux
> Ingested: 2026-04-17

## Overview
FLUX is the open-weight image generation model family by **Black Forest Labs** (https://bfl.ai).
The repo contains minimal inference code for image generation & editing with FLUX open-weight models.

## Model Family (Open-Weight)

| Model | Capability | License |
|-------|-----------|---------|
| FLUX.1 [schnell] | Text to Image | Apache 2.0 |
| FLUX.1 [dev] | Text to Image | FLUX.1-dev Non-Commercial |
| FLUX.1 Fill [dev] | In/Out-painting | FLUX.1-dev Non-Commercial |
| FLUX.1 Canny [dev] | Structural Conditioning | FLUX.1-dev Non-Commercial |
| FLUX.1 Depth [dev] | Structural Conditioning | FLUX.1-dev Non-Commercial |
| FLUX.1 Canny [dev] LoRA | Structural Conditioning | FLUX.1-dev Non-Commercial |
| FLUX.1 Depth [dev] LoRA | Structural Conditioning | FLUX.1-dev Non-Commercial |
| FLUX.1 Redux [dev] | Image Variation | FLUX.1-dev Non-Commercial |
| FLUX.1 Kontext [dev] | Image Editing | FLUX.1-dev Non-Commercial |
| FLUX.1 Krea [dev] | Text to Image | FLUX.1-dev Non-Commercial |

## Architecture
- **Core model**: Transformer-based flow matching on sequences (DiT-style)
- **Dual-stream design**: DoubleStreamBlock (text + image) + SingleStreamBlock (unified)
- **Timestep embedding**: MLP-based with guidance embedding support
- **LoRA support**: Built-in LinearLora for parameter-efficient fine-tuning
- **TensorRT support**: BF16/FP8/FP4 precision exports for NVIDIA GPU acceleration
- **Autoencoder**: Released separately under Apache 2.0

## Key Modules (src/flux/)
- `model.py` — Core Flux transformer with DoubleStreamBlock/SingleStreamBlock architecture
- `sampling.py` — Flow matching sampling logic
- `modules/` — Layers (DoubleStreamBlock, SingleStreamBlock, LoRA), autoencoder, conditioner, image embedders
- `trt/` — TensorRT engine support (T5, CLIP, VAE, Transformer engine configs)
- `cli.py`, `cli_control.py`, `cli_fill.py`, `cli_redux.py`, `cli_kontext.py` — CLI entry points per model variant

## Dependencies
- Python >= 3.10, PyTorch 2.6.0
- accelerate, transformers >= 4.45.2, huggingface-hub, safetensors
- Gradio (demo UI), Streamlit (web UI)
- TensorRT (optional, NVIDIA GPU acceleration)

## Interfaces
- **CLI**: `python -m flux t2i --name <name>` for text-to-image
- **Gradio demo**: `python demo_gr.py --name flux-schnell --device cuda`
- **Streamlit demo**: `streamlit run demo_st.py`
- **API**: docs.bfl.ai (commercial, includes Pro tier models)
- **Diffusers integration**: `FluxPipeline` via 🧨 diffusers library

## Licensing
- FLUX.1 [schnell]: Apache 2.0 (open-source, commercial use allowed)
- FLUX.1 [dev] family: FLUX.1-dev Non-Commercial License
- Commercial licensing available at https://bfl.ai/pricing/licensing (usage-based)
- Autoencoder weights: Apache 2.0

## Key Facts
- Author: Black Forest Labs (founded by Stability AI alumni including Robin Rombach)
- Citation: arXiv:2506.15742 (FLUX.1 Kontext paper)
- Model weights hosted on HuggingFace
- Supports usage tracking for commercial licensing via API key

## Related
- Part of the ai-game-devtools Image category (75 projects)
- Competes with Stable Diffusion, Midjourney, DALL-E in image generation space
