---
title: MotionLLM
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [vlm, multimodal, model, video-understanding, open-source]
sources: [raw/articles/ai-game-devtools/motionllm.md]
---

# MotionLLM

> Understanding Human Behaviors from Human Motions and Videos

## Overview

**MotionLLM** 是由 IDEA Research（联合 Tsinghua、CUHK-Shenzhen、HKUST）开源的多模态大语言模型，专注于从视频和人体动作两种模态联合理解人类行为。区别于现有仅处理视频或仅处理动作的模型，MotionLLM 通过统一视频-动作训练策略，充分利用粗粒度视频-文本数据和细粒度动作-文本数据的互补优势，实现对肢体细节动力学和语义的深度建模。

核心亮点：将 Vicuna 1.5-7B 作为基座 LLM，通过 LoRA 高效微调 + 线性投影层连接视觉/动作编码器，支持动作描述、时空理解和行为推理三大任务。

## Key Facts

| Property | Value |
|----------|-------|
| **Release** | 2024-05-31 (paper/code/demo), 2024-06-17 (MoVid dataset) |
| **Authors** | Ling-Hao Chen, Shunlin Lu, Ailing Zeng, Hao Zhang et al. (IDEA, Tsinghua, CUHK-SZ, HKUST) |
| **License** | IDEA License |
| **Paper** | arXiv:2405.20340 |
| **Demo** | https://demo.humotionx.com/ |
| **HF Demo** | https://huggingface.co/spaces/EvanTHU/MotionLLM |

## Architecture

基于 Video-LLaVA 架构，融合 MotionGPT 和 HumanML3D 的运动建模技术：

- **Base LLM**: Vicuna 1.5-7B（通过 Lit-GPT 加载）
- **Motion Encoder**: 支持 SMPL 序列输入
- **Video Encoder**: 联合视频帧编码
- **训练策略**: 统一视频-动作联合训练（unified video-motion training strategy）
- **高效微调**: LoRA + 线性投影层（LINEAR_V）

主要源码模块：

| 文件 | 说明 |
|------|------|
| `app.py` | Gradio Web 演示界面 |
| `CLI.py` | 命令行交互接口 |
| `generate.py` | 文本生成（基于 Karpathy nanoGPT 改写） |
| `lit_llama/` | Lit-GPT LLM 基础设施 |
| `lit_gpt/` | Lit-GPT 工具函数 |

## Key Capabilities

1. **Human Motion Captioning** — 动作序列描述生成
2. **Spatial-Temporal Comprehension** — 时空理解（肢体部位动态分析）
3. **Reasoning** — 从视频和动作中进行行为推理

## Dataset: MoVid

团队自采集的联合数据集，包含多样化的视频、动作、描述和指令。视频数据已发布于 [HuggingFace](https://huggingface.co/datasets/EvanTHU/MoVid)。

**MoVid-Bench**: 人工标注的评测基准，用于评估视频和动作上的人类行为理解能力。

## 技术特点

- **多模态联合**: 视频 + 动作双重输入，打破单一模态局限
- **SMPL 支持**: 人体参数化模型输入，标准化动作表示
- **统一训练**: 粗粒度视频数据 + 细粒度动作数据协同训练
- **开源推理**: 提供 Gradio Demo 和 CLI，方便集成

## Comparison with Related VLM Models

MotionLLM 专注**动作/运动**模态，与游戏开发相关的类人行为理解紧密相关：

| Model | Modality | Focus | Relevance to Game Dev |
|-------|----------|-------|----------------------|
| [[cogvlm2]] | Text + Image/Video | General VLM | Content generation |
| [[llava-onevision]] | Text + Image + Video | Generalist | NPC dialogue, scene description |
| [[minicpm-v-4.0]] | Text + Image | Generalist | Lightweight deployment |
| **MotionLLM** | Text + Video + Motion (SMPL) | Human behavior | Character animation, motion capture |

## Related Links

- GitHub: https://github.com/IDEA-Research/MotionLLM
- Paper: https://arxiv.org/abs/2405.20340
- Project Page: https://lhchen.top/MotionLLM
- HuggingFace Demo: https://huggingface.co/spaces/EvanTHU/MotionLLM
- MoVid Dataset: https://huggingface.co/datasets/EvanTHU/MoVid

## Related Wiki Pages

- [[cogvlm2]] — THUDM 多模态模型，视频理解能力强
- [[llava-onevision]] — LLaVA 通用视觉语言模型，支持视频输入
- [[minicpm-v-4.0]] — OpenBMB 高效多模态小模型
