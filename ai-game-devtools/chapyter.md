---
title: Chapyter
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [tool, code, open-source]
sources: [raw/articles/ai-game-devtools/chapyter.md]
---

# Chapyter

JupyterLab 扩展，将 GPT-4 无缝连接到编码环境，实现自然语言编程。

## 概述
Chapyter 是一个 JupyterLab 扩展，提供代码解释器功能，可以将自然语言描述自动转换为 Python 代码并执行。通过 `%%chat` magic 命令，用户在 Jupyter Notebook 中用自然语言描述任务，AI 自动生成并执行对应代码。

## 核心功能
- **自然语言代码生成**: `%%chat` magic 命令 → GPT-4 生成 Python 代码并自动执行
- **历史上下文感知**: `--history` 标志让 AI 利用之前的编码历史和执行输出
- **原地调试**: 生成的代码直接在 Jupyter 中显示和修改，无需离开 IDE
- **安全模式**: `-s` / `--safe` 标志阻止自动执行，供用户审核后再运行
- **Prompt 透明度**: 所有 prompt 在 `programs.py` 中公开可定制
- **多 API 支持**: OpenAI API + Azure OpenAI API

## 技术架构
- **后端**: Python IPython Magic (`magic.py`) + Guidance prompt 模板 (`programs.py`)
- **前端**: JupyterLab TypeScript 扩展 (`src/index.ts`)
- **依赖**: guidance、jupyterlab>=4.0、python-dotenv
- **许可证**: BSD 3-Clause

## 使用方式
```bash
pip install chapyter
# 设置 OPENAI_API_KEY 环境变量
```
```python
%%chat -m gpt-4-0613
列出文件夹中的所有文件
```

## 与同类工具对比
- 相比 [[devon]]（完整代码库 AI 编辑器），Chapyter 专注于 Jupyter 内的自然语言编程
- 相比 [[ai-code-translator]]（代码翻译 Web UI），Chapyter 直接集成在 IDE 中并支持自动执行
- 与 [[text-generation-webui]]（通用 LLM Web UI）不同，Chapyter 是专用 Jupyter 扩展

## 相关链接
- GitHub: https://github.com/chapyter/chapyter
- Blog: https://www.szj.io/posts/chapyter
