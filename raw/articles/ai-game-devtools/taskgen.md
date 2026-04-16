# TaskGen — Raw Source

**Source:** https://github.com/simbianai/taskgen
**Version:** v3.3.4 / v3.4.3 (PyPI)
**Date Fetched:** 2026-04-16
**Clone Path:** ~/tmp/ai-game-devtools/taskgen/

## README Summary

TaskGen is a task-based agentic framework building on StrictJSON outputs by LLM agents.
An open source initiative led by John Tan Chong Min, supported by Simbian AI.

As of 15 Oct 2024, John Tan Chong Min has left Simbian and maintains his own version at https://github.com/tanchongmin/taskgen

### Notable Features
- Splitting of Tasks into subtasks for bite-sized solutions
- Single Agent with LLM Functions
- Single Agent with External Functions
- Meta Agent with Inner Agents as Functions
- Shared Variables for multi-modality support
- Retrieval Augmented Generation (RAG) over Function space
- Memory to provide additional task-based prompts for task
- Global Context for configuring your own prompts + add persistent variables
- Async mode for Agent, Function and `strict_json` added
- Community Uploading and Downloading of Agent and Functions

### JSON Messaging vs Conversational Free-Text (vs AutoGen)
- JSON format helps do Chain-of-Thought prompting naturally and is less verbose
- JSON format allows natural parsing of multiple output fields
- StrictJSON helps to ensure all output fields are there and of the right format

### Creator Info
- Created: 17 Feb 2024 - 15 Oct 2024 by John Tan Chong Min
- Co-developer / Lead Contributor: Prince Saroj
- Research Staff: Prince Saroj, Hardik Maheshwari, Bharat Runwal, Brian Lim, Richard Cottrill
- Mentors / Funders: Ambuj Kumar, Alankrit Chona, Mehul Motani

## Core Architecture

### Package: `taskgen` (Python)
**License:** MIT
**PyPI:** `taskgen-ai` v3.4.3
**Requires:** Python >= 3.8

### Key Modules

```
taskgen/
├── __init__.py      # Exports: Agent, AsyncAgent, Function, AsyncFunction, Memory, Ranker, etc.
├── base.py          # strict_json core — JSON parsing with type checking
├── base_async.py    # Async version of strict_json
├── agent.py         # Agent / AsyncAgent — main agentic loop (1772 lines)
├── function.py      # Function / AsyncFunction — tool wrapping (auto-converts Python funcs)
├── memory.py        # Memory / AsyncMemory — RAG over function space, document memory
├── ranker.py        # Ranker / AsyncRanker — function ranking for RAG
├── wrapper.py       # ConversableAgent, ConversationWrapper
└── utils.py         # Utility functions (top_k_index, get_source_code_for_func, etc.)
```

### Dependencies (pyproject.toml)
- openai>=1.59.6
- langchain
- dill>=0.3.9 (serialization)
- termcolor>=3.1.0
- requests
- python-docx
- pandas
- xlrd
- asyncio
- opentelemetry-sdk~=1.35.0

### Key Classes

1. **BaseAgent** — Core agent implementation with:
   - `agent_name`, `agent_description` for role definition
   - `max_subtasks` (default 5) for task decomposition
   - `subtasks_completed` dict as memory buffer
   - `shared_variables` for cross-function/inner-agent state sharing
   - `global_context` / `get_global_context` for persistent state injection into prompts
   - `memory_bank` (Dict[Memory]) for RAG over function space
   - `code_action` flag for code-only action mode
   - `thoughts` list for ReAct-style observation tracking
   - Agent serialization/deserialization via pickle (save_agent / load_agent)

2. **Agent** (sync) — Extends BaseAgent with:
   - Default `use_llm` and `end_task` functions
   - `query()` — LLM-based query with output format control
   - `assign_functions()` — Auto-converts Python functions to Function class
   - `select_function()` / `use_function()` — Manual function execution
   - `run()` — Automatic task decomposition and subtask execution
   - `reply_user()` — Summarize results for user

3. **AsyncAgent** — Async version with parallelization support

4. **Function** — Tool wrapper for both LLM-based and external Python functions
   - Auto-extracts function signature, type hints, docstring
   - Generates JSON output format with type checking via StrictJSON

5. **Memory** — RAG memory system
   - Supports document reading (docx, csv, xls, txt)
   - `RecursiveCharacterTextSplitter` from langchain for chunking
   - `Ranker`-based retrieval (cosine similarity scoring)

6. **Ranker** — Function ranking for selecting best tools for a given task

## Tutorials Included
- Tutorial 0: StrictJSON
- Tutorial 1: Agent
- Tutorial 2: Shared Variables and Global Context
- Tutorial 3: Memory
- Tutorial 4: Hierarchical Agents
- Tutorial 5: CodeGen and External Function Interfacing
- Tutorial 6: Conversation Class

## Papers & Benchmarks
- Paper: https://web3.arxiv.org/pdf/2407.15734
- Video: https://www.youtube.com/watch?v=F3usuxs2p1Y
- NaturalQuestions RAG benchmark in Paper/naturalquestions_rag/
- TextWorld benchmark in Paper/textworld/
- Math dataset benchmark in Paper/math_dataset/
- Web browsing agent in Paper/web_browsing_agent/
- Maze navigator in Paper/maze_navigator/

## Key Design Principles
1. Task-based (not conversational) — agents focus on task instructions, not dialogue
2. StrictJSON — type-checked JSON output ensures structured, parseable results
3. Modular — each component (Agent, Function, Memory, Ranker) is independently configurable
4. Non-verbose — agents give concise, task-focused answers
5. Hierarchical — meta-agents can delegate to inner agents as functions

## Comparison Points vs Other Frameworks
- vs **AutoGen**: TaskGen uses JSON messaging (structured, less verbose) vs AutoGen's conversational free-text
- vs **LangChain**: More focused on agentic task decomposition, less on chains/pipelines
- vs **CrewAI**: TaskGen has built-in StrictJSON parsing, more lightweight architecture
