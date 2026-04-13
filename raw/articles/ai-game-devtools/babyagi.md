# BabyAGI

> Source: https://github.com/yoheinakajima/babyagi

## 项目概述

**Self-Building Autonomous Agent Framework**

BabyAGI 是一个实验性框架，核心是一个名为 **functionz** 的新型函数框架，用于存储、管理和执行数据库中的函数。它提供基于图的结构来跟踪导入、依赖函数和认证密钥，具有自动加载和全面日志记录功能。此外，它还附带一个仪表板用于管理函数、运行更新和查看日志。

> [!NOTE]
> 原始 BabyAGI（2023年3月）引入了任务规划作为开发自主 Agent 的方法。该项目已于2024年9月存档至 [babyagi_archive](https://github.com/yoheinakajima/babyagi_archive)。

> [!CAUTION]
> 这是一个由从未担任过开发人员职位的 Yohei 创建的框架。目的仅是分享想法和引发讨论，不适合生产使用。

## 关键链接

| Resource | URL |
|----------|-----|
| **GitHub** | https://github.com/yoheinakajima/babyagi |
| **Archive** | https://github.com/yoheinakajima/babyagi_archive |
| **Intro Thread** | https://x.com/yoheinakajima/status/1840678823681282228 |

## 核心架构

### functionz 框架

BabyAGI 的核心是 `Functionz` 类（`babyagi/functionz/core/framework.py`），它：
- 管理函数的注册、版本控制和执行
- 跟踪函数之间的依赖关系（图结构）
- 处理密钥依赖（key_dependencies）的加密存储
- 自动加载函数及其导入

### 核心模块

```
babyagi/
├── __init__.py              # 主入口：create_app(), register_function(), load_functions()
├── functionz/
│   ├── core/
│   │   ├── framework.py    # Functionz 主类
│   │   ├── registration.py  # FunctionRegistrar，装饰器注册
│   │   ├── execution.py     # FunctionExecutor，执行引擎
│   │   └── parser.py        # AST 解析，参数分析
│   ├── db/
│   │   ├── models.py        # SQLAlchemy 模型（Function, FunctionVersion, Import, Log）
│   │   ├── local_db.py      # SQLite 本地存储
│   │   └── db_router.py     # 数据库路由
│   └── packs/
│       ├── default/         # 默认函数包
│       │   ├── default_functions.py  # run/add/update/retrieve 函数
│       │   ├── ai_functions.py       # AI 描述/嵌入生成
│       │   ├── os.py                 # OS 操作
│       │   └── function_calling_chat.py
│       ├── plugins/         # 第三方插件（Firecrawl, Airtable, E2B, SerpAPI 等）
│       └── drafts/          # 实验性功能
│           ├── code_writing_functions.py  # process_user_input
│           └── self_build.py            # self_build
├── dashboard/               # Flask 仪表板
└── api/                     # API 蓝图
```

### 数据模型

使用 SQLAlchemy + SQLite：
- **Function**: 函数名，唯一
- **FunctionVersion**: 版本、代码、元数据（imports/deps/triggers/key_deps）
- **Import**: 外部库跟踪
- **Log**: 执行日志（输入/输出/时间/错误）
- **KeyDependency**: 加密存储的密钥（Fernet 对称加密）

### 依赖解析流程

1. 函数注册时通过 AST 解析源码，提取参数签名
2. 执行时自动按依赖顺序加载所需函数
3. 支持 triggers（触发器）实现自动化工作流

## 快速开始

```bash
pip install babyagi
```

```python
import babyagi

@babyagi.register_function()
def world():
    return "world"

@babyagi.register_function(dependencies=["world"])
def hello_world():
    x = world()
    return f"Hello {x}!"

if __name__ == "__main__":
    app = babyagi.create_app('/dashboard')
    app.run(host='0.0.0.0', port=8080)
```

访问 `http://localhost:8080/dashboard` 查看仪表板。

## 自构建 Agent

BabyAGI 包含两个实验性自构建 Agent：

### 1. process_user_input (code_writing_functions)

判断是否需要生成新函数，如需要则分解为可复用组件并组合。

### 2. self_build (self_build)

根据用户描述生成 X 个任务，每个任务由 process_user_input 处理。

## 许可证

MIT License
