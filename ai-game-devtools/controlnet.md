---
title: ControlNet
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, diffusion, image-generation, open-source]
sources: [raw/articles/ai-game-devtools/controlnet.md]
---

# ControlNet

**ControlNet** 是由 Lvmin Zhang（张吕敏）、Anyi Rao 和 Maneesh Agrawala 开发的神经网络架构，用于向文本到图像的扩散模型添加条件控制。论文发表于 ICCV 2023。

## 概述

ControlNet 的核心创新是 **"零卷积"（zero convolution）** 架构：将预训练扩散模型的权重复制为"锁定"副本和"可训练"副本，两者之间通过权重和偏置都初始化为零的 1×1 卷积连接。

### 关键特性

- **小数据集友好**：锁定副本保持原始模型能力，不会因小数据集微调而退化
- **零初始化安全**：训练前所有零卷积输出为零，不引起任何失真
- **内存高效**：原始 SD 编码器无需存储梯度，GPU 显存占用接近原版 SD
- **可组合**：多个 ControlNet 可并行组合实现多条件控制
- **可迁移**：ControlNet 权重可转移到任何 SD1.x 社区模型

## 技术架构

### 三层核心模块

1. **`ControlledUnetModel(UNetModel)`**：修改版 UNet，接收 control 信号作为输入，在 decoder 阶段将 control 特征与 skip connection 相加
2. **`ControlNet(nn.Module)`**：控制网络，复制 SD encoder 结构，每个层级通过 `make_zero_conv()` 连接零卷积层
3. **`ControlLDM(LatentDiffusion)`**：集成 ControlNet 的潜在扩散模型，包含 control_scales 控制强度调节

### 输入条件图类型（9 种预训练模型）

| 类型 | 检测方法 | 适用场景 |
|------|---------|---------|
| Canny Edge | 经典边缘检测 | 结构保持生成 |
| M-LSD Lines | 直线检测 | 建筑/室内场景 |
| HED Boundary | 软边界检测 | 重着色/风格化 |
| Scribbles | 用户手绘草图 | 交互式创作 |
| Human Pose | OpenPose 姿态估计 | 角色姿势控制 |
| Semantic Segmentation | Uniformer 语义分割 | 场景布局控制 |
| Depth Map | MiDaS 深度估计 (512×512) | 空间深度控制 |
| Normal Map | 由 MiDaS 深度计算 | 几何细节保留 |
| Anime Line Drawing | 专门训练 | 动漫线稿生成（未公开发布） |

### 推理模式

- **标准模式**：文本 prompt + 条件图 → 生成图像
- **Guess Mode（无提示模式）**：仅条件图 → ControlNet 编码器猜测内容并生成，推荐 50 步、guidance scale 3-5

## 项目结构

```
controlnet/
├── cldm/
│   └── cldm.py          # 核心实现 (435 行)
├── models/
│   ├── cldm_v15.yaml     # SD 1.5 配置
│   └── cldm_v21.yaml     # SD 2.1 配置
├── ldm/modules/midas/    # MiDaS 深度估计
├── gradio_*.py           # 10+ Gradio 演示脚本
├── tutorial_train.py     # 训练教程
├── tool_add_control.py   # 为 SD 模型添加 ControlNet
└── tool_transfer_control.py  # 迁移到社区模型
```

## 与同类工具差异

- **vs T2I-Adapter**：T2I-Adapter 更轻量（适配器模式），ControlNet 更强大但参数量更大
- **vs ControlLoRA**：ControlLoRA 使用 LoRA 技术实现，权重更小，但控制精度略低
- **vs Composer**：Composer 是更大的多条件控制模型，ControlNet 更专注于单一条件的精确控制

## 许可证

官方仓库未明确声明许可证（学术/研究用途）。论文：ICCV 2023。

## 相关链接

- [GitHub](https://github.com/lllyasviel/ControlNet)
- [论文 (arXiv)](https://arxiv.org/abs/2302.05543)
- [补充材料](https://lllyasviel.github.io/misc/202309/cnet_supp.pdf)
- [HuggingFace 模型权重](https://huggingface.co/lllyasviel/ControlNet)
- [sd-webui-controlnet](https://github.com/Mikubill/sd-webui-controlnet) — A1111 WebUI 插件

## 与 [[ai-game-devtools/comfyui]] 的关系

[[ai-game-devtools/comfyui]] 内置 ControlNode 节点支持 ControlNet，提供图形化的 ControlNet 管线构建能力。[[ai-game-devtools/blender-controlnet]] 则通过 A1111 WebUI API 将 ControlNet 集成到 Blender 渲染流程中。
