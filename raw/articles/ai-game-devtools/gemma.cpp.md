# gemma.cpp

Source: https://github.com/google/gemma.cpp (cloned 2026-04-22 via gitcode mirror)
License: Apache 2.0

## Overview

gemma.cpp is a lightweight, standalone C++ inference engine for the Gemma foundation models from Google. It provides a minimalist implementation of Gemma-2, Gemma-3, and PaliGemma-2 models, focusing on simplicity and directness rather than full generality.

## Motivation

Modern LLM inference engines are sophisticated systems. There is a gap between deployment-oriented C++ inference runtimes (not designed for experimentation) and Python-centric ML research frameworks (which abstract away low-level computation). gemma.cpp fills this gap by providing an experimental runtime that is flexible and approachable for research use cases.

## Key Features

### Models Supported
- Gemma 2 (2B, 9B, 27B)
- Gemma 3
- Griffin (SSM - State Space Model, RecurrentGemma)
- PaliGemma 2 (Vision-Language Model)

### Optimizations
- **CPU-only inference** using Google Highway library for portable SIMD
- **Mixed-precision GEMM**: fp8, bf16, fp32, fp64
- **Weight compression**: custom fp8 format with 2-3 mantissa bits, NUQ (non-uniform 4-bit), bf16
- **Automatic runtime autotuning**: 7 parameters per matrix shape
- **Tensor parallelism**: CCX-aware, multi-socket thread pool
- **Memory mapping**: efficient disk I/O with parallel read options

### Architecture

4-layer implementation stack:
1. **Frontends** (`run.cc`): Interactive interfaces, CLI, automation orchestration
2. **Models** (`gemma.cc`, `gemma.h`, `configs.h`): Compute graph with transformer operations
3. **Operations** (`ops.h`): Transformer and mathematical operations
4. **Backend** (`highway`): Low-level hardware interface (SIMD)

Supporting utilities:
- `compression/`: Model compression operations
- `util/`: Command line handling and utilities

### APIs
- C++ API with streaming for single query and batched inference
- Python bindings (pybind11)
- C API for DLL/shared library builds
- C# interop support

## Build System

Supports both CMake and Bazel:

```bash
# CMake
cmake -B build
cmake --build build -j$(nproc)

# Bazel
bazel build -c opt --cxxopt=-std=c++20 :gemma
```

Dependencies:
- Google Highway (SIMD library)
- SentencePiece (tokenizer)
- nlohmann/json
- Google Benchmark (optional)

## Model Weights

Uses custom `.sbs` (stripped binary blob) format for fast loading. Weights available from:
- Kaggle: https://www.kaggle.com/models/google/gemma-2
- HuggingFace Hub

Weight variants:
- `-sfp`: 8-bit switched floating point (recommended, faster)
- `-bf16`: BFloat16 (higher fidelity)

## Usage Example

```bash
./gemma --tokenizer tokenizer.spm --weights gemma2-2b-it-sfp.sbs
```

### PaliGemma 2 VLM Example
```bash
./gemma \
  --tokenizer paligemma_tokenizer.model \
  --weights paligemma2-3b-mix-224-sfp.sbs \
  --image_file image.ppm
```

## Code Statistics

- ~2K LoC core implementation
- ~4K LoC supporting utilities
- ~6K LoC total for full functionality

## Development

- **Active branch**: `dev` (PRs should target dev, not main)
- **Community**: Discord server available
- **Style**: clang-format configuration provided
- **Testing**: Google Test integration (optional via GEMMA_ENABLE_TESTS)

## Design Priorities

1. **Maximize Leverage with Narrow Scope**: Focus on specific models, trade generality for simplicity
2. **Data Oriented Design**: Batches of POD types, minimize control flow
3. **Prioritize Small Batch Latency**: Local, interactive use cases over throughput
4. **Maintain Portable Baseline**: CPU SIMD baseline with future accelerator support

## Related Projects

- [llama.cpp](https://github.com/ggerganov/llama.cpp): Similar C++ inference engine for LLaMA
- [llama2.c](https://github.com/karpathy/llama2.c): Minimal C implementation by Karpathy
- [ggml](https://github.com/ggerganov/ggml): Tensor library for ML

## Independent Projects Using gemma.cpp

- gemma-cpp-python: Python bindings
- lua-cgemma: Lua bindings
- Godot engine demo project

## Contributors

Started by Austin Huang and Jan Wassenberg (Google), released February 2024. Major contributions from Phil Culliton, Paul Chang, Dan Zheng, and others.

## License

Apache 2.0 - See LICENSE file

---

Note: This is not an officially supported Google product.
