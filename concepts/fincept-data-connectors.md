---
title: Fincept Data Connectors
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [data, api, market-data, architecture]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# Fincept Data Connectors (100+ Data Sources)

## Overview

Fincept Terminal 集成 100+ 数据连接器，覆盖市场数据、经济数据、另类数据等多维度金融信息源。通过 Python 脚本和 C++ HTTP 客户端两种方式接入。

## Data Source Categories

### Market Data
| Source | Type | Access |
|--------|------|--------|
| Yahoo Finance | 股票/ETF/指数 | HTTP API |
| Polygon | 股票/期权实时行情 | REST + WebSocket |
| Kraken | 加密货币 | WebSocket |
| HyperLiquid | 加密货币衍生品 | WebSocket |
| AkShare | A 股/港股/期货 | Python |

### Economic Data
| Source | Type | Access |
|--------|------|--------|
| FRED | 美国经济数据 | HTTP API |
| IMF | 国际货币基金组织 | HTTP API |
| World Bank | 全球发展指标 | HTTP API |
| DBnomics | 多源经济数据聚合 | HTTP API |
| ADB | 亚洲开发银行 | HTTP API |

### Government Data
| Source | Type | Access |
|--------|------|--------|
| Government APIs | 各国政府开放数据 | HTTP API |
| Edgar/SEC | 美国 SEC  filings | HTTP API |

### Alternative Data
| Source | Type | Access |
|--------|------|--------|
| Adanos | 市场情绪 (Reddit/X/News/Polymarket) | HTTP API |
| Polymarket | 预测市场 | HTTP API |

### Data Architecture

数据通过 [[datahub-architecture]] 分发:
- Python 脚本 → stdout JSON → PythonRunner → DataHub → UI widgets
- C++ HttpClient → 直接解析 → DataHub
- WebSocket → 实时流 → DataHub

### Data Normalization

`data_normalization` service 负责:
- 不同源的数据格式统一
- Symbol 映射 (AAPL vs 000001.SZ)
- 时间戳对齐

### DataSourceRepository

持久化存储:
- 数据源连接配置
- API Key 管理
- 启用/禁用状态

## Related
- [[fincept-terminal-architecture]]
- [[datahub-architecture]]
- [[python-integration]]
- [[fincept-storage-system]]
