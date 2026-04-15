# fabric — AI Augmentation Framework

> Source: https://github.com/danielmiessler/fabric
> Cloned: 2026-04-15
> License: MIT

## What is fabric?

**fabric** is an open-source framework for augmenting humans using AI, written in Go. Created by Daniel Miessler. The core philosophy: *"AI doesn't have a capabilities problem—it has an integration problem."* Fabric addresses this by organizing AI's fundamental units—prompts themselves—into reusable, composable units called **Patterns**.

## Key Facts

| Field | Value |
|-------|-------|
| Language | Go |
| License | MIT |
| Primary Contributor | Daniel Miessler |
| Architecture | CLI tool + REST API server + plugin system |
| Config Dir | `~/.config/fabric/` |
| Patterns Dir | `~/.config/fabric/patterns/` |

## Philosophy

> AI isn't a thing; it's a _magnifier_ of a thing. And that thing is **human creativity**.

Fabric breaks problems into individual components and applies AI to them one at a time. The biggest challenge in modern AI is not capability but **the sheer number of prompts**—discovering good ones, knowing if they are quality, and managing versions. Fabric solves this by providing a centralized pattern management system.

## Architecture

### Core Components

- **`cmd/fabric/main.go`** — CLI entry point
- **`internal/plugins/`** — Plugin system for AI providers
  - `ai/` — Vendor integrations (OpenAI, Anthropic, Gemini, Ollama, Azure, Bedrock, Vertex, Perplexity, etc.)
  - `template/` — Template extension system (text, file, fetch, datetime, sys)
  - `strategy/` — Strategy selection for model routing
  - `db/` — Database layer (fsdb filesystem-based storage)
- **`internal/server/`** — REST API server
- **`patterns/`** — User-managed prompt patterns (in `~/.config/fabric/patterns/`, not in repo)
- **`web/`** — Web UI (Svelte-based)

### Supported AI Providers

**Native:** OpenAI, OpenAI Codex, Anthropic (Claude), Google Gemini, Ollama, Azure OpenAI, Amazon Bedrock, Vertex AI, LM Studio, Perplexity

**OpenAI-Compatible:** Abacus, AIML, Cerebras, DeepSeek, DigitalOcean, GitHub Models, GrokAI, Groq, Langdock, LiteLLM, MiniMax, Mistral, Novita AI, OpenRouter, SiliconCloud, Together, Venice AI, Z AI

## Patterns (Prompts)

Patterns are fabric's core abstraction. They cover domains including:
- Video/podcast content extraction
- Essay writing in user's own voice
- Academic paper summarization
- AI art prompt generation from text
- Content quality rating
- Code explanation
- Documentation conversion
- Social media post generation
- YouTube transcript extraction

Users can create custom patterns stored in `~/.config/fabric/patterns/`. Each pattern is a markdown file with frontmatter defining variables, model preferences, and the prompt itself.

## Features

- **CLI tool**: `fabric -p <pattern>` to run patterns
- **REST API server**: `fabric --serve` with Swagger/OpenAPI docs
- **Ollama compatibility mode**
- **Internationalization**: Full i18n for 10 languages
- **Speech-to-text**: `fabric --transcribe-file`
- **Docker support**: Pre-built images on Docker Hub and GHCR
- **Helper apps**: `to_pdf`, `code2context`, `generate_changelog`
- **Web UI**: Svelte-based fabric web app
- **Pattern aliases**: Can add shell aliases for all patterns

## Recent Updates (2025-2026)

- OpenAI Codex plugin (Mar 2026)
- Azure AI Gateway plugin with Bedrock/Azure/Gemini support (Feb 2026)
- Microsoft 365 Copilot integration (Jan 2026)
- Claude Opus 4.5 support (Nov 2025)
- GitHub Models support (Nov 2025)
- Venice AI privacy-first provider support (Aug 2025)
- Speech-to-text via OpenAI (Aug 2025)
- Linux ARM and Windows ARM binary releases (Aug 2025)
- Full internationalization (Dec 2025)

## Installation

```bash
# One-line install (Unix/Linux/macOS)
curl -fsSL https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.sh | bash

# Windows PowerShell
iwr -useb https://raw.githubusercontent.com/danielmiessler/fabric/main/scripts/installer/install.ps1 | iex

# From source (requires Go)
go install github.com/danielmiessler/fabric/cmd/fabric@latest

# Docker
docker run --rm -it kayvan/fabric:latest -p summarize
```

## Helper Applications

### to_pdf
Converts markdown/content to PDF using a dedicated microservice approach.

### code2context
Extracts code context from repositories for AI consumption.

### generate_changelog
Automatically generates changelogs from git history.

## REST API Server

```bash
# Run server
fabric --serve

# With Docker
docker run --rm -it -p 8080:8080 -v $HOME/.fabric-config:/home/appuser/.config/fabric kayvan/fabric:latest --serve
```

Swagger UI available at `/swagger/index.html`.

## Compared to Similar Tools

| Tool | Language | Focus | License |
|------|----------|-------|---------|
| fabric | Go | Prompt pattern management + AI augmentation | MIT |
| LangChain | Python | LLM application framework | MIT |
| AutoGPT | Python | Autonomous AI agents | MIT |
| MetaGPT | Python | Multi-agent software development | MIT |
| ChatDev | Python | Virtual software company | MIT |
