# CodeGen2 — Salesforce

## Source

- **GitHub**: https://github.com/salesforce/CodeGen2
- **Paper**: [CodeGen2: Lessons for Training LLMs on Programming and Natural Languages](https://arxiv.org/abs/2305.02309) (ICLR 2023)
- **Hugging Face**: https://huggingface.co/Salesforce/codegen2-7B

## Overview

CodeGen2 is Salesforce AI Research's second-generation family of LLMs for program synthesis, published at ICLR 2023. Available in four sizes: **1B, 3.7B, 7B, 16B** parameters.

**Key improvement over CodeGen1**: Adds native **code infilling** support and expands programming language coverage.

## Architecture

- **Model Type**: Autoregressive transformer decoder (GPT-style)
- **Training Objective**: Cross-entropy loss to maximize sequential input likelihood
- **Input Formatting**: Dual approach — (1) Causal language modeling + (2) File-level span corruption
- **Tokenizer**: Custom (compatible with Hugging Face Transformers, requires `trust_remote_code=True`)

## Training Data

- **Dataset**: Stricter permissive subset of The Stack v1.1 (deduplicated) — BigCode project
- **Supported Languages (19)**: C, C++, C#, Dart, Go, Java, JavaScript, Kotlin, Lua, PHP, Python, Ruby, Rust, Scala, Shell, SQL, Swift, TypeScript, Vue

## Code Infilling

Uses special control tokens: `<mask_1>`, `<mask_N>`, `<sep>`, `<eom>`

Input format: `prefix + <mask_1> + suffix +  + <sep> + <mask_1>`

This enables mid-code generation — given a prefix and suffix, the model fills in the missing code.

## Evaluation

- Benchmarked on **HumanEval** (causal) and **HumanEval-Infill**
- Evaluated across all 4 model sizes

## Usage

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen2-7B")
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen2-7B", trust_remote_code=True)
```

## License

Research purposes only. Salesforce AUP and AI AUP apply.

## Authors

Erik Nijkamp*, Hiroaki Hayashi*, Caiming Xiong, Silvio Savarese, Yingbo Zhou (Salesforce AI Research)
(* indicates equal contribution)

## Project Structure (GitHub Repo)

The repo is minimal — primarily README with links to Hugging Face Hub for model checkpoints and model cards with detailed usage instructions.
