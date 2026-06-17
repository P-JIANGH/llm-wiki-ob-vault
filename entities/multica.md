---
title: Multica
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, project-management]
sources: [raw/articles/multica-2026.md]
---

# Multica

## Overview

开源 managed agents 平台，把 coding agent 变成真正的队友。像分配任务给同事一样给 agent 分配 issue——agent 会捡起工作、写代码、报告阻塞、更新状态。

**GitHub:** https://github.com/multica-ai/multica
**License:** Open-source | **Stars:** 2.7k+ | **Releases:** 55 | **Commits:** 2,673

## Core Features

- 不再复制粘贴 prompt
- 不再守着跑
- agent 在看板上出现，参与对话，沉淀可复用 skills
- vendor-neutral，self-hosted，设计用于人类+AI 团队协作

## Supported Agents

Claude Code, Codex, OpenClaw, OpenCode, Hermes, Gemini, Pi, Cursor Agent, Kimi, Kiro CLI

## Architecture

- Frontend: Next.js 16 (App Router)
- Backend: Go (Chi router, sqlc, gorilla/websocket)
- Database: PostgreSQL 17 with pgvector
- Agent Runtime: 本地 daemon（Claude Code, Codex, OpenCode 等）

## Installation

```bash
brew upgrade multica-ai/tap/multica
```

## Related

- [[open-design]] — 上游引用了 multica
- [[nanobot]] — 另一个 agent 框架
