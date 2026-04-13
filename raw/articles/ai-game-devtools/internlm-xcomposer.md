# InternLM-XComposer

> 项目来源：https://github.com/InternLM/InternLM-XComposer
> 克隆自 gitcode.com 镜像（GitHub 原版超时）
> 分析日期：2026-04-14

## 基本信息

- **开发方**：上海 AI 实验室（Shanghai AI Laboratory）
- **许可**：部分子项目为 Apache 2.0 / MIT，详见各子目录 LICENSE
- **模型规模**：7B 参数（IXC-2.5）
- **核心能力**：多模态大型视觉语言模型，支持图文交错输入、超长上下文、4K 分辨率理解、视频理解、网页生成

## 主要版本

| 版本 | 发布时间 | 核心特性 |
|------|----------|----------|
| IXC-1.0 | 2023-09 | 基础图文组合与理解 |
| IXC-2.0 | 2024-01 | 4K 分辨率支持 |
| IXC-2-4KHD | 2024-04 | 4K HD，VL 微调代码开源 |
| IXC-2.5 | 2024-07 | 24K 上下文 + RoPE 外推到 96K，多图多轮对话，网页生成 |
| IXC-2.5-Reward | 2024-12 | 多模态奖励模型（ACL 2025 Findings） |
| IXC-2.5-OmniLive | 2024-12 | 流式视频+音频交互系统 |

## 技术架构

- **LLM 基座**：InternLM2（7B）
- **ViT 编码器**：InternViT（原生 560×560），动态分辨率处理
- **上下文**：24K interleaved image-text → 可外推到 96K（RoPE extrapolation）
- **优化**：Flash Attention 2，BF16/FP16 推理

## 核心能力

1. **图文交错理解**：多图多轮对话，支持 Image1 `<ImageHere>` 等占位符格式
2. **超长视频理解**：将视频视为高分辨率复合图，密集采样帧
3. **网页生成**：指令→HTML/CSS/JS（write_webpage、resume_2_webpage、screen_2_webpage）
4. **文章写作**：CoT + DPO 优化图文文章质量
5. **4K+ 分辨率**：任意宽高比高分辨率图像理解

## Benchmark 表现

在 28 个多模态 benchmark 上评测，16 项超越现有开源 SOTA；在 MVBench、MLVU、DocVQA 等 16 项任务上与 GPT-4V / Gemini Pro 持平或超越。

## 相关子项目

- **ShareGPT4V**（ECCV 2024）：GPT4-V 生成高质量图文 caption 数据集
- **ShareGPT4Video**：视频 caption 数据集
- **DualFocus**：宏微观视角融合框架
- **MMDU**：多图多轮对话 benchmark

## 模型资源

| 模型 | HuggingFace | ModelScope |
|------|-------------|------------|
| IXC-2.5-7B | internlm/internlm-xcomposer2d5-7b | Shanghai_AI_Laboratory/internlm-xcomposer2d5-7b |
| IXC-2-4KHD-7B | internlm/internlm-xcomposer2-4khd-7b | Shanghai_AI_Laboratory/internlm-xcomposer2-4khd-7b |
| IXC-2-4bit | internlm/internlm-xcomposer2-7b-4bit | Shanghai_AI_Laboratory/internlm-xcomposer2-7b-4bit |

## 依赖

- Python 3.8+
- PyTorch 1.12+（推荐 2.0+）
- CUDA 11.4+
- flash-attention2（高分辨率必需）
