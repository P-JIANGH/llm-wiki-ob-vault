---
title: CodeTF - Salesforce Code LLM Transformer Library
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, llm, tool, code, code-generation, open-source]
sources: [raw/articles/ai-game-devtools/codetf.md]
---

# CodeTF — Salesforce Code LLM Transformer Library

Salesforce 开源的 Python Transformer 库，专注于代码大语言模型（Code LLM）和代码智能任务。提供统一的训练和推理接口，支持代码摘要、翻译、生成、补全、克隆检测、缺陷预测等任务。

## 核心功能

- **快速模型推理：** 支持预量化模型（int8/int16/float16），自动设备管理，大模型支持 GPU 权重分片
- **参数高效微调：** PEFT 驱动（LoRA/Prefix-Tuning/P-Tuning/AdaLORA），~14 行代码完成 CodeXGLUE 微调
- **代码工具集：** tree-sitter AST 解析器支持 15+ 编程语言，提取函数名/变量名/注释/类名
- **数据集+：** 预处理 HumanEval/MBPP/CodeXGLUE/APPS 基准，一行加载
- **评估器：** pass@k/CodeBLEU/BLEU 等指标，~15 行代码完成 HumanEval 评测

## 架构模块

| 模块 | 功能 |
|------|------|
| `models/` | 模型加载管线（BERT/Seq2Seq/CausalLM 三类） |
| `trainer/` | CodeT5Seq2SeqTrainer、CausalLMTrainer |
| `performance/` | ModelEvaluator + EvaluationMetric（pass@k/CodeBLEU/BLEU/EditSim） |
| `data_utility/` | 数据集加载器（CodeXGLUE/HumanEval/APPS/MPP） |
| `code_utility/` | AST 解析（tree-sitter）+ 15+ 语言特定工具 |
| `configs/` | Model Card 配置（HuggingFace URL/tokenizer/max_length） |
| `common/` | Registry 模式 + 工具函数 |

## 支持的模型族

- **CodeT5/CodeT5+**（220M~16B）：NL2Code、代码摘要（6语言）、翻译、精炼
- **CodeGen**（350M~16B）：Mono/Multi/NL 变体，Salesforce 代码生成模型家族
- **StarCoder**（15.5B）：BigCode 项目代码模型
- **CodeBERT/CodeBERTa/UniXcoder**：微软/微软亚洲研究院代码预训练模型
- **GPT-NeoX/GPT-Neo/GPT-J/Incoder/SantaCoder/CodeParrot**：多种开源代码模型

## 与同类工具差异

相比 [[codegen]]（仅模型本身），CodeTF 提供完整工具链（推理+微调+评估+数据集+代码工具），将 HuggingFace 230 行 HumanEval 评估代码缩减到 14 行。相比 [[codegeex]] 的专用代码生成定位，CodeTF 是多模型聚合平台，定位为 HuggingFace Transformers 的代码智能增强层而非替代品。与 [[bloop]] 的代码搜索场景不同，CodeTF 专注代码理解和生成。

## 关键信息

- **仓库：** https://github.com/salesforce/CodeTF
- **PyPI：** salesforce-codetf v1.0.2.2
- **论文：** arXiv:2306.00029
- **许可：** Apache 2.0
- **Python：** 3.8+
- **依赖：** PyTorch 2.0.1 + transformers 4.30.2 + PEFT + accelerate + tree-sitter
- **作者：** Nghi D.Q. Bui, Henry Le, Yue Wang, Akhilesh Deepak Gotmare, Junnan Li, Steven Hoi（Salesforce）
