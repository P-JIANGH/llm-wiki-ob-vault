# oh-my-opencode

> Extracted from: https://github.com/opensoft/oh-my-opencode (dev branch)
> Fetched via GitHub API: 2026-04-27

## Metadata
- **License**: SUL-1.0 (Sustainable Use License)
- **Forked from**: code-yeongyu/oh-my-openagent
- **Stars**: 302+
- **Forks**: 27+
- **Languages**: TypeScript
- **Package manager**: Bun

## Repository Structure
```
oh-my-opencode/
├── src/
│   ├── agents/        # 10 AI agents
│   ├── hooks/         # 31 lifecycle hooks
│   ├── tools/         # 20+ tools
│   ├── features/      # Background agents, Claude Code compat
│   ├── shared/        # 50 cross-cutting utilities
│   ├── cli/           # CLI installer, doctor
│   ├── mcp/           # Built-in MCPs
│   ├── config/        # Zod schema, TypeScript types
│   └── index.ts       # Main plugin entry (601 lines)
├── packages/          # 7 platform-specific binaries
├── script/            # build-schema.ts, build-binaries.ts
└── docs/              # guides, features, configurations
```

## Agents (10 total)

### Core Agents
| Agent | Model | Purpose |
|-------|-------|---------|
| **Sisyphus** | `anthropic/claude-opus-4-5` | Default orchestrator. Plans, delegates, executes. Todo-driven, 32k extended thinking budget |
| **oracle** | `openai/gpt-5.2` | Architecture, code review, debugging. Read-only consultation |
| **librarian** | `opencode/big-pickle` | Multi-repo analysis, docs, OSS examples |
| **explore** | `opencode/gpt-5-nano` | Fast codebase grep (Gemini Flash or Grok Code fallback) |
| **multimodal-looker** | `google/gemini-3-flash` | PDF/image/diagram analysis |

### Planning Agents
| Agent | Model | Purpose |
|-------|-------|---------|
| **Prometheus** | `anthropic/claude-opus-4-5` | Strategic planner with interview mode |
| **Metis** | `anthropic/claude-sonnet-4-5` | Pre-planning analysis, hidden ambiguities |
| **Momus** | `anthropic/claude-sonnet-4-5` | Plan reviewer, validates clarity/verifiability |

## Categories (agent presets)
| Category | Model | Use Cases |
|----------|-------|-----------|
| `visual-engineering` | Gemini 3 Pro | Frontend, UI/UX |
| `ultrabrain` | GPT-5.2-codex (xhigh) | Deep logical reasoning, architecture |
| `artistry` | Gemini 3 Pro (max) | Creative/artistic tasks |
| `quick` | Claude Haiku | Trivial tasks, single-file changes |
| `writing` | Gemini 3 Flash | Documentation, prose |
| `unspecified-high` | Claude Opus 4.5 (max) | Complex unspecified tasks |

## Key Features
- **Ultrawork Mode**: Type `ulw` or `ultrawork` → full automatic mode, agent figures everything out
- **Prometheus Mode**: Press Tab → interview-based planning, then `/start-work` for precise execution
- **Todo Enforcer**: Sisyphus continues until task completion
- **31 Lifecycle Hooks**: Full Claude Code compatibility
- **20+ Tools**: LSP refactoring, AST-aware search, delegation
- **Built-in MCPs**: Exa (websearch), Context7 (docs), Grep.app (GitHub)
- **7 Platform Binaries**: macOS (ARM64/x64), Linux (x64/ARM64/Alpine), Windows (x64)
- **LSP & AST**: Surgical deterministic refactoring

## Installation
```bash
bunx oh-my-opencode install
# or
npx oh-my-opencode install
```

## CLI Commands
| Command | Description |
|---------|-------------|
| `bunx oh-my-opencode install` | Interactive setup wizard |
| `bunx oh-my-opencode doctor` | 17+ health checks |
| `bunx oh-my-opencode run` | OpenCode session runner |
| `bunx oh-my-opencode auth` | Google Antigravity auth |

## Philosophy (ultrawork manifesto)
- Human intervention = failure signal. Agent should complete work without babysitting.
- Goal: code indistinguishable from senior engineer (no AI slop)
- Token cost acceptable if productivity gains are 10x+
- Separation of planning (Prometheus) and execution (Atlas/Sisyphus)

## Security Warnings
- **Phishing site**: ohmyopencode.com is NOT affiliated. Official downloads only from GitHub releases.
- **OAuth notice (Jan 2026)**: Anthropic restricted third-party OAuth citing ToS violations. Project has no custom OAuth implementations.

## Config Locations
- Project: `.opencode/oh-my-opencode.json`
- User: `~/.config/opencode/oh-my-opencode.json`

## Version
- 3.0 stable (2026-01-25)
- Install: `oh-my-opencode@latest`
