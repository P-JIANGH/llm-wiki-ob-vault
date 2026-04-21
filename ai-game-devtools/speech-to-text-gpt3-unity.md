---
title: speech-to-text-gpt3-unity
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, open-source, ai-model]
sources: [raw/articles/ai-game-devtools/speech-to-text-gpt3-unity.md]
---

# speech-to-text-gpt3-unity

## Overview
dr-iskandar 的 OpenAI Whisper + ChatGPT API Unity 集成原型项目。通过 Flask 中间件服务器桥接 Unity 游戏客户端与 OpenAI/ElevenLabs API，实现语音识别（STT）→ LLM 对话 → 语音合成（TTS）的完整语音交互管线。

## 技术架构
- **后端：** Python Flask + Gunicorn WSGI 服务器
- **STT：** OpenAI Whisper（README 提及，代码中未完整实现）
- **LLM：** OpenAI ChatGPT API（README 提及）
- **TTS：** ElevenLabs API（app.py 中完整实现，Adam 音色 voice ID: pNInz6obpgDQGcFmaJgB）
- **客户端：** Unity（通过 HTTP 请求与 Flask 后端通信）

## 关键端点
| 端点 | 功能 |
|------|------|
| `GET /` | 健康检查 |
| `GET /testing` | 测试端点 |
| `GET /tts` | ElevenLabs TTS 文本转语音，返回 audio/mpeg |

## 特点与局限
- **极简原型：** 仅 33 行 Flask 代码，3 个 commit，早期实验阶段
- **安全问题：** app.py 中硬编码了 ElevenLabs API Key，不适合生产使用
- **不完整：** README 提到的 Whisper STT 和 GPT-3 集成代码未在仓库中完整呈现
- **MIT 许可证：** 可自由使用和修改

## 与同类工具对比
- 相比 [[ai-game-devtools/llm-unity-integration]] 的完整架构指南（本地 llama.cpp/云 API/混合三种部署方案），本项目仅为单一 Flask 中间件原型
- 与 [[ai-game-devtools/simpleollamaunity]]（本地 Ollama HTTP 包装器）类似都是轻量级 Unity+LLM 桥接方案，但本项目依赖云端 API（OpenAI + ElevenLabs）
- 与 [[ai-game-devtools/chatgpt-api-unity]]（纯 C# Unity 客户端，支持 Function Calling/Streaming）相比，本项目使用外部 Python 服务器而非 Unity 原生集成

## 相关链接
- GitHub: https://github.com/dr-iskandar/speech-to-text-gpt3-unity
- License: MIT
