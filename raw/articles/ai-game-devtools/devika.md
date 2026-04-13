# Devika — Raw Source

> Captured: 2026-04-13
> Source: https://github.com/stitionai/devika

## README Summary

**Devika** is an advanced AI software engineer that can understand high-level human instructions, break them down into steps, research relevant information, and write code to achieve the given objective. It is modeled after Devin by Cognition AI, aiming to be an open-source alternative targeting SWE-bench benchmarks.

**License:** MIT

**Key Features:**
- 🤖 Supports **Claude 3**, **GPT-4**, **Gemini**, **Mistral**, **Groq** and **Local LLMs** via [Ollama](https://ollama.com). Optimal performance with **Claude 3** family.
- 🧠 Advanced AI planning and reasoning capabilities
- 🔍 Contextual keyword extraction for focused research
- 🌐 Seamless web browsing and information gathering (Playwright)
- 💻 Code writing in multiple programming languages
- 📊 Dynamic agent state tracking and visualization
- 💬 Natural language interaction via chat interface
- 📂 Project-based organization and management
- 🔌 Extensible architecture

**Requirements:**
- Python >= 3.10 and < 3.12
- NodeJS >= 18
- bun
- uv (Python package manager)

**Architecture (Agent-based):**
- `Agent` Core: Orchestrates overall AI planning/reasoning/execution
- `Planner`: Generates step-by-step plans from user prompts
- `Researcher`: Extracts search queries, ranks/filters for relevance
- `Coder`: Generates code based on plan + researched context
- `Action`: Determines next action from follow-up prompts
- `Runner`: Executes code in sandboxed environment
- `Feature`: Implements new features incrementally
- `Patcher`: Debug and fixes issues
- `Reporter`: Generates PDF reports summarizing projects
- `Decision`: Handles special commands (git clone, browser interaction)
- `Formatter`: Extracts clean relevant info from crawled content
- `InternalMonologue`: Tracks agent's "thinking" process

**Language Models:**
- Claude (Anthropic): claude-v1.3, claude-instant-v1.0
- GPT-4/GPT-3 (OpenAI)
- Self-hosted via Ollama

**Browser Interaction:**
- Powered by Playwright (Chromium)
- `Browser` class: navigate, query DOM, extract content, screenshots
- `Crawler` class: natural language instruction-based webpage interaction

**Project Management:**
- SQLite + SQLModel persistence
- `ProjectManager`: CRUD for projects + conversation history

**Services:**
- GitHub integration (clone/pull, list repos/commits)
- Netlify integration (deploy web apps)

**Dependencies (key):**
flask, flask-cors, sqlmodel, playwright, openai, anthropic, google-generativeai, mistralai, groq, ollama, duckduckgo-search, GitPython, netlify-py, xhtml2pdf, pdfminer.six, Jinja2, tiktoken

## Architecture.md Full Content

See parent file for complete 251-line architecture documentation.

## Project Structure

```
devika/
├── devika.py              # Entry point
├── src/
│   ├── agents/
│   │   ├── agent.py       # Agent Core
│   │   ├── planner/        # Step-by-step planning
│   │   ├── researcher/     # Web research + search queries
│   │   ├── coder/          # Code generation
│   │   ├── action/         # Action determination
│   │   ├── runner/         # Code execution
│   │   ├── feature/        # Feature implementation
│   │   ├── patcher/        # Bug fixing
│   │   ├── reporter/       # PDF report generation
│   │   ├── decision/       # Special commands
│   │   ├── formatter/      # Content extraction
│   │   └── internal_monologue/  # Thinking process
│   ├── services/
│   │   ├── github.py
│   │   ├── git.py
│   │   └── netlify.py
│   └── ...
├── ui/                    # Frontend (bun + TypeScript)
├── docs/                  # Documentation
└── requirements.txt
```

## SWE-bench

Devika aims to match Devin's SWE-bench benchmark score as an open-source alternative.
