---
title: UniAudio 2.0
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [audio, speech, music, ai, llm, multimodal, tool, open-source]
sources: [raw/articles/ai-game-devtools/uniaudio2.md]
---

# UniAudio 2.0

**UniAudio 2.0** 是清华/港中文团队提出的统一音频基础模型，覆盖语音、声音、音乐三大领域。核心创新是 **ReasoningCodec** —— 一种将音频离散化为「推理 token + 重建 token」的双分支音频编解码器，配合基于 LLaMA 3.2 的自回归架构，在 100B 文本 + 60B 音频 token 上训练。

## 核心特点

- **ReasoningCodec**: 双分支离散音频编解码（reasoning tokens + reconstruction tokens），codebook 8192（推理分支 4096）
- **统一自回归架构**: 文本与音频共享同一 LLaMA 3.2 骨干，通过 mask token 处理模态混合序列
- **多阶段训练**: 预训练 → 多任务微调，支持 25+ 种任务格式
- **强零样本/少样本能力**: 跨语言、跨任务泛化表现优异

## 支持任务

| 领域 | 任务 |
|------|------|
| **语音** | TTS（英/中/粤）、Audio-Instructed TTS、InstructTTS、ASR、构音障碍语音识别、S2S Q&A、S2T Q&A |
| **声音** | 文本生成音效、音频字幕、音频问答 |
| **音乐** | 歌曲生成（英/中）、歌曲识别、文本生成音乐、音乐问答 |

## 架构细节

- **骨干**: LLaMA 3.2（文本 tokenizer 使用 llama3_2_tokenizer）
- **音频 tokenizer**: ReasoningCodec（推荐 8192 codebook 版本）
- **推理流程**: 
  - 理解任务（音频→文本）: 音频 → ReasoningCodec 编码为 reason/semantic tokens → 卸载 Codec → LLM 预测文本
  - 生成任务（文本→音频）: 文本 → LLM 预测 reason/semantic tokens → 卸载 LLM → ReasoningCodec 解码为 wav
- **训练数据**: 100B 文本 token + 60B 音频 token

## 与同类工具对比

| 维度 | UniAudio 2.0 | [[ai-game-devtools/academicodec]] | [[ai-game-devtools/cosyvoice]] |
|------|-------------|----------------------------------|-------------------------------|
| **定位** | 统一音频基础模型 | 高校开源音频 Codec 工具包 | 阿里 FunAudioLLM 语音合成 |
| **覆盖域** | 语音+声音+音乐 | 音频编解码训练框架 | 语音合成为主 |
| **架构** | LLaMA 3.2 + ReasoningCodec | EnCodec/SoundStream/HiFi-Codec | 自研 Flow Matching |
| **语言** | 英/中/粤 | 通用 | 中英为主 |
| **训练规模** | 160B tokens | 各模型独立训练 | 大规模中文语音 |
| **开源** | MIT | MIT | 开源 |

## 使用方式

所有任务通过 `multi_task_inference.py` 统一入口：

```bash
# ASR
python multi_task_inference.py --task ASR --audio sample.wav --prompt_text "Transcribe..."

# TTS（两阶段：LLM 生成 token → Codec 解码 wav）
python multi_task_inference.py --task TTS --text "Hello" --stage all

# 文本生成音乐
python multi_task_inference.py --task TTM --text "A classical waltz on glass harp."
```

Stage 选项：`all`（完整流程）/`1`（仅生成 token）/`2`（从已有 token 解码 wav）。

## 资源要求

- Python 3.10
- PyTorch 2.4.1
- transformers 4.57.0 + torchtune 0.4.0
- 需下载 HuggingFace checkpoint（`llm_ep2.checkpoint` 或 `llm_ep3.checkpoint` 推荐）
- fairseq 需从源码安装

## 相关链接

- GitHub: https://github.com/yangdongchao/UniAudio2
- 论文: https://arxiv.org/pdf/2602.04683
- Demo: https://dongchaoyang.top/UniAudio2Demo/
- Checkpoints: https://huggingface.co/Dongchao/UniAudio2_ckpt
- 关联项目（更好歌曲生成）: HeartMula

## 引用

```bibtex
@article{uniaudio2,
  title={UniAudio 2.0: A Unified Audio Language Model with Text-Aligned Factorized Audio Tokenization},
  author={Dongchao Yang, Yuanyuan Wang, Dading Chong, Songxiang Liu, Xixin Wu, Helen Meng},
  year={2026}
}
```
