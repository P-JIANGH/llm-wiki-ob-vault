---
title: SoraWebui
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, video, open-source, llm]
sources: [raw/articles/ai-game-devtools/sorawebui.md]
---

# SoraWebui

Open-source web client for text-to-video generation using OpenAI's Sora model. Provides a ready-to-deploy Next.js frontend with one-click Vercel deployment, Google login, and i18n support (EN/中文/日本語).

## Key Facts
- **GitHub:** [SoraWebui/SoraWebui](https://github.com/SoraWebui/SoraWebui)
- **Live Demo:** https://sorawebui.com
- **Activity:** 99 commits, 3 releases
- **License:** MIT (inferred from repo)
- **Current version:** v0.3 (Google One Tap Login complete)

## Tech Stack
- **Framework:** Next.js + TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **Deployment:** Docker + Vercel one-click
- **Auth:** Google OAuth / Google One Tap
- **Payments:** Stripe (planned)

## Architecture
SoraWebui is a **frontend web application** that sends text prompts to a Sora-compatible API endpoint for video generation. It follows a standard Next.js App Router structure with:
- `src/` — application source code
- `messages/` — i18n localization files
- `.github/workflows/` — CI/CD configuration

## Critical Dependency: FakeSoraAPI
Since OpenAI has not officially released the Sora API, SoraWebui depends on [FakeSoraAPI](https://github.com/SoraWebui/FakeSoraAPI) — a companion mock backend that simulates the Sora API interface. This allows developers to build and test their workflows ahead of the official release. The mock API provides predictable responses for UI/UX testing but does not generate real videos.

## Roadmap
| Feature | Status |
|---|---|
| Text-to-Video Generation | ✅ Complete (v0.1) |
| Google Login | ✅ Complete (v0.2) |
| Google One Tap Login | ✅ Complete (v0.3) |
| Stripe Payment | 🔄 Coming Soon |
| Official OpenAI Sora API | 🔄 Pending OpenAI release |

## Comparison to Similar Tools
- vs [[ai-game-devtools/open-sora]]: Open-Sora is a full open-source Sora architecture reproduction with actual model training (MMDiT, 11B params, $200K training cost). SoraWebui is a **frontend UI layer** that would connect to the Sora API once available — it does not include a model.
- vs [[ai-game-devtools/mora]]: Mora is a multi-agent video generation framework using existing models (SDXL, SVD) to replicate Sora capabilities. SoraWebui targets the official API rather than open-source alternatives.
- vs [[ai-game-devtools/open-sora-plan]]: Open-Sora Plan is PKU's Sora reproduction project with actual model weights. SoraWebui provides the user-facing interface for when the official API launches.

## Relevance to Game Development
SoraWebui provides a turnkey UI for game developers who want to integrate text-to-video generation into their pipelines — creating cutscenes, concept art videos, or dynamic content from text descriptions. Once the Sora API is available, it offers a simple self-hosted or Vercel-deployed interface for teams to experiment without building a frontend from scratch.
