# HunyuanVideo — Raw Source

**Source:** https://github.com/Tencent/HunyuanVideo
**Extracted:** 2026-04-20
**Note:** GitHub/gitcode/gitee clone all failed; content via web_extract of README

---

## Overview

HunyuanVideo is an open-source video foundation model with **13B+ parameters**, designed to match or exceed leading closed-source video generators. Developed by Tencent Hunyuan team.

- **Paper:** [HunyuanVideo: A Systematic Framework For Large Video Generation Model](https://arxiv.org/abs/2412.03603)
- **Project Page:** https://aivideo.hunyuan.tencent.com
- **HuggingFace:** https://huggingface.co/Tencent/HunyuanVideo
- **Diffusers Integration:** Available on HuggingFace
- **Replicate Demo:** https://replicate.com/zsxkib/hunyuan-video
- **Discord:** https://discord.gg/tv7FkG4Nwf

## Architecture & Key Features

### Unified Image & Video Generative Architecture
- Uses a **Transformer with Full Attention** and a `"Dual-stream to Single-stream"` hybrid design.
- **Dual-stream phase:** Video and text tokens processed independently to learn modality-specific modulation.
- **Single-stream phase:** Tokens concatenated for effective multimodal fusion, capturing complex visual-semantic interactions.

### MLLM Text Encoder
- Replaces traditional CLIP/T5-XXL with a **Decoder-Only Multimodal LLM**.
- **Advantages:** Superior image-text alignment, complex reasoning, and zero-shot learning via system instructions.
- **Innovation:** Adds a **bidirectional token refiner** to compensate for causal attention, improving text guidance for diffusion.

### 3D VAE Compression
- Trains a `CausalConv3D` VAE to compress pixel-space media into latent space.
- **Compression Ratios:** `Length: 4` | `Space: 8` | `Channel: 16`
- Enables training at **original resolution & frame rate** by drastically reducing token count.

### Prompt Rewrite System
- Fine-tuned Hunyuan-Large adapts user prompts to model-preferred formats.
- **Modes:**
  - `Normal`: Enhances intent comprehension & instruction accuracy.
  - `Master`: Optimizes composition, lighting, & camera movement for higher visual quality (may sacrifice minor semantic details).
- **Weights:** https://huggingface.co/Tencent/HunyuanVideo-PromptRewrite

## Performance & Benchmarks

Evaluated on **1,533 prompts** by **60+ professionals** (single-run, no cherry-picking). HunyuanVideo ranks **#1 overall**, excelling in motion quality.

| Model | Open Source | Text Alignment | Motion Quality | Visual Quality | Overall | Rank |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **HunyuanVideo** | ✔ | 61.8% | **66.5%** | 95.7% | **41.3%** | **1** |
| CNTopA (API) | ✘ | 62.6% | 61.7% | 95.6% | 37.7% | 2 |
| CNTopB (Web) | ✘ | 60.1% | 62.9% | 97.7% | 37.5% | 3 |
| GEN-3 alpha (Web) | ✘ | 47.7% | 54.7% | 97.5% | 27.4% | 4 |
| Luma1.6 (API) | ✘ | 57.6% | 44.2% | 94.1% | 24.8% | 5 |
| CNTopC (Web) | ✘ | 48.4% | 47.2% | 96.3% | 24.6% | 6 |

## System Requirements & Setup

- **GPU Memory (Batch=1):**
  - `720×1280×129f` → **~60GB**
  - `544×960×129f` → **~45GB**
- **Installation:** Clone repo → Use Conda → Recommended CUDA: `12.4` or `11.8`
- Pre-built Docker image available.
- Handle float-point exceptions on specific GPUs via provided workarounds.
- **Model Weights:** Download instructions in `ckpts/README.md`

## Inference & Usage

### Supported Resolutions (129 frames)
| Quality | 9:16 | 16:9 | 4:3 | 3:4 | 1:1 |
|:---|:---|:---|:---|:---|:---|
| **540p** | 544×960 | 960×544 | 624×832 | 832×624 | 720×720 |
| **720p** ⭐ | 720×1280 | 1280×720 | 1104×832 | 832×1104 | 960×960 |

### CLI Configuration
```bash
--prompt "Your text prompt"
--video-size 720 1280
--video-length 129
--infer-steps 50
--embedded-cfg-scale 6.0
--flow-shift 7.0
--flow-reverse False
--seed None
--use-cpu-offload False
--save-path ./results
```
- Run Gradio UI via `gradio_server.py`

### Multi-GPU Parallel Inference (xDiT)
- Uses **Unified Sequence Parallelism (USP)** for scalable DiT inference.
- Control parallelism via `--ulysses-degree` and `--ring-degree`.

### FP8 Quantized Inference
- **Saves ~10GB VRAM**. Requires explicit FP8 weight paths.
- FP8 weights available on HuggingFace.

## Community & Ecosystem

| Project | Focus | Creator |
|:---|:---|:---|
| ComfyUI-HunyuanVideoWrapper | FP8, V2V, IP2V | Kijai |
