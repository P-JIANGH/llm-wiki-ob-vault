---
title: DreamMat
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [image-generation, diffusion, 3d, open-source, tool, python]
sources: [raw/articles/ai-game-devtools/dreammat.md]
---

# DreamMat

[SIGGRAPH 2024] High-quality PBR Material Generation with Geometry- and Light-aware Diffusion Models

## Overview

**DreamMat** 是由浙江大学、腾讯等机构联合开发的 PBR（基于物理的渲染）材质生成工具，发表于 **SIGGRAPH 2024**（ACM Transactions on Graphics, Vol. 43, No. 4, Article 39）。项目基于 [[stable-diffusion]] 2.1 和自定义的 **Geometry- and Light-aware ControlNet**，实现从文本提示词和初始几何体生成高质量的 albedo、roughness、metallic 三张贴图。

## 核心创新

- **几何与光照感知扩散模型**：在扩散过程中同时感知 3D 几何形状和环境光照条件，生成物理一致的材质属性
- **自定义 Light-aware ControlNet**：基于 [[controlnet]] 范式，但专门针对光照条件进行训练，使用环境贴图（EXR 格式）作为条件输入
- **SDS 引导优化**：使用 Score Distillation Sampling 从预训练的扩散模型中蒸馏 3D 材质知识，30,000 步优化

## 技术架构

| 组件 | 实现 |
|------|------|
| **基础模型** | stabilityai/stable-diffusion-2-1-base |
| **ControlNet** | 自定义光照条件 ControlNet（单独训练） |
| **位置编码** | HashGrid（16 级，log2_hashmap_size=19） |
| **几何表示** | dreammat-mesh + UV-based HashGrid（3D→5D: albedo×3 + roughness×1 + metallic×1） |
| **渲染器** | CUDA 光线追踪渲染器（漫反射 200 采样 + 镜面反射 128 采样） |
| **材质输出** | sigmoid 激活，metallic [0.0, 0.9]，roughness² [0.01, 0.9] |
| **训练框架** | 基于 threestudio 框架扩展 |
| **环境要求** | CUDA 11.8 + PyTorch 2.0.0，RTX 3090/4090/V100/A6000 |

## 训练流程

1. **数据生成**：使用 Blender 3.2.2 从 3D 模型渲染几何条件（深度/法线图）和光照条件（环境贴图下的颜色图）
2. **ControlNet 训练**：accelerate launch diffusers_train_controlnet.py
3. **材质生成**：文本提示 + 初始 OBJ 网格 → SDS 引导优化 → 输出 PBR 材质贴图

## 使用示例

```bash
python launch.py --config configs/dreammat.yaml --train --gradio --gpu 0 \
  system.prompt_processor.prompt="A cute striped kitten" \
  system.geometry.shape_init=mesh:load/shapes/objs/cat.obj \
  trainer.max_steps=4000
```

支持 Gradio 可视化界面，首次运行触发 Blender 预渲染（RTX 4090 约 15 分钟）。

## 与同类工具对比

- vs [[syncdreamer]]：SyncDreamer 专注于多视角一致的新视图合成，DreamMat 专注于 PBR 材质属性（albedo/roughness/metallic）生成
- vs [[controlnet]]：DreamMat 扩展了 ControlNet 的光照条件控制能力，专门针对 3D 材质生成优化
- 与 [[stable-diffusion]] 生态深度集成，使用 SD 2.1 base 作为先验知识来源

## 许可证

MIT License

## 相关链接

- [论文 (arXiv)](https://arxiv.org/abs/2405.17176)
- [项目主页](https://zzzyuqing.github.io/dreammat.github.io/)
- [GitHub](https://github.com/zzzyuqing/DreamMat)
- [HuggingFace 权重](https://huggingface.co/zzzyuqing/light-geo-controlnet)
- [Docker 镜像](https://hub.docker.com/repository/docker/zzzyuqing/dreammat_image/general)
