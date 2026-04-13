---
title: Chrome-GPT
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai, llm, agent, tool, open-source]
sources: [raw/articles/ai-game-devtools/chrome-gpt.md]
---

# Chrome-GPT

An experimental AutoGPT agent that takes control of an entire Chrome browser session, enabling autonomous web browsing and interaction.

## Overview

Chrome-GPT drives a real Chrome browser via Selenium, giving an LLM agent the ability to scroll, click buttons, fill forms, search Google, and switch tabs — essentially automating any task a human can do in a browser. It wraps LangChain agents around Selenium WebDriver operations.

## Key Features

- 🌎 **Google Search** — agent-initiated web search
- 🧠 **Memory** — FAISS-backed long-term + short-term memory (embeddings via OpenAI/tiktoken)
- 🔨 **Chrome Actions** — describe page, scroll, click links/buttons, input text, switch tabs
- 🤖 **Multi-Agent** — supports Zero-shot, [[auto-gpt|Auto-GPT]], and BabyAGI agent types
- ⌨️ **CLI** — `python -m chromegpt` with Click-based argument parsing

## Architecture

| Component | Technology |
|---|---|
| Agent framework | [[langchain]] >= 0.0.157 |
| Browser automation | Selenium 4.9 + Chrome WebDriver |
| Memory vector store | FAISS (faiss-cpu) |
| Embeddings | OpenAI `tiktoken` tokenizers |
| CLI | Click 8.1 |
| Package manager | Poetry |

### Core Modules

```
chromegpt/
├── agent/
│   ├── autogpt/          # Auto-GPT-style agent loop
│   ├── chromegpt_agent.py  # Base agent abstraction
│   ├── zeroshot.py       # Zero-shot react agent
│   └── utils.py
├── tools/
│   ├── driver.py         # WebDriver lifecycle manager
│   ├── selenium.py       # Browser action primitives (scroll, click, input)
│   └── utils.py
├── __main__.py
└── main.py
```

## Usage

```bash
# GPT-3.5 (default)
python -m chromegpt -v -t "Find me a bar near Chelsea for 20 people"

# GPT-4 + AutoGPT agent
python -m chromegpt -v -a auto-gpt -m gpt-4 -t "{task}"

# Docker
source .env && docker-compose up
```

## Comparison with Related Tools

Chrome-GPT is distinct from general browser agents in that it explicitly supports AutoGPT and BabyAGI agent paradigms running against real Chrome, rather than using a headless/puppeteer approach. It is comparable to [[auto-gpt]]'s browser extension approach but more directly integrated with Selenium.

## Known Limitations

- Buttons/input fields occasionally missing from DOM description
- Slow response time (1–10s per action)
- LangChain output parsing failures possible (workaround: switch agent type)

## License

MIT

## Links

- GitHub: https://github.com/richardyc/Chrome-GPT
