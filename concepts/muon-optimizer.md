---
title: Muon Optimizer
created: 2026-04-10
updated: 2026-04-10
type: concept
tags: [ai, llm, optimization, training]
sources: [raw/articles/karpathy-autoresearch-2026.md]
---

# Muon Optimizer

## Definition
Muon 是 Karpathy 在 autoresearch/nanochat 实验中发现的 custom optimizer，专门针对 2D 矩阵参数优化。与 AdamW 结合（MuonAdamW）处理不同参数类型。

## Core Innovation

**问题：** 标准 Adam 对 2D 矩阵（如 linear layer weights）不是最优的。

**Muon 解法：** 在梯度空间而非参数空间做优化步。

```python
# 核心思路（简化）
grad_ortho = orthogonalize(grad)  # 正交化梯度
step = momentum * grad_ortho        # Nesterov 风格
```

## MuonAdamW：混合优化器

| 参数类型 | Optimizer | 学习率 |
|----------|-----------|--------|
| 2D 矩阵（weights） | Muon | 0.04 |
| Embeddings | AdamW | 0.6 |
| Unembedding（LM head） | AdamW | 0.004 |
| Per-layer scalars | AdamW | 0.5 |

## Key Components

### 1. Nesterov Momentum
```python
g = stacked_grads.lerp_(momentum_buffer, momentum)
```
Nesterov 风格动量更新，比标准 momentum 更稳定。

### 2. Polar Express Orthogonalization
预计算的系数表，将梯度矩阵正交化：
```python
polar_express_coeffs = [
    (8.156554524902461, -22.48329292557795, 15.878769915207462),
    (4.042929935166739, -2.808917465908714, 0.5000178451051316),
    ...
]
X = a*X + X@B  或  X = a*X + B@X
```
迭代正交化稳定训练。

### 3. NorMuon Variance Reduction
跟踪梯度平方的 running mean，归一化步长：
```python
step = grad / sqrt(running_var + eps)
```
类似 Adam 的自适应步长，但在梯度空间。

### 4. Cautious Weight Decay
```python
mask = (g * stacked_params) >= 0
stacked_params.sub_(lr * g + lr * wd * stacked_params * mask)
```
只有当 `grad * param >= 0` 时才 weight decay，避免破坏已学到的结构。

## LR Scaling
```python
dmodel_lr_scale = (model_dim / 768) ** -0.5
```
学习率 ∝ 1/√model_dim，大模型用更小的 LR。

## Muon Momentum Schedule
```python
def get_muon_momentum(step):
    frac = min(step / 300, 1)
    return (1 - frac) * 0.85 + frac * 0.95
```
前300步从 0.85 线性升到 0.95。

## 在 Autoresearch 中的发现
Muon 是 Karpathy 通过 [[autoresearch]] 实验发现的——不是从论文抄来的，是从代码实验中涌现的。这正是 autoresearch 范式的价值：**让实验发现超参/架构/优化器，而不是人工设计**。

## Related
- [[autoresearch]] — 发现 Muon 的实验框架
- [[nanochat]] — 使用 MuonAdamW 的 LLM 训练实现
- [[nanoGPT]] — nanoGPT 用的标准 AdamW
