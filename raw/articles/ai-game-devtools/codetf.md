# CodeTF - A One-stop Transformer Library for State-of-the-art Code LLM

**Source:** https://github.com/salesforce/CodeTF
**Captured:** 2026-04-17

## README Summary

CodeTF is a one-stop Python transformer-based library for code large language models (Code LLMs) and code intelligence. Provides a seamless interface for training and inferencing on code intelligence tasks like code summarization, translation, code generation and so on.

**Key Features:**
- **Fast Model Serving:** Easy-to-use interface for rapid inferencing with pre-quantized models (int8, int16, float16). Device management handled automatically. Weight sharding across GPUs supported.
- **Fine-Tuning:** PEFT-based parameter-efficient fine-tuning (LoRA, Prefix-Tuning, P-Tuning, Prompt Tuning, AdaLORA) on distributed environments.
- **Supported Tasks:** nl2code, code summarization, code completion, code translation, code refinement, clone detection, defect prediction.
- **Datasets+:** Preprocessed benchmarks (Human-Eval, MBPP, CodeXGLUE, APPS) with easy loading.
- **Model Evaluator:** Evaluate on well-known benchmarks (Human-Eval) with pass@k metrics in ~15 LOC.
- **Pretrained Models:** CodeBERT, CodeT5, CodeGen, CodeT5+, Incoder, StarCoder, SantaCoder, GPT-NeoX, GPT-Neo, GPT-J, CodeParrot, etc.
- **Fine-Tuned Models:** 8+ downstream task checkpoints.
- **Code Utilities:** tree-sitter based AST parsers for 15+ programming languages (Java, Apex, C, C++, C#, Python, Scala, PHP, JavaScript, Go, Kotlin, Ruby, Rust, Solidity, YAML). Extract function names, comments, variable names, remove comments.

**Supported Models:**
| Model | Size | Tasks |
|-------|------|-------|
| CodeT5 | Base variants | NL2Code, Refine, Translation, Summarization (6 langs), Clone, Defect |
| CodeT5+ | 220M-16B | Pretrained, NL2Code, Refine, Defect |
| CodeGen | 350M-16B (Mono/Multi/NL) | Pretrained |
| StarCoder | 15.5B | Pretrained |
| SantaCoder | 1.1B | Pretrained |
| GPT-NeoX | 20B | Pretrained |
| CodeBERT | base variants | Pretrained |
| Incoder | 6B | Pretrained |
| CodeParrot | 110M-1.5B | Pretrained |

**Architecture:**
- `codetf/models/` — Model loading (bert_models, seq2seq_models, causal_lm_models)
- `codetf/trainer/` — CodeT5Seq2SeqTrainer, CausalLMTrainer, BaseTrainer
- `codetf/performance/` — ModelEvaluator, EvaluationMetric (BLEU, CodeBLEU, pass@k, Edit Similarity)
- `codetf/data_utility/` — CodeXGLUEDataset, HumanEvalDataset, APPSDataset, MPPDataset, CustomDataset
- `codetf/code_utility/` — AST parser (tree-sitter), language-specific utilities (Python, Java, Apex, etc.)
- `codetf/configs/` — Model card configurations
- `codetf/common/` — Registry pattern, utilities

**Installation:** `pip install salesforce-codetf` (PyPI: v1.0.2.2)

**Technical Report:** arXiv:2306.00029

**Authors:** Nghi D. Q. Bui, Henry Le, Yue Wang, Akhilesh Deepak Gotmare, Junnan Li, Steven Hoi. (Salesforce)

**License:** Apache 2.0
**Python:** 3.8+

**Key Dependencies:** PyTorch 2.0.1, transformers 4.30.2, PEFT 0.3.0, accelerate 0.20.3, tree-sitter 0.20.1, bitsandbytes 0.39.1
