# MotionGPT: Human Motion as a Foreign Language

**Source:** https://github.com/OpenMotionLab/MotionGPT  
**Paper:** https://arxiv.org/abs/2306.14795  
**Project Page:** https://motion-gpt.github.io/  
**HuggingFace Demo:** https://huggingface.co/spaces/OpenMotionLab/MotionGPT  
**License:** MIT  
**Date:** NeurIPS 2023 (accepted 2023/09/22)  
**Authors:** OpenMotionLab

## Overview

MotionGPT is a **unified** and **user-friendly** motion-language model that learns the semantic coupling of motion and language modalities, generating high-quality motions and text descriptions across **multiple motion tasks**.

Key insight: human motion displays semantic coupling akin to human language — it can be treated as a form of "body language." By fusing language data with large-scale motion models, motion-language pre-training becomes feasible.

## Architecture

### Three-Stage Training Pipeline

1. **Stage 1 — Motion Tokenizer (VQ-VAE):** Discrete vector quantization converts 3D human motion into motion tokens (analogous to word tokens). Creates a "motion vocabulary" from continuous motion data.
2. **Stage 2 — Motion-Language Pre-training:** Jointly trains on both motion tokens and text tokens in a unified manner, treating human motion as a foreign language. Uses T5 or GPT-2 as the backbone language model.
3. **Stage 3 — Instruction Tuning:** Fine-tunes on prompt-based question-and-answer tasks, inspired by prompt learning. Enables zero-shot/few-shot capability on diverse motion tasks.

### Key Components

- **Motion VQ-VAE** (`mGPT/archs/mgpt_vq.py`): Encodes 3D motion (22 joints, 3D coordinates) → discrete motion tokens via codebook (size 512)
- **Language Model** (`mGPT/archs/mgpt_lm.py`): T5 (encoder-decoder) or GPT-2 (decoder-only) backbone, extended with motion token embeddings
- **Unified Model** (`mGPT/models/mgpt.py`): Orchestrates VQ-VAE + LM pipeline, handles multiple tasks
- **Datasets**: HumanML3D (text-to-motion), KIT-ML

### Supported Tasks

| Task | Description |
|------|-------------|
| Text-to-Motion (t2m) | Generate 3D human motion from text description |
| Motion Translation (m2t) | Generate text caption from motion sequence |
| Motion Prediction (pred) | Predict future motion from partial sequence |
| Motion In-Between | Generate bridging motion between two motion clips |

## Technical Stack

- **Framework:** PyTorch 2.0 + PyTorch Lightning
- **Language Model:** T5 / GPT-2 (transformers library)
- **Motion Processing:** SMPL/SMPLH/SMPLX body models, HumanML3D data format
- **Configuration:** OmegaConf
- **Visualization:** Blender rendering, pyrender, matplotlib 3D plots
- **Web UI:** Gradio (`app.py`)

## Project Structure

```
mGPT/
├── archs/          # Model architectures (VQ-VAE, LM, evaluators)
├── data/           # Data loaders (HumanML3D, KIT-ML, webui)
├── models/         # Training models (mgpt.py, webui)
├── losses/         # Loss functions
├── metrics/        # Evaluation metrics (T2M, M2T, MR)
├── render/         # Visualization (Blender, pyrender, matplotlib)
├── utils/          # Utilities (geometry, tensors, checkpoints)
└── config.py       # OmegaConf configuration system
```

## Key Files

- `train.py` — Main training entrypoint (3 stages)
- `test.py` — Evaluation runner (t2m/m2t/pred/inbetween tasks)
- `demo.py` — Batch demo with txt file input → npy motion output
- `app.py` — Gradio web UI (port 8888)
- `configs/config_h3d_stage{1,2,3}.yaml` — Stage-specific training configs

## Datasets

- **HumanML3D**: ~14K motion clips with text annotations (primary dataset)
- **KIT-ML**: ~4K motion clips (evaluation benchmark)

## Results

Achieves state-of-the-art performance on text-driven motion generation, motion captioning, motion prediction, and motion in-between tasks.

## Latest Development

- **2025/06/30:** MotionGPT3 released — bimodal motion-language framework using MoT (Mixture of Transformers) architecture
- **2023/09/22:** MotionGPT accepted by NeurIPS 2023
