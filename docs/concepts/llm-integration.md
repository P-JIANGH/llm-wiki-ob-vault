---
title: LLM Integration
created: 2026-04-08
updated: 2026-04-08
type: concept
tags: [ai, llm, api, architecture, multi-provider]
sources: [raw/articles/microverse-ksanadock-2026.md]
---

# LLM Integration

## Overview
Microverse 通过 APIManager + APIConfig 实现多 LLM Provider 的统一接入。所有角色可以独立选择不同的模型（Stephen 用 Claude，Jack 用 DeepSeek）。Provider 配置在 `script/ai/APIConfig.gd` 中集中管理。

## Provider 总览

| Provider | URL | Format | Models |
|----------|-----|--------|--------|
| **Ollama** | `localhost:11434/api/generate` | ollama | qwen2.5:1.5b, llama3.2:1b, llama3.2:3b, gemma2:2b |
| **OpenAI** | `api.openai.com/v1/chat/completions` | openai | gpt-4o-mini, gpt-4o, gpt-3.5-turbo |
| **DeepSeek** | `api.deepseek.com/v1/chat/completions` | openai | deepseek-chat |
| **豆包** | `ark.cn-beijing.volces.com/api/v3/chat/completions` | openai | doubao-lite-4k/32k/128k, doubao-pro-4k/32k/128k |
| **Gemini** | `generativelanguage.googleapis.com/v1beta/models/{model}:generateContent` | gemini | gemini-1.5-flash, gemini-1.5-pro, gemini-1.0-pro |
| **Claude** | `api.anthropic.com/v1/messages` | claude | claude-3-5-sonnet, claude-3-5-haiku, claude-3-opus |
| **KIMI** | `api.moonshot.cn/v1/chat/completions` | openai | moonshot-v1-8k, moonshot-v1-32k, moonshot-v1-128k |
| **SiliconFlow** | `api.siliconflow.cn/v1/chat/completions` | openai | deepseek-ai/DeepSeek-V3.1, inclusionAI/Ring-1T, zai-org/GLM-4.6 |
| **OpenAI Compatible** | (custom URL) | openai | (user-specified) |

## 请求格式（Request Formats）

### ollama
```json
{
    "model": "llama3.2:3b",
    "prompt": "...",
    "stream": false
}
```

### openai (通用)
```json
{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "..."}]
}
```

### gemini
```json
{
    "contents": [{
        "parts": [{"text": "..."}]
    }]
}
```

### claude
```json
{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "..."}]
}
```
Header 额外需要: `anthropic-version: 2023-06-01`

## 响应解析（Response Parsers）

| Parser | 路径 |
|--------|------|
| ollama | `response` |
| openai | `choices[0].message.content` |
| gemini | `candidates[0].content.parts[0].text` |
| claude | `content[0].text` |

## APIConfig 核心类

```gdscript
class_name APIConfig

class APIProvider:
    var name: String
    var display_name: String
    var url: String
    var models: Array[String]
    var requires_api_key: bool
    var headers_template: Dictionary
    var request_format: String   # "ollama" | "openai" | "gemini" | "claude"
    var response_parser: String   # "ollama" | "openai" | "gemini" | "claude"
```

### 静态初始化模式
```gdscript
static var _providers: Dictionary = {}
static var _initialized: bool = false

static func _initialize():
    if _initialized: return
    _providers["Ollama"] = APIProvider.new(...)
    _providers["DeepSeek"] = APIProvider.new(...)
    # ... 8 providers
    _initialized = true
```

## APIManager 使用方式

```gdscript
# 构建请求（自动适配格式）
var request_data = APIConfig.build_request_data(
    api_type,   # "DeepSeek" | "Claude" | ...
    model,       # "gpt-4o-mini" | "deepseek-chat" | ...
    prompt       # 完整的 Prompt 字符串
)

# 构建请求头（自动注入 API Key）
var headers = APIConfig.build_headers(api_type, api_key)
# → ["Content-Type: application/json", "Authorization: Bearer sk-..."]

# 解析响应
var text = APIConfig.parse_response(api_type, response_dict, character_name)
```

## 多角色多 Provider 配置示例

```gdscript
# Stephen 用 Claude（写作/情感对话强）
character_ai_config["Stephen"] = {
    "api_type": "Claude",
    "model": "claude-3-5-sonnet-20241022",
    "temperature": 0.8
}

# Jack 用 DeepSeek（代码/逻辑推理强）
character_ai_config["Jack"] = {
    "api_type": "DeepSeek",
    "model": "deepseek-chat",
    "temperature": 0.7
}

# 本地测试用 Ollama（零成本）
character_ai_config["TestBot"] = {
    "api_type": "Ollama",
    "model": "llama3.2:3b",
    "temperature": 0.9
}
```

## 设计亮点

1. **格式抽象** — 4 种 request_format vs 4 种 response_parser，9 个 Provider 共用
2. **Header 模板** — API Key 占位符 `{api_key}` 在运行时替换，无需硬编码
3. **每角色独立配置** — Stephen 可以用 Claude，Jack 可以用 DeepSeek，互不影响
4. **本地 + 云端混合** — Ollama 本地调试不花钱，切换云端 Provider 无代码改动

## 相关
[multi-agent-ai-simulation](#/concepts/multi-agent-ai-simulation) — LLM 是对话能力的核心
[persistent-memory-system](#/concepts/persistent-memory-system) — 记忆为 LLM 提供上下文
[multi-agent-ai-game-impl](#/concepts/multi-agent-ai-game-impl) — AIAgent 调用 APIManager 的完整流程
[microverse-dialog-system](#/concepts/microverse-dialog-system) — ConversationManager 如何构造 Prompt
