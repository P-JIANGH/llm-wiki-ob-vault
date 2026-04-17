---
title: StreamDiffusion — Real-Time Interactive Image Generation Pipeline
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, python, diffusion, image-generation, open-source, real-time, tensorrt]
sources: [raw/articles/ai-game-devtools/streamdiffusion.md]
---

# StreamDiffusion

**StreamDiffusion** is a **pipeline-level solution for real-time interactive image generation** built on top of the `diffusers` library. It wraps any StableDiffusionPipeline and achieves up to **106 FPS** (SD-turbo, RTX 4090) through six optimization techniques working together. arXiv paper: [2312.12491](https://arxiv.org/abs/2312.12491). Apache 2.0 licensed.

## What It Is

A Python library (v0.1.1) that transforms standard diffusion pipelines into **real-time streams** by batching denoising steps, applying residual classifier-free guidance, filtering similar frames, and optionally accelerating with TensorRT. Compatible with any `diffusers` model (SD, SDXL, LCM, SD-turbo).

## 6 Core Optimization Techniques

| Technique | What It Does | Impact |
|---|---|---|
| **Stream Batch** | Batches all denoising steps into single forward pass | Reduces kernel launch overhead |
| **Residual CFG (RCFG)** | Approximates CFG in N or N+1 steps vs 2N | Cuts guidance computation by 50%+ |
| **Stochastic Similarity Filter** | Skips frames with cosine similarity > 0.98 | Reduces GPU load during low-motion video |
| **IO Queues** | Async input/output management | Smoother real-time streaming |
| **KV-Cache Pre-computation** | Caches text encoder KV states | Eliminates redundant text encoding |
| **TensorRT Acceleration** | Compiles UNet/VAE to TensorRT engines | Additional 20-40% speedup on NVIDIA GPUs |

## Performance Benchmarks

| Model | Denoising Steps | Txt2Img FPS | Img2Img FPS |
|---|---|---|---|
| SD-turbo | 1 | **106.16** | **93.90** |
| LCM-LoRA + KohakuV2 | 4 | 38.02 | 37.13 |

*(Tested on RTX 4090 + i9-13900K + Ubuntu 22.04.3 LTS)*

## Key Architecture

```python
# Core usage pattern — wrap any StableDiffusionPipeline
from diffusers import StableDiffusionPipeline
from streamdiffusion import StreamDiffusion

pipe = StableDiffusionPipeline.from_pretrained("model-id").to("cuda")
stream = StreamDiffusion(
    pipe,
    t_index_list=[32, 45],       # which denoising steps to sample
    torch_dtype=torch.float16,
    cfg_type="self",              # RCFG Self-Negative (N steps)
)
stream.load_lcm_lora()           # Merge LCM if model isn't already LCM
stream.fuse_lora()
stream.prepare(prompt="...")
# Run stream — each call produces one frame
x_output = stream(init_image)
```

### Residual CFG (RCFG) Modes

- **`none`** — No guidance (fastest, recommended for txt2img)
- **`full`** — Standard CFG (2N complexity)
- **`self`** — RCFG Self-Negative (N complexity, **default**)
- **`initialize`** — RCFG Onetime-Negative (N+1 complexity, supports negative prompts)

### Stochastic Similarity Filter

Skips processing when consecutive frames are similar (cosine similarity > threshold). Configurable via:
- `similar_image_filter_threshold` (default: 0.98)
- `similar_image_filter_max_skip_frame` (default: 10)

## Module Structure

- **`pipeline.py`** — Core `StreamDiffusion` class (496 lines): initialization, LCM LoRA loading, txt2img/img2img forward passes, warmup, filter management
- **`image_filter.py`** — `SimilarImageFilter`: cosine similarity comparison + probabilistic skip logic
- **`image_utils.py`** — Tensor/numpy/PIL conversion utilities, denormalization, postprocessing
- **`acceleration/tensorrt/`** — ONNX export → TensorRT engine compilation for UNet + VAE encoder/decoder
- **`acceleration/sfast/`** — stable-fast acceleration backend

## Technical Stack

| Component | Detail |
|---|---|
| Python | >= 3.10 |
| Core | diffusers 0.24.0, transformers, accelerate, fire, omegaconf |
| Acceleration | TensorRT (optional), xformers, stable-fast |
| Scheduler | LCMScheduler (latent consistency) |
| Supported Models | Any StableDiffusionPipeline (SD 1.5, SDXL, SD-turbo, LCM models) |
| License | Apache 2.0 |

## Use Cases for Game Development

- **Real-time asset generation** — In-editor concept art generation at interactive speeds
- **Live texture synthesis** — Generate/modify textures from camera or sketch input
- **Dynamic NPC portraits** — Real-time character face generation from text/audio
- **Video-to-video style transfer** — Apply artistic styles to gameplay footage in near real-time
- **Prototyping tools** — Rapid iteration on visual concepts without waiting for traditional diffusion pipelines

## Comparison with Alternatives

Unlike [[ai-game-devtools/stable-diffusion]] (original batch diffusion) and [[ai-game-devtools/comfyui]] (visual workflow UI), StreamDiffusion focuses specifically on **latency optimization** — making diffusion usable for interactive/real-time applications rather than quality or workflow flexibility. It is orthogonal to [[ai-game-devtools/controlnet]] (which adds spatial control) and can be combined with it.

## Links

- GitHub: https://github.com/cumulo-autumn/StreamDiffusion
- arXiv: https://arxiv.org/abs/2312.12491
- Hugging Face Papers: https://huggingface.co/papers/2312.12491
- Team: Aki (cumulo-autumn), Chenfeng Xu, ddPn08, ramune, and 5 others
