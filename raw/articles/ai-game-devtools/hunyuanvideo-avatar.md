# HunyuanVideo-Avatar — Raw Source Analysis

**Source:** https://github.com/Tencent-Hunyuan/HunyuanVideo-Avatar
**Date:** 2026-04-19
**Paper:** arXiv 2505.20156

## Overview

HunyuanVideo-Avatar is a multimodal diffusion transformer (MM-DiT) model for high-fidelity audio-driven human animation supporting multiple characters simultaneously. Developed by Tencent Hunyuan team (Yi Chen et al., 2025).

## Three Key Innovations

1. **Character Image Injection Module** — Replaces conventional addition-based character conditioning, eliminating condition mismatch between training and inference. Ensures dynamic motion and strong character consistency.

2. **Audio Emotion Module (AEM)** — Extracts and transfers emotional cues from a reference image to the generated video, enabling fine-grained emotion style control.

3. **Face-Aware Audio Adapter (FAA)** — Isolates audio-driven character with latent-level face mask, enabling independent audio injection via cross-attention for multi-character scenarios.

## Architecture

- **Base Model:** MM-DiT (Multimodal Diffusion Transformer) with DoubleStreamBlock and SingleStreamBlock layers
- **VAE:** Causal 3D Autoencoder (autoencoder_kl_causal_3d)
- **Audio Pipeline:** AudioProjNet2 (3-layer MLP projection: audio embeddings → context tokens) + PerceiverAttentionCA (cross-attention)
- **Token Refiner:** SingleTokenRefiner for text conditioning
- **Parallel:** Sequence parallelism support (NCCL-based), DeepCache acceleration, FP8 optimization for low VRAM

## Code Structure (37 Python files)

| Module | Key Files | Purpose |
|--------|-----------|---------|
| Core | `hymm_sp/sample_batch.py`, `sample_gpu_poor.py` | Multi-GPU and single-GPU inference entry points |
| Diffusion | `pipeline_hunyuan_video_audio.py` | Main generation pipeline with audio conditioning |
| Models | `models_audio.py` (745 lines) | DoubleStreamBlock/SingleStreamBlock MM-DiT architecture |
| Audio | `audio_adapters.py` (228 lines) | AudioProjNet2 + PerceiverAttentionCA |
| VAE | `autoencoder_kl_causal_3d.py`, `vae.py` | 3D causal VAE for video encoding/decoding |
| Modules | `attn_layers.py`, `embed_layers.py`, `modulate_layers.py` | Attention, embedding, modulation layers |
| Optimization | `fp8_optimization.py`, `parallel_states.py` | FP8 quantization, sequence parallelism |
| Gradio | `hymm_gradio/gradio_audio.py`, `flask_audio.py` | Web UI server |
| Data | `audio_dataset.py`, `audio_preprocessor.py` | Audio data loading and preprocessing |
| Face | `face_align/align.py`, `detface.py` | Face detection and alignment |

## Key Dependencies

- PyTorch 2.4.0 + CUDA 11.8/12.4
- diffusers 0.33.0
- transformers >= 4.50.0
- Flash Attention 2.6.3
- gradio > 4.42.0
- librosa 0.11.0 (audio processing)
- decord 0.6.0 (video decoding)
- accelerate 1.1.1

## Hardware Requirements

- **Minimum:** 24GB VRAM (704×768px, 129 frames, very slow)
- **Recommended:** 96GB VRAM for best quality
- **Optimized:** 10GB VRAM with TeaCache (via Wan2GP fork)
- **Multi-GPU:** 8 GPUs tested

## Inference Commands

- Multi-GPU: `torchrun --nproc_per_node=8 hymm_sp/sample_batch.py`
- Single-GPU: `python3 hymm_sp/sample_gpu_poor.py --use-fp8`
- Low VRAM: `CPU_OFFLOAD=1` + `--cpu-offload`
- Gradio: `bash ./scripts/run_gradio.sh`

## Input/Output

- **Input:** Avatar images (multi-style: photorealistic, cartoon, 3D, anthropomorphic) + audio files
- **Output:** High-dynamic video with emotion-controllable character animation
- **Supported scales:** Portrait, upper-body, full-body
- **Multi-character:** Independent audio injection per character

## License

Tencent Hunyuan Community License (not applicable in EU, UK, South Korea)

## Related

- HuggingFace weights: tencent/HunyuanVideo-Avatar
- Project page: https://HunyuanVideo-Avatar.github.io/
- Tencent Hunyuan Playground: https://hunyuan.tencent.com/modelSquare/home/play?modelId=126
