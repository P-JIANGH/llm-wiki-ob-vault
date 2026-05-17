---
title: pi-ai
created: 2026-05-17
updated: 2026-05-17
type: entity
tags: [llm, api, provider, tool, open-source, typescript]
sources: [raw/articles/pi-mono-2026.md]
---

# pi-ai

> @earendil-works/pi-ai — 统一多 Provider LLM API
> Mario Zechner 开发，MIT license，~40K LOC，128 TypeScript 文件。
> 定位：Agent-first 的 LLM 抽象层，不是另一个 SDK，而是为 Agent 循环设计的统一 API。

## Overview

pi-ai 为 Agent 工具链提供 30+ LLM Provider 的统一抽象层。核心概念：

只包含**支持 tool calling 的模型**（agentic workflow 必需）。通过 `stream()` / `complete()` 两个统一的 API 掩盖所有 Provider 差异。

## 支持的 Provider (30+)

**主流:** OpenAI, Anthropic, Google, Mistral, DeepSeek, Groq, Cerebras, xAI, OpenRouter, Together, Fireworks

**国内:** MiniMax, Kimi (Moonshot), Xiaomi MiMo

**云:** Vertex AI (Gemini), Amazon Bedrock, Azure OpenAI

**Codex:** OpenAI Codex (OAuth), GitHub Copilot (OAuth), OpenCode Zen/Go, Kimi For Coding

**网关:** Cloudflare AI Gateway, Cloudflare Workers AI, Vercel AI Gateway

**兼容:** 任何 OpenAI 兼容 API (Ollama, vLLM, LM Studio 等)

## 核心 API

### 1. 模型发现

```typescript
import { getModel, getModels, getProviders } from '@earendil-works/pi-ai'

// 类型安全的模型获取
const model = getModel('openai', 'gpt-4o-mini')

// 模型元数据
model.id          // 'gpt-4o-mini'
model.provider    // 'openai'
model.api         // 'openai-responses'
model.reasoning   // true/false — 是否支持 thinking
model.input       // ['text', 'image'] — 支持的输入类型
model.output      // ['text'] — 支持的输出类型
model.cost        // { input: 0.15, output: 0.6 } — 每百万 token 价格
model.contextWindow // 128000
```

### 2. Stream / Complete

所有 Provider 统一的事件流：

```typescript
const s = stream(model, context, options)
// 事件: start → text_start/text_delta/text_end → toolcall_start/... → done/error
for await (const event of s) { /* handle */ }
const finalMessage = await s.result()

// 非流式版本
const response = await complete(model, context)
```

### 3. Context 序列化与跨 Provider Handoff

```typescript
const context: Context = {
  systemPrompt: 'You are helpful',
  messages: [...],
  tools: [...]
}

// 跨 provider handoff — 同一个 context 直接换模型
const model1 = getModel('openai', 'gpt-4o-mini')
const model2 = getModel('anthropic', 'claude-sonnet-4')
```

### 4. Thinking/Reasoning 统一接口

```typescript
// streamSimple 提供 Provider 无关的 thinking 接口
streamSimple(model, context, {
  reasoning: 'high'  // 统一参数，Provider 自行映射
})
```

## 架构

### Provider 注册模式

```typescript
// 惰性注册（不静态导入实现）
registerApiProvider({
  api: 'openai-responses',
  stream: (model, context, options) => EventStream,
  streamSimple: (model, context, options) => EventStream,
})
```

### API 注册表

`api-registry.ts` 维护一个 `Map<string, Provider>`。Provider 通过 `registerApiProvider()` 惰性加载（lazy wrapper，不静态导入实现模块）。这使得只加载使用的 Provider，编译产物更小。

### Provider 实现模式

每个 Provider 实现（如 `providers/openai-responses.ts`）必须：
1. 将原始 Provider API 转换为统一事件流
2. 支持 `stream()` 和 `streamSimple()` 两个入口
3. 发射标准化事件：`start → text_* / thinking_* / toolcall_* → done | error`
4. 处理 Authentication、Error、Abort、Context cache

### 图像模型

分离的 API 接口。不通过 `stream()`/`complete()`，而是通过 `generateImages()`：
- `getImageModel('openrouter', 'google/gemini-2.5-flash-image')`
- `generateImages(model, input, options)` — 一次调用返回图像

### OAuth Provider

一些 Provider（GitHub Copilot、OpenAI Codex）需要 OAuth。pi-ai 内置 OAuth 支持：
- `OAuthProvider` 接口
- PKCE 流程
- CLI 登录支持
- 凭证持久化

## Key Design Decisions

- **只包含支持 tool calling 的模型** — 减少 API 歧义
- **两个统一的 API 入口** — `stream()` + `complete()`，所有 Provider 使用相同的接口签名
- **Context 可序列化** — 支持跨 Provider handoff，不同模型轮次可以共享同一个 context
- **惰性 Provider 加载** — `register-builtins.ts` 用 lazy wrapper 注册 Provider，不静态导入实现
- **TypeBox 类型安全** — 工具参数使用 TypeBox schema 定义，编译时 + 运行时双重验证
- **图像和文本分离** — 图像生成不是 `stream()`/`complete()` 的特例，而是独立的 `generateImages()` API

## 对比

### vs 其他 LLM SDK

| 特性 | pi-ai | OpenAI SDK | Anthropic SDK | LangChain |
|------|-------|-----------|--------------|-----------|
| 统一接口 | ✓ stream/complete | ✗ | ✗ | ✓ (但复杂) |
| Agent-first | ✓ | ✗ | ✗ | ✓ |
| 工具调用原生 | ✓ | 需包装 | 需包装 | ✓ |
| 跨 Provider handoff | ✓ Context 序列化 | ✗ | ✗ | ✓ (但复杂) |
| 惰性加载 | ✓ | Node.js 原生 | Node.js 原生 | ✗ 全量导入 |
| Provider 数 | 30+ | 1 | 1 | 300+ |
| 浏览器支持 | ✓ | ✓ | ✗ | 部分 |
| 包大小 | 轻量 | 中等 | 中等 | 重量级 |

## Related

- [[pi-mono]] — 父 monorepo
- [[pi-agent-core]] — Agent 运行时依赖 pi-ai
- [[pi-coding-agent]] — 编码 Agent CLI 依赖 pi-ai
