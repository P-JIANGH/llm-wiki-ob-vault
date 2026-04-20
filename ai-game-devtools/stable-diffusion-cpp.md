---
title: stable-diffusion.cpp
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/stable-diffusion-cpp.md]
---

# stable-diffusion.cpp

> leejet 基于 ggml 的纯 C/C++ 扩散模型推理引擎，类 llama.cpp 架构，无需外部 ML 框架依赖，支持 SD/FLUX/Wan 等 15+ 模型家族，MIT 许可

## 概述

stable-diffusion.cpp 是一个纯 C/C++ 实现的扩散模型推理引擎，基于 [ggml](https://github.com/ggml-org/ggml) 张量库，架构思路与 llama.cpp 一致。项目活跃开发中，持续扩展对新模型的支持，最新已支持 FLUX.2、Wan2.2、Qwen-Image 等前沿模型。

## 技术架构

### 核心设计
- **ggml 后端**：使用 ggml 计算图和后端调度，与 llama.cpp 共享基础设施
- **纯 C/C++ 实现**：无外部 ML 框架依赖（无 PyTorch/TensorFlow），编译即可运行
- **C API 导出**：`stable-diffusion.h` 提供完整的 C 语言 API，便于多语言绑定
- **CMake 模块化构建**：通过选项切换不同 GPU 后端（CUDA/Metal/Vulkan/OpenCL/SYCL/MUSA）

### 支持的模型家族（截至 2026/04）
| 类别 | 模型 |
|------|------|
| 图像生成 | SD1.x/SD2.x/SDXL、SD-Turbo、SD3/SD3.5、FLUX.1-dev/schnell、FLUX.2-dev/klein、Chroma、Chroma1-Radiance、Qwen-Image、Z-Image、Ovis-Image、Anima、ERNIE-Image |
| 图像编辑 | FLUX.1-Kontext-dev、Qwen Image Edit 系列 |
| 视频生成 | Wan2.1/Wan2.2、Wan2.1 Vace |
| 增强功能 | PhotoMaker（身份保留）、ControlNet（SD 1.5）、LoRA、LCM/LCM-LoRA、TAESD 快速解码、ESRGAN 超分 |

### 量化与权重格式
- 支持 41 种 ggml 量化格式：F32/F16/BF16、Q4_0~Q6_K、IQ 系列、MXFP4/NVFP4 等
- 输入权重格式：PyTorch checkpoint (.ckpt/.pth)、Safetensors (.safetensors)、GGUF (.gguf)

### 采样器与调度器
- **15+ 采样方法**：Euler A、Euler、Heun、DPM2、DPM++ 2M、DPM++ 2S a、LCM、ER-SDE 等
- **11 种调度器**：Discrete、Karras、Exponential、AYS、GITS、SGM Uniform、LCM 等

### GPU 后端矩阵
| 后端 | 编译选项 | 适用硬件 |
|------|----------|----------|
| CPU | 默认 | x86 AVX/AVX2/AVX512 |
| CUDA | `-DSD_CUDA=ON` | NVIDIA GPU |
| Metal | `-DSD_METAL=ON` | Apple Silicon / AMD GPU |
| Vulkan | `-DSD_VULKAN=ON` | 跨平台 GPU |
| OpenCL | `-DSD_OPENCL=ON` | 通用 GPU |
| SYCL | `-DSD_SYCL=ON` | Intel GPU |
| MUSA | `-DSD_MUSA=ON` | 摩尔线程 GPU |

## API 设计

核心 API 采用上下文管理模式：
```c
// 创建推理上下文
sd_ctx_t* new_sd_ctx(const sd_ctx_param_t* param);
// 文生图
uint8_t* text_to_image(sd_ctx_t* sd_ctx, const char* prompt, ...);
// 图生图
uint8_t* img_to_img(sd_ctx_t* sd_ctx, const uint8_t* img, ...);
// ESRGAN 超分
upscaler_ctx_t* new_upscaler_ctx(const upscaler_ctx_param_t* param);
uint8_t* upscale(upscaler_ctx_t* upscaler_ctx, ...);
```

## 多语言绑定
- **Go**（无 CGO）：seasonjs/stable-diffusion
- **Go**（CGO）：Binozo/GoStableDiffusion
- **C#**：StableDiffusion.NET
- **Python**：stable-diffusion-cpp-python
- **Rust**：diffusion-rs
- **Flutter/Dart**：Local-Diffusion（Android 本地部署）

## 许可证

MIT License — 可商用

## 相关链接

- GitHub: https://github.com/leejet/stable-diffusion.cpp
- Releases: https://github.com/leejet/stable-diffusion.cpp/releases
- ggml: https://github.com/ggml-org/ggml

## 与同类工具差异

与 [[ai-game-devtools/stable-diffusion]] 原始 Python 实现相比，本项目完全用 C/C++ 重写推理逻辑，不依赖 PyTorch。与 [[ai-game-devtools/comfyui]]（节点图式 SD 引擎）相比，stable-diffusion.cpp 是底层推理库而非用户界面。与 [[ai-game-devtools/text-generation-webui]] 类似定位到 llama.cpp 在 LLM 生态中的角色——提供轻量、可嵌入、跨平台的本地推理能力。

## 近期更新

- **2026/04/11**：内置 Web UI（PR #1408）
- **2026/01/18**：FLUX.2-klein 支持
- **2025/12/01**：Z-Image 支持
- **2025/11/30**：FLUX.2-dev 支持
- **2025/10/13**：Qwen-Image-Edit 系列
- **2025/10/12**：Qwen-Image 支持
- **2025/09/14**：Wan2.1 Vace 支持
- **2025/09/06**：Wan2.1/Wan2.2 支持
