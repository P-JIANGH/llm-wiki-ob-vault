---
title: VibeVoice
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, ai, speech, audio, open-source, python, microsoft]
sources: [raw/articles/ai-game-devtools/vibevoice.md]
---

# VibeVoice

Microsoft 开源的前沿语音 AI 研究框架，同时涵盖**文本转语音 (TTS)** 和**自动语音识别 (ASR)** 两大模型系列。

## 概述

VibeVoice 采用连续语音 tokenizers（声学 + 语义），以超低帧率 **7.5 Hz** 运行，在保持音频保真度的同时大幅提升长序列计算效率。架构基于 **next-token diffusion** 框架（[论文](https://arxiv.org/abs/2412.08635)），结合 LLM 处理文本上下文/对话流，搭配 diffusion head 生成高保真声学输出。

## 模型矩阵

| 模型 | 参数量 | 核心能力 |
|:---|:---|:---|
| **VibeVoice-ASR-7B** | 7B | 60分钟单遍处理（64K token 上下文），结构化输出（Who/When/What），50+语言，自定义热词，联合 ASR+说话人分离+时间戳 |
| **VibeVoice-TTS-1.5B** | 1.5B | 90分钟长文本单遍生成，最多4个说话人自然轮转，多语言+情感表达。**代码已移除**（因负责任 AI 原则） |
| **VibeVoice-Realtime-0.5B** | 0.5B | 流式文本输入，首音延迟 ~300ms，支持 ~10分钟长文本，轻量级部署友好 |

## 技术特点

- **架构：** LLM + Diffusion Head 双头设计，基于 Qwen2.5 1.5B
- **Tokenizers：** 连续声学 + 语义 tokenizer，7.5Hz 超低帧率
- **长上下文：** ASR 支持 64K token（约 60 分钟音频），TTS 支持 90 分钟生成
- **多说话人：** TTS 支持最多 4 个说话人自然对话轮转
- **流式推理：** Realtime-0.5B 支持流式文本输入，~300ms 首音延迟
- **vLLM 集成：** ASR 支持 vLLM 推理加速
- **HuggingFace Transformers 集成：** ASR 模型已集成到 HF Transformers 库

## 发布时间线

- **2026-03-06:** ASR 集成到 HuggingFace Transformers
- **2026-01-21:** 开源 ASR，发布微调代码，vLLM 推理支持
- **2025-12-16:** Realtime-0.5B 增加实验性说话人（9 种多语言 + 11 种英语风格）
- **2025-12-03:** 开源 Realtime-0.5B 流式 TTS
- **2025-09-05:** TTS 代码因负责任 AI 原则从仓库移除（权重和论文仍可访问）
- **2025-08-25:** 开源 TTS 模型（ICLR 2026 Oral）

## 许可证与社区

- **许可证:** MIT
- **语言:** Python 100%
- **Stars:** 40k+ | **Forks:** 4.6k+
- **HuggingFace:** [VibeVoice Collection](https://huggingface.co/collections/microsoft/vibevoice-68a2ef24a875c44be47b034f)
- **项目页面:** https://microsoft.github.io/VibeVoice

## 负责任 AI

高质量合成语音存在深度伪造、欺诈和虚假信息传播风险。仅限研发用途，不建议在生产环境中部署。与同类工具 [[ai-game-devtools/cosyvoice]] 和 [[ai-game-devtools/openvoice]] 相比，VibeVoice 强调研究定位而非生产就绪。

## 与同类工具差异

| 维度 | VibeVoice | [[ai-game-devtools/cosyvoice]] | [[ai-game-devtools/openvoice]] |
|:---|:---|:---|:---|
| 定位 | 研究框架 | 生产级 TTS | 零样本语音克隆 |
| 架构 | LLM+Diffusion | VITS 变体 | 两阶段编码器 |
| ASR | 7B 完整 ASR | 无 | 无 |
| 流式 | 300ms 首音延迟 | 不支持 | 不支持 |
| 长上下文 | 60min ASR/90min TTS | 有限 | 有限 |
| 许可证 | MIT | Apache 2.0 | MIT |
