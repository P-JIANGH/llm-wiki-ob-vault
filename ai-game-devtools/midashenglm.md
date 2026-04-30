---
title: MiDashengLM
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, tool, audio, open-source, llm, multimodal, python]
sources: [raw/articles/ai-game-devtools/midashenglm.md]
---

# MiDashengLM-7B

**MiDashengLM** (小米大声语言模型) 是由 Xiaomi Research (MiLM Plus) 开发的开源音频理解大模型，基于 Dasheng 音频编码器和 Qwen2.5-Omni-7B Thinker 解码器，通过 caption-based alignment 策略实现高效的全景音频理解。

## Overview

| 属性 | 值 |
|------|-----|
| 开发方 | Xiaomi Inc. (MiLM Plus / Horizon Team) |
| 参数量 | 7B |
| 基础模型 | Qwen2.5-Omni-7B Thinker (decoder) + Dasheng (audio encoder) |
| 许可证 | Apache 2.0 |
| GitHub | https://github.com/xiaomi-research/dasheng-lm |
| 论文 | https://arxiv.org/abs/2508.03983 |
| HuggingFace | https://huggingface.co/models?search=midashenglm-7b |
| ModelScope | https://www.modelscope.cn/collections/MiDashengLM-7B-1021-459c73ff1d6d4c |

## 核心亮点

- **SOTA 性能**: 在多项音频理解任务上超越 Qwen2.5-Omni-7B 和 Kimi-Audio-Instruct-7B
- **高效率**: 同等 batch size 下吞吐量比 Qwen2.5-Omni-7B 快 3.2×；大 batch 下最高 20× 加速（80GB GPU，30s 音频，batch_size=512）
- **首 token 延迟**: 比 Qwen2.5-Omni-7B 快 4×
- **Caption-based 对齐**: 使用通用音频描述（非 ASR 转录）进行训练，实现语音/音效/音乐的统一理解
- **完全开源**: 训练数据公开可复现，Apache 2.0 可商用

## 技术架构

### 为什么用 Caption 而不是 ASR？

ASR 的局限性：
- 丢弃大量非语音内容（音乐/环境音）
- 缺失副语言信息（说话人情感、声学属性）
- 单调对齐提供的是平凡学习信号

Caption 优势：
- 利用全部音频内容
- 捕获全局音频上下文
- 非单调对齐提供更强的学习信号

### 训练数据集: ACAVCaps

- 38,662 小时通用音频描述
- 来源于 ACAV100M 开源音频库
- 六大类别：纯语音、纯音效、纯音乐、混合音乐、混合语音、混合音效
- 三步数据管线：多专家分析 → LLM 推理 (DeepSeek-R1) → 一致性过滤 (Dasheng-GLAP)
- 数据集待 ICASSP 2026 评审后发布

### 模型变体

| 变体 | 格式 | 适用场景 |
|------|------|---------|
| midashenglm-7b | FP32 | 精确基准测试 |
| midashenglm-7b-bf16 | BF16 | 通用推理和微调（推荐） |
| midashenglm-7b-fp8 | FP8 | Hopper 架构 GPU 优化 |
| midashenglm-7b-w4a16-gptq | GPTQ W4A16 | 资源受限部署 |

## 关键模块

- **Audio Encoder**: 基于 [Dasheng](https://github.com/XiaoMi/dasheng) 开源音频编码器
- **Decoder**: 初始化为 Qwen2.5-Omni-7B Thinker
- **MDL-Toolkit**: 内置微调工具包（支持 ESC-50 等任务）
- **vLLM 支持**: 已提交官方 PR，支持高性能推理部署
- **ms-swift 集成**: 社区贡献的微调支持

## 评估任务

| 任务 | 指标 |
|------|------|
| 自动语音识别 | WER |
| 单目标音频标签 | ACC |
| 性别识别 | ACC |
| 多目标音频标签 | mAP |
| 音频描述生成 | FENSE |
| 开放音频问答 | FENSE |
| 音频问答（选择题） | ACC |

## 效率对比

| Batch Size | MiDashengLM-7B | Qwen2.5-Omni-7B | 加速比 |
|-----------|---------------|----------------|--------|
| 1 | 0.45 samples/s | 0.36 | 1.25× |
| 8 | 2.72 | 1.15 | 2.36× |
| 16 | 5.18 | OOM | - |
| 64 | 17.07 | OOM | - |
| 200 | 25.15 | OOM | - |

## 与同类工具的差异

- 相比 [[audiogpt]]：MiDashengLM 是端到端音频理解 LLM，而 AudioGPT 是 LLM+工具编排框架
- 相比 [[amphion]]：Amphion 是音频生成工具包（TTS/VC/Vocoder），MiDashengLM 专注音频理解
- 基于 Qwen2.5-Omni 生态（参见 [[qwen2]] 系列），在音频理解方向做了专门优化

## 对游戏开发的价值

- **游戏环境音效分析**: 自动描述游戏场景中的环境音、背景音
- **NPC 语音交互**: 理解玩家语音指令并生成自然语言回复
- **游戏内音频搜索**: 基于自然语言查询定位游戏音频片段
- **实时音频理解**: 高效的 TTFT 和大 batch 处理能力适合多人游戏场景
- **多模态游戏 AI**: 统一理解游戏中的语音/音效/音乐元素