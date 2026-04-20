---
title: Fincept Terminal (Fincept Corporation)
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [fintech, open-source, cpp, qt6]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept Terminal (Fincept Corporation)

## Overview

**Fincept Terminal** is an open-source financial intelligence platform built by **Fincept Corporation**. It delivers Bloomberg-terminal-class analytics in a single native C++20 binary with Qt6 UI, embedded Python analytics, and 100+ data connectors. AGPL-3.0 licensed with commercial option.

- **Version**: 4.0.2
- **Website**: github.com/Fincept-Corporation/FinceptTerminal
- **License**: AGPL-3.0 (open source) + Commercial license available
- **Contact**: support@fincept.in
- **Contact**: https://discord.gg/ae87a8ygbN

## Key Features

| Feature | Details |
|---------|---------|
| CFA-Level Analytics | DCF models, portfolio optimization, VaR/Sharpe, derivatives pricing |
| 37 AI Agents | Trader (Buffett, Graham, Lynch, Munger, Klarman, Marks...), Economic, Geopolitics |
| 100+ Data Connectors | DBnomics, Polygon, Kraken, Yahoo Finance, FRED, IMF, World Bank, AkShare |
| Real-Time Trading | Crypto (Kraken/HyperLiquid WebSocket), 16 broker integrations, algo trading |
| QuantLib Suite | 18 quantitative analysis modules — pricing, risk, stochastic, volatility, fixed income |
| Visual Workflows | Node editor for automation pipelines, MCP tool integration |
| AI Quant Lab | ML models, factor discovery, HFT, reinforcement learning trading |
| Global Intelligence | Maritime tracking, geopolitical analysis, relationship mapping |

## Technology

- **Core**: C++20, Qt6 (Widgets, Charts, Network, Sql, Concurrent, Multimedia)
- **Analytics**: Python 3.11+ via QProcess (100+ scripts outputting JSON)
- **Build**: CMake 3.27.7, Ninja, Unity build
- **Platforms**: Windows (MSVC), macOS (Clang), Linux (GCC)
- **Database**: SQLite with migration system (18 migrations as of v4.0.2)
- **MCP**: Model Context Protocol with 37 tools + external server support
- **LLM**: 9 providers (OpenAI, Anthropic, Gemini, Groq, DeepSeek, MiniMax, OpenRouter, Ollama, Fincept)

## Business Model

- **Free**: AGPL-3.0 for personal, educational, non-commercial use
- **Commercial**: Custom licensing, contact support@fincept.in
- **University**: $799/month for 20 accounts
- **Data/APIs**: Fincept Data & APIs require commercial subscription

## Roadmap

| Timeline | Milestone |
|----------|-----------|
| Shipped | Real-time streaming, 16 broker integrations, multi-account trading, PIN auth, theme system |
| Q2 2026 | Options strategy builder, multi-portfolio management, 50+ AI agents |
| Q3 2026 | Programmatic API, ML training UI, institutional features |
| Future | Mobile companion, cloud sync, community marketplace |

## Architecture Highlights

See [[fincept-terminal-architecture]] for detailed C++ architecture. Key subsystems:

- [[datahub-architecture]] — In-process pub/sub data layer
- [[mcp-system]] — LLM tool calling via MCP
- [[fincept-workflow-engine]] — Visual node-based workflow system
- [[broker-interface]] — Unified trading broker abstraction
- [[python-integration]] — Embedded Python analytics pipeline
- [[fincept-storage-system]] — SQLite with repository pattern
- [[fincept-auth-system]] — JWT auth + MFA + PIN
- [[fincept-ai-agents]] — 37-agent framework
- [[llm-providers]] — 9 LLM provider integration

## Related
- [[fincept-terminal-architecture]]
- [[fincept-terminal-ui-system]]
