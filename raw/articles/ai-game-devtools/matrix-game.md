# Matrix-Game — Skywork AI 开源世界模型系列

> Source: https://github.com/SkyworkAI/Matrix-Game
> Analyzed: 2026-04-16
> License: MIT

## Overview

Matrix-Game is a series of open-source world models by Skywork AI for real-time interactive game video generation.

### Version History
- **Matrix-Game 1.0** (May 2025): First open-source world model in the series
- **Matrix-Game 2.0** (Aug 2025): Interactive world foundation model for real-time long video generation
- **Matrix-Game 3.0** (Mar 2026): Real-time streaming interactive world model with long-horizon memory (current latest)

## Matrix-Game 3.0 Architecture

### Core Components

**Model (DiT)**:
- Based on Wan2.2 architecture (WanModel)
- 40-layer DiT transformer, dim=5120, 40 heads, ffn_dim=13824
- Patch size: (1, 2, 2), VAE stride: (4, 16, 16)
- Input/output dim: 48 (VAE latent channels)
- Flow matching diffusion with UniPC scheduler
- Supports INT8 quantization for memory efficiency
- Flash Attention 2/3 support

**Text Encoder**: UMT5-XXL (bf16, text_len=512)

**VAE**: Wan2.2 VAE with options for:
- Standard VAE, LightVAE (mg_lightvae, mg_lightvae_v2)
- Async VAE decoding (separate GPU worker process)
- torch.compile VAE acceleration
- Dynamic pruning rate inference

**Action Conditioning**:
- Keyboard actions: W/S/A/D/Q (forward/back/left/right/no-move) → 6-dim vector
- Mouse/Camera actions: I/K/J/L/U (up/down/left/right/no-move) → 2-dim continuous
- Actions converted to camera poses (position + pitch/yaw) via `compute_all_poses_from_actions()`
- Plucker ray representation for camera conditioning

### Interactive Pipeline

The interactive pipeline (`MatrixGame3InteractivePipeline`) enables:
- **Streaming generation**: Iterative clip-by-clip video generation (first clip=57 frames, subsequent clips=40 frames each)
- **Keyboard input**: Real-time WASD movement + IJKL camera control
- **Long-horizon memory**: Selects reference frames from past generation using FOV-based similarity (`select_memory_idx_fov`)
- **Sliding context**: Maintains 16-frame history window, 56-frame total context
- **Memory frame selection**: Picks 5 keyframes from past (offsets 1,9,17,25,33) based on field-of-view similarity

### Distributed Training Support
- FSDP for T5 encoder and DiT model
- Ulysses sequence parallelism (ulysses_size)
- NCCL distributed backend with proper gradient synchronization
- INT8 weight synchronization across ranks

### Generation Parameters
- Default resolution: 1280x704 (configurable via --size)
- Default steps: 50 inference steps
- Shift: 5.0 (flow matching)
- Guide scale: 5.0 (CFG)
- FPS: 16
- Negative prompt in Chinese (common video generation artifacts)

### Tech Stack
- PyTorch 2.10.0 + CUDA
- diffusers >= 0.36.0
- transformers 4.57.3
- Triton kernels for INT8 quantization
- EasyDict for configuration

### Key Files (Matrix-Game-3)
- `generate.py` — Entry point for inference
- `pipeline/inference_interactive_pipeline.py` — Main interactive pipeline (808 lines)
- `pipeline/inference_pipeline.py` — Batch inference pipeline
- `wan/modules/model.py` — WanModel DiT implementation with INT8 support (1123 lines)
- `wan/modules/action_module.py` — Action conditioning module
- `wan/modules/attention.py` — Flash attention implementation
- `wan/modules/vae2_2.py` — Wan2.2 VAE
- `wan/modules/t5.py` — T5 encoder
- `wan/configs/config.py` — Model configuration (dim, heads, layers, etc.)
- `wan/triton_kernels.py` — Custom Triton kernels for INT8
- `utils/cam_utils.py` — Camera pose computation utilities
- `utils/utils.py` — Plucker ray computation, pose transformations

## Differences from Similar Tools

Matrix-Game 3.0 is similar to [[hunyuan-gamecraft]] (Tencent) in that both are interactive game world models conditioned on keyboard/mouse actions. Key differences:

1. **Architecture**: Matrix-Game 3.0 is based on Wan2.2 video generation architecture; Hunyuan-GameCraft uses its own architecture
2. **Memory**: Matrix-Game 3.0 explicitly implements long-horizon memory with FOV-based frame selection
3. **Streaming**: Matrix-Game 3.0 supports iterative/interactive streaming generation with real-time keyboard input
4. **Quantization**: Matrix-Game 3.0 has built-in INT8 quantization support with Triton kernels
5. **Open Source**: Both are MIT licensed

Also related to [[hy-world-1.5]] (Tencent WorldPlay) and [[cosmos]] (NVIDIA) as world model platforms.
