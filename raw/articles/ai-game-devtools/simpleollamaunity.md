# SimpleOllamaUnity — Raw Source

**URL:** https://github.com/HardCodeDev777/SimpleOllamaUnity
**Cloned:** 2026-04-15
**License:** MIT

## Overview

A lightweight Unity package (C#) that wraps the [Ollama](https://ollama.com/) REST API for local LLM inference. Designed to give Unity game developers an easy async interface to any Ollama-supported model (qwen, llama, mistral, etc.) at localhost:11434.

## Key Components

### Core Class: `OllamaBase` (src/Scripts/Ollama.cs)
- Constructor accepts `OllamaConfig` (modelName, systemPrompt, host)
- `SendMessage(OllamaRequest)` → `Task<string>` — full response with <think>...</think> stripped
- `GetSingleResponse(string)` → `Task<string>` — direct model output, strips <think>/</think>
- `GetAIMessage(OllamaRequest)` → extracts assistant content only fromollama's JSON response
- `RemoveThinkTags(string)` → strips <think>...</think> chain from response strings

### Config: `OllamaConfig`
- `modelName`: Ollama model identifier (e.g. "qwen2.5:3b")
- `systemPrompt`: system-level instruction injected into every request
- `host`: Ollama server address (default: "http://localhost:11434")

### Request/Response: `OllamaRequest` / `OllamaResponse`
- Wraps JSON payloads for `/api/chat` and `/api/generate` endpoints
- Fields: model, prompt, system, stream, options (temperature, top_p, etc.)

## Dependencies
- Unity 2022.3 LTS or higher
- `Microsoft.Extensions.AI` and related DI packages (bundled in src/Plugins/AIExtensions/)
- Ollama running locally (or remote host if configured)

## Example Usage
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

## Architecture

Single-file design (~100 lines) with no external assets beyond the bundled Microsoft.Extensions.AI DLLs. The `OllamaBase` class is the sole public API surface. All Ollama API calls use HTTP POST to the `/api/chat` endpoint with JSON serialization/deserialization.

## Project Structure
```
SimpleOllamaUnity/
├── Demo/              # Example scene
├── src/
│   ├── Scripts/
│   │   └── Ollama.cs  # Core API wrapper
│   └── Plugins/AIExtensions/  # Microsoft DI + AI abstractions (DLLs)
├── README.md
└── LICENSE (MIT)
```
