---
title: PromptEnhancer
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, image-generation, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/prompt-enhancer.md]
---

# PromptEnhancer

Tencent Hunyuan 开源的 CoT（Chain-of-Thought）提示重写工具，将用户输入的简单提示词重构为更清晰、结构化的版本，以提升下游图像生成质量，同时严格保留原始创意意图。

## 概述

PromptEnhancer 支持 **文生图（T2I）** 和 **图生图（I2I）** 两种模式，通过 LLM 的推理能力将模糊的提示词扩展为包含构图、风格、光影等细节的结构化描述。项目与 [[hunyuanimage-2-1]] 紧密相关，模型权重托管在 HunyuanImage-2.1 的 HuggingFace 仓库下。

## 模型变体

| 模型 | 磁盘大小 | 质量等级 | 最低显存 | 适用场景 |
|:---|:---|:---|:---|:---|
| PromptEnhancer-7B | 13GB | High | 8GB+ | 大多数用户 |
| PromptEnhancer-32B | 64GB | Highest | 32GB+ | 研究用途 |
| 32B-Q8_0 GGUF | 35GB | Highest | ~35GB | H100/A100 |
| 32B-Q6_K GGUF | 27GB | Excellent | ~27GB | RTX 4090/5090 |
| 32B-Q4_K_M GGUF | 20GB | Good | ~20GB | RTX 3090/4080 |

推荐 Q6_K 量化作为质量与显存的最佳平衡点。GGUF 量化可降低 50-75% 显存占用，质量损失极小。

## 架构与使用

### 三种后端类

- **HunyuanPromptEnhancer** — 纯文本输入，T2I 提示重写，基于 transformers 加载 7B/32B 模型
- **PromptEnhancerImg2Img** — 文本+图像输入，I2I 编辑指令重写，仅支持 32B
- **PromptEnhancerGGUF** — 纯文本输入，基于 llama.cpp 的量化模型，适合显存受限环境

### 关键参数

- `device_map="auto"` 自动设备映射
- `temperature > 0` 控制输出多样性
- `max_new_tokens` 控制输出长度

## 相关资源

- **论文:** [arXiv:2509.04545](https://arxiv.org/abs/2509.04545)
- **模型权重:** HuggingFace（HunyuanImage-2.1 仓库 / PromptEnhancer 组织）
- **评测数据集:** T2I-Keypoints-Eval
- **主页:** https://hunyuan-promptenhancer.github.io/
- **许可证:** 开源（具体许可证需参考仓库）
- **联系:** hunyuan_opensource@tencent.com

## 与同类工具的关系

- 与 [[omost]] 类似，都用于改善 LLM 到图像生成的提示质量，但 Omost 生成 Python Canvas 代码描述空间布局，而 PromptEnhancer 直接重写自然语言提示词
- 作为 [[hunyuanimage-2-1]] 的配套工具链，可独立使用也可集成到 [[comfyui]] 等可视化工作流中
- 与 [[controlnet]] 配合使用：PromptEnhancer 优化文本提示，ControlNet 提供空间/姿态/深度等结构化条件
