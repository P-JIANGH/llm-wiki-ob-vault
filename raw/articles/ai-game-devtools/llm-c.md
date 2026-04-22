# llm.c

**GitHub:** https://github.com/karpathy/llm.c  
**Author:** Andrej Karpathy  
**License:** MIT  
**Stars:** ~24k+

## Overview

LLMs in simple, pure C/CUDA with no need for 245MB of PyTorch or 107MB of cPython. The project focuses on pretraining, reproducing the GPT-2 and GPT-3 miniseries, with a parallel PyTorch reference implementation in `train_gpt2.py` (a slightly tweaked nanoGPT). Currently, llm.c is ~7% faster than PyTorch Nightly.

## Philosophy

1. **Education first** — `dev/cuda` folder contains hand-written, well-documented kernels from simple to complex
2. **Practically fast** — incorporates fastest kernels (cuBLAS, cuBLASLt, CUTLASS, cuDNN) to reproduce big GPT-2 (1.6B) training
3. **Simplicity constraint** — mainline code in root folder stays readable; `dev/` is scratch space for experimental kernels

## Key Files

| File | Purpose | Lines |
|------|---------|-------|
| `train_gpt2.c` | Clean CPU fp32 reference implementation | ~1,000 |
| `train_gpt2.cu` | Mainline CUDA training (mixed precision, fastest) | ~1,500 |
| `train_gpt2_fp32.cu` | Legacy fp32 GPU code (simpler, more portable) | ~900 |
| `train_gpt2.py` | PyTorch reference (tweaked nanoGPT) | ~800 |
| `test_gpt2.c` / `test_gpt2.cu` | Unit tests comparing C/CUDA against PyTorch | ~300 / ~500 |
| `profile_gpt2.cu` | CUDA profiler script | ~200 |

## Architecture

- **Encoder:** Token + positional embedding lookup
- **Transformer blocks:** LayerNorm → Self-Attention (causal, multi-head) → LayerNorm → MLP (GELU)
- **Output:** Final LayerNorm → linear projection to vocab logits
- **Loss:** Cross-entropy on next-token prediction
- **Optimizer:** AdamW

## Features

- **CPU training:** OpenMP-parallelized, works on Apple Silicon / x86
- **Single-GPU:** Mixed precision (BF16/FP16/FP32), cuDNN Flash Attention (optional)
- **Multi-GPU:** MPI + NCCL, auto-detect compute capability
- **Multi-node:** OpenMPI, shared filesystem, or TCP socket NCCL initialization
- **Datasets:** TinyShakespeare, TinyStories, Fineweb, and more in `dev/data/`
- **Custom binary format:** .bin files with 1024-byte header + uint16 token stream

## Build System

Makefile-based with auto-detection:
- Compiler: clang (default) or MSVC on Windows
- CUDA: auto-detected via `nvcc`, compute capability auto-detected via `nvidia-smi`
- OpenMP: auto-detected (macOS Homebrew / Linux)
- NCCL: auto-detected for multi-GPU
- MPI: auto-detected for multi-node
- cuDNN: disabled by default (`USE_CUDNN=1` to enable)
- Precision: BF16 default, override with `PRECISION=FP32/FP16`

## Quick Start

```bash
# CPU
cd llm.c
./dev/download_starter_pack.sh
make train_gpt2
OMP_NUM_THREADS=8 ./train_gpt2

# GPU fp32 (simplest)
make train_gpt2fp32cu
./train_gpt2fp32cu

# GPU mixed precision (fastest)
make train_gpt2cu
./train_gpt2cu

# Multi-GPU
mpirun -np 4 ./train_gpt2cu
```

## Notable Forks

15+ language ports: Rust (llm.rs), Go (llm.go), Java (llm.java), C# (llm.cs), Mojo (llm.🔥), Zig (llm.zig), Swift (llm.swift), Metal (llm.metal), OpenCL, WebGPU C++ (gpu.cpp), Nim (llm.nim), Habana Gaudi2 (llm.tpc), AMD (7900 XTX), CUDA C++ (CCCL), C++/Eigen.

## Community

- Discussions: GitHub Discussions
- Discord: `#llmc` on Zero to Hero, `#llmdotc` on GPU MODE
