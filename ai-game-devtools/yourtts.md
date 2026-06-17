---
title: YourTTS
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, open-source, ai-model, python, tool]
sources: [raw/articles/ai-game-devtools/yourtts.md]
---

# YourTTS

**YourTTS** 是 Edresson Casanova 等人提出的零样本多说话人文本到语音（TTS）与零样本语音转换（VC）模型，基于 VITS 架构扩展，论文发表于 ICML 2022。

## 概述

YourTTS 将多语言方法引入零样本多说话人 TTS 任务，在 VITS 基础上增加了零样本说话人适配和 multilingual 训练能力。它在 VCTK 数据集上达到了零样本多说话人 TTS 的 SOTA 结果，零样本语音转换结果也与 SOTA 相当。此外，YourTTS 在只有单说话人数据集的目标语言（低资源语言）上也展现出有前景的结果。

| 属性 | 详情 |
|------|------|
| **作者** | Edresson Casanova, Julian Weber 等 |
| **机构** | 巴西研究机构（UTFPR, CPQD 等）|
| **论文** | arXiv:2112.02418, ICML 2022 |
| **许可证** | CC BY-NC-ND 4.0（checkpoints）|
| **集成** | Coqui TTS（MPL 2.0）|

## 技术特点

- **基于 VITS**：端到端变分推断 + 对抗学习架构
- **零样本语音克隆**：仅需目标说话人的短音频片段（~10s）
- **多语言训练**：支持跨语言语音合成
- **低资源语言支持**：单说话人数据集即可适配新语言
- **快速微调**：<1 分钟目标说话人语音即可实现 SOTA 语音相似度
- **语音转换**：可将任意语音内容转换为目标说话人音色

## 架构

YourTTS 在 VITS 基础上增加了：
1. **Speaker Encoder** — 计算说话人嵌入向量，实现零样本适配
2. **Multilingual Training** — 跨语言共享表征学习
3. **Speaker Consistency Loss (SCL)** — 说话人一致性损失（原始论文有实现 bug，已在 Coqui TTS v0.12.0+ 修复）

## 使用方式

通过 Coqui TTS 直接使用预训练模型：

```bash
# 零样本 TTS
tts --text "Hello world" --model_name tts_models/multilingual/multi-dataset/your_tts \
    --speaker_wav target_speaker.wav --language_idx "en"

# 零样本语音转换
tts --model_name tts_models/multilingual/multi-dataset/your_tts \
    --speaker_wav target_speaker.wav --reference_wav source_content.wav --language_idx "en"
```

## 数据集

- **VCTK**：英语多说话人（训练/评估）
- **LibriTTS**：英语多说话人
- **MLS Portuguese**：葡萄牙语单说话人（跨语言验证）

## 游戏开发应用

- **NPC 语音生成**：用少量参考音频为角色生成独特语音
- **多语言本地化**：同一管线支持跨语言语音合成
- **动态语音变化**：实时语音转换改变 NPC 音色
- **低资源适配**：仅需少量音频即可适配新语言

## 与同类工具差异

- vs [[xtts]]：YourTTS 是 Coqui TTS 的早期多语言模型，XTTS v2 是其后续升级版本，支持更多语言和更高质量
- vs [[tortoise-tts]]：Tortoise 使用 GPT2+扩散两阶段生成，YourTTS 基于 VITS 端到端，推理更快
- vs [[bark]]：Bark 是完全生成式模型（可生成音乐/音效），YourTTS 专注于高质量语音克隆和转换
- vs [[style-tts-2]]：StyleTTS 2 强调风格控制和人类级质量，YourTTS 强调零样本多说话人和跨语言能力

## 相关项目

- [[xtts]] — Coqui TTS 后续升级模型（16 语言零样本克隆）
- [[ai-game-devtools/vits]] — YourTTS 的基础架构
- [[ai-game-devtools/coqui-tts]] — YourTTS 的集成框架
- [[tortoise-tts]] — 高质量多音色 TTS（已集成到 Coqui TTS）
- [[bark]] — Suno 的生成式 TTS（已集成到 Coqui TTS）

## 资源

- GitHub: https://github.com/Edresson/YourTTS
- 论文: https://arxiv.org/abs/2112.02418
- 音频样例: https://edresson.github.io/YourTTS/
- Coqui TTS 文档: https://tts.readthedocs.io/en/latest/
