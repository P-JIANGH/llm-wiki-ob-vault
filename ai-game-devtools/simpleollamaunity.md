---
title: SimpleOllamaUnity
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [tool, ai, llm, csharp, unity]
sources: [raw/articles/ai-game-devtools/simpleollamaunity.md]
---

# SimpleOllamaUnity

C# Unity 包，通过 HTTP 包装 [Ollama](https://ollama.com/) REST API，为 Unity 游戏提供本地 LLM 推理能力。支持任何 Ollama 模型（qwen、llama、mistral 等），连接 `localhost:11434`。

## 概述

- **作者:** HardCodeDev777
- **License:** MIT
- **框架:** Unity 2022.3 LTS+
- **依赖:** Microsoft.Extensions.AI (捆绑 DLL)
- **仓库:** github.com/HardCodeDev777/SimpleOllamaUnity

## 核心组件

### OllamaBase (src/Scripts/Ollama.cs)

单一公共类，提供所有 LLM 交互接口：

| 方法 | 说明 |
|------|------|
| `SendMessage(OllamaRequest)` | 发送请求，返回完整 response，自动去除 <think>...</think> 标签 |
| `GetSingleResponse(string)` | 直接输出模型原始结果 |
| `GetAIMessage(OllamaRequest)` | 从 Ollama JSON 响应中提取 assistant content |
| `RemoveThinkTags(string)` | 去除 <think>...</think> chain |

### OllamaConfig

```csharp
new OllamaConfig(
    modelName: "qwen2.5:3b",       // Ollama 模型标识
    systemPrompt: "Your answer...",  // 系统提示词
    host: "http://localhost:11434"   // 默认为本机
)
```

### OllamaRequest / OllamaResponse

包装 Ollama `/api/chat` 和 `/api/generate` 端点的 JSON 载荷，支持 stream、temperature、top_p 等参数。

## 技术特点

- **轻量:** 核心代码 ~100 行，无外部资产依赖
- **异步 API:** 所有 LLM 调用为 `Task<string>`，适合 Unity 主线程
- **DI Ready:** 基于 Microsoft.Extensions.AI 抽象，可融入 Unity DOTS/DependencyInjection
- **Thinking 模型支持:** 内置 <think>...</think> 标签剥离逻辑，适用于 DeepSeek R1 等推理模型

## 使用示例

```csharp
var ollama = new OllamaBase(new OllamaConfig(
    modelName: "qwen2.5:3b",
    systemPrompt: "Your answer mustn't be more than 10 words"
));
var response = await ollama.SendMessage(new OllamaRequest(
    userPrompt: "When was GitHub created?"
));
Debug.Log(response);
```

## 游戏开发场景

- NPC 对话生成（本地推理，无云成本）
- 动态任务描述/剧情文本生成
- AI 驱动的游戏助手（GM bot）
- 运行时代码生成（参考 [[ai-game-devtools/unity-chatgpt]]）

## 相关项目

- [[ai-game-devtools/chatgpt-api-unity]] — Unity + OpenAI ChatGPT API 集成
- [[ai-game-devtools/chatgptforunity]] — Unity C# 调用 OpenAI GPT-3.5/4
- `llm` — LLM 通识页面
