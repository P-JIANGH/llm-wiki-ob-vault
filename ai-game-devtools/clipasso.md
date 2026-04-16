---
title: CLIPasso
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, open-source, image, project]
sources: [raw/articles/ai-game-devtools/clipasso.md]
---

# CLIPasso: Semantically-Aware Object Sketching

## 概述

CLIPasso 是 SIGGRAPH 2022 发表的图像到草图转换工具，将物体图像转换为可控制抽象层次的 SVG 矢量草图。由以色列魏茨曼科学研究所、特拉维夫大学等机构联合开发。

**核心思路**：将草图定义为一组贝塞尔曲线，使用 [diffvg](https://github.com/BachiLi/diffvg) 可微栅格化器优化曲线参数，以 CLIP 感知损失作为优化目标。

- **论文**: arXiv 2202.05822 (SIGGRAPH 2022)
- **代码**: https://github.com/yael-vinker/CLIPasso
- **Demo**: https://clipasso.github.io/clipasso/
- **许可证**: CC BY-NC-SA 4.0

## 技术架构

### 三层管线

1. **Painter 模块** (`models/painter_params.py`)
   - 基于 pydiffvg 的可微矢量渲染
   - 每条笔画 = 4 控制点的贝塞尔曲线
   - 笔画位置/颜色/透明度作为可优化参数
   - 支持 Dino/CLIP 注意力图初始化笔画位置

2. **Loss 模块** (`models/loss.py`)
   - CLIPLoss: CLIP ViT-B/32 余弦相似度
   - CLIPConvLoss: CLIP RN101 中间层特征 L2 损失（layers 2-3 加权）
   - LPIPS/VGG16 感知损失（可选）
   - 仿射增强（RandomPerspective + RandomResizedCrop）

3. **优化循环** (`painterly_rendering.py`)
   - 默认 500 步 Adam 优化（位置 lr=1.0, 颜色 lr=0.01）
   - 自动早停（loss 变化 < 1e-5）
   - 多种子并行（默认 3 种子，选最优）
   - 每 10 步保存 SVG + JPG 快照

### 关键参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `--num_strokes` | 16 | 笔画数量，控制抽象程度 |
| `--num_iter` | 500 | 优化迭代次数 |
| `--attention_init` | 1 | 使用 CLIP/Dino 注意力初始化笔画位置 |
| `--saliency_model` | clip | 显著性模型（clip/dino） |
| `--clip_model_name` | RN101 | CLIP 模型变体 |
| `--mask_object` | 0 | U2Net 前景分割 |
| `--force_sparse` | 0 | L1 正则鼓励少笔画 |

### 依赖栈

```
PyTorch 1.7.1 + CUDA 10.1
├── diffvg (可微矢量栅格化，CUDA C++)
├── CLIP (OpenAI, ViT-B/32 + RN101)
├── Dino (Facebook, ViT-S/8 自注意力)
└── U2Net (前景分割)
```

## 游戏开发应用

### 适用场景
- **游戏美术资产生成**：将照片/概念图快速转为线稿草图
- **Sprite/图标制作**：SVG 矢量格式可无损缩放到任意分辨率
- **风格化渲染**：通过笔画数量控制抽象程度，从写实线稿到极简涂鸦
- **教育/原型设计**：Colab 一键运行，适合快速原型

### 局限
- **仅支持物体图像**（非场景/风景），需去背景或启用 mask
- **CC BY-NC-SA 许可证**：禁止商业用途
- **Python 3.7 + 旧版 PyTorch**：环境依赖较老
- **无批量处理**：每次只处理一张图

## 与同类工具对比

| 工具 | 输入 | 输出 | 核心技术 | 许可证 |
|------|------|------|----------|--------|
| CLIPasso | 图像 | SVG 草图 | CLIP 损失 + diffvg | CC BY-NC-SA 4.0 |
| CLIPDraw | 文本 | SVG 草图 | CLIP 损失 + diffvg | Apache 2.0 |
| VectorFusion | 文本 | SVG | SDS 损失 + diffvg | 研究用 |

## 相关项目

- [[ai-game-devtools/mug-diffusion]] — 同样基于 SD/diffusion 范式的创意生成工具（音游谱面）
- [[ai-game-devtools/genagent]] — ComfyUI 中自动生成 SD 工作流的 Agent
- [[ai-game-devtools/cradle]] — 基于视觉的通用游戏/软件 Agent 框架

## 来源

- raw/articles/ai-game-devtools/clipasso.md
