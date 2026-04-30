---
title: OLMo — Open Language Model
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, model, open-source, ai]
sources: [raw/articles/ai-game-devtools/olmo.md]
---

# OLMo — Open Language Model

## 概述

OLMo 是 Allen Institute for AI (AI2) 开发的高性能开源语言模型系列。两阶段训练流程（Stage 1 大规模预训练 + Stage 2 高质量精调）结合模型平均（soup）策略，在多项基准上达到 SOTA。

**⚠️ 注意**: 此仓库已停止更新，最新模型和训练代码在 [OLMo-core](https://github.com/allenai/OLMo-core/) 仓库中。

## 模型规格

| 模型 | Stage 1 Tokens | Stage 2 Tokens | HuggingFace |
|------|---------------|----------------|-------------|
| OLMo-2 1B | 4T | 50B | `allenai/OLMo-2-0425-1B` |
| OLMo-2 7B | 4T | 50B (soup) | `allenai/OLMo-2-1124-7B` |
| OLMo-2 13B | 5T | 100B + 300B (soup) | `allenai/OLMo-2-1124-13B` |
| OLMo-2 32B | - | - | `allenai/OLMo-2-0325-32B` |

## 训练流程

**Stage 1**: 大规模网络数据预训练
- 数据集: [OLMo-mix-1124](https://huggingface.co/datasets/allenai/olmo-mix-1124)
- 1B/7B: 4T tokens; 13B: 5T tokens

**Stage 2**: 高质量精调
- 数据集: [Dolmino-mix-1124](https://huggingface.co/datasets/allenai/dolmino-mix-1124)
- 多种随机种子分别训练后进行权重平均（soup），提升稳定性

## 核心模块

```
olmo/
├── model.py      # Transformer 模型实现
├── config.py     # OmegaConf 配置管理
├── train.py      # 分布式训练入口
├── tokenizer.py  # 分词器封装
├── checkpoint.py # 检查点保存与加载
├── optim.py      # 优化器与学习率调度
├── data/         # 数据管道
hf_olmo/          # HuggingFace transformers 集成
scripts/
├── train.py                   # 训练脚本 (torchrun)
├── convert_olmo2_to_hf.py     # 转为 HuggingFace 格式
└── olmo2_modal_openai.py      # Modal.com 部署脚本
```

## 依赖技术

- **训练**: PyTorch >= 2.1, WandB, beaker-gantry, smashed, safetensors
- **推理**: transformers, tokenizers
- **存储**: boto3 (S3), google-cloud-storage
- **配置**: OmegaConf, click

## 推理使用

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
olmo = AutoModelForCausalLM.from_pretrained("allenai/OLMo-2-0425-1B")
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-2-0425-1B")
```

支持 8bit 量化（需 bitsandbytes）:
```python
AutoModelForCausalLM.from_pretrained("allenai/OLMo-2-0425-1B", load_in_8bit=True)
```

## 许可证

Apache 2.0

## 相关链接

- GitHub: https://github.com/allenai/OLMo
- HuggingFace: https://huggingface.co/allenai
- OLMo-core (活跃仓库): https://github.com/allenai/OLMo-core
- OLMo-eval: https://github.com/allenai/OLMo-eval
- olmes 基准: https://github.com/allenai/olmes
- 论文: [arXiv:2501.00656](https://arxiv.org/abs/2501.00656)

## 与同类工具的差异

相比 [[gpt4all]]（本地 LLM 运行时）和 [[llama2-webui]]（Web UI 推理框架），OLMo 专注于**模型训练**而非推理部署。OLMo 提供完整的预训练流程（数据→训练→评估），适合从头训练自定义 LLM，而其他工具主要是现成模型的消费级部署。

相比 [[mlc-llm]]（通用部署引擎），OLMo 是**模型本身**的提供者，而非跨平台推理优化框架。

OLMo 由 AI2 主导的完全开源（非 API 调用），属于 [[corenet]] 同一生态——两者均为 AI2/Apple 等机构开放权重模型的训练框架。
