# Athena Crisis Source (from GitHub)

Repository: https://github.com/nkzw-tech/athena-crisis
Date: 2026-04-10
Downloaded via: GitHub API zipball

## Key Info

- MIT Licensed code (100K+ LOC)
- Open Core model: code open, content/art/music proprietary
- pnpm workspace monorepo
- Primary packages: athena, apollo, hera, ui, dionysus, hermes, codegen, art, i18n, offline, tests

## Architecture Summary

- **athena**: Map state data structures and algorithms (client/server shared)
- **apollo**: Game state data structures and algorithms (client/server shared)
- **hera**: Game engine and rendering (client)
- **ui**: Design system (client)
- **dionysus**: AI code (client/server)
- **hermes**: Campaign related data (client/server)
- **codegen**: Action/ActionResponse code generation (build)
- **art**: Asset handling (client/build)
- **i18n**: Internationalization (client/build)
- **offline**: Offline splash screen (client)
- **tests**: e2e tests

## Why Packages Are Named After Greek Gods

> "Why not!? At some point it became necessary to split the codebase into multiple packages to share code between the client and server. The first package was named `athena`, and it was hard to come up with meaningful names for the other packages. We decided to name them after Greek gods because it seemed cute."
