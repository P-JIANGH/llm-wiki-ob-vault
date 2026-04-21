---
title: ZMM-TTS
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [speech, audio, tool, python, open-source]
sources: [raw/articles/ai-game-devtools/zmm-tts.md]
---

# ZMM-TTS

**Zero-shot Multilingual and Multispeaker Speech Synthesis** — 基于自监督离散语音表示的多语言多说话人 TTS 框架，由日本国立情报学研究所 (NII) Yamagishi 实验室开发。

## 核心特性

- **零样本说话人克隆**：仅需一段参考音频即可合成未见说话人的语音
- **多语言支持**：英语、法语、德语、葡萄牙语、西班牙语、瑞典语（6种高资源语言）
- **低资源语言泛化**：在零训练数据的新语言上也能合成可理解的语音
- **多模态文本表示**：支持 [[xphonebert|XPhoneBERT]] 音素、字符级、IPA 三种输入方式

## 技术架构

三阶段级联管线：

```
文本 → [txt2vec] → 离散语音表示 → [vec2mel] → Mel谱图 → [vec2wav + HifiGAN] → 波形
```

| 阶段 | 模型 | 功能 | 训练时间 |
|------|------|------|----------|
| txt2vec | CompTransTTS Transformer | 文本 → 离散码 | ~3天 (A100) |
| vec2mel | 定制模型 | 离散码 → Mel谱图 | ~3天 (A100) |
| vec2wav | MSMC-TTS 架构 | Mel → 波形 | ~3天 (A100) |
| Vocoder | [[hifigan|HifiGAN]] | 波形精修 | ~3天 (A100) |

### 预训练模型

项目利用三种大规模自监督模型提取表示：

- **[[xlsr-53|XLSR-53]]** (Facebook) — 53语言音频表示，56K小时训练
- **ECAPA-TDNN** (SpeechBrain) — 说话人嵌入提取
- **[[xphonebert|XPhoneBERT]]** (VinAI) — 94语言文本音素表示

## 训练数据 MM6

作者基于公开数据集构建的多语言平衡数据集：

| 语言 | 说话人 | 句子数 | 时长 |
|------|--------|--------|------|
| 英语 | 40 (20F/20M) | 8000 | 27.8h |
| 法语 | 40 | 8000 | 27.8h |
| 德语 | 40 | 8000 | 27.8h |
| 葡萄牙语 | 36 | 7916 | 27.5h |
| 西班牙语 | 40 | 7305 | 25.3h |
| 瑞典语 | 20M | 4000 | 13.9h |

总计约 **150K 句子 / 83 小时**，基于 MLS + NST Swedish 构建。

## 与同类工具的差异

| 维度 | ZMM-TTS | [[tortoise-tts|TorToiSe]] | [[cosyvoice|CosyVoice]] |
|------|---------|---------------------------|------------------------|
| 架构 | 三阶段级联 (txt2vec→vec2mel→vec2wav) | 自回归 Transformer + 扩散解码器 | 语言模型 + 流匹配 |
| 多语言 | ✅ 6种语言零样本 | ❌ 主要英语 | ✅ 多语言 |
| 自监督表示 | ✅ XLSR-53 + XPhoneBERT | ❌ 自有量化器 | ❌ |
| 开源许可 | BSD-3-Clause / MIT | Apache 2.0 | Apache 2.0 |
| 训练数据 | MM6 (自建83h) | 私人数据集 | 18万小时 |

ZMM-TTS 的独特贡献在于**首次将文本自监督模型 (XPhoneBERT) 和语音自监督模型 (XLSR-53) 同时引入多语言 TTS**，通过离散化表示实现跨语言说话人迁移。

## 使用场景

- 游戏 NPC 多语言语音生成（同一角色跨语言保持音色一致）
- 低资源语言语音合成快速原型
- 学术研究：自监督表示在 TTS 中的有效性验证

## 相关链接

- GitHub: https://github.com/nii-yamagishilab/ZMM-TTS
- 论文: https://arxiv.org/abs/2312.14398
- Demo: https://gongchenghhu.github.io/TASLP-demo/
- 预训练模型: Google Drive (项目 README 中提供)
