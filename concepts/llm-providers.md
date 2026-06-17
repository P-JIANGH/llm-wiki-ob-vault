---
title: LLM Providers
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [llm, ai-chat, architecture]
sources: [local/FinceptTerminal/fincept-qt/src/ai_chat/LlmService.h]
---

# LLM Providers

## Overview

`LlmService` 支持多 LLM Provider，通过统一的 API 接口调用不同的模型。

## Supported Providers

| Provider | Streaming | API Key Required |
|----------|----------|-----------------|
| OpenAI | ✅ | Yes |
| Anthropic | ✅ | Yes |
| Gemini/Google | ✅ | Yes |
| Groq | ✅ | Yes |
| DeepSeek | ✅ | Yes |
| MiniMax | ✅ | Yes |
| OpenRouter | ✅ | Yes |
| Ollama | ✅ | No |
| Fincept | ✅ | No |

## Provider Helpers

```cpp
inline bool provider_supports_streaming(const QString& provider) {
    return provider == "openai" || provider == "anthropic" || provider == "gemini" ||
           provider == "google" || provider == "groq" || provider == "deepseek" ||
           provider == "openrouter" || provider == "minimax" || provider == "ollama" ||
           provider == "fincept";
}

inline bool provider_requires_api_key(const QString& provider) {
    return provider != "ollama" && provider != "fincept";
}
```

## Data Types

```cpp
struct ConversationMessage {
    QString role;    // "system", "user", "assistant"
    QString content;
};

struct LlmResponse {
    QString content;
    QString error;
    int prompt_tokens = 0;
    int completion_tokens = 0;
    int total_tokens = 0;
    bool success = false;
};

using StreamCallback = std::function<void(const QString& chunk_text, bool is_done)>;
```

## Streaming

通过 `QNetworkReply::readyRead` + SSE (Server-Sent Events) 解析实现流式输出。

## Related
- [[mcp-system]]
- [[fincept-terminal-architecture]]
