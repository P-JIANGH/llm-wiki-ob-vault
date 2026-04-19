# HY-Motion 1.0 — 3D Human Motion Generation

**Source:** https://github.com/Tencent-Hunyuan/HY-Motion-1.0
**Developer:** Tencent Hunyuan 3D Digital Human Team
**Extracted:** 2026-04-19

## Overview

HY-Motion 1.0 is a text-to-3D human motion generation model built on Diffusion Transformer (DiT) and Flow Matching. It generates skeleton-based 3D character animations directly from text prompts, ready for integration into standard 3D animation pipelines. It is the first model to scale DiT-based text-to-motion architectures to the billion-parameter level.

## Key Features

- **State-of-the-Art Performance:** Superior instruction comprehension and motion naturalness
- **Billion-Scale Architecture:** First successful scaling of DiT for text-to-motion
- **Advanced 3-Stage Training:**
  1. Large-Scale Pre-training: >3,000 hours of diverse motion data
  2. High-Quality Fine-tuning: 400 hours of curated 3D motion data
  3. Reinforcement Learning: RLHF + reward models for instruction alignment

## Model Zoo

| Model | Parameters | Min VRAM |
|---|---|---|
| HY-Motion-1.0 (Standard) | 1.0B | 26GB |
| HY-Motion-1.0-Lite | 0.46B | 24GB |

## Architecture

- Diffusion Transformer (DiT) backbone
- Flow Matching objective
- Text conditioning via CLIP + Qwen3
- SMPL/SMPL-H skeleton representation
- Duration Prediction + Prompt Rewrite Module (optional LLM-based)

## Usage

- CLI batch inference: `python3 local_infer.py --model_path ckpts/...`
- Gradio Web UI: `python3 gradio_app.py` (http://localhost:7860)
- ComfyUI integration available: ComfyUI-HY-Motion1

## Limitations

- Non-humanoid characters (animals, creatures) NOT supported
- Subjective/visual attributes (emotions, clothing) NOT supported
- Environment & camera descriptions NOT supported
- Multi-person interactions NOT supported
- Seamless loops or in-place animations NOT supported

## Links

- Official Site: https://hunyuan.tencent.com/motion
- HuggingFace Demo: https://huggingface.co/spaces/tencent/HY-Motion-1.0
- ArXiv Paper: https://arxiv.org/pdf/2512.23464
- HuggingFace Weights: https://huggingface.co/tencent/HY-Motion-1.0
