---
title: PAniC-3D — 动漫角色肖像单视图3D重建
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, avatar, diffusion, python]
sources: [raw/articles/ai-game-devtools/panic3d-anime-reconstruction.md]
---

# PAniC-3D

**[CVPR 2023]** PAniC-3D: Stylized Single-view 3D Reconstruction from Portraits of Anime Characters

## Overview
PAniC-3D 是一个从单张动漫角色肖像插图直接重建风格化 3D 角色头部的系统。它跨越了**插图到3D的域鸿沟**，使用体积辐射场表示复杂几何结构（如发型和配饰），并通过**线条填充模型**处理非真实感的轮廓线。

由马里兰大学等机构的研究者开发，基于 [NVlabs/eg3d](https://github.com/NVlabs/eg3d) 架构。

## Key Features
- **插图→3D 域转换：** 使用线条填充模型将非真实感轮廓线转化为辐射场可学习的表示
- **体积辐射场：** 用 volumetric radiance field 表示复杂的发型和配饰几何
- **AnimeRecon 基准：** 创建了两个大规模数据集（11.2k VRoid 3D 模型 + 1k VTuber 肖像插图），建立了插图→3D 配对评估基准
- **说话头部动画扩展：** 可从单张肖像生成 3D 说话头部动画（Marching Cubes 网格提取 + 线性混合蒙皮 + 辐射场查询渲染）
- **Docker 部署：** 提供预构建 Docker 镜像，GPU 环境一键启动

## Architecture

| Component | Description |
|-----------|-------------|
| **Line-Filling Model** | 将动漫插图的非真实感轮廓线填充为辐射场可学习的连续表示 |
| **EG3D-based Radiance Field** | 基于 NVIDIA EG3D 的三维感知生成对抗网络，输出体素辐射场 |
| **Marching Cubes** | 从表面法线提取可渲染网格 |
| **Talking Head Pipeline** | 网格提取 → 手动绑骨(LBS) → 辐射场射线查询渲染 → 表情驱动 |

## Evaluation Results (RTX 3080 Ti / GTX 1080 Ti)

| 指标 | Front | Back | 360° |
|------|-------|------|------|
| CLIP ↑ | 94.66 | 85.05 | 84.61 |
| LPIPS ↓ | 19.37 | 30.02 | 25.25 |
| PSNR ↑ | 16.91 | 15.51 | 15.98 |

| 几何指标 | 值 |
|----------|-----|
| Chamfer Distance ↓ | 1.329 |
| F1@5 ↑ | 37.73 |
| F1@10 ↑ | 65.50 |

## Dependencies & Foundations
- 基于 **NVlabs/eg3d** 架构（三维感知 GAN）
- 使用 **VRoid Hub** 数据（VRoid Studio 创建的 3D 角色模型）
- 说话头部表情由 [talking-head-anime-2](https://github.com/pkhungurn/talking-head-anime-2-demo) 驱动
- 绑骨可通过 [RigNet](https://zhan-xu.github.io/rig-net/) 自动化

## Usage
```bash
# 数据准备：下载 panic_data_models_merged.zip 并合并到仓库
# Docker 部署
./make/docker_pull && ./make/shell_docker

# 复现论文指标
python3 -m _scripts.eval.generate && python3 -m _scripts.eval.measure
```

## Links
- **GitHub:** https://github.com/shuhongchen/panic3d-anime-reconstruction
- **Paper:** [arXiv:2303.14587](https://arxiv.org/abs/2303.14587)
- **Demo Video:** [YouTube](https://www.youtube.com/watch?v=7NosmLieg6A)
- **Data:** [Google Drive](https://drive.google.com/drive/folders/1Zpt9x_OlGALi-o-TdvBPzUPcvTc7zpuV?usp=share_link)

## Related
- [[ai-game-devtools/hunyuan3d-1]] — 腾讯混元文本/图像到3D生成框架（不同输入模态：文本/图像 vs 动漫肖像）
- [[ai-game-devtools/neuralangelo]] — NVIDIA 高保真神经表面重建（不同方法：视频重建 vs 单图重建）
- [[ai-game-devtools/crm]] — 清华大学单图→3D有纹理网格生成（通用物体 vs 动漫角色）
