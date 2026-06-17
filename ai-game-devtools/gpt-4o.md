---
title: GPT-4o
created: 2026-04-26
updated: 2026-04-26
type: entity
tags: [llm, multimodal, openai, vision, speech, game-dev, agent]
sources: [raw/articles/ai-game-devtools/gpt-4o.md]
---

# GPT-4o

**GPT-4o** ("o" for "omni") 是 OpenAI 于 2024 年 5 月 13 日发布的旗舰多模态大模型，能够在文本、音频、图像和视频之间进行实时推理和交互。

## Overview

GPT-4o 是一个端到端的统一多模态模型，接受任意组合的文本、音频、图像和视频作为输入，生成任意组合的文本、音频和图像作为输出。与之前的三模型级联管道（Whisper → GPT-4 → vocoder）不同，GPT-4o 用单一神经网络处理所有模态，保留了语调、背景音、笑声、歌唱和情感表达等此前丢失的信息。

## 关键能力

- **实时语音响应**：音频响应延迟低至 232ms，平均 320ms，与人类对话响应时间相当
- **端到端多模态训练**：文本、视觉、音频统一建模，无模态间信息损失
- **性能**：英文和代码能力与 GPT-4 Turbo 持平，非英文文本能力显著提升
- **成本**：API 速度更快，价格比 GPT-4 Turbo 低 50%
- **视觉与音频理解**：相比现有模型大幅提升

## 与旧版 Voice Mode 对比

| 指标 | GPT-3.5 Voice | GPT-4 Voice | GPT-4o |
|------|------------|----------|-------|
| 延迟 | 2.8 秒 | 5.4 秒 | 232-320ms |
| 架构 | 3 模型级联 | 3 模型级联 | 单一端到端 |
| 语调感知 | ❌ | ❌ | ✅ |
| 背景音 | ❌ | ❌ | ✅ |
| 笑声/歌唱 | ❌ | ❌ | ✅ |

## 游戏开发应用

GPT-4o 的实时语音交互能力为游戏 NPC 带来新的可能性：

- **NPC 对话系统**：毫秒级响应，支持情感表达和语气变化
- **语音控制游戏**：实时语音指令驱动游戏角色行为
- **多模态游戏助手**：语音+视觉+文本的混合交互
- **游戏 AI DM**：作为游戏主持人进行实时语音叙事

相关工具：[[llm-unity-integration]]（Unity LLM 集成）、[[interactive-llm-powered-npcs]]（实时对话 NPC）、[[chatgpt-api-unity]]（Unity ChatGPT 集成）

## 技术架构

- **单一端到端模型**：所有输入/输出由同一神经网络处理
- **跨模态注意力**：文本、音频、图像共享注意力机制
- **实时推理优化**：针对流式音频输出专门优化

## 相关链接

- [官方介绍](https://openai.com/index/hello-gpt-4o/)
- [ChatGPT 体验](https://chatgpt.com/)
- [API Playground](https://platform.openai.com/playground?mode=chat&model=gpt-4o)
