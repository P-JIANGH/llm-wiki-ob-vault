# Flowise — AI Flowise Wiki Source

> Extracted from: https://github.com/FlowiseAI/Flowise (gitcode mirror)
> Date: 2026-04-13

## Project Overview

**Flowise** is an open-source visual drag-and-drop platform for building LLM-powered applications. It allows developers to create AI agents, RAG pipelines, and custom workflows through a low-code UI without writing code.

## Key Facts

- **License:** Apache License 2.0
- **Language:** TypeScript/JavaScript (Node.js)
- **UI Framework:** React
- **Mono repo structure:** pnpm workspaces
- **Version (server):** 3.1.1

## Architecture

Flowise is a mono repository with 5 packages:

### `packages/server`
Node.js Express backend that serves API logic. Handles:
- LLM chain orchestration
- API endpoints for flows
- Persistence (TypeORM + database)
- Authentication & credentials management
- CLI entry point via `oclif`

### `packages/ui`
React frontend. Provides the visual drag-and-drop canvas for building AI flows.

### `packages/components`
Third-party node integrations (LangChain nodes, tool connectors, vector stores, etc.). Contains:
- `nodes/` — individual component nodes
- `credentials/` — credential management for external APIs
- `evaluation/` — evaluation harness

### `packages/agentflow`
Pre-built flow templates / agent workflows.

### `packages/api-documentation`
Auto-generated Swagger UI API docs from Express routes.

## Tech Stack

- **Runtime:** Node.js >= 18.15.0
- **Package Manager:** PNPM
- **ORM:** TypeORM
- **CLI Framework:** OCLIF
- **Build:** TypeScript + Gulp
- **LLM Backend:** LangChain.js (underlying framework)

## Features

- Drag-and-drop LLM app builder
- Pre-built templates (AgentFlow)
- RAG (Retrieval-Augmented Generation) pipeline support
- Multi-LLM support (OpenAI, Anthropic, local models)
- Vector store integrations (Pinecone, Milvus, etc.)
- Tool integrations (web search, API calls, etc.)
- Credential management for API keys
- Docker deployment support
- Cloud hosted option (FlowiseAI Cloud)
- Self-host on AWS, Azure, GCP, Railway, Render, HuggingFace Spaces, etc.

## Relationship to Game Development

Flowise can be used to build AI-powered game features:
- NPC dialogue systems
- Game AI agents with tool use
- Dynamic quest generation
- AI-powered game master / storyteller

## Dependencies on Other Tools

Flowise is built on top of [[LangChain]], which itself is referenced in the LLM category of this wiki.
