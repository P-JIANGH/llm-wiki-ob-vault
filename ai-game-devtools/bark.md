---
title: Bark
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai, tool, speech, audio, open-source, python]
sources: [raw/articles/ai-game-devtools/bark.md]
---

# Bark

Suno 开源的 transformer 文本到音频生成模型，可生成高度逼真的多语言语音、音乐、背景噪声和简单音效，还能产生笑声、叹息等非语言交流。

## 概述

Bark 是完全生成式的文本到音频模型（非传统 TTS），基于 GPT 风格架构，输入文本直接转换为音频（不经过音素中间层），因此能泛化到语音之外的任意指令，包括音乐歌词、音效或其他非语音声音。

## 技术特点

| 维度 | 详情 |
|------|------|
| 架构 | GPT 风格 transformer，类似 AudioLM / Vall-E |
| 音频编码 | EnCodec 量化音频表示 |
| 许可证 | MIT（2023.05.01 起） |
| 版本 | v0.0.1a |
| Python | >=3.8 |
| 依赖 | PyTorch, Transformers, EnCodec, Tokenizers, SciPy |
| GPU | CUDA 11.7/12.0, PyTorch 2.0+ |
| VRAM | 完整版 ~12GB, 小版 ~8GB, CPU offload ~2GB |
| 推理速度 | 企业级 GPU 接近实时，旧硬件较慢 |

## 核心功能

- **13 种语言**：英语、德语、西班牙语、法语、印地语、意大利语、日语、韩语、波兰语、葡萄牙语、俄语、土耳其语、简体中文
- **100+ 说话人预设**：跨支持语言的音色预设
- **非语音声音**：`[laughter]`、`[laughs]`、`[sighs]`、`[music]`、`[gasps]`、`[clears throat]`
- **音乐生成**：用 ♪ 标记从歌词生成音乐
- **长篇生成**：支持超过 13 秒的长文本音频生成
- **CLI 支持**：`python -m bark --text "..." --output_filename "example.wav"`
- **🤗 Transformers 集成**：自 v4.31.0 起可用

## 游戏开发应用

- **NPC 语音生成**：无需配音演员即可生成游戏角色对话
- **多语言本地化**：同一套管线生成 13 种语言的游戏对话
- **动态音效**：生成笑声、叹息声等非语音音效
- **辅助功能**：游戏 UI 文本转语音
- **社区模组**：玩家自制语音内容工具

## 与同类工具差异

- 与 [[so-vits-svc]] 和 [[retrieval-based-voice-conversion-webui]] 不同，Bark 不是声音转换模型，而是从零生成音频
- 与 [[tortoise-tts]] 类似都是自回归生成，但 Bark 更专注于多语言和音频泛化能力
- Suno 团队后续转向音乐生成领域（MusicGen 等），Bark 是其早期代表作

## 相关链接

- GitHub: https://github.com/suno-ai/bark
- HuggingFace: https://huggingface.co/spaces/suno/bark
- Discord: https://suno.ai/discord
- 🤗 Transformers 文档: https://huggingface.co/docs/transformers/main/en/model_doc/bark
