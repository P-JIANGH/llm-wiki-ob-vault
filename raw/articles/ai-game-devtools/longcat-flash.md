# LongCat-Flash (Meituan)

## Source Info
- **URL:** https://github.com/meituan-longcat/LongCat-Flash-Chat
- **Clone via:** gitcode.com/meituan-longcat/LongCat-Flash-Chat
- **License:** MIT
- **Organization:** Meituan LongCat Team

## Model Overview
LongCat-Flash is a 560B parameter MoE (Mixture-of-Experts) language model featuring dynamic computation — activating 18.6B~31.3B parameters (averaging ~27B) per token based on context. LongCat-Flash-Chat is the non-thinking foundation model release optimized for agentic tasks.

## Architecture
- **Type:** MoE (Mixture-of-Experts)
- **Total Parameters:** 560B
- **Activated Parameters:** 18.6B~31.3B (average ~27B, PID-controller adjusted expert bias)
- **Key Innovation:** Shortcut-connected MoE (ScMoE) expands computation-communication overlap window for >100 TPS inference throughput
- **Context Length:** 128K
- **Framework:** Hugging Face Transformers (Python), adapted for SGLang and vLLM deployment

## Key Technical Features
1. **Zero-computation experts mechanism** — dynamically allocates computation budget based on token importance
2. **Shortcut-connected MoE (ScMoE)** — overlaps computation and communication to overcome MoE scaling bottlenecks
3. **Hyperparameter transfer strategy** — leverages smaller proxy models to predict optimal configs for large-scale training
4. **Multi-agent synthesis framework** for post-training — generates complex agentic tasks across 3 axes: information processing, tool-set complexity, user interaction
5. **Deterministic computation** — exact reproducibility and SDC (Silent Data Corruption) detection

## Performance Highlights
| Benchmark | LongCat-Flash | DeepSeek V3.1 | Kimi K2 |
|-----------|--------------|----------------|---------|
| IFEval (instruction following) | **89.65** | 86.69 | 88.91 |
| τ²-Bench telecom (agentic) | **73.68** | 38.50 | 67.50 |
| COLLIE (instruction following) | **57.10** | 43.80 | 56.34 |
| ArenaHard-V2 | **86.50** | 84.10 | 85.70 |
| Safety (Criminal) | **91.24** | 87.83 | 77.19 |

## Code Structure
- `modeling_longcat_flash.py` — Main model implementation (648 lines): LongcatFlashRMSNorm, LongcatFlashRotaryEmbedding, attention layers, MoE blocks
- `configuration_longcat_flash.py` — Model configuration (LongcatFlashConfig)
- `tokenizer_config.json` — Chat template definition (multi-turn, tool calling format)
- `generation_config.json` — Generation settings
- 75 safetensors shards (model weights)

## Chat Template Format
```
[Round N] USER:{query} ASSISTANT:
```
Multi-turn via concatenation. Tool calls use `<longcat_tool_call>` XML tags wrapping function calls.

## Deployment
Adapted for SGLang and vLLM. See `docs/deployment_guide.md` in repo.

## Key Files
- `model_00001-of-00075.safetensors` through `model_00075-of-00075.safetensors` — 75 weight shards
- `model.safetensors.index.json` — Weight index file
- `tokenizer.json`, `special_tokens_map.json`, `tokenizer_config.json` — Tokenizer

## Citation
```
@misc{meituan2025longcatflashtechnicalreport,
  title={LongCat-Flash Technical Report},
  author={Meituan LongCat Team},
  year={2025},
  eprint={2509.01322},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2509.01322},
}
```
