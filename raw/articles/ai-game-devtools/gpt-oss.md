# gpt-oss

> Source: https://github.com/openai/gpt-oss

## Overview

OpenAI's open-weight reasoning models. Two flavors:
- `gpt-oss-120b` — 117B params / 5.1B active (MoE), fits single 80GB GPU (H100/MI300X)
- `gpt-oss-20b` — 21B params / 3.6B active, fits 16GB memory

Apache 2.0 license. Trained with **Harmony response format**. MXFP4 quantization for efficient inference.

## Key Features

- Full chain-of-thought reasoning (complete CoT visible, not hidden)
- Native function calling, web browsing, Python code execution, Structured Outputs
- Configurable reasoning effort (low/medium/high)
- Fine-tunable via parameter-efficient fine-tuning
- Agentic capabilities

## Architecture

MoE (Mixture of Experts) architecture with MXFP4 quantized weights.

**Inference implementations:**
- `torch/` — Reference PyTorch (educational, needs 4×H100)
- `triton/` — Optimized Triton + CUDA graphs (single 80GB GPU)
- `metal/` — Apple Silicon Metal implementation
- vLLM — Production-ready via OpenAI-compatible server
- Ollama, LM Studio — consumer hardware support

## Tools

- **Browser tool** (`gpt_oss/tools/simple_browser/`) — search/open/find via Exa or You.com backend
- **Python tool** (`gpt_oss/tools/python_docker/`) — stateless Docker-based code execution
- **Apply Patch tool** — file creation/update/deletion

## Project Structure

```
gpt_oss/
├── torch/model.py          # Reference PyTorch implementation
├── triton/                 # Triton-optimized MoE kernel (MXFP4)
├── metal/                  # Apple Silicon implementation
├── tools/
│   ├── simple_browser/     # Browser tool (Exa/YouCom backends)
│   ├── python_docker/      # Python execution tool
│   └── apply_patch.py      # File patching tool
├── responses_api/          # OpenAI Responses API compatible server
├── chat.py                 # Terminal chat application
└── gpt-oss-mcp-server/     # MCP server integration
```

## Dependencies

Python 3.12+. Key deps: `openai-harmony`, `tiktoken`, `fastapi`, `docker`, `triton>=3.4`, `torch>=2.7`.

## License

Apache 2.0

## Links

- Model: https://huggingface.co/openai/gpt-oss-120b, https://huggingface.co/openai/gpt-oss-20b
- Docs: https://cookbook.openai.com/topic/gpt-oss
- Blog: https://openai.com/index/introducing-gpt-oss/
- Paper: https://arxiv.org/abs/2508.10925
