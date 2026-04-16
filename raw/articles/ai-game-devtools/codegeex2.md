# CodeGeeX2 — A More Powerful Multilingual Code Generation Model

**Source**: https://github.com/THUDM/CodeGeeX2
**Date**: 2026-04-16

## README Summary

CodeGeeX2 is the second-generation multilingual code generation model from THUDM (Tsinghua KEG), succeeding [[CodeGeeX]] (KDD'23). Built on ChatGLM2-6B architecture with 600B code token pre-training.

### Key Specs
- **Parameters**: 6B (vs 13B in CodeGeeX-13B)
- **Architecture**: ChatGLM2-6B base + code pre-training
- **Sequence Length**: 8192 tokens
- **Training Data**: 600B code tokens
- **HumanEval Pass@1**: 35.9% (surpasses StarCoder-15B at 33.2%)
- **HumanEval-X**: 28.1% overall (Python 35.9%, C++ 29.3%, Java 30.8%, JS 32.2%, Go 22.5%, Rust 18.1%)
- **DS1000**: 23.1% overall

### Key Features
1. **107% improvement** over CodeGeeX-13B across all 6 languages
2. **Surpasses StarCoder-15B** despite having only 6B vs 15B parameters
3. **Lightweight deployment**: INT4 quantization requires only 5.5GB VRAM
4. **Fast inference**: 94 tokens/sec vs 32 tokens/sec (CodeGeeX-13B) — nearly 3x faster
5. **Multi-language support**: 100+ programming languages
6. **Bilingual**: Better support for both Chinese and English prompts
7. **IDE plugins**: VS Code + JetBrains (code completion, cross-file, infilling, Ask CodeGeeX chat)

### Quantization (VRAM Requirements)
| Mode | CodeGeeX-13B | CodeGeeX2-6B |
|------|-------------|-------------|
| FP16/BF16 | 26.9 GB | 13.1 GB |
| INT8 | 14.7 GB | 8.2 GB |
| INT4 | N/A | 5.5 GB |

### Inference Speed
| Model | Tokens/sec |
|-------|-----------|
| CodeGeeX-13B | 32 |
| CodeGeeX2-6B | 94 |

### Architecture Improvements
- **Multi-Query Attention** (MQA): Reduces KV cache size
- **Flash Attention**: Efficient attention computation via `scaled_dot_product_attention`
- **ChatGLM2 heritage**: Better Chinese/English bilingual capability

### Project Structure
```
demo/          # Gradio demo + FastAPI server
evaluation/    # HumanEval-X evaluation scripts
benchmark/     # Benchmarking code
docs/          # Inference tutorials (multi-GPU, acceleration)
scripts/       # Run scripts (run_humanevalx.sh)
resources/     # Images, logos
```

### Dependencies
```
protobuf, transformers>=4.30.2, accelerate, cpm_kernels, torch>=2.0, sentencepiece, gradio
```

### Usage (Quick Start)
```python
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained("THUDM/codegeex2-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("THUDM/codegeex2-6b", trust_remote_code=True, device='cuda')
model = model.eval()

# Language tag required for best performance
prompt = "# language: Python\n# write a bubble sort function\n"
inputs = tokenizer.encode(prompt, return_tensors="pt").to(model.device)
outputs = model.generate(inputs, max_length=256, top_k=1)
response = tokenizer.decode(outputs[0])
```

### Demos
- **Gradio**: `python ./demo/run_demo.py` (supports ChatGLM.cpp quantization via `--quantize 4 --chatglm-cpp`)
- **FastAPI**: `python ./demo/fastapicpu.py` (CPU/half/quantize options)

### License
- **Code**: Apache-2.0
- **Model**: Research use free; commercial use requires registration form at open.bigmodel.cn

### Successor
CodeGeeX4 has been released as the latest generation (see README note).
