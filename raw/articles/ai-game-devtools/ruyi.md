# Ruyi-Models — 图像到视频生成模型

**Source:** https://github.com/IamCreateAI/Ruyi-Models
**Date:** 2026-04-20

## Overview

Ruyi 是 CreateAI 团队开源的图像到视频（Image-to-Video）模型，能够以 768 分辨率生成 24fps、5秒/120帧的电影级视频。支持镜头控制（camera control）和运动幅度控制（motion amplitude control）。在 RTX 3090/4090 上可无损生成 512 分辨率/120帧视频。

## Key Facts

- **模型:** Ruyi-Mini-7B（7B 参数）
- **类型:** Image-to-Video 扩散模型
- **分辨率:** 512 & 768
- **帧率:** 24 fps
- **最大帧数:** 120 帧（5秒视频）
- **许可证:** Apache 2.0
- **存储大小:** 17 GB
- **HuggingFace:** IamCreateAI/Ruyi-Mini-7B

## Architecture

### 核心组件

1. **VAE:** AutoencoderKLMagvit — OmniGen 风格的 3D CNN 自编码器，基于 MagViT 架构，支持时空压缩
2. **Transformer:** HunyuanTransformer3DModel — 基于 Hunyuan 架构的 3D 扩散 Transformer，basic block 类型，带 time position encoding
3. **图像编码器:** CLIPVisionModelWithProjection — 用于提取输入图像的视觉特征
4. **Pipeline:** RuyiInpaintPipeline — 基于 diffusers 的 inpaint 管线

### 调度器支持

- Euler / Euler Ancestral / DPM++ / PNDM / DDIM（5种调度器可选）

### 控制机制

通过 embeddings.safetensors 中预训练的 positive/negative embeddings 实现：
- **镜头控制:** static/left/right/up/down/auto
- **运动控制:** 1(最小)/2(正常)/3(显著)/4(大幅)/auto

### GPU 内存优化

两级优化策略：
- **GPU_memory_mode:** normal_mode / low_memory_mode（顺序 CPU offload）
- **GPU_offload_steps:** 0-10 级中间变量 CPU 卸载

RTX 4090 (24GB) 参考数据：
| 分辨率 | 帧数 | GPU 内存 | 生成时间 |
|-------|------|---------|---------|
| 512   | 120  | ~21GB   | ~9min   |
| 768   | 48   | ~19GB   | ~8min   |
| 768   | 72   | ~16GB   | ~19min  |

### FP8 量化

4档量化模式：bf16 > fp8_lite > fp8_strong > fp8_extreme
- extreme 模式将所有非 Embedding/LayerNorm/Conv2d 模块转为 FP8
- 支持 fp8_e5m2 和 fp8_e4m3fn 两种数据类型

### TeaCache 加速

- 基于缓存的去噪步跳过机制
- 阈值 0.10 可缓存 6-8 步，0.15 可缓存 10-12 步
- 首尾各可设置跳过的步数

### Enhance-A-Video

- 集成 NUS-HPC-AI-Lab 的 Enhance-A-Video 节点
- 通过加权增强视频质量，建议权重 < 10

## ComfyUI 集成

提供 3 个自定义节点：
1. **Load Model** — 模型加载（支持自动下载和更新）
2. **Load LoRA** — LoRA 权重加载（放置在 ComfyUI/models/loras）
3. **Sampler for Image to Video** — 图像到视频生成

ComfyUI 工作流支持：
- 起始帧图像 → 视频
- 起始帧 + 结束帧 → 视频（首尾帧插值）
- 支持 TeaCache 和 Enhance-A-Video 节点链接

## Dependencies

核心依赖：PyTorch, diffusers>=0.28.2, transformers>=4.37.2, accelerate>=0.26.0
其他：Pillow, einops, safetensors, timm, tomesd, torchdiffeq, torchsde, decord, opencv-python, omegaconf

## 模块结构

```
ruyi/
├── models/              # 模型定义
│   ├── transformer3d.py  # HunyuanTransformer3DModel (3D DiT)
│   ├── transformer2d.py  # 2D Transformer 基础
│   ├── autoencoder_magvit.py  # VAE
│   ├── attention.py     # 注意力机制
│   ├── motion_module.py # 时序运动模块
│   └── embeddings.py    # 位置编码等
├── vae/ldm/             # VAE 实现（3D CNN + attention）
├── pipeline/            # RuyiInpaintPipeline
├── data/                # 数据采样（bucket_sampler）
├── utils/               # 工具函数（LoRA/扩散/辅助）
└── comfyui/             # ComfyUI 节点实现
```

## 与同类工具差异

- 与 hunyuan-video（腾讯混元）不同：Ruyi 专注图像条件视频生成（非文本到视频），参数更小（7B vs 13B+），支持首尾帧双条件输入
- 与 ltx-video（Lightricks）不同：LTX-Video 是统一 T2V/I2V/V2V 多模式 DiT，Ruyi 专精 I2V 且支持精细的镜头/运动控制
- 与 cogvideox（智谱 CogVideoX）不同：CogVideoX 主要 T2V/I2V 并重，Ruyi 纯 I2V，ComfyUI 集成更完整
- 与 mochi-1 不同：Ruyi 可在消费级 GPU（RTX 3090/4090）运行，Mochi 1 需 ~60GB VRAM
