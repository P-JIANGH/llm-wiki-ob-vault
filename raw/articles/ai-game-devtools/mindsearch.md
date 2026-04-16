# MindSearch — Mimicking Human Minds Elicits Deep AI Searcher

**Source:** https://github.com/InternLM/MindSearch
**Paper:** https://arxiv.org/abs/2407.20183
**Demo:** https://internlm-chat.intern-ai.org.cn/
**License:** Apache 2.0
**Date Captured:** 2026-04-16

## Overview

MindSearch is an open-source AI deep search framework that mimics human cognitive patterns to elicit deep searching capabilities. Developed by InternLM (Shanghai AI Lab), it transforms a simple query into a dynamic graph of sub-questions, each resolved through independent web searches, then synthesizes a comprehensive answer.

## Architecture

### Core Components

1. **MindSearchAgent / AsyncMindSearchAgent** — Main agent that orchestrates the search process. Uses Lagent's AgentForInternLM as the base. Supports both sync and async modes.

2. **WebSearchGraph** — A dynamic graph structure that represents the search process:
   - `add_root_node()` — Creates the initial query node
   - `add_node()` — Creates sub-question searcher nodes with parallel execution via ThreadPoolExecutor (max_workers=10)
   - `add_edge()` — Connects nodes to form the search dependency graph
   - `add_response_node()` — Terminal node for final answer synthesis
   - Async mode uses multiple event loops (32 default) running in daemon threads

3. **SearcherAgent / AsyncSearcherAgent** — Sub-agents that handle individual web search queries. Each node in the graph runs its own SearcherAgent with WebBrowser plugin.

4. **ExecutionAction** — Tool used by the planner to execute graph node queries via `exec()` with code extraction from LLM output.

5. **StreamingAgentForInternLM / AsyncStreamingAgentForInternLM** — Streaming response base classes that support real-time graph state updates to the frontend.

### Key Flow

```
User Query → Planner (LLM) → Generate sub-questions → WebSearchGraph.add_node() 
→ Parallel SearcherAgents (each with WebBrowser plugin + search engine) 
→ Collect results → Build reference graph → Final summarization
```

### Search Engine Support

- DuckDuckGoSearch (default, no API key needed)
- BingSearch (requires WEB_SEARCH_API_KEY)
- BraveSearch (requires BRAVE_API_KEY)
- GoogleSearch (requires SERPER API key)
- TencentSearch (requires TENCENT_SEARCH_SECRET_ID/KEY)

### LLM Model Support

- InternLM2.5-7b-chat (via LMDeployServer, LMDeployClient, or HuggingFace)
- GPT-4 (via OpenAI API)
- Qwen (via DashScope API)
- InternLM via SiliconFlow API

### Frontend Options

- React (frontend/React/) — Vite + React, supports simultaneous multi-query search visualization
- Gradio (frontend/mindsearch_gradio.py)
- Streamlit (frontend/mindsearch_streamlit.py)

### API

FastAPI-based backend:
- POST `/solve` — Main endpoint, accepts GenerationParams (inputs + session_id + agent_cfg)
- Returns Server-Sent Events (SSE) with streaming graph state updates
- CORS enabled for all origins

### Technical Details

- **Language:** Python
- **Framework:** Lagent v0.5 (InternLM's lightweight LLM agent framework)
- **Backend:** FastAPI + uvicorn
- **Streaming:** SSE (Server-Sent Events) with janus async queue bridge
- **Concurrency:** ThreadPoolExecutor (sync) / asyncio event loops (async)
- **Output Format:** InterpreterParser for graph generation, PluginParser for searcher execution

### Related InternLM Projects

- [Lagent](https://github.com/InternLM/lagent) — Lightweight LLM agent framework (base)
- [AgentFLAN](https://github.com/InternLM/Agent-FLAN) — Agent training data (ACL 2024 Findings)
- [T-Eval](https://github.com/open-compass/T-Eval) — Tool utilization benchmark (ACL 2024)
