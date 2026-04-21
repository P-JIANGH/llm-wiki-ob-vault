---
title: VoiceCraft
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, audio, speech, open-source]
sources: [raw/articles/ai-game-devtools/voicecraft.md]
---

# VoiceCraft

**VoiceCraft** 是由 Puyuan Peng 等人（UT Austin / Meta）开发的 token infilling 神经编解码语言模型，在语音编辑（speech editing）和零样本语音合成（zero-shot TTS）上达到 SOTA。arXiv: 2403.16973（2024 年 3 月）。

## 核心能力

- **零样本 TTS：** 仅需几秒参考音频即可克隆未知声音，适用于有声书、网络视频、播客等野外数据
- **语音编辑：** 在不影响周围内容的情况下，修改/替换现有音频中的特定词语或片段
- **智能转录：** 只需输入需要生成的文本，模型自动处理上下文衔接
- **长文本 TTS：** 分段处理模式，支持任意长度文本合成

## 技术架构

| 维度 | 详情 |
|------|------|
| 核心架构 | Token infilling 神经编解码语言模型 |
| 音频编码器 | 自定义 Encodec（56M 参数，4 codebook，2048 code/本） |
| Codec 采样率 | 50Hz（16kHz 音频 × 320 倍降采样） |
| 令牌排列 | DelayedPatternProvider（来自 Meta audiocraft），交错 codebook 进行自回归生成 |
| 模型规格 | giga330M / giga830M 及 TTS Enhanced 变体 |
| Transformer | 标准编码器 + 正弦位置嵌入 + LayerNorm + 多头注意力 |
| 推理策略 | top-k/top-p 过滤 + 温度采样 + 可选 KV cache + MFA 束搜索对齐 |
| 训练数据 | Gigaspeech + RealEdit + LibriLight |

## 部署方式

1. **Google Colab** — 语音编辑 / TTS 笔记本，无需本地环境
2. **Docker** — 完整环境（基于 Jupyter），支持 Linux/Windows
3. **本地安装** — conda 环境（Python 3.9 + PyTorch 2.0.1 + CUDA 11.7）
4. **HuggingFace Spaces** — 在线 Web 演示
5. **Replicate** — 云端 API 服务
6. **命令行** — `tts_demo.py` / `speech_editing_demo.py` 独立脚本

## 许可证

- 代码：CC BY-NC-SA 4.0（非商业共享）
- 模型权重：Coqui Public Model License 1.0.0
- 部分借用代码：MIT / Apache 2.0 / GNU 3.0

## 与同类工具差异

与 [[ai-game-devtools/gpt-sovits]]（VITS 架构、需要微调）不同，VoiceCraft 采用纯自回归编解码 LM 范式，零样本即可合成，无需训练特定说话人。与 [[ai-game-devtools/tortoise-tts]]（自回归 + 扩散混合）相比，VoiceCraft 在野外数据上表现更好，支持语音编辑功能。与 [[ai-game-devtools/bert-vits2]]（需要参考音频微调）相比，VoiceCraft 仅需几秒参考即可克隆声音，但推理速度较慢。与 [[ai-game-devtools/audioldm-2]]（扩散模型，侧重音效生成）不同，VoiceCraft 专注于人声 TTS 和编辑。与 [[ai-game-devtools/cosyvoice]] 等 Flow Matching 方案不同，VoiceCraft 使用离散的 token infilling 方法。

## 链接

- GitHub: https://github.com/jasonppy/VoiceCraft
- arXiv: https://arxiv.org/abs/2403.16973
- HuggingFace 模型: https://huggingface.co/pyp1/VoiceCraft
- HuggingFace Spaces: https://huggingface.co/spaces/pyp1/VoiceCraft_gradio
- Colab: https://colab.research.google.com/drive/1IOjpglQyMTO2C3Y94LD9FY0Ocn-RJRg6
- 音频示例: https://jasonppy.github.io/VoiceCraft_web/
