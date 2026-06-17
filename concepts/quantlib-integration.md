---
title: QuantLib Integration
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [quantlib, quant, cpp, derivatives, pricing]
sources: [raw/articles/fincept-terminal-v4-source-study.md]
---

# QuantLib Integration (Quantitative Analysis Suite)

## Overview

Fincept Terminal 通过 `QuantLibClient` 封装 QuantLib 库，提供 18 个量化分析模块，覆盖衍生品定价、风险管理、随机过程、波动率建模和固定收益分析。

## Architecture

### QuantLibClient
- C++ 封装层，桥接 QuantLib C++ 库与 Fincept 应用
- 通过 Python 脚本或直接 C++ 调用
- 结果返回 JSON 供 UI 展示

### 18 Quantitative Analysis Modules

| Category | Modules |
|----------|---------|
| **Pricing** | 期权定价 (Black-Scholes, Binomial, Monte Carlo) |
| **Risk** | VaR, Greeks (Delta/Gamma/Theta/Vega/Rho) |
| **Stochastic** | 随机过程模拟 (GBM, Heston, CIR) |
| **Volatility** | 波动率曲面、隐含波动率计算 |
| **Fixed Income** | 债券定价、收益率曲线、久期/凸性 |

## UI Integration

- `QuantLibScreen` — 主分析界面
- 参数化输入 (标的、行权价、到期日、波动率等)
- 图表可视化 (Qt6 Charts)
- 结果导出

## Use Cases

1. **Derivatives Pricing**: 欧式/美式期权定价
2. **Risk Analysis**: 投资组合 VaR 计算
3. **Volatility Surface**: 隐含波动率曲面构建
4. **Bond Analysis**: 固定收益产品估值
5. **Monte Carlo**: 随机路径模拟

## Related
- [[fincept-terminal-architecture]]
- [[python-integration]]
- [[broker-interface]]
