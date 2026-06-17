# ChatGPT-API-unity

> Source: https://github.com/mochi-neko/ChatGPT-API-unity
> Captured: 2026-04-13

## README Summary

A Unity client library for the OpenAI ChatGPT chat completion API.

### Key Features
- **Chat Completion API**: Full support for OpenAI's `/v1/chat/completions` endpoint
- **Memory/Context Management**: Multiple `IChatMemory` implementations (queue-based, token-length based)
- **Streaming Responses**: `CompleteChatAsStreamAsync()` for token-by-token streaming
- **Function Calling**: First-class support for OpenAI function calling protocol
- **Resilient Mode**: `RelentChatCompletionAPIConnection` with retry/timeout/bulkhead via [Relent](https://github.com/mochi-neko/Relent)
- **Token Counting**: `TiktokenSharp` integration for local token length calculation
- **UniTask**: All async operations use Cysharp UniTask for Unity-compatible async/await

### Architecture
- Main package: `com.mochineko.chatgpt-api` (Assets/Mochineko/ChatGPT_API)
- Relent extension: `com.mochineko.chatgpt-api.relent`
- Tokenizer: `TiktokenSharp`

### Dependencies
- `com.cysharp.unitask` — Unity async/await
- `com.mochineko.relent` — resilient HTTP (retry/timeout/bulkhead)
- `com.unity.nuget.newtonsoft-json` — JSON serialization

### License
MIT License

## File Structure
```
Assets/Mochineko/
  ChatGPT_API/                    # Core API client
    ChatCompletionAPIConnection.cs
    ChatCompletionResponseBody.cs
    IChatMemory.cs
    FiniteQueueChatMemory.cs
    ...
  ChatGPT_API.Relent/             # Resilient extension
  ChatGPT_API.Samples/            # Usage samples
  ChatGPT_API.Tests/              # Unit tests
  TiktokenSharp/                  # Token counter
```
