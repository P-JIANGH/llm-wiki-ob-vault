---
title: Large World Model (LWM)
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, multimodal, video-model, ai]
sources: [raw/articles/ai-game-devtools/large-world-model-lwm.md]
---

# Large World Model (LWM)

## Overview

**Large World Model (LWM)** 是通用大规模上下文多模态自回归模型，基于 RingAttention 技术在大规模长视频和书籍数据集上训练，支持语言、图像和视频的理解与生成，上下文可达 **100 万 tokens**（1M）。由 Hao Liu (UC Berkeley)、Wilson Yan、Matei Zaharia、Pieter Abbeel 等人提出。

## Key Capabilities

| Capability | Description |
|---|---|
| **超长上下文检索** | 在 100 万 token 上下文中精确检索 Needle-in-haystack 事实 |
| **长视频理解** | 可回答超过 1 小时 YouTube 视频内容相关问题 |
| **图像对话** | 支持多模态对话式图像理解 |
| **视频/图像生成** | 支持文本到视频、文本到图像生成 |

## Architecture

- **RingAttention**: 通过块块注意力机制实现近无限上下文的可扩展训练（4K → 1M tokens）
- **Blockwise Parallel Transformer**: 分块并行计算突破内存限制
- **Masked Sequence Packing**: 混合不同长度序列训练
- **VQGAN**: 视觉 tokenizer，将图像/视频离散化为 token
- **LLaMA 7B Backbone**: 70 亿参数 Transformer 主干
- **双框架实现**: JAX (TPU 优化) + PyTorch (推理)
- **渐进式上下文扩展**: 从 4K 逐步扩展到 1M tokens

## Available Models

所有模型均为 7B 参数：

| 模型 | 上下文 | 类型 | 对话/基座 |
|---|---|---|---|
| LWM-Text-Chat-128K/256K/512K/1M | 128K-1M | 纯语言 | Chat |
| LWM-Text-128K/256K/512K/1M | 128K-1M | 纯语言 | Base |
| LWM-Chat-32K/128K/1M | 32K-1M | 视觉-语言 | Chat |

视觉-语言模型仅提供 JAX 版本；语言模型同时提供 PyTorch 和 JAX 版本，均托管于 HuggingFace。

## Code Structure (`lwm/`)

- `data.py` — 数据加载（HuggingFace datasets + JSONL）、TextProcessor 多模态 tokenization
- `llama.py` — LLaMA 模型实现
- `vision_llama.py` — 视觉-语言 LLaMA
- `train.py` — 训练入口
- `vision_chat.py` — 视觉-语言对话推理
- `vision_generation.py` — 文本到图像/视频生成
- `vqgan.py` — VQGAN 视觉 tokenizer

## Key Configurations

```bash
# 块大小控制
scan_query_chunk_size=128   # self-attention 块大小
scan_key_chunk_size=128
scan_mlp_chunk_size=8192    # feedforward 块大小

# 并行度控制
mesh_dim='dp,fsdp,tp,sp'   # 数据并行/张量并行/序列并行
# 例如 mesh_dim='1,1,4,64' 启用 64 路 RingAttention
```

## Game Dev Relevance

LWM 对游戏开发的潜在价值：

- **NPC 对话系统**: 超长上下文支持 NPC 记住整个游戏世界的历史对话和事件
- **游戏视频理解**: 分析玩家录像、生成游戏内容
- **虚拟世界建模**: 结合 [[cosmos]] 世界基础模型，构建可交互的游戏物理世界
- **游戏 AI NPC**: 视频+语言联合训练使 NPC 能同时理解视觉场景和自然语言指令

## Related

- [[cosmos]] — NVIDIA 物理 AI 世界基础模型平台
- [[deepseek-r1]] — DeepSeek 推理模型（长上下文能力）
- [[llm-integration]] — LLM 集成到游戏的一般方法
- [[multi-agent-ai-simulation]] — 多智能体 AI 模拟概念

## License

- 代码: Apache 2.0
- 模型: Llama-2 License

## References

- [Project Page](https://largeworldmodel.github.io/)
- [arXiv Paper](https://arxiv.org/abs/2402.08268)
- [HuggingFace Models](https://huggingface.co/LargeWorldModel)
- GitHub: https://github.com/LargeWorldModel/LWM
