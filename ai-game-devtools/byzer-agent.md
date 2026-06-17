---
title: Byzer-Agent
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, agent, llm, framework, distributed]
sources: [raw/articles/ai-game-devtools/byzer-agent.md]
---

# Byzer-Agent

## Overview

**Byzer-Agent** is a distributed agent framework for LLM, built on top of **Ray** and derived from [[ai-game-devtools/autogen|AutoGen]]. Designed for ease of use, scalability, and debuggability.

> ⚠️ **Note:** The actual code lives in the [Byzer-LLM](https://github.com/allwefantasy/byzer-llm) repository. This repo is documentation-only.

## Key Architecture

- **Distributed runtime** via Ray (local + remote agents)
- **AutoGen-based** — inherits ConversableAgent pattern
- **Remote agent communication** — `Agents.create_remote_agent()` for cross-process/cross-node agents
- **Prompt/reply decorators** — `@byzerllm.prompt()` and `@byzerllm.agent_reply()` for agent behavior definition
- **State management** — `_messages` dict per agent for conversation history
- **Business logic** — integrates with LangChain / LlamaIndex for real applications

## Core Components

| Class | Role |
|-------|------|
| `ConversableAgent` | Base agent class with chat capabilities |
| `UserProxyAgent` | Human-facing proxy that initiates conversations |
| `Agents` | Factory for creating local/remote agent instances |

## Agent Reply Flow

Reply functions are executed in class definition order. The `@byzerllm.agent_reply()` decorator marks reply functions:
- No argument = handles all messages
- `lambda self:[self.bob]` = only handles messages from specific sender

Return tuple: `(termination_bool, response_content)`

## Dependencies

- [Byzer-LLM](https://github.com/allwefantasy/byzer-llm) — main runtime
- [Byzer-Retrieval](https://github.com/allwefantasy/byzer-retrieval) — optional retrieval
- Ray — distributed actor system
- LangChain / LlamaIndex — business job implementation

## Related Frameworks

- [[ai-game-devtools/autogen|AutoGen]] — upstream project, Microsoft Research multi-agent framework
- [[ai-game-devtools/metagpt|MetaGPT]] — role-based multi-agent software development framework
- [[ai-game-devtools/chatdev|ChatDev]] — zero-code multi-agent collaboration platform

## Links

- GitHub: https://github.com/allwefantasy/byzer-agent
- Byzer-LLM: https://github.com/allwefantasy/byzer-llm
