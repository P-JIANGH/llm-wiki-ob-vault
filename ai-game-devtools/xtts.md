---
title: XTTS (Coqui TTS)
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, tool, open-source, python, ai]
sources: [raw/articles/ai-game-devtools/xtts.md]
---

# XTTS (Coqui TTS)

Coqui.ai 开源的先进文本到语音（TTS）生成库，支持 1100+ 语言的预训练模型，并提供语音克隆、多说话人合成和语音转换能力。

## Overview

🐸TTS 是一个模块化、生产级的深度学习 TTS 框架。其核心产品 ⓍTTS v2 支持 16 种语言的零样本语音克隆，流式推理延迟低于 200ms。框架还集成了 Bark、Tortoise、YourTTS、VITS 等多种 SOTA 模型，覆盖从研究到生产的全链路需求。

## Key Facts

| Attribute | Value |
|-----------|-------|
| **Developer** | Coqui.ai (Eren Gölge 等) |
| **License** | MPL 2.0 |
| **Language** | Python 3.9–3.11 |
| **Backend** | PyTorch ≥ 2.1 |
| **Models** | 1100+ 语言预训练权重 |
| **GitHub** | https://github.com/coqui-ai/TTS |

## Architecture

TTS 采用分层模块化设计：

1. **Text2Spec** — 文本→频谱图（Tacotron2, Glow-TTS, FastPitch 等）
2. **Speaker Encoder** — 说话人嵌入计算（GE2E, Angular Loss）
3. **Vocoder** — 频谱图→波形（HiFi-GAN, UnivNet, WaveRNN 等）
4. **End-to-End** — 直接文本→波形（XTTS, VITS, Bark, Tortoise）
5. **Voice Conversion** — 音色迁移（FreeVC）

### XTTS v2 技术特点
- **多语言**: 16 种语言零样本语音克隆
- **流式**: <200ms 首包延迟
- **微调**: 开源 fine-tuning 代码和 recipes
- **条件输入**: 支持 `speaker_wav` + `language` + `text`

## Installation & Usage

```bash
pip install TTS
```

```python
from TTS.api import TTS
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
tts.tts_to_file(text="Hello!", speaker_wav="ref.wav", language="en", file_path="out.wav")
```

CLI 和 Flask Server 也一并提供：
```bash
tts --text "Hello" --out_path out.wav
tts-server --model_name tts_models/en/vctk/vits
```

## Differentiation

| Dimension | XTTS / Coqui TTS | Typical TTS Tool |
|-----------|------------------|------------------|
| **模型覆盖** | 集成 10+ 架构（Tacotron/VITS/Bark/Tortoise/XTTS） | 通常单一架构 |
| **语言支持** | 1100+ 语言（含 Fairseq MMS） | 通常 10-50 种 |
| **语音克隆** | 零样本，16 语言，<200ms 流式 | 需微调或单语 |
| **训练工具** | 完整的 Trainer API + 数据集分析 | 仅推理 |
| **部署方式** | PyPI / Docker / Flask Server / CLI | 通常仅 API |

## Related Projects

- [[ai-game-devtools/bark]] — Suno 的生成式 TTS，已集成到 Coqui TTS
- [[ai-game-devtools/tortoise-tts]] — 高质量多音色 TTS，已集成到 Coqui TTS
- [[ai-game-devtools/style-tts-2]] — 风格扩散 TTS，同领域竞品
- [[ai-game-devtools/openvoice]] — 即时语音克隆框架
- [[ai-game-devtools/whisper]] — OpenAI 语音识别，常与 TTS 配对使用
- [[ai-game-devtools/coqui-tts]] — 本框架的社区延续（注：Coqui 公司于 2024 年关闭，项目转为社区维护）

## Resources

- Documentation: https://tts.readthedocs.io/en/latest/
- PyPI: https://pypi.org/project/TTS/
- Docker: `ghcr.io/coqui-ai/tts-cpu`
- Recipes: `recipes/ljspeech/` (fine-tuning examples)
