---
title: OmniGen2
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/omnigen2.md]
---

# OmniGen2

## Overview

OmniGen2（VectorSpaceLab / BAAI）是 OmniGen 的下一代统一多模态图像生成模型，论文发表于 2025-06（arXiv:2506.18871）。相比 [[omnigen]] v1，采用了双解码通路（文本/图像独立参数）和解耦图像 tokenizer 架构，在文本到图像、图像编辑、上下文生成和视觉理解四大任务上均取得竞争力表现。

## 技术架构

| 组件 | 技术特点 |
|------|---------|
| 双解码通路 | 文本和图像模态使用不共享参数的独立解码路径 |
| 解耦图像 Tokenizer | 改进模态特定表征学习 |
| 优化加速 | 支持 TeaCache、TaylorSeer、CPU Offload（模型级/序列级） |
| 调度器 | Euler / DPMSolver++，默认 50 步推理 |
| RL 组件 | OmniGen2-RL 子模块（强化学习训练组件） |
| 微调支持 | 官方提供 `docs/FINETUNE.md` 指南 |

### 核心模块
- **omnigen2/** — 核心模型架构
- **omnicontext/** — 上下文处理模块
- **OmniGen2-RL/** — 强化学习组件
- **train.py** — 训练入口
- **inference.py / inference_chat.py** — 独立推理脚本
- **app.py / app_chat.py** — Gradio Web UI

## 功能

1. **文本到图像** — 标准英文 prompt → 1024×1024 图像
2. **图像编辑** — 通过文本指令修改现有图像，输出自动匹配输入尺寸
3. **上下文生成** — 基于参考图像的 in-context 生成（性能仍落后于 GPT-4o）
4. **视觉理解** — 新增的视觉理解能力（v1 不具备）

## 关键超参数

| 参数类别 | 关键参数 | 说明 |
|----------|---------|------|
| 引导控制 | text_guidance_scale, image_guidance_scale | 控制 prompt/图像遵循度 |
| 上下文生成优化 | image_guidance_scale=3 | 防止原始对象被改变 |
| 加速推理 | cfg_range_end 减小、enable_teacache、enable_taylorseer | 提速且质量影响微小 |
| 低显存模式 | enable_model_cpu_offload、enable_sequential_cpu_offload | <17GB VRAM 可用 |

## 硬件需求

- 最低 VRAM: ~**17GB**（RTX 3090 或同等）
- <17GB 可启用 CPU Offload 降级运行
- 基准测试基于 NVIDIA A800 GPU

## 数据集

- **OmniContext**（HuggingFace）— 上下文训练数据集
- **X2I2**（HuggingFace）— 扩展的跨模态生成数据集

## 与同类工具差异

与 [[omnigen]] v1 相比，OmniGen2 的最大改进是双解码通路架构——文本和图像生成使用独立参数，避免了 v1 中模态间的干扰。同时新增了视觉理解能力和 TeaCache/TaylorSeer 加速推理，最低显存要求从 v1 的较高水平降低到 17GB。

与 [[flux]] 等专用文生图模型不同，OmniGen2 坚持统一多模态架构，一个模型覆盖四大任务，但上下文生成性能仍不如 GPT-4o 等专用方案。

## 已知局限

- 指令遵循有时不稳定，建议增加"每次生成图片数量"选优
- 输出分辨率固定 1024×1024，不自动缩放
- 上下文生成可能改变原始对象，需调参修复
- 官方建议使用英文 prompt 以获得最佳效果
- 社区非官方实现可能存在 bug，建议使用官方 demo

## 许可证

MIT License（与 v1 一致）

## 相关链接

- [GitHub](https://github.com/VectorSpaceLab/OmniGen2)
- [arXiv 论文](https://arxiv.org/abs/2506.18871)
- [HuggingFace 模型](https://huggingface.co/OmniGen2/OmniGen2)
- [HuggingFace Demo](https://huggingface.co/spaces/OmniGen2/OmniGen2)
- [Web App](https://genai.baai.ac.cn/)
- [OmniContext 数据集](https://huggingface.co/datasets/OmniGen2/OmniContext)
- [X2I2 数据集](https://huggingface.co/datasets/OmniGen2/X2I2)
