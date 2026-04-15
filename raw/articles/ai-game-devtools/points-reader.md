# POINTS-Reader

> Source: https://github.com/Tencent/POINTS-Reader
> Cloned: 2026-04-15

## Basic Info

- **Project**: POINTS-Reader: Distillation-Free Adaptation of Vision-Language Models for Document Conversion
- **Organization**: Tencent
- **License**: See LICENSE.txt
- **Paper**: EMNLP 2025 Main Conference
- **HuggingFace**: https://huggingface.co/tencent/POINTS-Reader
- **Live Demo**: https://huggingface.co/spaces/prithivMLmods/POINTS-Reader-OCR

## Architecture

POINTS-Reader follows the POINTS1.5 architecture with the following key differences:
- **LLM**: Qwen2.5-3B-Instruct (replaces Qwen2.5-7B-Instruct in POINTS1.5)
- **ViT**: 600M NaViT (from POINTS1.5)
- **Input**: Fixed prompt + document image
- **Output**: Plain text string (no post-processing)

## Key Features

1. **Simplicity**: Streamlined model, end-to-end document extraction with no post-processing
2. **Bilingual**: Supports both Chinese and English document extraction
3. **High Throughput**: Moderate-size ViT (600M NaViT) for efficiency; supports SGLang and vLLM
4. **Two-Stage Data Augmentation**:
   - Stage 1: Automated data for basic document extraction
   - Stage 2: Continuous self-evolution to improve data quality

## Performance (OmniDocBench)

| Method | EN Overall↓ | ZH Overall↓ |
|--------|-------------|-------------|
| **POINTS-Reader-3B** | **0.133** | **0.212** |
| MinerU2.0-2505-0.9B | 0.133 | 0.238 |
| MonkeyOCR-pro-1.2B | 0.146 | 0.221 |
| GPT4o | 0.233 | 0.399 |
| Qwen2-VL-72B | 0.252 | 0.327 |
| Gemini2.5-Pro | 0.148 | 0.212 |

POINTS-Reader achieves best-in-class EN score (0.133) and competitive ZH score (0.212), tied with Gemini2.5-Pro on ZH overall.

## Technical Approach

The paper proposes a **distillation-free adaptation** approach — unlike other document extraction models that rely on knowledge distillation from larger models, POINTS-Reader uses:
1. Automated data generation in Stage 1
2. Self-evolution in Stage 2 (highly extensible to other models)

## Related Projects

- POINTS1.5 (base VLM)
- WePOINTS family
