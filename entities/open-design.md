---
title: Open Design
created: 2026-04-30
updated: 2026-04-30
type: entity
tags: [agent, tool, design, cli]
sources: [raw/articles/open-design-2026.md]
---

# Open Design

## Overview

Open Design 是 Claude Design 的开源替代品。本地优先、可部署到 Vercel、每一层都 BYOK。

**GitHub:** https://github.com/nexu-io/open-design
**License:** Apache-2.0
**Author:** nexu-io

## Core Design (6 Principles)

1. **不带 agent，委托给用户已有的 CLI** — 用 Claude Code、Codex、Cursor Agent、Gemini CLI、OpenCode、Qwen 作为设计引擎
2. **Skill 是文件（SKILL.md），不是插件** — 可组合、可版本控制
3. **Design System 是 Markdown（DESIGN.md），不是 theme JSON** — 人类可读
4. **初始化问题表单防止 80% 的返工** — 需求对齐前置
5. **Daemon 让 agent 感觉就在你笔记本上** — 真实的 cwd + SQLite 持久化
6. **提示词栈本身就是产品** — prompt as product

## Architecture

- Vite + React SPA (前端)
- Express daemon (后台服务)
- SQLite (持久化)
- child_process spawn (调用本地 coding agent)

## Supported Agents

Claude Code（stream-json）、Codex、Cursor Agent、Gemini CLI、OpenCode、Qwen

## Built-in Skills (19)

web-prototype, saas-landing, dashboard, pricing-page, docs-page, blog-post, mobile-app, simple-deck, guizang-ppt（默认deck）, pm-spec, weekly-update, meeting-notes, eng-runbook, finance-report, hr-onboarding, invoice, kanban-board, team-okrs

## Built-in Design Systems (71)

Linear, Stripe, Vercel, Airbnb, Tesla, Notion, Anthropic, Apple, Cursor, Supabase, Figma...

## Visual Directions (5)

Editorial Monocle / Modern Minimal / Tech Utility / Brutalist / Soft Warm

## Upstream Dependencies

- [[huashu-design]] — 设计哲学 compass，Junior-Designer workflow，5步品牌资产协议
- [[guizang-ppt-skill]] — deck mode，杂志风，单文件 HTML
- [[open-codesign]] — UX 北极星，流式 artifact 循环，沙盒 iframe 预览，5 种导出
- [[multica]] — daemon 架构，PATH 扫描 agent 检测，agent-as-teammate
