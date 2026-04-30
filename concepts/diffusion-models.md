---
title: Diffusion Models
created: 2026-04-27
updated: 2026-04-27
type: concept
tags: [ai, generation, diffusion, model]
sources: []
---

# Diffusion Models

扩散模型，生成式 AI 的核心技术之一。广泛应用于图像、音频、视频生成。

## 核心原理

1. **前向过程**：对数据逐步添加噪声，直到完全随机
2. **反向过程**：学习从噪声恢复原始数据
3. **条件生成**：通过 CLIP 等编码器注入条件信息

## 架构变体

| 类型 | 代表模型 | 特点 |
|------|----------|------|
| Latent | [[stable-diffusion]] | 低维空间扩散，效率高 |
| DiT | PixArt | Transformer 替代 U-Net |
| MM-DiT | Stable Diffusion 3 | 多模态联合 |

## 关键组件

- **噪声调度器**：控制噪声添加/去除节奏
- **U-Net / DiT**：核心网络结构
- **文本编码器**：CLIP、T5 等

## 游戏开发应用

- [[image-generation]] — 美术资产生成
- [[audio-generation]] — 音效/音乐生成
- 动态纹理生成

## 相关

- [[stable-diffusion]] — 最重要开源实现
- [[diffusion-models]] — 同上（别名）
