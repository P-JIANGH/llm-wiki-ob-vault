# LLama Agentic System

**Source:** https://github.com/meta-llama/llama-agentic-system
**Redirect:** Now at https://github.com/llamastack/llama-stack-apps
**Date:** 2026-04-16
**Extracted by:** web_extract (GitHub)

## Repository Overview
**Repo:** `llamastack/llama-stack-apps`
**Purpose:** Provides example applications built on the [Llama Stack](https://github.com/meta-llama/llama-stack), specifically focusing on **agentic components** for **Llama 3.1+**.

## Core Architecture
- **Agentic App Requirements:** Building an agentic application requires multiple standardized components (inference, tool execution, safety/shields, memory, etc.).
- **Llama Stack Distribution:** All required components are unified and standardized by the Llama Stack. Implementations of these APIs are assembled into a single **Llama Stack Distribution** to streamline Generative AI development.

## Quick Start Guide
1. **Install Prerequisites** — Create isolated Python environment, install dependencies via `requirements.txt` or `pyproject.toml`.
2. **Start Llama Stack Server** — Launches local server at `http://localhost:8321`
3. **Test Agent Demo** — `python -m examples.agents.hello localhost 8321`

## Configuration & API Keys
- `TAVILY_SEARCH_API_KEY` — Required for demo script
- `WOLFRAM_ALPHA_API_KEY` — Optional for extended tool integrations
- `BRAVE_SEARCH_API_KEY` — Optional for extended tool integrations

## Demo Execution
The demo showcases the full agentic lifecycle: **creation → safety shield validation → inference → tool execution → response synthesis**.

Example workflow:
1. User asks a question
2. Shield call validates (No Violation)
3. Inference determines tool needed
4. Tool execution (e.g., brave_search)
5. Response synthesis from tool results

## UI & Interaction
- **Gradio UI:** Ready-to-run local chat interface for the Stack server
- **Agent Store:** Additional scripts, notebooks, and interaction patterns at `examples/agent_store`
- **Client SDK:** Dedicated Llama Stack Client SDK for programmatic integration

## Repository Structure
| Path | Purpose |
|------|---------|
| `examples/` | Demo scripts, agent implementations, notebooks |
| `docs/` | Project documentation |
| `pyproject.toml` / `requirements.txt` | Dependency & build configuration |
| `.github/` | CI/CD workflows |
| `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` | Governance & compliance |

## Key Links
- **Main Framework:** [Llama Stack](https://github.com/meta-llama/llama-stack)
- **Community:** [Discord Server](https://discord.gg/llama-stack)
- **Agent Store Examples:** [examples/agent_store](https://github.com/meta-llama/llama-stack-apps/tree/main/examples/agent_store)
