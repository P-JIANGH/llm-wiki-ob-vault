---
title: GaussianDreamer
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/gaussiandreamer.md]
---

# GaussianDreamer — 文本到 3D 高斯快速生成

> 华中科技大学 + 华为联合提出的 CVPR 2024 论文项目，通过桥接 2D 和 3D 扩散模型实现文本到 3D 高斯的快速生成，单 GPU 约 15 分钟完成。

## Overview

**GaussianDreamer** 是一个从文本提示生成高质量 3D 实例或 3D Avatar 的管线。核心思路是：
1. 用 **3D 扩散模型**（Shap-E）提供具有 3D 一致性的初始化高斯
2. 用 **2D 扩散模型**（Stable Diffusion）通过 SDS 指导增强几何和外观
3. 引入噪声点生长和颜色扰动操作来细化生成结果

相比 DreamFusion（1.5 小时）和 ProlificDreamer（10 小时），GaussianDreamer 仅需 15 分钟即可生成，且质量优于两者。

## Architecture

### 两阶段管线

**Stage 1 — 3D 一致性初始化：**
- 使用微调过的 Shap-E（Cap3D 330k 数据微调）从文本生成初始 3D 点云
- 点云转换为 3D 高斯表示（位置、协方差、球谐系数、不透明度）
- 支持两种加载模式：形状初始化（load_type=0）和 SMPL Avatar 初始化（load_type=1）

**Stage 2 — 2D 扩散增强：**
- Stable Diffusion 2.1 Base 作为 2D 先验
- SDS (Score Distillation Sampling) 指导损失，guidance_scale=100
- 随机相机视角渲染 + 多角度优化
- 噪声点生长 + 颜色扰动增加细节

### 技术栈

| 组件 | 选型 |
|------|------|
| **训练框架** | threestudio + PyTorch Lightning |
| **3D 表示** | 3D Gaussian Splatting (3DGS) |
| **2D 扩散** | Stable Diffusion 2.1 Base |
| **3D 扩散** | Shap-E (finetuned) |
| **光栅化** | diff-gaussian-rasterization |
| **渲染器** | simple-knn + nvdiffrast |
| **相机策略** | dreamfusion3dgs 光照采样 |
| **GUI** | Gradio (Web Demo) |

### 关键文件

| 文件 | 功能 |
|------|------|
| `launch.py` | 主入口，PyTorch Lightning trainer |
| `configs/gaussiandreamer-sd.yaml` | SD 训练配置 |
| `threestudio/` | 嵌入的 threestudio 框架 |
| `gaussiansplatting/submodules/` | 3DGS 渲染子模块 |
| `load/` | 预训练权重（微调 Shap-E） |

## Performance

### T³Bench 评估

| 指标 | GaussianDreamer | ProlificDreamer | DreamFusion |
|------|:-:|:-:|:-:|
| 平均得分 | **45.7** | 43.3 | 21.7 |
| 单物体 | **54.0** | 49.4 | 24.4 |
| 带环境单物体 | **48.6** | 44.8 | 24.6 |
| 多物体 | 34.5 | **35.8** | 16.1 |
| 生成时间 | 15 min | 10 hours | 1.5 hours |

在 T³Bench 和 ViT 相似度评估中，GaussianDreamer 的质量接近或超过 ProlificDreamer，但速度快 40 倍。

## Usage

### 文本到 3D
```bash
python launch.py --config configs/gaussiandreamer-sd.yaml --train --gpu 0 \
  system.prompt_processor.prompt="a fox"
```

### 文本到 Avatar（SMPL 初始化）
```bash
python launch.py --config configs/gaussiandreamer-sd.yaml --train --gpu 0 \
  system.prompt_processor.prompt="Spiderman stands with open arms" system.load_type=1
```

### Unity 导出（高 SH 阶数）
```bash
python launch.py --config configs/gaussiandreamer-sd.yaml --train --gpu 0 \
  system.prompt_processor.prompt="a fox" system.sh_degree=3
```

## Game Dev Relevance

- **快速 3D 资产原型**：游戏设计师可用文本提示快速生成 3D 模型原型
- **Avatar 生成**：支持 SMPL 初始化，适合生成游戏 NPC/角色
- **Unity 集成**：生成的 3DGS 资产可通过 UnityGaussianSplatting 直接导入 Unity 引擎
- **实时渲染**：生成后的 3DGS 可直接实时渲染，适合游戏内展示
- **GaussianDreamerPro**（后续版本）：质量进一步提升，可直接集成到动画/仿真管线

## Related

- 与 [[ai-game-devtools/dreamgaussian4d]] 同属 Gaussian 3D 生成家族，但 GaussianDreamer 专注文本到静态 3D，DreamGaussian4D 专注图像到动态 4D
- 基于 [[ai-game-devtools/stable-diffusion]] 生态作为 2D 先验模型，使用 SD 2.1 Base 的 SDS 指导
- 嵌入 threestudio 框架（本 wiki 未建页），与 [[ai-game-devtools/dream-catalyst]] 等同属 threestudio 生态项目
- 生成的资产可通过 UnityGaussianSplatting（本 wiki 未建页）导入 Unity，类似 [[ai-game-devtools/unity-ml-stable-diffusion]] 的 Unity AI 集成思路

## Links

- **GitHub:** https://github.com/hustvl/GaussianDreamer
- **Paper:** https://arxiv.org/abs/2310.08529
- **Project Page:** https://taoranyi.com/gaussiandreamer/
- **GaussianDreamerPro:** https://taoranyi.com/gaussiandreamerpro/
- **HuggingFace Demo:** https://huggingface.co/spaces/thewhole/GaussianDreamer_Demo
- **Colab:** https://colab.research.google.com/github/taoranyi/GaussianDreamer-colab/blob/main/GaussianDreamer_colab.ipynb

## License

Apache-2.0（GaussianDreamer 代码）。3DGS 渲染器为研究许可。
