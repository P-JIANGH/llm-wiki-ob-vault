---
title: EmotiVoice — 网易有道开源多音色情感 TTS 引擎
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, open-source, tool, audio, python]
sources: [raw/articles/ai-game-devtools/emotivoice.md]
---

# EmotiVoice 😊 — 多音色 Prompt 控制 TTS 引擎

## 概述
EmotiVoice（易魔声）是网易有道开源的文本转语音引擎，支持中英文，提供 2000+ 音色，核心特色是**情感合成**——通过文本 Prompt 控制语音的情感（开心、兴奋、悲伤、愤怒等）。基于 **PromptTTS** 论文 + **JETS** 联合训练架构，Apache 2.0 许可。

- **GitHub**: [netease-youdao/EmotiVoice](https://github.com/netease-youdao/EmotiVoice)
- **版本**: 0.2.0
- **许可证**: Apache 2.0
- **依赖**: PyTorch 2.1+, simbert-base-chinese, HiFi-GAN
- **语言**: 中文 + 英文混合输入

## 架构

### 核心管线
1. **文本前端** — 中英混合 G2P（jieba + g2p_en + pypinyin），cn2an 数字归一化，语言感知的 `engsp4`/`cn_eng_sp` 分隔符
2. **风格编码器** — 基于 Simbert（simbert-base-chinese），从 Prompt 文本提取风格向量（情感/风格/内容）
3. **声学模型（PromptTTS）** — Transformer Encoder-Decoder 架构 + 时长预测器（MAS）+ 音高/能量方差预测器 + 高斯上采样对齐
4. **声码器（HiFi-GAN）** — 梅尔频谱图 → 波形音频
5. **JETS 联合训练** — 声学模型与声码器联合优化

### 推理格式
`<speaker>|<style_prompt/emotion/content>|<phoneme>|<content>`

### 关键模块
```
models/prompt_tts_modified/  # JETS Generator + PromptTTS + Simbert 风格编码
models/hifigan/              # HiFi-GAN 声码器
frontend.py                  # 中英混合 G2P 管线
inference_tts.py             # 批量推理脚本
openaiapi.py                 # OpenAI 兼容 TTS API
demo_page.py                 # Streamlit Web 演示
```

## 功能特点

| 特性 | 说明 |
|------|------|
| 2000+ 音色 | 预训练模型覆盖多说话人 |
| 情感控制 | Prompt 文本控制开心/兴奋/悲伤/愤怒等情感 |
| 中英混合 | 自动识别语言切换，正确插入分隔符 |
| 声音克隆 | 支持个人数据微调（DataBaker/LJSpeech 配方） |
| Docker 部署 | `syq163/emoti-voice:latest` 一键运行 |
| OpenAI API 兼容 | `localhost:8000` 提供标准 TTS API |
| Mac 桌面应用 | 原生 arm64 macOS 应用 |
| HTTP API | 网易智元提供免费 API（13000+ 次调用额度） |

## 与同类工具差异

- 相比 [[chat-tts]]：EmotiVoice 侧重情感控制 + 2000+ 音色，ChatTTS 侧重口语化自然表达
- 相比 [[dex-tts]]：EmotiVoice 用 PromptTTS 风格编码，DEX-TTS 用扩散模型 + 参考语音风格迁移
- 相比 [[bert-vits2]]：EmotiVoice 是 JETS 联合训练架构，Bert-VITS2 是 VITS 架构；EmotiVoice 侧重情感 Prompt，Bert-VITS2 侧重音色克隆
- 相比 [[cosyvoice]]：两者都支持情感 TTS，CosyVoice 是阿里通义实验室出品，EmotiVoice 是网易有道出品
