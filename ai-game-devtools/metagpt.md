---
title: MetaGPT
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai-model, tool, multi-agent, llm, open-source, game-engine]
sources: [raw/articles/ai-game-devtools/metagpt.md]
---

# MetaGPT

**MetaGPT** (geekan/MetaGPT) is a multi-agent framework that assigns different LLM/GPT roles to form a collaborative entity for complex tasks. Its core philosophy is **"Code = SOP(Team)"** — materializing Standard Operating Procedures and applying them to teams composed of LLMs.

## Overview

MetaGPT simulates a **software company** with specialized roles:
- **Product Manager** — writes user stories, competitive analysis, requirements docs
- **Architect** — designs data structures, APIs, technical specs
- **Engineer** — writes and reviews code
- **Data Analyst** — data analysis tasks
- **Team Leader** — orchestrates the team

**Input:** One line of natural language requirement (e.g., "Create a 2048 game")
**Output:** Full software artifacts — docs, code, tests, competitive analysis

## Technical Features

### Architecture
- **Python 3.9–3.11**, MIT License
- **Entry point:** `metagpt` CLI or `generate_repo()` Python API
- **Multi-backend LLM support:** OpenAI, Azure, Ollama, Groq, etc. via config yaml
- **Core modules:**
  - `roles/` — Agent roles (architect, engineer, product_manager, researcher, qa_engineer, etc.)
  - `actions/` — Individual actions agents perform
  - `team.py` — Team orchestration (`Team.hire()`, `Team.run()`)
  - `memory/` — Agent memory system
  - `provider/` — LLM provider abstraction layer
  - `prompts/` — System prompts per role

### Key Papers
- "MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework" — ICLR 2024
- "AFlow: Automating Agentic Workflow Generation" — ICLR 2025 (oral, top 1.8%)
- "SPO" and "AOT" (Feb 2025)

### Game-Related Use Cases
- `examples/write_game_code.py` — generate game code from natural language
- `examples/werewolf_game/` — multi-agent werewolf social deduction game
- `examples/di/` — Data Interpreter for game data analysis

## Comparison with Similar Tools

| Dimension | MetaGPT | [[chatdev]] | [[devika]] |
|-----------|---------|-------------|-----------|
| Approach | SOP-based role simulation | Role-based virtual company | SWE-bench focused agent |
| Architecture | Team of PM/Architect/Engineer | CEO/CTO/Programmer chain | Planner/Researcher/Coder |
| License | MIT | MIT | MIT |
| Game Use | write_game_code.py | Game development via roles | General SWE |
| Notable | AFlow ICLR 2025 oral | NeurIPS 2025 | Devin alternative |

## Related Links
- GitHub: https://github.com/geekan/MetaGPT
- Docs: https://docs.deepwisdom.ai/main/en/
- MGX Product: https://mgx.dev/

## See Also
- [[chatdev]] — Another virtual software company multi-agent framework from OpenBMB
- [[devika]] — SWE-bench focused AI software engineer (Devin alternative)
- [[autogen]] — Microsoft's general multi-agent framework
- [[crewai]] — Multi-agent orchestration platform
