# DeepSeek TUI

> **A terminal-native coding agent built around DeepSeek V4's 1M-token context and prefix cache. Single binary, no Node/Python runtime required — ships an MCP client, sandbox, and durable task queue out of the box.**

[简体中文 README](README.zh-CN.md)

```bash
npm i -g deepseek-tui
```

[![CI](https://github.com/Hmbown/DeepSeek-TUI/actions/workflows/ci.yml/badge.svg)](https://github.com/Hmbown/DeepSeek-TUI/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/deepseek-tui)](https://www.npmjs.com/package/deepseek-tui)
[![crates.io](https://img.shields.io/crates/v/deepseek-tui-cli?label=crates.io)](https://crates.io/crates/deepseek-tui-cli)

---

## What is it?

DeepSeek TUI is a coding agent that runs entirely in your terminal. It gives DeepSeek's frontier models direct access to your workspace — reading and editing files, running shell commands, managing git, and orchestrating sub-agents — all through a fast, keyboard-driven TUI.

**Built for DeepSeek V4** (`deepseek-v4-pro` / `deepseek-v4-flash`) with 1M-token context windows and native thinking-mode (chain-of-thought) streaming. See the model's reasoning unfold in real time as it works through your tasks.

### Key Features

- **Native RLM** (`rlm_query` tool) — fans out 1–16 cheap `deepseek-v4-flash` children in parallel against the existing DeepSeek client for batched analysis, decomposition, or parallel reasoning
- **Thinking-mode streaming** — shows DeepSeek's chain-of-thought as it reasons about your code
- **Full tool suite** — file ops, shell execution, git, web search/browse, apply-patch, sub-agents, MCP servers
- **1M-token context** — automatic intelligent compaction when context fills up
- **Three interaction modes** — Plan (read-only explore), Agent (interactive with approval), YOLO (auto-approved). Decomposition-first system prompts teach the model to `checklist_write`, `update_plan`, and spawn sub-agents before acting
- **Reasoning-effort tiers** — cycle through `off → high → max` with Shift+Tab
- **Session save/resume** — checkpoint and resume long sessions
- **Workspace rollback** — side-git pre/post-turn snapshots with `/restore` and `revert_turn`, without touching your repo's `.git`
- **HTTP/SSE runtime API** — `deepseek serve --http` for headless agent workflows
- **MCP protocol** — connect to Model Context Protocol servers for extended tooling; see [docs/MCP.md](docs/MCP.md)
- **Live cost tracking** — per-turn and session-level token usage and cost estimates
- **Dark theme** — DeepSeek-blue palette

---

## How it's wired

DeepSeek TUI's architecture follows a **dispatcher → TUI → engine → tools** pattern.
The `deepseek` CLI binary is a lightweight dispatcher that parses subcommands and
delegates to the `deepseek-tui` companion binary for interactive sessions. The TUI
runs a **ratatui**-based interface that communicates with an async engine executing
an agent loop: user input flows to the LLM via a streaming client (OpenAI-compatible
Chat Completions), tool calls are extracted from the response and dispatched through
a typed tool registry (shell, file ops, git, web, sub-agents, MCP), and results
stream back into the transcript.

Behind the scenes, the engine manages session state, turn tracking, and a durable
task queue. The LSP subsystem (`crates/tui/src/lsp/`) provides post-edit diagnostics
by spawning language servers (rust-analyzer, pyright, etc.) and injecting errors
into the model's context before the next reasoning step. A recursive language model
(RLM) subsystem gives the agent a sandboxed Python REPL for batch classification
and sub-LLM orchestration. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for
the full walkthrough.

---

## Quickstart

```bash
npm install -g deepseek-tui
deepseek
```

Prebuilt binaries are published for **Linux x64**, **Linux ARM64** (v0.8.8+),
**macOS x64**, **macOS ARM64**, and **Windows x64**. For everything else —
musl, riscv64, FreeBSD, etc. — see [Build from source](#install-from-source)
below or the full [docs/INSTALL.md](docs/INSTALL.md) walkthrough.

### Linux ARM64 (Raspberry Pi, Asahi, Graviton, HarmonyOS PC)

`npm i -g deepseek-tui` works on glibc-based ARM64 Linux from **v0.8.8**
onward. If you're stuck on v0.8.7 or earlier (where you'll see
`Unsupported architecture: arm64`), upgrade or use `cargo install`:

```bash
# requires Rust 1.85+ (https://rustup.rs)
cargo install deepseek-tui-cli --locked   # provides `deepseek`
cargo install deepseek-tui     --locked   # provides `deepseek-tui`
```

### China / mirror-friendly install

If GitHub or npm downloads are slow from mainland China, install the Rust
crates through a Cargo registry mirror:

```toml
# ~/.cargo/config.toml
[source.crates-io]
replace-with = "tuna"

[source.tuna]
registry = "sparse+https://mirrors.tuna.tsinghua.edu.cn/crates.io-index/"
```

Then install the canonical `deepseek` dispatcher and the companion TUI binary
(both are required — the dispatcher delegates to the TUI runtime):

```bash
cargo install deepseek-tui-cli --locked   # provides `deepseek`
cargo install deepseek-tui     --locked   # provides `deepseek-tui`
deepseek --version
```

On first launch you'll be prompted for your [DeepSeek API key](https://platform.deepseek.com/api_keys). The TUI saves it to your user config at `~/.deepseek/config.toml` so it works from every folder without OS credential prompts.

You can also set it ahead of time:

```bash
# Recommended — saves to ~/.deepseek/config.toml; works everywhere
deepseek auth set --provider deepseek

# Env var alternative
export DEEPSEEK_API_KEY="YOUR_D..._KEY"
deepseek

# Verify which source the binary is reading:
deepseek doctor
```

### Using NVIDIA NIM

```bash
deepseek auth set --provider nvidia-nim --api-key "YOUR_NVIDIA_API_KEY"
deepseek --provider nvidia-nim

# or per-process:
DEEPSEEK_PROVIDER=nvidia-nim NVIDIA_API_KEY="***" deepseek
```

### Other DeepSeek V4 providers

```bash
deepseek auth set --provider fireworks --api-key "YOUR_FIREWORKS_API_KEY"
deepseek --provider fireworks --model deepseek-v4-pro

# SGLang is self-hosted; auth is optional for localhost deployments.
SGLANG_BASE_URL="http://localhost:30000/v1" deepseek --provider sglang --model deepseek-v4-flash
```

---

## What's new in v0.8.8

A stabilization-focused release: a thick band of UX polish on top of the v0.8.6 / v0.8.7 base, plus runtime fixes for the rough edges that surfaced in production sessions. No model or API changes; every existing config and session keeps working.

### TUI polish

- **Visual retry / backoff banner** when the upstream rate-limits or 5xxs, with a per-second countdown
- **MCP health chip** in the footer — a coloured `MCP n/n` glyph reflects how many configured servers are actually reachable
- **Tool-output spillover** routes full bodies to `~/.deepseek/tool_outputs/<id>.txt` with a 32 KiB head visible in the cell
- **Multi-day duration formatting** — `humanize_duration` walks `s → m → h → d → w` and caps at two units
- **Cumulative `worked Nh Mm` footer chip** appears once a session crosses 60s
- **OSC 8 hyperlinks** — URLs in the transcript are Cmd+click-openable on iTerm2, Terminal.app, Ghostty, Kitty, WezTerm, Alacritty, and modern gnome-terminal/konsole
- **Inline diff rendering** for `edit_file` and `write_file` — unified diff with line numbers and coloured `+`/`-` gutters
- **Composer prompt stash** — Ctrl+S parks the current draft to `~/.deepseek/composer_stash.jsonl`, `/stash list/pop/clear`
- **Slash-menu layout no longer jitters** the chat area as matched-entry count changes

### Accessibility

- **`NO_ANIMATIONS=1`** env var forces `low_motion = true` and `fancy_animations = false`
- **Keyboard-enhancement flags** pop on every shutdown path including panic, Ctrl+Z suspend, and external-editor invocation
- **Kitty keyboard protocol** (`DISAMBIGUATE_ESCAPE_CODES`) pushed at startup

### Agents / sub-agents

- **Sub-agent cap raised 5 → 10** (configurable via `[subagents].max_concurrent`, hard ceiling 20)
- **Multi-agent fan-out UI freeze fixed** — `SharedSubAgentManager` is now `Arc<RwLock<…>>`
- **Sub-agent output summarized** before being folded into the parent's context
- **`Implementer` + `Verifier` sub-agent roles** wired into `agent_spawn` / `agent_assign` schemas
- **`agent_list` defaults to current-session view**
- **`agent_swarm` / `spawn_agents_on_csv` / `/swarm`** removed in v0.8.5

### Workflows / extensibility

- **`load_skill` model-callable tool** — takes a skill id, returns the SKILL.md body
- **Cross-tool skill discovery** — walks `.agents/skills`, `skills`, `.opencode/skills`, `.claude/skills`, `~/.deepseek/skills`
- **`/hooks` read-only lifecycle hook listing**
- **Every `HookEvent` now has a live producer** — `tool_call_before` / `tool_call_after` / `message_submit` / `on_error`
- **`instructions = [...]` config array** lets you stack additional system-prompt files
- **`deepseek pr <N>` subcommand** fetches a PR's title / body / diff via `gh`
- **User-memory MVP** (opt-in) — `~/.deepseek/memory.md` injected into system prompt as `<user_memory>` block

### Security

- **Project-config keys denied at workspace scope** — malicious `./.deepseek/config.toml` can no longer override `api_key`, `base_url`, `provider`, or `mcp_config_path`
- **`SSL_CERT_FILE` honoured** in the HTTPS client
- **Execpolicy heredoc parsing** — `normalize_command` strips heredoc bodies before shlex tokenization

### Packaging

- **Linux ARM64 prebuilts** added to the release matrix
- **`deepseek update` fixed** — platform-string mapping uses `arm64`/`x64` instead of `aarch64`/`x86_64`

### Bug fixes

- **Composer Option+Backspace** deletes by word now
- **Offline composer queue is session-scoped**
- **`display_path` test race + Windows separator** fixed

### Auth & onboarding

- **No automatic OS credential prompts**
- **One setup command works everywhere** — `deepseek auth set --provider deepseek`
- **Onboarding screen wording rewritten**

---

## What's new in v0.8.7

Quick patch — selection works across the whole transcript (system notes, thinking blocks, tool output).

---

## What's new in v0.8.6

### AGENTS.md bootstrap (`/init`)

`/init` walks the workspace, auto-detects project type, writes starter `AGENTS.md` with build/test commands and conventions from `git log`.

### Inline LSP diagnostics

After every `apply_patch`/`edit_file`/`write_file`, the engine sends `textDocument/didChange` to the LSP server and surfaces errors inline. Supports rust-analyzer, pyright, typescript-language-server, gopls, clangd.

### Self-update (`deepseek update`)

Fetches latest GitHub release, downloads platform-correct binary with SHA256 verification, atomically replaces running binary.

### Session sharing (`/share`)

Exports current session as static HTML, uploads to GitHub Gist via `gh` CLI.

---

## What's new in v0.8.5

- **SSRF protection** for `fetch_url` — hostname validation, DNS pinning, blocked internal IP ranges
- **Schema-driven config editor** — `/config tui` (schemaui) or `/config web` (browser)
- **DeepseekCN provider** — `api.deepseeki.com` for China-based users
- **Atomic file writes** — all writes to `~/.deepseek/` go through `write_atomic` (tempfile + fsync + rename)
- **Panic safety foundations** — `spawn_supervised` catches and logs task panics

---

## What's new in v0.8.0

- **Shell stability** — completed background shell jobs release live process and pipe handles immediately
- **Windows REPL runtime CI hardening**
- **Cargo mirror install docs** (TUNA mirror)

---

## What's new in v0.7.8

- **Shell controls: foreground-to-background detach** — press `Ctrl+B` to detach or cancel
- **`exec_shell_cancel`** — cancel specific or all background shell tasks
- **Unicode glob search fix** — multi-byte filenames no longer panic

---

## What's new in v0.7.6

- **UI Localization** — `locale` setting: `auto` / `ja` / `zh-Hans` / `pt-BR` / `en`
- **Smarter paste handling** — paste-burst detection, CRLF normalization
- **Composer history search** — `Alt+R` opens live search across input history
- **Pending input preview** — queued messages appear above composer during running turn
- **Grouped `/config` editor** with live filter
- **Searchable help overlay** — `?` or `F1` or `Ctrl+/`

---

## Models & Pricing

| Model | Context | Input (cache hit) | Input (cache miss) | Output |
|---|---|---|---|---|
| `deepseek-v4-pro` | 1M | $0.003625 / 1M* | $0.435 / 1M* | $0.87 / 1M* |
| `deepseek-v4-flash` | 1M | $0.0028 / 1M | $0.14 / 1M | $0.28 / 1M |

*Pro rates are a limited-time 75% discount valid until 2026-05-05 15:59 UTC.

---

## Usage

```bash
deepseek                                      # interactive TUI
deepseek "explain this function"              # one-shot prompt
deepseek --model deepseek-v4-flash "summarize" # model override
deepseek --yolo                               # YOLO mode (auto-approve tools)
deepseek auth set --provider deepseek         # save API key
deepseek doctor                               # check setup & connectivity
deepseek doctor --json                        # machine-readable diagnostics
deepseek setup --status                       # read-only setup status
deepseek models                               # list live API models
deepseek sessions                             # list saved sessions
deepseek resume --last                        # resume latest session
deepseek serve --http                         # HTTP/SSE API server
deepseek mcp list                             # list configured MCP servers
deepseek mcp validate                         # validate MCP config
deepseek mcp-server                           # run MCP stdio server
```

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Tab` | Complete `/` or `@` entries; queue draft as follow-up while turn running; cycle mode when idle |
| `Shift+Tab` | Cycle reasoning-effort: off → high → max |
| `F1` | Help |
| `Esc` | Back / dismiss |
| `Ctrl+K` | Command palette |
| `Ctrl+R` | Resume an earlier session |
| `Alt+R` | Search prompt history and recover cleared drafts |
| `@path` | Attach file/directory context |
| `Alt+↑` | Edit last queued message |
| `/attach <path>` | Attach image/video media |

---

## Modes

| Mode | Behavior |
|---|---|
| **Plan** | Read-only investigation — model explores and proposes decomposition plan before making changes |
| **Agent** | Default interactive mode — multi-step tool use with approval gates |
| **YOLO** | Auto-approve all tools in a trusted workspace |

---

## Configuration

`~/.deepseek/config.toml` — see `config.example.toml` for every option.

Key environment overrides: `DEEPSEEK_API_KEY`, `DEEPSEEK_BASE_URL`, `DEEPSEEK_MODEL`, `DEEPSEEK_PROVIDER`, `DEEPSEEK_PROFILE`, `NVIDIA_API_KEY`, `FIREWORKS_API_KEY`, `SGLANG_BASE_URL`, `SGLANG_API_KEY`

---

## Publishing your own skill

DeepSeek-TUI discovers skills from: `.agents/skills` (workspace) → `./skills` → `~/.deepseek/skills` (global).

```text
~/.deepseek/skills/my-skill/
└── SKILL.md
```

```markdown
---
name: my-skill
description: Use this when DeepSeek should follow my custom workflow.
---

# My Skill

Instructions for the agent go here.
```

Install community skills from GitHub: `/skill install github:<owner>/<repo>`

---

## Documentation

| Doc | Topic |
|---|---|
| ARCHITECTURE.md | Codebase internals |
| CONFIGURATION.md | Full config reference |
| MODES.md | Plan / Agent / YOLO modes |
| MCP.md | Model Context Protocol integration |
| RUNTIME_API.md | HTTP/SSE API server |
| RELEASE_RUNBOOK.md | Release process |
| OPERATIONS_RUNBOOK.md | Ops & recovery |

---

## Contributing

See CONTRIBUTING.md. Pull requests welcome!

*Not affiliated with DeepSeek Inc.*

## License

MIT
