---
title: PuLID
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, diffusion, image-generation, python, open-source]
sources: [raw/articles/ai-game-devtools/pulid.md]
---

# PuLID

**PuLID: Pure and Lightning ID Customization via Contrastive Alignment** 是由 ByteDance（字节跳动）开发的零样本身份保留图像生成方法，仅需单张参考图片即可生成高保真身份定制图像，无需任何微调。发表于 **NeurIPS 2024**。

## 概述

PuLID 的核心思想是通过对比对齐（Contrastive Alignment）将面部身份特征注入到扩散模型的交叉注意力层中。与 [[instantid]] 不同，PuLID 不使用 ControlNet 架构，而是直接将身份 token 注入 UNet/DiT 的交叉注意力处理器。

## 技术架构

### 核心组件

| 模块 | 功能 |
|------|------|
| IDEncoder / IDFormer | MLP/Transformer 身份编码器，将面部特征转换为 ID token |
| IDAttnProcessor | 自定义注意力处理器，将 ID 嵌入注入交叉注意力层 |
| EVA-CLIP-ViT | EVA02-CLIP-L-14-336 视觉骨干，提取面部视觉特征 |
| InsightFace (AntelopeV2) | 面部检测、身份特征提取 |
| FaceRestoreHelper (facexlib) | 人脸对齐、检测、解析（BiSeNet） |

### 工作流程

1. **面部检测** — InsightFace 检测最大人脸
2. **人脸对齐** — facexlib 对齐并裁剪为 512×512
3. **面部解析** — BiSeNet 分割面部区域，生成灰度+白底特征图
4. **特征提取** — EVA-CLIP 提取视觉特征 + InsightFace 提取身份嵌入
5. **特征拼接** — 身份嵌入与 CLIP 特征拼接
6. **ID 编码** — IDEncoder（MLP）将特征转换为 ID token
7. **注意力注入** — IDAttnProcessor 将 token 注入 SDXL/FLUX 交叉注意力层
8. **图像生成** — 修改后的扩散管线生成保留身份的图像

### 模型版本

| 版本 | 基础模型 | 特点 |
|------|---------|------|
| PuLID-v1 | SDXL | 原始论文模型 |
| PuLID-v1.1 | SDXL | 更好的兼容性、可编辑性、面部自然度和相似度 |
| PuLID-FLUX-v0.9.0 | [[flux]] | 首个 FLUX 版本，更好的提示跟随能力 |
| PuLID-FLUX-v0.9.1 | [[flux]] | ID 保真度提升约 5 个百分点 |

## 特点

- **零样本** — 无需训练，单张图片即可使用
- **闪电生成** — 基于 SDXL-Lightning 4 步快速推理
- **FLUX 支持** — 支持 FLUX 模型（16GB 显存可运行，12GB 已优化）
- **对比对齐** — 同时使用条件和非条件 ID 嵌入训练
- **灰度预处理** — 去除非面部特征（头发、配饰），保留面部结构

## 与同类工具对比

| 工具 | 微调需求 | 图片数量 | 架构 | 支持模型 |
|------|---------|---------|------|---------|
| PuLID | ❌ 无需 | 1 张 | 对比对齐 + 注意力注入 | SDXL, FLUX |
| [[instantid]] | ❌ 无需 | 1 张 | IdentityNet (ControlNet) + IP-Adapter | SDXL |
| LoRA | ✅ 需要 | 多张 | 低秩适配 | 多种 |
| IP-Adapter | ❌ 无需 | 1 张 | 交叉注意力适配器 | SD1.5, SDXL |

## 社区集成

- **ComfyUI**: cubiq/PuLID_ComfyUI（原生实现）、ZHO-ZHO-ZHO/ComfyUI-PuLID-ZHO（diffusers 实现）
- **WebUI**: SD.Next、sd-webui-controlnet PR
- **HuggingFace**: SDXL 和 FLUX 在线演示
- **Replicate**: 在线推理服务

## 许可证

README 中未明确声明许可证。论文发表于 NeurIPS 2024。

## 相关链接

- [GitHub](https://github.com/ToTheBeginning/PuLID)
- [arXiv](https://arxiv.org/abs/2404.16022)
- [HuggingFace Demo (SDXL)](https://huggingface.co/spaces/yanze/PuLID)
- [HuggingFace Demo (FLUX)](https://huggingface.co/spaces/yanze/PuLID-FLUX)
- [Model Zoo](https://huggingface.co/guozinan/PuLID)

## 相关项目

- [[instantid]] — 同为零样本身份保留图像生成，但使用 ControlNet + IP-Adapter 架构
- [[flux]] — PuLID-FLUX 版本的基础扩散模型
- [[hunyuanimage-3-0]] — 同属 Image 分类的 AI 图像生成工具
