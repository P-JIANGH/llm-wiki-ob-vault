---
title: HunyuanVideo-1.5
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, tool, multimodal]
sources: [raw/articles/ai-game-devtools/hunyuanvideo-1-5.md]
---

# HunyuanVideo-1.5

腾讯混元团队发布的**轻量级视频生成模型**（8.3B 参数），在消费级 GPU 上即可运行，实现顶级视频生成质量与运动连贯性。

## 概览

- **GitHub:** https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5
- **论文:** [arXiv:2511.18870](https://arxiv.org/pdf/2511.18870)
- **官方网站:** https://hunyuan.tencent.com/video/zh
- **HuggingFace:** https://huggingface.co/tencent/HunyuanVideo-1.5
- **许可证:** Tencent Hunyuan Community License

## 核心架构

### 8.3B 参数 DiT + 3D Causal VAE
- **Transformer：** 8.3B 参数 Diffusion Transformer，集成 SSTA（Selective and Sliding Tile Attention）机制，剪枝冗余时空 KV block
- **VAE 压缩：** 空间 16× + 时间 4× 压缩比，降低计算开销
- **文本编码：** MLLM (Qwen2.5-VL-7B-Instruct) + byT5 (Glyph-SDXL-v2) 双编码器
- **视觉编码（I2V）：** Siglip (FLUX.1-Redux-dev) 作为参考图像编码器

### 加速技术
- **CFG 蒸馏：** 2× 推理加速（CFG scale 降至 1）
- **Step 蒸馏：** 480p I2V 仅需 8/12 步，RTX 4090 上 75 秒完成（加速 75%）
- **稀疏注意力：** Flex-Block-Attention + SageAttention，10 秒 720p 视频 1.87× 加速（对比 FlashAttention-3）
- **缓存推理：** DeepCache/TeaCache/TaylorCache 训练免费加速
- **FP8 GEMM：** sgl-kernel 支持 FP8 矩阵运算

### 视频超分网络
- 480→720p（6 steps）和 720→1080p（8 steps）少步超分，提升清晰度并修正畸变

## 模型变体

| 模型 | 分辨率 | 模式 | 推理步数 |
|------|--------|------|---------|
| 480p T2V | 480p | 文生视频 | 50 |
| 480p I2V | 480p | 图生视频 | 50 |
| 480p I2V Step Distilled | 480p | 图生视频（加速） | 8/12 |
| 720p T2V | 720p | 文生视频 | 50 |
| 720p I2V | 720p | 图生视频 | 50 |
| 720p I2V Sparse CFG Distilled | 720p | 图生视频（稀疏+蒸馏） | 50 |
| 720p SR | 480→720 | 超分 | 6 |
| 1080p SR | 720→1080 | 超分 | 8 |

## 系统要求

- **最低 VRAM：** 14GB（开启 CPU offloading）
- **Python：** 3.10+
- **PyTorch：** ≥2.6.0

## 推理方式

1. **源码推理：** `torchrun --nproc_per_node=N generate.py`（多卡并行）
2. **Diffusers：** `HunyuanVideo15Pipeline.from_pretrained()`（HuggingFace 官方集成）
3. **ComfyUI：** 官方指南 + 社区插件（comfyui_hunyuanvideo_1_5_plugin）
4. **LightX2V：** 第三方轻量推理框架

## 训练

- **Optimizer：** Muon（动量 + Newton-Schulz 正交化，加速收敛）
- **分布式：** FSDP、Context Parallel、Gradient Checkpointing
- **LoRA 微调：** 支持，使用 Muon optimizer（r=8, alpha=16）
- **训练代码：** 已开源（`train.py`）

## 与同类工具比较

- 相比 [[ai-game-devtools/hunyuan-video]]（13B+ 参数）：1.5 版本参数减少 36%，最低 VRAM 从 ~60GB 降至 14GB，新增蒸馏加速和三级超分管线
- 相比 [[ai-game-devtools/cogvideox]]：HunyuanVideo-1.5 参数量更大（8.3B vs 5B），但优化后可在更低 VRAM 上运行，且提供完整的训练代码和 LoRA 微调支持
- 相比 [[ai-game-devtools/mochi-1]]：1.5 支持 I2V 和超分，Mochi 1 仅支持 T2V

## 社区生态

- **Diffusers** — HuggingFace 官方集成
- **ComfyUI** — 官方指南 + 社区插件
- **LightX2V** — 轻量高效视频生成框架
- **Wan2GP v9.62** — 低至 6GB VRAM 运行
- **OmniWeaving** — 基于 1.5 的多模态统一视频生成
- **ComfyUI-MagCache** — 1.7× 训练免费加速
