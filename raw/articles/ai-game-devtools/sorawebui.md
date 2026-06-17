# SoraWebui — Source Analysis

**Source:** https://github.com/SoraWebui/SoraWebui
**Date:** 2026-04-20
**Method:** web_extract (GitHub/gitcode/gitee clone all failed — network issue)

## Overview
SoraWebui is an open-source web client enabling users to easily create videos from text using OpenAI's Sora model. Features one-click deployment to Vercel.

## Project Status & Roadmap
| Feature | Status | Branch/Version |
|---|---|---|
| Text-to-Video Generation | Complete | main / v0.1 |
| Google Login | Complete | login / v0.2 |
| Google One Tap Login | Complete | login / v0.3 |
| Stripe Payment | Coming Soon | - |
| Official OpenAI Sora API | Pending | Waiting for OpenAI API launch |

## Tech Stack
- **Framework:** Next.js (next.config.mjs)
- **Language:** TypeScript (tsconfig.json, global.d.ts)
- **Styling:** Tailwind CSS (tailwind.config.ts)
- **Tooling:** ESLint, PostCSS, Docker (Dockerfile)
- **i18n:** English, 简体中文, 日本語 (messages/ directory, localized READMEs)

## Deployment
- One-click Vercel deployment
- Manual: clone → install → cp .env.example .env.local → run dev

## Critical Dependency
- Requires [FakeSoraAPI](https://github.com/SoraWebui/FakeSoraAPI) to function properly
- FakeSoraAPI simulates the yet-to-be-released OpenAI Sora API
- Frontend routes video generation requests through mock API until official Sora release

## Repo Metadata
- 99 Commits, 3 Releases
- Key directories: .github/workflow, src/, public/, messages/
- Live Demo: https://sorawebui.com

## FakeSoraAPI (Backend Companion)
- 26 commits, 1 contributor (@qiayue)
- Next.js + TypeScript + Tailwind CSS
- Live API: https://fake-sora-api.sorawebui.com
- Vercel one-click deploy
- Bilingual docs (EN + 简体中文)
- Strictly a simulation/mock API — does not connect to actual OpenAI Sora model
