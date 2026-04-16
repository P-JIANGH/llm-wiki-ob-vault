---
title: CSGO
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, open-source, architecture]
sources: [raw/articles/ai-game-devtools/csgo.md]
---

# CSGO — Content-Style Composition in Text-to-Image Generation

## Overview

CSGO 是 InstantX 研究团队开发的 PyTorch 实现，专注于**内容-风格组合**的文本到图像生成框架。它支持多种驱动模态下的高度可控图像合成，可将内容（主体/结构）与风格（艺术风格/色调）解耦并独立控制。

**论文**: [ArXiv 2404.02733](https://arxiv.org/abs/2404.02733)
**项目主页**: [csgo-gen.github.io](https://csgo-gen.github.io/)

## 核心能力

| 能力 | 描述 |
|:---|:---|
| 图像驱动风格迁移 | 使用参考图像将风格迁移到生成内容 |
| 文本驱动风格化合成 | 从文本提示生成风格化图像 |
| 文本编辑驱动风格化合成 | 编辑文本提示同时保持风格一致性 |
| 循环翻译 | 高级内容-风格组合与双向转换 |

## 技术架构

### 基础组件
- **基础扩散模型**: SDXL 1.0 (stabilityai/stable-diffusion-xl-base-1.0)
- **VAE**: sdxl-vae-fp16-fix
- **ControlNet**: TTPLanet_SDXL_Controlnet_Tile_Realistic（用于 Tile 级别细节增强）
- **图像编码器**: IP-Adapter SDXL (h94/IP-Adapter)

### Content-Style Token 分解
CSGO 的核心创新在于将条件信号分解为**内容 Token**（4 个）和**风格 Token**（16/32 个），使内容和风格可以独立控制：

| 模型变体 | 内容 Token | 风格 Token | 训练配置 |
|:---|:---:|:---:|:---|
| `csgo.bin` | 4 | 16 | 标准版 |
| `csgo_4_32.bin` | 4 | 32 | DeepSpeed Zero2 训练 |
| `csgo_4_32_v2.bin` | 4 | 32 | DeepSpeed Zero2 + 增强（待发布） |

### 仓库结构
```
CSGO/
├── gradio/       — Gradio Web UI 交互界面
├── infer/        — 推理脚本与管线
├── ip_adapter/   — IP-Adapter 集成模块
├── assets/       — 视觉示例与演示输出
└── requirements.txt
```

## 部署与使用

- **CLI 推理**: 执行 `/infer` 目录下的脚本
- **Gradio UI**: 本地启动交互式 Web 界面
- **在线 Demo**: [Hugging Face Space](https://huggingface.co/spaces/xingpng/CSGO/)
- **模型权重**: [Hugging Face - InstantX/CSGO](https://huggingface.co/InstantX/CSGO)

## 与同类工具差异

| 维度 | CSGO | [[ai-game-devtools/controlnet]] | [[ai-game-devtools/comfyui]] |
|:---|:---|:---|:---|
| 核心功能 | 内容-风格解耦生成 | 条件图控制扩散模型 | 节点图 SD 管线引擎 |
| 架构基础 | SDXL + IP-Adapter | SD 系列（多种版本） | SD/Flux/视频全支持 |
| 控制粒度 | 内容 Token + 风格 Token | 9 种条件图并行 | 自由节点组合 |
| 定位 | 风格化生成专用 | 通用条件控制 | 通用工作流编排 |

CSGO 与 [[ai-game-devtools/autostudio]] 都探索了多智能体/多阶段图像生成，但 CSGO 专注于单张图像的内容-风格解耦，而非多主题一致性管理。

## 作者与机构

- **主要贡献者**: Peng Xing*, Haofan Wang*, Yanpeng Sun, Qixun Wang, Xu Bai, Hao Ai, Renyuan Huang, Zechao Li✉
- **机构**: InstantX 团队、南京理工大学、小红书、北京航空航天大学、北京大学
- **计算支持**: 小红书提供算力

## 许可证

README 未明确标注（需查看仓库 LICENSE 文件）。

## 相关链接

- [[ai-game-devtools/controlnet]] — ICCV 2023 条件扩散控制，CSGO 使用其 Tile 变体
- [[ai-game-devtools/comfyui]] — 模块化视觉 AI 引擎，可与 CSGO 集成使用
- [[ai-game-devtools/autostudio]] — 多轮交互式图像生成框架，多智能体风格探索
