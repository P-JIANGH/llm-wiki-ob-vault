---
title: UnityAIWithChatGPT
created: 2026-04-22
updated: 2026-04-22
type: entity
tags: [unity, tool, llm, ai, open-source]
sources: [raw/articles/ai-game-devtools/unityaiwithchatgpt.md]
---

# UnityAIWithChatGPT

基于 Unity 的 ChatGPT + UnityChan 语音交互演示项目。通过 OpenAI API 实现自然语言对话，配合 RTVoice 语音合成和 LipSync 唇形同步，打造可交互的虚拟角色。

## 功能概述

- **ChatGPT 对话**：通过 `UnityWebRequest` 调用 OpenAI `gpt-3.5-turbo` API
- **流式输出**：支持 SSE 流式响应，实时显示 AI 回复
- **语音合成**：集成 RTVoice 插件将文本转为语音
- **唇形同步**：LipSync 插件根据音频驱动 UnityChan 面部动画
- **对话 UI**：简单的对话框系统显示聊天内容

## 技术架构

| 组件 | 技术 |
|------|------|
| LLM 接入 | OpenAI Chat Completions API (gpt-3.5-turbo) |
| HTTP 客户端 | UnityWebRequest (异步 Task) |
| JSON 序列化 | Unity JsonUtility |
| 语音合成 | Crosstales RTVoice |
| 唇形动画 | LipSync (实时音频分析) |
| 角色模型 | UnityChan (官方免费素材) |

## 核心代码

`ChatGpt.cs` 提供四种调用模式：
- `ChatStream()` — 流式多轮对话
- `SingleAskStream()` — 流式单轮问答
- `SingleAsk()` — 非流式单轮问答
- `Chat()` — 非流式多轮对话

`ChatGptDemo.cs` 为 MonoBehaviour 演示脚本，连接 UI InputField、DialogBox、SpeechText 和 AudioSource。

## 与同类工具对比

- vs [[chatgptforunity]] — 两者均为 Unity ChatGPT 集成，但 UnityAIWithChatGPT 额外包含 RTVoice TTS + LipSync 唇形同步 + UnityChan 角色，是完整的语音交互方案
- vs [[unity-chatgpt]] — dilmerv 的项目侧重代码生成，本项目侧重角色对话和语音输出
- vs [[llmunity]] — LLMUnity 支持本地模型部署，本项目仅支持云端 OpenAI API

## 相关链接

- GitHub: https://github.com/haili1234/UnityAIWithChatGPT
