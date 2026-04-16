# DeepSeek Coder — Raw Source

**Source:** https://github.com/deepseek-ai/DeepSeek-Coder
**Captured:** 2026-04-17
**License:** MIT (code), Model License (weights, supports commercial use)

---

## README Summary

DeepSeek Coder is composed of a series of code language models, each trained from scratch on 2T tokens, with a composition of 87% code and 13% natural language in both English and Chinese. Model sizes range from 1B to 33B.

### Key Features

- **Massive Training Data**: Trained from scratch on 2T tokens (87% code, 13% linguistic data in English and Chinese)
- **Highly Flexible & Scalable**: Model sizes of 1B, 5.7B, 6.7B, and 33B
- **Superior Performance**: State-of-the-art among open-source code models on HumanEval, MultiPL-E, MBPP, DS-1000, and APPS benchmarks
- **Advanced Code Completion**: 16K window size with fill-in-the-blank (FIM) support for project-level code completion and infilling

### Supported Programming Languages (86 languages)

ada, agda, alloy, antlr, applescript, assembly, augeas, awk, batchfile, bluespec, c, c-sharp, clojure, cmake, coffeescript, common-lisp, cpp, css, cuda, dart, dockerfile, elixir, elm, emacs-lisp, erlang, f-sharp, fortran, glsl, go, groovy, haskell, html, idris, isabelle, java, java-server-pages, javascript, json, julia, jupyter-notebook, kotlin, lean, literate-agda, literate-coffeescript, literate-haskell, lua, makefile, maple, markdown, mathematica, matlab, ocaml, pascal, perl, php, powershell, prolog, protocol-buffer, python, r, racket, restructuredtext, rmarkdown, ruby, rust, sas, scala, scheme, shell, smalltalk, solidity, sparql, sql, stan, standard-ml, stata, systemverilog, tcl, tcsh, tex, thrift, typescript, verilog, vhdl, visual-basic, xslt, yacc, yaml, zig

### Benchmark Results (Pass@1)

- DeepSeek-Coder-Base-33B outperforms CodeLlama-34B by 7.9% (HumanEval Python), 9.3% (HumanEval Multilingual), 10.8% (MBPP), 5.9% (DS-1000)
- DeepSeek-Coder-Base-7B reaches CodeLlama-34B performance level
- DeepSeek-Coder-Instruct-33B outperforms GPT-3.5-turbo on HumanEval, comparable on MBPP

### Data Creation Pipeline

1. Collect code data from GitHub, apply StarCoder Data filtering rules
2. Parse file dependencies within same repository, rearrange files by dependency
3. Concatenate dependent files, apply repo-level minhash deduplication
4. Filter low-quality code (syntax errors, poor readability)

### Model Training Pipeline

1. **Pre-training (Step 1)**: 87% code + 10% code-related language + 3% Chinese; 1.8T tokens; 4K window
2. **Extended Pre-training (Step 2)**: 16K window; additional 200B tokens → DeepSeek-Coder-Base
3. **Instruction Fine-tuning (Step 3)**: 2B instruction tokens → DeepSeek-Coder-Instruct

### Usage Examples

**Code Completion:**
```python
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
tokenizer = AutoTokenizer.from_pretrained("deepseek-ai/deepseek-coder-6.7b-base", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("deepseek-ai/deepseek-coder-6.7b-base", trust_remote_code=True, torch_dtype=torch.bfloat16).cuda()
input_text = "#write a quick sort algorithm"
inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_length=128)
```

**Code Insertion (FIM):**
Uses special tokens `<|fim▁begin|>`, `<|fim▁hole|>`, `<|fim▁end|>` for fill-in-the-blank code completion.

**Chat Model:**
Uses `apply_chat_template` with system prompt: "You are an AI programming assistant, utilizing the DeepSeek Coder model..."

**Repository-Level Code Completion:**
Can call classes/functions across multiple files in a project context.

### Fine-tuning

- Script: `finetune/finetune_deepseekcoder.py` (supports DeepSpeed)
- Data format: JSON lines with `instruction` and `output` fields
- Uses HuggingFace Trainer with DeepSpeed ZeRO-3

### vLLM Support

Supports high-throughput inference via vLLM with tensor parallelism.

### Quantization Support

- **GGUF (llama.cpp)**: Requires fork with HuggingFace Tokenizer support (Bytelevel-BPE)
- **GPTQ (exllamav2)**: Requires RoPE scaling to 4 for correct output

### Citation

```
@misc{deepseek-coder,
  author = {Daya Guo, Qihao Zhu, Dejian Yang, Zhenda Xie, Kai Dong, Wentao Zhang, Guanting Chen, Xiao Bi, Y. Wu, Y.K. Li, Fuli Luo, Yingfei Xiong, Wenfeng Liang},
  title = {DeepSeek-Coder: When the Large Language Model Meets Programming -- The Rise of Code Intelligence},
  journal = {CoRR},
  volume = {abs/2401.14196},
  year = {2024},
  url = {https://arxiv.org/abs/2401.14196},
}
```

### Repository Structure

```
DeepSeek-Coder/
├── demo/              # HuggingFace Spaces demo (app.py)
├── Evaluation/        # Benchmark evaluation scripts
├── finetune/          # Fine-tuning scripts (DeepSpeed support)
│   ├── finetune_deepseekcoder.py
│   ├── requirements.txt
│   └── configs/       # DeepSpeed configs
├── pictures/          # Images, logos, benchmark tables
├── README.md
├── requirements.txt
├── LICENSE-CODE       # MIT License
└── LICENSE-MODEL      # Model License (commercial use supported)
```
