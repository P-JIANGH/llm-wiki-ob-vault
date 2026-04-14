# MetaGPT - Raw Source

> Ingested: 2026-04-14
> Source: https://github.com/geekan/MetaGPT

## README Summary

**MetaGPT** is a multi-agent framework that assigns different LLM/GPT roles to form a collaborative entity for complex tasks. Its core philosophy is **"Code = SOP(Team)"** — materializing Standard Operating Procedures and applying them to teams composed of LLMs.

### Key Concept: Software Company as Multi-Agent System

MetaGPT simulates a software company internally with roles:
- **Product Manager** — writes user stories, requirements
- **Architect** — designs data structures, APIs
- **Project Manager** (planned)
- **Engineer** — writes code
- **Data Analyst** — data analysis

**Input:** One line requirement (e.g., "Create a 2048 game")
**Output:** User stories, competitive analysis, requirements docs, data structures, APIs, code, documentation

### Architecture

```
metagpt/
├── software_company.py   # Main entry: generate_repo() / Team.hire()
├── roles/               # Agent roles (architect.py, engineer.py, product_manager.py, etc.)
├── actions/             # Individual actions agents perform
├── team.py              # Team orchestration
├── memory/               # Agent memory system
├── provider/            # LLM provider abstraction
├── prompts/             # System prompts for each role
├── tools/               # External tools integration
└── examples/            # Use cases: debate, research, werewolf, di, etc.
```

### Key Files
- `software_company.py`: CLI entry point; `generate_repo()` creates a team with PM/Architect/Engineer/DataAnalyst
- `team.py`: Team orchestration — `Team.hire([roles])`, `Team.run()`
- `roles/architect.py`, `engineer.py`, `product_manager.py`, `researcher.py`, etc.
- `examples/debate.py`, `examples/werewolf_game`, `examples/di/` — use case implementations

### Installation
- Python 3.9–3.11
- `pip install metagpt`
- Requires Node.js + pnpm for mermaid diagram generation
- Supports multiple LLM backends: OpenAI, Azure, Ollama, Groq, etc.

### License: MIT

### Related Papers
- "MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework" — ICLR 2024
- "AFlow: Automating Agentic Workflow Generation" — ICLR 2025 (oral, top 1.8%)
- "SPO" and "AOT" papers (Feb 2025)

### Recent Updates (2025)
- Mar 2025: Launched mgx.dev — natural language programming product, #1 Product of the Week on ProductHunt
- Feb 2025: Two new papers: SPO and AOT
- Jan 2025: AFlow accepted at ICLR 2025 (oral)

## Use Cases (from examples/)
- `write_game_code.py` — generate game code from natural language
- `werewolf_game/` — multi-agent werewolf game
- `di/` — Data Interpreter for data analysis
- `debate.py` — multi-agent debate
- `research.py` — research agent
