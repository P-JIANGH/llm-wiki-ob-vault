---
title: MiniMax-01
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [llm, vlm, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/minimax-01.md]
---

# MiniMax-01

## Overview

MiniMax-01 是 MiniMax 公司发布的双模型家族，包含纯文本模型 **MiniMax-Text-01** 和视觉-语言模型 **MiniMax-VL-01**。以 Linear Attention（Lightning Attention）为核心技术创新，兼顾长上下文能力与高效推理。

## Model Specifications

### MiniMax-Text-01
- **总参数量**: 456B，激活 45.9B/token
- **架构**: 80 层，Hybrid Attention（Lightning + Softmax）+ MoE
  - Lightning Attention 每 7 个 block 插入 1 个标准 Softmax Attention
  - MoE: 32 experts，Top-2 路由，Expert hidden dim 9216
- **词表**: 200,064
- **训练上下文**: 1M tokens；**推理上下文**: 最长 4M tokens
- **并行策略**: LASP+, varlen ring attention, Expert Tensor Parallel (ETP)

### MiniMax-VL-01
- **ViT encoder**: 303M 参数，24 层，patch size 14，hidden 1024
- **MLP projector**: 随机初始化双层 MLP
- **动态分辨率**: 336×336 ~ 2016×2016，保留 336×336 缩略图
- **训练数据**: 694M 图像-标题对，共 512B tokens

## Benchmark Performance

### 文本任务（对比 GPT-4o / Claude-3.5 / Gemini-1.5-Pro）
| 任务 | GPT-4o | Claude-3.5 | MiniMax-Text-01 |
|------|--------|------------|-----------------|
| MMLU | 85.7 | 88.3 | **88.5** |
| C-SimpleQA | 64.6 | 56.8 | **67.4** (最佳) |
| Arena-Hard | **92.4** | 87.6 | 89.1 |
| RULER 1M | 0.850 | - | **0.910** (最佳) |
| LongBench v2 w/ CoT | 51.4 | 46.7 | **56.5** (最佳) |

### 视觉任务（对比 GPT-4o / Claude-3.5 / Gemini-2.0-Flash）
| 任务 | GPT-4o | Claude-3.5 | MiniMax-VL-01 |
|------|--------|------------|---------------|
| ChartQA | 88.1 | 90.8 | **91.7** (最佳) |
| DocVQA | 91.1 | 94.2 | 96.4 |
| OCRBench | 806 | 790 | **865** (最佳) |
| MMMU | 63.5 | **72.0** | 68.5 |

## 技术亮点

1. **Lightning Attention**: 线性复杂度的注意力机制，大幅降低长序列训练/推理成本
2. **超长上下文**: 4M token 推理能力（业界领先），RULER 1M benchmark 达到 0.910
3. **Hybrid Attention + MoE**: 平衡表达力与计算效率
4. **动态分辨率 VL**: 适应从低分辨率到 2K 级别的多尺度图像输入

## 部署方式

- **推荐**: vLLM 高吞吐 serving
- **备选**: HuggingFace Transformers + int8 量化（需 8 GPU）
- **模型ID**: `MiniMaxAI/MiniMax-Text-01`, `MiniMaxAI/MiniMax-VL-01`

## 许可证

- 代码: MIT
- 模型权重: MiniMax Model Agreement（自定义）

## 相关链接

- GitHub: https://github.com/MiniMax-AI/MiniMax-01
- Chat: https://chat.minimax.io/
- API: https://www.minimax.io/platform
- MCP: https://github.com/MiniMax-AI/MiniMax-MCP
- HuggingFace: https://huggingface.co/MiniMaxAI
- ArXiv: 2501.08313

## 相关模型

与 [[ai-game-devtools/deepseek-v3]]（DeepSeek-V3）同为国产大模型，在 MMLU 等任务上表现接近（88.5 vs 88.5），但 MiniMax-01 在长上下文任务（RULER 1M: 0.910 vs 无）明显领先。架构上均采用 MoE，但 MiniMax-01 使用 Lightning Attention 而 DeepSeek-V3 使用 DeepSeek MoE。

与 [[ai-game-devtools/glm-4]] 相比，两者均支持长上下文（MiniMax 4M vs GLM-4 128K），但在架构上差异明显——MiniMax-01 用 Lightning Attention，GLM-4 用 GLM 架构。
