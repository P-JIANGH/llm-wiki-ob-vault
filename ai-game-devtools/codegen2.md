---
title: CodeGen2
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [llm, code-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/codegen2.md]
---

# CodeGen2

**CodeGen2** is Salesforce AI Research's second-generation family of large language models for **program synthesis** (代码生成), published at ICLR 2023. Available in four sizes: **1B, 3.7B, 7B, 16B** parameters.

## Key Improvements over CodeGen1

- Native **code infilling** support — given prefix and suffix, fills in missing code
- Expanded programming language coverage from ~8 to **19 languages**
- Stricter permissive training data subset of The Stack v1.1 (deduplicated)

## Architecture

- **Model Type**: Autoregressive transformer decoder (GPT-style)
- **Training Objective**: Cross-entropy loss for sequential input likelihood
- **Input Formatting**: Dual approach — (1) Causal LM + (2) File-level span corruption
- **Infill Tokens**: `<mask_1>`, `<mask_N>`, `<sep>`, `<eom>`

## Supported Languages (19)

C, C++, C#, Dart, Go, Java, JavaScript, Kotlin, Lua, PHP, Python, Ruby, Rust, Scala, Shell, SQL, Swift, TypeScript, Vue

## Evaluation

- **HumanEval** — causal code generation benchmark
- **HumanEval-Infill** — mid-code completion benchmark

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

## Game Dev Relevance

- AI-assisted game logic code generation (Unity C#, Godot GDScript, etc.)
- Automated shader/script generation assistance
- Multi-language support useful for game tool pipelines
- Code infilling enables IDE autocomplete for game development

## Related Pages

- [[ai-game-devtools/codegen]] — Salesforce CodeGen family (CodeGen1/2/2.5), comprehensive overview
- [[ai-game-devtools/codegeex]] — THUDM 13B multilingual code generation, similar scope
- [[ai-game-devtools/aixcoder-7b]] — aiXcoder 7B code model, AST-FIM training approach

## Links

- **GitHub**: https://github.com/salesforce/CodeGen2
- **Paper**: https://arxiv.org/abs/2305.02309 (ICLR 2023)
- **Hugging Face**: https://huggingface.co/Salesforce/codegen2-7B
- **Model Cards**: https://huggingface.co/Salesforce/codegen2-1B
