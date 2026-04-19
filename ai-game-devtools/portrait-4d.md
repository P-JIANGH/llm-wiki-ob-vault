---
title: Portrait4D — One-Shot 4D Head Avatar Synthesizer
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, tool, open-source, ai, 3d, animation]
sources: [raw/articles/ai-game-devtools/portrait-4d.md]
---

# Portrait4D

## Overview

Portrait4D 是由 Xiaobing.AI 团队提出的单视频驱动 4D 头部 Avatar 合成系统，包含两代工作：

- **Portrait4D**（CVPR 2024）：Learning One-Shot 4D Head Avatar Synthesis using Synthetic Data
- **Portrait4D-v2**（ECCV 2024）：Pseudo Multi-View Data Creates Better 4D Head Synthesizer

作者：Yu Deng, Duomin Wang, Xiaohang Ren, Xingyu Chen, Baoyuan Wang

## 核心架构

### 三阶段管线

1. **GenHead（生成器）**：基于 StyleGAN3 的部分 4D 生成模型，以 FLAME 参数（形状/表情/运动）为条件，在 FFHQ 512×512 上通过对抗训练生成多样化身份和完整动作的合成多视角图像
2. **Portrait4D v1（重建器）**：基于 Transformer 的可动画 triplane 重建器，使用 GenHead 生成的合成数据学习 4D 头部重建，采用解耦策略分离 3D 重建和重演学习
3. **Portrait4D v2（伪多视角重建器）**：用伪多视角视频替代单目视频，通过跨视角自重演训练；采用 ViT 骨干 + 运动感知交叉注意力机制，在 VFHQ 数据集上训练

### 关键创新

- **合成数据驱动**：避免依赖不准确的 3DMM 重建，用对抗生成的合成数据作为训练监督
- **解耦学习**：将 3D 重建和 reenactment 学习分离，提升泛化能力
- **伪多视角转换**（v2）：先用 3D 头部合成器将单目真实视频转换为多视角，再进行跨视角自重演训练
- **Marching Cubes 网格提取**：可从 SDF 输出提取 3D 网格

## 技术栈

| 组件 | 技术 |
|------|------|
| 深度学习框架 | PyTorch ≥1.11.0, CUDA 11.3+ |
| 3D 操作 | PyTorch3D, trimesh, pyrender |
| 头部参数化 | FLAME 模型 |
| 3D 面部重建 | Deep3DFaceRecon (BFM) |
| 动作编码 | PD-FGC |
| 生成器架构 | StyleGAN3 + Super-Resolution |
| 重建器架构 | ViT + Triplane + Cross-Attention (v2) |
| 数据处理 | LMDB |
| 预训练权重 | HuggingFace |

## 硬件要求

- **训练**：8× Tesla A100 (80GB)
- **推理**：V100 (32GB) 即可

## 数据预处理管线

```
RetinaFace (检测) → H3R (2D 关键点) → 3DFAN (3D 关键点)
  → Deep3DFaceRecon (BFM 参数) → BFM_to_FLAME (参数转换)
    → flame_optim (关键点优化) → PD-FGC (动作编码)
```

提供简化版（MLP 映射）和完整版（网格优化）两种 BFM→FLAME 转换方案。

## 许可证

README 中未明确声明。论文由 Xiaobing.AI 发表，建议查看项目仓库确认。

## 相关链接

- **GitHub:** https://github.com/YuDeng/Portrait-4D
- **项目页面 (v1):** https://yudeng.github.io/Portrait4D/
- **项目页面 (v2):** https://yudeng.github.io/Portrait4D-v2/
- **预训练权重:** https://huggingface.co/bEijuuu/Portrait4D

## 与同类工具差异

| 特性 | Portrait4D | [[ai-game-devtools/exavatar]] | [[ai-game-devtools/geneavatar]] | [[ai-game-devtools/hallo]] |
|------|-----------|-----|-----|-----|
| 输入 | 单张参考图 + 驱动视频 | 手机视频 | 单张图像 | 音频 + 参考图 |
| 输出 | 4D 动态头部 | 全身 3DGS Avatar | 3D 头部 Avatar 编辑 | 2D 说话头像视频 |
| 核心方法 | 合成数据 + Triplane 重建 | SMPL-X + 3DGS | 3DMM 三平面修改场 | SD 1.5 + AnimateDiff |
| 训练数据 | 合成数据 / VFHQ | 自定义 | 多源 | 自定义 |
| 3D 网格 | 支持 (Marching Cubes) | 支持 (3DGS) | 支持 | 不支持 |
| 论文 | CVPR 2024 + ECCV 2024 | ECCV 2024 | CVPR 2024 | — |
