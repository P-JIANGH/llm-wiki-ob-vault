---
title: DEX-TTS — Diffusion-based EXpressive Text-to-Speech
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [speech, tts, diffusion, transformer, open-source, tool, audio]
sources: [raw/articles/ai-game-devtools/dex-tts.md]
---

# DEX-TTS — Diffusion-based EXpressive Text-to-Speech

## Overview
DEX-TTS 是基于扩散模型（Diffusion Model）的富有表现力文本转语音系统，通过参考语音建模时间变化的说话风格。包含两个变体：**DEX-TTS**（需要参考语音进行风格迁移）和 **GeDEX-TTS**（无需参考语音，直接从文本生成富有表现力的语音）。

- **GitHub**: [winddori2002/DEX-TTS](https://github.com/winddori2002/DEX-TTS)
- **论文**: arXiv 2406.19135
- **演示**: [tts-demo](https://tts-demo.github.io/demo.github.io/)
- **许可证**: MIT
- **作者**: Hyun Joon Park, Jin Sob Kim, Wooseok Shin, Sung Won Han

## 架构

### 核心管线
1. **文本编码器** — 基于 Microsoft RetNet 架构，O(1) 推理复杂度（vs 标准注意力 O(n²)）
2. **风格编码器** — 分离时间变化风格（TV Encoder + LF0 音高编码）和时间不变特征（TIV Encoder）
3. **时长预测器** — FastSpeech2 式单调对齐搜索（MAS）实现文本到语音的时长建模
4. **扩散解码器** — DiTMask（带掩码的 Diffusion Transformer）+ UNet 跳跃连接，EDM 预条件化
5. **声码器** — HiFi-GAN / BigVGAN 将梅尔频谱图转换为波形

### 关键技术
| 组件 | 技术 |
|------|------|
| 文本编码 | RetNet（多尺度保留机制） |
| 扩散框架 | EDM（Elucidated Diffusion Model）预条件 + Euler 采样器 |
| 去噪器 | DiTMask（adaLN-Zero 条件化 + 随机 token 掩码） |
| 风格建模 | TV（时间变化）+ TIV（时间不变）+ LF0（音高）三分解 |
| 对齐 | Monotonic Alignment Search（MAS） |
| 声码器 | HiFi-GAN / BigVGAN |

## 游戏开发应用
- **NPC 对话** — 高质量富有表现力的 NPC 语音生成，支持情感/风格迁移
- **GeDEX-TTS** — 无需参考音频即可生成多样化的角色语音
- **风格一致性** — 同一角色在不同对话中保持一致的语音特征
- **MIT 许可** — 完全开源，可用于商业游戏项目

## 项目状态
- ✅ GeDEX-TTS 预训练权重可用
- ⏳ DEX-TTS 预训练权重待发布
- ⏳ 多 GPU 训练代码待实现
- ⏳ LibriTTS 预处理流程待完善

## 相关文件
- [[ai-game-devtools/bert-vits2]] — 另一款开源 TTS 系统（VITS2 + 多语言 BERT）
- [[ai-game-devtools/chat-tts]] — 对话式 TTS 工具
- [[ai-game-devtools/fish-speech]] — 语音合成工具，Bert-VITS2 的后继项目
