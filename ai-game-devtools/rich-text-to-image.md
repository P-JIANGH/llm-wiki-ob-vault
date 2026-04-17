---
title: Rich-Text-to-Image
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/rich-text-to-image.md]
---

# Rich-Text-to-Image

**Expressive Text-to-Image Generation with Rich Text** — ICCV 2023

| Field | Value |
|-------|-------|
| **Authors** | Songwei Ge (UMD), Taesung Park (Adobe), Jun-Yan Zhu (CMU), Jia-Bin Huang (UMD) |
| **License** | MIT |
| **Stars** | ~1k+ |
| **Paper** | [arXiv:2304.06720](https://arxiv.org/abs/2304.06720) |
| **GitHub** | [SongweiGe/rich-text-to-image](https://github.com/SongweiGe/rich-text-to-image) |
| **Demo** | [HuggingFace Space](https://huggingface.co/spaces/songweig/rich-text-to-image) |

## Overview

将富文本格式信息（字体大小、颜色、样式、脚注）映射为文本到图像生成的控制信号。通过解析 Quill 富文本编辑器的 JSON 输出，在扩散模型的交叉注意力层注入空间掩码，实现对生成图像不同区域的精细控制。

## 核心能力

| 富文本属性 | 控制效果 | 实现方式 |
|-----------|---------|---------|
| **字体颜色** | 精确控制生成对象的颜色 | 梯度引导（Gradient Guidance），MSE 损失约束区域 RGB 值 |
| **字体大小** | Token 权重调节（大小=重要性） | 在 softmax 前调整交叉注意力指数分数 |
| **字体样式** | 局部艺术风格控制 | 字体→风格映射（mirza→印象派, roboto→浮世绘等），区域扩散 |
| **脚注/链接** | 补充区域描述 | 脚注文本作为区域 prompt，目标 token 关联到原文 |

## 技术架构

### 两阶段管线
1. **Plain-text 阶段**：输入普通文本 → 扩散模型生成 → 提取 cross-attention + self-attention token maps，关联每个 token 到空间区域
2. **Rich-text 阶段**：基于区域掩码进行区域扩散，每个区域使用独立的文本 embedding 和注意力掩码

### 关键模块
- **RegionDiffusion / RegionDiffusionXL**：核心模型类，支持 SD 1.5 和 SDXL 后端
- **PyTorch Hooks**：通过 forward hook / forward_pre_hook 注册注意力图提取和替换
- **Token Map 提取**：`get_token_maps()` 从注意力图中分割区域（默认 SLIC 分割 + 阈值）
- **Detail Preservation**：通过 self-attention 注入（`inject_selfattn`）和背景注入（`inject_background`）保持普通文本生成的结构

### 支持的模型后端
- Stable Diffusion v1-5（默认）
- Stable Diffusion XL 1.0
- Animagine-XL（anime 微调版）

## 与同类工具差异

- 与 [[ai-game-devtools/controlnet]] 不同：ControlNet 使用外部条件图（canny/depth/pose），Rich-Text-to-Image 使用文本格式属性作为控制信号
- 与 Prompt-to-Prompt 的 AttentionRefine 不同：R-T2I 支持颜色/大小/样式/脚注四种控制维度，而非仅注意力重加权
- 与 [[ai-game-devtools/comfyui]] 不同：ComfyUI 是节点式可视化管线编辑器，R-T2I 是专门的富文本控制方法

## 集成方式

- Gradio 本地 demo（`gradio_app.py`）
- HuggingFace Space 在线 demo
- A1111 WebUI 扩展：[sd-webui-rich-text](https://github.com/songweige/sd-webui-rich-text)
- LoRA checkpoint 支持（lora 分支）
- 纯前端 rich-text-to-json 转换页面，可嵌入任意应用

## 评估基准

- **Local Style Generation**：CLIP 相似度评估区域风格匹配度，对比 AttentionRefine
- **Precise Color Generation**：三难度等级（HTML/RGB/Common 颜色名），L2 距离衡量颜色准确性
