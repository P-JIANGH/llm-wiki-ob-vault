---
title: Vercel Labs
created: 2026-06-18
updated: 2026-06-18
type: entity
tags: [organization, company, open-source, agent, agent-first, programming-language]
sources: [raw/articles/zerolang-2026.md]
confidence: medium
---

# Vercel Labs

**Vercel Labs** is the experimental / research arm of Vercel that
publishes open-source explorations beyond the core Vercel platform
(frontend cloud / Next.js). `vercel-labs/zerolang` is its most-watched
project in the agent-systems space.

## Notable Projects

### [[entities/zerolang]] — graph-native language for agents
> "The programming language for agents." — `vercel-labs/zerolang`

- **Status:** experimental, pre-1.0, Apache-2.0
- **Version (this clone):** v0.3.4
- **The thesis:** the semantic graph is the program database; `.0`
  files are projections of `zero.graph`; agents edit the graph via
  checked `zero patch` operations, not text diffs.
- **Why Vercel Labs cares:** the same insight that makes a content-hashed
  Vercel deployment reproducible (build artifact = hash of inputs) maps
  onto making an *agent edit* reproducible (patch = hash of the
  pre-edit graph state + the op + the value).

## Relationship to Vercel Core

Vercel Labs is not the same org as the Vercel product company. Projects
under `vercel-labs` are experiments with no service-level guarantees —
they are not part of the Vercel platform, and they are not covered by
Vercel enterprise support. Vercel Labs projects that prove themselves
sometimes graduate to the core platform (e.g. Next.js, Svelte) and
sometimes stay Labs-only.

## Related Links

- GitHub org: https://github.com/vercel-labs
- Zerolang web: https://zerolang.ai
- [[entities/zerolang]] — main project in the agent space

## Related Wiki Pages

- [[entities/zerolang]] — the project
- [[concepts/graph-native-programming]] — the thesis
