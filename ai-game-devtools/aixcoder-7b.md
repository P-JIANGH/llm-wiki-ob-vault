---
title: aiXcoder-7B
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [llm, code-generation, code-completion, open-source, game-dev]
sources: [raw/articles/ai-game-devtools/aixcoder-7b.md]
---

# aiXcoder-7B

## 概述

aiXcoder-7B 是由 aiXcoder 团队开源的代码大语言模型（Code LLM），专注于代码补全和代码生成场景。在 7B 参数量级上，它是目前开源模型中代码补全效果最佳的模型，在多语言 nl2code benchmark 上超越了 CodeLlama 34B 和 StarCoder2 15B。

## 关键信息

| 项目 | 值 |
|------|-----|
| 参数量 | 7B |
| 训练数据量 | 1.2T Unique Tokens |
| 词汇表大小 | 49,152 (BPE) |
| 序列长度 | 32,768 |
| 位置编码 | RoPE |
| 激活函数 | SwiGLU |
| 注意力机制 | Grouped Query Attention |
| 许可证 | Apache-2.0 (代码) / Model License (权重) |
| GitHub | https://github.com/aixcoder-plugin/aiXcoder-7B |
| HuggingFace | https://huggingface.co/aiXcoder/aixcoder-7b-base |
| 论文 | https://arxiv.org/pdf/2410.13187 |

## 核心能力

### 多语言代码补全
支持约 100 种主流编程语言（C++、Python、Java、JavaScript、Go、Rust 等），通过 FIM（Fill-In-the-Middle）机制实现上下文感知的代码补全。

### 结构化 FIM 训练
与传统的随机字符级 FIM 不同，aiXcoder-7B 基于代码的抽象语法树（AST）构建训练任务——随机选取 AST 中的完整节点作为 MIDDLE 部分，使模型生成更完整、层次结构更正确的代码。

### 跨文件代码理解
通过 Calling Graph + K-Means + TF-IDF 聚类等方法将项目中相似的代码文件组织在一起，帮助模型理解文件间依赖关系，在 CrossCodeEval 跨文件评估上表现优异。

### 量化推理支持
支持 int8 和 int4 量化（bitsandbytes），降低推理显存占用。int4 模式下模型显存占用约 6.5GB。

### 微调能力
提供基于 Huggingface PEFT 的 LoRA 微调示例，可针对特定代码库或编程语言进行领域适配。

## 技术特点

### 数据质量 pipeline
核心数据集经过 7 步严格清洗：
1. 排除 GPL 等 copyleft 许可证项目
2. GitHub Stars / Commit 数量 / 测试文件量综合排名过滤
3. MinHash 去重 + 自动生成代码去除
4. NER 模型去除敏感信息（姓名、IP、密码等）
5. 随机删除大量注释代码
6. 主流 50 种语言语法解析过滤
7. 静态分析检测 163 类 Bug 和 197 类安全漏洞

### IDE 插件生态
提供商业级 VS Code 和 JetBrains 插件，可直接在 IDE 中使用 aiXcoder-7B 进行代码补全。

### 推理入口
- `sess_megatron.py` — 基于 Megatron-LM 的推理
- `sess_huggingface.py` — 基于 Huggingface Transformers 的推理
- 支持 Flash Attention 加速

## 游戏开发应用

aiXcoder-7B 可用于游戏开发中的代码生成场景：
- 快速生成游戏逻辑代码（Unity C#/C++、Unreal C++等）
- AI Agent 代码生成和行为树实现
- 批量生成游戏配置解析代码
- 跨文件理解游戏项目结构进行上下文感知补全

## 相关工具

- [[CodeGeeX4]] — 另一个国产代码大模型，支持代码生成和翻译
- [[DeepSeek-Coder]] — DeepSeek 开源的代码大模型
- [[StarCoder 2]] — BigCode 项目的代码大模型
- [[Code Llama]] — Meta 开源的代码大模型
- [[llm.c]] — Karpathy 的 C 语言 LLM 训练实现

## 许可

- 源代码：Apache-2.0
- 模型权重：学术研究免费，商用需发送邮件至 support@aiXcoder.com 申请
