---
title: LION — Latent Point Diffusion Models for 3D Shape Generation
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, diffusion, point-cloud, tool, open-source]
sources: [raw/articles/ai-game-devtools/lion.md]
---

# LION — Latent Point Diffusion Models for 3D Shape Generation

## Overview
LION 是 NVIDIA T-Labs 和多伦多大学联合开发的**3D 点云扩散生成模型**，发表于 NeurIPS 2022。采用两阶段架构：先用 VAE 将点云编码为层级潜在表示，再在潜在空间训练两级扩散模型（全局+局部），实现高质量 3D 形状生成。

## 核心架构

### 两阶段管线
1. **VAE（变分自编码器）：** 将 3D 点云编码为分层潜在表示
   - 全局潜在向量（粗粒度形状结构）
   - 局部潜在向量（细粒度几何细节）
   - 使用 AdaIN（自适应实例归一化）进行条件化
   - 基于 PVCNN2 骨干网络（点-体素 CNN）

2. **扩散先验：** 在 VAE 潜在空间上运行的两级扩散模型
   - 全局先验：对全局潜在向量扩散（形状级）
   - 局部先验：对局部潜在向量扩散（细节级）
   - 层级条件化：全局潜在向量条件化局部先验
   - 使用 HuggingFace `diffusers` DDPMScheduler

### 条件化方式
- **无条件生成：** 随机生成 3D 形状
- **文本条件化（text2shape）：** 通过 CLIP 文本嵌入 + AdaGN 层
- **图像条件化：** 可用渲染图像的 CLIP 特征进行单视图重建

## 技术栈
- PyTorch 1.10.2 + CUDA 11.x
- `diffusers` 0.11.1（DDPM 调度器）
- 自定义 CUDA Chamfer Distance + EMD 损失
- Mitsuba 3 渲染可视化
- comet-ml / wandb 实验监控
- Docker 部署支持

## 许可证
NVIDIA 专有许可（NVIDIA CORPORATION & AFFILIATES 版权）——严格限制，非开源

## 链接
- [GitHub](https://github.com/nv-tlabs/LION)
- [论文](https://arxiv.org/abs/2210.06978)
- [项目页面](https://nv-tlabs.github.io/LION)
- [HuggingFace 模型](https://huggingface.co/xiaohui2022/lion_ckpt)

## 与同类工具对比
- 类似 [[ai-game-devtools/gaussiandreamer]]：都用扩散模型生成 3D，但 LION 用点云表示，GaussianDreamer 用 3D 高斯溅射
- 类似 [[ai-game-devtools/stable-diffusion]]：LION 是"3D 版潜在扩散"——将 SD 的 latent diffusion 思想迁移到点云空间
- 相比 [[ai-game-devtools/hunyuan3d-2-1]]：LION 是 2022 年早期工作，Hunyuan3D 2.1 是腾讯 2024/2025 年更完整的 3D 生成管线
- 与 [[ai-game-devtools/cosmos]] 同属 NVIDIA 生成式 AI 家族，但 Cosmos 专注世界模型，LION 专注 3D 几何

## 游戏开发应用
- 程序化 3D 资产生成（椅子、车辆等 ShapeNet 类别）
- 文本到 3D 快速原型
- 点云可转换为网格导入游戏引擎
- NVIDIA 技术生态，有潜力与 Omniverse/GameWorks 集成
