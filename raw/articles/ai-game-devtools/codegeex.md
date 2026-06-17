# CodeGeeX — A Multilingual Code Generation Model

**Source URL:** https://github.com/THUDM/CodeGeeX
**Mirror used:** gitcode.com/THUDM/CodeGeeX (GitHub clone timed out)
**Captured:** 2026-04-16

## README Summary

CodeGeeX is a large-scale multilingual code generation model with **13 billion parameters**, pre-trained on a large code corpus of more than 20 programming languages. Trained on 850B+ tokens on 1,536 Ascend 910 AI Processors.

### Key Features
- **Multilingual Code Generation**: Python, C++, Java, JavaScript, Go, etc.
- **Crosslingual Code Translation**: Translate code between languages with one click
- **IDE Extensions**: Free VS Code and JetBrains (IntelliJ IDEA, PyCharm, GoLand, CLion) plugins
- **Open Source & Cross-Platform**: Supports Ascend and NVIDIA platforms

### HumanEval-X Benchmark
- 820 human-crafted coding problems in 5 languages (Python, C++, Java, JavaScript, Go)
- Each problem has tests and solutions
- Evaluates functional correctness via pass@k metric
- Available on HuggingFace: `THUDM/humaneval-x`

### Architecture
- Left-to-right autoregressive transformer decoder
- 40 transformer layers, hidden size 5,120 (self-attention), 20,480 (FFN)
- Max sequence length: 2,048
- Tokenizer: GPT-2 style, 50,400 vocabulary

### Training
- Framework: Mindspore 1.7
- Hardware: 1,536 Ascend 910 AI Processors (32GB each)
- Parallel: 8-way model parallel + 192-way data parallel (ZeRO-2)
- Global batch size: 3,072
- Training period: April 18 – June 22, 2022 (~2 months, 5+ epochs)
- Training data: 158.7B tokens across 23 languages (The Pile + CodeParrot + GitHub scraping)

### Inference Requirements
| Mode | GPU Memory | Script |
|------|-----------|--------|
| Single GPU FP16 | >27GB | test_inference.sh |
| Quantized INT8 | >15GB | test_inference_quantized.sh |
| Multi-GPU | >6GB each | test_inference_parallel.sh |

### Project Structure
```
codegeex/          # Main package (mindspore + torch implementations)
  mindspore/       # Original Mindspore implementation
  torch/           # PyTorch/Megatron-LM port
  benchmark/       # HumanEval-X benchmark code
configs/           # Configuration scripts
scripts/           # Inference and benchmark scripts
vscode-extension/  # VS Code extension source code
generations/       # Code generation examples
tests/             # Test prompts
```

### Dependencies
Python 3.7+ / CUDA 11+ / PyTorch 1.10+ / DeepSpeed 0.6+
Core: fire, transformers>=4.22.0, tokenizers>=0.11.0, torch>=1.10.0, deepspeed>0.6.1, cpm_kernels

### IDE Extensions
- VS Code: Search "codegeex" in Marketplace
- JetBrains: 2021.1+ (IDEA, PyCharm, GoLand, CLion, Android Studio, etc.)
- Cloud Studio: Tencent web IDE

### News Timeline
- 2023-07-24: CodeGeeX2 released (more powerful, faster, lightweight, 100+ languages)
- 2023-05-16: Paper accepted by KDD 2023
- 2023-03-30: Paper on arXiv (2303.17568)
- 2023-02-14: Cloud Studio support
- 2023-02-13: OneFlow backend added
- 2022-12-31: FasterTransformer INT8 version (<15ms/token)
- 2022-12-13: VS Code extension source released
- 2022-12-11: JetBrains IDE support
- 2022-09-30: Cross-platform source code and weights released

### Key People
- Lead: Qinkai Zheng (Tsinghua KEG)
- Contributors: Xiao Xia, Xu Zou, Yuxiao Dong, Zhilin Yang, Jie Tang
- Computation sponsors: Peng Cheng Laboratory, Zhipu.AI

### License
- Code: Apache-2.0
- Model: Separate model license (MODEL_LICENSE)

### Links
- Homepage: https://codegeex.cn
- Blog: https://models.aminer.cn/codegeex/blog/
- Demo: https://models.aminer.cn/codegeex/playground
- Paper: https://arxiv.org/abs/2303.17568
- VS Code: https://marketplace.visualstudio.com/items?itemName=aminer.codegeex
- JetBrains: https://plugins.jetbrains.com/plugin/20587-codegeex
