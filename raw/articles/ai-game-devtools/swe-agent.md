# SWE-agent — Raw Source

**URL:** https://github.com/princeton-nlp/SWE-agent
**Captured:** 2026-04-16
**License:** MIT

## README Summary

SWE-agent enables language models (e.g. GPT-4o, Claude Sonnet 4) to autonomously use tools to fix issues in real GitHub repositories, find cybersecurity vulnerabilities, or perform any custom task.

- ✅ State of the art on SWE-bench among open-source projects
- ✅ Free-flowing & general-purpose: leaves maximal agency to the LM
- ✅ Configurable & fully documented: governed by a single yaml file
- ✅ Made for research: simple & hackable by design

Built by researchers from Princeton University and Stanford University.

### Key News
- July 24: Mini-SWE-Agent achieves 65% on SWE-bench verified in 100 lines of Python
- May 2: SWE-agent-LM-32b achieves open-weights SOTA on SWE-bench
- Feb 28: SWE-agent 1.0 + Claude 3.7 is SoTA on SWE-Bench full
- Feb 25: SWE-agent 1.0 + Claude 3.7 is SoTA on SWE-bench verified

### EnIGMA Mode
SWE-agent: EnIGMA is a mode for offensive cybersecurity (capture the flag) challenges. Achieves state-of-the-art results on multiple cybersecurity benchmarks.

### Related Projects
- Mini-SWE-Agent: simpler successor, matches SWE-agent performance
- SWE-ReX: execution infrastructure
- SWE-bench: benchmark dataset
- SWE-smith: data generation
- sb-cli: CLI tool

### Authors
John Yang, Carlos E. Jimenez, Alexander Wettig, Kilian Lieret, Shunyu Yao, Karthik Narasimhan, Ofir Press (Princeton + Stanford)

Paper: arxiv.org/abs/2405.15793 (NeurIPS 2024)

## Technical Details (from pyproject.toml)

**Package:** sweagent (CLI: `sweagent`)
**Python:** >=3.11
**Build:** setuptools

### Core Dependencies
- litellm (LLM abstraction layer, supports multiple providers)
- swe-rex>=1.4.0 (remote execution)
- flask, flask-cors, flask-socketio (web interface)
- pydantic, pydantic_settings (config validation)
- rich, textual (TUI)
- simple-parsing (CLI arg parsing)
- datasets, numpy, pandas (data processing)
- GitPython, ghapi (GitHub integration)
- tenacity (retry logic)
- unidiff (patch handling)

### Architecture (from sweagent/ directory)
- `sweagent/agent/` — Agent core: agents.py (main loop), models.py (LLM abstraction), action_sampler.py, problem_statement.py, history_processors.py, reviewer.py
- `sweagent/tools/` — Tool handling: tools.py, commands.py, bundle.py, parsing.py
- `sweagent/run/` — Execution modes: run.py (main), run_batch.py (batch mode), run_shell.py (interactive shell)
- `sweagent/utils/` — Utilities: github.py, files.py, config.py, log.py, serialization.py
- `config/` — YAML configuration files for agents and tools
- `trajectories/` — Saved agent execution trajectories

### Linting
- ruff configured with extensive rule set
- pytest for testing
- pre-commit hooks
