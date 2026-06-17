# MoviiGen 1.1 — Raw Source

**URL:** https://github.com/ZulutionAI/MoviiGen1.1
**Captured:** 2026-04-20
**Source:** GitHub README + key source files analysis

---

## README Summary

**MoviiGen 1.1: Towards Cinematic-Quality Video Generative Models**

A cutting-edge video generation model that excels in cinematic aesthetics and visual quality. Based on Wan2.1 fine-tuning.

Evaluated by 11 professional filmmakers and AIGC creators across 60 aesthetic dimensions.

### Key Features

- **Superior Cinematic Aesthetics:** Outperforms competitors in atmosphere creation, camera movement, and object detail preservation
- **Visual Coherence & Quality:** +14.6% clarity, +4.3% realism vs competitors
- **Comprehensive Visual Capabilities:** Stable performance in complex visual scenarios
- **High-Quality Output:** 720P and 1080P resolution support
- **Professional-Grade Results:** Ideal for cinematic quality applications

### Architecture

Based on **Wan2.1** (14B parameter text-to-video DiT model) with fine-tuning for cinematic quality.

- **Framework:** Built on [FastVideo](https://github.com/hao-ai-lab/FastVideo)
- **Sequence Parallel:** Custom implementation divides temporal dimension across GPUs
- **Ring Attention:** Reduces per-device memory while maintaining quality
- **Multi Resolution Training Buckets:** Supports training at multiple resolutions
- **Mixed Precision:** BF16/FP16 support
- **Distributed Training:** Multi-node, multi-GPU support

### Model Details

- **T2V-14B Model:** Available on HuggingFace (ZuluVision/MoviiGen1.1)
- **Resolution:** 720P and 1080P (recommends 1080P, 21:9 aspect ratio 1920*832)
- **Prompt Extend Model:** Fine-tuned Qwen2.5-7B-Instruct (ZuluVision/MoviiGen1.1_Prompt_Rewriter)

### Prompt Guidelines

- Length: 100-200 tokens
- Content: scene description + main subject + events + aesthetics description + camera movement

### Technical Stack

**Dependencies:** torch>=2.4.0, torchvision>=0.19.0, opencv-python>=4.9.0.80, diffusers>=0.31.0, transformers>=4.49.0, flash_attn, gradio>=5.0.0, xfuser

**Core Modules:**
- `wan/text2video.py` — WanT2V generation class (text encoder T5 + VAE + DiT model)
- `wan/modules/model.py` — WanModel (633 lines, DiT transformer with RoPE, flash attention)
- `wan/modules/attention.py` — Flash attention implementation
- `wan/modules/vae.py` — WanVAE (3D VAE encoder/decoder)
- `wan/modules/t5.py` — T5 text encoder
- `wan/utils/prompt_extend.py` — Qwen2.5-based prompt rewriter (291 lines)
- `wan/utils/fm_solvers.py` — Flow matching schedulers (DPM++/UniPC)
- `scripts/inference/generate.py` — CLI inference
- `scripts/train/finetune.sh` — Training script
- `scripts/data_preprocess/preprocess.sh` — Data preprocessing
- `gradio/t2v_14B_singleGPU.py` — Gradio web UI

### Training Framework

Based on FastVideo with custom sequence parallel implementation.

**Data Preprocessing:** Caches videos and prompts as latents and text embeddings. Requires merge.txt → training_data.json → video_caption.json pipeline.

**Training Modes:** Single-node finetuning and multi-node distributed training.

### License

Not explicitly stated in README (check LICENSE.txt).

### Timeline

- May 12, 2025: Weights released
- May 17, 2025: Inference code and training code released
