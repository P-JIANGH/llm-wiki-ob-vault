---
title: DeepSeek-V3
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [llm, model, moe, open-source, deepseek]
sources: [raw/articles/ai-game-devtools/deepseek-v3.md]
---

# DeepSeek-V3

## 概述

DeepSeek-V3 是 DeepSeek AI 开发的强大 MoE（混合专家）语言模型，总参数量 671B，每次激活 37B 参数，上下文长度 128K。采用 MLA（多头潜在注意力）和 DeepSeekMoE 架构，并首创无辅助损失负载均衡策略和多 token 预测（MTP）训练目标。

## 核心规格

| 指标 | 值 |
|------|-----|
| 总参数量 | 671B |
| 激活参数 | 37B |
| 上下文长度 | 128K |
| 训练数据量 | 14.8T tokens |
| 训练成本 | 2.664M H800 GPU hours |

## 关键技术创新

### 1. Auxiliary-loss-free 负载均衡
首创无辅助损失负载均衡策略，最小化因强制负载均衡导致的性能下降。

### 2. Multi-Token Prediction (MTP)
多 token 预测训练目标，不仅提升模型性能，还可用于推测解码加速推理。开源版本包含 1 个 MTP 模块。

### 3. FP8 混合精度训练
首次在超大模型上验证 FP8 训练的可行性，配合 128x128 block scaling 和动态激活量化。

### 4. 全计算-通信重叠
通过算法、框架、硬件协同设计，跨节点 MoE 训练近乎实现完全计算-通信重叠。

## 模型架构

- **MLA**: Multi-head Latent Attention，DeepSeek-V2 验证的高效注意力机制
- **DeepSeekMoE**: 专家混合架构，256 个专家每次激活 8 个
- **MTP**: 1 层额外 transformer，用于多 token 预测和推测解码

## 推理框架支持

DeepSeek-V3 支持 SGLang、LMDeploy、vLLM、TensorRT-LLM、LightLLM 等主流推理框架，同时支持 NVIDIA 和 AMD GPU。FP8 和 BF16 两种精度模式均可部署。

## 与同类模型对比

DeepSeek-V3 在数学（MATH-500: 90.2）、代码（LiveCodeBench: 40.5）、AIME 2024（39.2）等基准上显著超越 Qwen2.5 72B 和 LLaMA3.1 405B，Arena-Hard 得分 85.5 超过 GPT-4o。

## 相关链接

- GitHub: https://github.com/deepseek-ai/DeepSeek-V3
- HuggingFace: https://huggingface.co/deepseek-ai/DeepSeek-V3
- Paper: arXiv:2412.19437
- Chat: https://chat.deepseek.com

## 相关模型

- [[deepseek-r1]] — DeepSeek 推理专用模型，V3 通过知识蒸馏继承其推理能力
- [[chatrwkv]] — BlinkDL 的纯 RNN LLM，另一个开源大模型选择
