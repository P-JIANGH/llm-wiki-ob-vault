---
title: CatVTON
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, multimodal]
sources: [raw/articles/ai-game-devtools/catvton.md]
---

# CatVTON — Virtual Try-On Diffusion Model

**ICLR 2025** | [GitHub](https://github.com/Zheng-Chong/CatVTON) | [ArXiv](https://arxiv.org/abs/2407.15886) | [HuggingFace](https://huggingface.co/zhengchong/CatVTON) | [Live Demo](https://huggingface.co/spaces/zhengchong/CatVTON)

## 概述

CatVTON 是一款简单高效的虚拟试穿扩散模型，核心设计哲学是 "Concatenation Is All You Need"——通过直接拼接人物图像和服装图像作为输入，实现高效的虚拟试穿。三大特点：

1. **轻量网络：** 总计 899.06M 参数
2. **参数高效训练：** 仅 49.57M 可训练参数（约 5.5%）
3. **简化推理：** 1024×768 分辨率仅需 < 8GB 显存

## 核心架构

- **基础模型：** Stable Diffusion v1.5 Inpainting（基于 HuggingFace Diffusers）
- **融合方式：** 人物图像 + 服装图像直接拼接作为输入条件
- **参数高效：** 冻结大部分网络权重，仅训练少量参数
- **支持数据集：** VITON-HD（高清虚拟试穿）、DressCode（时尚数据集）

## 版本演进

| 日期 | 更新 |
|------|------|
| 2025/02/24 | CatV2TON 发布（DiT 架构，支持图像+视频试穿） |
| 2025/01/24 | 被 ICLR 2025 接收 |
| 2024/12/19 | CatVTON-FLUX 发布（基于 FLUX.1-Fill-dev 的 37.4M LoRA） |
| 2024/10/17 | 发布无掩码版本（Mask-free） |
| 2024/07/27 | ComfyUI 工作流 + 评估代码发布 |
| 2024/07/21 | 推理代码 + 官方权重发布 |

## 部署方式

### ComfyUI 工作流
- 提供自定义节点包（zip 格式），解压到 ComfyUI 的 `custom_nodes/`
- 拖入 `catvton_workflow.json` 即可使用
- 首次运行自动下载权重

### Gradio 应用
- 支持 bf16 混合精度，8GB 显存即可跑 1024×768
- 支持 VITON-HD 和 DressCode 两种数据集的批量推理

### 评估管线
- 提供成对/非成对评估脚本（FID 等指标）
- 人体分割掩码生成：SCHP（Self-Correction Human Parsing）+ DensePose

## 与同类工具差异

- 相比传统虚拟试穿方法，CatVTON 以极简的拼接策略替代复杂的形变网络
- 相比 [[ai-game-devtools/genagent]]（ComfyUI 工作流自动生成），CatVTON 直接提供可用的 ComfyUI 自定义节点
- 与 [[ai-game-devtools/lumina-t2x]] 等多模态 DiT 框架相比，CatVTON 基于 SD 1.5 架构更轻量，而 CatV2TON 已升级到 DiT 架构
- CatVTON-FLUX 适配了 [[ai-game-devtools/flux]] 系列模型，扩展了底层扩散模型的选择

## 游戏开发应用场景

- 游戏角色换装系统原型快速验证
- 虚拟服装展示和电商式角色自定义
- 游戏角色外观预览工具链构建
- 与 ComfyUI 工作流结合可实现自动化角色外观生成管线

## 许可证

CC BY-NC-SA 4.0（非商业使用）
