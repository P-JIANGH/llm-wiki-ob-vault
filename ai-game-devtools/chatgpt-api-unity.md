---
title: ChatGPT-API-unity
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, unity, tool, game-engine, open-source]
sources: [raw/articles/ai-game-devtools/chatgpt-api-unity.md]
aliases: ["ChatGPTAPIUnity"]

---

# ChatGPT-API-unity

Unity 平台的 OpenAI ChatGPT API 客户端库，由 mochi-neko 开发。

## 概述

通过 Unity Package Manager 导入，为 Unity 项目提供 ChatGPT chat completion API 的完整接入能力。相比其他 Unity LLM 集成方案，此库专注于 chat completion 场景，提供完善的 memory 管理、streaming、function calling 和 resilient 错误处理。

## 核心模块

| 模块 | 路径 | 说明 |
|------|------|------|
| `ChatGPT_API` | `Assets/Mochineko/ChatGPT_API/` | 核心 API 客户端 |
| `ChatGPT_API.Relent` | `Assets/Mochineko/ChatGPT_API.Relent/` | 带重试/超时/熔断的 resilient 版本 |
| `ChatGPT_API.Samples` | `Assets/Mochineko/ChatGPT_API.Samples/` | 使用示例 |
| `TiktokenSharp` | `Assets/Mochineko/TiktokenSharp/` | 本地 token 计数 |

## 技术特点

### Memory 管理
实现了 `IChatMemory` 接口，提供多种 memory 策略：
- `FiniteQueueChatMemory` — 基于消息数量的队列
- `FiniteQueueWithFixedPromptsChatMemory` — 系统消息固定，用户/助手消息有上限
- `FiniteTokenLengthQueueChatMemory` — 基于 token 总长度
- `FiniteTokenLengthQueueWithFixedPromptsChatMemory` — token 长度 + 固定系统提示

### Resilient HTTP
通过集成 [Relent](https://github.com/mochi-neko/Relent) 库，实现：
- 自动重试（指数退避）
- 超时控制
- 熔断器（bulkhead pattern）

### Streaming
支持 `CompleteChatAsStreamAsync()`，逐 token 接收响应，适用于打字机效果。

### Function Calling
完整支持 OpenAI function calling 协议，可定义 JSON schema 并在请求中指定函数。

## 与同类工具差异

| 特性 | ChatGPT-API-unity | [[ai-command]] | [[unity-openai]] |
|------|-------------------|----------------|-----------------|
| Memory 管理 | ✅ 多策略 IChatMemory | ❌ | ❌ |
| Streaming | ✅ | ❌ | ❌ |
| Function Calling | ✅ | ❌ | ❌ |
| Resilient 扩展 | ✅ Relent | ❌ | ❌ |
| UniTask 异步 | ✅ | ❌ | ❌ |

[[ai-command]] 是 Unity Editor 内直接对话的 PoC；此库是生产级 API 客户端，支持 session memory 和完整 API 特性。

## 许可证

MIT License

## 相关链接

- GitHub: https://github.com/mochi-neko/ChatGPT-API-unity
- Relent: https://github.com/mochi-neko/Relent
- UniTask: https://github.com/Cysharp/UniTask
