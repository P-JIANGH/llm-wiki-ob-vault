---
title: Stable Diffusion WebUI Chinese
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/stable-diffusion-webui-chinese.md]
---

# Stable Diffusion WebUI Chinese

## 概述

[VinsonLaro/stable-diffusion-webui-chinese](https://github.com/VinsonLaro/stable-diffusion-webui-chinese) 是 [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 的简体中文本地化扩展。提供两种翻译模式：纯中文（Chinese-All）和中英双语（Chinese-English）。

## 关键信息

| 属性 | 值 |
|---|---|
| 当前版本 | 0313（2024-03-13） |
| 作者 | VinsonLaro（B站 UP 主） |
| 翻译方式 | AI 辅助（ChatGPT + 有道翻译 + 网络检索） |
| 许可证 | 未明确声明 |
| 仓库大小 | 2 个 JSON 文件（~480KB） |

## 技术特点

- **轻量级扩展**：仅包含两个 JSON 本地化模板文件，无需额外依赖
- **扩展覆盖**：内置 9 个常用 WebUI 扩展的中文翻译（[[controlnet]]、[[sd-webui-controlnet]]、openpose-editor、multidiffusion-upscaler、lora-block-weight、segment-anything 等）
- **安装方式**：支持 WebUI 扩展管理器在线安装或手动 git clone 复制
- **双语模式**：提供 Chinese-All（纯中文）和 Chinese-English（中英对照）两种模式

## 安装

1. WebUI → Extensions → Install from URL → 粘贴仓库地址
2. Settings → User interface → Localization 选择 Chinese-All 或 Chinese-English
3. Apply settings → Reload UI

## 与同类工具差异

- 相比 [[comfyui]]（原生支持多语言但节点式工作流），本项目专注于 WebUI 的界面汉化
- 是 [[stable-diffusion]] 生态中最受欢迎的中文本地化方案之一
- 作者自 2023 年末转向 LLM 开发后更新频率降低

## 作者背景

作者从 Disco Diffusion 时代开始接触 AI 绘画，经历了 SD 1.5/Waifu、NovelAI 泄露、LoRA/ControlNet 大规模应用、[[comfyui]] 出现等关键节点。2023 年末起转向 LLM 相关项目开发。

## 相关项目

- [[stable-diffusion-webui]] — 原版 WebUI（AUTOMATIC1111）
- [[stable-diffusion]] — Stable Diffusion 基础模型
- [[controlnet]] — 精确控制生成的扩展
- [[comfyui]] — 替代性节点式 SD 工作流工具

## 来源

- [GitHub 仓库](https://github.com/VinsonLaro/stable-diffusion-webui-chinese)
- [B站视频教程](https://www.bilibili.com/video/BV1kg4y1H73b)
