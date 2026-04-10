---
title: provider-registry
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [llm, architecture, agent]
sources: [raw/articles/nanobot-readme-2026.md]
---

# Provider Registry

一种插拔式（pluggable）LLM Provider 架构模式，通过单一数据结构（`ProviderSpec` 元组）集中定义所有 Provider 元数据，告别 if-elif 链。

## 核心思想

传统方式：
```python
# 糟糕：每加一个 provider 改一次代码
if provider == "openai": ...
elif provider == "anthropic": ...
elif provider == "deepseek": ...
```

Registry 方式：
```python
# 好：只需添加一个 ProviderSpec 数据类实例
PROVIDERS: tuple[ProviderSpec, ...] = (
    ProviderSpec(name="openai", backend="openai_compat", ...),
    ProviderSpec(name="anthropic", backend="anthropic", ...),
    ...
)
```

## nanobot 的实现

位于 `nanobot/providers/registry.py`。

### ProviderSpec 字段

```python
@dataclass(frozen=True)
class ProviderSpec:
    name: str              # 配置字段名（e.g. "dashscope"）
    keywords: tuple[str]    # 模型名关键字匹配（e.g. ("qwen", "dashscope")）
    env_key: str            # API key 环境变量（e.g. "DASHSCOPE_API_KEY"）
    backend: str            # 实现后端：openai_compat | anthropic | azure_openai | openai_codex | github_copilot
    display_name: str       # status 显示名
    env_extras: tuple[...]  # 额外环境变量（如 ZHIPUAI_API_KEY）
    is_gateway: bool       # 是否为网关（路由任意模型，如 OpenRouter）
    is_local: bool         # 是否为本地部署（vLLM/Ollama）
    detect_by_key_prefix: str  # api_key 前缀匹配（e.g. "sk-or-" → OpenRouter）
    detect_by_base_keyword: str # api_base URL 关键字匹配
    default_api_base: str   # OpenAI-compatible 默认端点
    strip_model_prefix: bool # 是否去掉 "provider/model" 中的 provider 前缀
    supports_max_completion_tokens: bool
    supports_prompt_caching: bool  # Anthropic prompt caching
    model_overrides: tuple[...]   # 特定模型的参数覆盖（如 Kimi K2.5 强制 temperature=1.0）
```

### 优先级与检测顺序

`PROVIDERS` 元组顺序 = 匹配优先级：
1. `custom`（direct，最宽泛）
2. `azure_openai`（direct）
3. **网关类**（`openrouter`/`aihubmix`/`siliconflow`/`volcengine`/`byteplus`）— 按 api_key 前缀或 api_base 关键字检测
4. **标准 Provider**（`anthropic`/`openai`/`deepseek`/`gemini`/...）— 按模型名关键字检测
5. **本地部署**（`vllm`/`ollama`/`ovms`）
6. **辅助类**（`groq`/`qianfan`）

### 添加新 Provider（2步）

```
Step 1: nanobot/providers/registry.py — PROVIDERS 元组添加 ProviderSpec
Step 2: nanobot/config/schema.py — ProvidersConfig 添加字段
```

完成后：环境变量、配置匹配、status 显示均自动派生，无需额外代码。

## 相关概念

- [[nanobot]] — provider-registry 的具体实现
- [[agent-loop]] — 使用 Provider 的调用方
- [[openclaw]] — nanobot 的设计灵感（同样采用 Registry 模式）
