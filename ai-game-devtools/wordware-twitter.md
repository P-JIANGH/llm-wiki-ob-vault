---
title: Wordware Twitter Personality AI Agent
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [tool, ai, agent, typescript]
sources: [raw/articles/ai-game-devtools/wordware-twitter.md]
---

# Wordware Twitter Personality AI Agent

## Overview
A full-stack SaaS web application that analyzes any Twitter/X handle to generate a **personalized personality profile** using the **Wordware AI Agent** platform. Combines AI-driven text analysis with resilient web scraping and modern SaaS infrastructure.

## Key Facts
- **Repository:** `wordware-ai/twitter`
- **Primary Language:** TypeScript (98.6%)
- **Stars:** 1.4k | Forks: 229 | Commits: 416
- **Framework:** Next.js with TypeScript
- **Deployed on:** Vercel

## Architecture & Tech Stack

| Layer | Technology |
|:---|:---|
| Frontend/Backend | Next.js + TypeScript |
| Styling | Tailwind CSS |
| Database | Neon DB + Drizzle ORM |
| AI Agent | Wordware Playground (modular prompts) |
| Analytics | PostHog |
| Payments | Stripe |
| Email/CRM | Loops |

## Technical Highlights

### Fallback Scraping System
Implements a resilient data extraction pipeline with **three fallback providers** — Twitter API + Cookie, Apify API, SocialData API — ensuring Twitter data is reliably fetched even if one API fails or hits rate limits.

### Modular AI Prompt Architecture
Distinct prompt IDs for different analysis modes:
- **ROAST** — Humorous personality breakdown
- **FULL** — Comprehensive personality profile
- **PAIR** — Compatibility analysis between two accounts

This modular approach enables granular control over AI tone, depth, and output structure through the Wordware platform.

### Full SaaS Integration
Production-ready architecture including Stripe payments, PostHog analytics, Loops email CRM — a complete SaaS blueprint for AI-powered tools.

## Relationships
- Uses [[ai-game-devtools/dify]]'s competitor ecosystem (AI application platforms)
- Similar agent workflow approach to [[ai-game-devtools/jaaz]] (creative AI tool with modular pipeline)
- Next.js + TypeScript stack common in modern AI tools (see [[ai-game-devtools/biomes]])

## Sources
- [[raw/articles/ai-game-devtools/wordware-twitter]]
- GitHub: https://github.com/wordware-ai/twitter
