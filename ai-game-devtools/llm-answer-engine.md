---
title: LLM Answer Engine
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, ai, llm, agent, web-app, open-source]
sources: [raw/articles/ai-game-devtools/llm-answer-engine.md]
---

# LLM Answer Engine

Perplexity-Inspired answer engine that returns sources, answers, images, videos, and follow-up questions from user queries.

## Overview

A Next.js web application built by Developers Digest that combines web search + LLM inference to produce cited, multi-modal answers — similar to Perplexity Pro. Features streaming responses, function calling for real-time data (maps, shopping, stocks), and optional diffusion image generation via @mention.

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS, Radix UI, Geist font
- **AI Inference**: Vercel AI SDK, Groq (Mixtral/Llama 3.1), OpenAI GPT models
- **RAG Pipeline**: Langchain.JS (text splitting, chunking), OpenAI Embeddings
- **Search**: Brave Search (web + images), Serper API (video results)
- **Web Scraping**: Cheerio (HTML parsing), Turndown (HTML→Markdown)
- **Optional**: Ollama (local models), Upstash Redis (rate limiting + semantic cache), Portkey AI Gateway (multi-provider routing)

## Architecture

```
app/
├── page.tsx              # Main streaming search UI
├── action.tsx            # Server Actions — search + LLM inference
├── config.tsx           # All settings (model, chunk size, provider flags)
├── function-calling.tsx  # Function handlers (maps/shopping/stocks/Spotify)
├── tools/               # Tool integrations
├── hooks/               # React hooks
└── utils/               # Utilities

express-api/
└── Standalone Node/Express backend alternative
```

## Key Features

| Feature | Implementation |
|---------|---------------|
| Streaming answers | Vercel AI SDK + Groq Llama 3.1 70b |
| Cited sources | Brave Search → Cheerio scrape → Langchain chunking → OpenAI Embeddings |
| Follow-up questions | LLM inference with conversation history |
| Function calling | Maps (Serper), Shopping, TradingView stocks, Spotify |
| Image generation | Fal.AI SD3 via @mention in query |
| Rate limiting | Upstash Redis (optional) |
| Semantic cache | Upstash Vector (optional) |
| Multi-provider gateway | Portkey AI (OpenAI/Azure/Gemini/Claude/Cohere/Ollama) |

## Config

Config file: `app/config.tsx`

- `inferenceModel`: llama-3.1-70b-versatile (Groq default)
- `embeddingsModel`: text-embedding-3-small (OpenAI)
- `textChunkSize`: 800, `textChunkOverlap`: 200
- `numberOfPagesToScan`: 10
- `useOllamaInference`: false, `useOllamaEmbeddings`: false
- `useFunctionCalling`: true (beta)

## Deployment

- **Vercel**: One-click deploy (button in README)
- **Docker**: `docker compose up -d` with API keys in `docker-compose.yml`
- **Local**: `npm install && npm run dev`

## vs Perplexica

Perplexica is a similar open-source Perplexity clone. Both use web search + LLM inference, but [[llm-answer-engine]] adds function calling (maps/shopping/stocks), while [[perplexica]] focuses on AI-mode switching and more search providers.

## License

MIT

## Related

- [[agentgpt]] — another autonomous AI agent platform
- [[aios]] — AI operating system with LLM kernel
- [[chatdev]] — multi-agent development platform
