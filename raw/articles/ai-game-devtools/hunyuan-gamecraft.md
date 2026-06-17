# Hunyuan-GameCraft Source

> Clone of https://github.com/Tencent-Hunyuan/Hunyuan-GameCraft-1.0 — cloned 2026-04-16

## README Summary

**Hunyuan-GameCraft** (Tencent, 2025) is a framework for high-dynamic interactive game video generation. It takes a reference image + text prompt + keyboard/mouse action signals and generates coherent gameplay videos autoregressively.

### Key Features
- **Hybrid History Conditioning**: Extends video sequences autoregressively while preserving game scene information
- **Unified Camera Representation**: Converts keyboard/mouse inputs into a shared camera space for smooth interpolation
- **Model Distillation**: Distilled model reduces inference steps from 50 to 8 while maintaining consistency
- **Large-scale Training**: 1M+ gameplay recordings across 100+ AAA games, fine-tuned on synthetic annotated data
- **Supports**: FP8 optimization, SageAttn acceleration, CPU offload for low VRAM

### Architecture
- Lightweight action encoder encodes camera trajectory
- Action and image features fused after patchify
- Variable mask indicator distinguishes history frames (1) from predicted frames (0)
- 704×1216 resolution, 33 frames per action chunk at 25FPS

### Inference
- Multi-GPU (8× H20/H800): 50 steps, cfg=2.0
- Distilled model: 8 steps, cfg=1.0, ~6× faster
- Single GPU (24GB min): `--cpu-offload --use-fp8`
- Gradio web UI available at port 8080

### Dependencies
- PyTorch 2.5.1, CUDA 12.4
- diffusers 0.34.0, transformers 4.54.1
- flash-attention v2.6.3, SageAttention
- Docker image: `hunyuanvideo/hunyuanvideo:cuda_12`

### Key Source Files
- `hymm_sp/sample_batch.py` — Multi-GPU batch inference entry point
- `hymm_sp/sample_inference.py` — `HunyuanVideoSampler` core inference class
- `hymm_sp/modules/cameranet.py` — Camera network for action encoding
- `hymm_sp/modules/models.py` — Core model architecture
- `hymm_sp/text_encoder/` — Text encoder (CLIP/LLaVA-based)
- `hymm_sp/vae/` — Causal 3D VAE for video compression

### Weights
- Base model: `weights/gamecraft_models/mp_rank_00_model_states.pt`
- Distilled: `weights/gamecraft_models/mp_rank_00_model_states_distill.pt`
- Std models: `weights/stdmodels/` (DiT, VAE, text encoder)
- HuggingFace: `tencent/Hunyuan-GameCraft-1.0`
