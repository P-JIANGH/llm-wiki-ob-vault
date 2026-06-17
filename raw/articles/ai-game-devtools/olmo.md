# OLMo — Open Language Model

> GitHub: https://github.com/allenai/OLMo
> Cloned: 2026-04-14 from gitcode.com/allenai/OLMo
> Last README read: 2026-04-14

## 基本信息

- **名称**: OLMo (Open Language Model)
- **机构**: Allen Institute for AI (AI2)
- **License**: Apache 2.0
- **Python**: >= 3.10
- **PyPI**: `ai2-olmo`
- **HF**: https://huggingface.co/allenai/OLMo-2-0425-1B 等

## 模型规格

| Variant | Stage 1 Tokens | Stage 2 Tokens | HuggingFace |
|---------|---------------|----------------|-------------|
| OLMo-2 1B | 4T | 50B | allenai/OLMo-2-0425-1B |
| OLMo-2 7B | 4T | 50B | allenai/OLMo-2-1124-7B |
| OLMo-2 13B | 5T | 100-300B | allenai/OLMo-2-1124-13B |
| OLMo-2 32B | - | - | allenai/OLMo-2-0325-32B |

## 两阶段训练流程

**Stage 1**: 大规模网络数据训练
- 数据集: OLMo-mix-1124 (HuggingFace)
- 1B: 4T tokens
- 7B: 4T tokens
- 13B: 5T tokens

**Stage 2**: 高质量精调数据
- 数据集: Dolmino-mix-1124
- 1B: 50B tokens (三种随机种子平均)
- 7B: 50B tokens (soup 平均)
- 13B: 100B + 300B tokens (soup 平均)

## 核心模块

```
olmo/
├── model.py        # 核心 Transformer 模型
├── config.py       # 配置管理
├── train.py        # 训练脚本
├── tokenizer.py    # 分词器
├── checkpoint.py   # 检查点管理
├── optim.py        # 优化器
├── data/           # 数据处理
├── eval/           # 评估
hf_olmo/            # HuggingFace 集成
scripts/
├── train.py        # 训练入口
├── convert_olmo2_to_hf.py  # 转为 HF 格式
```

## 依赖

- `torch>=2.1`
- `ai2-olmo-core>=1.8.0` (核心计算)
- `transformers`
- `omegaconf`
- `tokenizers`
- `boto3`, `google-cloud-storage` (云存储)
- `wandb` (训练可视化)
- `beaker-gantry` (分布式训练)

## 推理使用

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
olmo = AutoModelForCausalLM.from_pretrained("allenai/OLMo-2-0425-1B")
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-2-0425-1B")
```

支持 8bit 量化:
```python
AutoModelForCausalLM.from_pretrained("allenai/OLMo-2-0425-1B", load_in_8bit=True)
```

## 重要提示

⚠️ **此仓库已过时**。最新版本在 [OLMo-core](https://github.com/allenai/OLMo-core/) 仓库中。

32B 模型训练需使用 OLMo-core。

## 相关项目

- [OLMo-eval](https://github.com/allenai/OLMo-eval): 评估工具
- [olmes](https://github.com/allenai/olmes): 评估基准
- [OLMo-core](https://github.com/allenai/OLMo-core): 最新活跃开发仓库

## 引用

```bibtex
@misc{olmo20242olmo2furious,
  title={OLMo 2 Furious},
  author={Team OLMo et al.},
  year={2024},
  eprint={2501.00656},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2501.00656},
}
```
