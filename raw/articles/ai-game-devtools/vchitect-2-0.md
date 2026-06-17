# Vchitect-2.0 — Parallel Transformer for Scaling Up Video Diffusion Models

**Source:** https://github.com/Vchitect/Vchitect-2.0
**Extracted:** 2026-04-20
**Method:** web_extract (GitHub/gitcode/gitee all failed)

## Project Overview

Vchitect-2.0 is an open-source Text-to-Video (T2V) diffusion model that introduces a Parallel Transformer architecture to efficiently scale video generation capabilities.

- **Version:** v0.1
- **Commits:** 28
- **Primary Task:** Text-to-Video Generation
- **Model:** Vchitect-XL-2B (2 Billion parameters)
- **License:** Apache-2.0

## Technical Specifications

| Feature | Specification |
|:---|:---|
| **Base Resolution** | Up to 720×480 |
| **Base Frame Rate** | 8 fps |
| **Enhanced Output** | Upscaled to 2K & interpolated to 24 fps via VEnhancer |
| **Model Size** | 2B parameters |
| **Architecture** | Parallel Transformer for Video Diffusion |

## Repository Structure

- `inference.py` — Main script for running video generation
- `op_replace.py` — Custom operation replacements/optimizations
- `utils.py` — Helper functions & utilities
- `requirements.txt` — Python dependencies
- `models/` — Model architecture & weight loading logic
- `assets/` — Sample outputs & media

## Inference & Usage

1. Download checkpoint from HuggingFace (Vchitect-XL-2B)
2. Configure arguments in inference.py
3. Execute

Example prompts include landscape scenes and cosmic/aurora visual effects.

## Key Resources

- HuggingFace Demo: https://huggingface.co/spaces/Vchitect/Vchitect-2.0
- Checkpoint: https://huggingface.co/Vchitect/Vchitect-XL-2B
- Paper: arXiv:2501.08453
- Upscaler companion: VEnhancer (https://github.com/Vchitect/VEnhancer)

## Citation

Fan et al., 2025. "Vchitect-2.0: Parallel Transformer for Scaling Up Video Diffusion Models." arXiv:2501.08453.
