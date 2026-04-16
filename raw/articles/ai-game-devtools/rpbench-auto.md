# RPBench-Auto — Source Article

**URL:** https://github.com/boson-ai/RPBench-Auto
**Captured:** 2026-04-16

## README

An automated pipeline for evaluating LLMs for role-playing.

- [Leaderboard](https://boson.ai/rpbench/)
- [Blog](https://boson.ai/rpbench-blog/)

## Architecture

### Core Components

1. **run_character_eval.py** — Evaluate models on the character subset (NPC role-playing)
   - Uses `RPBENCH_PATH = "data/rpbench_character.jsonl"` dataset
   - Pairwise comparison: model_1 vs model_2 (default baseline: gpt-4o)
   - Judge LLM simulates user interaction, picks winner each round
   - MAX_MESSAGES_PER_CHAR = 5 rounds per character
   - Random assignment of model_a/model_b to avoid position bias

2. **run_scene_eval.py** — Evaluate models on the scene subset
   - Similar pairwise arena-style evaluation for scene-based role-playing

3. **calculate_metrics.py** — Elo rating calculation
   - Three methods: online Elo, MLE (Bradley-Terry), WHR (Whole History Rating)
   - Bootstrap confidence intervals
   - Win rate matrix visualization
   - Produces leaderboard.csv and leaderboard_for_display.csv

4. **utils.py** — Multi-provider API abstraction
   - Supports: OpenAI, Anthropic, Mistral, Azure OpenAI, Cohere
   - Retry logic (16 retries, 10s sleep)
   - JSON extraction/repair for judge responses
   - Adapted from ArenaHard-AlpacaEval

### Evaluation Pipeline

```
NPC Profile + Conversation Data
    → Two Models Generate Responses (randomized A/B)
    → Judge LLM picks winner + generates next user input
    → Repeat 5 rounds per character
    → Collect all pairwise results
    → Calculate Elo ratings (MLE/Online/WHR)
    → Generate leaderboard
```

### Judge System Prompt

The judge LLM receives:
- Full NPC profile (name, title, description, definition, long definition)
- Both model responses
- Must output JSON: `{winner: "model_a"/"model_b", next_round_user_speaks: "...", decision_reason: "..."}`

### Supported Models in Leaderboard (from config/api_config.yaml)

| Model | Provider | Notes |
|-------|----------|-------|
| GPT-4o | OpenAI | Default baseline |
| GPT-4-Turbo | OpenAI | |
| GPT-4 | OpenAI | |
| GPT-3.5-Turbo | OpenAI | |
| Claude-3 Opus | Anthropic | |
| Claude-3.5 Sonnet | Anthropic | |
| Higgs-Llama-3 70B V1/V2 | Boson.ai | OpenAI-compatible API |
| DeepSeek-V2 | DeepSeek | OpenAI-compatible API |
| MiniMax abab6.5s | MiniMax | OpenAI-compatible API |
| Mistral Large | Mistral | |
| Gemini 1.5 Pro | Google | Not supported (multi-turn limitation) |
| Yi Large | 01.AI | OpenAI-compatible API |
| Qwen2 72B Instruct | Alibaba | |
| Llama-3/3.1 (8B/70B/405B) | Meta | |
| Character.AI | Character.AI | Special type |

### Dependencies

jsonlines, tqdm, openai, anthropic, json_repair==0.11.1, pyyaml, requests, whole-history-rating, pandas, numpy, matplotlib, scikit-learn, tiktoken

### License

Apache 2.0

### Key Design Patterns

- **Arena-Hard style**: Inspired by lm-sys/arena-hard-auto and tatsu-lab/alpaca-eval
- **Pairwise Arena**: Two models compete per sample, judge picks winner
- **Position Randomization**: A/B assignment randomized to avoid position bias
- **Multi-provider API**: Single `chat_completion()` function routes to correct provider
- **Elo Rating**: Three calculation methods for robustness
