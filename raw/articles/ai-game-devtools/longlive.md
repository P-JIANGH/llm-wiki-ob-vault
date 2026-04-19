# LongLive: Real-time Interactive Long Video Generation

**Source:** https://github.com/NVlabs/LongLive
**Paper:** https://arxiv.org/abs/2509.22622
**Model:** https://huggingface.co/Efficient-Large-Model/LongLive-1.3B

## Overview

LongLive is an NVIDIA Labs (NVlabs) research project for real-time interactive long video generation. It accepts sequential user prompts and generates corresponding videos in real time, enabling user-guided long video creation.

**Accepted by ICLR 2026.**

## Key Metrics

- **Max video length:** Up to 240s (4 minutes) with visual consistency
- **Inference speed:** 20.7 FPS on single H100 GPU; 24.8 FPS with FP8 quantization
- **Fine-tuning cost:** Extends a short-clip model to minute-long generation in 32 H100 GPU-days
- **Model size:** LongLive-1.3B (available on HuggingFace)

## Architecture

- **Base model:** Built on Wan (Wan2.1) diffusion model
- **Training paradigm:** Self-Forcing (from Self-Forcing codebase)
- **Core technique:** Score Distillation Training with KV-cache and causal inference
- **Attention:** Local attention with scheduled `local_attn_size` per denoising timestep
- **KV caching:** Progressive KV cache and cross-attention cache for autoregressive chunk generation

### Key Modules

- **pipeline/**
  - `CausalInferencePipeline` — autoregressive video generation with KV cache
  - `SelfForcingTrainingPipeline` — chunk-by-chunk training with gradient scheduling
  - `InteractiveCausalInferencePipeline` — real-time interactive inference
  - `StreamingTraining` / `StreamingSwitchTraining` — streaming variants
- **model/**
  - `DMD` / `DMD_Switch` — Distribution Matching Distillation models
  - `StreamingTraining` model wrapper
- **wan/** — Wan model integration (text2video, image2video pipelines)
- **utils/** — Dataset, distributed training, LoRA utilities, memory management, scheduler
- **trainer/** — `ScoreDistillationTrainer` for score distillation training

### Training Pipeline

1. **Init training** (`train_init.sh` / `longlive_train_init.yaml`): Extend short-clip model
2. **Long training** (`train_long.sh` / `longlive_train_long.yaml`): Train for long sequence generation
3. Uses `ScoreDistillationTrainer` with configuration from OmegaConf YAML files

### Inference

- `inference.py` / `inference.sh` — batch text-to-video inference
- `interactive_inference.py` / `interactive_inference.sh` — real-time interactive mode
- Supports LoRA adapters for style/condition customization
- DynamicSwapInstaller for low-memory GPU environments (<40GB VRAM)
- Distributed inference support (NCCL backend)

## Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | PyTorch, diffusers 0.31.0 |
| Transformers | transformers >= 4.49.0 |
| Distributed | torch.distributed (NCCL) |
| Config | OmegaConf |
| Logging | Weights & Biases (wandb) |
| LoRA | PEFT |
| Precision | BF16, FP8 (via torchao) |
| Quantization | ONNX Runtime, TensorRT, pycuda |

## License

Apache 2.0 (changed from CC-BY-NC-SA 4.0 on 2025.11.1)

## Timeline

- 2025.09.29: Initial release (paper, code, model weights, demo)
- 2025.09.30: Example prompts released
- 2025.10.01: Compared vs Sora2 + GPT-5
- 2025.10.11: Interactive UI by community (scope project)
- 2025.11.01: License changed to Apache 2.0
- 2025.11.03: SANA-Video linear attention support added (60s interactive videos)
- 2025.12.04: Bugfix for `global_sink==False` mode (higher quality)
- 2026.01.11: KV-cache relative RoPE support for infinite video generation
- 2026.01.27: Accepted by ICLR 2026

## Authors

Shuai Yang, Wei Huang, Ruihang Chu, Yicheng Xiao, Yuyang Zhao, Xianbang Wang, Muyang Li, Enze Xie, Yingcong Chen, Yao Lu, Song Han, Yukang Chen

## Related Projects

- Self-Forcing (base algorithm)
- Wan2.1 (base model)
- SANA-Video (linear attention variant)
