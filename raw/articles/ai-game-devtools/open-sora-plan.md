# Open-Sora Plan — Source Analysis

## Source
- GitHub: https://github.com/PKU-YuanGroup/Open-Sora-Plan
- Clone: ~/tmp/ai-game-devtools/open-sora-plan/ (from gitcode.com mirror)
- Analyzed: 2026-04-20

## README Summary

Open-Sora Plan is an open-source project to reproduce OpenAI's Sora video generation model, initiated by PKU-TuZhan AIGC Joint Laboratory.

### Version History
- **v1.5.0** (2025.06): Most powerful model. Higher-compression WFVAE (8×8×8) + improved sparse DiT architecture (SUV). 8B-scale model, 40M video samples. Fully trained/inferred on Ascend 910-series accelerators.
- **v1.3.0** (2024.10): WFVAE, prompt refiner, data filtering, sparse attention (Skiparse), bucket training. 93×480p within 24G VRAM.
- **v1.2.0** (2024.08): I2V model, 3D full attention (vs 2+1D), 4s 720p training.
- **v1.1.0** (2024.05): Improved video quality and length, fully open source.
- **v1.0.0** (2024.04): Enhanced video generation quality and text control.

### Key Technologies
1. **WFVAE (Wavelet-Driven Energy Flow VAE)**: 8×8×8 downsampling rate, achieves higher PSNR than Wan2.1's VAE while reducing latent shape by half.
2. **SUV (Sparse U-shaped DiT)**: U-shaped sparse attention architecture. Low sparsity in shallow layers, high sparsity in deep layers. 35%+ faster than Dense DiT on Ascend 910B at 121×576×1024.
3. **Adaptive Gradient Clipping**: EMA-based dynamic gradient norm threshold (3-sigma rule), replacing batch-dropping from v1.3.0.
4. **Data**: 1.1B images (Recap-DataComp-1B, COYO-700M, LAION-Aesthetics) + 40M high-quality videos (Panda-70M + internal).

### Training Pipeline
- **Text-to-Image**: 4 stages on Ascend 910B (512→384→256→256 GPUs), from 256² to 288×512, Dense MMDiT → SUV fine-tuning.
- **Text-to-Video**: 5 stages on 512 Ascend 910B, from 57×288×512 (24fps) → 121×576×1024, with progressive resolution/framerate scaling.

### Performance (VBench)
| Model | Params | Total Score | Quality | Semantic | Aesthetic |
|-------|--------|------------|---------|----------|-----------|
| HunyuanVideo | 13B | 83.24% | 85.09% | 75.82% | 60.36% |
| Open-Sora Plan v1.5.0 | 8B | 83.02% | 84.24% | 78.18% | **66.89%** |
| CogVideoX-5B | 5B | 81.61% | 82.75% | 77.04% | 61.98% |
| Mochi-1 | 10B | 80.13% | 82.64% | 70.08% | 56.94% |

### Related Projects
- **Helios** (2026.03): Real-time long video generation, 19.5 FPS on single H100 (breakthrough from same team)
- **WF-VAE**: Wavelet-Driven VAE paper (arXiv:2411.17459)
- **Allegro**: Built on Open-Sora Plan, generates 6s 720p@15fps videos

### License
MIT License (Copyright Rabbitpre Intelligence Ltd)

### Architecture Components
- Training/inference code for Open-Sora Plan v1.5.0
- WFVAE weights (8×8×8 compression)
- 8.5B SUV denoiser weights
- Also available at OpenMind and WiseModel platforms

### Key Directories (from repo structure)
- `opensora/models/causalvideovae/` — Causal Video VAE implementation
- `opensora/models/frame_interpolation/` — Frame interpolation
- `scripts/text_condition/npu/` — NPU training scripts (Ascend)
- `scripts/accelerate_configs/` — DeepSpeed configs (zero2/zero3 with/without offload)
- `docs/` — Technical reports for each version

### Notable
- Current v1.5.0 weights only compatible with NPU + MindSpeed-MM framework (GPU version coming soon)
- V1.2.0+ no longer supports 2+1D models — only true 3D architectures
- Community-driven with active Discord and WeChat groups
