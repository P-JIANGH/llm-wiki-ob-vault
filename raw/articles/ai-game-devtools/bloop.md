# bloop — ChatGPT for Your Code

**Source:** https://github.com/BloopAI/bloop
**Mirror cloned from:** gitcode.com/BloopAI/bloop
**Date:** 2026-04-16

## Overview

bloop is ChatGPT for your code. Ask questions in natural language, search for code and generate patches using your existing codebase as context.

Engineers use bloop to:
- Explain how files or features work in simple language
- Write new features, using their code as context
- Understand how to use poorly documented open source libraries
- Pinpoint errors
- Ask questions about English language codebases in other languages
- Reduce code duplication by checking for existing functionality

## Features

- AI-based conversational search
- Code Studio: LLM playground that uses your code as context
- Blazing fast regex search
- Sync local and GitHub repositories
- Sophisticated query filters
- Symbol search (find functions, variables, traits)
- Precise code navigation (go-to-reference, go-to-definition) for 10+ languages via Tree-sitter
- Privacy-focused on-device embedding for semantic search

## Tech Stack

- **Backend:** Rust (server/bleep) — core search and navigation logic
- **Frontend:** React (client)
- **Desktop App:** Tauri (apps/desktop) — cross-platform desktop app
- **Search:** Tantivy (text search) + Qdrant (semantic/vector search)
- **Code Parsing:** Tree-sitter for multi-language AST analysis
- **Build:** Cargo workspace, Vite for frontend

## Architecture

```
apps/desktop:     Tauri desktop application
server/bleep:     Rust backend — search, navigation, AI agent logic
  ├── agent/      AI agent module (exchange, tools, prompts, model)
  ├── indexes/    Tantivy search indexes (file, reader, analytics)
  ├── semantic/   Qdrant-based semantic search with on-device embeddings
  ├── llm/        LLM client abstraction
  ├── query/      Query parser and stopwords
  ├── remotes/    GitHub integration
  └── webserver/  HTTP API and conversation endpoints
client:           React frontend (Vite)
```

### Agent Module (server/bleep/src/agent)

The AI agent operates in a step-based loop with max 10 steps:
- **Query:** Parse user input, extract keywords, trigger code search
- **Code Search:** Keyword-based search via Tantivy
- **Path Search:** Fuzzy file path matching
- **Proc Search:** Process specific files with targeted queries
- **Answer:** Synthesize results using LLM

Tools module: code.rs, path.rs, proc.rs, answer.rs

Conversation history is trimmed using tiktoken-based token counting to stay within model context limits.

## License

Apache 2.0

## Key Files

- `Cargo.toml` — Rust workspace (server/bleep + apps/desktop/src-tauri)
- `server/bleep/src/lib.rs` — Application initialization, global state (299 lines)
- `server/bleep/src/agent.rs` — AI agent step loop, tool orchestration (558 lines)
- `server/bleep/src/agent/tools/` — Individual tool implementations (code/path/proc/answer)
- `docker-compose.yml` — Docker deployment with Qdrant service
- `client/src/App.tsx` — React application entry

## Notes

- Uses ONNX for on-device semantic embeddings (privacy-focused)
- Metal feature flag conflicts with ONNX (compile-time error)
- Supports building from source with own OpenAI API key
- Git LFS used for expensive-to-build dependencies
- Conversation state stored in SQL for persistence across sessions
