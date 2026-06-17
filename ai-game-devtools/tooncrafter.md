---
title: ToonCrafter
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [tool, animation, video, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/tooncrafter.md]
---

# ToonCrafter

## Overview
ToonCrafter 是由 CUHK 和腾讯 AI Lab 联合开发的卡通插值扩散模型，发表于 SIGGRAPH Asia 2024。它能够根据起始帧和结束帧两张卡通图像，利用预训练的图像到视频扩散先验，自动生成平滑的中间帧动画序列（最多 16 帧，512x320 分辨率）。

## 核心功能
- **卡通插值**：输入起始帧 + 结束帧 → 生成 16 帧平滑过渡动画
- **草图引导**：支持稀疏草图输入进行可控插值
- **草图着色**：输入线稿 + 参考图 → 参考驱动着色 + 动画
- **Gradio Web UI**：本地交互式演示，支持文本提示调节

## 技术架构
- **骨干网络**：LatentVisualDiffusion 3D UNet（时间卷积 + 时间自注意力）
- **输入通道**：8（双帧条件输入）
- **VAE**：AutoencoderKL_Dualref（双引用自动编码器）
- **文本编码**：FrozenOpenCLIP（冻结，倒数第二层）
- **图像编码**：FrozenOpenCLIPImageEmbedderV2 + Resampler 投影器
- **采样**：DDIM，v 参数化，50 步默认
- **循环视频**：内置 loop_video 支持无缝循环动画

## 硬件需求
| 规格 | 数值 |
|------|------|
| 分辨率 | 320x512 |
| GPU 显存 | ~24GB（社区优化至 ~10-12GB） |
| 推理时间 | ~24s（A100，DDIM 50 步） |
| 输出帧数 | 16 帧 |

## 社区生态
- **ComfyUI**：ComfyUI-DynamiCrafterWrapper（fp16 精简版，12GB VRAM）、ComfyUI-ToonCrafter
- **Colab**：camenduru 和 0smboy 提供在线演示
- **Windows**：ToonCrafter-for-windows 专用支持
- **草图引导**：社区实现的 sketch guidance 分支

## 差异分析
- 与 [[animatediff]] 相比：AnimateDiff 是通用视频扩散 Motion Module，而 ToonCrafter 专攻**两帧间卡通插值**，不是从文本生成视频
- 与 [[paints-undo]] 相比：Paints-Undo 模拟数字绘画过程（成品→绘画过程），ToonCrafter 是帧到帧的动画补间
- 与 [[tooncomposer]] 相比：ToonComposer 基于 Wan2.1-I2V-14B 做后关键帧生成（草图+颜色掩码→完整动画），ToonCrafter 是双帧插值（起始帧+结束帧→中间过渡）
- VAE 架构（Dualref）使其能同时参考起始和结束帧，这是区别于普通 I2V 模型的关键设计

## 相关链接
- GitHub: https://github.com/ToonCrafter/ToonCrafter
- arXiv: https://arxiv.org/abs/2405.17933
- 项目页面: https://doubiiu.github.io/projects/ToonCrafter/
- HuggingFace: https://huggingface.co/spaces/Doubiiu/tooncrafter
- Replicate: https://replicate.com/fofr/tooncrafter

## 许可证
研究代码，仓库未声明明确开源许可证。模型权重有独立许可条款。
