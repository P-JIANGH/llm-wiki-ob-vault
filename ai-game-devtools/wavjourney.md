---
title: WavJourney
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, ai, open-source, music, game-dev]
sources: [raw/articles/ai-game-devtools/wavjourney.md]
---

# WavJourney

**LLM 驱动的组合式音频创作系统 — 从文本提示生成带故事线的多轨音频（语音+音乐+音效）**

## Overview

WavJourney 是由萨里大学（University of Surrey）等机构研究者开发的音频创作系统，基于 arXiv 2307.14335 论文。通过 GPT-4 将自然语言文本转化为结构化音频剧本（JSON），再编译为 Python 音频生成代码，最终组合语音（Bark）、音乐（MusicGen）和音效（AudioGen）输出完整多轨音频作品。

## 核心架构：4 步 LLM 管线

| 步骤 | 功能 | 技术 |
|------|------|------|
| 1. Text → JSON Script | GPT-4 将文本转化为音频剧本 | OpenAI GPT-4 API |
| 2. JSON → Voice Map | 角色→声音预设映射 | GPT-4 + Bark HuBERT |
| 3. JSON → Python Code | 剧本编译为音频生成代码 | AudioCodeGenerator |
| 4. Code → WAV | 执行代码生成最终音频 | MusicGen/AudioGen/Bark |

## 音频引擎

- **TTM (Text-to-Music)**: [[musicgen]] Facebook MusicGen，small/medium/large 三档
- **TTA (Text-to-Audio)**: Facebook AudioGen，medium 档，生成音效/环境声
- **TTS (Text-to-Speech)**: [[bark]] Suno Bark + HuBERT 声纹克隆，支持预设音色库
- **VoiceFixer**: 语音质量修复后处理
- **VoiceParser**: HuBERT 声纹特征提取，支持自定义声音预设

## 音频组合 API

- `MIX`: 多轨混音，支持偏移量控制（背景音对齐前景音）
- `CAT`: 前景音顺序拼接
- `COMPUTE_LEN`: 音频时长计算，自动推算背景音持续时间
- 响度归一化 + 淡入淡出处理

## 声音预设系统

内置 6 种预置音色（`data/voice_presets/`）：
- child_boy（童声）、news_male_speaker（男新闻播音）、news_female_speaker（女新闻播音）、elder_morgen（长者）、cnn_male_speaker（CNN 男声）
- 支持通过 HuBERT quantizer 从任意 .wav 采样提取自定义声音预设（.npz）

## JSON 剧本格式

```json
{
  "layout": "foreground|background",
  "audio_type": "speech|music|sound_effect",
  "id": <background 标识符>,
  "action": "begin|end",
  "text": "对话文本",
  "desc": "音乐/音效描述",
  "vol": -35,
  "len": 5.0,
  "character": "角色名"
}
```

背景音通过 begin/end 配对，自动计算覆盖的前景音时长区间。

## 技术栈

| 组件 | 技术 |
|------|------|
| LLM | GPT-4 (OpenAI API) |
| TTS | Suno Bark + HuBERT 声纹克隆 |
| Music | MusicGen (Meta AudioCraft) |
| SFX | AudioGen (Meta AudioCraft) |
| Web UI | Gradio |
| API | Flask (单线程，避免 CUDA OOM) |
| 语音修复 | VoiceFixer |

## 硬件需求

- GPU VRAM > 16 GB
- Linux 操作系统

## 部署方式

- **Web App**: `bash scripts/start_ui.sh` → Gradio 界面
- **CLI**: `python wavjourney_cli.py -f --input-text "..."`
- **API 服务**: `bash scripts/start_services.sh` → Flask 端口 8021

## 链接

- **GitHub:** https://github.com/Audio-AGI/WavJourney
- **arXiv:** https://arxiv.org/abs/2307.14335
- **Demo:** https://audio-agi.github.io/WavJourney_demopage/
- **HuggingFace:** https://huggingface.co/spaces/Audio-AGI/WavJourney

## 与同类工具差异

- 相比单一音频生成工具（如 [[musicgen]] 只生成音乐），WavJourney 是**组合式创作**——同时编排语音/音乐/音效多轨
- 使用 GPT-4 作为"导演"自动拆分文本为音频剧本，而非手动编写提示词
- 内置声音预设库 + 声纹克隆，适合广播剧/有声书/游戏 NPC 对话等场景
- 音频时长自动对齐：背景音自动计算覆盖前景音的时长，手动计算无需

