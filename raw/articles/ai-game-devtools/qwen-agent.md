# Qwen-Agent — Raw Source

**Source:** https://github.com/QwenLM/Qwen-Agent
**Mirror:** https://gitcode.com/QwenLM/Qwen-Agent.git
**Captured:** 2026-04-16

## README Summary

Qwen-Agent is a framework for developing LLM applications based on the instruction following, tool usage, planning, and memory capabilities of Qwen. It also comes with example applications such as Browser Assistant, Code Interpreter, and Custom Assistant. Now Qwen-Agent plays as the backend of [Qwen Chat](https://chat.qwen.ai/).

### Recent News
- Feb 16, 2026: Open-sourced Qwen3.5
- Jan 27, 2026: Open-sourced agent evaluation benchmark DeepPlanning
- Sep 23, 2025: Added Qwen3-VL Tool-call Demo (zoom in, image search, web search)
- Jul 23, 2025: Added Qwen3-Coder Tool-call Demo, native API tool call interface (vLLM)
- May 1, 2025: Added Qwen3 Tool-call Demo and MCP Cookbooks
- Mar 7, 2025: Added QwQ-32B Tool-call Demo (parallel, multi-step, multi-turn tool calls)
- Dec 3, 2024: GUI upgraded to Gradio 5

### Installation
```bash
pip install -U "qwen-agent[gui,rag,code_interpreter,mcp]"
# Or minimal: pip install -U qwen-agent
```

Optional extras: [gui] Gradio, [rag] RAG, [code_interpreter] Code Interpreter, [mcp] MCP support.

### Model Service Options
- DashScope (Alibaba Cloud) — set `DASHSCOPE_API_KEY`
- Self-hosted via vLLM or Ollama (OpenAI-compatible API)
- For QwQ/Qwen3: do NOT add `--enable-auto-tool-choice` and `--tool-call-parser hermes` in vLLM

### Architecture (Key Modules)

**qwen_agent/** — Core library
- `agent.py` — Base `Agent` abstract class with `run()` streaming interface
- `agents/` — Agent implementations:
  - `assistant.py` — Assistant agent (tools + file reading)
  - `fncall_agent.py` — Function call agent
  - `react_chat.py` — ReAct-style reasoning agent
  - `group_chat.py` — Multi-agent group chat
  - `router.py` — Agent routing
  - `tir_agent.py` — Tool-Integrated Reasoning agent
  - `virtual_memory_agent.py` — Virtual memory for long documents
  - `writing/` — Writing-focused agents
  - `doc_qa/` — Document QA agents
  - `keygen_strategies/` — Key generation strategies
- `llm/` — LLM backend adapters:
  - `base.py` — `BaseChatModel` abstract class
  - `oai.py` — OpenAI-compatible API
  - `qwen_dashscope.py` — DashScope Qwen API
  - `qwenvl_dashscope.py` — Qwen VL DashScope
  - `qwenaudio_dashscope.py` — Qwen Audio DashScope
  - `qwenomni_oai.py` — Qwen Omni OpenAI
  - `function_calling.py` — Function calling support
  - `fncall_prompts/` — Tool call prompt templates (nous format)
  - `schema.py` — Message/Content schemas
- `tools/` — Tool implementations:
  - `base.py` — `BaseTool` with `@register_tool` decorator
  - `code_interpreter.py` — Docker-based code execution sandbox
  - `retrieval.py` — RAG retrieval tool
  - `web_search.py`, `web_extractor.py` — Web tools
  - `image_gen.py`, `image_search.py` — Image tools
  - `mcp_manager.py` — MCP server management
  - `python_executor.py` — Python code execution
  - `simple_doc_parser.py` — Document parsing
  - `search_tools/` — Search engine tools
  - `storage.py` — Data storage
- `gui/` — Gradio-based web UI
- `memory/` — Memory management
- `multi_agent_hub.py` — Multi-agent coordination

**Key Design Patterns:**
- Agent base class with streaming `run()` generator
- Tool registration via `@register_tool` decorator
- Function calling with nous-style prompt template
- MCP integration for external tool servers
- Docker-based code interpreter sandbox
- Virtual memory for super-long document QA (1M+ tokens)

### License
Apache License 2.0

### Version
0.0.34
