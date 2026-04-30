---
title: Whisper
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai, speech, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/whisper.md]
---

# Whisper

OpenAI 发布的通用语音识别（ASR）模型，基于 Transformer encoder-decoder 架构，支持多语言语音识别、语音翻译和语言识别。2022 年 12 月开源，论文 arXiv:2212.04356，MIT 许可证。

## 核心能力

- **多语言语音识别**：支持 99 种语言，自动检测或手动指定语言
- **语音翻译**：非英语语音 → 英语文本（多语言模型支持）
- **语言识别**：自动判断音频中的语言
- **语音活动检测（VAD）**：区分语音与静音
- **词级时间戳**：通过 DTW（Dynamic Time Warping）对齐音频与文本 token
- **幻觉抑制**：跳过无声区域的虚假转录

## 模型规格

| 尺寸 | 参数量 | 英文专用 | 多语言 | 显存需求 | 相对速度 |
|:---:|:---:|:---:|:---:|:---:|:---:|
| tiny | 39M | tiny.en | tiny | ~1 GB | ~10x |
| base | 74M | base.en | base | ~1 GB | ~7x |
| small | 244M | small.en | small | ~2 GB | ~4x |
| medium | 769M | medium.en | medium | ~5 GB | ~2x |
| large | 1550M | — | large | ~10 GB | 1x |
| turbo | 809M | — | turbo | ~6 GB | ~8x |

turbo 是 large-v3 的优化版本，在几乎不损失精度的情况下大幅提升推理速度。

## 技术架构

- **Encoder-Decoder Transformer**：seq2seq 结构，音频编码器 + 文本解码器
- **音频前端**：log-mel 频谱图（80/128 mels），16kHz 采样率，30 秒滑动窗口
- **编码器**：2 层 strided Conv1d 降采样 + Transformer blocks + 多头自注意力
- **解码器**：因果 masked 自注意力 + cross-attention 到编码器输出
- **注意力优化**：支持 PyTorch `scaled_dot_product_attention`（SDPA）加速
- **位置编码**：音频编码器使用正弦位置编码，文本解码器使用可学习位置编码
- **Tokenizer**：基于 OpenAI tiktoken，含特殊任务 token（`<|startoftranscript|>`、`<|transcribe|>`、`<|translate|>` 等）

## 依赖与部署

- **Python**: 3.8+
- **核心依赖**: PyTorch, tiktoken, numpy, numba, tqdm, more-itertools
- **加速**: triton (Linux x86_64)
- **外部工具**: ffmpeg（必需，用于音频解码）
- **安装**: `pip install -U openai-whisper`
- **模型下载**: 首次使用自动从 Azure CDN 下载并校验 SHA256

## 使用方式

**CLI:**
```bash
whisper audio.mp3 --model turbo
whisper japanese.wav --model medium --language Japanese --task translate
```

**Python API:**
```python
import whisper
model = whisper.load_model("turbo")
result = model.transcribe("audio.mp3")
print(result["text"])
```

## 在游戏开发中的应用

- **NPC 语音交互**：为游戏角色提供实时语音输入理解（结合 [[interactive-llm-powered-npcs]]）
- **语音指令识别**：玩家语音控制游戏内操作
- **字幕自动生成**：游戏内过场动画/对话的自动字幕
- **多语言本地化**：语音内容自动转录为文本，辅助本地化流程
- **音频数据处理**：作为下游 TTS/音频模型的音频特征提取器（如 [[llasm]] 使用 whisper-large-v2 作为音频塔）

## 与同类工具对比

| 维度 | Whisper | [[sensevoice]] |
|:---|:---|:---|
| 开发者 | OpenAI | Alibaba (FunAudioLLM) |
| 架构 | Transformer encoder-decoder | Paraformer encoder + Transformer decoder |
| 语言支持 | 99 种 | 中文/英文/粤语/日语/韩语等 |
| 情感识别 | ❌ | ✅ |
| 音乐识别 | ❌ | ✅ |
| 开源协议 | MIT | Apache 2.0 |
| 社区生态 | 极广泛（封装项目众多） | 快速增长 |

Whisper 凭借其通用性、多语言支持和极广泛的社区封装（如 faster-whisper、whisper.cpp、insanely-fast-whisper 等），已成为语音识别领域的事实标准基线模型。

## 相关链接

- GitHub: https://github.com/openai/whisper
- 论文: https://arxiv.org/abs/2212.04356
- Blog: https://openai.com/blog/whisper
