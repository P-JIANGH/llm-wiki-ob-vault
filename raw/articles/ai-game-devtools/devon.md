# Devon — AI Game DevTools Source

## 项目基本信息
- **名称**: Devon
- **GitHub**: https://github.com/entropy-research/Devon
- **License**: AGPL (原 README 写 Apache 2.0，但 LICENSE 文件实际是 AGPL)
- **版本**: 0.1.25 (devon-agent)
- **组织**: entropy-research

## 概述
Devon 是一个开源 AI 结对编程助手（open-source pair programmer），2024 年 3 月启动。核心理念："Coding agents are going to change our relationship with code. We believe this power and leverage should be open to all." (MANIFESTO.md)

## 架构

### 多层结构
- `devon_agent/` — 核心 Python 包（pipx 安装）
- `devon-tui/` — 终端 UI（npm 全局安装）
- `electron/` — Electron 桌面应用（开发中）
- `devon_swe_bench_experimental/` — SWE-bench 实验模块
- `evals/` — 评估模块

### 核心模块
- `agent.py` (33行) — 基础 Agent 基类
- `session.py` (1298行) — Session 管理，核心逻辑
- `tool.py` (114行) — 工具基类
- `model.py` — 多模型支持（OpenAI/Anthropic/Groq/Ollama）

### Agent 类型
- `task_agent.py` (403行) — 主任务 Agent，支持多模型
- `conversational_agent.py` — 对话式 Agent

### 工具集 (tools/)
- `editortools.py` / `edittools.py` — 代码编辑
- `filetools.py` — 文件读写
- `filesearchtools.py` — 文件搜索
- `codeindex.py` / `codenav.py` — 代码索引导航
- `shelltool.py` — Shell 命令执行
- `swebenchtools.py` — SWE-bench 专用工具
- `semantic_search/` — 语义搜索
- `usertools.py` — 用户交互工具

### 支持的模型
| 模型 | Provider |
|------|----------|
| claude-opus/haiku/sonnet/3.5-sonnet | Anthropic |
| gpt4-o/turbo | OpenAI |
| llama-3-70b | Groq |
| ollama/deepseek-coder:6.7b | Ollama (本地) |
| GPT-4o | OpenAI |
| Groq llama3-70b | Groq |

### 技术栈
- Python >=3.10, <4
- Poetry 包管理
- FastAPI + Uvicorn（后端服务）
- Litellm（多模型统一接入）
- LlamaIndex（代码索引）
- SQLAlchemy + aiosqlite（会话存储）
- Pydantic v2（数据模型）
- Click（CLI）
- Node.js / npm（前端 UI）
- Electron（桌面应用）

## 主要功能
- 多文件编辑
- 代码库探索
- 配置文件编写
- 测试用例编写
- Bug 修复
- 架构探索
- 本地模型支持（实验性）

## 安装方式
```bash
pipx install devon_agent
npx devon-ui          # Web UI
devon-tui             # 终端 UI
```

## 当前目标 (Roadmap)
- [x] Claude 3.5 Sonnet 支持
- [x] GPT4-o 支持
- [x] Groq llama3-70b 支持
- [x] Ollama deepseek-6.7b 支持
- [ ] Google Gemini 1.5 Pro 支持
- [ ] 插件系统
- [ ] Electron app 改进
- [ ] SWE-bench Lite SOTA

## 里程碑
- 2024-05-08: Beat AutoCodeRover on SWE-Bench Lite
- 2024-05-12: Complete interactive agent v0.1.0
- 2024-06-01: Devon V2 Beta Electron UI
- 2024-06-14: Launch Electron UI v0.0.13
- 2024-06-28: File and code referencing, Claude Sonnet support v0.0.16

## 与同类工具差异
- Devon 专注于代码层面（file editing、codebase exploration、architecture exploration）
- 类似 SWE-agent、Devika，但更轻量
- 支持 Electron 桌面 UI 和终端 TUI 两种界面
- 通过 pipx + npm 分离 Python 后端和 Node.js 前端

## 局限性
- 非 Python 语言支持功能极简
- 有时需要指定要修改的文件
- 本地模式不成熟，性能显著下降
