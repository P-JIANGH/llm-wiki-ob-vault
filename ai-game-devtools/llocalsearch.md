---
title: LLocalSearch
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [tool, agent, llm, rag, search, open-source, go, svelte]
sources: [raw/articles/ai-game-devtools/llocalsearch.md]
---

# LLocalSearch

**LLocalSearch** is a fully local AI search agent that combines local Large Language Models with recursive web search capabilities. Developed by nilsherzig, it provides a privacy-respecting alternative to cloud-based AI search tools.

## Overview

| Attribute | Value |
|-----------|-------|
| **Repository** | https://github.com/nilsherzig/LLocalSearch |
| **License** | MIT |
| **Language** | Go (backend), TypeScript/Svelte (frontend) |
| **Status** | Archived (no development for 1+ year) |

## What It Does

LLocalSearch wraps locally-running LLMs (via [[ai-game-devtools/ollama|Ollama]]) and gives them access to web search tools. The agent can:

- Recursively search the internet for current information
- Use tools multiple times based on gathered data
- Provide live logs and source links for transparency
- Support follow-up questions in a conversational interface

## Architecture

### Backend (Go)
Built with Go 1.22 using a forked version of [[langchain|langchaingo]]:

| Component | Purpose |
|-----------|---------|
| `agentChain.go` | Agent orchestration and chain management |
| `apiServer.go` | HTTP API server |
| `llm_tools/` | Web search tool implementations |
| `lschains/` | Chain configurations |

### Frontend (SvelteKit)
- **Framework**: SvelteKit 2.0 + Vite
- **Styling**: TailwindCSS with dark/light mode
- **Features**: Mobile-responsive, real-time log streaming

### Infrastructure
- **LLM Runtime**: [[ai-game-devtools/ollama|Ollama]] for local inference
- **Vector DB**: ChromaDB for [[concepts/rag|RAG]] document storage
- **Deployment**: Docker Compose for easy self-hosting

## Key Features

- 🕵‍♀ **Privacy-first** — No API keys, all data stays local
- 💸 **Accessible hardware** — Runs on ~300€ GPUs
- 🤓 **Transparent** — Shows sources and reasoning steps
- 🤔 **Conversational** — Supports multi-turn follow-ups

## Philosophy

The project was created as a response to commercial AI search products that prioritize content from "preferred publishers" (big media houses paying for placement). LLocalSearch provides an unbiased, user-controlled search experience.

## Related Projects

- [[ai-game-devtools/llama-cpp]] — Alternative local LLM runtime
- [[ai-game-devtools/langchain]] — Original Python framework that inspired langchaingo
- [[ai-game-devtools/llama-index]] — Similar RAG-based document search framework
- [[ai-game-devtools/open-interpreter]] — Another local AI agent tool

## Notes

> The project is currently not under active development. The author is working on a rewrite in private beta.