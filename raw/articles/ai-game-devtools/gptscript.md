# GPTScript — Source Material

## Project Info
- **Name:** GPTScript
- **URL:** https://github.com/gptscript-ai/gptscript
- **License:** Apache License 2.0
- **Author:** Acorn Labs, Inc. (acorn.io)
- **Language:** Go (1.26.2)
- **Last Updated:** 2026-04-13

## Overview
GPTScript is a framework that allows Large Language Models (LLMs) to operate and interact with various systems. These systems can range from local executables to complex applications with OpenAPI schemas, SDK libraries, or any RAG-based solutions.

## Key Use Cases (from README)
1. Chat with a local CLI
2. Chat with an OpenAPI compliant endpoint
3. Chat with local files and directories
4. Run an automated workflow

## Architecture (from code analysis)

### Entry Point
- `main.go` — thin wrapper calling `cli.Main()`
- `pkg/cli/` — command-line interface implementation

### Core Package (`pkg/gptscript/gptscript.go`)
Main `GPTScript` struct containing:
- `Registry *llm.Registry` — LLM provider registry
- `Runner *runner.Runner` — execution runner
- `Cache *cache.Client` — caching layer
- `CredentialStoreFactory` — credentials management
- `WorkspacePath` — workspace directory

### Key Modules
| Module | Purpose |
|--------|---------|
| `pkg/llm/` | LLM provider abstraction and registry |
| `pkg/runner/` | Script execution runner |
| `pkg/loader/` | Script loading (incl. VCS loader) |
| `pkg/engine/` | Execution engine |
| `pkg/parser/` | GPTScript language parser |
| `pkg/prompt/` | Prompt management |
| `pkg/openapi/` | OpenAPI schema integration |
| `pkg/mcp/` | MCP (Model Context Protocol) support |
| `pkg/builtin/` | Built-in tools/functions |
| `pkg/remote/` | Remote execution support |
| `pkg/daemon/` | Daemon mode |
| `pkg/server/` | Server mode |
| `pkg/auth/` | Authentication |
| `pkg/credentials/` | Credential storage |
| `pkg/cache/` | Caching |
| `pkg/monitor/` | Execution monitoring |
| `pkg/types/` | Type definitions |

### Dependencies
- `github.com/gptscript-ai/chat-completion-client` — unified chat completion API
- `github.com/gptscript-ai/go-gptscript` — Go client library
- `github.com/spf13/cobra` — CLI framework
- `github.com/sirupsen/logrus` — logging
- `github.com/go-git/go-git/v5` — Git integration
- `github.com/docker/cli` — Docker integration
- `github.com/tidwall/gjson` — JSONpath queries

## Installation
```bash
# macOS/Linux Homebrew
brew install gptscript

# install.sh
curl https://get.gptscript.ai/install.sh | sh

# Windows
winget install gptscript-ai.gptscript
```

## Example Scripts
GPTScript uses `.gpt` file extension for scripts. Examples in `examples/`:
- `helloworld.gpt` — "Say hello world" (simplest example)
- `cli` — Chat with local CLI
- `api` — Chat with OpenAPI endpoint
- `local-files` — Chat with local files/directories
- `workflow` — Automated workflow

## Community
- Discord: https://discord.gg/9sSf4UyAMC

## Notes
- Similar to OpenAI's GPTs but as a local/open-source framework
- Integrates with external systems via tools, OpenAPI schemas, and RAG
- Supports credential management for API keys and secrets
- Workspace-based execution environment
