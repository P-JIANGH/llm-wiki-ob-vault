# CodeGeeX4 — Source Analysis

**Source:** https://github.com/THUDM/CodeGeeX4
**Captured:** 2026-04-17

## README Summary

CodeGeeX4-ALL-9B is the open-source version of the latest CodeGeeX4 model series. It is a multilingual code generation model continually trained on GLM-4-9B, significantly enhancing code generation capabilities.

Using a single CodeGeeX4-ALL-9B model, it supports:
- Code completion and generation
- Code interpreter
- Web search
- Function call
- Repository-level code Q&A
- Covers various software development scenarios

## Key Benchmarks

| Model | Seq Length | HumanEval | MBPP | NCB | LCB | HumanEvalFIM | CRUXEval-O |
|---|---|---|---|---|---|---|---|
| Llama3-70B-instruct | 8K | 77.4 | 82.3 | 37.0 | 27.4 | - | - |
| DeepSeek Coder 33B Instruct | 16K | 81.1 | 80.4 | 39.3 | 29.3 | 78.2 | 49.9 |
| Codestral-22B | 32K | 81.1 | 78.2 | 46.0 | 35.3 | 91.6 | 51.3 |
| CodeGeeX4-ALL-9B | 128K | 82.3 | 75.7 | 40.4 | 28.5 | 85.0 | 47.1 |

BigCodeBench: 48.9 (complete) and 40.4 (instruct) — highest scores among models <20B parameters.

Function Call: Only code model with Function Call capabilities; >90% success rate on AST and Exec test sets.

Context: 128K context length, 100% retrieval accuracy on NIAH (Needle In A Haystack) benchmarks.

## Deployment Options

### Ollama
- Available on Ollama 0.2+: `ollama run codegeex4`
- Can connect to VS Code / JetBrains extensions in local mode

### HuggingFace Transformers
- transformers 4.39.0–4.40.2
- `AutoModelForCausalLM.from_pretrained("THUDM/codegeex4-all-9b", trust_remote_code=True)`
- bfloat16 dtype recommended

### vLLM
- vllm 0.5.1
- Default: max_model_len=131072, tp_size=1
- For full 128K: max_model_len=1048576, tp_size=4
- OpenAI-compatible server available

### Candle (Rust)
- HuggingFace Candle framework support
- CPU and CUDA backends
- `cargo build -p codegeex4-cli --release --features cuda`

## Project Structure

```
guides/              # User guides (system prompt, infilling, repository tasks, local mode)
metric/              # Evaluation metrics and results (BigCodeBench, NaturalCodeBench, etc.)
candle_demo/         # Rust Candle deployment demo
langchain_demo/      # LangChain integration demo
llamaindex_demo/     # LlamaIndex integration demo
repodemo/            # Repository-level code Q&A demo (Chainlit-based)
resources/           # Images and assets
```

## Tutorials Provided

1. **System Prompt Guideline**: How to use system prompts in CodeGeeX4, including VSCode extension system prompts, customized prompts, multi-turn dialogue
2. **Infilling Guideline**: VSCode extension infilling format — general, cross-file, and new-file-in-repository
3. **Repository Tasks Guideline**: Repository-level QA tasks, triggering aicommiter capability for file operations
4. **Local Mode Guideline**: Local deployment + VS Code / JetBrains connection

## License

- Code: Apache-2.0
- Model weights: Open for academic research; commercial use requires registration form

## Links

- GitHub: https://github.com/THUDM/CodeGeeX4
- Homepage: https://codegeex.cn
- HuggingFace: https://huggingface.co/THUDM/codegeex4-all-9b
- VS Code Extension: https://marketplace.visualstudio.com/items?itemName=aminer.codegeex
- JetBrains Extension: https://plugins.jetbrains.com/plugin/20587-codegeex
- HF Demo: https://huggingface.co/spaces/THUDM/CodeGeeX
