# Wan2.2 — Source Analysis

**Source:** https://github.com/Wan-Video/Wan2.2
**Date:** 2026-04-20
**Analyzed by:** ai-game-devtools cron

## README Summary

Wan2.2 is a major upgrade to the Wan foundational video models by Alibaba (Wan-AI/通义万相). Key innovations:

1. **MoE Architecture**: Mixture-of-Experts with high-noise and low-noise experts for diffusion denoising. Total 27B params, 14B active per step.
2. **Cinematic-level Aesthetics**: Trained on curated aesthetic data with detailed labels for lighting, composition, contrast, color tone.
3. **Complex Motion Generation**: +65.6% more images and +83.2% more videos in training data vs Wan2.1.
4. **Efficient HD Hybrid TI2V**: 5B model with Wan2.2-VAE (16×16×4 compression), 720P@24fps, runs on RTX 4090.

## Model Variants

| Model | Type | Params | Resolution | Notes |
|-------|------|--------|------------|-------|
| T2V-A14B | Text-to-Video MoE | 27B total / 14B active | 480P & 720P | MoE architecture |
| I2V-A14B | Image-to-Video MoE | 27B total / 14B active | 480P & 720P | MoE architecture |
| TI2V-5B | Text+Image-to-Video | 5B dense | 720P@24fps | High-compression VAE, consumer GPU |
| S2V-14B | Speech-to-Video | 14B | 480P & 720P | Audio-driven cinematic video |
| Animate-14B | Character Animation | 14B | 480P & 720P | Animation + replacement modes |

## Architecture Details

- **MoE Design**: Two-expert system — high-noise expert for early denoising (overall layout), low-noise expert for late denoising (detail refinement)
- **SNR-based Routing**: Signal-to-noise ratio determines which expert is active at each denoising step
- **VAE**: Wan2.2-VAE achieves 4×16×16 compression (total 4×32×32 with patchification)
- **Inference**: FSDP + DeepSpeed Ulysses for multi-GPU acceleration
- **Prompt Extension**: Dashscope API (qwen-plus/qwen-vl-max) or local Qwen models

## Code Structure

```
wan/
├── configs/          # Model configs for each variant
│   ├── wan_t2v_A14B.py
│   ├── wan_i2v_A14B.py
│   ├── wan_ti2v_5B.py
│   ├── wan_s2v_14B.py
│   └── wan_animate_14B.py
├── modules/          # Core model components
│   ├── animate/      # Character animation pipeline
│   ├── attention.py
│   └── tokenizers.py
├── utils/            # Prompt extension, solvers, utilities
├── speech2video.py   # S2V pipeline
├── animate.py        # Animate pipeline
└── image2video.py    # I2V pipeline
generate.py           # Unified inference entry point
```

## Key Features

- **ComfyUI Integration**: Official ComfyUI support (docs.comfy.org)
- **Diffusers Integration**: All 5 model variants available via HuggingFace Diffusers
- **Consumer GPU Support**: TI2V-5B runs on RTX 4090 (24GB VRAM)
- **Multi-GPU**: FSDP + DeepSpeed Ulysses parallel inference
- **Prompt Extension**: API-based (Dashscope) or local Qwen model extension
- **Speech-to-Video**: Audio + image + optional pose video → cinematic video
- **Character Animation**: Animation mode (mimic motion) + Replacement mode (swap character)

## License

Apache 2.0

## Dependencies

- torch >= 2.4.0
- torchvision >= 0.19.0
- diffusers >= 0.31.0
- transformers >= 4.49.0
- flash_attn
- opencv-python, accelerate, dashscope
