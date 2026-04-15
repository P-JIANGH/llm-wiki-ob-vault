# Byzer-Agent

> Source: https://github.com/allwefantasy/byzer-agent

## Overview

Byzer-Agent is a distributed agent framework for LLM, built on top of Ray and developed from AutoGen. It is designed to be easy to use, easy to scale, and easy to debug.

**Note:** Byzer-Agent code lives under the [Byzer-LLM](https://github.com/allwefantasy/byzer-llm) project. This repository is a documentation project only.

## Architecture

- Built on **Ray** for distributed computing
- Based on **AutoGen** (Microsoft Research multi-agent framework)
- Supports local and remote agent communication
- Integrates with **LangChain** / **LlamaIndex** for business logic
- Key components: ConversableAgent, UserProxyAgent, Agents.create_remote_agent

## Key Classes

### ConversableAgent
Base agent class extending AutoGen's ConversableAgent. Agents define:
- `@byzerllm.prompt()` decorator for system message prompt
- `@byzerllm.agent_reply()` decorator for reply functions
- `send()` / `initiate_chat()` for inter-agent communication

### UserProxyAgent
User proxy agent for initiating conversations with other agents.

### Agents
Factory for creating local and remote agents via `Agents.create_remote_agent()`.

## Dependencies
- [Byzer-LLM](https://github.com/allwefantasy/byzer-llm) — main dependency
- [Byzer-Retrieval](https://github.com/allwefantasy/byzer-retrieval) — optional retrieval component
- Ray — distributed computing backend
- LangChain / LlamaIndex — for implementing business jobs

## License
Part of Byzer-LLM project (Apache 2.0).

## Related
- [[ai-game-devtools/autogen]] — AutoGen (upstream project)
- [[ai-game-devtools/metagpt]] — MetaGPT multi-agent framework
- [[ai-game-devtools/chatdev]] — ChatDev multi-agent platform
