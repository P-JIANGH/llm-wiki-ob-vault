# Chinese-LLaMA-Alpaca-3

> Source: https://github.com/ymcui/Chinese-LLaMA-Alpaca-3
> Clone date: 2026-04-13
> License: See GitHub (Chinese-LLaMA-Alpaca series)

## 项目概述

本项目基于 Meta 最新发布的 Llama-3 开发，是 Chinese-LLaMA-Alpaca 开源大模型系列的第三期。开源了中文 Llama-3 基座模型和中文 Llama-3-Instruct 指令精调大模型。

## 主要内容

- 开源 Llama-3-Chinese 基座模型和 Llama-3-Chinese-Instruct 指令模型（v1, v2, v3）
- 开源预训练脚本、指令精调脚本
- 开源指令精调数据：alpaca_zh_51k, stem_zh_instruction, ruozhiba_gpt4
- 支持 transformers, llama.cpp, text-generation-webui, vLLM, Ollama 等生态

## 模型版本

| 版本 | 类型 | 基模型 | 特点 |
|------|------|--------|------|
| Llama-3-Chinese-8B | 基座 | Meta-Llama-3-8B | 120GB 中文语料预训练 |
| Llama-3-Chinese-8B-Instruct-v1 | 指令 | Llama-3-Chinese-8B | 500万指令数据精调 |
| Llama-3-Chinese-8B-Instruct-v2 | 指令 | Meta-Llama-3-8B-Instruct | 直接500万指令数据精调 |
| Llama-3-Chinese-8B-Instruct-v3 | 指令 | inst-v1+inst-v2+inst-meta 融合 | 模型融合+5K指令精调，Elo 1627 |

## 核心特点

- **使用原版 Llama-3 词表**：128K BPE 词表，中文编码效率约为中文 LLaMA-2 的 95%
- **长上下文 8K**：比二代 4K 扩展一倍，支持 PI/NTK/YaRN 扩展
- **GQA 机制**：分组查询注意力，提升效率
- **训练方式**：LoRA + 全量 emb/lm-head 微调

## 评测效果（C-Eval Valid）

| 模型 | 0-shot | 5-shot |
|------|---------|--------|
| Llama-3-Chinese-8B-Instruct-v3 | 55.2 | 54.8 |
| Llama-3-Chinese-8B-Instruct-v2 | 51.6 | 51.6 |
| Chinese-Mixtral-Instruct (8x7B) | 51.7 | 55.0 |
| Meta-Llama-3-8B-Instruct | 51.3 | 51.3 |

## 部署支持

支持 llama.cpp (GGUF量化)、transformers、text-generation-webui、LM Studio、Ollama、vLLM

## 相关项目

同系列：Chinese-LLaMA-Alpaca（一期）、Chinese-LLaMA-Alpaca-2（二期）、Chinese-Mixtral
