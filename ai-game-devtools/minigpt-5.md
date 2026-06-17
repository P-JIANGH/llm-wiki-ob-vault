---
title: MiniGPT-5
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, multimodal, image-generation, vision-language, open-source]
sources: [raw/articles/ai-game-devtools/minigpt-5.md]
---

# MiniGPT-5

UC Santa Cruz 提出的**交叠式图文生成模型**，通过 Generative Vokens 机制实现文本与图像的协同生成，无需详细图像描述即可训练。

## 概述

MiniGPT-5 是 [MiniGPT-4](ai-game-devtools/minigpt-4) 的升级版本，从纯视觉理解扩展到**图文联合生成**。其核心创新是引入 Generative Vokens（生成性视觉 token）作为 LLM 与 Stable Diffusion 之间的桥梁，实现交叠式图文输出。

**论文**: [arXiv:2310.02239](https://arxiv.org/abs/2310.02239) | **项目页**: [eric-ai-lab.github.io/minigpt-5](https://eric-ai-lab.github.io/minigpt-5.github.io/)

## 技术特点

### 架构
- **基础 LLM**: Vicuna 7B（基于 [Llama 2](ai-game-devtools/llama-3)）
- **视觉编码器**: 冻结 ViT + Q-Former（来自 BLIP-2）
- **生成模型**: Stable Diffusion 2-1（`stabilityai/stable-diffusion-2-1-base`）
- **训练框架**: PyTorch Lightning 2.0

### 两阶段训练

| 阶段 | 数据集 | 目标 |
|------|--------|------|
| Stage 1 | CC3M (Conceptual Captions) | 图像描述 → 正确图像生成 |
| Stage 2 | VIST / MMDialog | 交叠式图文故事 / 多模态对话生成 |

Stage 2 依赖 Stage 1 的 checkpoint，模型权重发布在 [HZ-KZ/MiniGPT5](https://huggingface.co/KZ-ucsc/MiniGPT5)。

### 核心创新：Generative Vokens
- 在 LLM vocabulary 中引入特殊 vokens
- vokens 充当"软图像占位符"，指导 SD 生成对应图像
- Classifier-free guidance 提升 vokens 的生成指向性
- **无需详细图像描述**即可训练，降低数据标注成本

## 与同类工具对比

| 项目 | 方向 | 特点 |
|------|------|------|
| **MiniGPT-5** | 图文生成 | Generative vokens，交叠输出 |
| [MiniGPT-4](ai-game-devtools/minigpt-4) | 视觉理解 | 图像理解为主，无生成 |
| [LLaVA](ai-game-devtools/llava-onevision) | 视觉问答 | VQA 为主 |
| [VideoLLaMA 2](ai-game-devtools/videollama-2) | 视频理解 | 多模态视频对话 |

## 游戏开发应用

- **游戏叙事生成**: 生成交叠式图文故事 + 游戏场景概念图
- **NPC 多模态对话**: 文字对话 + 可视化图像输出
- **游戏任务链设计**: 故事到视觉素材的自动生成

## 依赖

```
torch >= 2.0 | transformers == 4.31.0 | diffusers | peft | lightning >= 2.0 | wandb
```

## 相关链接

- GitHub: https://github.com/eric-ai-lab/MiniGPT-5
- HuggingFace: https://huggingface.co/KZ-ucsc/MiniGPT5
- [[MiniGPT-4]] — 前身，纯视觉理解版本
