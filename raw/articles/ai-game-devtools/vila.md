# VILA - Optimized Vision Language Models

**Source:** https://github.com/NVlabs/VILA
**Cloned:** 2026-04-15
**License:** Apache 2.0 (code), CC BY-NC-SA 4.0 (weights)

## Overview

VILA is a family of open Visual Language Models (VLMs) developed by NVIDIA, optimized for both efficiency and accuracy in video understanding and multi-image understanding. It has gone through several iterations: VILA1.0 (2024/02), VILA1.5 (2024/05), NVILA/VILA2.0 (2024/12), and LongVILA (2024/12) for long video support.

## Key Models

| Model | Size | Features |
|-------|------|----------|
| NVILA-8B / NVILA-8B-Lite | 8B | Efficient multimodal, AWQ quantized |
| NVILA-15B / NVILA-15B-Lite | 15B | Best open-source VLM on MMMU & Video-MME |
| VILA-1.5 | 3B/8B/13B/40B | Video understanding, SOTA on MLVU (OSS) |
| LongVILA | various | >1M context length, multi-modal sequence parallel |
| VILA-HD | various | PS3 vision encoder, 4K resolution understanding |

## Architecture

Built on LLaVA codebase. Training pipeline has 3 steps:
1. **Alignment** - LLaVA-CC3M-Pretrain-595K dataset to align visual/textual modalities
2. **Pretraining** - MMC4 + Coyo dataset for interleaved image-text training
3. **SFT** - Fine-tuned on M3IT, FLAN, ShareGPT4V for instruction following

VILA1.5 uses InternViT vision encoder (from InternVL) for 40B model.

## Training Datasets

MMC4, COYO-700M, M3IT, OpenORCA/FLAN, ShareGPT4V, WIT, GSM8K-ScRel, VisualGenome, VCR, ScienceQA, Shot2Story, Youcook2, Vatex, ShareGPT-Video.

## Key Features

- **Interleaved image-text pretraining** enables multi-image VLM
- **In-context learning** capabilities
- **AWQ 4-bit quantization** via TinyChat backend for edge deployment (Jetson Orin, laptops, CPUs)
- **TensorRT-LLM** deployment support
- **FastAPI server** with OpenAI SDK-compatible API
- **Docker** deployment option

## Inference Performance (TinyChat, batch=1)

| Model | A100 tok/s | 4090 tok/s | Orin tok/s |
|-------|-----------|-----------|-----------|
| NVILA-3B-TinyChat | 184.3 | 230.5 | 45.0 |
| NVILA-8B-TinyChat | 186.8 | 162.7 | 28.1 |
| NVILA-Video-8B-TinyChat | 151.8 | 145.0 | 32.3 |

## Deployment Backends

- **TinyChat** - AWQ-quantized models on desktop/edge GPUs
- **TinyChatEngine** - CPU inference (x86 & ARM)
- **TensorRT-LLM** - Production inference
- **FastAPI server** - REST API with OpenAI-compatible interface
- **Docker** - Containerized deployment

## Related Projects

- **OmniVinci** (2025/7) - Visual-audio joint understanding omni-modal LLM
- **Long-RL** (2025/7) - RL training on VILA/LongVILA/NVILA with long videos
- **PS3/VILA-HD** (2025/6) - Vision encoder scaling to 4K resolution
- **LongVILA** - Long video understanding (>1M context)
- **VILA-U** - Unified video/image/language understanding + generation
- **VILA-M3** - Medical VLM finetuned on VILA1.5
- **Cosmos Nemotron** - NVILA integrated into NVIDIA's vision language models

## BibTeX

```bibtex
@misc{liu2024nvila,
  title={NVILA: Efficient Frontier Visual Language Models},
  author={Zhijian Liu et al.},
  year={2024}, eprint={2412.04468}, archivePrefix={arXiv}, primaryClass={cs.CV}
}
@misc{lin2023vila,
  title={VILA: On Pre-training for Visual Language Models},
  author={Ji Lin et al.},
  year={2023}, eprint={2312.07533}, archivePrefix={arXiv}, primaryClass={cs.CV}
}
```

## Acknowledgements

Built on LLaVA, InternVL (InternViT vision encoder), Vicuna (LLM), Video-ChatGPT (evaluation).
