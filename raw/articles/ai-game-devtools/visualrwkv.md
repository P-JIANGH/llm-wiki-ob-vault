# VisualRWKV — Source Analysis

**Source:** https://github.com/howard-hou/VisualRWKV
**Date:** 2026-04-20
**Category:** Video (VLM - Visual Language Model)

## README Summary

VisualRWKV is a visual-enhanced version of the RWKV language model, enabling RWKV to handle various visual tasks. It extends RWKV's native text-only capabilities to process images and visual data.

**Paper:** arXiv:2406.13362
**Model Weights:** HuggingFace (howard-hou/visualrwkv-6)
**Live Demo:** Gradio Space on HuggingFace
**Stable Release:** VisualRWKV-v7/v7.00
**Commits:** 486

## Architecture

- Integrates visual encoders (SigLIP + DINOv2 + SAM for v7, CLIP for v6) with RWKV language backbone
- Visual encoders extract image features → projected → fed into RWKV text generation
- Supports multiple model scales: 0.1B, 0.4B, 1.5B, 3B, 7B

## Benchmark Performance

| Model | VQAv2 | ScienceQA | TextVQA | GQA | Vision Encoder |
|---|---|---|---|---|---|
| v0700+0b1 (0.1B) | 75.22 | 50.62 | 37.90 | 59.92 | SigLIP+dinov2+Sam |
| v0700+0b4 (0.4B) | 77.85 | 54.98 | 41.05 | 62.30 | SigLIP+dinov2+Sam |
| v0700+1b5 (1.5B) | 79.84 | 59.74 | 49.49 | 63.20 | SigLIP+dinov2+Sam |
| v6 1.6B | 73.66 | 57.02 | 48.70 | 58.23 | SigLIP+dinov2+Sam |
| v6 3B | 71.52 | 65.34 | 48.68 | 59.56 | CLIP |
| v6 7B | 75.82 | 68.22 | 51.01 | 64.27 | CLIP |

v7.0 consistently outperforms v6 at similar scales across VQAv2, ScienceQA, TextVQA.

## Training Pipeline

**Stage 1: Pre-training**
- Dataset: LLaVA-Pretrain
- Base checkpoints from BlinkDL's RWKV-x060-World (1.6B/3B/7B) and RWKV-x070-World (0.1B/0.4B/1.5B)

**Stage 2: Visual Instruction Tuning**
- Dataset: LLaVA visual instruction data
- Scripts: rwkv0b1_mix665k.sh

## Repository Structure

- VisualRWKV-v4/ to VisualRWKV-v7/ — version-specific codebases
- MODEL_ZOO.md — weights, checkpoints, results index
- download_huggingface.py — model fetching utility

## Game Dev Relevance

- RWKV's RNN architecture offers O(n) inference complexity — suitable for real-time game environments
- Visual understanding capability could enable NPCs that "see" and react to game scenes
- Efficient VRAM usage (RWKV property) makes it deployable on consumer hardware
- Combines with [[chatrwkv]] text capabilities for full multimodal game AI
