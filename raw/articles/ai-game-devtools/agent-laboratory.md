# Agent Laboratory — Raw Source

> Ingested: 2026-04-15
> Source: https://github.com/SamuelSchmidgall/AgentLaboratory

## README Summary

**Agent Laboratory** is an end-to-end autonomous research workflow that assists human researchers in implementing research ideas. It uses specialized LLM-driven agents to support the full research workflow:

1. **Literature Review** — agents collect and analyze relevant research papers from arXiv
2. **Plan Formulation** — collaborative planning based on reviewed literature
3. **Experimentation** — data preparation and experiment execution
4. **Report Writing** — comprehensive report generation (supports LaTeX PDF compilation)

Key features:
- Supports **AgentRxiv** — a framework where autonomous research agents upload, retrieve, and build on each other's research for cumulative progress
- Supports **Co-Pilot mode** — human-in-the-loop collaboration
- Checkpoint/save system to resume from any stage on failure
- Multi-language support (English, Chinese, Japanese, Korean, etc.)
- MIT License

### Supported Models
- **OpenAI**: o1, o1-preview, o1-mini, gpt-4o, o3-mini
- **DeepSeek**: deepseek-chat (deepseek-v3)

## Key Source Files

### ai_lab_repo.py (~891 lines)
Main entry point. `LaboratoryWorkflow` class orchestrates the 4-phase pipeline:
- Phase 1: `("literature review", ["literature review"])`
- Phase 2: `("plan formulation", ["plan formulation"])`
- Phase 3: `("experimentation", ["data preparation", "running experiments"])`
- Phase 4: `("results interpretation", ["results interpretation", "report writing", "report refinement"])`

Configurable per-phase model backbone (string or dict for phase-specific models).
Saves all progress to `state_saves/` for resumability.

### agents.py (~739 lines)
Agent role definitions and reward model scoring. `get_score()` function evaluates research quality using LLM-as-reviewer pattern (inspired by AI Scientist / Sakana AI).

### papersolver.py
Handles arXiv paper retrieval and summarization.

### mlesolver.py
MLE (Machine Learning Engineering) solver for experiment execution.

### tools.py
External tool integrations: arXiv search, Hugging Face, Python REPL, LaTeX compilation.

### inference.py
LLM inference backend (OpenAI API).

## Architecture

```
ai_lab_repo.py (LaboratoryWorkflow)
  ├── agents.py (get_score, extract_json_between_markers)
  ├── papersolver.py (arxiv paper retrieval)
  ├── mlesolver.py (experiment execution)
  ├── tools.py (arxiv, HF, python, latex)
  └── inference.py (LLM API calls)
```

## License
MIT License

## BibTeX
```bibtex
@article{schmidgall2025agentlaboratory,
  title={Agent Laboratory: Using LLM Agents as Research Assistants},
  author={Samuel Schmidgall et al.},
  year={2025}, eprint={2501.04227}, arxiv
}
```
