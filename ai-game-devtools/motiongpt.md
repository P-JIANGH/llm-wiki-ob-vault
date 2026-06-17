---
title: MotionGPT — 人体动作作为外语的统一运动语言模型
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [ai, multimodal, tool, open-source, animation, avatar]
sources:
  - raw/articles/ai-game-devtools/motiongpt.md
---

# MotionGPT: Human Motion as a Foreign Language

**OpenMotionLab** 开源的统一运动-语言模型，NeurIPS 2023 接收。将人体运动视为一种"外语"，用语言模型统一处理多种运动任务。

## 概述

MotionGPT 的核心理念：人体运动与语言一样具有语义耦合特性，可以被视为一种"身体语言"。通过 VQ-VAE 将 3D 运动序列离散化为运动 token（类似词 token），然后在统一的 T5/GPT-2 语言模型上同时训练运动和文本。

## 架构：三阶段训练管线

| 阶段 | 内容 | 作用 |
|------|------|------|
| Stage 1 | Motion Tokenizer (VQ-VAE) | 3D运动 → 离散运动token（码本大小512） |
| Stage 2 | 运动-语言预训练 | 在运动token+文本token上联合训练，T5/GPT-2骨干 |
| Stage 3 | 指令微调 | Prompt-based QA任务微调，支持零样本/少样本 |

## 支持的任务

- **文本到运动 (t2m):** 文字描述 → 3D人体运动生成
- **运动翻译 (m2t):** 运动序列 → 文字描述（运动字幕）
- **运动预测 (pred):** 部分运动 → 未来运动预测
- **运动补间 (inbetween):** 两端运动片段 → 中间过渡动画

## 技术栈

- **框架:** PyTorch 2.0 + PyTorch Lightning
- **语言模型:** T5 (encoder-decoder) / GPT-2 (decoder-only)
- **人体模型:** SMPL/SMPLH/SMPLX
- **数据集:** HumanML3D (~14K clips), KIT-ML (~4K clips)
- **可视化:** Blender渲染 / pyrender / matplotlib 3D
- **Web UI:** Gradio (app.py, 端口8888)

## 与同类工具差异

与 [[motionllm]]（IDEA/清华的视频+动作联合理解LLM）不同，MotionGPT 专注于运动生成而不仅是理解——它不仅能"读懂"运动，还能"写出"运动。同时支持生成和翻译双向任务。

与 [[hallo]]（复旦音频驱动肖像动画，SD+AnimateDiff架构）和 [[liveportrait]]（快手视频驱动肖像动画）不同，MotionGPT 处理的是全身 3D 运动（22关节坐标），而非面部/头部动画。但三者结合可形成完整角色动画管线：文本→全身运动→面部表情→最终渲染。

## 关键信息

| 项目 | 值 |
|------|-----|
| 许可证 | MIT |
| 发表 | NeurIPS 2023 |
| Python | 3.10.6 |
| PyTorch | 2.0.0 |
| 配置 | OmegaConf YAML |
| 代码量 | ~100个Python文件 (mGPT/ 模块) |
| 预训练权重 | HuggingFace OpenMotionLab |
| 后续版本 | MotionGPT3 (2025/06, MoT架构) |

## 项目地址

- GitHub: https://github.com/OpenMotionLab/MotionGPT
- 论文: https://arxiv.org/abs/2306.14795
- 项目页: https://motion-gpt.github.io/
- Demo: https://huggingface.co/spaces/OpenMotionLab/MotionGPT
