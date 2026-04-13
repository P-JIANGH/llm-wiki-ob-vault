---
title: InternLM-XComposer
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [vlm, llm, open-source, multimodal, vision-language, game]
sources: [raw/articles/ai-game-devtools/internlm-xcomposer.md]
---

# InternLM-XComposer

## Overview

InternLM-XComposer 是上海 AI 实验室开发的多模态大型视觉语言模型（LVLM）系列，支持图文交错理解、超长上下文（24K→96K）、4K 分辨率图像理解、视频理解以及网页代码生成。最新版本 IXC-2.5 以仅 7B 参数达到 GPT-4V 水平。

## Key Facts

- **开发方**：Shanghai AI Laboratory
- **模型规模**：7B（IXC-2.5）
- **LLM 基座**：InternLM2
- **ViT 编码器**：InternViT（560×560 原生分辨率）
- **上下文长度**：24K interleaved image-text，RoPE extrapolation 至 96K
- **许可**：Apache 2.0 / MIT（各子项目不同）

## 主要版本沿革

| 版本 | 日期 | 核心突破 |
|------|------|----------|
| IXC-1.0 | 2023-09 | 基础图文组合与理解 |
| IXC-2.0 | 2024-01 | 4K 分辨率支持 |
| IXC-2-4KHD | 2024-04 | 4K HD，VL 微调代码开源 |
| **IXC-2.5** | **2024-07** | **24K→96K 上下文、多图多轮对话、网页生成** |
| IXC-2.5-Reward | 2024-12 | 多模态奖励模型（ACL 2025 Findings） |
| IXC-2.5-OmniLive | 2024-12 | 流式视频+音频交互系统 |

## 核心能力

1. **图文交错理解**：多图多轮对话，通过 `<ImageHere>` 占位符注入图像
2. **超长视频理解**：将视频视为高分辨率复合图，密集采样帧捕捉细节
3. **网页生成**（Game 相关）：
   - `write_webpage()` — 自然语言指令生成完整 HTML/CSS/JS
   - `resume_2_webpage()` — Markdown 简历转个人网页
   - `screen_2_webpage()` — 截图转网页代码（可用于游戏 UI 逆向）
4. **高质量图文文章写作**：CoT + DPO 优化
5. **4K+ 高分辨率**：任意宽高比，支持 Infographics VQA 等文档理解任务

## Benchmark

在 28 个多模态 benchmark 上评测，16 项超越开源 SOTA；在 MVBench（69.1 vs GPT-4V 43.5）、MLVU、DocVQA 等 16 项任务上与 GPT-4V / Gemini Pro 持平或超越。

## 与同类工具的差异

相比 [[ai-game-devtools/minicpm-v-4.0|MiniCPM-V]] 和 [[ai-game-devtools/qwen-vl|Qwen-VL]] 等开源 LVLM，IXC-2.5 的独特优势在于：
- 纯 C/C++ 不支持，仅 Python + Transformers
- 独有的网页生成能力（write_webpage / screen_2_webpage）
- 最长 96K 上下文（通过 RoPE 外推）

## 技术栈

- Python + PyTorch + Transformers
- Flash Attention 2（高分辨率必需）
- CUDA 11.4+
- LMDeploy / ModelScope Swift 支持微调和推理

## 相关链接

- GitHub: https://github.com/InternLM/InternLM-XComposer
- HuggingFace: https://huggingface.co/internlm/internlm-xcomposer2d5-7b
- ModelScope: https://modelscope.cn/models/Shanghai_AI_Laboratory/internlm-xcomposer2d5-7b
- 技术报告: https://arxiv.org/abs/2407.03320

## 相关子项目

- [[ai-game-devtools/sharegpt4v|ShareGPT4V]]（ECCV 2024）— GPT4-V 生成高质量图文 caption 数据集
- [[ai-game-devtools/mmdiu|MMDU]] — 多图多轮对话 benchmark
