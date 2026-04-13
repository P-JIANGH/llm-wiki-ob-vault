---
title: Baichuan-13B
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, model, bilingual, open-source, china]
sources: [raw/articles/ai-game-devtools/baichuan-13b.md]
---

# Baichuan-13B

## Overview

百川智能开发的 **130 亿参数**开源可商用双语 LLM（Base + Chat 两个版本），2023 年 8 月发布。在 C-Eval、MMLU、CMMLU 等权威中英文 benchmark 上取得同尺寸最优效果。

## Key Facts

- **参数量**：13B（13,264,901,120）
- **训练数据**：1.4 万亿 tokens（超出 LLaMA-13B 40%）
- **位置编码**：ALiBi（线性偏置），上下文 4096
- **词表**：64,000
- **架构**：Transformer，40 层，5120 隐藏维度，40 头
- **许可证**：Apache 2.0（代码）+ 社区许可协议（模型，邮件申请后免费商用）
- **发布**：2023-08-01

## Benchmark Results

| Benchmark | Base | Chat |
|-----------|:----:|:----:|
| C-Eval    | 52.4 | 51.5 |
| MMLU      | 51.6 | 52.1 |
| CMMLU     | 55.3 | 55.8 |

全面超越 Vicuna-13B、LLaMA-13B、Chinese-Alpaca-Plus-13B 等同尺寸开源模型。

## Technical Highlights

- **ALiBi 位置编码**：相比 RoPE 计算量更小，推理速度比 LLaMA-13B 快 31.6%（A100 实测 25.4 vs 19.4 tokens/s）
- **int8/int4 量化**：int4 最低仅需 9.7GB GPU 显存，可部署在 RTX 3090 等消费级显卡
- **全量微调 + LoRA 微调**：支持通过 LLaMA Efficient Tuning 进行下游任务微调
- **多框架支持**：HuggingFace Transformers 原生加载，支持 PyTorch AMP、DeepSpeed

## Deployment Modes

| 方式 | 精度 | 显存/内存需求 |
|------|------|-------------|
| GPU fp16 | bf16/fp16 | 26 GB |
| GPU int8 | int8 | 15.8 GB |
| GPU int4 | int4 | 9.7 GB |
| CPU | fp32 | ~60 GB RAM |

提供 Web Demo（Streamlit）和 CLI Demo 开箱即用。

## Relationship to Other Models

- **Baichuan-7B**：前身，7B 参数，RoPE 位置编码，1.2 万亿 tokens
- **Baichuan 2**：2023 年 9 月发布的下一代模型（7B/13B），当前项目已指向新版
- **LLaMA-13B**：Meta 同尺寸基线，Baichuan-13B 在中文任务上大幅领先

## Related Links

- 🤗 [Baichuan-13B-Base (HuggingFace)](https://huggingface.co/baichuan-inc/Baichuan-13B-Base)
- 🤗 [Baichuan-13B-Chat (HuggingFace)](https://huggingface.co/baichuan-inc/Baichuan-13B-Chat)
- 💬 [微信交流群](https://github.com/baichuan-inc/Baichuan-13B/blob/main/media/wechat.jpeg?raw=true)

## Related Wiki Pages

- [[baichuan-7b]] — 前身 7B 模型，同一系列
- [[llm-integration]] — LLM 统一接入方式，可参考 Baichuan 在多 Provider 体系下的接入模式
- [[agent-loop]] — AI Agent 循环架构，LLM 是核心推理引擎
