# Qwen1.5 - Source Dump

> Cloned from: https://github.com/QwenLM/Qwen1.5 (via gitcode.com mirror)
> Clone date: 2026-04-14
> Note: This repo covers Qwen1.5, Qwen2, Qwen2.5, and Qwen3 model series

## Repository Structure

```
qwen1.5/
├── README.md              # Main documentation (covers Qwen1.5 → Qwen3)
├── Qwen3_Technical_Report.pdf
├── docker/
│   ├── Dockerfile-cu121
│   ├── docker_cli_demo.sh
│   └── docker_web_demo.sh
├── docs/                  # Evaluation and speed benchmark docs
├── eval/                  # Evaluation framework
│   ├── configs/
│   ├── data/
│   ├── eval/
│   ├── eval_res/
│   ├── generate_api_answers/
│   ├── output/
│   ├── README.md
│   └── requirements.txt
├── examples/              # Demo and examples
│   ├── demo/
│   ├── gcu-support/
│   ├── llama-factory/
│   ├── README.md
│   └── speed-benchmark/
└── eval/                  # Additional eval
```

## Key Facts

- **Organization**: QwenLM (Alibaba DAMO Academy)
- **License**: Qwen3 uses Apache 2.0; earlier Qwen1.5/Qwen2.5 models used Qingzhen (free for research/commercial with registration)
- **Models Covered**: Qwen1.5 (2024.02), Qwen2 (2024.06), Qwen2.5 (2024.09), Qwen3 (2025.04)
- **Sizes**: 0.6B, 1.7B, 3B, 4B, 7B, 8B, 14B, 32B, 72B, MoE variants (Qwen1.5-MoE-A2.7B)
- **Key Features**: 
  - Base/Chat/Instruct variants
  - MoE (Mixture of Experts) architecture in later releases
  - 128K-256K context support
  - Multi-language (100+ languages)
  - Tool use and agent capabilities (Qwen2.5 onwards)
  - Thinking/non-thinking mode switch (Qwen3)
- **Frameworks**: HuggingFace Transformers, vLLM, SGLang, TGI, llama.cpp, Ollama, LM Studio, llama-Factory, Axolotl
- **Providers**: HuggingFace, ModelScope, GitHub Models

## Qwen1.5 Specifics (2024.02.05)

- First release in the numbered series (Qwen → Qwen1.5)
- Released sizes: 0.5B, 1.8B, 7B, 14B, 32B, 72B + Chat variants
- Context: 32K for most models
- Innovations: RoPE position encoding, SwiGLU activation, Attention Sink

## Qwen2 Specifics (2024.06.06)

- Added 3B, 14B, 32B sizes
- GQA (Grouped Query Attention) for larger models
- Up to 128K context

## Qwen2.5 Specifics (2024.09.19)

- Further improved instruction following and reasoning
- Stronger tool use and agent capabilities
- Released CodeQwen1.5 (specialized for code)

## Qwen3 Specifics (2025.04.29 / 2025.08)

- Thinking and non-thinking modes (seamless switch)
- MoE models: 30B-A3B, 235B-A22B
- 256K-1M token context
- 100+ languages
- Qwen3-2507 update (2025.08): ultra-long context up to 1M tokens, SOTA thinking model
- Benchmarks: AIME 87.8 (4B), 94.7 (30B-A3B), 97.8 (235B-A22B) on math; SOTA on open-weight thinking models

## Evaluation Framework

The `eval/` directory contains:
- `eval/` — main evaluation scripts
- `configs/` — benchmark configurations
- `data/` — benchmark datasets
- `eval_res/` — results storage
- Supports: MMLU, C-Eval, GSM8K, MATH, HumanEval, MBPP, BBH, etc.

## Deployment Options

1. **Transformers** (`transformers>=4.51.0` recommended)
2. **vLLM** — for high-throughput serving
3. **SGLang** — for structured generation
4. **TGI** (Text Generation Inference)
5. **llama.cpp** — CPU/GPU quantization (GGUF)
6. **Ollama** — local inference
7. **LM Studio** — desktop GUI
8. **llama-Factory** — fine-tuning
9. **Axolotl** — RLHF fine-tuning
10. **Docker** — containerized deployment

## Example: Running with Transformers

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "Qwen/Qwen2.5-7B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype="auto",
    device_map="auto"
)

messages = [{"role": "user", "content": "Give me a short introduction to large language model."}]
text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
model_inputs = tokenizer([text], return_tensors="pt").to(model.device)
generated_ids = model.generate(**model_inputs, max_new_tokens=512)
output = tokenizer.decode(generated_ids[0][len(model_inputs.input_ids[0]):], skip_special_tokens=True)
print(output)
```
