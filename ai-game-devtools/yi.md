---
title: Yi
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [llm, open-source, chinese-llm]
sources: [raw/articles/ai-game-devtools/yi.md]
---

# Yi

## Overview
Yi 是由 `01.AI`（零一万物）从头训练的新一代开源大语言模型系列，专注于中英双语。采用 Transformer 架构（与 [[LLaMA]] 相同结构但权重独立训练），在 3T tokens 多语言语料上训练。Yi-34B-Chat 在 AlpacaEval 排行榜上仅次于 GPT-4 Turbo，超越 GPT-4、Mixtral、Claude 等模型。

## Key Facts
| Hyperparameter | Value |
|---|---|
| 参数量 | 6B / 9B / 34B |
| 训练数据 | 3T tokens |
| 数据截止日期 | 2023年6月 |
| 默认上下文窗口 | 4K（200K 变体支持 200K） |
| 许可证 | Apache 2.0 + Yi Series Models Community License |
| 开发方 | 01.AI (零一万物) |

## 模型系列

### Base Models
- **Yi-6B**: 6B 参数，适合个人和学术使用
- **Yi-9B**: 6B 续训 0.8T tokens，代码/数学/常识推理最强（超越 Mistral-7B、SOLAR-10.7B、Gemma-7B）
- **Yi-34B**: 适合个人、学术和商业用途（中小企业），性价比高

所有 base model 有 200K 上下文变体。

### Chat Models
| 模型 | 说明 |
|---|---|
| Yi-34B-Chat | AlpacaEval 排行榜第二名（仅次于 GPT-4 Turbo） |
| Yi-6B-Chat | 轻量级对话模型 |
| AWQ 4-bit / GPTQ 8-bit 量化版 | 消费级 GPU 可运行（3090/4090） |

### VL Models
| 模型 | 说明 |
|---|---|
| Yi-VL-34B | MMMU 和 CMMMU 基准开源第一 |
| Yi-VL-6B | 轻量级多模态视觉语言模型 |

## Architecture
- 基于 `Transformer` 架构（[[LLaMA]] 风格）
- 与 LLaMA 的关系：仅采用相同架构，权重独立训练，非 LLaMA 衍生
- RoPE (Rotary Position Embedding) 支持长上下文
- 支持 pip / Docker / [[llama.cpp]] / 量化 / 微调 / 部署

## Performance Highlights
- **Yi-34B-Chat**: AlpacaEval 第二名（2024年1月数据）
- **Yi-34B**: Hugging Face Open LLM Leaderboard 开源第一（中英双语）
- **Yi-9B**: 同尺寸开源模型中代码/数学/推理最强
- **Yi-34B-200K**: Needle-in-a-Haystack 测试 99.8%

## Ecosystem
- **上游**: Hugging Face Transformers, PyTorch
- **下游**: 微调（ftune）、量化（AWQ/GPTQ）、部署（vLLM、TGI）、API 服务

## 与同类工具的差异
- 相比 `LLaMA-2`: 专注中英双语，34B 性能对标 GPT-4 级别
- 相比 [[Baichuan-7B]]: 更大参数量（34B vs 7B），训练数据量更大（3T vs 1.2T）
- 相比 `Qwen-7B`: 同样走双语路线，Yi-34B 在推理能力上更强

## Related Links
- GitHub: https://github.com/01-ai/Yi
- Hugging Face: https://huggingface.co/01-ai
- ModelScope: https://www.modelscope.cn/organization/01ai/
- Tech Report: https://arxiv.org/abs/2403.04652
- Discord: https://discord.gg/hYUwWddeAu
