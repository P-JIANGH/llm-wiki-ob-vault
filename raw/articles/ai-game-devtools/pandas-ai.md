# PandasAI — Natural Language Data Analysis with LLMs

**Source:** https://github.com/sinaptik-ai/pandas-ai
**Date:** 2026-04-17
**Category:** Code (AI-powered data analysis)

---

## README Summary

PandasAI is a Python library that makes it easy to ask questions to your data in natural language. It helps non-technical users interact with their data naturally, and helps technical users save time and effort when working with data.

### Installation
```bash
pip install pandasai
pip install pandasai-litellm
```

### Usage Pattern
```python
import pandasai as pai
from pandasai_litellm.litellm import LiteLLM

llm = LiteLLM(model="gpt-4.1-mini", api_key="YOUR_OPENAI_API_KEY")
pai.config.set({"llm": llm})

df = pai.read_csv("data/companies.csv")
response = df.chat("What is the average revenue by region?")
```

### Key Features
- Natural language queries on DataFrames (`df.chat()`)
- Automatic chart generation
- Multi-DataFrame support (ask questions relating multiple tables)
- Docker sandbox for secure code execution (`pandasai-docker`)
- Skills system (EE) for extending functionality
- Vector store integration for training agents

### License
MIT (except `pandasai/ee` directory which has separate license)

---

## Architecture Analysis

### Core Modules (`pandasai/`)
- **`agent/`** — Agent class: the main conversational interface. Manages state, code generation, execution, and response parsing
  - `base.py` (327 lines): Core Agent with chat/follow_up/generate_code/execute_code methods
  - `state.py`: AgentState — manages config, memory, skills, vectorstore
- **`core/`** — Core logic pipeline
  - `code_generation/` — LLM-driven Python code generation
  - `code_execution/` — CodeExecutor with DuckDB integration
  - `prompts/` — Prompt templates for SQL generation, error correction
  - `response/` — ResponseParser with typed outputs (chart, string, number, dataframe, error)
- **`dataframe/`** — DataFrame and VirtualDataFrame wrappers around pandas
- **`data_loader/`** — DatasetLoader, SemanticLayerSchema, DuckDBConnectionManager
- **`query_builders/`** — SQL query construction and parsing
- **`sandbox/`** — Secure code execution environment
- **`vectorstores/`** — Vector store abstraction for memory/training
- **`llm/`** — LLM provider abstraction
- **`helpers/`** — Path utilities, SQL sanitization
- **`ee/`** — Enterprise Edition (skills management)

### Key Architectural Patterns

1. **Agent State Machine**: Agent maintains AgentState with config/memory/skills/vectorstore, manages a conversation loop
2. **Code Generation → Execution Pipeline**: 
   - User query → Prompt → LLM generates Python/SQL code → CodeExecutor runs it → ResponseParser formats output
   - Error recovery: automatic retry with error-specific prompts (InvalidLLMOutputType vs generic errors)
3. **DuckDB Integration**: DataFrames are registered in DuckDB for SQL query execution, enabling efficient analytics on tabular data
4. **Semantic Layer**: Schema-based dataset management with YAML definitions, transformations, relations, and views
5. **Extension System**: Modular extensions via `extensions/` directory:
   - `extensions/llms/litellm/` — LiteLLM integration
   - `extensions/llms/openai/` — OpenAI integration
   - `extensions/sandbox/docker/` — Docker sandbox
   - EE extensions: vectorstores (ChromaDB, LanceDB), etc.

### Technical Stack
- **Language:** Python 3.8–3.11
- **Build:** Poetry (pyproject.toml per extension)
- **Database:** DuckDB (embedded SQL analytics)
- **LLM:** LiteLLM provider (supports 100+ models via unified interface)
- **Code Execution:** Local sandbox or Docker container
- **Memory:** Conversation history + optional vector store for training

### CI/CD
- GitHub Actions: CI (core tests) + CD (PyPI releases)
- CodeCov for coverage tracking

### Game Dev Relevance
- Game balance analysis: Ask natural language questions about game stats/numbers
- Player analytics: Query player behavior data without SQL knowledge
- Economy simulation: Analyze game economy data with LLM-generated charts
- QA data analysis: Natural language queries on test results
