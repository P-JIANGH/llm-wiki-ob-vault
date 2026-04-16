# GenAgent / ComfyBench

> GitHub: https://github.com/xxyQwQ/GenAgent
> Paper: ComfyBench: Benchmarking LLM-based Agents in ComfyUI for Autonomously Designing Collaborative AI Systems (CVPR 2025)
> Authors: Xiangyuan Xue, Zeyu Lu, Di Huang, Zidong Wang, Wanli Ouyang, Lei Bai

## Project Overview

GenAgent is the reference implementation of **ComfyAgent** — an LLM-based agent that autonomously designs collaborative AI systems in ComfyUI by generating Stable Diffusion workflows. The project also includes **ComfyBench**, a comprehensive benchmark evaluating agents' ability to create and execute ComfyUI workflows.

## Architecture

### Core Components

- **ComfyPipeline** (`agent/comfy.py`): Main agent pipeline — Analyzer → Planner → Combiner/Adapter/Refiner loop
- **ComfyAgentState**: Tracks instruction, analysis, reference_list, step_limitation, history_list, workspace_dict
- **ReferenceStorage** (`utils/model.py`): RAG-based retrieval of reference workflows
- **execute_prompt** (`utils/comfy.py`): Sends workflow to ComfyUI server and returns outputs

### Agent Loop (5-step limitation by default)

1. **Analyzer**: Analyzes task instruction → identifies core requirements and paradigm (T2I, I2I, etc.)
2. **Planner**: Plans next action — `load`, `combine`, `adapt`, `retrieve`, or `finish`
3. **Combiner**: Combines current workspace with reference workflow (generates `<code>` + `<function>` + `<principle>`)
4. **Adapter**: Adapts parameters in current workflow
5. **Refiner**: Fixes execution errors in workflow code

### Multiple Agent Variants

- `zeroshot` — No reference, direct generation
- `fewshot` — Few-shot prompting with examples
- `cot` — Chain-of-thought reasoning
- `cotsc` — CoT with self-consistency (multiple trajectories)
- `rag` — RAG retrieval from workflow corpus
- `crp` — Cross-referential planning with multiple rounds
- `mad` — Multi-agent debate with multiple solvers
- `comfy` — Full ComfyAgent pipeline (default)
- Ablation variants: `comfy_no_adapt`, `comfy_no_combine`, `comfy_no_refine`, `comfy_no_retrieve`, `rag_json_representation`, `rag_list_representation`

### Workflow Representation

ComfyUI workflows are represented as equivalent Python code — each statement = one node execution:
```python
output = node(input)
```

### ComfyBench Benchmark

- **3205 nodes** documented in `dataset/benchmark/document/`
- **20 curriculum workflows** for agent learning
- **200 task instructions** in `complete.json`, 10-sample validation set
- Metrics: *pass rate* (correct execution) + *resolve rate* (task requirements met)
- Resource files for ComfyUI in `dataset/benchmark/resource/`

## Key Files

| File | Purpose |
|------|---------|
| `main.py` | Entry point — parses args, creates pipeline, generates & executes workflow |
| `agent/comfy.py` | ComfyPipeline — Analyzer + Planner/Combiner/Adapter/Refiner loop |
| `agent/rag.py` | RAGPipeline — retrieval-augmented generation from workflow corpus |
| `agent/crp.py` | CRPPipeline — cross-referential planning |
| `agent/mad.py` | MADPipeline — multi-agent debate |
| `utils/comfy.py` | execute_prompt — ComfyUI server API client |
| `utils/model.py` | ReferenceStorage + invoke_completion (LLM API wrapper) |
| `utils/parser.py` | Workflow JSON ↔ Python code conversion |
| `config.yaml` | ComfyUI address, embedding/completion/vision API settings |

## Dependencies

- Python 3.12, conda environment `comfybench`
- langchain-core, beautifulsoup4 (HTML parsing)
- ComfyUI server running at `127.0.0.1:8188` (configurable)
- Models and extensions for ComfyUI (auto-install + manual download from HuggingFace/Cloud Drive)
- APIs: OpenAI GPT-4o (default for completion/vision), text-embedding-3-large (default for retrieval)

## License

Not explicitly stated in README (see GitHub repo for license)

## Related

- ComfyUI — node-based Stable Diffusion workflow editor and runtime
- [[ai-game-devtools/comfyui]] — ComfyUI wiki page (if exists)
- [[ai-game-devtools/agentbench]] — THUDM LLM Agent benchmark (similar evaluation framework)
- [[ai-game-devtools/autogen]] — Microsoft multi-agent framework
- [[ai-game-devtools/crewai]] — crewAI multi-agent framework
