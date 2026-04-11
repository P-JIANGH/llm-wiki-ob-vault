---
title: karpathy/autoresearch GitHub Repository
url: https://github.com/karpathy/autoresearch
created: 2026-04-10
type: source
tags: [source]
---

# karpathy/autoresearch

## Basic Info
- **Repository:** karpathy/autoresearch
- **License:** MIT
- **Stars:** 70.3k | **Forks:** 10.2k | **Commits:** 36
- **Related:** nanochat (parent), nanoGPT, minGPT

## Overview
Karpathy 的 Autonomous AI Research 框架：给 AI agent 一个 LLM 训练代码库（train.py），让 agent 自主修改代码、运行5分钟训练实验、评估 val_bpb、决定保留还是丢弃更改、循环迭代。

**核心愿景：** "One day, frontier AI research used to be done by meat computers... That era is long gone. Research is now entirely the domain of autonomous swarms of AI agents running across compute cluster megastructures."

## 核心设计哲学

**三个文件职责分离：**
```
prepare.py      — 常量、数据准备、运行时工具（AGENT 不可修改）
train.py        — 模型、优化器、训练循环（AGENT 只能修改这个）
program.md      — Agent 指令（Human 修改这个）
```

**为什么这样设计？**
- Agent 只改 train.py → diff 可审查，不会引入依赖爆炸
- prepare.py 固定 → 评估标准不变，结果可比
- program.md 是 "research org code" → 迭代的是指令本身，不是代码

## 实验流程

```
LOOP FOREVER:
1. 检查 git 状态（当前分支/commit）
2. 修改 train.py（模型架构/优化器/超参/训练循环）
3. Git commit（保存更改）
4. 运行实验：uv run train.py > run.log 2>&1
5. 读取结果：grep "^val_bpb:" run.log
6. 决策：val_bpb 降低了 → keep commit | 没降低 → git reset
7. 记录到 results.tsv
```

**速度：** ~12 experiments/hour，~100/夜

## program.md 指令要点

- 固定5分钟 wall-clock（不含启动/编译时间）
- val_bpb（validation bits per byte）越低越好
- VRAM 软约束（允许适度增加，不接受爆炸式增长）
- 超时10分钟 → kill 并记录 "discard"
- 崩溃 → val_bpb = 0.000000 记录 "crash"
- 任何问题不停歇，不向用户提问
- 遇到困难：读论文、重新审查文件、尝试组合、走激进路线

## prepare.py 数据流程

### 关键常量
| 常量 | 值 | 说明 |
|------|-----|------|
| MAX_SEQ_LEN | 2048 | 上下文长度 |
| TIME_BUDGET | 300s | 5分钟预算 |
| EVAL_TOKENS | 40×524,288 | 验证 token 数 |
| VOCAB_SIZE | 8192 | BPE 词表大小 |
| MAX_SHARD | 6542 | 总 shard 数 |

### 数据源
- HuggingFace: `karpathy/climbmix-400b-shuffle`
- 固定验证 shard：`shard_06542`
- 并行下载（默认8 workers），exponential backoff 重试

### BPE Tokenizer
- 库：`rustbpe`（Karpathy 自研 Rust BPE 训练）
- GPT-4 风格 split pattern
- 输出：`tokenizer.pkl` + `token_bytes.pt`

### BOS-Aligned Best-Fit Packing
- 100% GPU 利用率，无 padding token
- 每行以 BOS token 开头
- 文档用 best-fit 算法打包，不够时裁剪最短文档填满

### BPB 评估指标
```
BPB = (Σ cross_entropy_nats) / (ln(2) × Σ target_bytes)
```
- 排除特殊 token（byte length = 0）
- vocab size 无关 → 架构变化可公平比较

## train.py 模型架构

### GPTConfig
```python
sequence_len: 2048
vocab_size: 32768
n_layer: 12
n_head: 6
n_kv_head: 6
n_embd: 768
window_pattern: "SSSL"  # 3 short + 1 long
```

### 关键特性

**Residual Scaling（可学习）：**
```python
self.resid_lambdas = nn.Parameter(torch.ones(config.n_layer))  # 各层残差权重
self.x0_lambdas = nn.Parameter(torch.zeros(config.n_layer))    # 各层初始值权重
x = resid_lambdas[i] * x + x0_lambdas[i] * x0
```

**Value Embeddings（ResFormer）：**
- 交替层有权值嵌入投影
- Input-dependent gating per attention head

**Sliding Window Attention：**
- "SSSL" 模式：3个短窗口 + 1个长窗口
- 短窗口 = 一半上下文长度
- 最后一层始终全上下文

**Soft-capped Logits：**
```python
softcap = 15
logits = softcap * torch.tanh(logits / softcap)
```

## train.py 优化器：MuonAdamW

MuonAdamW = Muon（2D 矩阵）+ AdamW（embeddings/scalars）

### Muon 核心
- **Nesterov Momentum**
- **Polar Express Orthogonalization**（正交化稳定训练）
- **NorMuon Variance Reduction**（梯度方差归一化步长）
- **Cautious Weight Decay**（梯度符号决定是否 decay）

### 学习率
| 参数 | 值 |
|------|-----|
| EMBEDDING_LR | 0.6 |
| UNEMBEDDING_LR | 0.004 |
| MATRIX_LR | 0.04（Muon） |
| SCALAR_LR | 0.5 |
| WEIGHT_DECAY | 0.2 |
| WARMUP_RATIO | 0（无 warmup） |
| WARMDOWN_RATIO | 0.5（50% cooldown） |

## 实验结果格式

```
---
val_bpb: 0.997900
training_seconds: 300.1
total_seconds: 325.9
peak_vram_mb: 45060.2
mfu_percent: 39.80
total_tokens_M: 499.6
num_steps: 953
num_params_M: 50.3
depth: 8
```

## Results.tsv 格式
```
commit   val_bpb   memory_gb   status   description
a1b2c3d  0.997900  44.0        keep     baseline
```
⚠️ 不提交 results.tsv，保持 untracked

## Simplicity Criterion
"All else being equal, simpler is better."
- +0.001 val_bpb 但 +20 行 hack → 不值得
- +0.001 val_bpb 但删除了代码 → 值得保留

## 平台支持
- **官方：** 单 NVIDIA GPU（H100 测试）
- **社区 fork：** MacOS (MLX)、Windows (RTX)、AMD ROCm

## 与 nanochat 的关系
autoresearch 是 nanochat 的简化单 GPU 版本，用于 autonomous research 实验。nanochat 是完整实现（Flash Attention 3、MPS、CPU 等多平台支持）。

## 关键认知
1. **program.md 是核心创新** — 迭代的是给 agent 的指令，而不是代码本身
2. **固定评估标准** — prepare.py 不可改，val_bpb 是唯一真理
3. **速度即一切** — 5分钟预算确保 ~100 experiments/夜
4. **MuonAdamW** — 针对 2D 矩阵优化的 custom optimizer
5. **Residual Scaling** — 每层可学习的残差权重 + 初始值权重
