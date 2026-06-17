# Panda / PandaLLM / PandaLLMOps

> Source: https://github.com/dandelionsllm/pandallm
> Captured: 2026-04-14

## 项目概述

Panda（熊猫）是一个中文开源大语言模型项目，2023年5月启动，包含三个子项目：

1. **PandaLLM** — 基于 LLaMA1/LLaMA2 的中文持续预训练大模型
2. **PandaLLMOps** — 大模型训练、推理、部署全流程工具
3. **PandaCommunity** — 中文大模型开发者社区

## 主要模型

### 可商用模型（LLaMA2 / OpenLLaMA 底座）
| 模型 | 大小 | 下载 |
|---|---|---|
| Legal-Panda-13B-Chat | 13B | huggingface |
| Code-Panda-13B-Python | 13B | huggingface |
| Panda-LLaMA2-13B | 13B | huggingface |
| Panda-LLaMA2-13B-Chat | 13B | huggingface |
| Panda-OpenLLaMA-7B | 7B | huggingface |

### 不可商用模型（LLaMA1 底座）
Panda-7B, Panda-Instruct-7B, Panda-13B, Panda-Instruct-13B, Flan-LLaMA-7B, Panda-13B-Chat

### 向量模型
- `panda-index-large-en` — 基于 Bert-large sentence-transformer 架构，在 MTEB 检索任务上 top-3

## 技术栈

### 训练框架
- **Deepspeed Zero-1** + Gradient Checkpointing
- **Hydra** 配置管理
- 支持：预训练、增量预训练、全参数量微调、LoRA、QLoRA、流水线并行

### 推理/部署
- 集成 vLLM、lightllm 等推理引擎
- 支持 Tensor Parallel、量化（8bit/4bit）

### 依赖
- PyTorch 2.0.1, DeepSpeed 0.9.5, Transformers, PEFT, Accelerate, fairscale, bitsandbytes

## 项目结构
```
pandallm/
├── models/          # 模型封装（llama.py, mpt, roberta, t5）
├── modules/         # 自定义层、logits processor、trie
├── trainer_*.py     # 各种训练脚本（Deepspeed/FSDP）
├── apply_delta.py   # LLaMA1 delta 权重合并
├── convert2ckpt.py  # 权重转换脚本
├── ds_inference.py  # Deepspeed 推理
├── conf/            # Hydra 配置文件
├── data/            # 数据处理
└── general_util/    # 通用工具（tokenization 等）
```

## 许可证
- Code: Apache 2.0
- Data: CC By-NC 4.0

## 链接
- GitHub: https://github.com/dandelionsllm/pandallm
- 官网: http://pandallm.ai (建设中)
- Tutorial: https://panda-tutorial.readthedocs.io/
