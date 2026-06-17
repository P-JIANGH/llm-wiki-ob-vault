---
title: NExT-GPT
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [multimodal, open-source, tool]
sources: [raw/articles/ai-game-devtools/next-gpt.md]
---

# NExT-GPT

**Any-to-Any Multimodal LLM** — the first end-to-end multimodal large language model capable of perceiving and generating arbitrary combinations of text, image, video, and audio.

- **GitHub**: https://github.com/NExT-GPT/NExT-GPT
- **Paper**: ICML 2024 (Oral) — https://arxiv.org/pdf/2309.05519
- **License**: BSD 3-Clause
- **Organization**: NExT++ Research Center, National University of Singapore
- **Base checkpoint**: Vicuna-7B-v1.5 (7b_tiva_v0)

## 功能描述

NExT-GPT 是第一个真正意义上端到端的任意模态到任意模态（any-to-any）多模态 LLM。用户可以以文字、图像、视频、音频的任意组合作为输入，模型同样以任意模态组合输出。

与其他多模态模型（如 [[moshi]]、[[imagebind]]）不同，NExT-GPT 不仅能理解多种模态的输入，还能主动生成多种模态的输出——这是其核心创新点。

## 技术架构

三阶段架构：

### 1. 多模态编码阶段
- 使用 **ImageBind**（Facebook 的统一图像/视频/音频编码器）编码各种模态输入
- 通过 **输入投影层** 将编码表示映射到 LLM 可理解的语言空间

### 2. LLM 理解与推理阶段
- 使用 **Vicuna-7B** 作为核心 LLM
- LLM 输出两类 token：
  - 普通文本 token
  - **模态信号 token**（modality signal tokens）——指示解码层输出何种模态内容

### 3. 多模态生成阶段
- 接收 LLM 产生的模态信号 token
- 通过 Transformer 输出投影层映射到对应扩散模型：
  - 图像：Stable Diffusion v2
  - 音频：AudioLDM (l-full)
  - 视频：ZeroScope v2_576w

## 训练流程

三步训练策略：
1. **编码侧对齐**（Encoding-side Alignment）：训练输入投影层，冻结其他
2. **解码侧对齐**（Decoding-side Alignment）：训练输出投影层，冻结其他
3. **指令微调**（Instruction Tuning）：用 LoRA 微调 LLM + 投影层，使用 DeepSpeed ZeRO

## 与同类工具对比

| 工具 | 输入模态 | 输出模态 | 特点 |
|------|---------|---------|------|
| NExT-GPT | 文字/图像/视频/音频 | 文字/图像/视频/音频 | 真正 any-to-any，端到端 |
| [[moshi]] | 文字/音频 | 文字/音频 | 专注实时语音对话 |
| [[imagebind]] | 6种模态 | 仅嵌入（无生成） | 跨模态检索/理解 |
| `mini-gpt-4` | 文字+图像 | 文字 | 仅理解，无多模态生成 |

## 相关链接

- 项目页面：https://next-gpt.github.io/
- HuggingFace 权重：https://huggingface.co/ChocoWu/nextgpt_7b_tiva_v0
- 论文：Wu et al., "NExT-GPT: Any-to-Any Multimodal LLM", ICML 2024
