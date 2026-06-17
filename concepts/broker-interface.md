---
title: BrokerInterface Architecture
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [broker, architecture, fintech]
sources: [local/FinceptTerminal/fincept-qt/src/trading/BrokerInterface.h]
---

# BrokerInterface Architecture

## Overview

统一的 broker 抽象接口，`BrokerInterface` 是所有 broker 适配器的基类。支持 20+ broker，覆盖 Indian、US、International 市场。

## Broker Credential Fields

```cpp
enum class CredentialField {
    ApiKey,      // API Key / Client ID
    ApiSecret,   // API Secret / Secret Key / MPIN
    AuthCode,    // Auth Code / TOTP secret (base32)
    Environment, // Live / Paper — Alpaca only
    ClientCode,  // AngelOne: client code separate from API key
    Password,    // Zerodha login password (auto-login flow)
    TotpSecret,  // Zerodha Base32 TOTP secret (auto-login flow)
    UserId       // Zerodha Kite user id (e.g., AB1234)
};
```

## Broker Profiles

每个 broker 返回自己的 `BrokerProfile`，UI 据此渲染配置表单。

## Supported Brokers

### Indian Brokers
- Zerodha (Kite)
- Fyers
- Angel One
- Upstox
- Dhan
- Kotak
- Motilal Oswal
- IIFL
- 5paisa
- AliceBlue
- Shoonya
- Groww

### International Brokers
- IBKR (Interactive Brokers)
- Alpaca
- Tradier
- Saxo Bank

## Trading Types

```cpp
// Order types
enum class OrderType { MARKET, LIMIT, SL, SLM };
// Product types
enum class ProductType { CNC, MIS, NRML };
// Order sides
enum class OrderSide { BUY, SELL };
// Status
enum class OrderStatus { PENDING, OPEN, COMPLETE, CANCELLED, REJECTED };
```

## WebSocket Real-time Data

- `ZerodhaWebSocket` — Zerodha Kite WebSocket
- `AngelOneWebSocket` — Angel One Smart API WebSocket

Tick types defined in:
- `trading/websocket/ZerodhaTickTypes.h`
- `trading/websocket/AngelOneTickTypes.h`

## Instrument Parsers

- `ZerodhaInstrumentParser` — Zerodha 合约解析
- `GrowwInstrumentParser` — Groww 合约解析

## Paper Trading

`PaperTrading` — 纸交易引擎，用于模拟交易。

## Related
- [[fincept-terminal-architecture]]
- [[python-integration]]
