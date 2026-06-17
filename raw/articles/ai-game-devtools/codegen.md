# CodeGen — Salesforce 开源代码生成模型家族

**Source**: https://github.com/salesforce/CodeGen
**Date**: 2026-04-17
**Category**: Code (Code Generation Models)

## README 摘要

CodeGen 是 Salesforce AI Research 开发的开源大语言模型系列，专注于**程序合成（Program Synthesis）**。包含三代模型：

### CodeGen1.0 (2022-03)
- 模型规模：2B, 6B, 16B
- 发表于 ICLR 2023: "CodeGen: An Open Large Language Model for Code with Multi-Turn Program Synthesis"
- 发布时与 OpenAI Codex 性能相当
- 多轮程序合成能力

### CodeGen2.0 (2023-05)
- 模型规模：1B, 3.7B, 7B, 16B
- 发表于 ICLR 2023: "CodeGen2: Lessons for Training LLMs on Programming and Natural Languages"
- 增强的 infill sampling 能力（代码补全）
- 训练结合编程语言和自然语言

### CodeGen2.5 (2023-07) — "Small, but mighty"
- 模型规模：7B
- 7B 参数模型超越 16B 参数模型的性能
- 预训练数据：StarCoderData (BigCode 项目)
- 许可证：Apache-2.0（multi/mono 变体），instruct 变体仅限研究用途
- 模型：codegen25-7b-multi, codegen25-7b-mono, codegen25-7b-instruct

## 项目结构

```
codegen/
├── codegen1/          # CodeGen1.0 相关代码
│   ├── jaxformer/     # Jaxformer 训练库（预处理、训练、微调）
│   ├── benchmark/     # MTPB 基准测试代码
│   └── requirements.txt
├── codegen2/          # CodeGen2.0 相关代码
│   └── requirements.txt
├── codegen25/         # CodeGen2.5 相关代码
│   └── requirements.txt
├── assets/            # 图片和 Logo
└── README.md          # 主文档
```

## 使用方法

所有模型均可通过 Hugging Face Transformers 直接使用：

```python
# CodeGen1
from transformers import AutoTokenizer, AutoModelForCausalLM
tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen-2B-mono")
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen-2B-mono")

# CodeGen2
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen2-7B", trust_remote_code=True)

# CodeGen2.5
tokenizer = AutoTokenizer.from_pretrained("Salesforce/codegen25-7b-mono", trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained("Salesforce/codegen25-7b-mono")
```

## 依赖

- transformers>=4.29.2 (CodeGen2.5)
- tiktoken==0.4.0 (CodeGen2.5)
- Jaxformer 库用于训练/微调: https://github.com/salesforce/jaxformer

## 许可证

Apache License 2.0（代码和大部分模型权重）
- CodeGen2.5 instruct 变体仅限研究用途
- Salesforce AI 道德免责声明：研究用途优先，部署前需评估准确性、安全性和公平性

## 与同类工具对比

| 模型 | 参数量 | 发布者 | 发布时间 | 特点 |
|------|--------|--------|----------|------|
| CodeGen1 | 2B-16B | Salesforce | 2022-03 | 与 Codex 相当 |
| CodeGen2 | 1B-16B | Salesforce | 2023-05 | 增强 infill |
| CodeGen2.5 | 7B | Salesforce | 2023-07 | 7B 超 16B |
| CodeGeeX | 13B | THUDM | 2022-06 | 多语言翻译 |
| StarCoder | 15.5B | BigCode | 2023 | StarCoderData |
| Code Llama | 7B-34B | Meta | 2023 | Python 专精 |
