# Multica — GitHub Source

**URL:** https://github.com/multica-ai/multica
**Fetched:** 2026-04-29
**License:** (open-source)
**Stars:** 2.7k+
**Releases:** 55
**Commits:** 2,673

## Overview

> "Your next 10 hires won't be human."

Multica 是开源的 managed agents 平台，把 coding agent 变成真正的队友。像分配任务给同事一样给 agent 分配 issue——agent 会捡起工作、写代码、报告阻塞、更新状态。

核心特点：
- 不再复制粘贴 prompt
- 不再守着跑
- agent 在看板上出现，参与对话，沉淀可复用 skills
- vendor-neutral，self-hosted，设计用于人类+AI 团队协作

支持 Agent：Claude Code, Codex, OpenClaw, OpenCode, Hermes, Gemini, Pi, Cursor Agent, Kimi, Kiro CLI

架构：
- Frontend: Next.js 16 (App Router)
- Backend: Go (Chi router, sqlc, gorilla/websocket)
- Database: PostgreSQL 17 with pgvector
- Agent Runtime: 本地 daemon（Claude Code, Codex, OpenCode 等）

Quick install: `brew upgrade multica-ai/tap/multica`

核心文件：
- `SELF_HOSTING.md` — 自托管指南
- `SELF_HOSTING_AI.md` — AI 配置
- `CLI_AND_DAEMON.md` — CLI 和 daemon 参考
- `AGENTS.md` — agent 相关

vs Paperclip：Multica 专注团队 AI agent 协作；Paperclip 专注 solo AI agent 公司模拟器
