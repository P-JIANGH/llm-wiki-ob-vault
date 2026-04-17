# StableStudio — Stability AI Open Source DreamStudio

> Source: https://github.com/Stability-AI/StableStudio
> Cloned from: https://gitcode.com/Stability-AI/StableStudio.git (GitHub mirror)
> Date: 2026-04-17

## Project Overview

StableStudio is Stability AI's official open-source variant of DreamStudio (https://dreamstudio.ai), their user interface for generative AI. It is a web-based application that allows users to create and edit generated images.

## Key Facts

- **Organization:** Stability AI (https://stability.ai)
- **License:** MIT
- **Repository:** https://github.com/Stability-AI/StableStudio
- **Type:** Web application (frontend UI for generative AI image creation/editing)

## Architecture

### Monorepo Structure (Yarn Workspaces)

The project uses Yarn 3.3 workspaces with 6 packages:

| Package | Purpose |
|---------|---------|
| `stablestudio-ui` | Main React UI application |
| `stablestudio-plugin` | Plugin interface/API definitions |
| `stablestudio-plugin-stability` | Default plugin using Stability API for inference |
| `stablestudio-plugin-webui` | Plugin for stable-diffusion-webui REST API (stub) |
| `stablestudio-plugin-webgpu` | Plugin for WebGPU local inference (stub) |
| `stablestudio-plugin-example` | Example plugin with developer tooling |

### Technology Stack

- **TypeScript** — Full type safety
- **Vite** — Bundler and live-development
- **React** — Modern hooks and functional components
- **Zustand** — State management (replaced Recooc due to "hot" path performance)
- **Tailwind CSS** — Primary styling
- **Emotion** — CSS-in-JS for complex cases

### Domain-Driven Design

Code is organized around concepts (domains) rather than technical layers:
- Each domain is a self-contained unit (type + component + state + hooks)
- Uses TypeScript declaration merging for fluent API: `User.Avatar`, `User.Preferences.use()`
- Domains map 1:1 to file/folder structure
- Key domains: `App`, `Generation.Image`, `Editor`, `Plugin`, `Theme`, `Shortcut`, `GlobalState`, `GlobalVariables`

### Plugin System

- Plugins are JavaScript/TypeScript modules exporting functions
- Key contract: `createStableDiffusionImages`, `getStableDiffusionStyles`, `getStableDiffusionDefaultInput`
- Functionality degrades gracefully if not all methods implemented
- Only one active plugin at a time (current limitation)
- Developer can install custom plugins via settings (developer mode)

## History

1. **Pre-Stable Diffusion Launch (Summer 2022):** Started as passion project by @nin_artificial using Vue.js + local Python backend for Disco Diffusion
2. **Post-Stable Diffusion Launch (Aug-Nov 2022):** Added in-painting, out-painting, image-to-image features
3. **React Rewrite (Dec 2022 - Apr 2023):** Migrated to React for infinite canvas editor + re-imagined UX
4. **StableStudio:** Open-sourced as community-driven project, removed DreamStudio-specific branding and account features

## Differences from DreamStudio

- No DreamStudio branding
- API calls replaced by plugin system (swap back-end easily)
- Removed Stability-specific account features (billing, API key management)
- DreamStudio remains the hosted production deployment

## Quick Start

```bash
git clone https://github.com/Stability-AI/StableStudio.git
cd StableStudio
yarn
yarn dev
```

Runs at `localhost:3000`. Requires Stability API key for default plugin.

## Key Source Files

- Root `package.json` — Yarn workspace config, scripts
- `packages/stablestudio-ui/src/App/` — App-level React components
- `packages/stablestudio-ui/src/Generation/Image/` — Image generation domain
- `packages/stablestudio-ui/src/GlobalState/` — Zustand state wrapper
- `packages/stablestudio-plugin/src/Plugin.ts` — Plugin contract/API definition

## Game Dev Relevance

- Open-source web UI for image generation — can be customized for game asset creation workflows
- Plugin system allows connecting to any inference back-end (local SD, ComfyUI, etc.)
- Domain-driven architecture provides good reference for building complex creative tools
- Tailwind + React + Zustand stack is modern and maintainable
- Can serve as base for custom game asset generation interfaces
