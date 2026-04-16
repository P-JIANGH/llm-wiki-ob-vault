# Code Llama — Raw Source Analysis

**Source:** https://github.com/facebookresearch/codellama
**Date:** 2026-04-16
**Category:** LLM & Tool

## README Summary

Code Llama 是 Meta 基于 Llama 2 微调的代码大模型系列，提供开源模型中 SoTA 性能。核心能力：
- **代码生成与理解**（Code Llama base）
- **Python 专项**（Code Llama - Python）
- **指令跟随**（Code Llama - Instruct）
- **代码填充（Infilling）**：7B/13B 支持根据上下文填充缺失代码

### 模型规格

| Model | Size | MP (GPU数) |
|-------|------|-----------|
| 7B    | ~12.55GB | 1 |
| 13B   | 24GB | 2 |
| 34B   | 63GB | 4 |
| 70B   | 131GB | 8 |

所有模型基于 16K token 序列训练，推理支持最多 100K token（70B Python/Instruct 除外）。

### 训练方法
- 基于 Llama 2 微调，使用更高比例的代码数据采样
- 训练数据与 Llama 2 相同，但代码权重不同
- Code Llama - Instruct 使用额外指令微调数据
- 总训练消耗：1400K GPU 小时 (A100-80GB)，碳排放 228.55 tCO2eq（已 100% 抵消）
- 训练时间：2023.01 - 2024.01

### 推理示例

```bash
# 基础代码补全
torchrun --nproc_per_node 1 example_completion.py \
    --ckpt_dir CodeLlama-7b/ \
    --tokenizer_path CodeLlama-7b/tokenizer.model

# 代码填充（Infilling）
torchrun --nproc_per_node 1 example_infilling.py \
    --ckpt_dir CodeLlama-7b/

# 指令跟随
torchrun --nproc_per_node 1 example_instructions.py \
    --ckpt_dir CodeLlama-7b-Instruct/
```

### 架构
- 自回归 Transformer 架构（优化版）
- 7B/13B/70B 支持 infilling
- 使用 fairscale 的 model parallel 分布式训练
- RMSNorm + RoPE + SwiGLU
- ColumnParallelLinear / RowParallelLinear / ParallelEmbedding

### 关键文件

| 文件 | 描述 |
|------|------|
| `llama/model.py` (301行) | ModelArgs, RMSNorm, Transformer, Attention, FeedForward |
| `llama/generation.py` (548行) | Llama 类，build/chat_completion/infilling/completion |
| `llama/tokenizer.py` | SentencePiece tokenizer |
| `example_completion.py` | 代码补全示例 |
| `example_infilling.py` | 代码填充示例，使用 `<PRE>` `<SUF>` `<MID>` 标记 |
| `example_instructions.py` | 指令跟随示例 |
| `download.sh` | 权重下载脚本（需 Meta 授权） |

### 许可证
Meta 定制商业许可证（Llama 2 Community License Agreement），需从 Meta 官网申请下载权限。

### 安全
- 所有 Instruct 变体经过安全微调
- 提供 Responsible Use Guide
- 建议部署前进行安全测试

## MODEL_CARD Summary

- **开发者:** Meta AI
- **变体:** Code Llama (base), Code Llama - Python, Code Llama - Instruct
- **尺寸:** 7B/13B/34B/70B
- **输入:** 纯文本
- **输出:** 纯文本
- **训练数据:** Llama 2 数据 + 不同代码采样权重 + Instruct 额外指令数据
- **评估:** 详见研究论文 Section 3-4
