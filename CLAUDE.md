# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Type

This is an **Obsidian vault** — a personal wiki for tracking AI game development tools and related engineering knowledge. It is NOT a software project. There are no build/test/lint commands. All content is markdown with YAML frontmatter.

## Core Files

| File | Purpose |
|------|---------|
| `SCHEMA.md` | **Read this first** — defines all conventions, tag taxonomy, frontmatter schema, page types, and update policies |
| `index.md` | Master content catalog — every wiki page listed under its section with one-line summary |
| `log.md` | Append-only chronological log of all wiki actions (ingest, update, query, lint, create, archive, delete) |

## Directory Structure

- `raw/articles/` — Immutable source material (cloned GitHub READMEs, web extracts). Corrections go in wiki pages, never modify raw sources.
- `ai-game-devtools/` — Wiki pages for AI game development tools (entity pages for ~140 LLM/VLM/Agent/Code/Image/Video/Audio/Music/Avatar projects)
- `concepts/` — Concept pages (architectural patterns, frameworks, paradigms)
- `entities/` — Entity pages (significant projects, organizations)
- `comparisons/` — Side-by-side comparison pages
- `open-source-game/` — 153 open source game engine reverse-engineering projects

## Workflow: Adding New Content (Ingest)

When adding a new AI game dev tool from the Yuan-ManX catalog:

1. Clone source to `~/tmp/ai-game-devtools/<name>/`
2. Create `raw/articles/ai-game-devtools/<name>.md` (immutable source)
3. Create `ai-game-devtools/<name>.md` (wiki page with frontmatter)
4. Update `ai-game-devtools-learning-checklist.md` (mark with date)
5. Update `index.md` (add entry under correct section)
6. Append to `log.md` (action: ingest)

## Frontmatter Schema

```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | comparison | query | summary
tags: [from taxonomy in SCHEMA.md]
sources: [raw/articles/path-to-source.md]
---
```

## Key Conventions

- File names: lowercase, hyphens, no spaces
- Use `[[wikilinks]]` to link between pages (minimum 2 outbound links per page)
- Wikilinks in index.md/log.md preserve cron automation — do not alter formatting
- When new info conflicts with existing content, note both positions with dates/sources, mark with `contradictions: [page-name]` in frontmatter
- Pages exceeding ~200 lines should be split into sub-topics with cross-links

## Tag Taxonomy (from SCHEMA.md)

**Topics:** project, architecture, backend, frontend, database, devops, infra, api, framework, ai, llm, ml, agent, workflow
**Tools:** tool, cli, script, automation, netsuite, oracle, flowable, prisma, nextjs, python, typescript, docker
**Meta:** notes, learning, how-to, reference, decision, retrospective, tip, pitfall
