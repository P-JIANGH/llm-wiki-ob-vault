# LLM Answer Engine — Source Summary

> Extracted from: https://github.com/developersdigest/llm-answer-engine
> Date: 2026-04-14

## Overview

Perplexity-Inspired LLM Answer Engine — a Next.js web application that returns sources, answers, images, videos, and follow-up questions based on user queries. Inspired by Perplexity's search engine paradigm.

## Tech Stack

- **Framework**: Next.js 14 (React, TypeScript)
- **Styling**: Tailwind CSS + Radix UI + Geist font
- **AI/Streaming**: Vercel AI SDK, Groq (Mixtral, Llama 3.1), OpenAI
- **RAG**: Langchain.JS (text splitting, embeddings), OpenAI Embeddings
- **Search**: Brave Search (web content/images), Serper API (videos/images)
- **Web Scraping**: Cheerio (HTML parsing), Turndown (HTML→Markdown)
- **Optional**: Ollama (local inference), Upstash Redis (rate limiting + semantic cache)
- **Optional**: Portkey AI Gateway (multi-provider: OpenAI/Azure/Gemini/Claude/Cohere/DeepInfra/Ollama)

## Architecture

```
Next.js App (app/)
├── app/page.tsx          # Main search UI
├── app/config.tsx        # All configuration (model, chunk size, search provider, etc.)
├── app/action.tsx        # Server Actions (search + LLM inference)
├── app/function-calling.tsx  # Function calling handlers (maps, shopping, stocks, Spotify)
├── app/tools/            # Tool integrations
├── lib/                  # Utilities
└── components/          # React UI components

Express API (express-api/)
└── Backend-only Node/Express version as alternative to Next.js
```

## Key Config Options

| Option | Default | Description |
|--------|---------|-------------|
| inferenceModel | llama-3.1-70b-versatile | Groq/Llama3 model |
| embeddingsModel | text-embedding-3-small | OpenAI embedding model |
| textChunkSize | 800 | Text chunk size for RAG |
| textChunkOverlap | 200 | Overlap between chunks |
| numberOfPagesToScan | 10 | Number of search results to process |
| searchProvider | serper | serper or google |
| useFunctionCalling | true | Enable function calling (beta) |
| useRateLimiting | false | Upstash rate limiting |
| useSemanticCache | false | Upstash semantic cache |
| usePortkey | false | Portkey AI Gateway |

## Features

- Streaming text responses with follow-up questions
- Function calling: Maps/Locations, Shopping, Stock Data, Spotify
- Diffusion image generation via @mention (Fal.AI SD3)
- Dark mode (system preference)
- Docker + Docker Compose deployment
- Express.js backend-only API alternative

## License

MIT License
