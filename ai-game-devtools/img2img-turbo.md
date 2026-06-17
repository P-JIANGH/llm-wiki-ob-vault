---
title: img2img-turbo
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, ml, tool, open-source, image]
sources: [raw/articles/ai-game-devtools/img2img-turbo.md]
---

# img2img-turbo

**一句话:** CMU + Adobe 联合研发的单步扩散模型图像翻译工具，基于 SD-Turbo + LoRA + 对抗学习，实现 0.11s 极速推理（512×512，A100）。

## 概述

img2img-turbo 提出了一种通用方法，通过对抗学习将单步扩散模型（如 SD-Turbo）适配到新的图像翻译任务和领域。相比传统多步扩散模型，推理速度提升 10-50 倍。项目包含两个核心模型：

- **pix2pix-turbo**: 配对图像翻译（边线→图像、草图→图像）
- **CycleGAN-Turbo**: 非配对图像翻译（白天↔夜晚、晴天↔雨天）

## 技术架构

### 核心设计
- **基础模型**: Stability AI SD-Turbo（潜扩散模型）
- **LoRA 微调**: UNet（rank=8）+ VAE（rank=4），仅训练少量参数
- **VAE 跳跃连接**: 4 个 Conv2d 层连接 VAE 编码器下采样块与解码器上采样块（512→512, 256→512, 128→512, 128→256），保留输入场景结构信息
- **Zero-Conv 层**: 输入到输出的零卷积连接
- **TwinConv 模块**: 草图→图像随机模式下，混合预训练卷积与可训练卷积，通过 gamma 参数控制确定性/随机性平衡

### 推理流程
```
输入图像 → VAE 编码（含跳跃连接）→ UNet 单步去噪 → VAE 解码 → 输出图像
```
- 调度器: DDPMScheduler，设置为 1 步推理
- 文本条件: CLIP Text Encoder 编码 prompt 作为 UNet 的 encoder_hidden_states

### 预训练模型
| 模型 | 用途 | 场景 |
|------|------|------|
| edge_to_image | 边线→图像 | Canny 边线控制生成 |
| sketch_to_image_stochastic | 草图→图像（可调节随机性） | 概念艺术草图渲染 |
| day_to_night | 白天→夜晚 | 场景光照风格迁移 |
| night_to_day | 夜晚→白天 | 反向光照恢复 |
| clear_to_rainy | 晴天→雨天 | 天气效果添加 |
| rainy_to_clear | 雨天→晴天 | 天气去除/恢复 |

### 依赖栈
- Python 3.10 + PyTorch ≥2.0.1 + xformers
- HuggingFace Diffusers 0.25.1 + PEFT (LoRA)
- CLIP (OpenAI) + open-clip-torch
- Gradio 3.43.1（交互式演示）
- DINOv2（训练时的感知损失）

## 性能指标

- **512×512 推理速度**: 0.29s (A6000) / 0.11s (A100)
- **单步推理**: 相比 25-50 步扩散模型加速 25-50 倍
- **边缘→图像**: 与 ControlNet 性能相当，但推理快 10 倍以上
- **草图→图像**: 支持 gamma=0~1 控制多样性输出

## 许可证

基于 SD-Turbo 许可证（Stability AI），具体训练代码许可证未明确标注。

## 相关链接

- **GitHub:** [GaParmar/img2img-turbo](https://github.com/GaParmar/img2img-turbo)
- **论文:** [arXiv 2403.12036](https://arxiv.org/abs/2403.12036) (CMU + Adobe, 2024)
- **Demo:** [HuggingFace Spaces — Sketch2Image](https://huggingface.co/spaces/gparmar/img2img-turbo-sketch)
- **作者:** Gaurav Parmar, Taesung Park, Srinivasa Narasimhan, Jun-Yan Zhu

## 游戏开发应用场景

- **概念艺术快速原型**: 草图一键渲染为高质量概念图
- **关卡设计辅助**: 线框图/布局草图快速可视化
- **环境天气系统**: 实时场景光照/天气风格迁移（白天↔夜晚、晴天↔雨天）
- **交互式工具集成**: Gradio 可嵌入游戏开发工具管线
- **实时编辑**: 单步推理速度支持交互式编辑器中使用

## 与同类工具对比

- vs [[controlnet]]: ControlNet 使用多步扩散+条件图控制，生成质量高但慢；img2img-turbo 单步推理快 10-50 倍，质量相当
- vs [[comfyui]]: ComfyUI 是通用节点式扩散管线编排器；img2img-turbo 是专用单步翻译模型，可集成到 ComfyUI 中使用
- vs [[fooocus]]: Fooocus 专注零配置文生图；img2img-turbo 专注图到图翻译
- vs [[draggan]]: DragGAN 基于 StyleGAN3 潜在空间交互式编辑；img2img-turbo 基于扩散模型，支持文本条件控制
