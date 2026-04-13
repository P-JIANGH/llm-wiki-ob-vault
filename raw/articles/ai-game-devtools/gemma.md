# Gemma (PyTorch Implementation)

**Source:** https://github.com/google/gemma_pytorch

**Date:** 2026-04-13

## Overview

Gemma is a family of lightweight, state-of-the-art open models built from research and technology used to create Google Gemini models. This repository is the official PyTorch implementation, providing model and inference implementations using both PyTorch and PyTorch/XLA, supporting CPU, GPU, and TPU.

## Model Variants

| Generation | Text Only | Multimodal |
|---|---|---|
| **Gemma 3** | 1b | 4b, 12b, 27b_v3 |
| **Gemma 2** | 2b-v2, 9b, 27b | — |
| **Gemma** | 2b, 7b | — |

Additional variant: **CodeGemma** (code completion variants)

## Architecture

- Decoder-only transformer (same research lineage as Gemini)
- Multimodal variants include SigLIP vision encoder preprocessor
- Tokenizer: SentencePiece with 99 reserved unused tokens (`<unused0>` to `<unused98>`)
- Available via Kaggle and Hugging Face Hub

## Key Files

```
gemma/
├── config.py              # Model configuration
├── gemma3_model.py        # Gemma v3 model implementation
├── gemma3_preprocessor.py # Multimodal preprocessor (SigLIP vision)
├── model.py               # Core Gemma model (v1/v2)
├── model_xla.py           # PyTorch/XLA model parallel implementation
├── tokenizer.py           # SentencePiece tokenizer
├── siglip_vision/         # SigLIP vision encoder for multimodal
gemma/
├── images/
│   └── run_multimodal.py  # Multimodal inference script
├── run.py                 # Text-only inference script
├── run_xla.py             # PyTorch/XLA inference script
```

## Inference Backends

- **Pure PyTorch**: CPU, GPU (CUDA)
- **PyTorch/XLA**: CPU, GPU (CUDA), TPU

## Dependencies

- torch==2.6.0
- numpy==2.2.3
- sentencepiece==0.2.0
- pillow==11.1.0
- absl-py==2.1.0

## License

Research-only distribution. Not an officially supported Google product.

## Related

- Kaggle: https://www.kaggle.com/models/google/gemma-3
- Hugging Face: https://huggingface.co/models?other=gemma_torch
- Google AI: https://ai.google.dev/gemma
