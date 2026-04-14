---
title: SkyThought
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, llm, tool, agent, evaluation, training, open-source]
sources: [raw/articles/ai-game-devtools/skythought.md]
---

# SkyThought

[[ai-game-devtools/skythought|SkyThought]] 是 [[openbmb|NovaSky AI]]（UC Berkeley Sky Computing Lab）开源的推理模型训练与评测框架，核心贡献是 Sky-T1 系列可训练的 O1-preview 复现模型。

## Overview

SkyThought 不是单一模型，而是一个包含以下内容的项目矩阵：

- **Sky-T1 系列模型**：基于 Qwen-2.5-32B-Instruct 微调的推理模型（Sky-T1-32B-Preview、7B、mini、32B-Flash）
- **S\\* 测试时Scaling**：Test time scaling 代码生成框架
- **skythought evals**：通用推理评测库，支持 15+ benchmark CLI 评测

## 核心模型

| 模型 | 参数量 | 特点 |
|------|--------|------|
| Sky-T1-32B-Preview | 32B | 全量开源（数据+代码+权重），Math500 86.4%，AIME2024 43.3% |
| Sky-T1-32B-Flash | 32B | 解决过度思考问题，缩短推理长度同时保持精度 |
| Sky-T1-7B / mini | 7B/mini | 轻量版本，RL 训练提升而非蒸馏 |

在 AIME2024、LiveCodeBench、GPQA-Diamond 等推理 benchmark 上，Sky-T1-32B-Preview 全面超越 Qwen-2.5-32B-Instruct，部分超过 o1-preview。

## 技术架构

- **训练后端**：[LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) 做 SFT，skythought-rl 模块做 RL 训练
- **推理后端**：vLLM（单节点）+ Ray（多节点分布式）
- **评测 CLI**：`skythought evaluate --model <model> --task <benchmark>` 支持 15 种推理 benchmark
- **关键目录**：
  - `skythought/evals/` — Task handler 系统（YAML 配置 + Python handler），Scorer API
  - `skythought/train/` — 训练脚本
  - `skythought/skythought-rl/` — RL 训练代码
  - `skythought/test-time-scaling/` — S\\* 测试时 Scaling 代码
  - `recipes/` — 数据整理流程和训练策略文档

## 全开源承诺

SkyThought 的核心差异化在于**全量开源**：数据和权重完全开放。对比 STILL-2、Journey、QwQ、o1，Sky-T1-32B-Preview 是唯一同时开源数据+代码+权重的方案。

## 与同类工具的关系

SkyThought 定位为推理模型的**训练+评测**工具链。在 [[ai-game-devtools/qwen3|Qwen3]] 这类通用 LLM 之上做 RL 后训练，或在 [[ai-game-devtools/s1|s1]] 的测试时 Scaling 之外补充完整的 RL 训练流程。评测能力与 [[ai-game-devtools/deepseek-r1|DeepSeek-R1]] 的纯 RL 训练形成对比——SkyThought 提供更完整的数据工程链路。

## 许可证

Apache-2.0
