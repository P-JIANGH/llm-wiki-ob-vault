---
title: Applio — 高质量语音转换工具
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, audio, open-source, game-dev, python, voice-conversion]
sources: [raw/articles/ai-game-devtools/applio.md]
---

# Applio — 高质量语音转换工具

**GitHub:** https://github.com/IAHispano/Applio
**官网:** https://applio.org
**文档:** https://docs.applio.org
**许可:** MIT
**状态:** 稳定期（仅安全补丁/依赖更新/少量功能改进）

## 概述

Applio 是一个简单、高质量的语音转换（Voice Conversion, VC）工具，专注于易用性和性能。由 IA Hispano 团队开发，提供 Gradio Web 界面，支持一键式推理、训练、TTS 管线和实时变声。适合艺术家、开发者和研究人员进行高质量声音变换。

## 功能特点

- **语音推理** — 单音频/批量音频转换，支持多种 F0 提取算法（crepe, torchcrepe, mangio-crepe, rmvpe 等）
- **TTS 管线** — 内置 edge-tts 文本转语音 → 直接接入 RVC 变声，实现文本→目标音色的完整链路
- **语音混合** — 多个声音模型权重混合（model blender）
- **训练管线** — 数据集预处理 → 特征提取 → 模型训练 → TensorBoard 监控
- **实时变声** — 低延迟实时语音转换
- **后处理效果** — 混响、移调、限制器、增益、失真、合唱、位深降低、削波、压缩、延迟等
- **Formant 偏移** — 共振峰调整（qfrency/timbre 参数），改变音色而不影响音高
- **插件系统** — 可扩展的插件架构（见 Applio-Plugins 仓库）
- **多平台部署** — Docker、Google Colab（UI/NoUI 两个版本）、本地安装脚本

## 技术架构

| 组件 | 说明 |
|------|------|
| 前端 | Gradio 6.x Web UI |
| 后端 | Python，RVC（Retrieval-based Voice Conversion）推理管线 |
| 深度学习 | PyTorch 2.7.1 (CUDA 12.8 / macOS MPS) |
| 音频处理 | librosa, soundfile, ffmpeg-python, pedalboard, soxr |
| 特征检索 | FAISS CPU 1.13.2（TopK 检索防止音色泄漏） |
| 训练监控 | TensorBoard + tensorboardX |
| TTS | edge-tts 7.2.8（微软 Azure TTS 免费接口） |
| 模型编码器 | torchcrepe, torchfcpe（F0 提取） |

### 核心模块结构

```
applio/
├── core.py          # 管线编排（推理/批量/TTS/预处理/提取/训练）
├── app.py           # Gradio Web 应用入口
├── rvc/
│   ├── infer/       # VoiceConverter 类（主推理引擎）
│   ├── train/       # 训练管线（preprocess → extract → train）
│   ├── models/      # RVC 模型定义
│   ├── configs/     # 配置管理
│   ├── lib/         # 工具库（模型下载/音频分析/TTS）
│   └── realtime/    # 实时变声管线
└── tabs/            # Gradio UI 标签页（11 个功能模块）
```

## 与同类工具对比

- vs [[retrieval-based-voice-conversion-webui]]：Applio 是 RVC 的现代化封装，提供更完善的 UI、插件系统和一站式 TTS 管线。RVC 更偏底层框架。
- vs [[so-vits-svc]]：so-vits-svc 侧重歌唱语音转换（SVC），使用 VITS 声码器；Applio 侧重通用语音转换，使用 RVC 架构。两者都支持 FAISS 检索防音色泄漏。
- vs [[diffsinger]]：DiffSinger 专注歌唱合成（MIDI 控制），Applio 专注语音到语音的音色转换。

## 游戏开发应用

- **NPC 声音多样化** — 用少量演员声音通过 VC 生成大量不同音色的 NPC 对话
- **实时语音聊天** — 游戏内玩家实时变声
- **TTS + VC 管线** — 文本→语音→目标音色，快速生成游戏对话内容
- **角色声音定制** — 训练特定角色声音模型，用于游戏中的语音生成

## 相关链接

- [官网](https://applio.org)
- [文档](https://docs.applio.org)
- [Discord](https://discord.gg/urxFjYmYYh)
- [插件仓库](https://github.com/IAHispano/Applio-Plugins)
- [HuggingFace 编译版本](https://huggingface.co/IAHispano/Applio/tree/main/Compiled)
- [Google Colab UI](https://colab.research.google.com/github/iahispano/applio/blob/main/assets/Applio.ipynb)
