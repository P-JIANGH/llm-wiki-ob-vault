# LLMUnity (LLM for Unity)

> Source: https://github.com/undreamai/LLMUnity
> Captured: 2026-04-14

## Overview

LLM for Unity enables seamless integration of Large Language Models (LLMs) within the Unity engine. Allows creating intelligent AI characters that players can interact with, plus a RAG system for semantic search.

Backend by [LlamaLib](https://github.com/undreamai/LlamaLib) (C++/C# library on top of llama.cpp).

## Key Features

- Runs anywhere: PC, mobile, VR
- CPU and GPU inference (Nvidia, AMD, Apple Metal)
- Fully local — no internet required, data never leaves the game
- Remote server setup supported
- Supports all major LLM models via GGUF format
- Built-in RAG system with ANN search (usearch)
- Single-line code integration
- Free for personal and commercial use

## Architecture

- `Runtime/LLM.cs` — Core LLM component (model loading, inference)
- `Runtime/LLMAgent.cs` — AI character agent (chat, system prompt, history)
- `Runtime/RAG/` — Semantic search with embeddings + approximate nearest neighbors
- `Runtime/LlamaLib/` — C++/C# llama.cpp bindings
- `Runtime/LLMManager.cs` — Model manager (download, load GGUF files)
- `Runtime/LLMEmbedder.cs` — Embedding computation
- Unity Package Manager compatible (UPM)

## Samples Included

1. SimpleInteraction — Basic AI character chat
2. MultipleCharacters — Multi-agent chat
3. FunctionCalling — Structured output via grammar
4. RAG — Semantic search + RAG-LLM integration
5. MobileDemo — Android/iOS with download progress
6. ChatBot — Messaging UI style
7. KnowledgeBaseGame — Detective game with knowledge base

## License

Apache 2.0 (code), third-party components with MIT/Apache licenses.

## Games Using LLMUnity

- Verbal Verdict (Steam)
- I, Chatbot: AISYLUM (Epic)
- Nameless Souls of the Void
- Murder in Aisle 4
- Case Closed (Steam)
- Digital Humans (Steam)
- And 15+ more on Steam/itch.io

## package.json

```json
{
  "name": "ai.undream.llm",
  "version": "3.0.3",
  "displayName": "LLM for Unity",
  "unity": "2022.3",
  "dependencies": {
    "com.unity.nuget.newtonsoft-json": "3.0.2"
  }
}
```

## Quick Usage

```csharp
using LLMUnity;

public class MyScript {
  public LLMAgent llmAgent;

  async void GameAsync() {
    string reply = await llmAgent.Chat("Hello bot!");
    Debug.Log(reply);
  }
}
```
