# Openpose Editor

**Source:** [fkunn1326/openpose-editor](https://github.com/fkunn1326/openpose-editor)
**Captured:** 2026-04-17
**Category:** AI Game DevTools — Image

---

## Project Overview

Openpose Editor 是一个 **Automatic1111/stable-diffusion-webui 的扩展插件**，提供交互式的人体 OpenPose 姿态编辑和检测功能。用户可以通过 Canvas 界面手动编辑人体骨骼关键点，或从现有图像中自动检测姿态，生成 OpenPose 条件图用于 ControlNet 生成。

## 功能特性

- **姿态编辑 (Pose Editing)** — 在 Canvas 上手动添加/拖拽人体骨骼关键点
- **姿态检测 (Pose Detection)** — 从上传图片中自动检测 OpenPose 关键点
- **背景图片** — 添加背景参考图辅助姿态编辑
- **预设系统** — 保存/加载常用姿态预设 (presets.json)
- **ControlNet 集成** — 一键发送到 ControlNet 扩展（txt2img / img2img）
- **JSON/PNG 导出** — 保存为 JSON 格式或 OpenPose PNG 条件图

## 技术架构

### 主要模块

| 文件 | 功能 |
|------|------|
| `scripts/main.py` | Gradio UI 构建、WebUI 扩展注册、按钮事件绑定 |
| `scripts/openpose/body.py` | OpenPose 人体姿态估计（COCO 18 关键点） |
| `scripts/openpose/model.py` | PyTorch bodypose_model 和 handpose_model（来自 ControlNet 项目） |
| `scripts/openpose/util.py` | 工具函数（后处理、关键点解析） |
| `javascript/fabric.js` | Fabric.js Canvas 图形库 |
| `javascript/main.js` | 前端 Canvas 编辑器逻辑（骨骼绘制/拖拽/导出） |

### 关键技术栈

- **后端**: Python + Gradio + PyTorch
- **前端**: JavaScript + Fabric.js (Canvas 图形库)
- **模型**: OpenPose body_pose_model.pth（从 HuggingFace lllyasviel/ControlNet 自动下载）
- **框架**: Stable Diffusion WebUI (Automatic1111) 扩展系统

### 姿态检测流程

```
上传图片 → PIL2CV 转换 → body_estimation (PyTorch bodypose_model)
→ candidate (关键点坐标) + subset (人体关联) → JSON 结果 → Canvas 渲染
```

### OpenPose 模型结构

- **Body Pose Model**: 6-stage multi-stage CNN（CPM 架构）
  - Backbone: VGG-19 前4个 stage（conv1_1 ~ conv4_4_CPM）
  - Stage 1: 双分支（L1: 38通道 PAF + L2: 19通道 热图）
  - Stage 2-6: 迭代 refinement（7×7 卷积，concatenation 跳连）
- **Hand Pose Model**: 类似结构，22 通道热图（21 个手部关键点 + 背景）

## 许可证

MIT License — Copyright (c) 2023 Fkunn1326

## 相关链接

- GitHub: https://github.com/fkunn1326/openpose-editor
- 安装方式：WebUI → Extension → Install from URL → 重启
- 使用注意：ControlNet 的 Preprocessor 应设为"无"（因为已使用此编辑器生成的姿态图）

## 已知问题

- macOS Python SSL 证书验证失败：需运行 `/Applications/Python\ $version/Install\ Certificates.command`
