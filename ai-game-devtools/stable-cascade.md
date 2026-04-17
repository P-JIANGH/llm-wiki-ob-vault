---
title: Stable Cascade
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, open-source, python, tool]
sources: [raw/articles/ai-game-devtools/stable-cascade.md]
---

# Stable Cascade

**Stable Cascade** 是由 **Stability AI** 开发的开源级联图像生成模型。基于 [[ai-game-devtools/wuerstchen|Würstchen]] 架构，其核心创新在于使用极小的潜在空间（压缩因子 42）进行扩散生成，相比 [[ai-game-devtools/stable-diffusion-webui|Stable Diffusion]] 的压缩因子 8，训练和推理成本降低约 16 倍。

## 架构设计

### 三阶段级联管线

| 阶段 | 模型 | 参数量 | 角色 | 类型 |
|------|------|--------|------|------|
| Stage C | 3.6B / 1B | 36亿 / 10亿 | 文本条件扩散生成 24×24 潜在表示 | 扩散模型 |
| Stage B | 1.5B / 700M | 15亿 / 7亿 | 从 Stage C 输出上采样/精化 | 扩散模型 |
| Stage A | 20M | 2000万 | 最终解码为像素图像 | VAE |

**工作流**：文本 → Stage C 生成 24×24 潜在 → Stage B 上采样 → Stage A 解码 → 1024×1024 图像

### Stage C 核心架构

- 输入通道：16 维潜在表示
- CLIP 文本条件：CLIP text (1280) + text pooled (1280) + image (768)
- 隐藏维度：2048 × 2 层，32 个注意力头
- 块类型：ResBlock (C)、AttnBlock (A)、FeedForwardBlock (F)、TimestepBlock (T)
- 支持 ControlNet 注入（通过 `ControlNetDeliverer`）
- 支持 LoRA 微调

### Stage B 核心架构

- 4 层 U-Net 结构，隐藏维度 [320, 640, 1280, 1280]
- 接收 Stage C 的 effnet 条件 + 像素条件
- CLIP 条件映射：1280 → 4 个条件序列
- 支持 skip connection 和 bilinear 上采样

### GDF (Generic Diffusion Framework)

项目内置通用扩散框架模块：
- `gdf/schedulers.py` — 噪声调度器
- `gdf/samplers.py` — 采样算法
- `gdf/noise_conditions.py` — 噪声条件
- `gdf/scalers.py` / `gdf/targets.py` / `gdf/loss_weights.py` — 缩放/目标/损失权重

## 技术特点

- **高压缩率**：1024×1024 → 24×24（压缩因子 42.67），远超 SD 的 8 倍
- **效率优势**：虽然参数量比 SDXL 多 1.4B，推理速度仍更快
- **高质量重建**：压缩 42 倍后仍能保持清晰重建
- **多模式支持**：文生图、图像变体、图生图
- **ControlNet 集成**：支持 Inpainting、Outpainting、Face Identity、Canny、超分辨率
- **LoRA 支持**：可训练自定义概念和新 token
- **可用作 Diffusion Autoencoder**：Stage A + B 可单独用作高压缩率自编码器

## 训练与推理

- 提供从零训练、微调、LoRA、ControlNet 的完整训练代码
- 支持 diffusers 🤗 库集成
- 内置 Gradio Web 应用（`gradio_app/app.py`）
- 提供 Jupyter notebooks 用于文生图、ControlNet、LoRA、图像重建

## 许可证

- **代码**：MIT License
- **模型权重**：Stability AI Non-Commercial Research Community License

## 对比分析

- 与 [[ai-game-devtools/flux]]：FLUX 使用 flow matching + DiT 架构（单阶段），Stable Cascade 使用级联扩散（三阶段），后者在高压缩率下效率更高
- 与 [[ai-game-devtools/deepfloyd-if]]：两者都采用级联架构，但 DeepFloyd IF 在像素空间级联（64→256→1024），Stable Cascade 在高度压缩的潜在空间级联
- 与 [[ai-game-devtools/stable-diffusion-webui|Stable Diffusion]]：SC 压缩因子 42 vs SD 的 8，训练/推理成本降低约 16 倍

## 相关链接

- GitHub: https://github.com/Stability-AI/StableCascade
- HuggingFace: https://huggingface.co/stabilityai/stable-cascade
- Würstchen 论文: https://openreview.net/forum?id=gU58d5QeGv
