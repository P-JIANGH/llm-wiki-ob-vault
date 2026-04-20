---
title: SEED-Story
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [multimodal, image-generation, llm, open-source]
sources: [raw/articles/ai-game-devtools/seed-story.md]
---

# SEED-Story

**TencentARC** 多模态长故事生成模型，从用户提供的起始图片/文本出发，生成角色和风格一致的多模态叙事序列。

- **GitHub:** https://github.com/TencentARC/SEED-Story
- **Paper:** https://arxiv.org/abs/2407.08683
- **HuggingFace Model:** https://huggingface.co/TencentARC/SEED-Story
- **HuggingFace Dataset:** https://huggingface.co/datasets/TencentARC/StoryStream
- **License:** Apache 2.0
- **YouTube Demo:** https://youtu.be/_t87U1tLiyQ

## 核心能力

- **多模态长故事生成:** MLLM 同时生成连贯叙事文本和图像，保持角色和风格一致性
- **超长序列生成:** 训练最大长度 10 序列，推理可生成至 25 个多模态序列
- **条件分支:** 相同起始图片 + 不同开头文本 → 不同故事走向（如包含/排除特定角色）

## 架构: 三阶段训练管线

基于 SEED-X (https://github.com/AILab-CVC/SEED-X) 构建:

| 阶段 | 内容 |
|------|------|
| Stage 1 | De-tokenizer 预训练：基于 SD-XL 的去 tokenizer 从预训练 ViT 特征重建图像 |
| Stage 2 | MLLM 指令微调：随机长度交错的图文序列上做下一词预测 + 图像特征回归 |
| Stage 3 | De-tokenizer 适配：将 MLLM 回归的图像特征输入 de-tokenizer 微调 SD-XL，显著提升角色/风格一致性 |

## StoryStream 数据集

专为多模态故事生成设计的大规模数据集：
- **子集:** Curious George, Rabbids Invasion, The Land Before Time
- **格式:** JSONL，每行 = 30 张图片 + 30 段对应文字描述
- 训练时 chunk 为长度 10 提升效率

## GPT-4 评测结果

| 指标 | 得分 |
|------|------|
| 图像风格一致性 | 8.61 |
| 故事吸引力 | 6.27 |
| 图文连贯性 | 8.24 |

## 依赖模型

- stable-diffusion-xl-base-1.0
- Llama-2-7b-hf
- Qwen-VL-Chat（需提取视觉编码器）

## 仓库结构

| 目录 | 用途 |
|------|------|
| StoryStream/ | 数据集文件 + chunk 工具 |
| src/ | 核心源码 + 评测脚本 |
| configs/ | 训练与推理配置 |
| scripts/ | 工具与安装脚本 |

## 相关项目

- [[ai-game-devtools/comfyui]] — SEED-Story 的扩散生成模块可集成到 ComfyUI 工作流中使用
- [[ai-game-devtools/qwen-vl]] — SEED-Story 依赖 Qwen-VL-Chat 的视觉编码器
