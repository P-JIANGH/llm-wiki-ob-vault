---
title: FaceFusion — 行业领先的人脸操作平台
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [tool, open-source, ai, video, avatar, animation]
sources:
  - raw/articles/ai-game-devtools/facefusion.md
---

# FaceFusion — 行业领先的人脸操作平台

## 概述
FaceFusion 是一个开源的行业级人脸操作平台，提供完整的人脸检测、识别、交换、增强、唇形同步等处理能力。支持命令行（headless/batch）和 Gradio Web UI 两种运行模式，内置作业管理系统，可编排多步骤人脸处理流水线。

## 关键特性

| 特性 | 说明 |
|------|------|
| 多模式运行 | UI 模式 (Gradio)、headless 模式、batch 批量模式 |
| 作业管理 | 草稿→队列→执行→重试完整生命周期，支持 remix 步骤 |
| 人脸检测 | 自动检测画面中的人脸，支持多种检测器 |
| 面部关键点 | 高精度 face landmarks 提取 |
| 人脸交换 | 将源人脸替换到目标画面中 |
| 人脸增强 | 提升人脸画质和清晰度 |
| Deep Swapper | 深度学习驱动的高精度人脸替换 |
| 唇形同步 | 音频驱动的口型同步 |
| 表情恢复 | 表情修复与重定向 |
| 帧彩色化 | 视频帧着色/上色 |
| 年龄修改 | 调节面部年龄特征 |
| 背景移除 | 自动背景分离 |
| 声音提取 | 从视频中分离人声 |
| 基准测试 | 内置 benchmark 命令评估性能 |
| 国际化 | 多语言翻译支持 |

## 架构

### 核心处理管线

1. **face_detector**: 人脸检测定位
2. **face_landmarker**: 面部 68/106 点关键点提取
3. **face_classifier**: 人脸分类
4. **face_masker**: 人脸遮罩生成
5. **face_recognizer**: 人脸特征识别/embedding
6. **content_analyser**: 内容安全分析
7. **voice_extractor**: 音频人声提取

### Processors 模块（可插拔）

位于 `facefusion/processors/modules/`，每个处理器包含 `core.py`、`choices.py`、`types.py`、`locales.py`：

| 处理器 | 功能 |
|--------|------|
| face_swapper | 人脸替换 |
| face_enhancer | 人脸画质增强 |
| deep_swapper | 深度学习人脸交换 |
| lip_syncer | 唇形同步 |
| expression_restorer | 表情恢复 |
| frame_colorizer | 帧彩色化 |
| age_modifier | 年龄修改 |
| background_remover | 背景移除 |

### Workflows

- **image_to_image**: 图像到图像转换
- **image_to_video**: 图像到视频生成

### UI 层（Gradio）

位于 `facefusion/uis/`，提供 4 种布局：
- **default**: 主工作界面
- **webcam**: 摄像头实时模式
- **jobs**: 作业管理界面
- **benchmark**: 性能基准测试界面

### 执行引擎

- 支持 CPU/GPU 多后端执行
- 线程数可调（execution_thread_count）
- 内存限制管理（limit_system_memory）
- FFmpeg 视频编码集成

## 技术栈
- **Python 3.10+**: 最低版本要求
- **Gradio**: Web UI 框架
- **FFmpeg**: 视频编解码
- **ONNX Runtime**: 推理加速（推测）
- **curl**: 模型下载依赖

## 许可证
OpenRAIL-AS

## 相关链接
- GitHub: https://github.com/facefusion/facefusion
- 文档: https://docs.facefusion.io
- Windows 安装包: http://windows-installer.facefusion.io
- macOS 安装包: http://macos-installer.facefusion.io

## 与同类工具比较
- 与 [[ai-game-devtools/liveportrait]] 相比，FaceFusion 是**多处理器组合平台**（换脸+增强+唇同步等），而 LivePortrait 专注于**肖像动画**（表情驱动）
- 与 [[ai-game-devtools/hallo]] 和 [[ai-game-devtools/echo-mimic]] 不同，FaceFusion 的 lip_syncer 是模块化组件之一，而非单一音频驱动生成
- FaceFusion 3.0 已集成 [[ai-game-devtools/liveportrait]] 的 expression_restorer 和 face_editor 能力，形成互补生态
- 与 [[ai-game-devtools/animate-anyone]] 面向全身动画不同，FaceFusion 聚焦于**面部级别**的处理
