---
title: AnyText
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, multimodal]
sources: [raw/articles/ai-game-devtools/anytext.md]
---

# AnyText — Multilingual Visual Text Generation & Editing

**ICLR 2024 Spotlight** | [GitHub](https://github.com/tyxsspa/AnyText) | [ArXiv](https://arxiv.org/abs/2311.03054) | [HuggingFace Demo](https://huggingface.co/spaces/modelscope/AnyText)

## Overview

AnyText 是阿里巴巴开源的多语言视觉文本生成与编辑扩散模型，能够在图像中无缝生成或编辑文字，支持中文、英文等多种语言。解决了传统文生图模型在生成文字时出现的乱码、拼写错误问题。

## 核心架构

基于 Stable Diffusion 1.5 + ControlNet 架构，增加了两个专用模块：

1. **Auxiliary Latent Module（辅助潜变量模块）：** 处理文本字形（glyph）、位置掩码和掩蔽图像，生成潜在特征作为扩散过程的条件
2. **Text Embedding Module（文本嵌入模块）：** 使用 PaddleOCR 风格的 OCR 模型将笔画数据编码为嵌入向量，与 CLIP 的图像描述嵌入融合

### 训练策略
- **Text-Control Diffusion Loss：** 标准扩散损失 + 文本布局条件
- **Text Perceptual Loss：** 基于 CTC 的 OCR 感知损失，提升字符准确度
- 拉丁字符权重较小（`latin_weight: 1.0`），CJK 字符权重更大

### 模型配置
| 组件 | 规格 |
|------|------|
| UNet | 320 channels, 2 res blocks, [1,2,4,4] mult, 8 heads, transformer depth 1 |
| ControlNet | 同上架构，接收 glyph + position 条件 |
| CLIP | FrozenCLIPEmbedderT3, 768-dim context |
| VAE | AutoencoderKL, 4 channels |
| Embedding | OCR 模式, glyph_channels=1, position_channels=1 |

## 功能模式

- **Text Generation（文本生成）：** 提供提示词 + 文本位置掩码 → 生成带文字的图像
- **Text Editing（文本编辑）：** 提供原图 + 新文字 + 位置 → 编辑图像中的文字

## 技术特点

- **FP16 推理：** ~7.5GB VRAM 即可运行 512×512 图像生成（FP16 模式）
- **LoRA 支持：** 支持加载 SD1.5 基础 LoRA 权重，可自定义字体
- **多语言 OCR：** 内置 PaddleOCR 中文+英文识别权重
- **ModelScope 集成：** 通过 `damo/cv_anytext_text_generation_editing` 管道一键推理
- **AnyWord-3M 数据集：** 300万+带文本标注的训练图像

## 评估指标

- **文本准确度：** 句子准确率（Sen. ACC）、归一化编辑距离（NED）
- **图像质量：** Fréchet Inception Distance（FID）
- 在中英文文本生成方面均优于 ControlNet、TextDiffuser、GlyphControl 等基线方法

## 版本历史

| 日期 | 更新 |
|------|------|
| 2025.03.03 | AnyText2 发布：更快速度、更高质量，支持字体和颜色控制 |
| 2024.04.18 | 训练代码 + AnyWord-3M 数据集发布 |
| 2024.02.21 | 评估代码 + AnyText-benchmark 数据集发布 |
| 2024.01.04 | FP16 推理启用（3倍加速，>8GB 显存即可运行） |

## 与同类工具差异

- 相比 **ControlNet**：AnyText 在 ControlNet 架构上增加了文本感知的 OCR 嵌入模块和字形条件
- 相比 **TextDiffuser**：AnyText 使用 OCR 感知损失提升字符准确度
- 相比 **GlyphControl**：AnyText 通过 PaddleOCR 编码原生支持多语言（中英双语）
- AnyText2（后继版本）增加了字体和颜色控制，速度和画质均有提升

## 游戏开发应用场景

- 游戏 UI/海报/宣传图中的文字自动生成
- 游戏内道具/招牌/书籍等带文字纹理的生成
- 多语言游戏本地化时批量生成不同文字版本的素材
- 与 [[ai-game-devtools/genagent]] 结合可在 ComfyUI 中自动构建 AnyText 工作流
- 与 [[ai-game-devtools/lumina-t2x]] 等多模态生成框架互补，AnyText 专注于文字生成

## 许可证

未在 README 中明确声明，版权归属 Alibaba, Inc.
