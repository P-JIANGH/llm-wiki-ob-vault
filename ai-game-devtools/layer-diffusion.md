---
title: LayerDiffuse — Transparent Image Layer Diffusion
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, python, ai, image-generation, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/layer-diffusion.md]
---

# LayerDiffuse — Transparent Image Layer Diffusion

**LayerDiffuse** 是由 **lllyasviel**（张吕敏，[[ai-game-devtools/controlnet]] 和 [[ai-game-devtools/fooocus]] 的作者）开发的透明图像层扩散项目，通过 **latent transparency** 技术实现原生透明通道生成，而非后处理抠图。

## 概述

LayerDiffuse 的核心创新是在扩散模型中**原生编码 alpha 通道**，使其能够直接生成带半透明效果的图像。这解决了传统背景移除方法无法处理的复杂透明场景（玻璃、发光效果、细毛发、骨骼结构等）。

项目主仓库作为入口页面，指向各平台的具体实现。

## 平台实现

### 1. Stable Diffusion WebUI (via Forge)
- 仓库: https://github.com/layerdiffusion/sd-forge-layerdiffuse
- 通过 Forge 框架集成到 SD WebUI
- 支持 SDXL 和 SD1.5 两种架构
- **批处理规则**：生成全部 → 必须是 3 的倍数；BG↔FG → 必须是 2 的倍数
- SDXL 当前需 2 步工作流；SD1.5 支持 1 步生成
- 模型权重约 680MB（自动下载）

### 2. Diffusers CLI
- 仓库: https://github.com/lllyasviel/LayerDiffuse_DiffusersCLI
- 纯 diffusers 实现，无 GUI，便于开发集成
- 使用 k-diffusion 采样（不使用 diffusers 调度系统）
- **最低 8GB Nvidia VRAM**
- 支持 SDXL 透明 T2I/I2I，路线图包含 SD1.5 支持和蒙版局部编辑

## 技术架构

### Latent Transparency 机制
- 扩展标准潜空间以包含 alpha 通道编码
- VAE 透明编码器/解码器处理 RGBA ↔ 潜变量转换
- 提供注意力注入（attention injection）和卷积（convolution）两种模式

### 工作流方法

| 方法 | 架构 | 步骤 | 说明 |
|------|------|------|------|
| 仅生成透明图像 | SD1.5 & SDXL | 1 | 输出单张透明 PNG |
| 一起生成全部 | SD1.5 only | 1 | 同时输出 FG、BG、合成图 |
| 从背景到前景 | SD1.5 (1步) / SDXL (2步) | 1-2 | 用已有 BG 生成 FG + 合成 |
| 从前景到背景 | SD1.5 (1步) / SDXL (2步) | 1-2 | 用已有 FG 生成 BG + 合成 |

### 核心模型

| 模型 | 架构 | 用途 |
|------|------|------|
| `layer_xl_transparent_attn` | SDXL | 注意力注入式透明生成 |
| `layer_xl_transparent_conv` | SDXL | 卷积式透明生成 |
| `layer_xl_fg2ble` / `bg2ble` | SDXL | 前/背景到合成图 |
| `layer_sd15_transparent_attn` | SD1.5 | SD1.5 注意力注入 |
| `layer_sd15_joint` | SD1.5 | SD1.5 联合生成 |
| `vae_transparent_encoder/decoder` | VAE | 透明编码/解码 |

## 使用要点

- **批处理大小必须整除**：不遵守会输出纯噪声
- **SDXL 采样器选择**：第二步使用 Euler A 或 UniPC，避免 DPM 类采样器
- **独立图层提示词**（SD1.5）：通过 `layerdiffusion_fg_additional_prompt` 等字段分别控制 FG/BG prompt，防止全局 prompt 污染
- **多步合成**：可串联工作流实现复杂场景（生成 FG → 用 FG 生成 BG → 用 BG 重新生成 FG → 手动混合）

## 许可证

DiffusersCLI: Apache-2.0。Forge 扩展许可证依上游。

## 相关链接

- [GitHub 主仓库](https://github.com/layerdiffusion/LayerDiffusion)
- [sd-forge-layerdiffuse](https://github.com/layerdiffusion/sd-forge-layerdiffuse)
- [LayerDiffuse_DiffusersCLI](https://github.com/lllyasviel/LayerDiffuse_DiffusersCLI)

## 与其他工具的关系

- 与 [[ai-game-devtools/controlnet]]、[[ai-game-devtools/ic-light]]、[[ai-game-devtools/fooocus]] 同作者（lllyasviel），共享扩散模型条件化思想
- 与 [[ai-game-devtools/comfyui]] 兼容（项目规划中支持）
- 与 [[ai-game-devtools/hua]] 类似，都是对 SD 架构的透明/分层扩展
- 与 [[ai-game-devtools/stable-diffusion-webui]] 生态集成（通过 Forge 插件）
- 游戏开发应用：透明素材生成、UI 元素制作、角色精灵创建、分层合成管线
