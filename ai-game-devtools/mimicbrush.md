---
title: MimicBrush
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/mimicbrush.md]
---

# MimicBrush

## Overview

MimicBrush 是阿里巴巴达摩院（ali-vilab）开发的零样本图像编辑工具，通过参考图像模仿（Reference Imitation）实现对目标图像指定区域的纹理/风格迁移。用户只需提供源图像、绘制编辑区域蒙版、提供参考图像，即可实现高质量的内容替换，同时可选择是否保留原始几何形状。

论文发表于 arXiv 2024 年 6 月（arXiv:2406.07547），由香港大学、阿里巴巴集团、蚂蚁集团联合研究。

## 核心架构

**双 U-Net 设计：**
- **主 UNet：** 基于 SD-1.5-inpainting，9 通道输入（4 latent + 1 mask + 4 masked_image），负责去噪生成
- **ReferenceNet：** 独立 UNet 编码参考图像，提取视觉特征
- **ReferenceNetAttention：** 跨图像注意力注入机制，将参考特征融合到主 UNet 的注意力层

**可选深度引导：**
- 集成 Depth Anything（DINOv2 backbone）估计深度图
- DepthGuider 模块提供几何结构约束
- 确保编辑区域在 3D 结构上与源图像一致

**Pipeline 继承：**
- 继承 Diffusers `DiffusionPipeline`，兼容 `LoraLoaderMixin`/`TextualInversionLoaderMixin`
- 支持 CFG（classifier-free guidance）、LoRA 微调加载、文本提示词控制

## 技术特点

| 特性 | 详情 |
|------|------|
| 基础模型 | Stable Diffusion 1.5 + Inpainting |
| 框架 | Diffusers 0.23.0 + PyTorch 2.0.1 |
| 深度估计 | Depth Anything (DINOv2) |
| 交互界面 | Gradio 3.39.0/4.x WebUI |
| 模型权重 | HuggingFace + ModelScope 双平台 |
| 零样本 | 无需微调即可编辑新图像 |
| 形状保持 | "Keep original shape" 模式仅迁移纹理 |

## 应用场景（游戏开发）

- **游戏素材纹理替换：** 将参考图的材质风格迁移到游戏角色/场景元素
- **角色换装：** 保持角色轮廓不变，替换服装纹理
- **场景风格统一：** 将不同来源的美术素材统一到同一视觉风格
- **零样本资产生成：** 无需训练 LoRA 即可实现风格迁移

## 许可证

仓库未明确声明许可证。基于 SD-1.5（CreativeML Open RAIL-M），代码继承自 `ai-game-devtools/ip-adapter` 和 MagicAnimate。

## 相关链接

- [GitHub](https://github.com/ali-vilab/MimicBrush)
- [arXiv 论文](https://arxiv.org/abs/2406.07547)
- [项目页面](https://xavierchen34.github.io/MimicBrush-Page/)
- [HuggingFace Demo](https://huggingface.co/spaces/xichenhku/MimicBrush)
- [ModelScope Demo](https://modelscope.cn/studios/iic/mimicbrush-demo/summary)
- [ComfyUI 集成](https://github.com/AIFSH/ComfyUI-MimicBrush)

## 相关项目

- [[instantid]] — 零样本身份保留图像生成，同为零样本编辑方向
- [[catvton]] — ICLR 2025 虚拟试穿扩散模型，纹理迁移相关
- [[controlnet]] — 条件扩散控制框架，MimicBrush 基于其范式
