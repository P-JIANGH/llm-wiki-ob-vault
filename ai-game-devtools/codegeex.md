---
title: CodeGeeX
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, code-generation, code-completion, open-source, tool]
sources: [raw/articles/ai-game-devtools/codegeex.md]
---

# CodeGeeX

**CodeGeeX** is a large-scale multilingual code generation model with 13 billion parameters, pre-trained on a code corpus of more than 20 programming languages. Developed by **THUDM** (Tsinghua University). As of June 2022, trained on 850B+ tokens on 1,536 Ascend 910 AI Processors.

## Overview

CodeGeeX is a transformer-based autoregressive decoder model for code generation and translation. It supports multilingual code generation (Python, C++, Java, JavaScript, Go, etc.) and crosslingual code translation between programming languages.

## Key Features

- **Multilingual Code Generation**: Supports 20+ programming languages
- **Crosslingual Code Translation**: Translate code between languages with one click
- **IDE Extensions**: Free plugins for VS Code and JetBrains (IntelliJ IDEA, PyCharm, GoLand, CLion)
- **HumanEval-X Benchmark**: 820 human-crafted problems in 5 languages (Python, C++, Java, JavaScript, Go)
- **Open Source**: Code under Apache-2.0; model weights available on request

## Architecture

- **Model Type**: Left-to-right autoregressive transformer decoder
- **Parameters**: 13B (40 transformer layers)
- **Hidden Size**: 5,120 (self-attention), 20,480 (FFN)
- **Max Sequence Length**: 2,048
- **Tokenizer**: GPT-2 style, 50,400 tokens

## Training Details

- **Framework**: Mindspore 1.7 (original), PyTorch/Megatron-LM port provided
- **Hardware**: 1,536 Ascend 910 AI Processors (32GB each)
- **Training Data**: 158.7B tokens, 23 programming languages (The Pile + CodeParrot + GitHub)
- **Parallel Strategy**: 8-way model parallel + 192-way data parallel (ZeRO-2)
- **Global Batch Size**: 3,072
- **Training Period**: April 18 – June 22, 2022 (~2 months, 5+ epochs)

## Inference

| Mode | GPU Memory | Notes |
|------|-----------|-------|
| Single GPU FP16 | >27GB | `test_inference.sh` |
| Quantized INT8 | >15GB | `test_inference_quantized.sh` |
| Multi-GPU | >6GB each | `test_inference_parallel.sh` |

## IDE Extensions

- **VS Code**: Search "codegeex" in Marketplace; source at [codegeex-vscode-extension](https://github.com/CodeGeeX/codegeex-vscode-extension)
- **JetBrains**: 2021.1+, supports IntelliJ IDEA, PyCharm, GoLand, CLion, Android Studio, etc.
- **Cloud Studio**: Tencent web IDE integration

## HumanEval-X Benchmark

CodeGeeX is evaluated on HumanEval-X, a multilingual benchmark with 820 human-crafted coding problems in 5 languages. Each problem has tests and solutions. Evaluates functional correctness via pass@k metric.

- CodeGeeX outperforms InCoder-6.7B and CodeGen-Multi-6B
- Competitive with CodeGen-Multi-16B
- Available on HuggingFace: `THUDM/humaneval-x`

## Project Structure

```
codegeex/          # Main Python package (mindspore + torch)
configs/           # Configuration scripts
scripts/           # Inference and benchmark scripts
codegeex/benchmark/ # HumanEval-X benchmark code
vscode-extension/  # VS Code extension source code
generations/       # Code generation examples
tests/             # Test prompts
deployment/        # Deployment configurations
api/               # API server code
```

## Dependencies

Python 3.7+ / CUDA 11+ / PyTorch 1.10+ / DeepSpeed 0.6+

Key packages: `transformers>=4.22.0`, `tokenizers>=0.11.0`, `torch>=1.10.0`, `deepspeed>0.6.1`, `fire`, `cpm_kernels`

## News Timeline

- **2023-07-24**: CodeGeeX2 released — more powerful, faster, lightweight, 100+ languages
- **2023-05-16**: Paper accepted by KDD 2023
- **2023-03-30**: Paper on arXiv (2303.17568)
- **2023-02-14**: Cloud Studio support
- **2023-02-13**: OneFlow backend (faster than FasterTransformer FP16)
- **2022-12-31**: FasterTransformer INT8 version (<15ms/token)
- **2022-12-13**: VS Code extension source released
- **2022-12-11**: JetBrains IDE support
- **2022-09-30**: Cross-platform source code and weights released

## Publication

- **Paper**: [CodeGeeX: A Pre-Trained Model for Code Generation with Multilingual Benchmarking on HumanEval-X](https://arxiv.org/abs/2303.17568)
- **Venue**: KDD 2023, Long Beach
- **Lead Contributors**: Qinkai Zheng, Xiao Xia, Xu Zou (Tsinghua KEG)
- **Project Leader**: Jie Tang (Tsinghua KEG & BAAI)

## License

- Code: Apache-2.0
- Model: Separate model license

## Related Pages

- [[glm-4]] — THUDM GLM-4 language model series (same org)
- [[glm-v]] — THUDM GLM Vision model (same org)
- [[ai-code-translator]] — AI code translation tool (references codegeex4)

## Links

- **GitHub**: https://github.com/THUDM/CodeGeeX
- **Homepage**: https://codegeex.cn
- **Demo**: https://models.aminer.cn/codegeex/playground
- **Blog**: https://models.aminer.cn/codegeex/blog/
- **VS Code**: https://marketplace.visualstudio.com/items?itemName=aminer.codegeex
- **JetBrains**: https://plugins.jetbrains.com/plugin/20587-codegeex
