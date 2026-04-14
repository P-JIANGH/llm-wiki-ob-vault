---
title: Seed-OSS
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, ai-model, open-source, reasoning, agent, long-context]
sources: [raw/articles/ai-game-devtools/seed-oss.md]
---

# Seed-OSS

ByteDance Seed Team 的 36B 开源 LLM 系列（Base + Instruct），2025-08-20 发布，Apache-2.0 许可。

## 概述

Seed-OSS 是字节 Seed 团队开发的开源大模型系列，专注**长上下文**、**推理**、**Agent** 能力。仅用 12T tokens 训练即在多项 benchmark 达到开源 SOTA。

## 模型规格

| 参数 | 值 |
|------|-----|
| 参数量 | 36B |
| 架构 | Causal LM + RoPE + GQA + SwiGLU + RMSNorm |
| QKV Heads | 80 / 8 / 8 |
| Hidden Size | 5120 |
| 层数 | 64 |
| 词表大小 | 155K |
| 上下文长度 | **512K**（原生） |
| RoPE Base | 1e7 |
| 训练数据量 | 12T tokens |

## 核心特性

### 思考预算控制（Thinking Budget）
可通过 `thinking_budget` 参数动态控制推理长度，推荐使用 512 的倍数（512、1K、2K、4K、8K、16K）。模型在推理过程中会周期性触发 `<seed:cot_budget_reflect>` 自我反思来估算已用/剩余 token 预算。

### 推理能力
- MATH: 81.7%（Base） / AIME24 91.7%（Instruct）
- BBH: 87.7%（Base）
- LiveCodeBench v6: 67.4%（Instruct，开源 SOTA）

### Agent 能力
- SWE-Bench Verified (AgentLess 4*10): **47%**（开源 SOTA）
- TAU1-Retail: **70.4%**（开源 SOTA）
- TAU1-Airline: 46%

### 研究友好
同时发布含合成指令数据（w/ syn.）和不含合成指令数据（w/o syn.）两个版本，方便后训练研究社区。

## 推理示例

```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained(
    "ByteDance-Seed/Seed-OSS-36B-Instruct",
    device_map="auto", torch_dtype=torch.bfloat16,
    attn_implementation="flash_attention_2"
)
tokenizer = AutoTokenizer.from_pretrained("ByteDance-Seed/Seed-OSS-36B-Instruct")

messages = [{"role": "user", "content": "Write quicksort in Python"}]
tokenized_chat = tokenizer.apply_chat_template(
    messages, tokenize=True, add_generation_prompt=True,
    return_tensors="pt", thinking_budget=512
)
```

推荐采样参数：temperature=1.1, top_p=0.95

## 依赖

```
transformers>=4.55.0
accelerate>=0.34.2
flash_attn>=2.6.3
```

## 相关模型

- [[ai-game-devtools/deepseek-r1]] — DeepSeek 推理模型，纯 RL 涌现，671B MoE
- [[ai-game-devtools/qwen3]] — 通义千问第三代，MoE+Dense 双模式，235B-A22B
- [[ai-game-devtools/s1]] — SimpleScaling 测试时扩展，Budget Forcing 逼出推理能力

## 链接

- GitHub: https://github.com/ByteDance-Seed/seed-oss
- HuggingFace: https://huggingface.co/collections/ByteDance-Seed/seed-oss-68a609f4201e788db05b5dcd
- 官网: https://seed.bytedance.com/
