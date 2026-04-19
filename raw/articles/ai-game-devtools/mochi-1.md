# Mochi 1 — Raw Source

**Source:** https://github.com/genmoai/models
**Date:** 2026-04-20
**License:** Apache 2.0

## Overview

Mochi 1 preview is an open state-of-the-art video generation model by Genmo (genmo.ai) with high-fidelity motion and strong prompt adherence. The model dramatically closes the gap between closed and open video generation systems. Released under Apache 2.0 license.

## Key Specifications

### AsymmDiT (Asymmetric Diffusion Transformer) — 10B Parameters
- **Architecture:** Novel AsymmDiT with asymmetric visual/text streams
- **Visual stream:** dim=3072, 4x more parameters than text stream
- **Text stream:** dim=1536
- **Layers:** 48 | **Heads:** 24
- **Visual tokens:** 44,520 | **Text tokens:** 256 (T5-XXL)
- **Non-square QKV projections** to unify modalities in self-attention
- **Separate MLP layers** per modality (similar to SD3 but with asymmetric dims)
- Reduces inference memory vs symmetric designs

### AsymmVAE (Video VAE) — 362M Parameters
- **Encoder base channels:** 64 | **Decoder base channels:** 128
- **Latent dim:** 12 channels
- **Spatial compression:** 8x8 | **Temporal compression:** 6x
- Causally compresses videos to 128x smaller size
- Asymmetric encoder-decoder structure for efficiency

## Hardware Requirements
- **Single GPU:** ~60GB VRAM (recommends H100)
- **Multi-GPU:** Supports FSDP context parallel (splits model across GPUs)
- **ComfyUI optimization:** Can run on <20GB VRAM via ComfyUI-MochiWrapper
- **LoRA fine-tuning:** Single H100 or A100 80GB GPU

## Key Technical Details

### Text Encoding
- Single T5-XXL (google/t5-v1_1-xxl) encoder, max 256 tokens
- Unlike many modern diffusion models that use multiple LLMs

### Inference Pipeline
- **MochiSingleGPUPipeline:** Single GPU inference with CPU offload
- **MochiMultiGPUPipeline:** FSDP distributed across multiple GPUs
- **Context parallel:** Efficient implementation for long video generation
- **Decoding options:** tiled_spatial / tiled_full
- **Sigma schedule:** linear_quadratic_schedule (configurable)
- **CFG schedule:** configurable per-step

### LoRA Fine-tuning
- Built-in trainer for safetensors-format LoRA
- Pass via --lora_path flag to gradio_ui.py or cli.py
- Fine-tune on custom videos with one H100/A100 80GB

### Attention Backends
- Flash Attention (flash-attn>=2.6.3)
- SDPA (PyTorch built-in)
- Sage Attention (optional import)

## Project Structure
- `src/genmo/mochi_preview/` — Core model code
  - `dit/joint_model/` — AsymmDiT architecture
    - `asymm_models_joint.py` (737 lines) — Main AsymmetricAttention + AsymmDiT blocks
    - `context_parallel.py` — Distributed context parallel inference
    - `rope_mixed.py` / `temporal_rope.py` — Mixed/temporal rotary embeddings
    - `lora.py` — LoRA linear layer support
  - `vae/` — AsymmVAE
    - `models.py` (1021 lines) — Encoder/Decoder with chunked Conv3d
    - `cp_conv.py` — Context parallel convolution
  - `pipelines.py` (682 lines) — Main inference pipelines (FSDP/Single GPU)
- `demos/` — Gradio UI, CLI, API examples, fine-tuner
- `scripts/` — Weight download scripts
- `contrib/modal/` — Modal cloud fine-tuning scripts

## Dependencies
- PyTorch >=2.4.1, torchvision >=0.19.1
- transformers >=4.45.2 (T5-XXL)
- einops, omegaconf, sentencepiece
- ray (for multi-GPU)
- safetensors
- gradio (for UI demo)
- ffmpeg (for video output)
- Optional: flash-attn >=2.6.3

## Interfaces
- **CLI:** `python demos/cli.py --model_dir weights/ --cpu_offload`
- **Gradio UI:** `python demos/gradio_ui.py --model_dir weights/ --cpu_offload`
- **Python API:** MochiSingleGPUPipeline / MochiMultiGPUPipeline
- **ComfyUI:** ComfyUI-MochiWrapper (external)

## Limitations
- 480p output in preview release
- Minor warping with extreme motion
- Optimized for photorealistic styles (not animated content)
- Living research checkpoint, evolving

## Related Work
- ComfyUI-MochiWrapper — adds ComfyUI support with SDPA attention
- ComfyUI-MochiEdit — video editing nodes (object insertion, restyling)
- mochi-xdit — parallel inference speedup via xDiT

## News
- 2024-11-26: LoRA fine-tuning support added
- 2024-11-05: Consumer-GPU support via ComfyUI (<20GB VRAM)
