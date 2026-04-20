---
title: FoleyCrafter
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, video, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/foley-crafter.md]
---

# FoleyCrafter

**open-mmlab/FoleyCrafter** — 视频到音效（Foley）生成框架，将无声视频转化为语义相关且时间同步的逼真音效。arXiv 2407.01494，2024 年 7 月发布。

## 概述

FoleyCrafter 是一个视频驱动的声音效果（Foley）生成工具，基于 Auffusion 文本到音频扩散模型构建，通过两个核心适配器（Temporal Adapter + Semantic Adapter）实现视觉内容与音频生成的跨模态对齐。适用于游戏/影视中为无声视频自动生成脚步声、碰撞声、环境音等音效。

## 技术架构

**双适配器注入 Auffusion 扩散管线：**

| 模块 | 技术 | 功能 |
|------|------|------|
| 基座生成器 | Auffusion (UNet2DCondition) | 文本到音频扩散模型，生成 256×1024 频谱图 |
| 时间适配器 | ControlNet 风格注入 | 视频帧 onset 检测 → 频谱图时间掩码（1024 长度），确保音效与视觉事件同步 |
| 语义适配器 | IP-Adapter (CLIP Vision) | 跨帧 CLIP 图像嵌入平均 → 注入视觉语义到扩散过程 |
| 声码器 | HiFi-GAN | 频谱图 → 16kHz 波形转换 |

**推理管线：**
1. moviepy 提取视频帧（最多 150 帧）
2. VideoOnsetNet（ResNet 架构）检测视觉事件时间戳
3. CLIP Vision 编码器提取帧级语义嵌入
4. Auffusion + ControlNet + IP-Adapter 联合生成频谱图
5. HiFi-GAN 声码器转换为 WAV 音频
6. 自动与原始视频合并

## 关键特性

- **时间对齐**：`--temporal_align` 模式使生成的声音精确对应画面中的视觉事件
- **文本控制**：支持正向 prompt（添加特定声音）和负向 prompt（抑制不需要的声音）
- **Gradio Web UI**：`python app.py --share` 启动交互式演示
- **批量推理**：CLI 支持文件夹批量处理
- **自动下载权重**：首次运行时自动从 HuggingFace 下载所有模型

## 依赖与技术栈

- PyTorch 2.2.0 / CUDA 11.8 / Python 3.10
- diffusers 0.25.1（扩散模型框架）
- transformers 4.30.2（CLIP 视觉编码器）
- moviepy（视频处理）+ soundfile（音频 I/O）
- 所有权重托管在 HuggingFace（ymzhang319/FoleyCrafter）

## 许可证

部分开源，商业使用需同时检查 [[ai-game-devtools/auffusion]] 的许可证。

## 与同类工具差异

| 对比维度 | FoleyCrafter | [[ai-game-devtools/audioldm-2]] | [[ai-game-devtools/amphion]] |
|---------|-------------|------|------|
| 输入模态 | 视频 | 文本 | 文本/音频/多种 |
| 时间同步 | ✅ 基于视觉 onset | ❌ 不支持 | ❌ 不支持 |
| 语义控制 | CLIP 视觉 + 文本 prompt | 文本 | 多种条件 |
| 用途 | 游戏/影视音效 | 通用音频生成 | 音频工具箱 |

FoleyCrafter 的独特优势在于**视觉驱动的时序对齐**——能自动识别画面中"何时该有什么声音"，这是纯文本驱动的音频生成工具无法做到的。对游戏开发中自动生成场景音效有直接应用价值。

## 相关链接

- GitHub: https://github.com/open-mmlab/FoleyCrafter
- arXiv: https://arxiv.org/abs/2407.01494
- Project Page: https://foleycrafter.github.io
- HuggingFace Demo: https://huggingface.co/spaces/ymzhang319/FoleyCrafter
- HuggingFace Model: https://huggingface.co/ymzhang319/FoleyCrafter
