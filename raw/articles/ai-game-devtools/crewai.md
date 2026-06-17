# CrewAI Source (2026-04-15)

## Project Info
- **Name**: CrewAI
- **URL**: https://github.com/joaomdmoura/crewAI
- **License**: MIT
- **Python**: >=3.10 <3.14
- **Package Manager**: UV

## Architecture

### Monorepo Structure
```
lib/
├── crewai/           # Core framework
├── crewai-tools/     # Tools library (SerperDevTool, etc.)
├── crewai-files/     # File handling
└── devtools/         # Development tools
```

### Core Components
- **Agent**: Autonomous AI agent with role, goal, backstory
- **Task**: Unit of work assigned to an agent
- **Crew**: Team of agents working together
- **Process**: Sequential or hierarchical task execution
- **Flow**: Event-driven production architecture for complex workflows
- **LLM**: Language model abstraction (OpenAI, Ollama, etc.)

### Key Modules
- `agent/` - Agent implementation
- `agents/` - Multi-agent coordination
- `crew.py` - Crew orchestration
- `crews/` - Crew configurations
- `flow/` - Event-driven flows (@start, @listen, @router)
- `tasks/` - Task definitions
- `llm.py` / `llms/` - LLM integrations
- `memory/` - Memory system
- `tools/` - Built-in tools
- `cli/` - crewai CLI (create crew, run, install, update)
- `project/` - @CrewBase decorator for type-safe crew definition
- `knowledge/` - Knowledge management
- `rag/` - RAG capabilities
- `mcp/` - MCP protocol support
- `process.py` - Process types (sequential, hierarchical)

## Key Features
- Standalone framework (no LangChain dependency)
- Crews: Autonomous multi-agent collaboration
- Flows: Event-driven production workflows with @start/@listen/@router decorators
- YAML config for agents/tasks (agents.yaml, tasks.yaml)
- Pydantic BaseModel for structured state
- Hierarchical process with manager agent
- Human-in-the-loop support
- Built-in telemetry (anonymous, opt-out via OTEL_SDK_DISABLED)
- CrewAI AMP Suite: enterprise control plane, observability, security

## Comparison (from README)
- vs LangGraph: 5.76x faster, less boilerplate
- vs AutoGen: Built-in process concept (vs manual orchestration)
- vs ChatDev: More flexible, production-oriented

## Examples
- Trip Planner, Stock Analysis, Landing Page Generator
- crewai create crew <name> → generates project scaffold
- crewai run → execute crew

## Dependencies
- pydantic, httpx, openai, langchain-core (optional)
- crewai-tools: SerperDevTool, etc.
