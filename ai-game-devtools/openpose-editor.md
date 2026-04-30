---
title: Openpose Editor
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [tool, open-source, python, vision, image-generation]
sources: [raw/articles/ai-game-devtools/openpose-editor.md]
---

# Openpose Editor

**Fkunn1326 开发的 Automatic1111 Stable Diffusion WebUI 人体姿态编辑插件**，提供交互式 Canvas 界面手动编辑或自动检测 OpenPose 骨骼关键点，生成条件图用于 [[controlnet]] 扩散模型控制。

## 概述

Openpose Editor 是 A1111 WebUI 的一个扩展，允许用户在浏览器 Canvas 中直接编辑人体骨骼姿态（COCO 18 关键点格式），生成标准的 OpenPose PNG 条件图。与 [[controlnet]] 的自动预处理器不同，本工具支持**手动精确编辑**，适合需要精确定制角色姿态的场景。

## 核心功能

| 功能 | 说明 |
|------|------|
| 姿态编辑 | Canvas 上手动添加/拖拽人体骨骼关键点，支持多人体 |
| 姿态检测 | 上传图片后自动检测 OpenPose 关键点（基于 PyTorch body_pose_model） |
| 背景参考 | 添加背景辅助定位 |
| 预设系统 | 保存/加载常用姿态模板（presets.json） |
| 发送到 ControlNet | 一键发送到 ControlNet txt2img/img2img 管线 |
| JSON/PNG 导出 | 导出骨骼数据 JSON 或 OpenPose 可视化 PNG |

## 技术架构

### 技术栈
- **后端**: Python + Gradio + PyTorch
- **前端**: JavaScript + Fabric.js Canvas 图形库
- **模型**: body_pose_model.pth（6-stage CPM 架构，来自 ControlNet 项目）
- **集成**: Stable Diffusion WebUI 扩展系统

### 模块结构
- `scripts/main.py` — Gradio UI（143 行），注册到 WebUI 选项卡
- `scripts/openpose/model.py` — PyTorch bodypose_model（221 行）+ handpose_model
- `scripts/openpose/body.py` — 人体姿态估计推理入口
- `javascript/main.js` — Canvas 编辑器（骨骼绘制、拖拽、导出）

### 姿态检测流程
```
上传图片 → PIL2CV → body_estimation (PyTorch) → candidate + subset → JSON → Canvas
```

## 与同类工具对比

- vs [[dwpose]]: DWPose 使用 DW-Pose 模型自动检测全身（body+hand+face）关键点，精度更高；Openpose Editor 提供**手动编辑**能力，适合精确控制
- vs [[sd-webui-depth-lib]]: sd-webui-depth-lib 管理深度图（任意深度信息），Openpose Editor 专攻人体骨骼姿态
- 与 [[controlnet]] 深度集成：Openpose Editor 生成条件图 → ControlNet 消费该条件图 → 扩散模型生成

## 使用场景

1. **游戏角色设计** — 精确定制角色骨骼姿态，生成一致的角色渲染条件
2. **动画预可视化** — 快速摆出关键帧姿态，用于动画参考
3. **AI 图像生成** — 作为 ControlNet 的 Pose 条件输入，控制生成图像的人物姿态

## 许可证

MIT License — Fkunn1326, 2023

## 链接

- [GitHub](https://github.com/fkunn1326/openpose-editor)
- [[controlnet]] — ControlNet Pose 条件控制
- [[sd-webui-depth-lib]] — A1111 WebUI 深度图管理插件
- [[dwpose]] — DWPose 全身姿态预处理器
