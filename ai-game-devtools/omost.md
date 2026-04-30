---
title: Omost
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, llm, image-generation, tool, open-source]
sources: [raw/articles/ai-game-devtools/omost.md]
---

# Omost

LLM 驱动的图像组合 (Image Composing) 工具，由 [[controlnet]] 作者 lllyasviel 开发。将 LLM 的编码能力转化为图像构图能力——LLM 编写 Python Canvas API 代码来描述图像的空间布局和内容，然后由扩散模型渲染器实际生成图像。

## 概述

Omost 的核心创新是用 LLM 生成结构化的 Python 代码来描述图像构图，而非直接使用文本提示词。LLM 输出对虚拟 `Canvas` 的操作代码，包括全局描述和多个局部区域的描述（位置、偏移、面积、深度排序），这些代码被解析后传给扩散模型渲染器。

名称含义：(1) 使用后图像"almost"完成；(2) O=omni（多模态），most=充分利用。

## 核心架构

### Canvas API

两方法构图系统：

- **`set_global_description`**: 设置整个图像的全局描述，包含主提示、详细描述列表、标签、背景色
- **`add_local_description`**: 添加局部区域描述，包含位置（9选1）、偏移（9选1）、面积（9选1）、深度值、描述、氛围、风格、质量元数据

### 自然语言空间编码

- 9×9×9 = 729 种边界框提案
- 位置: 中心/左/右/上/下/四角；偏移: 无/微偏8方向；面积: 小/中/大 × 方/竖/横
- 选择自然语言而非像素坐标：开源 LLM 对数值坐标学习不稳定，语言描述收敛更快更稳定

### 子提示系统 (Sub-prompt)

- 每个子提示 < 75 tokens，可被 CLIP 安全编码不截断
- 贪婪合并策略：将独立语义的子提示合并为 < 75 tokens 的包
- Prompt Prefix Tree：树路径作为提示输入，结合贪婪合并处理超长情况

### 渲染器

基于注意力分数操纵的 parameter-free 渲染：
- 修改 `softmax(modify(q@k))@v` 中的注意力分数分布
- 鼓励 mask 内激活、抑制 mask 外激活
- 零风格偏移，单 SDP attention pass 处理所有提示条件

## 预训练模型

| 模型 | 基础 | 推荐量化 | 最低 VRAM |
|------|------|----------|-----------|
| omost-llama-3-8b | Llama-3-8B | 4-bit | 8GB |
| omost-dolphin-2.9-llama3-8b | Dolphin-2.9-Llama3-8B | 4-bit | 8GB |
| omost-phi-3-mini-128k | Phi-3-Mini (3.8B) | 8-bit | 8GB |

性能排名: Llama-3 > Dolphin > Phi-3。Phi-3 的 128k context 在 ~8k tokens 后性能显著下降。

## 训练方法

混合数据训练：Open-Images 标注 + 自动标注提取 + DPO 强化学习（Python 可编译性作为偏好）+ GPT-4o 调优数据。全部 fp16 训练于 H100 集群，Adam 优化器无特殊技巧。

## 对话式编辑

支持多轮对话修改构图（受 ~8k context 限制约 5-6 轮）。用户可以用自然语言要求修改特定元素（如"把龙改成恐龙"），LLM 重新生成完整的 Canvas 代码。

## 技术栈

PyTorch + Diffusers 0.28 + Transformers 4.41 + Gradio 4.31 + bitsandbytes。最低 8GB Nvidia VRAM 可运行。

## 与同类工具对比

- 与 [[controlnet]] 不同：ControlNet 用条件图引导，Omost 用 LLM 代码描述
- 与 [[comfyui]] 互补：ComfyUI 手动编排管线，Omost 自动化 LLM→代码→渲染
- 与 [[rpg-diffusionmaster]] 类似理念：LLM 参与扩散过程的规划阶段
