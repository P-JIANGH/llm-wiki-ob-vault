---
title: Fincept Terminal Architecture
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [architecture, cpp, qt6, fintech]
sources: [local/FinceptTerminal]
---

# Fincept Terminal Architecture

## Overview

**Fincept Terminal v4** 是纯原生 C++20 桌面应用，使用 Qt6 做 UI 和渲染，嵌入 Python 3.11+ 做分析引擎，在单一原生二进制中提供 Bloomberg Terminal 级别的性能。跨 Windows/macOS/Linux 三平台。

- **License**: AGPL-3.0
- **Version**: 4.0.2 (2026-03)
- **Repo**: github.com/Fincept-Corporation/FinceptTerminal

## Technology Stack

| 组件 | 技术 | 用途 |
|------|------|------|
| 核心语言 | C++20 | 应用主体 |
| UI框架 | Qt6 Widgets | 原生保留模式 GUI |
| 图表 | Qt6 Charts | 金融图表 |
| 网络 | Qt6 Network + WebSockets | HTTP API、TLS、实时流 |
| 数据库 | Qt6 Sql (SQLite) | 本地存储、缓存 |
| 分析引擎 | Python 3.11+ | 嵌入式运行时执行脚本 |
| 构建 | CMake 3.20+ | 跨平台构建 |

## Source Architecture

```
fincept-qt/src/
├── app/                  MainWindow + ScreenRouter (QStackedWidget 导航)
├── core/                 共享基础设施
│   ├── config/           AppConfig、AppPaths、ProfileManager
│   ├── events/           EventBus (发布/订阅解耦通信)
│   ├── logging/          Logger (LOG_INFO/LOG_ERROR)
│   ├── result/           Result<T> 错误处理
│   ├── session/          SessionManager、ScreenStateManager
│   └── keys/             KeyConfigManager
├── datahub/              ★ 进程内 pub/sub 数据层 (Phase 0-10 完成)
├── mcp/                  MCP 协议客户端 + 37个 Tool
│   └── tools/            AiChat/DataHub/Trading/News 等
├── ai_chat/              AI 聊天 + LlmService 多 Provider
├── network/              HttpClient + WebSocketClient
├── python/               PythonRunner (QProcess 子进程)
├── storage/              SQLite + Cache + SecureStorage + 13 Repository
├── auth/                 JWT 登录、会话守卫、PIN/TOTP
├── trading/              交易引擎
│   ├── brokers/          20+ broker (Zerodha/Fyers/IBKR/Alpaca/Saxo等)
│   ├── websocket/         AngelOne/Zerodha 实时行情
│   └── instruments/       Zerodha/Groww 合约解析
├── services/             28 服务 (MarketData/News/Agent/AIQuantLab等)
├── screens/              55+ 屏幕
└── ui/                  Obsidian 风格组件库
    ├── theme/            Theme + StyleSheets + ThemeManager
    ├── widgets/          Card、SearchBar、StatusBadge 等
    ├── navigation/       NavigationBar、FKeyBar、StatusBar
    ├── charts/           ChartFactory
    ├── tables/           DataTable
    └── markdown/         MarkdownRenderer
```

## Design Patterns

### Screen/Service Separation

严格分离：
- **Screens** (`*Screen.cpp`) — 仅渲染 UI，无 HTTP 调用，无业务逻辑
- **Services** (`*Service.cpp`) — 处理获取、缓存、处理
- Screens 通过 Qt signals/slots 连接 Services，绝不直接调用 `HttpClient`

```
User Interaction
      │
      ▼
Screen (*Screen.cpp)         ← UI 渲染 (QWidget subclass)
      │  signals/slots
      ▼
Service (*Service.cpp)       ← Fetching, caching, processing
      │
      ├─── HttpClient        ← API calls (QNetworkAccessManager)
      ├─── PythonRunner      ← Analytics scripts
      └─── Database          ← Local storage (Qt Sql / SQLite)
```

### Threading Model
- UI 代码仅在主线程运行 (Qt 强制要求)
- 后台工作通过 `QThread` 或 `QtConcurrent`
- 结果通过 `QMetaObject::invokeMethod` 或跨线程 signal/slot 回到 UI 线程
- 共享状态用 `QMutex` 保护

### Result<T> Error Handling
```cpp
template <typename T>
class Result {
    static Result ok(T value);
    static Result err(std::string message);
    bool is_ok() const;
    T& value();
    const std::string& error() const;
    template <typename F> auto map(F&& f) const;
};
```

## Key Subsystems

### DataHub (pub/sub)
- 进程内数据总线，解决 20+ widget 独立轮询问题
- Topic 格式: `domain:subdomain:id[:modifier]`
- 见 [[datahub-architecture]]

### MCP System
- Model Context Protocol，让 LLM 调用原生工具
- McpManager 管理外部 MCP Server 生命周期
- 37 个 Tool 覆盖市场/新闻/Portfolio/交易等
- 见 [[mcp-system]]

### Python Integration
- `PythonRunner` 通过 QProcess spawn Python 解释器
- 100+ scripts 输出 JSON 到 stdout
- C++ 解析后通过 DataHub 分发
- 见 [[python-integration]]

### Trading Engine
- BrokerInterface 统一抽象
- 20+ broker: Indian (Zerodha/Fyers/AngelOne/Upstox/Dhan/Kotak等)、International (IBKR/Alpaca/Saxo/Tradier)
- WebSocket 实时行情
- 见 [[broker-interface]]

## 55+ Screens

auth (Login/Register/Pricing)、dashboard (13 widgets)、markets、news、watchlist、crypto_trading、equity_trading、portfolio、equity_research、node_editor、AI_quant_lab、algo_trading、geopolitics、maritime、backtesting、quantlib、alpha_arena 等。

## Build System

- 编译器强制检查: MSVC 19.38+ / GCC 12.3+ / Clang 15.0+
- ccache/sccache 支持
- Unity build (CMAKE_UNITY_BUILD ON, batch size 14)
- 三平台: Windows (MSVC + windeployqt)、macOS (Clang + macdeployqt)、Linux (GCC)

## Related
- [[datahub-architecture]]
- [[mcp-system]]
- [[python-integration]]
- [[broker-interface]]
- [[llm-providers]]
