---
title: Disco Diffusion
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, python, project]
sources: [raw/articles/ai-game-devtools/disco-diffusion.md]
---

# Disco Diffusion

alembics/disco-diffusion — AI 艺术和动画生成的 Colab 笔记本工具箱，基于 Katherine Crowson 的 512×512 微调扩散模型 + CLIP 文本引导。

## 概述

Disco Diffusion 是一个"弗兰肯斯坦式"的笔记本、模型和技术集合，用于生成 AI 艺术和动画。最初由 Katherine Crowson 创建（使用 OpenAI 256×256 无条件 ImageNet 或她微调的 512×512 扩散模型），通过 CLIP 将文本提示与图像关联。后经 Daniel Russell 优化为 15-100 步快速生成（而非原版 1000 步）。

## 技术特点

### 核心架构
- **CLIP 引导扩散**：多 CLIP 模型同时评估文本提示，引导扩散过程
- **DangoCutn 高级裁剪方法**：提升图像质量和对齐精度
- **Katherine Crowson 二级模型方法**：改进扩散采样质量
- **双深度估计**：MiDaS v3 + AdaBins 加权融合（midas_weight 参数控制比例）

### 五种动画模式
| 模式 | 描述 | 引入版本 |
|------|------|---------|
| 2D | 缩放、平移、旋转 + 关键帧参数控制 | v4 |
| 3D | 深度引导的 3D 变换（MiDaS + AdaBins + pytorch3d） | v5 |
| Turbo | 快速帧间动画 + 平滑过渡 | v5.1 |
| Warp | 光流估计 + 帧混合的平滑视频输入处理 | v5.4 |
| VR | 虚拟现实模式 | v5.2 |

### 多模型支持
- OpenAI guided-diffusion（256×256 / 512×512）
- OpenCLIP 模型系列
- 风格化模型：像素艺术/水彩/科幻风（KaliYuga 贡献）
- 人像生成器 portrait_generator_v001
- 用户自定义模型（v5.4+）

### 关键功能
- **关键帧系统**：Chigozie 风格的关键帧动画控制
- **对称生成**：水平/垂直对称变换（nshepperd/huemin）
- **Turbo 平滑**：帧间平滑过渡，支持断点续传
- **视频输入**：使用现有视频作为动画种子
- **中间保存**：支持断点恢复
- **跨平台**：支持本地部署（含 Docker、Windows）

## 主要文件

| 文件 | 行数 | 说明 |
|------|------|------|
| disco.py | 3289 | 主笔记本代码（通过 colab-convert 与 .ipynb 互转） |
| Disco_Diffusion.ipynb | 179KB | 用户-facing Colab 笔记本 |
| disco_xform_utils.py | 131 | 3D 图像变换（深度估计 + pytorch3d 相机变换） |
| disco_utils.py | 24 | 工具函数（git clone/pip install 封装） |
| docker/ | - | Docker 本地部署配置 |

## 开发历程

项目由多位贡献者接力开发（2021.10 - 2022.12），从 v1 到 v5.7 经历了从简单 QoL 改进到完整的 3D/VR/Warp 动画管线的演进。核心维护者包括 Somnai（动画技术）、gandamu/Adam Letts（3D 模式与总体维护）、zippy/Chris Allen（Turbo 模式）、devdef/Alex Spirin（Warp 模式）等。

## 许可证

MIT（多方版权：Katherine Crowson、Intel ISL、Maxwell Ingham、Adam Letts、Alex Spirin）；flow 相关组件使用 Apache 2.0（NVIDIA FlowNet2）。

## 相关链接

- GitHub: https://github.com/alembics/disco-diffusion
- 网站: https://discodiffusion.com/
- Colab: [Open in Colab](https://colab.research.google.com/github/alembics/disco-diffusion/blob/main/Disco_Diffusion.ipynb)
- Discord: https://discord.gg/msEZBy4HxA

## 与同类工具差异

- 相比 [[comfyui]]：Disco Diffusion 以 Colab 笔记本为核心，面向动画/视频生成；ComfyUI 是节点式工作流引擎，面向静态图像生产管线
- 相比 [[controlnet]]：Disco Diffusion 集成深度估计实现 3D 动画，ControlNet 专注于空间条件控制的图像生成
- 相比 [[clipasso]]：两者都使用 CLIP 引导，但 Disco Diffusion 用 CLIP 做扩散引导生成，CLIPasso 用 CLIP 做草图感知损失
