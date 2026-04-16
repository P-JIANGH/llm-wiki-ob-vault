---
title: ComfyUI
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, ai, open-source, python, architecture]
sources: [raw/articles/ai-game-devtools/comfyui.md]
---

# ComfyUI

## Overview

ComfyUI 是由 comfyanonymous 开发的最强大且模块化的视觉 AI 引擎和应用程序。它使用基于节点/图/流程图的界面设计和执行高级 Stable Diffusion 管道，无需编写代码即可构建复杂工作流。支持 Windows、Linux、macOS，兼容 NVIDIA/AMD/Intel/Apple Silicon/Ascend 等多种 GPU 平台。

当前版本：**0.19.1**（每周发布周期），578 个 Python 文件，约 18.7 万行代码。

## 核心架构

### 三层分离
- **comfy/** — 核心 ML 模块：sampler、模型管理、CLIP、ControlNet、LoRA、k_diffusion、ldm
- **execution.py** — 图执行引擎：拓扑排序 + 多层缓存（HierarchicalCache/LRUCache/RAMPressureCache）+ 增量执行
- **nodes.py** — 内置节点（2526 行）：CLIPTextEncode、KSampler、LoadCheckpoint 等，每个节点实现 `ComfyNodeABC` 接口

### 设计特点
1. **节点图工作流**：拖拽式节点连接，支持复杂管线（Hires fix、多阶段采样等）
2. **智能缓存**：仅重新执行变更部分，基于输入签名的缓存键
3. **智能显存管理**：自动模型加载/卸载，1GB VRAM 也可运行大模型
4. **插件系统**：custom_nodes/ 目录 + ComfyUI-Manager 扩展管理
5. **异步队列**：支持多任务排队，后台并发执行

## 支持的模型

| 类型 | 模型 |
|------|------|
| 图像生成 | SD1.x/2.x, SDXL, SDXL Turbo, Stable Cascade, SD3/3.5, Pixart, AuraFlow, HunyuanDiT, Flux 系列, Lumina 2.0, HiDream, Qwen Image, Hunyuan Image 2.1, Z Image |
| 图像编辑 | OmniGen 2, Flux Kontext, HiDream E1.1, Qwen Image Edit |
| 视频生成 | Stable Video Diffusion, Mochi, LTX-Video, Hunyuan Video 系列, Wan 2.1/2.2 |
| 音频生成 | Stable Audio, ACE Step |
| 3D 生成 | Hunyuan3D 2.0 |

## 技术特点

- **许可证**：GPL v3
- **依赖**：PyTorch + transformers + safetensors + Pillow + scipy + einops
- **前端**：独立 Vue.js 项目（Comfy-Org/ComfyUI_frontend），每两周合并到主仓库
- **后端**：纯 Python + aiohttp 异步服务器
- **多 GPU**：CUDA/ROCm/XPU/MPS/torch_npu/torch_mlu/CoreX
- **数据库**：Alembic 迁移 + SQLAlchemy

## 关键链接

- GitHub: https://github.com/comfyanonymous/ComfyUI
- 官网: https://www.comfy.org/
- 云服务: https://www.comfy.org/cloud
- 前端仓库: https://github.com/Comfy-Org/ComfyUI_frontend
- Manager: https://github.com/Comfy-Org/ComfyUI-Manager
- 文档: https://docs.comfy.org/
- 示例工作流: https://comfyanonymous.github.io/ComfyUI_examples/

## 与其他工具的关系

- [[ai-game-devtools/genagent]] — GenAgent 在 ComfyUI 中自动生成 Stable Diffusion 工作流
- [[ai-game-devtools/jaaz]] — Jaaz 多模态画布使用 ComfyUI 作为图像生成执行后端
- [[ai-game-devtools/blender-controlnet]] — Blender-ControlNet 使用 A1111 WebUI API（与 ComfyUI 同类竞品）
- [[ai-game-devtools/anytext]] — AnyText 扩散模型被 ComfyUI 原生支持
- [[ai-game-devtools/autostudio]] — AutoStudio 多智能体图像生成框架，SD 生态，与 ComfyUI 互补
