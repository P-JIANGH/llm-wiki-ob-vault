---
title: IC-Light
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, python, ai, open-source]
sources: [raw/articles/ai-game-devtools/ic-light.md]
---

# IC-Light — Imposing Consistent Light

**IC-Light** (Imposing Consistent Light) 是由 **lllyasviel** 开发的图像光照操控项目，基于 Stable Diffusion 1.5 架构，通过扩散模型实现高质量的图像重新打光（relighting）。发表于 ICLR 2025。

## 概述

IC-Light 提供两种模型：

1. **文本条件重打光模型** (`iclight_sd15_fc.safetensors`) — 以文本提示+前景图为条件，支持通过初始潜变量控制光照方向（左/右/上/下）
2. **背景条件模型** (`iclight_sd15_fbc.safetensors`) — 以文本+前景+背景图为条件，无需精细提示词即可自动生成物理一致的光照效果

## 技术架构

### UNet 通道扩展
- **文本条件版**：`conv_in` 从 4 通道扩展到 8 通道（原始 4 + 前景潜变量 4）
- **背景条件版**：`conv_in` 从 4 通道扩展到 12 通道（原始 4 + 前景 4 + 背景 4）
- 新增通道零初始化，原始通道权重直接拷贝
- 通过 `hooked_unet_forward` 在推理时将条件潜变量拼接到输入

### 权重加载机制
- 模型以 **权重偏移量**（weight offset）形式分发（safetensors）
- 加载时：`sd_merged = sd_origin + sd_offset`，即基础 UNet 权重 + 训练得到的偏移

### 两级生成管道
1. **低分辨率阶段**：T2I/Img2Img Pipeline 生成基础光照
2. **高分辨率精修**：放大 1.5× 后通过 Img2Img Pipeline 二次细化（denoise=0.5）

### 一致性原理
在 HDR 空间中，光传输是线性且独立的——不同光源的外观混合等价于混合光源下的外观。IC-Light 在潜空间中通过 MLP 强制这种一致性约束训练，使得不同方向的重打光结果甚至可以合并为法线贴图（模型并未用法线数据训练）。

## 核心模块

| 模块 | 说明 |
|------|------|
| `gradio_demo.py` (433 LoC) | 文本条件重打光 Gradio 界面 |
| `gradio_demo_bg.py` (465 LoC) | 背景条件重打光 + 法线估计（4×慢速） |
| `briarmbg.py` | BRIA RMBG-1.4 前景分割模型 |
| `db_examples.py` | 示例图像数据库 |

## 技术特点

- **基础模型**：Stable Diffusion 1.5 (Realistic Vision V5.1)
- **前景分割**：BriaRMBG-1.4（非商用；商用推荐 BiRefNet）
- **多种调度器**：DDIM / EulerAncestral / DPM++ 2M SDE Karras
- **法线估计功能**：从 4 个方向分别重打光 → Safe Division 计算表面法线
- **Gradio Web UI**：支持种子控制、CFG 缩放、高低分辨率参数调节
- **自动模型下载**：首次运行时从 HuggingFace 自动下载

## 许可证

项目代码无明确 LICENSE 文件。BRIA RMBG-1.4 为非商用许可。

## 相关链接

- [GitHub](https://github.com/lllyasviel/IC-Light)
- [HuggingFace Space](https://huggingface.co/spaces/lllyasviel/IC-Light)
- [HuggingFace Models](https://huggingface.co/lllyasviel/ic-light)
- [ICLR 2025 论文](https://openreview.net/forum?id=u1cQYxRI1H)

## 与其他工具的关系

- 与 [[controlnet]] 同作者（lllyasviel），共享扩散模型条件化思想
- 可作为 [[comfyui]] 的自定义节点集成到工作流中
- 基于 [[stable-diffusion]] SD1.5 架构改造
