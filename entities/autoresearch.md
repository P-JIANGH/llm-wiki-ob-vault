---
title: Autoresearch
created: 2026-04-10
updated: 2026-04-10
type: entity
tags: [ai, llm, agent, autonomous-research, karpathy]
sources: [raw/articles/karpathy-autoresearch-2026.md]
---

# Autoresearch (karpathy/autoresearch)

## Overview
Karpathy 的 Autonomous AI Research 框架。核心：给 AI agent 一个简化的 LLM 训练代码（train.py），agent 自主修改代码 → 运行5分钟实验 → 评估 val_bpb → 决定保留/丢弃 → 循环迭代。

**愿景：** "Research is now entirely the domain of autonomous swarms of AI agents running across compute cluster megastructures."

## Key Facts
- **开发者：** Andrej Karpathy
- **许可证：** MIT
- **Stars：** 70.3k | **Forks：** 10.2k | **Commits：** 36
- **定位：** Autonomous LLM Research 实验框架

## Three-File Architecture

| 文件 | 职责 | Agent 权限 |
|------|------|-----------|
| `prepare.py` | 数据下载、BPE tokenizer、数据加载器、BPB 评估 | ❌ 不可修改 |
| `train.py` | 模型架构、优化器、训练循环 | ✅ 唯一可修改 |
| `program.md` | Agent 指令（research org code） | Human 修改 |

## 实验流程

```
LOOP FOREVER:
修改 train.py → git commit → uv run train.py → 读 val_bpb → keep/discard → 记录 results.tsv
```

- **速度：** ~12 experiments/hour，~100/夜
- **评估指标：** val_bpb（validation bits per byte）越低越好
- **超时：** 10分钟 kill → "discard"

## Model Architecture（train.py baseline）

```python
GPTConfig:
  sequence_len: 2048
  vocab_size: 32768
  n_layer: 12
  n_head: 6
  n_kv_head: 6
  n_embd: 768
  window_pattern: "SSSL"  # 3 short + 1 long
```

**Key innovations:**
- **Residual Scaling**（可学习残差权重 per layer）
- **Value Embeddings（ResFormer）**（input-dependent gating）
- **Sliding Window Attention**（SSSL 模式）
- **Soft-capped Logits**（softcap=15）

## Optimizer: MuonAdamW

Custom optimizer = Muon（2D 矩阵）+ AdamW（embeddings/scalars）

**Muon 特性：**
- Nesterov Momentum
- Polar Express Orthogonalization
- NorMuon Variance Reduction
- Cautious Weight Decay

## program.md 指令要点
- 不向用户提问，继续实验
- 遇到困难：读论文、尝试组合、走激进路线
- Simplicity Criterion：+0.001 val_bpb 但 +20 行代码 = 不值得
- VRAM 软约束，崩溃记 0.0

## Platform
- 单 NVIDIA GPU（H100）
- 社区 fork：MacOS MLX / Windows RTX / AMD ROCm

## Relationships
- [[nanochat]] — 父项目（完整实现，多平台支持）
- [[nanoGPT]] — 同源（nanoGPT 是训练框架，autoresearch 是 autonomous 版本）
- [[karpathy-llm101n]] — Karpathy LLM 教学项目（Storyteller 构建教程）
- [[multi-agent-ai-simulation]] — 多智能体 AI 通用概念
- [[autonomous-llm-research]] — Autoresearch 代表的自主研究范式概念
