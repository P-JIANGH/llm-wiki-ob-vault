---
title: LivePortrait — 快手高效肖像动画框架
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, tool, open-source, video, ai]
sources:
  - raw/articles/ai-game-devtools/live-portrait.md
---

# LivePortrait — 快手高效肖像动画框架

## 概述
LivePortrait 是快手（Kuaishou）开源的高效肖像动画框架，使用单个驱动视频或图像驱动肖像图像/视频生成自然的面部动画。核心创新在于 **Stitching（缝合）** 和 **Retargeting（重定向）** 控制技术。

## 关键特性

| 特性 | 说明 |
|------|------|
| 图像/视频输入 | 支持静态照片和视频作为源输入 |
| 驱动模式 | 视频驱动、图像驱动、Motion Template (.pkl) 驱动 |
| Stitching 控制 | 将动画面部与原图背景无缝融合 |
| Retargeting 控制 | 通过参数缩放精确控制表情/姿态强度 |
| 多主体支持 | 人类（Humans mode）、猫/狗（Animals mode） |
| 自动裁剪 | `--flag_crop_driving_video` 自动 1:1 裁剪驱动视频 |
| torch.compile 加速 | 首次推理优化后提速 20-30% |
| 跨平台 | Linux / Windows / macOS (Apple Silicon MPS) |

## 架构

### 核心管线（`live_portrait_pipeline.py`）
1. **面部检测与关键点**: InsightFace (RetinaFace) → 106 点面部 landmarks
2. **外观特征提取**: 从源图像提取 appearance features
3. **运动参数提取**: 从驱动视频提取 3DMM 运动参数
4. **Stitching 模块**: 动画面部与原图背景融合
5. **Retargeting 模块**: 表情/姿态强度参数化控制
6. **渲染输出**: 生成动画帧 → FFmpeg 视频编码

### Animals Mode
- 使用 **X-Pose**（IDEA-Research）进行动物关键点检测
- 需要编译 CUDA OP `MultiScaleDeformableAttention`
- `--driving_multiplier` 控制动画幅度

## 技术栈
- **Python 3.10 + PyTorch**: 深度学习框架
- **ONNX Runtime GPU**: 推理加速
- **InsightFace**: 面部检测与关键点（内置依赖）
- **X-Pose**: 动物关键点检测（Animals mode 可选）
- **Gradio**: Web UI 界面
- **FFmpeg**: 视频编解码

## 许可证
Apache 2.0

## 社区生态
- **FasterLivePortrait**: TensorRT 加速版本
- **ComfyUI-AdvancedLivePortrait**: ComfyUI 实时预览节点
- **FacePoke**: 鼠标实时控制头部变换应用
- **FaceFusion 3.0**: 集成 LivePortrait 作为 expression_restorer/face_editor
- **sd-webui-live-portrait**: Stable Diffusion WebUI 扩展插件
- 多个 HuggingFace Spaces 和 Replicate 在线演示

## 相关链接
- GitHub: https://github.com/KwaiVGI/LivePortrait
- arXiv: https://arxiv.org/pdf/2407.03168
- 项目主页: https://liveportrait.github.io
- HuggingFace: https://huggingface.co/spaces/KlingTeam/LivePortrait

## 与同类工具比较
- 与 [[hallo]]（复旦音频驱动）不同，LivePortrait 使用**视频/图像驱动**而非音频驱动
- 与 [[hallo2]] 相比，LivePortrait 支持精确的表情/姿态参数编辑（retargeting）
- 与 [[echo-mimic]]（蚂蚁音频驱动）互补，分别面向视觉驱动和音频驱动场景
- [[chatdollkit]] 可集成 LivePortrait 作为 Avatar 渲染后端
