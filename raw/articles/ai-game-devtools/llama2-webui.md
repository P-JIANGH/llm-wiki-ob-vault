# llama2-webui

> GitHub: https://github.com/liltom-eth/llama2-webui
> Clone: ~/tmp/ai-game-devtools/llama2-webui/
> License: MIT
> Last analyzed: 2026-04-14

## README 摘要

### 项目概述
Llama 2 + Gradio Web UI，支持 GPU/CPU 运行（Linux/Windows/Mac）。配套发布 PyPI 包 `llama2-wrapper` 作为本地 Llama 2 后端，供生成式 Agent/应用集成。

### 核心特性
- **支持模型**：Llama-2-7b/13b/70b、GPTQ、GGML、GGUF、CodeLlama 系列
- **支持后端**：transformers、bitsandbytes（8-bit）、AutoGPTQ（4-bit）、llama.cpp
- **界面**：Gradio Web UI 聊天界面 + Code Llama 代码补全 UI
- **API**：OpenAI 兼容 API（FastAPI + uvicorn），可作为 GPT 替代后端
- **性能基准**：benchmark.py 脚本评估不同硬件上的推理性能

### 主要文件
- `app.py` — Gradio 聊天 UI 入口（14704 bytes）
- `code_completion.py` — Code Llama 代码补全 UI
- `benchmark.py` — 性能基准测试脚本
- `llama2_wrapper/` — 核心封装包（model.py + server.py）
  - `model.py` — LLAMA2_WRAPPER 类，支持多后端切换
  - `server/` — FastAPI OpenAI 兼容 API 服务
- `pyproject.toml` — Poetry 项目配置，v0.1.14

### 依赖栈
- PyTorch, transformers, accelerate, bitsandbytes, auto-gptq, llama-cpp-python
- Gradio (Web UI), FastAPI + uvicorn (API server)
- huggingface-hub, sentencepiece, scipy

### 使用方式
```bash
# 启动 Web UI
python app.py  # 默认 llama.cpp 后端 + 7B GGUF 模型

# 启动 OpenAI 兼容 API
python -m llama2_wrapper.server

# Python 集成
from llama2_wrapper import LLAMA2_WRAPPER
llama2 = LLAMA2_WRAPPER(backend_type="gptq")
```

### 与同类工具差异
相比 [[ai-game-devtools/text-generation-webui]]，该项目更轻量，聚焦 Llama 2 单一模型系列，配套 PyPI 包便于应用集成。
