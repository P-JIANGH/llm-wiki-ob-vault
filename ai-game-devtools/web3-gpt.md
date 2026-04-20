---
title: Web3GPT
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, llm, agent, tool, nextjs, typescript]
sources: [raw/articles/ai-game-devtools/web3-gpt.md]
---

# Web3GPT

AI-powered smart contract development platform. Chat with agents that can write, deploy, and verify Solidity contracts on EVM-compatible chains.

## Overview

Web3GPT provides a browser chat UI ([w3gpt.ai](https://w3gpt.ai)) and a skill API (`/api/skill`) for integrating AI agents into Web3 workflows. Built on Next.js 16 + Vercel AI SDK.

## Key Facts

- **Stack:** Next.js 16 (App Router), Bun, TypeScript strict, Vercel AI SDK, NextAuth v5, wagmi/viem/RainbowKit
- **Persistence:** Vercel KV for users, chats, agents, deployments, verification jobs
- **Solidity:** v0.8.29, OpenZeppelin imports, `solc` + `viem` for deployment
- **License:** MIT (inferred)
- **Creator:** soko.eth

## Core AI Tools

| Tool | Function |
|------|----------|
| `resolveAddress` | Resolve crypto address → ENS domain |
| `resolveDomain` | Resolve ENS domain → crypto address |
| `deployContract` | Compile Solidity → deploy to EVM chain → IPFS upload → queue verification |
| `createAgent` | Create and publish custom AI agents (Creator agent only) |

## Supported Deployment Chains

- **Mainnet:** Polygon Mainnet (via agent only, not wallet connectors)
- **Testnets:** Polygon Amoy, Base Sepolia, Arbitrum Sepolia, Optimism Sepolia, Mantle Sepolia, Metis Sepolia, Celo Alfajores, Ethereum Sepolia

## Built-in Agents

| Agent | Purpose |
|-------|---------|
| **Web3GPT** (default) | General smart contract development |
| **GENT** | First token agent for GENT token ecosystem |
| **x420** | "Chill Web3 vibes" agent (HTTP 420 Enhance Your Calm) |
| **OpenZeppelin 5.0** | OZ 5.0 library specialist |
| **CTF Agent** | Solidity security challenges (reentrancy, overflow, access control) |
| **Creator** | Help users create custom AI agents |

## Architecture

- **Agents** defined in `lib/constants.ts`; user agents stored in KV
- **Chat API** (`app/api/chat/route.ts`) — streaming endpoint with tool calling
- **Skill API** (`app/api/skill/route.ts`) — anonymous agent chats keyed by `chatId`
- **Cron** (`app/api/cron/route.ts`) — processes contract verification jobs
- **Deployment flow:** compile → deploy via `viem` → upload artifacts to IPFS (Pinata) → store metadata in KV → verify via cron

## Skill API

```bash
# Start chat
curl https://w3gpt.ai/api/skill

# Continue chat
curl -X POST "https://w3gpt.ai/api/skill?chatId=your-chat-id" \
  -H "Content-Type: application/json" \
  -d '{"message":"Deploy an ERC20 on Polygon mainnet"}'
```

## Relationships

- [[ai-game-devtools/agentgpt]] — Another browser-based AI agent platform (Next.js)
- [[ai-game-devtools/autogen]] — Multi-agent framework for complex workflows
- [[ai-game-devtools/metagpt]] — Multi-agent software company framework (game code generation)
