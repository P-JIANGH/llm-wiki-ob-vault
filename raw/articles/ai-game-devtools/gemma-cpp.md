# gemma.cpp - Source Summary

## Project Overview

**Repository:** https://github.com/google/gemma.cpp  
**Cloned from:** gitcode.com/google/gemma.cpp (GitHub failed due to network)  
**License:** Apache 2.0 (not an officially supported Google product)

gemma.cpp is a lightweight, standalone C++ inference engine for the Gemma foundation models from Google. It focuses on simplicity and directness rather than full generality, inspired by vertically-integrated model implementations such as ggml, llama.c, and llama.rs.

## Key Architecture

### Supported Models
- **Gemma 2-3**: Standard transformer-based LLM (2B, 9B, 27B variants)
- **RecurrentGemma (Griffin)**: Recurrent layers + local attention, more efficient for longer sequences
- **PaliGemma 2**: Vision-Language Model (VLM), supports image + text input

### Core Design
- **~2K LoC core** + ~4K LoC supporting utilities — very small codebase
- **Google Highway Library** for portable SIMD CPU inference
- **CMake + Bazel** build systems
- Cross-platform: Linux, Windows, macOS

### Technical Highlights
- Mixed-precision GEMM (fp8, bf16, fp32, fp64)
- Custom fp8 format with 2-3 mantissa bits + tensor scaling
- Automatic runtime autotuning (7 parameters per matrix shape)
- Weight compression integrated directly into GEMM
- SIMD via Highway (ISA chosen at runtime)
- CCX-aware tensor parallelism, multi-socket thread pool
- Memory map or parallel read for disk I/O
- Custom forward/backward-compatible metadata serialization
- Model conversion from Safetensors (not yet open sourced)

### Frontends
- C++ APIs with streaming (single query and batched inference)
- Basic interactive command-line app
- Python bindings (pybind11)

## Directory Structure
```
gemma.cpp/
├── gemma/           # Core inference: gemma.cc/h, attention.cc/h, configs.cc/h, weights.cc/h, tokenizer.cc/h, kv_cache.cc/h
├── ops/             # Matrix multiplication: matmul.cc/h, matvec-inl.h, ops.h
├── compression/     # Weight compression: sfp (switched fp), nuq (non-uniform 4-bit)
├── paligemma/       # Vision encoder: image.cc/h, vit.cc/h
├── io/              # I/O: blob_store, io.h, migrate_weights.cc
├── util/            # Threading, allocator, basics
├── examples/        # CLI examples
├── eval/            # Benchmarking
├── BUILD.bazel      # Bazel config
├── CMakeLists.txt   # CMake config
```

## Notable Dependencies
- Google Highway (SIMD)
- SentencePiece (tokenizer)
- nlohmann/json
- Google Benchmark

## Independent Projects Using gemma.cpp
- gemma-cpp-python (Python bindings)
- lua-cgemma (Lua bindings)
- Godot engine demo project

## Related
- [[gemma]] (PyTorch implementation) — official Google implementation with full training support
- [[llm.c]] (karpathy/llm.c) — similar C-only LLM inference approach
