# Chapyter — JupyterLab GPT-4 代码生成扩展

## 基本信息
- **GitHub**: https://github.com/chapyter/chapyter
- **许可证**: BSD 3-Clause
- **作者**: Shannon Shen (szj.io)
- **分类**: Code Tools

## 项目概述
Chapyter 是一个 JupyterLab 扩展，将 GPT-4 无缝连接到编码环境。它提供代码解释器，可以将自然语言描述自动转换为 Python 代码并执行。通过在熟悉的 IDE 中实现"自然语言编程"，Chapyter 可以提升生产力，帮助用户探索原本不会尝试的新想法。

## 核心功能
1. **自然语言代码生成与自动执行**: 在代码单元格开头添加 `%%chat` magic 命令，GPT-4 会生成 Python 代码并自动执行
2. **使用编码历史和执行输出**: 通过 `--history` / `-h` 标志，Chapyter 可以使用之前的执行历史和输出生成合适的可视化
3. **原地调试和代码编辑**: 生成的代码可以直接在 Jupyter Notebook 中检查和修复错误
4. **Prompt 透明度**: 所有使用的 prompt 都在 `chapyter/programs.py` 中公开，支持自定义
5. **隐私优先**: 使用 OpenAI API，数据不会被用于训练（与 Copilot/ChatGPT 不同）

## 技术架构

### 后端 (Python)
- **magic.py**: IPython Magic Command 实现，处理 LLM 调用
  - `Chapyter` Magics 类：注册 `%%chat`、`%%chatonly`、`%chapyter` 命令
  - 支持 OpenAI API 和 Azure OpenAI API
  - 使用 `guidance` 库管理 prompt 模板
  - 配置通过 traitlets 系统管理，支持 `.env` 文件
- **programs.py**: Guidance 程序定义
  - `ChapyterAgentProgram`: 封装 guidance program + pre/post hooks
  - `_DEFAULT_PROGRAM`: 默认编码指导程序（one-shot 示例 + 代码生成）
  - `_DEFAULT_HISTORY_PROGRAM`: 带执行历史的编码程序
  - `_DEFAULT_CHATONLY_PROGRAM`: 纯聊天模式（不生成代码）
  - `clean_response_str()`: 从 markdown 代码块中提取代码

### 前端 (TypeScript/JupyterLab Extension)
- **src/index.ts**: JupyterLab 前端插件
  - 监听 `NotebookActions.executed` 事件
  - 自动识别 `%%chat` magic 单元格
  - 自动生成并执行 AI 生成的代码单元格
  - 管理单元格元数据 (`ChapyterCell`) 追踪原始/生成单元格关系
  - 安全模式 (`-s`/`--safe`) 支持：不自动执行生成的代码
  - 处理单元格去重（避免重复执行产生多个生成单元格）

### Prompt 设计
默认编码 prompt 使用 one-shot 学习模式：
1. System: 你是帮助 Python 程序员的助手
2. 练习轮次：加载 orca.json → 给出代码示例
3. 正式轮次：接收用户的自然语言描述 → 生成代码

### 依赖
- `guidance` — Microsoft 的结构化 LLM 生成库
- `jupyterlab>=4.0` — JupyterLab 前端框架
- `python-dotenv` — 环境变量管理

### 安装与使用
```bash
pip install chapyter  # 自动安装 JupyterLab 扩展
```
使用时设置 `OPENAI_API_KEY` 环境变量，然后在代码单元格中使用：
```
%%chat -m gpt-4-0613
列出文件夹中的所有文件
```

## 与同类工具差异
- 与 **ai-code-translator** 不同：Chapyter 直接在 JupyterLab 中运行，支持自动执行，而非 Web UI 翻译
- 与 **Devon/Devika** 不同：Chapyter 专注于 Jupyter 环境内的自然语言编程，而非完整代码库编辑
- 独特之处：`%%chat` magic 命令 + 自动执行 + 历史上下文感知的代码生成
