# MakeAnything - Source Material

> Source: https://github.com/showlab/MakeAnything
> Captured: 2026-04-17
> Authors: Yiren Song, Cheng Liu, Mike Zheng Shou (Show Lab, National University of Singapore)

## Overview

MakeAnything: Harnessing Diffusion Transformers for Multi-Domain Procedural Sequence Generation.

A research project from Show Lab at NUS that uses FLUX.1 Diffusion Transformer architecture to generate step-by-step procedural sequences across 21 creative domains (LEGO building, cooking, painting, sculpting, sketching, etc.). Supports both text-to-sequence and image-to-sequence generation.

## Key Technical Details

### Architecture
- **Base Model**: FLUX.1 (Diffusion Transformer)
- **Two Training Approaches**:
  1. **Asymmetric LoRA**: Multi-domain LoRA with multiple B matrices, each indexed to a specific domain. Supports 21 domains with index selection via `--lora_up <index>`.
  2. **Recraft Model**: Image-to-sequence generation. First trains standard LoRA, merges it into FLUX.1, then performs Recraft training for conditional image generation.

### Capabilities
- **Text-to-Sequence**: Generate multi-frame procedural sequences from text prompts
- **Image-to-Sequence (Recraft)**: Given a conditional image, generate step-by-step sequences
- **Generalization on Unseen Domains**: One-shot generalization to domains not seen during training

### Frame Configurations
- **4-frame sequences**: 1024x1024 resolution, ɔ-shape arrangement
- **9-frame sequences**: 1056x1056 resolution, S-shape arrangement

### 21 Domains Supported
LEGO, Cook, Painting, Icon, Landscape illustration, Portrait, Transformer, Sand art, Illustration, Sketch, Clay toys, Clay sculpture, ZBrush Modeling, Wood sculpture, Ink painting, Pencil sketch, Fabric toys, Oil painting, Jade Carving, Line draw, Emoji

### Tech Stack
- PyTorch 2.5.1, CUDA 12.4
- diffusers 0.25.0, transformers 4.44.0
- accelerate 0.33.0
- safetensors for model weights
- Gradio 3.6 for web UI
- kohya_ss/sd-scripts library (integrated)

### Available Models (Hugging Face)
- asylum_9f_general: 9-frame multi-domain Asymmetric LoRA
- asylum_4f_general: 4-frame multi-domain Asymmetric LoRA
- recraft_9f_lego, recraft_9f_portrait, recraft_9f_sketch: 9-frame Recraft models
- recraft_4f_wood_sculpture: 4-frame Recraft model

### Dataset
- Published on Hugging Face: showlab/makeanything
- 50 sequences per domain, plus extended SVG and Sketch datasets
- Paired .caption + .png files with TOML configuration

### License
Not explicitly specified in README (check LICENSE file)

### Key Files
- `gradio_app.py`: Gradio web UI for Recraft model inference
- `flux_train_network_asylora.py`: Asymmetric LoRA training script
- `flux_minimal_inference.py`: Standard inference script
- `flux_train_recraft.py`: Recraft model training
- `networks/lora_flux.py`: LoRA network architecture
- `library/flux_utils.py`, `flux_train_utils.py`: Core utilities
- `scripts/*.sh`: Shell templates for training/inference

### Links
- Paper: https://arxiv.org/abs/2502.01572
- HuggingFace Space: https://huggingface.co/spaces/yiren98/MakeAnything
- HuggingFace Model: https://huggingface.co/showlab/makeanything
- HuggingFace Dataset: https://huggingface.co/datasets/showlab/makeanything/
