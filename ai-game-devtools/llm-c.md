---
title: llm.c
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [llm, ai, tool, open-source, cpp, cuda, education, training]
sources: [raw/articles/ai-game-devtools/llm-c.md]
---

# llm.c

**llm.c** is Andrej Karpathy's open-source project that implements LLM training in simple, pure C/CUDA with zero dependency on PyTorch (245MB) or cPython (107MB). It serves as both an educational resource and a practically fast training framework.

## Overview

The project's primary goal is reproducing the [GPT-2](https://github.com/openai/gpt-2) and [GPT-3](https://arxiv.org/abs/2005.14165) pretraining pipelines. A parallel PyTorch reference implementation lives in `train_gpt2.py` (a tweaked version of [[ai-game-devtools/nanogpt]]). The mainline CUDA code is approximately 7% faster than PyTorch Nightly.

## Architecture

The codebase implements a standard decoder-only Transformer:

1. **Token + Position Embedding** lookup
2. **N Transformer blocks**, each containing:
   - LayerNorm → Causal Multi-Head Self-Attention → Residual
   - LayerNorm → MLP (GELU activation) → Residual
3. **Final LayerNorm** → Linear projection to vocabulary logits
4. **Cross-entropy loss** on next-token prediction
5. **AdamW optimizer**

## Key Implementations

| Variant | File | Purpose |
|---------|------|---------|
| CPU Reference | `train_gpt2.c` | ~1,000 lines of clean, readable C with OpenMP |
| GPU Mixed Precision | `train_gpt2.cu` | Fastest path; BF16/FP16 + cuBLAS + optional cuDNN Flash Attention |
| GPU FP32 Legacy | `train_gpt2_fp32.cu` | Simpler, more portable; frozen early checkpoint |
| PyTorch Ref | `train_gpt2.py` | Reference for verification; tweaked [[ai-game-devtools/nanogpt]] |

## Build & Features

The Makefile auto-detects platform capabilities:
- **Compiler:** clang (Linux/macOS) or MSVC (Windows)
- **CUDA:** Auto-detected via `nvcc`; GPU compute capability queried from `nvidia-smi`
- **OpenMP:** Auto-detected (libomp on macOS, gomp on Linux)
- **NCCL:** Auto-detected for multi-GPU training
- **MPI:** Auto-detected for multi-node clusters
- **cuDNN Flash Attention:** Disabled by default (`USE_CUDNN=1` to enable; adds ~1 min compile time)
- **Precision:** BF16 default; override with `PRECISION=FP32` or `FP16`

### Quick Start

```bash
# CPU training
make train_gpt2 && OMP_NUM_THREADS=8 ./train_gpt2

# Single GPU (mixed precision)
make train_gpt2cu && ./train_gpt2cu

# Multi-GPU
mpirun -np 4 ./train_gpt2cu
```

## Data Pipeline

Datasets live in `dev/data/` and output custom `.bin` files:
- 1024-byte header
- uint16 token stream (GPT-2 tokenizer)
- Supported: TinyShakespeare, TinyStories, Fineweb, and more

## Testing

Unit tests load `gpt2_124M_debug_state.bin` (forward pass + 10 Adam steps) and verify bit-exact agreement between C/CUDA and PyTorch references. Run with:

```bash
make test_gpt2 && ./test_gpt2           # CPU
make test_gpt2cu && ./test_gpt2cu       # GPU mixed precision
```

## Ecosystem

The project has spawned 15+ language ports including Rust, Go, Java, C#, Mojo, Zig, Swift, Metal, OpenCL, WebGPU, Nim, and AMD/Habana variants. Community coordination happens in GitHub Discussions and Discord (`#llmc` on Zero to Hero, `#llmdotc` on GPU MODE).

## Comparison

Unlike [[ai-game-devtools/llama-cpp]] (inference-focused GGUF runtime) or [[ai-game-devtools/llama2-c]] (Karpathy's earlier 700-line Llama 2 inference demo), llm.c is a **full training framework** with multi-GPU/multi-node support, mixed precision, and cuDNN integration. It sits at the intersection of education and production performance.

## License

MIT © 2024 Andrej Karpathy
