# stable-diffusion.cpp — Source Analysis

**Source:** https://github.com/leejet/stable-diffusion.cpp
**Analysis Date:** 2026-04-17

## README Summary

Diffusion model (SD, Flux, Wan, ...) inference engine implemented in pure C/C++, following the same pattern as llama.cpp. Based on the [ggml](https://github.com/ggml-org/ggml) tensor library.

### Key Features
- **Plain C/C++ implementation** based on ggml, no external ML framework dependencies
- **Supported models:** SD1.x, SD2.x, SDXL, SD-Turbo, SD3/SD3.5, FLUX.1-dev/schnell, FLUX.2-dev/klein, Chroma, Chroma1-Radiance, Qwen-Image, Z-Image, Ovis-Image, Anima, ERNIE-Image
- **Image Edit:** FLUX.1-Kontext-dev, Qwen Image Edit series
- **Video Models:** Wan2.1/Wan2.2, Wan2.1 Vace
- **Additional features:** PhotoMaker, ControlNet (SD 1.5), LoRA, LCM/LCM-LoRA, TAESD fast decoding, ESRGAN upscaling
- **Backends:** CPU (AVX/AVX2/AVX512), CUDA, Vulkan, Metal, OpenCL, SYCL, MUSA
- **Weight formats:** PyTorch checkpoint (.ckpt/.pth), Safetensors (.safetensors), GGUF (.gguf)
- **Platforms:** Linux, macOS, Windows, Android (Termux)
- **15+ sampling methods:** Euler A, Euler, Heun, DPM2, DPM++ 2M, DPM++ 2S a, LCM, ER-SDE, etc.
- **Flash Attention** for memory optimization
- **Embedded web UI** (added 2026/04/11 via PR #1408)

### Architecture
- Uses ggml tensor library (same as llama.cpp) for computation graph and backend dispatch
- CMake build system with modular backend options (SD_CUDA, SD_METAL, SD_VULKAN, SD_OPENCL, SD_SYCL, SD_MUSA)
- C API exposed via `include/stable-diffusion.h` with `SD_API` visibility macros
- Supports both static and shared library builds (SD_BUILD_SHARED_LIBS)
- ~8,300 LOC in src/ and include/ combined
- Third-party dependencies: ggml (submodule), libwebp, libwebm

### API Design
- Configuration struct (`sd_ctx_param_t`) with comprehensive options: model paths (model, CLIP, T5xxl, VAE, diffusion model, etc.), threading, weight type, RNG, prediction mode, offloading
- `new_sd_ctx()` / `free_sd_ctx()` context management
- `text_to_image()` / `image_to_image()` / `image_to_mask()` / `preprocess_canny()` / `control_stitch()` core functions
- `new_upscaler_ctx()` / `upscale()` for ESRGAN upscaling
- `new_llava_ctx()` / `llava_image_to_text()` for multimodal captioning
- Tiling parameters struct for memory-efficient large image generation
- LoRA apply modes: AUTO / IMMEDIATELY / AT_RUNTIME

### Bindings
- Golang (non-cgo): seasonjs/stable-diffusion
- Golang (cgo): Binozo/GoStableDiffusion
- C#: DarthAffe/StableDiffusion.NET
- Python: william-murray1204/stable-diffusion-cpp-python
- Rust: newfla/diffusion-rs
- Flutter/Dart: rmatif/Local-Diffusion

### UIs Using This Backend
- Jellybox, Stable Diffusion GUI, Local Diffusion, sd.cpp-webui, LocalAI, Neural-Pixel, KoboldCpp

### Notable Updates (2025-2026)
- 2026/04/11: Embedded web UI (PR #1408)
- 2026/01/18: FLUX.2-klein support (PR #1193)
- 2025/12/01: Z-Image support (PR #1020)
- 2025/11/30: FLUX.2-dev support (PR #1016)
- 2025/10/13: Qwen-Image-Edit series (PR #877)
- 2025/10/12: Qwen-Image support (PR #851)
- 2025/09/14: Wan2.1 Vace support (PR #819)
- 2025/09/06: Wan2.1/Wan2.2 support (PR #778)

### License
MIT License
