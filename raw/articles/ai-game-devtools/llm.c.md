# llm.c — Raw Source

**Source:** https://github.com/karpathy/llm.c
**License:** MIT
**Date:** 2026-04-14

## Overview

Karpathy 的 llm.c 项目：用简洁、纯净的 C/CUDA 实现 LLM 训练，无需 PyTorch（245MB）或 cPython（107MB）依赖。当前重点是复现 GPT-2 和 GPT-3 系列模型，同时提供并行 PyTorch 参考实现（train_gpt2.py，基于 nanoGPT）。

核心成果：在单 GPU 上比 PyTorch Nightly 快约 7%。

## 主要文件

| 文件 | 描述 |
|------|------|
| `train_gpt2.c` | ~1200 行，CPU fp32 参考实现，干净可读 |
| `train_gpt2.cu` | CUDA 主线训练代码，支持 fp32 / 混合精度 |
| `train_gpt2_fp32.cu` | 单 GPU fp32 代码，冻结存档（早期 Checkpoint） |
| `test_gpt2.c` | CPU 单元测试，验证 C 代码与 PyTorch 结果一致 |
| `test_gpt2.cu` | GPU 单元测试 |
| `train_gpt2.py` | PyTorch 参考实现（train_gpt2.c 的对照） |
| `train_llama3.py` | Llama 3 训练参考实现 |
| `Makefile` | 构建系统，自动检测 GPU compute capability |
| `llmc/` | C/CUDA 共享工具库（utils.h, tokenizer.h, dataloader.h） |
| `dev/cuda/` | 手写 CUDA kernel 库，从简到繁，文档完善 |
| `dev/data/` | 数据集下载 + tokenize 脚本，输出 .bin 文件 |
| `doc/` | Layer 实现教程（如 LayerNorm 逐步指南） |

## 架构特点

### 极简依赖
- 纯 C/CUDA，零外部 ML 框架依赖
- 训练 GPT-2 124M 只需下载 GPT-2 权重 + tokenize 数据，无庞大 PyTorch 环境

### 数据格式
- `.bin` 文件含 1024 字节 header，之后是 uint16 token id 流
- 使用 GPT-2 BPE Tokenizer（vocab_size=50257）
- 支持数据集：TinyShakespeare、OpenWebText、TinyStories 等

### CUDA 优化
- 默认使用 cuBLAS / cuBLASLt 进行矩阵乘法（主线代码保持简洁）
- `dev/cuda/` 目录下有手工优化 kernel 库，可与 cuBLAS 性能对比
- 可选 cuDNN Flash Attention（需编译时开启 `USE_CUDNN=1`）
- 支持多 GPU（MPI + NCCL）和多节点训练（3 种方式：MPI / FS / TCP）

### 精度模式
- fp32：兼容性最好，单 GPU 可运行
- 混合精度（bfloat16 + fp32）：主线训练默认，更快
- cuDNN 加速：可选，开启后编译时间从几秒增至约 1 分钟

### 构建
```bash
# CPU 训练
make train_gpt2
OMP_NUM_THREADS=8 ./train_gpt2

# GPU fp32
make train_gpt2cu PRECISION=FP32

# GPU 混合精度 + cuDNN
make train_gpt2cu USE_CUDNN=1

# 多 GPU
mpirun -np <num_gpus> ./train_gpt2cu
```

## 著名 Fork（多语言移植）

| 语言 | 仓库 |
|------|------|
| C# | llm.cs（多版本） |
| CUDA C++ | llm.cpp (gevtushenko) 使用 CCCL |
| C++/CUDA | llmcpp 使用 Eigen |
| WebGPU C++ | gpu.cpp |
| Metal | llm.metal（Apple Silicon） |
| Mojo | llm.mojo |
| Rust | llm.rs（多版本） |
| Go | llm.go |
| Java | llm.java |
| Swift | llm.swift |
| Zig | llm.zig |
| AMD ROCm | llm.c (anthonix) |
| OpenCL | llm.c (krrishnarraj) |
| Nim | llm.nim |

## License

MIT
