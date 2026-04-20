---
title: AgentGPT
created: 2026-04-12
updated: 2026-04-12
type: entity
tags: [tool, open-source, agent, llm]
sources: [raw/articles/ai-game-devtools/agentgpt.md]
aliases: ["AgentGPT"]

---

# AgentGPT

## Overview

**AgentGPT** (reworkd/AgentGPT) is an open-source browser-based platform for assembling, configuring, and deploying autonomous AI agents. It allows users to name a custom AI and have it autonomously pursue a given goal by thinking of tasks, executing them, and learning from results.

Website: https://agentgpt.reworkd.ai
Documentation: https://reworkd.ai/docs

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | Open source (accepts GitHub sponsors) |
| **Commits** | 1,500+ |
| **Releases** | 12 |
| **Languages** | English, 简体中文 (Chinese), Hungarian |

## Architecture

```
AgentGPT/
├── cli/               # Automatic setup CLI
├── db/                # Database files
├── docs/              # Documentation
├── next/              # Next.js frontend
├── platform/          # Platform core
├── scripts/           # Build/deployment scripts
├── docker-compose.yml # Docker setup
└── .env.example       # Environment variables template
```

Built with **Next.js** for the frontend, containerized via **Docker** for easy deployment. Users configure API keys and run locally at `http://localhost:3000`.

## Tech Stack

- **Frontend**: Next.js (React-based framework)
- **Deployment**: Docker / Docker Compose
- **Setup**: Bash scripts (`setup.sh` for Mac/Linux, `setup.bat` for Windows)

## How It Works

1. User names a custom AI agent and defines a goal
2. Agent autonomously decomposes the goal into tasks
3. Agent executes tasks and learns from results
4. Agent iteratively refines approach until goal is reached

## Differences from Similar Tools

Compared to other autonomous agent frameworks:

- **vs Auto-GPT**: AgentGPT is browser-based with a GUI, easier for non-developers; Auto-GPT is CLI-focused
- **vs LangChain Agents**: AgentGPT is a ready-to-use product; LangChain is a composable framework for developers
- **vs BabyAGI**: AgentGPT offers a polished web UI; BabyAGI is minimal task-driven CLI

## Related

- [[autonomous-llm-research]] — broader paradigm of AI agents that autonomously modify code and run experiments
- [[ai-agent-development-platform]] — general concept of AI agent development platforms
- [[agent-loop]] — core execution loop pattern used by autonomous agents
- [[autoresearch]] — another autonomous research framework (Karpathy's approach)
