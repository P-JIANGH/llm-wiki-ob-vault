---
title: TTS Generation WebUI
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, audio, open-source, python, gradio]
sources: [raw/articles/ai-game-devtools/tts-generation-webui.md]
---

# TTS Generation WebUI

## Overview

TTS WebUI 是一个全合一的文本转语音 Web 界面，由 rsxdalv 开发维护，将 20+ 种 TTS 模型和音频工具整合到统一的 Gradio + React UI 中。支持本地部署和 Docker，提供 OpenAI 兼容的 TTS API 接口。

## 功能

- **20+ TTS 模型内置支持**：Bark、Tortoise、Maha TTS、MMS、Vall-E X、StyleTTS2、SeamlessM4T、Kokoro TTS 等
- **音乐生成**：MusicGen、MAGNeT、Stable Audio
- **音频转换工具**：RVC 语音转换、Demucs 音源分离、Whisper 语音识别、Resemble Enhance 音频增强
- **扩展系统**：Python 包形式的扩展，内置市场支持在线安装和更新
- **多前端**：Gradio UI（端口 7770）+ React/Next.js UI（端口 3000）
- **OpenAI 兼容 API**：端口 7778 提供 `/v1/audio/speech` 接口

## 技术架构

| 组件 | 技术 |
|------|------|
| 后端 | Python (Flask/FastAPI), PyTorch 2.11.0 + CUDA 128 |
| 前端 | Gradio 5.x + React/Next.js 16.2.1 |
| 扩展 | pip 安装的 Python 包，JSON 格式配置 |
| 数据库 | SQLite（音频文件元数据管理） |
| 部署 | Docker（NVIDIA Container Toolkit GPU 支持） |
| 环境 | Conda + venv 混合管理 |

## 集成

- **Silly Tavern**：通过 OpenAI TTS API 扩展接入
- **Text Generation WebUI (oobabooga)**：专用 text-to-tts-webui 扩展
- **OpenWebUI**：通过 OpenAI API 扩展接入
- 任何 OpenAI 兼容客户端均可使用

## 许可证

- 代码库：MIT
- 模型权重：各模型不同（Bark=MIT, MusicGen=CC BY-NC 4.0）
- 已知非宽松依赖：encodec (CC BY-NC 4.0), lameenc (GPL), unidecode (GPL)

## 相关链接

- GitHub: https://github.com/rsxdalv/tts-generation-webui
- Discord: https://discord.gg/V8BKTVRtJ9
- 扩展目录: https://rsxdalv.github.io/tts-webui-extension-catalog/
- Google Colab: 支持在线运行

## 相关工具

- [[retrieval-based-voice-conversion-webui]] — RVC 语音转换，作为 TTS WebUI 的子工具集成
- [[musicgen]] — Meta 音乐生成模型，作为 TTS WebUI 的音频生成模块
- [[openvoice]] — MyShell 声音克隆，作为 TTS WebUI 扩展可用
- [[cosyvoice]] — 阿里通义 CosyVoice TTS，作为 TTS WebUI 扩展可用
