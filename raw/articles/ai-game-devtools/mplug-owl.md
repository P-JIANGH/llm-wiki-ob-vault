# mPLUG-Owl

> Source: https://github.com/X-PLUG/mPLUG-Owl
> Cloned: 2026-04-14

## Overview

mPLUG-Owl is a family of Multi-Modal Large Language Models (MLLMs) developed by Alibaba DAMO Academy, spanning three major versions (Owl1, Owl2, Owl3). The project pioneered modular design for vision-language alignment and achieved multiple state-of-the-art results on multimodal benchmarks.

## Versions

### mPLUG-Owl (2023) — Arxiv
- **Paper**: [2304.14178](https://arxiv.org/abs/2304.14178)
- **Key Innovation**: Modular design separating vision encoder, visual abstraction module, and LLM
- **Features**: Multi-turn image/video/text conversation, multilingual support, video understanding
- **Base Models**: LLaMA-7B, Bloomz-7B
- **Vision Encoder**: ViT-L (0.3B)
- **Checkpoints**: HuggingFace (MAGAer13/mplug-owl-llama-7b)

### mPLUG-Owl2 (2023) — CVPR 2024 Highlight
- **Paper**: [2311.04257](http://arxiv.org/abs/2311.04257)
- **Key Innovation**: Modality Collaboration — visual and language representations collaborate without heavy fusion layers
- **First** MLLM achieving SOTA on both pure-text and multi-modal benchmarks simultaneously
- **Performance**: 8.2B params, ViT-L (0.3B) vision backbone, outperforms Qwen-VL (ViT-G 1.9B) on low-level perception (Q-Bench)
- **Text Capability**: MMLU 53.4, BBH 45.0 — competitive with dedicated LLMs
- **Checkpoints**: HuggingFace (MAGAer13/mplug-owl2-llama2-7b), ModelScope
- **mPLUG-Owl2.1** (Chinese enhanced): Mizukiluke/mplug_owl_2_1

### mPLUG-Owl3 (2024) — ICLR 2025
- **Paper**: [2408.04840](https://arxiv.org/abs/2408.04840)
- **Key Innovation**: Long image-sequence understanding — handles long videos (movies), interleaved image-text, many-image inputs
- **Model Sizes**: 1B, 2B, 7B (base Qwen2)
- **Architecture**: Visual encoder + Qwen2 LLM with improved spatial-temporal modeling
- **Benchmarks**: Top-1 on LVBench, strong on Video-MME, NextQA, LongVideoBench
- **Checkpoints**: HuggingFace (mPLUG/mPLUG-Owl3-7B-240728, mPLUG/mPLUG-Owl3-7B-241101)
- **Supports**: RAG-style knowledge retrieval, interleaved image-text dialogue, long video comprehension

## Architecture

### mPLUG-Owl (v1)
- Frozen visual encoder (ViT) → Visual Abstraction Module → Frozen LLM (LLaMA)
- Pre-training: image-text alignment via visual abstraction
- Instruction tuning: LoRA or full fine-tuning

### mPLUG-Owl2
- Modality Collaboration: vision and language representations interact through cross-attention
- Visual Abstractor with learnable query tokens
- Benefits from both frozen-pretrained modules and fine-tuning

### mPLUG-Owl3
- Based on Qwen2 language model
- Enhanced spatial-temporal modeling for video
- Supports up to 16 video frames
- RAG integration for external knowledge

## Code Structure
```
mPLUG-Owl/
├── mPLUG-Owl/         # v1: LLaMA backbone, pipeline/, serve/, configs/
├── mPLUG-Owl2/        # v2: LLaMA-2 backbone, Gradio UI, model_worker
└── mPLUG-Owl3/        # v3: Qwen2 backbone, evaluation/, gradio_demo.py
```

## Key Capabilities for Game Dev
- **Image Understanding**: Scene comprehension, UI analysis, sprite recognition
- **Video Understanding**: Gameplay video analysis, character animation understanding
- **Multimodal Dialogue**: Game asset description, design feedback
- **Multilingual**: Chinese, English, Japanese, French, Korean, German

## License
Apache 2.0

## Related Models in Ecosystem
- LLaVA, MiniGPT-4, Qwen-VL, BLIP-2 (similar MLLM architectures)
- mPLUG (vision-language foundation), mPLUG-2 (modular multimodal)
