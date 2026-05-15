---
title: LLMUnity (LLM for Unity)
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, tool, game-engine, unity, rag, open-source]
sources: [raw/articles/ai-game-devtools/llmunity.md]
---

# LLMUnity (LLM for Unity)

[Undream AI](https://undream.ai) 出品的 Unity LLM 集成插件（v3.0.3），将大语言模型直接嵌入 Unity 游戏引擎，支持 PC/移动端/VR 全平台运行。

## Overview

LLM for Unity 让开发者无需网络请求即可在游戏内创建 AI NPC 对话系统。基于自研的 `LlamaLib`（封装 llama.cpp 的 C++/C# 库），支持 GGUF 格式模型本地加载，并内置 RAG 语义检索模块。

## Key Capabilities

| Capability | Detail |
|---|---|
| **Platform** | PC, Mobile (iOS/Android), VR |
| **Inference** | CPU + GPU（Nvidia/AMD/Apple Metal） |
| **Privacy** | 完全本地运行，数据不离开游戏 |
| **Remote Mode** | 支持远程 Server 部署 |
| **Model Format** | GGUF（所有主流 LLM） |
| **RAG** | Embeddings + ANN 近似最近邻搜索（usearch） |
| **Integration** | 单行代码调用 |
| **Cost** | 个人/商业均免费 |

## Architecture

- `Runtime/LLM.cs` — 核心 LLM 组件（模型加载 + 推理）
- `Runtime/LLMAgent.cs` — AI 角色组件（对话、系统提示词、聊天历史）
- `Runtime/RAG/` — 语义检索模块（chunks + embeddings + DBSearch）
- `Runtime/LlamaLib/` — llama.cpp C++/C# 绑定层
- `Runtime/LLMManager.cs` — 模型管理器（下载/加载 GGUF）
- `Runtime/LLMEmbedder.cs` — Embedding 生成
- Unity Package Manager（UPM）原生支持

## Core API

```csharp
using LLMUnity;

// 获取回复（完整）
string reply = await llmAgent.Chat("Hello bot!");

// 流式处理回复
_ = llmAgent.Chat("Hello bot!", HandleReply, ReplyCompleted);

// Embeddings（用于 RAG）
List<float> embeddings = await llmAgent.Embeddings("hi, how are you?");

// RAG 检索
(string[] results, float[] distances) = await rag.Search("hello!", 2);
```

## RAG System

基于 LLM Embeddings + [usearch](https://github.com/unum-cloud/usearch) 实现近似最近邻检索：
- 支持 SimpleSearch（暴力匹配）和 DBSearch（ANN）
- Chunking 策略：按 token / word / sentence 分块
- 支持分组检索（不同角色/场景独立索引）
- 可序列化保存/加载 RAG 状态

## Sample Scenes

1. **SimpleInteraction** — 基础 AI 对话
2. **MultipleCharacters** — 多 AI 角色
3. **FunctionCalling** — 结构化输出（Grammar 约束）
4. **RAG** — 语义检索 + RAG-LLM 集成示例
5. **MobileDemo** — 移动端带下载进度条
6. **ChatBot** — 即时通讯 UI 风格
7. **KnowledgeBaseGame** — 侦探游戏知识库示例

## License

Apache 2.0（主仓库），第三方组件 MIT/Apache。内置模型各有其 license。

## Related

- [[chatgpt-api-unity]] — Unity ChatGPT API 另一种集成方案（依赖 OpenAI API）
- [[interactml-unity]] — Unity 交互式机器学习插件（非 LLM，基于 kNN/MLP/DTW）
- [[iml-ue4]] — InteractML 的 Unreal Engine 4/5 版本
