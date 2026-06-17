---
title: NeRF
created: 2026-04-27
updated: 2026-04-27
type: entity
tags: [3d, neural-rendering, view-synthesis, research]
sources: []
---

# NeRF

Neural Radiance Fields，神经辐射场。通过神经网络从多视角图像重建 3D 场景。

## 核心原理

- 用 MLP 隐式表示 3D 场景
- 通过体积渲染合成新视角
- 需要多视角图像输入

## 衍生技术

- NeRF → [[stable-video-diffusion]]（视频版）
- Gaussian Splatting → 更高效率
- [[3d-gaussian-splatting]]

## 游戏开发应用

- 场景重建
- 动态物体捕捉
- 视角合成

## 相关

- [[3d-gaussian-splatting]] — 后续技术
- [[diffusion-models]] — 生成式扩展
