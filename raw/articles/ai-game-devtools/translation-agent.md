# Translation Agent — Agentic Translation Using Reflection Workflow

**Source:** https://github.com/andrewyng/translation-agent
**Mirror:** gitcode.com (cloned from GitHub)
**Analyzed:** 2026-04-16

## README Summary

Andrew Ng 开发的反射式 Agent 翻译工作流。核心三步流程：
1. 让 LLM 将文本从源语言翻译到目标语言
2. 让 LLM 反思翻译质量，给出建设性改进建议
3. 根据建议改进翻译

**核心特性：**
- 高度可定制化：通过修改 prompt 可调整输出风格（正式/非正式）
- 支持术语一致性（glossary 机制）
- 支持区域语言变体（如墨西哥西班牙语 vs 西班牙西班牙语）
- 使用 gpt-4-turbo 原型开发，BLEU 分数有时与商业翻译服务持平或略低，但偶尔效果更好
- 认为 Agent 翻译有望超越传统端到端 Transformer 方案

**许可证：** MIT

**扩展方向：** 尝试更多 LLM、自动术语表构建、不同语言对的评测、错误分析、更好的评估指标

## 代码架构

### 核心模块 (`src/translation_agent/utils.py` — 678 行)

单一入口函数 `translate(source_lang, target_lang, source_text, country)`。

**三步翻译流水线（单块文本）：**
1. `one_chunk_initial_translation()` — 首次翻译
2. `one_chunk_reflect_on_translation()` — 反思翻译质量，从 4 个维度给出建议（准确性、流畅度、风格、术语）
3. `one_chunk_improve_translation()` — 根据反思改进翻译

**多块文本支持：**
- `multichunk_initial_translation()` — 用 `RecursiveCharacterTextSplitter`（LangChain）分块，每块最多 1000 tokens
- 分块策略：使用 `<TRANSLATE_THIS>` XML 标签标记当前翻译块，其余文本作为上下文
- `multichunk_reflect_on_translation()` — 逐块反思
- `multichunk_improve_translation()` — 逐块改进

### WebUI (`app/app.py` + `app/process.py`)

Gradio Web 界面：
- 支持多 LLM 端点：Groq、OpenAI、Ollama、Together AI
- 支持文档上传（PDF/TXT/DOCX）
- 支持双 LLM 模式（第二个 LLM 用于反思阶段）
- Token 级差异显示
- `patch.py` 文件可自定义扩展新 LLM

### 依赖

- openai ^1.28.1 — LLM 调用
- tiktoken ^0.6.0 — Token 计数
- langchain-text-splitters ^0.0.1 — 文本分块
- gradio 4.37.2（可选 app 依赖）— WebUI
- python-dotenv — 环境变量管理

### 工具链

- Poetry 包管理
- Ruff + Black 代码格式化
- MyPy 类型检查
- Pytest 测试
- Pre-commit 钩子

## 相关研究

- ChatGPT MT (Robinson et al., 2023)
- How to Design Translation Prompts (Gao et al., 2023)
- Beyond Human Translation (Wu et al., 2024)
