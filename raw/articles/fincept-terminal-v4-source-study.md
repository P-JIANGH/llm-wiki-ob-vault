# Fincept Terminal v4 — Source Code Study

## Project Info
- **Name**: Fincept Terminal v4.0.2
- **Repo**: github.com/Fincept-Corporation/FinceptTerminal
- **License**: AGPL-3.0 + Commercial
- **Language**: C++20 with Qt6 (Widgets, Charts, Network, Sql, Concurrent, Multimedia)
- **Python**: 3.11+ embedded via QProcess for analytics (100+ scripts)
- **Platforms**: Windows (MSVC), macOS (Clang), Linux (GCC)

## Architecture Summary

### Source Layout (fincept-qt/src/)
| Module | Files | Purpose |
|--------|-------|---------|
| screens/ | 553 | UI screens (dashboard, markets, trading, portfolio, etc.) |
| services/ | 172 | Business logic services (MarketData, News, Agents, etc.) |
| trading/ | 93 | Trading engine with 20+ broker adapters |
| storage/ | 75 | SQLite + Repository pattern + Cache + SecureStorage |
| mcp/ | 61 | MCP protocol + 37 tools + external server management |
| ui/ | 55 | Obsidian-style component library |
| core/ | 19 | Config, EventBus, Logging, Result<T>, Session |
| auth/ | 13 | JWT login, MFA, PIN management |
| app/ | 7 | MainWindow, ScreenRouter, main.cpp |
| datahub/ | 6 | Pub/sub in-process data layer |
| ai_chat/ | 6 | AI chat + LlmService (9 providers) |
| network/ | 4 | HttpClient + WebSocketClient |
| python/ | 4 | PythonRunner (QProcess sub-process) |

### Key Dependencies (FetchContent)
- **QXlsx** v1.4.9 — Excel file I/O (requires Qt6::GuiPrivate)
- **md4c** release-0.5.2 — CommonMark markdown parser → HTML
- **QGeoView** — Interactive map widget with OSM tiles

### Build System
- CMake 3.27.7 (pinned)
- Ninja 1.11.1
- Unity build ON (batch size 14)
- ccache/sccache support
- Qt 6.8.3 (exact pinned)
- Compiler enforcement: MSVC 19.38+ / GCC 12.3+ / Clang 15.0+

## 100+ Data Connectors
DBnomics, Polygon, Kraken, Yahoo Finance, FRED, IMF, World Bank, AkShare, government APIs, Adanos market sentiment

## 16 Broker Integrations
Zerodha, Angel One, Upstox, Fyers, Dhan, Groww, Kotak, IIFL, 5paisa, AliceBlue, Shoonya, Motilal, IBKR, Alpaca, Tradier, Saxo

## 37 AI Agents
Trader/Investor (Buffett, Graham, Lynch, Munger, Klarman, Marks...), Economic, Geopolitics

## Key Patterns
1. Screen/Service separation (screens = UI only, services = business logic)
2. DataHub pub/sub for data state distribution
3. Result<T> error handling (no exceptions)
4. ScreenRouter with lazy screen creation (factory pattern)
5. Repository pattern for SQLite storage
6. BrokerInterface adapter pattern for trading
7. Workflow engine with DAG execution (topological sort)
8. Node editor for visual workflow building
9. MCP integration for LLM tool calling
10. QProcess-based Python integration (isolation over embedded interpreter)
