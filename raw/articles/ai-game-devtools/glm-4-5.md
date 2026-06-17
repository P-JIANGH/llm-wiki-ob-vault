# GLM-4.7 & GLM-4.6 & GLM-4.5

**Source:** https://github.com/zai-ai/GLM-4.5
**License:** MIT
**Date:** 2025

## Model Introduction

### GLM-4.7 (latest)
- Core Coding: 73.8% on SWE-bench (+5.8%), 66.7% on SWE-bench Multilingual (+12.9%), 41% on Terminal Bench 2.0 (+16.5%)
- Vibe Coding: cleaner, modern webpages; better slide generation
- Tool Using: improved on τ²-Bench and BrowseComp web browsing
- Complex Reasoning: 42.8% on HLE benchmark (+12.4% vs GLM-4.6)
- Interleaved Thinking: thinks before every response and tool call
- Preserved Thinking: retains all thinking blocks across multi-turn conversations for coding agents
- Turn-level Thinking: per-turn control to disable/enable thinking per request

### GLM-4.6
- Context window expanded from 128K to 200K
- Superior coding performance in Claude Code, Cline, Roo Code, Kilo Code
- Advanced reasoning with tool use during inference
- Stronger tool and search agents

### GLM-4.5
- 355B total parameters, 32B active (MoE)
- 106B total / 12B active (GLM-4.5-Air compact version)
- Hybrid reasoning: thinking mode + non-thinking mode
- MIT open-source license, commercially usable
- Score 63.2 on 12 benchmarks (3rd among all models); GLM-4.5-Air: 59.8

## Model Family

| Model | Size | Precision | Notes |
|-------|------|-----------|-------|
| GLM-4.7 | 355B-A32B | BF16 | Latest flagship |
| GLM-4.7-FP8 | 355B-A32B | FP8 | Quantized |
| GLM-4.7-Flash | 30B-A3B | BF16 | Lightweight |
| GLM-4.6 | 355B-A32B | BF16 | |
| GLM-4.5 | 355B-A32B | BF16 | |
| GLM-4.5-Air | 106B-A12B | BF16 | Compact |
| GLM-4.5-Base | 355B-A32B | BF16 | Base model |
| GLM-4.5-Air-Base | 106B-A12B | BF16 | |

## System Requirements

### Inference (Nvidia GPUs, full features)
| Model | Precision | GPUs |
|-------|-----------|------|
| GLM-4.5 | BF16 | H100 x 16 |
| GLM-4.5 | FP8 | H100 x 8 |
| GLM-4.5-Air | BF16 | H100 x 4 |
| GLM-4.5-Air | FP8 | H100 x 2 |
| GLM-4.7-Flash | BF16 | H100 x 1 |

### Fine-tuning (LLaMA Factory / Swift)
- GLM-4.5: H100 x 16 (LoRA), H20 x 128 (SFT/RL)
- GLM-4.5-Air: H100 x 4 (LoRA), H20 x 32 (SFT/RL)

## Quick Start

### vLLM
```shell
vllm serve zai-org/GLM-4.7-FP8 \
     --tensor-parallel-size 4 \
     --speculative-config.method mtp \
     --tool-call-parser glm47 \
     --reasoning-parser glm45 \
     --enable-auto-tool-choice
```

### SGLang
```shell
python3 -m sglang.launch_server \
  --model-path zai-org/GLM-4.7-FP8 \
  --tp-size 8 \
  --tool-call-parser glm47 \
  --reasoning-parser glm45 \
  --speculative-algorithm EAGLE \
  --speculative-num-steps 3 \
  --speculative-eagle-topk 1 \
  --speculative-num-draft-tokens 4
```

### transformers (local inference)
```python
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("zai-org/GLM-4.7", torch_dtype=torch.bfloat16, device_map="auto")
```

## Key Architecture Details

- **MoE**: Mixed Expert architecture, activates subset of experts per token
- **MTP**: Multi-Token Prediction layers for speculative decoding
- **Tool Calling**: OpenAI-style tool description format, auto-tool-choice supported
- **Thinking Modes**: Interleaved/Preserved/Turn-level thinking control
- **Framework Support**: transformers, vLLM, SGLang, LMDeploy, TensorRT-LLM

## License

MIT License — fully open source, commercial use permitted

## Key Files

- `inference/trans_infer_cli.py` — transformers-based local inference CLI
- `inference/api_request.py` — OpenAI-compatible API client example with tool calling
- `example/AMD_GPU/` — AMD GPU deployment guide
- `example/Ascend_NPU/` — Ascend NPU deployment guide
- `example/claude_code/` — Claude Code integration examples
