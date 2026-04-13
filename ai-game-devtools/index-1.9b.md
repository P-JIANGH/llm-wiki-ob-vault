---
title: Index-1.9B
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [ai-model, llm, chinese-llm, open-source, long-context]
sources: [raw/articles/ai-game-devtools/index-1.9b.md]
---

# Index-1.9B

## Overview
Index-1.9B 是由[[Bilibili]] 开发的轻量级大语言模型系列，19亿非词嵌入参数，在2.8T 中英文语料上预训练。包含 Base、Pure、Chat、Character、32K 五个版本。其中 32K 版本以仅 1.9B 参数支持 32K 上下文长度，在长文本评测中甚至超越 7B 模型。

## Key Facts
| Hyperparameter | Value |
|---|---|
| Parameters | 1.9B (non-embedding) |
| Pretrain Tokens | 2.8T |
| Context Length | 4K (standard) / 32K (32K variant) |
| RoPE Base (32K) | 32 × 10000 |
| License | Apache-2.0 + INDEX_MODEL_LICENSE |

## Model Variants
| Model | Description |
|---|---|
| Index-1.9B-Base | 基座模型，同尺寸 benchmark 领先 |
| Index-1.9B-Pure | 控制版本，过滤所有指令数据，验证指令对 benchmark 的影响 |
| Index-1.9B-Chat | SFT + DPO 对齐，趣味性强，多语种翻译优秀 |
| Index-1.9B-Character | SFT + DPO + RAG，few-shot 角色扮演定制 |
| Index-1.9B-32K | 持续预训练 + SFT，专注 32K 长文本，支持 3.5 万字文档 |

## Architecture
- Transformer 因果语言模型
- [[RoPE]] (Rotary Position Embedding)，32K 版本 base = 32×10000
- Doc Packing 高效长文本训练
- 两阶段训练：Continue Pre-Train (32K) → SFT (32K)
- 32K 版本无 RLHF/DPO，专注于长上下文能力

## Performance
**Index-1.9B vs 同级模型：**
| Model | Average | MMLU | CEVAL | CMMLU | HellaSwag |
|---|---|---|---|---|---|
| **Index-1.9B** | **64.92** | 52.53 | 57.01 | 52.79 | **80.69** |
| Qwen2-1.5B | 65.17 | 56.5 | 70.6 | 70.3 | 66.6 |
| MiniCPM-2.4B | 62.53 | 53.8 | 49.19 | 50.97 | 67.29 |
| Phi-2 (2.7B) | 58.89 | 57.61 | 31.12 | 32.05 | 70.94 |

**32K 长文本评测（NeedleBench / LongBench / LEval）：**
- Index-1.9B-32K LongBench: 35.23（超越 longchat-7b-v1.5-32K 的 29.31）
- Index-1.9B-32K LEval: 35.86
- 短文本能力有所下降（约 25%），长文本与短文本能力存在权衡

## Key Features
- **多语种翻译**：尤其东亚语种（日、韩等）互译能力强
- **趣味性对话**：预训练引入互联网社区语料
- **Few-shot 角色扮演**：RAG + SFT + DPO
- **极致长上下文**：1.9B 参数实现 32K 上下文，仅 GPT-4 的 ~2%
- **量化支持**：int4 (bitsandbytes nf4)，节省显存
- **部署生态**：HuggingFace、ModelScope、Ollama、llama.cpp (GGUF)

## Training Details
- Long PT: 10B tokens 自建长文本语料，Doc Packing
- Long SFT: 30K+ 长文本指令 + 50K 通用指令
- 学习率：PT 1e-5，SFT 5e-6，Cosine schedule + warmup
- Batch：PT 4M tokens，SFT 1M tokens

## Failed Experiments
- Context Length Warmup：长度递增数据集训练 → loss 反弹
- Packing vs Non-Packing：差异 <1%
- 1‰ Long Instruction SFT（LLaMA 3 方案）：负面结果

## 与同类工具的差异
- 相比[[Baichuan-7B]]：参数更少（1.9B vs 7B）但 HellaSwag 更高（80.69 vs 25.04）
- 相比[[Qwen2]] 系列：超小参数实现 32K 上下文，qwen2-1.5b 仅支持 4K/32K
- 32K 版本以 1.9B 超越 7B 模型的 LongBench 表现
- 角色扮演能力通过 RAG 实现 few-shot 定制，区别于纯 SFT 对齐

## Related Links
- GitHub: https://github.com/bilibili/Index-1.9B
- HuggingFace: https://huggingface.co/IndexTeam
- ModelScope: https://modelscope.cn/models/IndexTeam
