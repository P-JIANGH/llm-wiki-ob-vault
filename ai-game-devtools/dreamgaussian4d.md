---
title: DreamGaussian4D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [ai-model, 3d, open-source, tool, vision]
sources: [raw/articles/ai-game-devtools/dreamgaussian4d.md]
---

# DreamGaussian4D — Generative 4D Gaussian Splatting

> NTU S-Lab & Shanghai AI Lab 开源的从单张图像生成动态 4D（3D+时间）高斯场景的管线，结合 Gaussian Splatting 渲染与 K-planes 形变场。arXiv 2023。

## Overview

DreamGaussian4D 实现了**图像到4D**和**视频到4D**两种生成模式。核心思路是：先用 LGM 或 DreamGaussian 生成静态 3D 高斯场景，再通过 4D 形变场（K-planes + MLP）建模时间维度的动态变化，最终输出可渲染的 4D 场景。

## Architecture

### 两阶段管线

**Stage 1 — 静态 3D 生成：**
- **LGM 后端**（默认）：3DTopia/LGM 大高斯模型，推理快
- **DreamGaussian 后端**（可选）：dreamgaussian/dreamgaussian，质量更高
- 使用 Stable-Zero123 指导新视角合成
- 输出静态高斯点云 (.ply) 或网格 (.obj)

**Stage 2 — 动态 4D 生成：**
- 加载 Stage 1 的静态 3D
- 应用 **K-planes 形变场** 建模时序运动
  - 4D 输入坐标 (x,y,z,t)
  - 分辨率 [32, 32, 32, 12]（空间+时间）
  - 正则化：平面 TV + 时间平滑 + L1 时间平面
- 支持预生成驱动视频或 SVD 生成
- 使用修改版 diff-gaussian-rasterization（+深度/alpha通道）

### 指导损失

| 损失类型 | 权重 | 用途 |
|----------|------|------|
| Zero123/Stable-Zero123 | λ=1 | 新视角合成 |
| Stable Video Diffusion | λ=0 | 视频生成（可选） |
| Multi-View Dream | 可选 | 多视角替代方案 |

### 网格导出与精化

- 逐帧导出网格或单 OBJ
- Blender Stop-motion-OBJ 插件动画导入
- 可选网格精化阶段（main2_4d.py + refine.yaml）
- nvdiffrast 微分渲染用于精化

## Key Files

| 文件 | 功能 |
|------|------|
| `main_4d.py` | 主 4D 生成入口，viser GUI，训练循环（600行） |
| `main2_4d.py` | 网格精化阶段 |
| `dg.py` | DreamGaussian 静态 3D 生成（509行） |
| `gs_renderer.py` | 高斯渲染器（深度+alpha 输出，209行） |
| `lgm/infer.py` | LGM 静态 3D 推理 |
| `scripts/gen_vid.py` | 驱动视频生成 |
| `configs/4d.yaml` | 默认 4D 训练配置（120行） |

## Technical Stack

- **框架:** PyTorch 2.1.0 + CUDA 11.8 + xformers 0.0.23
- **渲染:** diff-gaussian-rasterization (自定义 fork) + simple-knn
- **网格:** nvdiffrast, trimesh, xatlas, PyMCubes
- **背景去除:** rembg[gpu]
- **GUI:** viser (3D 交互) + Gradio (Web Demo)
- **生成模型:** HuggingFace Diffusers, Transformers

## Usage Modes

1. **Image-to-4D:** 单张 RGBA 图像 → 动态 4D 高斯场景
2. **Video-to-4D:** 输入视频帧 → 4D 重建（Consistent4D 基准）
3. **交互式 GUI:** viser 3D 查看器 + 实时训练监控
4. **Gradio Demo:** HuggingFace 托管 Web 界面

## Config Highlights

- 训练: Stage 1 = 500 步, Stage 2 = 50 步
- 批量大小: 14（多视角）
- 相机: 半径 1.5, FOV 49.1°, 仰角 ±30°
- 4D 形变: K-planes [32³×12], MLP 深度 1
- 高斯参数: 5000 初始点, SH 阶数 0
- 网格导出: 逐帧 或 OBJ 格式

## License

未明确声明许可证（代码可学术使用）。依赖的 3DGS 渲染器为非商业研究许可。

## Related

- 基于 [[ai-game-devtools/cf-3dgs]] 同类的 Gaussian Splatting 渲染技术，但 DreamGaussian4D 专注 4D 动态生成而非 3D 重建
- 与 [[ai-game-devtools/dream-catalyst]] 同属 3D 编辑/生成工具，但 DreamGaussian4D 专攻 4D 时序
- 与 [[ai-game-devtools/anything-3d]] 均从单视图生成 3D，但 DreamGaussian4D 额外增加时间维度
- 静态后端可替换为 DreamGaussian（未在本 wiki 中建页），与 [[ai-game-devtools/syncdreamer]] 同属同步生成范式
- 使用 [[ai-game-devtools/city-dreamer]] 类似的分阶段生成思想（布局→生成）

## Links

- **GitHub:** https://github.com/jiawei-ren/dreamgaussian4d
- **Paper:** https://arxiv.org/abs/2312.17142
- **Project Page:** https://jiawei-ren.github.io/projects/dreamgaussian4d/
- **Gradio Demo:** https://huggingface.co/spaces/jiawei011/dreamgaussian4d
