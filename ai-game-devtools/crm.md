---
title: CRM — Convolutional Reconstruction Model
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [3d, image-generation, diffusion, open-source, game-engine]
sources: [raw/articles/ai-game-devtools/crm.md]
---

# CRM — Convolutional Reconstruction Model

## Overview

**CRM** (Convolutional Reconstruction Model) 是清华大学团队开发的**单图→3D 有纹理网格**前馈生成模型，**10 秒内**完成从一张图像到完整 3D 资产的重建。属于 AI 游戏开发工具中的 **3D 资产生成**和**纹理生成**工具链环节。

- GitHub: https://github.com/thu-ml/CRM
- 论文: arXiv:2403.05034 (2024)
- 在线 Demo: [HuggingFace](https://huggingface.co/spaces/Zhengyi/CRM) | [Replicate](https://replicate.com/camenduru/crm)
- 预训练权重: [HuggingFace Hub](https://huggingface.co/Zhengyi/CRM)

## 技术架构

CRM 采用**两阶段扩散管线**：

### Stage 1 — 多视角像素图生成
- 输入：单张预处理图像（背景移除 + 灰度/白色背景）
- 输出：6 个视角一致的像素图像
- 基础：ImageDream（SD v2.1）潜在扩散架构
- 模型权重：`pixel-diffusion.pth`（HuggingFace 下载）

### Stage 2 — 颜色与几何 CCM 生成
- 输入：Stage 1 的 6 视角图像
- 输出：CCM（Color Coordinate Maps）— 包含 3D 几何和纹理信息
- 模型权重：`ccm-diffusion.pth`（HuggingFace 下载）

### 3D 网格重建
- CRM 卷积重建网络将 CCM 转换为带纹理的 OBJ 网格
- **kaolin**：NVIDIA 3D 深度学习库，用于 SDF 体积表示
- **FlexiCubes**：可微分网格表示，优化网格拓扑
- **nvdiffrast**：NVIDIA 高质量可微分渲染器，生成 UV 纹理贴图

### 核心依赖
| 组件 | 用途 |
|------|------|
| PyTorch 1.13 + CUDA 11.7 | 基础框架 |
| kaolin 0.14 | 3D 体积运算 |
| xformers | 高效注意力 |
| nvdiffrast | 可微分渲染 |
| rembg | 背景自动移除 |

## 游戏开发用途

CRM 在游戏资产生成管线中的位置：

1. **3D 资产快速原型**：设计师上传概念图 → 10 秒生成带纹理 3D 模型 → 导入 [[UnityGaussianSplatting|Unity]] / [[TripoSR|TripoSR]] 等工具精修
2. **NPC/道具批量生成**：单图生成多视角一致的 3D 资产，支撑游戏世界的快速内容填充
3. **纹理自动烘焙**：nvdiffrast 渲染管线直接输出 UV 纹理，游戏引擎直接使用
4. **AI 纹理工作流**：生成结果可作为 [[DreamTextures|Dream Textures]]、SD ControlNet 等工具的输入，形成"图像→3D→纹理"完整链路

## 与同类工具的差异

| 工具 | 输入 | 输出 | 速度 | 特点 |
|------|------|------|------|------|
| **CRM** | 单图 | 带纹理 OBJ | **10 秒** | 两阶段扩散 + FlexiCubes，精度高 |
| [[Stable-Dreamfusion]] | 文本/单图 | NeRF → Mesh | 分钟级 | 文本驱动，优化慢 |
| [[Point·E]] | 文本/单图 | 3D 点云 | 1 分钟 | OpenAI 开源，端侧可跑 |
| [[Shap-E]] | 文本/单图 | NeRF/GLB | 分钟级 | 微软开源，多格式输出 |
| [[TripoSR]] | 单图 | Mesh (OBJ/GLB) | **0.5 秒** | 速度最快，精度略低 |
| [[Zero-1-to-3]] | 单图 | 多视角图 | 秒级 | 仅多视角，无纹理 |
| [[Wonder3D]] | 单图 | 带纹理 Mesh | 分钟级 | 单阶段，纹理质量不稳定 |

**CRM 的优势**：前馈 10 秒生成 + 两阶段扩散保证纹理质量 + UV 纹理直接可用，是目前综合体验最好的单图→有纹理 3D 工具之一。

## 相关工具

- [[ai-game-devtools/triposr]] — 速度最快的单图→Mesh 工具（0.5s），可与 CRM 互补
- [[ai-game-devtools/hunyuan3d-2]] — 腾讯混元 2.0，单图→3D Mesh + PBR 材质，AI 游戏开发工具
- [[ai-game-devtools/stable-dreamfusion]] — 文本驱动 NeRF→Mesh 管线，3D 重建先驱
- [[ai-game-devtools/dreamgaussian4d]] — 4D Gaussian Splatting，适合动态场景
- [[ai-game-devtools/instant-ngp]] — NVIDIA Instant NeRF，NeRF 实时推理
- [[DreamTextures]] — Stable Diffusion 在 Blender 中的纹理生成插件

## 使用方式

```bash
# 命令行推理
CUDA_VISIBLE_DEVICES="0" python run.py --inputdir "examples/kunkun.webp"

# Web UI（Gradio）
gradio app.py
```

输入图像建议：灰度或白色背景，结果更稳定。

## 许可

LICENSE 文件未在 README 中明确标注，默认遵循 Tsinghua University 开源协议。
