---
title: PythonRunner Integration
created: 2026-04-20
updated: 2026-04-20
type: concept
tags: [python-integration, cpp, qt6, analytics]
sources: [local/FinceptTerminal/fincept-qt/src/python/PythonRunner.h]
---

# PythonRunner Integration

## Overview

C++ 通过 `PythonRunner` (QProcess 子进程) 调用 `scripts/` 下 100+ Python 脚本。脚本输出 JSON 到 stdout，C++ 解析后通过 DataHub 分发。

## PythonRunner API

```cpp
struct PythonResult {
    bool success = false;
    QString output;
    QString error;
    int exit_code = -1;
};

// 异步运行，callback 在 Qt event loop 调用
void run(const QString& script, const QStringList& args, Callback cb, StreamCallback on_line = {});

// 运行任意 Python 代码（notebook/colab cells）
void run_code(const QString& code, Callback cb);

QString python_path() const;  // 解析 python 路径（venv 或 system PATH）
QString scripts_dir() const;  // scripts/ 目录路径
```

## Data Flow

```
C++ (PythonRunner.cpp)
    │
    ▼
QProcess spawns Python interpreter
    │
    ▼
Executes script (scripts/*.py)
    │
    ▼
Script outputs JSON to stdout
    │
    ▼
C++ reads stdout, parses QJsonDocument
    │
    ▼
Data returned to calling service/screen
```

## scripts/ 目录

100+ 脚本覆盖:

| 类别 | 示例 |
|------|------|
| 市场数据 | akshare_data.py, akshare_crypto.py, ak_share_derivatives.py |
| 经济数据 | akshare_economics_china.py, dbnomics_data.py |
| 政府数据 | gov_data.py, adb_data.py |
| 加密货币 | akshare_crypto.py, aisstream_data.py |
| 量化分析 | ai_quant_lab/* |
| Agent | agents/*, agno_trading_service.py |

## Key Pattern

1. Python 脚本通过 `argparse` 接收参数
2. 输出结构化 JSON 到 stdout (用 `json.dumps()`)
3. stderr 用于日志/调试信息
4. C++ 端捕获 stdout，解析 QJsonDocument
5. 并发限制避免系统过载

## 优点

- **隔离**: Python 崩溃不影响 C++ 主进程
- **兼容性**: 任何有 Python 3.11+ 的平台都能运行
- **灵活性**: 数据科学家可用原生 Python 写分析逻辑
- **复用**: 社区的 Python 库（AkShare、QuantLib 等）直接可用

## 缺点

- 进程间通信开销（相比 embedded Python interpreter）
- JSON 序列化/反序列化开销
- 需要处理 Python 环境管理

## Related
- [[fincept-terminal-architecture]]
- [[datahub-architecture]]
