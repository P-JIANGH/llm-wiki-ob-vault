# StreamDiffusion — Raw Source

**Source:** https://github.com/cumulo-autumn/StreamDiffusion
**arXiv:** https://arxiv.org/abs/2312.12491
**Date ingested:** 2026-04-17

## README Summary

StreamDiffusion is an innovative **diffusion pipeline designed for real-time interactive generation**. It introduces significant performance enhancements to current diffusion-based image generation techniques.

### Authors
Akio Kodaira, Chenfeng Xu, Toshiki Hazama, Takanori Yoshimoto, Kohei Ohno, Shogo Mitsuhori, Soichi Sugano, Hanying Cho, Zhijian Liu, Masayoshi Tomizuka, Kurt Keutzer

### Performance Benchmarks (RTX 4090 + i9-13900K + Ubuntu 22.04.3 LTS)

| Model | Denoising Steps | FPS (Txt2Img) | FPS (Img2Img) |
|---|---|---|---|
| SD-turbo | 1 | 106.16 | 93.897 |
| LCM-LoRA + KohakuV2 | 4 | 38.023 | 37.133 |

### 6 Key Features

1. **Stream Batch** — Streamlined data processing through efficient batch operations
2. **Residual Classifier-Free Guidance (RCFG)** — Improved guidance minimizing computational redundancy. RCFG Self-Negative: N steps (vs 2N for full CFG). RCFG Onetime-Negative: N+1 steps
3. **Stochastic Similarity Filter** — Reduces processing during video input by skipping frames with little change from previous frame
4. **IO Queues** — Efficient input/output operations management
5. **Pre-Computation for KV-Caches** — Optimized caching strategies
6. **Model Acceleration Tools** — TensorRT integration for further speedup

### Architecture (from source code)

```
streamdiffusion/
├── __init__.py              # Exports StreamDiffusion pipeline
├── pipeline.py              # Core StreamDiffusion class (496 lines)
├── image_utils.py           # Image processing (denormalize, pt_to_numpy, numpy_to_pil, postprocess_image, pil2tensor)
├── image_filter.py          # SimilarImageFilter for frame skipping
├── pip_utils.py             # Package installation utilities
├── acceleration/
│   ├── tensorrt/
│   │   ├── __init__.py      # accelerate_with_tensorrt(), EngineBuilder
│   │   ├── builder.py       # ONNX export + TensorRT engine building
│   │   ├── engine.py        # UNet2DConditionModelEngine, AutoencoderKLEngine
│   │   ├── models.py        # BaseModel, UNet, VAE, VAEEncoder model definitions
│   │   └── utilities.py     # TensorRT utility functions
│   └── sfast/__init__.py    # stable-fast acceleration
├── tools/
│   └── install-tensorrt.py  # TensorRT extension installer
├── demo/
│   ├── realtime-txt2img/    # Interactive text-to-image demo (FastAPI + React frontend)
│   └── realtime-img2img/    # Webcam/screen capture img2img demo
├── examples/
│   ├── txt2img/             # Text-to-image (single/multi)
│   ├── img2img/             # Image-to-image (single/multi)
│   ├── optimal-performance/ # Maximum FPS benchmarks
│   ├── benchmark/           # Benchmarking scripts
│   ├── vid2vid/             # Video-to-video pipeline
│   └── screen/              # Screen capture pipeline
└── utils/
    ├── viewer.py            # Image viewer utility
    └── wrapper.py           # Wrapper utilities
```

### Key Dependencies (setup.py)
- Python >= 3.10
- Core: fire, omegaconf, diffusers==0.24.0, transformers, accelerate
- Optional: xformers, torch, TensorRT (protobuf, cuda-python, onnx, onnxruntime)
- Version: 0.1.1
- License: Apache 2.0

### Installation
- pip install streamdiffusion[tensorrt] (stable) or git+https://... (latest)
- Docker support available
- Conda/venv environments supported
- Windows/Linux/macOS compatible

### CFG Type Options
- `none` — No CFG (fastest, txt2img recommended)
- `full` — Full standard CFG (2N complexity)
- `self` — RCFG Self-Negative (N complexity, default)
- `initialize` — RCFG Onetime-Negative (N+1 complexity)

### Similar Image Filter Parameters
- `similar_image_filter_threshold` (default 0.98) — cosine similarity threshold
- `similar_image_filter_max_skip_frame` (default 10) — max frames to skip

### Key Pipeline Logic
- Wraps any `StableDiffusionPipeline` from diffusers
- Uses `LCMScheduler` for latent consistency sampling
- `t_index_list` determines which denoising steps to use (e.g., [32, 45] for img2img, [0, 16, 32, 45] for txt2img)
- Supports `use_denoising_batch` for batch optimization
- `frame_buffer_size` for multi-frame processing
