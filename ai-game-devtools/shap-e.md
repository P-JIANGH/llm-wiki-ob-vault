---
title: Shap-E — OpenAI 条件化 3D 隐式函数生成
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, tool, open-source, ai, vision]
sources:
  - raw/articles/ai-game-devtools/shap-e.md
---

# Shap-E

OpenAI 于 2023 年 4 月发布的条件化 3D 隐式函数生成系统，基于潜在扩散模型从文本或图像生成 3D 资产。论文：[Shap-E: Generating Conditional 3D Implicit Functions](https://arxiv.org/abs/2305.02463)。

## 概述

Shap-E 是 OpenAI 继 [[ai-game-devtools/point-e]] 之后发布的第二代 3D 生成模型。与 Point-E 生成点云不同，Shap-E 直接生成隐式神经场（NeRF/NeSTF）的潜表示，再投影为隐式函数参数，可渲染任意视角或导出为网格。

## 关键信息

| 属性 | 值 |
|---|---|
| 发布方 | OpenAI |
| 发布时间 | 2023 年 4 月 |
| 许可证 | MIT |
| 参数量 | 300M（扩散模型） |
| GitHub | https://github.com/openai/shap-e |
| 论文 | arXiv 2305.02463 |

## 模型 Zoo

| 检查点 | 用途 |
|---|---|
| `transmitter` | 完整编码器 + 投影层，用于将 3D 资产编码为隐式神经表示 |
| `decoder` | 仅投影层，更小体积，负责扩散输出→隐式函数转换 |
| `text300M` | 文本条件化潜在扩散模型 |
| `image300M` | 图像条件化潜在扩散模型 |

## 技术架构

- **编码器（Encoder）：** 将 3D 资产（多视角渲染 + 点云）编码为潜向量。支持 VectorEncoder 和 ChannelsEncoder 两种模式
- **潜在扩散（Latent Diffusion）：** Transformer 骨干 + CLIP 文本/图像条件化，1024 步扩散过程
- **隐式神经场：** 生成的潜向量通过投影层变为 NeRF/NeSTF 参数，可体积渲染或提取网格
- **光线投射渲染器：** 内置 raycast 渲染，无需外部依赖即可预览

### 核心模块

```
shap_e/
├── models/
│   ├── transmitter/    # 编码器 + 发射器 + 解码器
│   ├── generation/     # Transformer 扩散模型 + CLIP 条件化
│   ├── nerf/           # NeRF 隐式场模型
│   ├── nerstf/         # 神经形状/纹理/场渲染器
│   └── nn/             # 位置编码、球形谐波、元学习
├── rendering/          # 光线投射 + Blender 集成
└── util/               # 数据处理 + 图像工具
```

### 依赖

torch, numpy, scipy, scikit-image, CLIP (OpenAI), Pillow, matplotlib, blobfile

## 与 Point-E 的差异

| 维度 | [[ai-game-devtools/point-e]] | Shap-E |
|---|---|---|
| 输出格式 | 点云 → SDF 网格 | 隐式神经函数 → 渲染/网格 |
| 表面质量 | 粗糙，需要后处理 | 相对更平滑 |
| 推理速度 | 较快（40M~1B 模型可选） | 较慢（300M 模型） |
| 训练数据 | 基础 3D 数据集 | +100 万资产 + 12 万人工标注 |
| 条件化 | 图像/文本 | 图像/文本（CLIP 条件化） |

## 局限性

- 保真度低于专业 3D 资产，常见粗糙边缘、孔洞、模糊纹理
- 文本条件化对复杂多对象场景和属性绑定效果不佳
- 训练数据偏向简单/卡通风格 3D 资产
- 存在性别偏见（如"护士"vs"医生"生成体型差异）
- 不推荐用于商业场景

## 应用场景

- 游戏开发快速原型制作
- 3D 打印模型生成
- 单图/文本驱动的 3D 内容创作
- 与 [[ai-game-devtools/gaussiandreamer]] 结合使用（后者用 Shap-E 初始化 3D 高斯）

## 相关链接

- GitHub: https://github.com/openai/shap-e
- Paper: https://arxiv.org/abs/2305.02463
- 同系列: [[ai-game-devtools/point-e]] (2022 点云扩散)
