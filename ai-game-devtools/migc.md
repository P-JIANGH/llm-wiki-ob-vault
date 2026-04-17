---
title: MIGC
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, ai, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/migc.md]
---

# MIGC

## Overview

MIGC (Multi-Instance Generation Controller) 是浙江大学 ReLER Lab 与华为合作开发的多实例文本到图像生成控制框架。MIGC 解决了标准扩散模型在生成包含多个不同对象且需要精确定位和属性控制的图像时的常见失败模式，通过 adapter 架构实现对每个实例的位置和属性的精确控制。

**论文：** CVPR 2024 Highlight (MIGC) | TPAMI 2024 (MIGC++)
**项目主页：** https://migcproject.github.io/
**COCO-MIG 基准：** https://github.com/LeyRio/MIG_Bench

## 核心架构

### 三大核心模块

1. **PositionNet（位置编码器）**：使用 Fourier Embedding 将边界框坐标 (xyxy) 映射为高维位置嵌入，通过三层 MLP 生成 768 维位置特征
2. **SAC（空间自适应控制器）**：结合 CBAM 注意力机制，将实例特征与引导掩码融合，为每个实例计算自适应缩放因子
3. **CrossAttention + LayoutAttention**：将实例特定文本和位置信息注入扩散过程

### 模块结构

| 模块 | 文件 | 说明 |
|------|------|------|
| 主架构 | migc/migc_arch.py | PositionNet + SAC + NaiveFuser |
| 自定义层 | migc/migc_layers.py | CBAM, CrossAttention, LayoutAttention |
| 推理管线 | migc/migc_pipeline.py | 继承 StableDiffusionPipeline，927 行 |
| MIGC++ 架构 | migc_plus/migc_plus_arch.py | 支持 box + mask 双模控制 |
| WebUI | migc_gui/app.py | 基于 GLIGEN-GUI 集成 |

### MIGC++ 增强

MIGC++ (TPAMI 2024) 在 MIGC 基础上增加了：
- **同时支持边界框和掩码控制**实例位置
- **Consistent-MIG 迭代编辑模式**：修改特定实例时保持未修改区域的一致性，最大化被修改实例的 ID 一致性
- **InferenceV2 模式**：增强属性控制，减少属性泄漏（实例成功率从 66% 提升至 68%）

## 性能表现 (COCO-MIG Benchmark)

| 方法 | 平均 MIOU↑ | 平均成功率↑ | 类型 | 发表 |
|------|-----------|-----------|------|------|
| Box-Diffusion | 0.26 | 0.16 | Training-free | ICCV 2023 |
| GLIGEN | 0.27 | 0.30 | Adapter | CVPR 2023 |
| ReCo | 0.49 | 0.55 | Full model tuning | CVPR 2023 |
| InstanceDiffusion | 0.46 | 0.51 | Adapter | CVPR 2024 |
| **MIGC** | **0.56** | **0.66** | Adapter | CVPR 2024 |

MIGC 在 COCO-MIG 基准上所有指标均为 SOTA，显著优于 GLIGEN、InstanceDiffusion 等同类方法。

## 技术特点

- **即插即用控制器**：可与不同 base generator 权重配合使用（RealisticVision、Cetus-Mix、GhostMix 等）
- **LoRA 兼容**：结合 LoRA 可实现强大的属性+位置联合控制
- **支持基础模型**：SD1.4（官方）、SD1.5（MIGC_SD14.ckpt 直接兼容）
- **检查点大小**：MIGC 219M / MIGC++ 191M
- **许可证**：仅限非商业研究用途，禁止商业用途
- **训练代码**：未开源（公司要求），仅提供 COCO 数据集处理脚本

## 与其他工具的关系

- [[ai-game-devtools/controlnet]] — 同为 SD 扩散模型 adapter 控制方法，ControlNet 使用零卷积复制架构，MIGC 使用位置编码器+SAC
- [[ai-game-devtools/comfyui]] — ComfyUI 原生支持多种扩散模型，可作为 MIGC 的部署平台
- [[ai-game-devtools/flux]] — FLUX 是新一代扩散模型，与 MIGC 同属图像生成领域但架构不同

## 关键链接

- GitHub: https://github.com/limuloo/MIGC
- CVPR 2024 论文: https://openaccess.thecvf.com/content/CVPR2024/papers/Zhou_MIGC_Multi-Instance_Generation_Controller_for_Text-to-Image_Synthesis_CVPR_2024_paper.pdf
- TPAMI 2024 论文: https://ieeexplore.ieee.org/document/10794618
- Colab Demo: https://colab.research.google.com/drive/1rkhi7EylHXACbzfXvWiblM4m1BCGOX5-
- 知乎解读: https://zhuanlan.zhihu.com/p/686367982
