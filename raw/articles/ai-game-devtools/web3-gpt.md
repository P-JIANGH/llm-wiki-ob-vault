# Web3GPT — Source Material

**URL:** https://github.com/Markeljan/Web3GPT
**Cloned:** 2026-04-15
**License:** MIT (inferred)

## Overview

Web3GPT is an AI-powered smart contract development platform built on Next.js 16. It provides:
- Browser chat UI at w3gpt.ai
- Skill API endpoint at `https://w3gpt.ai/api/skill`
- Agent-driven workflows for deploying Solidity contracts to EVM chains

## Stack

- **Runtime:** Bun (bun.lock committed)
- **Framework:** Next.js 16 App Router
- **Language:** TypeScript (strict mode)
- **AI:** Vercel AI SDK (`ai`, `@ai-sdk/react`, `@ai-sdk/openai`)
- **Auth:** NextAuth v5 beta with GitHub provider
- **Web3:** `wagmi`, `viem`, `@rainbow-me/rainbowkit`
- **Storage:** Vercel KV for persistence
- **Package Manager:** Bun

## Core Tools (AI Tools via Vercel AI SDK)

- `resolveAddress` — resolve crypto address to domain
- `resolveDomain` — resolve ENS domain to address
- `deployContract` — compile & deploy Solidity to EVM chains
- `createAgent` — create and publish custom AI agents

## Supported Deployment Chains

- Polygon Mainnet, Polygon Amoy
- Base Sepolia, Arbitrum Sepolia, Optimism Sepolia
- Mantle Sepolia, Metis Sepolia
- Celo Alfajores, Ethereum Sepolia

## Built-in Agents (in `lib/constants.ts`)

1. **Web3GPT** (default) — general smart contract development
2. **GENT** — first token agent for the GENT token ecosystem
3. **x420** — chill Web3 vibes agent
4. **OpenZeppelin 5.0** — OZ 5.0 library specialist
5. **CTF Agent** — Solidity security challenge agent
6. **Creator** — helps create custom AI agents

## Key Source Files

- `lib/constants.ts` — agent definitions, supported chains, RPC URLs, compiler version (v0.8.29)
- `lib/tools.ts` — AI tool definitions using Vercel AI SDK `tool()` builder
- `lib/types.ts` — TypeScript type definitions for agents, deployments, chains
- `lib/solidity/deploy.ts` — contract compilation, deployment, IPFS upload, verification
- `lib/actions/unstoppable-domains.ts` — ENS/domain resolution
- `lib/data/kv.ts` — Vercel KV persistence layer
- `app/api/chat/route.ts` — main streaming chat endpoint with tool calling
- `app/api/skill/route.ts` — public skill endpoint for anonymous agent chats
- `app/api/cron/route.ts` — verification processor (Vercel Cron)

## Architecture Notes

- Built-in agents in `lib/constants.ts`; user agents stored in KV
- Chat history persisted for authenticated users; anonymous chats keyed by `chatId`
- Contract deployment: compile with `solc` → deploy via `viem` → upload artifacts to IPFS (Pinata) → store verification metadata → verify via cron
- Polygon mainnet available via agent/skill endpoint but NOT exposed through wallet connectors
- Default Solidity version: 0.8.29
