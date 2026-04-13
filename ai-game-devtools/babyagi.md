---
title: BabyAGI
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai-model, tool, open-source, agent, llm]
sources: [raw/articles/ai-game-devtools/babyagi.md]
---

# BabyAGI

## Overview

**BabyAGI** (yoheinakajima/babyagi) is an experimental self-building autonomous agent framework built around a novel **functionz** function framework. Instead of traditional task-planning agents, BabyAGI stores, manages, and executes functions from a database with a graph-based structure for tracking imports, dependencies, and authentication secrets.

Archived (Sep 2024): [babyagi_archive](https://github.com/yoheinakajima/babyagi_archive)

GitHub: https://github.com/yoheinakajima/babyagi
Intro: https://x.com/yoheinakajima/status/1840678823681282228

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | MIT |
| **Language** | Python |
| **Framework** | Flask (dashboard), SQLAlchemy (DB), Fernet (encryption) |
| **Status** | Archived (Sep 2024) — experimental, not for production |

## Architecture

BabyAGI's core is the **Functionz** class — a graph-based function registry:

```
babyagi/
├── __init__.py              # create_app(), register_function(), load_functions()
├── functionz/
│   ├── core/
│   │   ├── framework.py     # Functionz singleton
│   │   ├── registration.py # AST-based function parsing
│   │   └── execution.py    # Dependency-ordered execution
│   ├── db/
│   │   ├── models.py       # Function, FunctionVersion, Import, Log (SQLAlchemy)
│   │   ├── local_db.py     # SQLite persistence
│   │   └── db_router.py
│   └── packs/
│       ├── default/         # Built-in: run/add/update/retrieve, AI functions
│       ├── plugins/         # Firecrawl, Airtable, E2B, SerpAPI, Wokelo, etc.
│       └── drafts/          # Experimental: code_writing_functions, self_build
├── dashboard/               # Flask dashboard UI
└── api/                     # API blueprint
```

### Core Concepts

- **Function Registration**: Decorator-based (`@babyagi.register_function()`) with metadata (imports, dependencies, triggers, key_dependencies)
- **Graph-based Dependencies**: Functions track their dependencies; executor resolves execution order
- **Key Management**: Secrets encrypted via Fernet, stored in SQLite
- **Triggers**: Functions can auto-execute when other functions are added/updated
- **Dashboard**: Flask web UI at `/dashboard` for function management and log viewing

## Tech Stack

- **Language**: Python
- **Web**: Flask
- **Database**: SQLite + SQLAlchemy ORM
- **Encryption**: cryptography (Fernet)
- **AI Integration**: OpenAI API (via add_key_wrapper)

## How It Works

1. Register functions with `@babyagi.register_function()` decorator
2. Functions are parsed via AST — imports, parameters, return values extracted
3. Execution engine resolves dependencies and runs in correct order
4. Dashboard provides UI for management, logging, and trigger configuration

## Differences from Similar Tools

- **vs AgentGPT**: BabyAGI is code-focused/minimal CLI; AgentGPT is polished browser-based product
- **vs Auto-GPT**: BabyAGI uses function graph model; Auto-GPT uses traditional task-lists
- **vs LangChain Agents**: BabyAGI's functionz is a self-contained DB-backed registry; LangChain is a composable framework

## Related

- [[agentgpt]] — browser-based autonomous agent platform (comparison)
- [[autonomous-llm-research]] — broader paradigm of self-modifying AI agents
- [[agent-loop]] — core execution loop pattern used by autonomous agents
- [[autoresearch]] — Karpathy's autonomous research framework
