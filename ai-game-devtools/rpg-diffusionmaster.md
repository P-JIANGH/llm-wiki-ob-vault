---
title: RPG-DiffusionMaster
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, python, diffusion, image-generation, open-source, multimodal]
sources: [raw/articles/ai-game-devtools/rpg-diffusionmaster.md]
---

# RPG-DiffusionMaster

**RPG (Recaptioning, Planning, and Generating)** 是一个无需训练的文本到图像扩散生成范式，利用多模态大语言模型（MLLM）作为提示词重写器和区域规划器，结合互补区域扩散技术实现 SOTA 级的图像生成和编辑能力。论文发表于 ICML 2024，由北京大学和斯坦福大学团队开发。

## 概述

RPG 的核心思想是将复杂的文本提示词分解为多个区域子提示词，每个子提示词负责图像的一个特定空间区域。MLLM（如 GPT-4）通过 Chain-of-Thought 推理自动完成提示词的拆解和区域比例分配，扩散模型则在去噪过程中对不同区域应用不同的提示词。

## 技术架构

### 核心模块

| 文件 | 功能 |
|------|------|
| `mllm.py` | MLLM 接口，支持 GPT-4 API 和本地 LLM（Llama-2-13b-chat），通过模板推理输出分割比例和区域提示词 |
| `RegionalDiffusion_base.py` | 基础版区域扩散管线（SD v1.4/1.5/2.0/2.1），1123 行 |
| `RegionalDiffusion_xl.py` | SDXL 版区域扩散管线 |
| `cross_attention.py` | 交叉注意力钩子，实现空间区域的差异化提示词应用 |
| `matrix.py` | 分割比例计算和区域映射管理 |
| `RPG.py` | 主入口脚本，32 行 |

### 工作流程

1. 用户输入复杂场景描述文本
2. MLLM 分析并输出：`Final split ratio`（区域分割比例）和 `Regional Prompt`（各区域子提示词）
3. 区域扩散管线在去噪过程中对不同空间区域应用不同提示词
4. `base_prompt` + `base_ratio` 用于处理同类多实体场景（如"两个女孩"）

### 支持的扩散模型后端

- **SDXL / SDXL-Turbo**：高质量生成
- **SD v1.4/1.5/2.0/2.1**：轻量级，8GB VRAM 可用
- **Playground v2**：美学优化
- **IterComp**（2024.10+）：组合感知骨干，推荐用于复杂组合生成
- **CIVITAI 社区模型**：AlbedoBase XL、DreamShaper XL 等写实模型

### 支持的 MLLM

- GPT-4 / GPT-4o、Gemini-Pro（API，推荐，最低 10GB VRAM）
- DeepSeek-R1、OpenAI o3-mini、o1（2025.2 更新，推理能力最强）
- miniGPT-4、Llama-2-13b/70b-chat（本地部署）

## 关键特性

- **训练免费**：无需额外训练，直接使用预训练扩散模型
- **框架通用**：兼容任意 MLLM 架构和扩散骨干
- **高分辨率**：支持 2048×1024 甚至更高分辨率生成
- **ControlNet 集成**：支持姿态、深度、边缘等条件控制的区域生成
- **同类/异类实体处理**：通过 `base_prompt` 参数区分同类多实体和异类多实体场景

## 与同类工具差异

- **vs [[ai-game-devtools/controlnet]]**：ControlNet 通过条件图（姿态/深度/边缘）控制空间布局，RPG 通过 MLLM 语义理解自动分配区域，两者可结合使用
- **vs [[ai-game-devtools/comfyui]]**：ComfyUI 是图形化节点工作流编辑器，RPG 是具体的算法框架，可在 ComfyUI 中集成
- **vs [[ai-game-devtools/flux]]**：Flux 是新一代扩散模型架构，RPG 是方法论，可适配到 Flux 等后端

## 许可证

Apache 2.0

## 相关链接

- [GitHub](https://github.com/YangLing0818/RPG-DiffusionMaster)
- [论文 (OpenReview)](https://openreview.net/forum?id=DgLFkAPwuZ)
- [HuggingFace 论文页面](https://huggingface.co/papers/2401.11708)
- [HuggingFace 模型](https://huggingface.co/BitStarWalkin/RPG_models)
- [作者主页](https://yangling0818.github.io/)
