# Llama Models — Meta Llama 模型集合

> Source: https://github.com/meta-llama/llama-models
> Cloned: 2026-04-14

## Overview

`llama-models` 是 Meta 维护的 Llama 模型家族统一仓库，提供 CLI 工具下载和管理模型权重、推理脚本、模型元数据。Llama 3.1 是该系列的重要里程碑，首次将 405B 参数模型带入开源领域。

## Llama 模型家族（截至 2026-04）

| Model | Launch date | Sizes | Context | Tokenizer | License |
|-------|------------|-------|---------|-----------|---------|
| Llama 2 | 2023-07-18 | 7B, 13B, 70B | 4K | Sentencepiece | Use Policy |
| Llama 3 | 2024-04-18 | 8B, 70B | 8K | TikToken | Use Policy |
| Llama 3.1 | 2024-07-23 | 8B, 70B, **405B** | **128K** | TikToken | Use Policy |
| Llama 3.2 | 2024-09-25 | 1B, 3B, 11B, 90B | 128K | TikToken | Use Policy |
| Llama 3.3 | 2024-12-04 | 70B | 128K | TikToken | Use Policy |
| Llama 4 | 2025-04-05 | Scout-17B-16E, Maverick-17B-128E | **10M, 1M** | TikToken | Use Policy |

## Llama 3.1 关键规格

- **参数规模**: 8B / 70B / **405B**
- **上下文长度**: 128K tokens
- **训练数据**: 15T+ tokens 公开在线数据
- **Tokenizer**: TikToken-based
- **注意力机制**: Grouped-Query Attention (GQA)，所有规模均支持
- **微调方式**: SFT + RLHF
- **支持语言**: English, German, French, Italian, Portuguese, Hindi, Spanish, Thai
- **知识截止**: December 2023

## 核心功能

### CLI 工具 (`llama-model`)

```bash
pip install llama-models

llama-model list              # 列出可用模型
llama-model describe -m MODEL_ID   # 查看模型详情
llama-model download --source meta --model-id CHOSEN_MODEL_ID  # 下载权重
llama-model verify-download   # 验证完整性
llama-model prompt-format -m MODEL_ID  # 查看 prompt 格式
```

### 推理脚本

通过 `torchrun` 调用：
```bash
torchrun --nproc_per_node=$NGPUS \
  -m models.llama4.scripts.chat_completion $CHECKPOINT_DIR \
  --world_size $NGPUS
```

### 量化支持

- `fp8_mixed`: 混合精度，Llama-4-Scout 仅需 2×80GB GPU
- `int4_mixed`: INT4 量化，Llama-4-Scout 仅需 1×80GB GPU

## 架构特点

- **auto-regressive transformer** 架构，经过优化
- **GQA (Grouped-Query Attention)**: 所有规模均启用，提升推理扩展性
- PyPI 包发布 (`llama-models`)，Python >= 3.10
- 依赖: PyYAML, jinja2, tiktoken, pydantic, rich, httpx, huggingface-hub

## License

Llama 3.1 使用 Meta 指定的 Acceptable Use Policy（非 Apache/MIT 等开源许可证），支持商业使用但有使用限制。

## 与 Llama 3 的主要区别

- 上下文长度从 8K 提升到 **128K**
- 新增 **405B** 参数规模
- 支持语言从英语扩展到 8 种语言
- GQA 从 70B 扩展到全系列

## 相关链接

- HuggingFace: https://huggingface.co/meta-llama
- 官网: https://llama.meta.com/
- Cookbook: https://github.com/meta-llama/llama-cookbook
- Llama Stack: https://github.com/meta-llama/llama-stack
