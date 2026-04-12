# AI Scientist — Raw Source

**Source:** https://github.com/SakanaAI/AI-Scientist
**Captured:** 2026-04-12
**Project:** AI Scientist (SakanaAI)

---

## Overview

The AI Scientist is the first comprehensive system for fully automatic scientific discovery, enabling Foundation Models (such as LLMs) to conduct research independently — from idea generation to code execution, experiment running, paper writing, and peer review.

## Key Facts

- **Authors:** Chris Lu, Cong Lu, Robert Tjarko Lange, Jakob Foerster, Jeff Clune, David Ha (SakanaAI / University of Oxford / University of British Columbia / Milestone Systems)
- **Paper:** arXiv:2408.06292 (2024)
- **License:** AI Scientist Source Code License (derivative of Responsible AI License)
- **Mandatory Disclosure:** Any scientific manuscript generated must prominently disclose AI usage

## Templates (3 Built-in)

| Template | Domain | Description |
|---|---|---|
| **NanoGPT** | Autoregressive Language Modeling | Transformer next-token prediction on enwik8, shakespeare, text8 |
| **2D Diffusion** | Low-Dimensional Diffusion Models | Improving diffusion sample quality on toy datasets |
| **Grokking** | Neural Network Generalization | Studying generalization and learning speed in deep nets |

Community templates: SEIR (infectious disease), MobileNetV3, Sketch RNN, MACE (quantum chemistry), earthquake prediction, TensorRF, LLM probes.

## Supported Models

- **Anthropic:** Claude 3.5 Sonnet (via API, Bedrock, Vertex AI)
- **OpenAI:** GPT-4o, GPT-4o-mini, o1/o3/o4 family, GPT-4.1
- **DeepSeek:** deepseek-chat, deepseek-coder, deepseek-reasoner
- **Google:** Gemini 1.5/2.0 family
- **OpenRouter:** Llama 3.1 405B
- via LiteLLM / Aider for extensibility

## Architecture / Core Modules

| File | Role |
|---|---|
| `ai_scientist/llm.py` | LLM API abstraction (OpenAI, Anthropic, DeepSeek, Gemini, Bedrock, Vertex) |
| `ai_scientist/generate_ideas.py` | Idea generation from template code + semantic scholar literature search |
| `ai_scientist/perform_experiments.py` | Execute LLM-written code, log results, produce plots |
| `ai_scientist/perform_writeup.py` | Generate LaTeX paper from experimental results |
| `ai_scientist/perform_review.py` | LLM-based peer review (score 1-10, accept/reject) |
| `launch_scientist.py` | Main entry point — orchestrates full pipeline |
| `templates/*/experiment.py` | Per-domain experiment runner |
| `templates/*/plot.py` | Visualization |
| `templates/*/prompt.json` | Template-specific instructions |
| `templates/*/seed_ideas.json` | Example ideas |

## Pipeline (Full Auto-Scientific Discovery)

1. **Idea Generation** — Given template code + seed ideas, LLM proposes new research ideas
2. **Novelty Check** — Semantic Scholar / OpenAlex literature search to verify novelty
3. **Code Execution** — LLM writes and runs experiment code in `experiment.py`
4. **Visualization** — `plot.py` generates figures from results
5. **Paper Writeup** — LaTeX paper auto-generated with abstract, methods, results, citations
6. **Peer Review** — (Optional) LLM reviews the generated paper

## Key Dependencies

```
anthropic, aider-chat, backoff, openai, google-generativeai,
matplotlib, pypdf, pymupdf4llm, torch, numpy, transformers,
datasets, tiktoken, wandb, tqdm
```

Plus per-template: NanoGPT (karpathy/nanoGPT), tiny-diffusion, ema-pytorch, Sea-Snell/grokking.

## Cost & Performance

- ~$15 per paper with Claude Sonnet 3.5
- DeepSeek Coder V2 for cost-effective approach
- Highest success rate: Claude Sonnet 3.5
- Best reviews: GPT-4o (others show positivity bias)

## Safety

- Executes LLM-written code — must containerize and restrict web access
- Community Docker image available at `experimental/Dockerfile`
- Mandatory AI disclosure in any generated papers

## Related Tools

- [[AutoGPT]] — autonomous agent framework
- [[BabyAGI]] — task-driven autonomous agent
- [[Claude]] — foundation model used as backend
- [[DeepSeek-Coder]] — cost-effective code generation model
