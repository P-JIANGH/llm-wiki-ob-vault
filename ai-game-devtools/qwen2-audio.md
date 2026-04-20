---
title: Qwen2-Audio
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [llm, audio, speech, multimodal, vision-language, tool, open-source]
sources: [raw/articles/ai-game-devtools/qwen2-audio.md]
---

# Qwen2-Audio

阿里巴巴通义千问团队开发的大规模音频-语言模型，支持语音交互和音频分析两种模式。

## Overview

Qwen2-Audio 是 Qwen 系列在音频理解领域的扩展，基于 Qwen2 LLM 骨干网络，结合音频编码器构建统一的音频-语言理解框架。模型接受各种音频信号输入（语音、音乐、环境音等），能够进行音频分析或根据语音指令直接生成文本回复。

## Key Facts

| 属性 | 值 |
|------|-----|
| 开发方 | Alibaba Cloud / Qwen 团队 |
| 发布时间 | 2024.8.9（权重发布）|
| 参数量 | 7B |
| 模型版本 | Qwen2-Audio-7B, Qwen2-Audio-7B-Instruct |
| 交互模式 | Voice Chat / Audio Analysis |
| 许可证 | 各模型分别检查 HF 页面（支持商业使用）|
| 依赖 | HuggingFace transformers (最新版) + librosa |

## 技术特点

- **三阶段训练管线**：音频编码 → 音频-语言对齐 → LLM 生成
- **双模式交互**：
  - Voice Chat：纯语音对话，无需文本输入
  - Audio Analysis：音频 + 文本指令联合分析
- **ChatML 格式**：对话使用 `apply_chat_template` 处理
- **多语言 ASR**：支持英文、中文、粤语、法语等多语言语音识别
- **HuggingFace 原生集成**：`Qwen2AudioForConditionalGeneration` + `AutoProcessor`

## 性能基准

在 13 个标准数据集上评估：

| 任务 | 数据集 | Qwen2-Audio | 对比基线 |
|------|--------|-------------|---------|
| ASR (WER↓) | Librispeech test-clean | 1.6 | Qwen-Audio 2.0 |
| ASR (WER↓) | Common Voice zh | 6.9 | Whisper-large-v3 12.8 |
| S2TT (BLEU↑) | CoVoST2 zh-en | 24.4 | Qwen-Audio 15.7 |
| VSC (ACC↑) | VocalSound | 0.939 | Qwen-Audio 0.929 |
| AIR-Bench Speech | GPT-4 Eval | 7.18 | Qwen-Audio 6.47 |

全方面超越前代 Qwen-Audio（尚未建立 wiki 页面）。

## 与同类工具差异

- vs Whisper：Whisper 专注 ASR，Qwen2-Audio 是通用音频-语言模型，支持语音翻译、情感识别、声音分类等多任务
- vs [[LLaSM]]：同为音频-语言多模态模型，LLaSM 侧重语音理解与对话，Qwen2-Audio 支持更广泛的音频类型（音乐、环境音等）
- vs [[Qwen2]]：[[Qwen2]] 是纯文本 LLM，Qwen2-Audio 在其基础上增加了音频理解能力

## 游戏开发应用场景

- 游戏 NPC 语音对话（玩家直接说话，NPC 通过音频理解回复）
- 游戏内语音指令识别与控制
- 多语言游戏语音本地化辅助
- 游戏音效/音乐分类与分析
- Unity/Unreal 集成（通过 HuggingFace API 或本地部署调用）

## Related Links

- GitHub: https://github.com/QwenLM/Qwen2-Audio
- HuggingFace: https://huggingface.co/Qwen/Qwen2-Audio-7B-Instruct
- Paper: https://arxiv.org/abs/2407.10759
- Blog: https://qwenlm.github.io/blog/qwen2-audio
- [[LLaSM]]: 语音-语言多模态 LLM
- [[AudioGPT]]: ChatGPT 驱动的音频理解与生成系统
- [[Qwen2]]: Qwen2 文本 LLM 基座
- [[Qwen-Audio]]: 前代音频模型
- [[Whisper]]: OpenAI 语音识别模型（对比基线）
