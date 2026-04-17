---
title: sd-webui-controlnet
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, python, diffusion, image-generation, open-source]
sources: [raw/articles/ai-game-devtools/sd-webui-controlnet.md]
---

# sd-webui-controlnet

**sd-webui-controlnet** 是 AUTOMATIC1111 Stable Diffusion WebUI 的 ControlNet 扩展插件，由 Mikubill 维护，支持在 WebUI 中原生集成 [[ai-game-devtools/controlnet]] 条件控制能力，无需模型合并即可实时生成。

## 概述

该插件为 A1111 WebUI 提供了完整的 ControlNet 图形界面和操作能力，是当前最主流的 ControlNet 用户端工具。支持 ControlNet 1.0/1.1 全部模型、T2I-Adapter 系列、以及 IP-Adapter 等多种条件控制方式。

## 核心功能

### 条件预处理器（Annotators）
内置 20+ 种条件图像预处理器，位于 `annotator/` 目录：
- **姿态控制**：openpose（人体）、densepose（密集姿态）、keypose
- **边缘/线条**：canny、hed、pidinet、lineart、lineart_anime、mlsd、manga_line
- **深度估计**：midas、zoe、depth_anything、depth_anything_v2、leres
- **法线估计**：normalbae、normaldsine
- **其他**：shuffle（内容打乱）、clipvision（IP-Adapter）、scribble/teed（草图）、binary（二值化）、color（色彩）、mediapipe_face（面部关键点）、oneformer/uniformer（语义分割）、lama（修复蒙版）、anime_face_segment（动漫面部）

### 三种控制模式
| 模式 | 机制 | 适用场景 |
|------|------|----------|
| Balanced | CFG 两侧均注入 | 默认平衡 |
| My prompt is more important | 逐层衰减注入权重 | 强调文本提示 |
| ControlNet is more important | 仅条件侧注入，强度×cfg-scale | 强调结构控制 |

### 其他特性
- **Multi-ControlNet**：单次生成支持多路 ControlNet 输入
- **Pixel-Perfect 模式**：自动计算最优预处理器分辨率
- **Reference-Only**：无需模型，通过注意力层直接链接参考图
- **高斯修复兼容**：完美支持 A1111 的 High-Res Fix 和所有 Img2Img/Inpaint 模式
- **API 访问**：通过 `--api` 标志暴露 REST 接口
- **批量模式**：支持批量目录处理

## 技术架构

- **`scripts/`**：主扩展脚本，含 API、批量处理、ControlNet 核心集成
- **`scripts/controlnet_ui/`**：Gradio WebUI 界面组件
- **`scripts/preprocessor/`**：预处理器流水线
- **`scripts/ipadapter/`**：IP-Adapter 集成
- **`scripts/animate_diff/`**：AnimateDiff 集成
- **`internal_controlnet/`**：内部实现（cldm、lllite、lora 变体）
- **`annotator/`**：20+ 条件图像预处理器
- Python 3.10+，GPL v3 许可
- 最低配置：NVIDIA Ampere 4GB VRAM（启用 `--xformers` + Low VRAM）

## 与同类工具对比

- 相比 [[ai-game-devtools/comfyui]] 的节点式 ControlNet 管线，sd-webui-controlnet 提供 Gradio 表单式界面，更易上手
- 作为 [[ai-game-devtools/controlnet]] 的官方 WebUI 适配层，与原始论文架构完全兼容
- [[ai-game-devtools/blender-controlnet]] 通过 API 桥接本插件，实现 Blender 渲染→ControlNet→回传工作流
- [[ai-game-devtools/sd-webui-depth-lib]] 作为互补插件提供深度图库管理

## 版本与更新

截至 2024-07 最新版本 v1.1.454，新增 ControlNet union 模型支持。活跃更新包含：Depth Anything V2 预处理器、PuLID 身份保留、IP-Adapter 区域蒙版、ControlNet++ 模型等。

## 相关链接

- GitHub: https://github.com/Mikubill/sd-webui-controlnet
- Wiki: https://github.com/Mikubill/sd-webui-controlnet/wiki/Model-download
- 原版 ControlNet 论文: [[ai-game-devtools/controlnet]]
- A1111 WebUI: https://github.com/AUTOMATIC1111/stable-diffusion-webui
