# KwaiAgents

> Cloned from https://github.com/KwaiKEG/KwaiAgents via gitcode.com mirror
> Date: 2026-04-16

## Source README (English)

KwaiAgents is a series of Agent-related works open-sourced by the KwaiKEG from Kuaishou Technology. The open-sourced content includes:

1. **KAgentSys-Lite**: a lite version of the KAgentSys in the paper. While retaining some of the original system's functionality, KAgentSys-Lite has certain differences and limitations when compared to its full-featured counterpart, such as: (1) a more limited set of tools; (2) a lack of memory mechanisms; (3) slightly reduced performance capabilities; and (4) a different codebase, as it evolves from open-source projects like BabyAGI and Auto-GPT.
2. **KAgentLMs**: a series of large language models with agent capabilities such as planning, reflection, and tool-use, acquired through the Meta-agent tuning proposed in the paper.
3. **KAgentInstruct**: over 200k Agent-related instructions finetuning data (partially human-edited) proposed in the paper.
4. **KAgentBench**: over 3,000 human-edited, automated evaluation data for testing Agent capabilities, with evaluation dimensions including planning, tool-use, reflection, concluding, and profiling.

## Models

| Type | Models | Training Data | Benchmark Data |
|------|--------|---------------|----------------|
| Qwen | Qwen-7B-MAT, Qwen-14B-MAT, Qwen-7B-MAT-cpp, Qwen1.5-14B-MAT | KAgentInstruct | KAgentBench |
| Baichuan | Baichuan2-13B-MAT | KAgentInstruct | KAgentBench |

## Benchmark Results

### Automatic Evaluation

| Model | Scale | Planning | Tool-use | Reflection | Concluding | Profile | Overall |
|-------|-------|----------|----------|------------|------------|---------|---------|
| GPT-3.5-turbo | - | 18.55 | 26.26 | 8.06 | 37.26 | 35.42 | 25.63 |
| Llama2 | 13B | 0.15 | 0.44 | 0.14 | 16.60 | 17.73 | 5.30 |
| ChatGLM3 | 6B | 7.87 | 11.84 | 7.52 | 30.01 | 30.14 | 15.88 |
| Qwen | 7B | 13.34 | 18.00 | 7.91 | 36.24 | 34.99 | 21.17 |
| Baichuan2 | 13B | 6.70 | 16.10 | 6.76 | 24.97 | 19.08 | 14.89 |
| ToolLlama | 7B | 0.20 | 4.83 | 1.06 | 15.62 | 10.66 | 6.04 |
| AgentLM | 13B | 0.17 | 0.15 | 0.05 | 16.30 | 15.22 | 4.88 |
| Qwen-MAT | 7B | 31.64 | 43.30 | 33.34 | 44.85 | 44.78 | 39.85 |
| Baichuan2-MAT | 13B | 37.27 | 52.97 | 37.00 | 48.01 | 41.83 | 45.34 |
| Qwen-MAT | 14B | 43.17 | 63.78 | 32.14 | 45.47 | 45.22 | 49.94 |
| Qwen1.5-MAT | 14B | 42.42 | 64.62 | 30.58 | 46.51 | 45.95 | 50.18 |

### Human Evaluation

| Model | Scale | NoAgent | ReACT | Auto-GPT | KAgentSys |
|-------|-------|---------|-------|----------|-----------|
| GPT-4 | - | 57.21% (3.42) | 68.66% (3.88) | 79.60% (4.27) | 83.58% (4.47) |
| GPT-3.5-turbo | - | 47.26% (3.08) | 54.23% (3.33) | 61.74% (3.53) | 64.18% (3.69) |
| Qwen | 7B | 52.74% (3.23) | 51.74% (3.20) | 50.25% (3.11) | 54.23% (3.27) |
| Baichuan2 | 13B | 54.23% (3.31) | 55.72% (3.36) | 57.21% (3.37) | 58.71% (3.54) |
| Qwen-MAT | 7B | - | 58.71% (3.53) | 65.67% (3.77) | 67.66% (3.87) |
| Baichuan2-MAT | 13B | - | 61.19% (3.60) | 66.67% (3.86) | 74.13% (4.11) |

## Architecture

### KAgentSys-Lite
CLI-based agent system inspired by BabyAGI and Auto-GPT. Supports:
- Planning, reflection, tool-use
- Weather API, web search, browse_website tools
- Both OpenAI API and local vLLM deployment

### KAgentBench
Evaluation benchmark with 4 dimensions:
- Planning & Tool-use: 320 queries, 1,317 instructions, avg 8.68 tools
- Reflection: 68 queries, 272 instructions
- Concluding: 245 queries, 1,225 instructions
- Profile: 433 queries

## Key Files

- `README.md` - Main documentation
- `benchmark/README.md` - KAgentBench evaluation details
- `requirements.txt` - Python dependencies
- `setup.py` - Package installation
- `kwaiagents/` - KAgentSys-Lite source code
- `benchmark/` - KAgentBench evaluation code

## Citation

@article{pan2023kwaiagents,
  author    = {Haojie Pan and Zepeng Zhai and Hao Yuan and Yaojia Lv and Ruiji Fu and Ming Liu and Zhongyuan Wang and Bing Qin},
  title     = {KwaiAgents: Generalized Information-seeking Agent System with Large Language Models},
  journal   = {CoRR},
  volume    = {abs/2312.04889},
  year      = {2023}
}
