# Chrome-GPT

> Source: https://github.com/richardyc/Chrome-GPT
> Captured: 2026-04-13

## Overview

Chrome-GPT is an experimental AutoGPT agent that takes control of an entire Chrome browser session using LangChain + Selenium. The agent can scroll, click, input text, switch tabs, and perform web searches autonomously.

## Key Features

- 🌎 Google search
- 🧠 Long-term and short-term memory management (FAISS)
- 🔨 Chrome actions: describe webpage, scroll, click buttons/links, input forms, switch tabs
- 🤖 Multiple agent types: Zero-shot, BabyAGI, Auto-GPT
- 🔥 Chrome plugin support (in progress)

## Architecture

- **Framework**: LangChain >= 0.0.157
- **Browser**: Selenium 4.9 + Chrome
- **Memory**: FAISS (faiss-cpu)
- **CLI**: Click
- **Agent types**: Auto-GPT, BabyAGI, Zero-shot
- **Python**: >=3.8.1, Poetry-managed

## Directory Structure

```
chromegpt/
├── agent/
│   ├── autogpt/       # Auto-GPT agent implementation
│   ├── chromegpt_agent.py  # Main agent base class
│   ├── zeroshot.py    # Zero-shot agent
│   └── utils.py
├── tools/
│   ├── driver.py      # Chrome WebDriver wrapper
│   ├── selenium.py    # Selenium browser operations
│   └── utils.py
├── __main__.py
└── main.py
```

## Usage

```bash
# GPT-3.5 (default)
python -m chromegpt -v -t "{task}"

# GPT-4 with AutoGPT agent
python -m chromegpt -v -a auto-gpt -m gpt-4 -t "{task}"

# Docker
source .env && docker-compose up
```

## Dependencies

- langchain, selenium, faiss-cpu, openai, tiktoken, bs4, pexpect, click, validators

## Known Limitations

- Buttons/input fields sometimes missing from prompt
- Slow response (1-10s per action)
- LangChain parsing failures possible (try different agent type)

## License

MIT
