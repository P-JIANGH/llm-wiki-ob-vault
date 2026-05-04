---
title: DeepSeek-TUI Runbook
created: 2026-05-04
updated: 2026-05-04
type: concept
tags: [deepseek, tui, operations, debugging, incident-response, devops]
sources: [~/DeepSeek-TUI/docs/OPERATIONS_RUNBOOK.md]
---

# DeepSeek-TUI Runbook

Practical debugging and incident response procedures for the DeepSeek-TUI CLI/TUI runtime. Companion to [[deepseek-tui]].

## Quick Triage

```bash
# Binary + config check
cargo run -- --version
cat ~/.deepseek/config.toml

# Verbose logs
RUST_LOG=deepseek_cli=debug cargo run
RUST_LOG=deepseek_cli::client=debug cargo run  # HTTP retries/reconnects

# Capture current state
ls ~/.deepseek/sessions
ls ~/.deepseek/sessions/checkpoints
ls ~/.deepseek/tasks
```

## Incident Procedures

### Turn Hangs / Stream Stops

Symptoms: TUI stuck in loading state, partial assistant output with no completion.

1. Inspect retry/health logs (`deepseek_cli::client`)
2. Verify endpoint connectivity:
   ```bash
   curl -sS https://api.deepseek.com/v1/models \
     -H "Authorization: Bearer $DEEPSEEK_API_KEY"
   ```
3. Check for local sandbox/permission deadlock in tool output

Actions:
- `Ctrl+B` → background or cancel running foreground shell
- `exec_shell_cancel <task_id>` to cancel background shell tasks
- `Esc` or `Ctrl+C` to interrupt the current turn
- Retry prompt; if still failing, restart TUI
- On restart, verify prior queued/in-flight turn shows `interrupted` not `running`

### Network Outage / Offline Behavior

- New prompts queue while offline, persisted to `~/.deepseek/sessions/checkpoints/offline_queue.json`
- View queue: `/queue list`
- Confirm queue file timestamp updates

Actions:
1. Restore connectivity
2. Re-send queued entries: `/queue edit <n>` + Enter
3. Queue file auto-clears when empty

### Crash Recovery

- Checkpoint at `~/.deepseek/sessions/checkpoints/latest.json`
- Startup starts fresh unless `--resume`/`--continue` or `Ctrl+R`

Actions:
1. Resume: `deepseek --resume <id>` or `Ctrl+R` in TUI
2. Inspect `latest.json` for schema mismatch/details
3. If schema newer than binary: upgrade binary or remove stale checkpoint

### Persistent State Schema Errors

Affected stores: sessions, runtime thread/turn/item records, tasks.

Actions:
1. Confirm binary version and migration expectations
2. Backup state directory before editing
3. Either: run newer binary, or archive incompatible records and regenerate

### MCP / Tool Execution Failures

1. Validate `~/.deepseek/mcp.json` schema and server command paths
2. Confirm server process starts manually
3. Check sandbox denials in TUI history/logs

Actions:
1. Retry with required approvals (YOLO only when appropriate)
2. Temporarily disable failing MCP server and isolate
3. Re-enable after verification: `/mcp` diagnostics

## State File Locations

| Path | Purpose |
|------|---------|
| `~/.deepseek/config.toml` | Main config |
| `~/.deepseek/mcp.json` | MCP server config |
| `~/.deepseek/sessions/` | Session history |
| `~/.deepseek/sessions/checkpoints/` | Crash checkpoint + offline queue |
| `~/.deepseek/snapshots/` | Side-git workspace snapshots |
| `~/.deepseek/tasks/` | Durable background task records |
| `~/.deepseek/audit.log` | Append-only audit log |

## Keyboard Shortcuts

- `Esc` / `Ctrl+C` — interrupt current turn
- `Ctrl+B` — detach foreground shell (puts it in background task list)
- `Ctrl+R` — resume prior session on startup

## Related

- [[deepseek-tui]] — main entity page
- [[deepseek-tui-runtime-api]] — HTTP/SSE API for headless integration
- [[deepseek-tui-memory]] — user memory feature
