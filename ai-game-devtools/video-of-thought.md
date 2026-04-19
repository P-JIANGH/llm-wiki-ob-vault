---
title: Video-of-Thought (VoT)
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, video, open-source, tool]
sources: [raw/articles/ai-game-devtools/video-of-thought.md]
---

# Video-of-Thought (VoT)

ICML 2024 Oral 论文提出的首个视频 Chain-of-Thought 推理框架，结合 MotionEpic 视频多模态大语言模型，实现从像素级感知到认知级理解的分步推理。

## 概述

Video-of-Thought 将复杂视频问答问题分解为可管理的子问题链，通过 5 个步骤从低级感知逐步推理到高级认知：

1. **任务定义与目标识别** — 识别问题涉及的物体和目标
2. **对象跟踪** — 生成 STSG（时空场景图）表达式跟踪目标帧间运动
3. **动作分析** — 结合 STSG 与常识推理分析行为
4. **排序问答** — 生成候选答案并打分排序（1-10 分）
5. **答案验证** — 从感知（像素对齐）和认知（逻辑一致性）两个维度验证

## 技术架构

### MotionEpic 模型
| 组件 | 实现 |
|------|------|
| LLM 骨干 | Vicuna-7B v1.5 |
| 视觉编码器 | CLIP ViT-L/14 |
| 投影器 | Q-Former |
| STSG 编码器 | 图 Transformer + 循环传播 |
| 训练策略 | 两阶段：pretrain（对齐）→ finetune |

### 核心模块
- `motionepic/model/motionepic_arch.py` — 主架构（MotionEpicMetaModel + MetaForCausalLM）
- `multimodal_encoder/` — CLIP 视觉塔 + STSG 图编码器
- `multimodal_projector/` — Linear/Q-Former 多模态投影
- `predict.py` — Cog 推理接口，封装 5 步 VoT 推理链

### 数据与训练
- **数据集：** Action Genome, WebVid, MSR-VTT, ActivityNet, NExT-QA
- **推理配置：** top-p=1.0, temperature=0.2, max_tokens=512
- **视频采样：** CV2 读取，默认 1fps、最多 8 帧、320×576 分辨率
- **分布式训练：** DeepSpeed ZeRO-2/3/3-Offload

## 许可证与技术栈

- **许可证：** BSD（Apache 2.0 for Noncommercial use）
- **技术栈：** Python 3.8, PyTorch 2.1.2, Transformers 4.42.0, DeepSpeed 0.13.1, DGL
- **基础架构：** 基于 [[ai-game-devtools/next-gpt]] 和 graphtransformer 改造

## 游戏开发应用场景

- 游戏过场动画理解与 QA 自动化
- NPC 行为分析（从游戏录像中提取行为模式）
- 自动化游戏测试（视频观察 → 推理 → 判定）
- 电竞视频战术分析

## 相关链接

- [项目页面](http://haofei.vip/VoT/)
- [论文 (arXiv)](https://arxiv.org/abs/2501.03230)
- [GitHub](https://github.com/scofield7419/Video-of-Thought)
- [YouTube 演示](https://youtu.be/2fKCWjetV-Y)

## 相关项目

- [[ai-game-devtools/cogvideox]] — 清华/智谱 CogVideoX 视频生成模型家族
- [[ai-game-devtools/motionllm]] — IDEA/清华动作-语言联合理解 LLM
- [[ai-game-devtools/next-gpt]] — NUS 任意模态到任意模态的多模态 LLM（VoT 架构基础）
