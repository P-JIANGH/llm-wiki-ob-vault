# Qwen2 — AI Game DevTools Source

> Copied from: https://github.com/QwenLM/Qwen2
> Date: 2026-04-14

## README Summary

Qwen2 is the second generation of Qwen large language models by Alibaba Cloud (通义千问). The Qwen series covers models from 0.6B to 235B parameters, including dense and MoE architectures. Qwen3 is the latest generation.

### Model Sizes
- Qwen2.5: 0.5B, 1.5B, 3B, 7B, 14B, 32B, 72B (dense); Qwen2.5-MoE: A2.7B (active params)
- Qwen2: 0.5B, 1.5B, 7B, 72B
- Pretrained on 7T tokens (Qwen2.5), 12T tokens (Qwen2.5-Coder-32B)
- Max context: 128K tokens (Qwen2.5), 1M tokens (Qwen2.5-1M)

### Key Capabilities
- Multilingual: 100+ languages
- Tool use and function calling (MCP support)
- Agent capabilities via [[Qwen-Agent]]
- Code generation, mathematical reasoning
- Long context understanding
- Thinking mode (chain-of-thought reasoning) in Qwen3 series

### Inference Frameworks
- [[vLLM]]: `vllm serve Qwen/Qwen3-8B --port 8000 --max-model-len 131072 --enable-reasoning --reasoning-parser qwen3`
- [[SGLang]]: `python -m sglang.launch_server --model-path Qwen/Qwen3-8B --port 30000 --context-length 131072 --reasoning-parser qwen3`
- [[llama.cpp]]: `llama.cpp>=b5401` with GGUF support
- Ollama, TensorRT-LLM, MNN, ExecuTorch, MLX LM, OpenVINO

### License
Apache 2.0 (all open-weight models)

### Related Links
- HuggingFace: https://huggingface.co/Qwen/Qwen2
- ModelScope: https://www.modelscope.cn/organization/Qwen/
- Documentation: https://qwen.readthedocs.io/
- Qwen-Agent (tool use): https://github.com/QwenLM/Qwen-Agent
