# VideoLLaMA 3

Source: https://github.com/DAMO-NLP-SG/VideoLLaMA3
Date ingested: 2026-04-24

## Overview

VideoLLaMA 3 is a series of frontier multimodal foundation models for image and video understanding, developed by DAMO NLP Singapore (Alibaba). Built on Qwen2.5 with a tuned SigLIP-NaViT vision encoder, it achieves state-of-the-art performance among 7B-sized models on VideoMME and LVBench leaderboards.

## Key Facts

- **Organization**: DAMO-NLP-SG (Alibaba)
- **License**: Apache 2.0 (non-commercial research preview)
- **Paper**: arXiv:2501.13106
- **Release Date**: January 2025
- **Base LLM**: Qwen2.5-7B / Qwen2.5-1.5B
- **Vision Encoder**: SigLIP-So400m-Patch14-384 (tuned as VL3-SigLIP-NaViT)

## Model Zoo

| Model | Base | HF Link |
|-------|------|---------|
| VideoLLaMA3-7B | Qwen2.5-7B | DAMO-NLP-SG/VideoLLaMA3-7B |
| VideoLLaMA3-2B | Qwen2.5-1.5B | DAMO-NLP-SG/VideoLLaMA3-2B |
| VideoLLaMA3-7B-Image | Qwen2.5-7B | DAMO-NLP-SG/VideoLLaMA3-7B-Image |
| VideoLLaMA3-2B-Image | Qwen2.5-1.5B | DAMO-NLP-SG/VideoLLaMA3-2B-Image |

## Architecture

- **Multimodal design**: Tuned SigLIP vision encoder + Qwen2.5 LLM
- **Flash Attention 2**: Supported for efficient inference
- **Training stages**: 2-stage training pipeline (stage1 + stage2)
- **Data format**: JSONL annotations with image/video paths and conversations
- **DeepSpeed support**: ZeRO-2/3 for distributed training
- **Memory optimization**: Flash loss (tile-based CE) for long context training

## Capabilities

1. Single-image understanding (general, chart, table, document, visual code)
2. Multi-image comparison and understanding
3. Visual referring & fine-grained grounding
4. Video understanding (general, long video, temporal grounding)

## Benchmarks

- Best 7B-sized model on VideoMME leaderboard (as of Jan 24, 2025)
- Best 7B-sized model on LVBench leaderboard (as of Jan 26, 2025)

## Dependencies

- Python >= 3.10
- PyTorch >= 2.4.0
- CUDA >= 11.8
- transformers >= 4.46.3
- flash-attn == 2.7.3
- decord, ffmpeg-python, imageio, opencv-python

## Key Files

- `videollama3/__init__.py` — Model initialization and inference helpers
- `videollama3/model/` — Model architecture
- `videollama3/mm_utils.py` — Multimodal utilities (image/video loading)
- `videollama3/train.py` — Training script
- `videollama3/videollama3_trainer.py` — Custom trainer
- `inference/` — Inference scripts and Gradio demo
- `scripts/train/` — Training stage scripts
- `scripts/eval/` — Evaluation scripts

## Related

- VideoLLaMA 2: https://github.com/DAMO-NLP-SG/VideoLLaMA2 (arXiv:2406.07476)
- Video-LLaMA: https://github.com/DAMO-NLP-SG/Video-LLaMA (arXiv:2306.02858)
- Built on Qwen2.5 and SigLIP
- Inspired by LLaVA-OneVision, InternVL2, Qwen2VL
