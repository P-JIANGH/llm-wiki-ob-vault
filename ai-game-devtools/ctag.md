---
title: CTAG
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, tool, open-source, python, ai, game-dev]
sources: [raw/articles/ai-game-devtools/ctag.md]
---

# CTAG — Creative Text-to-Audio Generation via Synthesizer Programming

**GitHub**: https://github.com/PapayaResearch/ctag
**Paper**: ICML 2024 — [arXiv:2406.00294](https://arxiv.org/abs/2406.00294)
**Website**: https://ctag.media.mit.edu/
**Authors**: Manuel Cherep, Nikhil Singh, Jessica Shand (MIT)
**License**: MIT

## Overview

CTAG 通过**进化优化合成器参数**来从文本提示生成声音。与 [[audioldm-2]] 等扩散模型不同，CTAG 不训练神经网络直接输出波形，而是将声音合成视为黑盒优化问题：搜索能使 CLAP 嵌入与文本语义匹配的合成器参数配置。

## 核心架构

| 组件 | 技术方案 |
|------|---------|
| **文本嵌入** | LAION-CLAP — 文本-音频对比学习预训练模型 |
| **合成器** | SynthAX (JAX) — 快速模块化合成器，JIT 编译加速 |
| **优化算法** | evosax — 30+ 种进化策略，默认 LES（线性进化策略） |
| **配置系统** | Hydra — YAML 驱动，支持多配置组合 |
| **实验追踪** | TensorBoard + CSV 日志 |

## 工作流程

1. **文本嵌入**: 提示词通过 CLAP 编码为固定维度向量
2. **进化搜索**: evosax 生成候选合成器参数 → SynthAX 合成音频 → CLAP 评估相似度 → 更新策略
3. **输出**: 最优参数对应的 WAV 音频文件

## 支持的进化策略（40+）

- **CMA-ES 系列**: CMA-ES, BIPOP-CMA-ES, IPOP-CMA-ES, Sep-CMA-ES
- **NES 系列**: xNES, CR-FM-NES, SNES, DES, LM-MA-ES
- **ES 系列**: OpenES, GuidedES, PersistentES, NoiseReuseES, ESMC
- **GA 系列**: SimpleGA, LGA, SAMR-GA, GESMR-GA, MR15-GA
- **其他**: PSO, ARS, PGPE, DE, 模拟退火, PBT, ASEBO
- **默认**: LES — 实验表现最佳

## 技术特点

1. **非神经网络生成**: 纯优化方法，与扩散/自回归模型有本质区别
2. **JAX JIT 加速**: SynthAX 合成函数 JIT 编译，支持 GPU/TPU
3. **模块化合成器**: 可配置多种合成器架构（voice 等）
4. **AX 超参扫描**: 内置 `--multirun` 支持自动超参优化
5. **CLAP 适应度函数**: 余弦相似度评估，分数钳位到 [-1, 0]

## 快速用法

```bash
# CPU 默认运行
python text2synth.py

# GPU + 大种群
python text2synth.py system.device=cuda general.popsize=100

# 自定义提示词
python text2synth.py general.prompts='"a bird tweeting;walking on leaves"'
```

## 默认配置

| 参数 | 默认值 | 说明 |
|------|--------|------|
| Model | CLAP audioset-best | LAION-CLAP 检查点 |
| Strategy | LES | 线性进化策略 |
| Synth | voice | 类人声合成器 |
| Iterations | 300 | 优化步数 |
| Popsize | 50 | 每代候选数 |
| Duration | 2s | 输出音频长度 |

## 许可证

MIT — 对游戏开发友好。

## 与同类工具的差异

- 相比 [[audioldm-2]]（扩散模型）：CTAG 使用进化优化而非神经网络生成，不依赖训练数据分布，更具创造性
- 相比 [[audiolcm]]（LCM 加速扩散）：CTAG 不训练任何模型，而是实时搜索合成器参数空间，每次生成都是独立的优化过程
- CTAG 的优势在于可控性和可解释性——生成的声音由明确的合成器参数决定，可编辑和微调
- 劣势是速度较慢（需数百次迭代），不适合实时生成场景

## 对游戏开发的价值

- **独特音效生成**: 进化优化产生非传统/创意性音效，适合独立游戏
- **参数可编辑**: 合成器参数输出可直接调整，不像扩散模型是黑盒
- **MIT 许可证**: 商用友好
- **不适合实时使用**: 需 300 次迭代 × CLAP 评估，生成时间较长
- **依赖 SynthAX**: 需要同时安装 SynthAX（JAX 合成器库）
