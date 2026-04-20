---
title: Panda / PandaLLM / PandaLLMOps
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [tool, open-source, llm, chinese, deepspeed, training]
sources: [raw/articles/ai-game-devtools/pandallm.md]
---

# Panda / PandaLLM / PandaLLMOps

中文开源大语言模型项目，2023年5月启动。包含三个子项目：

- **PandaLLM** — 基于 LLaMA1/LLaMA2 的中文持续预训练大模型
- **PandaLLMOps** — 大模型训练、推理、部署全流程工具
- **PandaCommunity** — 中文大模型开发者社区

## 模型系列

### 可商用模型（LLaMA2 / OpenLLaMA 底座）
| 模型 | 大小 | 特点 |
|---|---|---|
| Legal-Panda-13B-Chat | 13B | 法律领域微调 |
| Code-Panda-13B-Python | 13B | Python 代码生成 |
| Panda-LLaMA2-13B | 13B | 通用中文 |
| Panda-LLaMA2-13B-Chat | 13B | 对话优化 |
| Panda-OpenLLaMA-7B | 7B | OpenLLaMA 底座 |

### 向量检索模型
- `panda-index-large-en` — 基于 Bert-large sentence-transformer，MTEB 检索任务 top-3

## 技术特点

**训练框架：** DeepSpeed Zero-1 + Gradient Checkpointing + Hydra 配置管理

**支持的训练模式：**
- 从零预训练
- 增量预训练
- 全参数微调
- LoRA / QLoRA
- 流水线并行（支持 MPT-30B）

**推理部署：** 集成 vLLM / lightllm，支持 Tensor Parallel、8bit/4bit 量化

**关键技术细节：**
- 使用 `bfloat16` 训练（非安培架构需注意 fp16 兼容）
- LLaMA1 delta 权重机制：发布差值而非完整权重，通过 `apply_delta.py` 合并
- PEFT/Transformers/Accelerate 集成于 `models.llama.LlamaPreTrainedModelPeftMixin`

## 许可证
- Code: Apache 2.0
- Data: CC By-NC 4.0

## 相关链接
- GitHub: https://github.com/dandelionsllm/pandallm
- Tutorial: https://panda-tutorial.readthedocs.io/

## See Also
- [[ai-game-devtools/llama-3]] — Meta LLaMA 系列
- [[ai-game-devtools/metagpt]] — 多 Agent 软件开发框架
- [[ai-game-devtools/mlc-llm]] — 通用 LLM 部署引擎
