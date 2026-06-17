# Mini-Gemini (MGM) — Raw Source

**Source:** https://github.com/dvlab-research/MiniGemini
**Paper:** arXiv:2403.18814 — "Mini-Gemini: Mining the Potential of Multi-modality Vision Language Models"
**Date:** 2026-04-20

## Overview
Official repo for Mini-Gemini, a multimodal vision-language model supporting dense and MoE LLMs from 2B to 34B with image understanding, reasoning, and generation. Built on LLaVA.

## Architecture
- **Dual vision encoders**: low-resolution (LR) visual embedding + high-resolution (HR) candidates
  - Primary: CLIP-Vit-L-336 (LR: 336px, HR: 768px or 1536px for HD variants)
  - Secondary: OpenCLIP-ConvNeXt-L (for HR)
- **Patch Info Mining**: novel technique for patch-level mining between HR regions and LR visual queries
- **LLM backends**: LLM marries text with images for both comprehension AND generation simultaneously

## Model Variants

| Model | LR | HR | Base LLM | Vision Encoder | Params |
|-------|-----|-----|----------|----------------|--------|
| MGM-2B | 336 | 768 | Gemma-2B | CLIP-L | 2B |
| MGM-7B | 336 | 768 | Vicuna-7B-v1.5 | CLIP-L | 7B |
| MGM-13B | 336 | 768 | Vicuna-13B-v1.5 | CLIP-L | 13B |
| MGM-8B | 336 | 768 | LLaMA-3-8B-Instruct | CLIP-L | 8B |
| MGM-8x7B | 336 | 768 | Mixtral-8x7B-Instruct-v0.1 | CLIP-L | 8x7B MoE |
| MGM-34B | 336 | 768 | Nous-Hermes-2-Yi-34B | CLIP-L | 34B |
| HD variants (7B/13B/8B/8x7B/34B) | 672 | 1536 | same as above | CLIP-L | same |

## Training
- 2-stage: (1) feature alignment (bridge vision↔language tokens), (2) instruction tuning
- Trained on 8×A100 80GB
- Full finetuning on MGM-Instruct data (Stage 1+2)
- Pretraining data: LLaVA images + ALLaVA caption
- Finetuning data: COCO, GQA, OCR-VQA, TextVQA, VG, ShareGPT4V, LAION GPT4V, DocVQA, ChartQA, DVQA, AI2D

## Evaluation Results (selected)
| Model | TextVQA | MMB | MME | MM-Vet | MMMU_val | MathVista |
|-------|---------|-----|-----|--------|----------|-----------|
| MGM-2B | 56.2 | 59.8 | 1341/312 | 31.1 | 31.7 | 29.4 |
| MGM-7B | 65.2 | 69.3 | 1523/316 | 40.8 | 36.1 | 31.4 |
| MGM-13B | 65.9 | 68.5 | 1565/322 | 46.0 | 38.1 | 37.0 |
| MGM-8B | 67.6 | 72.7 | 1606/341 | 47.3 | 38.2 | -- |
| MGM-8x7B | 69.2 | 75.6 | 1639/379 | 45.8 | 41.8 | 41.8 |
| MGM-34B | 70.1 | 79.6 | 1666/439 | 53.0 | 48.7 | 38.9 |
| MGM-34B-HD | 74.1 | 80.6 | 1659/482 | 59.3 | 44.9 | 43.3 |

## Inference
- CLI: `python -m mgm.serve.cli --model-path <path> --image-file <path>`
- OCR mode: `--ocr` (requires PaddleOCR)
- Generation mode: `--gen` (requires diffusers)
- Quantized: `--load-4bit` or `--load-8bit`
- Gradio Web UI: controller + model_worker + gradio_web_server (multi-GPU support)

## Key Files
- `mgm/` — Python package: model architecture, dataset, serve (CLI/Gradio)
- `scripts/` — Training and evaluation scripts for gemma/llama/mixtral/yi
- `predict.py` — Replicate/Cog prediction interface
- `cog.yaml` — Cog configuration
- `pyproject.toml` — Python project dependencies

## License
- Code: Apache 2.0
- Data: CC BY NC 4.0
- Weights: CC BY NC 4.0
- Research use only, not for commercial use

## Links
- Project page: https://mini-gemini.github.io/
- Demo: http://103.170.5.190:7860/
- HuggingFace Models: https://huggingface.co/collections/YanweiLi/mgm-6603c50b9b43d044171d0854
- HuggingFace Data: https://huggingface.co/collections/YanweiLi/mgm-data-660463ea895a01d8f367624e
