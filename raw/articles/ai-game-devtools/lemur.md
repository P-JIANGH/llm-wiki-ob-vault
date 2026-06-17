# Lemur: Open Foundation Models for Language Agents

> Source: https://github.com/OpenLemur/Lemur
> Copied: 2026-04-14

## Overview

Lemur is an openly accessible language model optimized for both natural language and coding capabilities, designed as the backbone of versatile language agents. Developed by XLang Lab and Salesforce Research.

## Model Variants

- `OpenLemur/lemur-70b-v1` — base model
- `OpenLemur/lemur-70b-chat-v1` — instruction-tuned chat model (ChatML format)

## Architecture & Training

- **Base model**: Llama-2-70B
- **Pretraining corpus**: 90B tokens, 10:1 code-to-text ratio → Lemur-70B-v1
- **Instruction tuning**: 300K examples covering both text and code → Lemur-70B-Chat-v1
- **Framework**: xchat Python package (transformers 4.34.0, deepspeed, peft, accelerate, bitsandbytes)
- **Serving**: vLLM, also supports TGI (text-generation-inference)

## Key Capabilities

- Balanced natural language + code generation
- Tool use (evaluated on MINT benchmark)
- Web interaction (evaluated on WebArena)
- Code execution (evaluated on InterCode)
- Benchmarks: MMLU, BBH, GSM8K, HumanEval, MBPP, Spider

## Evaluation Results

- Outperforms other open-source models averaged across language and coding benchmarks
- Narrows gap between open-source and commercial models on agent abilities

## Related Links

- Paper: https://arxiv.org/abs/2310.06830
- HuggingFace: https://huggingface.co/OpenLemur
- Blog: https://www.xlang.ai/blog/openlemur
- OpenAgents platform: https://github.com/xlang-ai/OpenAgents

## File Structure

```
Lemur/
├── xchat/              # Main Python package (training, serving, evaluation)
│   └── (transformers-based LLM toolkit)
├── scripts/
│   ├── train/          # Training scripts
│   ├── eval/           # Evaluation scripts (mmlu.sh, bbh.sh, gsm8k.sh, human_eval.sh, mbpp.sh)
│   └── deploy/         # Deployment scripts (vllm_lemur.sh, tgi_lemur.sh)
├── assets/             # Images and logos
├── pyproject.toml      # xchat package config
└── README.md
```

## Dependencies

accelerate, bitsandbytes, datasets, deepspeed, einops, evaluate, peft, scipy, sentencepiece, tokenizers, transformers==4.34.0, wandb, openai

## License

Apache License (inferred from pyproject.toml classifiers)
