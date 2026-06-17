# GLM-4 (THUDM)

## Source

- URL: https://github.com/THUDM/GLM-4
- License: Custom (needs commercial contact for API)
- Last updated: 2026-04-14

## Project Structure

```
GLM-4/
├── README.md              # Main README (EN + ZH versions)
├── README_zh.md          # Chinese README
├── README_20240605.md    # Legacy models (GLM-4-9B base series)
├── pyproject.toml         # Ruff lint config
├── LICENSE                # Custom license
├── demo/
│   ├── composite_demo/    # Composite application demos
│   └── intel_device_demo/ # Intel device demos
├── finetune/
│   ├── configs/           # Fine-tuning configs
│   ├── finetune.py        # LLM fine-tuning script
│   ├── finetune_vision.py # VLM fine-tuning script
│   └── README.md
├── inference/
│   ├── trans_cli_demo.py        # CLI translation demo
│   ├── trans_web_demo.py         # Web demo
│   ├── vllm_cli_demo.py          # vLLM inference demo
│   ├── glm4v_server.py          # GLM-4V API server
│   └── requirements.txt
└── resources/
    ├── Bench-32B.png      # Benchmark results 32B
    ├── Bench-Z1-32B.png   # Benchmark Z1-32B
    └── Bench-Z1-9B.png    # Benchmark Z1-9B
```

## Key Models

### GLM-4-0414 Series (April 2025)

| Model | Type | Context | Notes |
|-------|------|---------|-------|
| GLM-4-9B-0414 | Chat | 32K→128K | Lightweight, batch operations |
| GLM-Z1-9B-0414 | Reasoning | 32K→128K | RL-trained small model |
| GLM-4-32B-Base-0414 | Base | 32K→128K | 15T tokens pre-trained |
| GLM-4-32B-0414 | Chat | 32K→128K | Agent-optimized |
| GLM-Z1-32B-0414 | Reasoning | 32K→128K | Deep thinking, math/code |
| GLM-Z1-Rumination-32B-0414 | Reasoning | 128K | OpenAI Deep Research competitor, search-augmented |

### GLM-4-9B Series (June 2024, legacy)

| Model | Type | Context |
|-------|------|---------|
| GLM-4-9B | Base | 8K |
| GLM-4-9B-Chat | Chat | 128K |
| GLM-4-9B-Chat-1M | Chat | 1M |
| GLM-4V-9B | VLM | 8K |

## Architecture

- **Framework**: PyTorch, Hugging Face Transformers, vLLM
- **Context Extension**: YaRN (Yet another Rotary Neighbour) for long context extrapolation
- **Training**: 15T tokens for 32B base; includes reasoning-type synthetic data
- **Post-training**: Human preference alignment, rejection sampling, RL for code/instruction/function calling
- **Optimizer**: Agent capability enhancements for 32B models

## Technical Highlights

- **vLLM integration**: Official model implementation merged in vLLM main
- **Transformers**: Official HF transformers support merged
- **llama.cpp**: C++ inference via llama.cpp (April 2025)
- **Function Calling**: Strong agent task performance (BFCL-v3: 69.6, TAU-Bench Retail: 68.7)
- **SWE-bench Verified**: 33.8 (Moatless) — comparable to larger models

## Benchmark Highlights (GLM-4-32B-0414 vs competitors)

| Metric | GLM-4-32B | GPT-4o-1120 | DeepSeek-V3 |
|--------|-----------|-------------|-------------|
| IFEval | **87.6** | 81.9 | 83.4 |
| BFCL-v3 | **69.6** | 69.6 | 66.2 |
| SimpleQA | **88.1** | 82.8 | 82.6 |

## Download Links

- HuggingFace: https://huggingface.co/THUDM/GLM-4-32B-0414
- ModelScope: https://modelscope.cn/models/ZhipuAI/GLM-4-32B-0414
- Online demo: https://chat.z.ai (free tier)
