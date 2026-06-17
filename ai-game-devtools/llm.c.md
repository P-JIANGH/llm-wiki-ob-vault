---
title: llm.c
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, open-source, cuda, c, training, gpt-2]
sources: [raw/articles/ai-game-devtools/llm.c.md]
---

# llm.c

## Overview

**llm.c** 是 Andrej Karpathy 的开源项目，用简洁、纯净的 C/CUDA 实现 LLM（GPT-2/GPT-3）训练，**无需 PyTorch（245MB）或 cPython（107MB）任何外部 ML 框架依赖**。项目同时提供 PyTorch 参考实现（train_gpt2.py，基于 nanoGPT）。单 GPU 上比 PyTorch Nightly 快约 7%。

## Key Facts

| | |
|---|---|
| **GitHub** | https://github.com/karpathy/llm.c |
| **License** | MIT |
| **Language** | C / CUDA C++ |
| **Main Models** | GPT-2 (124M / 355M / 1.6B), GPT-3 |
| **Author** | Andrej Karpathy |
| **Stars** | ~70k+ |

## 技术特点

### 极简依赖
训练 GPT-2 124M 只需下载预训练权重和 tokenize 数据，无需安装 PyTorch、Cython 或其他 ML 框架。一个干净的 C 编译器 + CUDA 即可。

### 数据格式
`.bin` 文件含 1024 字节 header，后续为 uint16 token id 流（GPT-2 BPE Tokenizer，vocab_size=50257）。支持 TinyShakespeare、OpenWebText、TinyStories 等数据集。

### 核心文件

| 文件 | 描述 |
|---|---|
| `train_gpt2.c` | ~1200 行 CPU fp32 参考实现，最干净可读 |
| `train_gpt2.cu` | CUDA 主线训练代码，支持 fp32 / 混合精度（bfloat16） |
| `train_gpt2_fp32.cu` | 单 GPU fp32 早期存档版本（冻结） |
| `test_gpt2.c` | CPU 单元测试，验证 C 与 PyTorch 输出一致 |
| `test_gpt2.cu` | GPU 单元测试 |
| `train_gpt2.py` | PyTorch 参考实现（对照） |
| `train_llama3.py` | Llama 3 训练参考 |
| `llmc/` | C/CUDA 共享库（utils.h, tokenizer.h, dataloader.h） |
| `dev/cuda/` | 手写 CUDA kernel 库，从简到繁，文档完善 |
| `dev/data/` | 数据集下载 + tokenize 脚本 |

### 构建与运行

```bash
# CPU 训练
make train_gpt2
OMP_NUM_THREADS=8 ./train_gpt2

# GPU fp32
make train_gpt2cu PRECISION=FP32

# GPU 混合精度 + cuDNN Flash Attention
make train_gpt2cu USE_CUDNN=1
./train_gpt2cu

# 多 GPU
mpirun -np <num_gpus> ./train_gpt2cu
```

### CUDA 优化策略
- 默认 cuBLAS / cuBLASLt 做矩阵乘（主线保持简洁可读）
- `dev/cuda/` 目录含手工优化 kernel，与 cuBLAS 性能对比
- 可选 cuDNN Flash Attention（`USE_CUDNN=1`）
- 支持多 GPU（MPI + NCCL）和多节点训练（3 种方式：MPI / 共享文件系统 / TCP Socket）

## 多语言 Fork

项目拥有极为丰富的社区移植：AMD ROCm、C#、CUDA C++ (CCCL)、Eigen C++、WebGPU、Metal (Apple Silicon)、Mojo、Rust、Go、Java、Swift、Zig、OpenCL、Nim、Habana Gaudi2 等。

## 游戏开发中的用途

对于 AI 游戏开发，llm.c 提供了：
- **轻量级本地训练**：无需 GPU 服务器，普通设备可训练小型模型
- **教育价值**：手写 CUDA kernel 可学习 LLM 底层实现
- **嵌入游戏资产管道**：训练自定义小型 GPT 模型用于游戏内 NPC 对话生成

## 相关链接

- GitHub: https://github.com/karpathy/llm.c
- nanoGPT（参考基础）: https://github.com/karpathy/nanoGPT
- 讨论区: https://github.com/karpathy/llm.c/discussions

## Related

- [[ai-scientist]] — SakanaAI 自动化科学研究框架，另一个 Karpathy 相关项目
- [[chatrwkv]] — BlinkDL RWKV-7 100% RNN LLM，另一种轻量高效 LLM 架构
