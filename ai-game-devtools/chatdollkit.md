---
title: ChatdollKit — Unity 3D 虚拟语音对话助手 SDK
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [tool, open-source, ai, llm, multimodal, agent, audio, avatar, animation]
sources: [raw/articles/ai-game-devtools/chatdollkit.md]
---

# ChatdollKit

Unity 3D 虚拟助手 SDK，可将任意 3D 模型转化为支持语音对话的 AI 虚拟角色（AI Avatar / AITuber）。

## 概览

- **GitHub:** https://github.com/uezo/ChatdollKit
- **作者:** @uezo (Unagiken)
- **版本:** 0.8.16
- **许可:** MIT
- **语言:** C# (Unity)
- **平台:** Windows / Mac / Linux / iOS / Android / WebGL / VR / AR

## 核心功能

### LLM 集成（生成式 AI 原生）

支持多种 LLM 后端，通过抽象 `LLMService` 基类实现无缝切换：
- **ChatGPT** (OpenAI API) + OpenAI 兼容端点（Gemini、Grok 等）
- **Claude** (Anthropic)
- **Gemini Pro** (Google)
- **Dify** (可视化 LLM 应用平台)
- 支持 **Function Calling**、**多模态**（视觉/图片输入）、**Chain of Thought 推理**

### 语音对话管线

完整的 STT → LLM → TTS → 3D 模型驱动管线：
- **STT (语音识别):** OpenAI Whisper、Azure Speech（支持流式）、Silero VAD（ML 语音活动检测）、组合 VAD（噪声抗性）、回声消除
- **TTS (语音合成):** OpenAI TTS、Azure TTS、VOICEVOX（日语，支持动态风格切换）、AivisSpeech、Style-Bert-VITS2、NijiVoice
- **Barge-in 打断:** AI 说话中用户可插话，自动取消当前输出并切换到新输入

### 3D 模型驱动

- **表情控制:** 通过 `[face:ExpressionName]` 标签让 LLM 自主控制 VRM 表情
- **动画/手势控制:** 通过 `[anim:AnimationName]` 标签驱动 Animator Controller 动画
- **口型同步:** 集成 uLipSync，语音与口型自动同步
- **眨眼:** 自动眨眼行为
- **VRM 运行时加载:** 支持运行时无缝切换 3D 模型

### 对话管理

- **唤醒词/取消词/打断词/忽略词** 检测
- **长期记忆:** 支持 ChatMemory、mem0、Zep 等外部记忆服务
- **用户自定义标签:** `[light:on]` 等标签触发开发者定义的动作
- **连续请求合并:** 快速说话自动合并为单一请求
- **时间戳注入:** 定时注入当前时间，使角色具备时间感知
- **多角色对话:** 多个 AI 虚拟角色互相聊天（Multi-AITuber）

## 技术架构

### 核心组件

| 组件 | 职责 | LOC |
|------|------|-----|
| `ModelController` | 中央虚拟角色控制器（动画/语音/表情/眨眼/口型同步） | 464 |
| `ModelRequestBroker` | 异步队列处理器，按句子边界拆分 LLM 响应 | 193 |
| `SpeechController` | TTS 合成管理 | — |
| `FaceController` | 面部表情控制 | — |
| `DialogProcessor` | 完整对话管线编排（STT→LLM→TTS→动画） | — |
| `AIAvatarVRM` Prefab | 预制体，开箱即用的 AI 虚拟角色 | — |

### 关键设计模式

- **标签驱动控制:** LLM 响应中嵌入 `[face:]`、`[anim:]`、`[pause:]` 等标签，由内容解析器提取并驱动对应行为
- **异步队列处理:** `ModelRequestBroker` 使用 UniTask 异步循环 + CancellationToken 实现非阻塞语音/动画管线
- **句子分割:** 按 `。！？,.!` 边界分割 LLM 响应，实现增量 TTS + 渐进式动画
- **模块化 LLM 服务:** 抽象基类 + 多 Provider 实现，切换模型无需修改客户端代码
- **双层 VAD:** ML-based (Silero) + 能量-based 组合，提升噪声环境下的语音检测准确性

### 依赖

- Unity（非 SRP 模板 — UniVRM 不支持 SRP）
- Burst（Unity Package Manager）
- UniTask v2.5.4
- uLipSync v3.1.0
- UniVRM v0.127.2
- JSON.NET (Newtonsoft.Json)

## 与同类工具的差异

| 维度 | ChatdollKit | [[ai-game-devtools/unity-chatgpt]] | [[ai-game-devtools/interactive-llm-powered-npcs]] |
|------|------------|-----------------------------------|-------------------------------------------------|
| 定位 | Unity AI Avatar 完整 SDK | Unity ChatGPT API 客户端 | 游戏内 NPC 实时对话叠加层 |
| STT/TTS | 多种 Provider 可切换 | 无（纯 LLM 文本） | DeepFace + Edge-TTS + SadTalker |
| 3D 驱动 | 表情+动画+口型+眨眼 | 纯代码生成 | 像素叠加层 + 唇形动画 |
| 平台 | Unity 全平台 + WebGL | Unity 编辑器 | 任意游戏（无需源码） |
| 对话管理 | 唤醒词/记忆/打断/多角色 | 简单 session 管理 | 面部识别 + ChromaDB 上下文 |

## 应用场景

- **AITuber / 虚拟主播:** AI 驱动的虚拟 YouTuber，支持直播互动
- **VR/AR 虚拟助手:** 沉浸式虚拟角色交互
- **WebGL 网页助手:** 浏览器内 3D 对话角色
- **游戏 NPC:** 支持 LLM 驱动的智能 NPC 对话
- **教育/客服:** 可定制外观的 AI 虚拟客服

## 相关链接

- Live Demo (WebGL): https://unagiken.blob.core.windows.net/chatdollkit/ChatdollKitDemoWebGL/index.html
- iOS App (OshaberiAI): https://apps.apple.com/us/app/oshaberiai/id6446883638
- YouTube 教程: https://www.youtube.com/watch?v=rRtm18QSJtc
