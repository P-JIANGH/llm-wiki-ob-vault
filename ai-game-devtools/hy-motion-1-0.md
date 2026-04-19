---
title: HY-Motion 1.0
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [ai-model, tool, open-source, animation, diffusion]
sources: [raw/articles/ai-game-devtools/hy-motion-1-0.md]
---

# HY-Motion 1.0 — 3D Human Motion Generation

## Overview

HY-Motion 1.0 是腾讯混元 3D 数字人团队开源的**文本到 3D 人体动作生成模型**，基于 Diffusion Transformer (DiT) 和 Flow Matching 架构。它从自然语言提示词直接生成基于骨骼的 3D 角色动画，可无缝接入标准 3D 动画管线。这是**首个将 DiT 文本到动作架构扩展到十亿参数级别**的模型，在指令跟随和动作质量上显著超越现有开源替代方案。

## 技术架构

- **主干网络：** Diffusion Transformer (DiT) + Flow Matching 目标函数
- **文本编码：** CLIP + Qwen3 双编码器条件化
- **骨骼表示：** SMPL/SMPL-H 参数化人体模型
- **三阶段训练：**
  1. 大规模预训练：>3,000 小时多样化动作数据建立运动先验
  2. 高质量微调：400 小时精编 3D 动作数据优化细节与流畅度
  3. 强化学习：RLHF + 奖励模型精炼指令对齐与自然度

## 模型规格

| 模型 | 参数量 | 最低 VRAM | HuggingFace |
|---|---|---|---|
| HY-Motion-1.0 (标准版) | 1.0B | 26GB | [权重](https://huggingface.co/tencent/HY-Motion-1.0) |
| HY-Motion-1.0-Lite (轻量版) | 0.46B | 24GB | [权重](https://huggingface.co/tencent/HY-Motion-1.0-Lite) |

## 使用方式

- **CLI 批量推理：** `python3 local_infer.py --model_path ckpts/tencent/HY-Motion-1.0`
- **Gradio Web UI：** `python3 gradio_app.py` → http://localhost:7860
- **可选模块：** Duration Prediction + Prompt Rewrite（基于 LLM 的时长估计与提示词改写）
- **ComfyUI 集成：** [ComfyUI-HY-Motion1](https://github.com/jtydhr88/ComfyUI-HY-Motion1)

## 最佳实践

- 使用英语提示词，保持 <60 词
- 聚焦动作描述，详细描述肢体/躯干运动
- VRAM 优化：`--num_seeds=1`，提示词 <30 词，动作时长 <5 秒
- 显存不足时：`DISABLE_PROMPT_ENGINEERING=True python3 gradio_app.py`

## 当前限制

- ❌ 非人形角色（动物、生物）
- ❌ 主观/视觉属性（情绪、服装、外观）
- ❌ 环境与相机描述（场景、物体、角度）
- ❌ 多人交互
- ❌ 无缝循环或原地动画

## 相关链接

- [官方网站](https://hunyuan.tencent.com/motion)
- [HuggingFace Demo](https://huggingface.co/spaces/tencent/HY-Motion-1.0)
- [ArXiv 论文](https://arxiv.org/pdf/2512.23464)

## 与同类工具对比

与 [[ai-game-devtools/motionllm]]（视频+动作联合理解）不同，HY-Motion 1.0 专注于**从零生成** 3D 动作而非理解已有视频。与 [[ai-game-devtools/hunyuanvideo-avatar]]（视频驱动角色动画）相比，HY-Motion 1.0 采用文本驱动、全身骨骼生成范式，适用于游戏角色动画管线中的动作生成环节，而非面部表情或肖像动画。
