---
title: openai-tool-calling
created: 2026-04-13
updated: 2026-04-13
type: concept
tags: [openai, tool-calling, function-calling, llm, api]
sources: [raw/articles/hermes-agent-source-2026.md]
---

# OpenAI Tool Calling Protocol

OpenAI 的 tool calling（函数调用）协议让 LLM 返回结构化的工具调用而非自由文本。hermes-agent 围绕这个协议构建了完整的 Agent 系统。

## 协议格式

```json
{
  "role": "assistant",
  "tool_calls": [
    {
      "id": "call_abc123",
      "type": "function",
      "function": {
        "name": "web_search",
        "arguments": "{\"query\": \"latest AI news\"}"
      }
    }
  ]
}
```

## 工具结果格式

```json
{
  "role": "tool",
  "tool_call_id": "call_abc123",
  "content": "{\"result\": \"...\"}"
}
```

## hermes-agent 的工具调用解析

各 Provider 对 tool_calls 的返回格式不同：

| Provider | 格式 | Parser |
|----------|------|--------|
| OpenAI/DeepSeek | `response.tool_calls`（对象列表） | 默认 |
| Qwen | `response.tool_calls` 或 content 内嵌 `<tool_call>` | `qwen_parser.py` |
| Claude | `content_block.tool_use` | `anthropic_adapter.py` |
| Gemini | `function_calls` | 各自适配 |

**Fallback 解析器**：当 `response.tool_calls` 为空但 content 包含 `<tool_call>` XML 标签时，用 standalone hermes_parser 提取。

## 工具参数类型强制

LLM 经常返回字符串形式的数字/布尔值：

```python
# LLM 返回
{"path": "/home/user"}        # 正常
{"timeout": "30"}              # 字符串而非整数！
{"recursive": "true"}          # 字符串而非布尔值！

# coerce_tool_args 对照 JSON Schema 强制转换
{"timeout": 30, "recursive": True}
```

## 工具对完整性

每次 tool_call 必须有匹配的 tool_result（相同 `tool_call_id`）。压缩后需要修复孤儿对。

## Related

[[hermes-agent]] [[agent-loop-architecture]] [[tool-registry-pattern]]
