# MLC LLM

> Source: https://github.com/mlc-ai/mlc-llm
> Cloned: 2026-04-14

## Project Overview

**MLC LLM** is a universal LLM deployment engine with ML compilation. The mission is to enable everyone to develop, optimize, and deploy AI models natively on all platforms.

## Architecture

- **Core Engine**: MLCEngine — unified high-performance LLM inference engine across all supported platforms
- **ML Compiler Stack**: Built on TVM (TensorIR), MetaSchedule, and Apache TVM
- **Python API**: `mlc_llm` Python package (version 0.20.0.dev0)
- **C++ Core**: `cpp/` directory with submodules: `base.h`, `json_ffi`, `metadata`, `multi_gpu`, `serve`, `support`, `tokenizers`

## Supported Platforms

| Platform | AMD GPU | NVIDIA GPU | Apple GPU | Intel GPU |
|----------|---------|------------|----------|----------|
| Linux/Win | ✅ Vulkan, ROCm | ✅ Vulkan, CUDA | N/A | ✅ Vulkan |
| macOS | ✅ Metal (dGPU) | N/A | ✅ Metal | ✅ Metal (iGPU) |
| Web Browser | ✅ WebGPU and WASM | | | |
| iOS/iPadOS | ✅ Metal on Apple A-series GPU | | | |
| Android | ✅ OpenCL on Adreno GPU | | ✅ OpenCL on Mali GPU | |

## Key Modules

- `cpp/serve/` — inference serving engine
- `cpp/json_ffi/` — JSON FFI layer
- `cpp/tokenizers/` — tokenization
- `cpp/multi_gpu/` — multi-GPU support
- `python/mlc_llm/` — Python SDK
- `web/` — Web deployment (WebLLM related)
- `ios/`, `android/` — mobile deployments

## Dependencies

Key Python dependencies: `torch`, `transformers`, `tiktoken`, `sentencepiece`, `fastapi`, `uvicorn`, `safetensors`, `prompt_toolkit`, `apache-tvm-ffi`

## License

Apache 2.0

## Related Repositories

- WebLLM: https://github.com/mlc-ai/web-llm/
- Documentation: https://llm.mlc.ai/docs/

## Technical References

- TensorIR (ASPLOS 2023): Automatic Tensorized Program Optimization
- MetaSchedule (NeurIPS 2022): Tensor Program Optimization with Probabilistic Programs
- TVM (OSDI 2018): End-to-End Optimizing Compiler for Deep Learning
