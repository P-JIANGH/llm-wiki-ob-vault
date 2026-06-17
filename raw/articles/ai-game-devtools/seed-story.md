# SEED-Story: Multimodal Long Story Generation with Large Language Model

**Source URL:** https://github.com/TencentARC/SEED-Story
**Paper:** https://arxiv.org/abs/2407.08683
**Extracted:** 2026-04-17

## Overview
SEED-Story is a multimodal large language model (MLLM) by TencentARC that generates rich, coherent narrative text alongside images with consistent characters and styles from user-provided starting images/text.

## Core Capabilities
- **Multimodal Long Story Generation:** Generates coherent narrative text + images with consistent characters and styles
- **Extended Sequence Generation:** Can generate stories up to 25 multimodal sequences (trained on max 10)
- **Conditional Branching:** Same initial image + different opening text → divergent storylines

## Architecture: 3-Stage Training Pipeline
Built upon SEED-X (https://github.com/AILab-CVC/SEED-X):

1. **Stage 1 (De-tokenizer Pre-training):** SD-XL-based de-tokenizer reconstructs images using features from a pre-trained ViT
2. **Stage 2 (MLLM Instruction Tuning):** Train MLLM on random-length interleaved image-text sequences via next-word prediction + image feature regression
3. **Stage 3 (De-tokenizer Adaptation):** Feed regressed image features from MLLM into de-tokenizer to fine-tune SD-XL, enhancing character/style consistency

## StoryStream Dataset
Large-scale dataset for multimodal story generation:
- **Subsets:** Curious George, Rabbids Invasion, The Land Before Time
- **Format:** JSONL files, each line = story of 30 images + 30 text captions
- Stories chunked to length 10 for training efficiency

## Evaluation (GPT-4 API)
| Metric | Score |
|--------|-------|
| Image Style Consistency | 8.61 |
| Story Engaging | 6.27 |
| Text-Image Coherence | 8.24 |

## Repository Structure
| Path | Purpose |
|------|---------|
| StoryStream/ | Dataset files & chunking utilities |
| src/ | Core source code & evaluation scripts |
| configs/ | Training & inference configurations |
| scripts/ | Utility & setup scripts |
| assets/ | Teaser images, pipeline diagrams |

## Dependencies
- stable-diffusion-xl-base-1.0
- Llama-2-7b-hf
- Qwen-VL-Chat (visual encoder extraction required)

## License
Apache License Version 2.0 (with third-party exceptions in license_Seed-Story.txt)

## Key Resources
- Paper: https://arxiv.org/abs/2407.08683
- HuggingFace Model: https://huggingface.co/TencentARC/SEED-Story
- HuggingFace Dataset: https://huggingface.co/datasets/TencentARC/StoryStream
- YouTube Demo: https://youtu.be/_t87U1tLiyQ
