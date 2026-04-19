---
title: LivePortrait — 高效肖像动画
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, tool, open-source, animation, ai-model]
sources: [raw/articles/ai-game-devtools/liveportrait.md]
---

# LivePortrait: Efficient Portrait Animation

## 概述

LivePortrait 是快手（Kuaishou Technology）联合 USTC 和复旦大学开发的**高效肖像动画**工具，2024 年 7 月开源。通过 stitching 和 retargeting 控制技术，将静态人像照片（人、猫、狗）配合驱动视频/图像生成动态肖像视频，支持 image-to-video 和 video-to-video 两种工作流。

## 核心架构

- **Stitching & Retargeting 控制**: 核心机制，将驱动视频的面部动作精确映射到源肖像上，保持身份一致性
- **双模式推理**: Humans 模式（通用人像）+ Animals 模式（猫狗肖像，基于 X-Pose 检测器）
- **Motion Template (.pkl)**: 预生成的运动模板文件，支持快速推理和隐私保护（无需传递原始驱动视频）
- **Image-driven mode**: 支持用静态图像而非视频作为驱动输入
- **Regional control**: 可精确控制面部特定区域的动作

## 技术特点

| 维度 | 细节 |
|------|------|
| 输入 | 方形肖像照片 + 驱动视频/图像/.pkl 模板 |
| 输出 | MP4 视频 |
| 推理入口 | `inference.py` / `inference_animals.py` |
| 平台支持 | Linux (NVIDIA), Windows (NVIDIA), macOS (Apple Silicon) |
| 加速方案 | torch.compile (20-30% 提速，首次编译约 1 分钟) |
| 框架 | PyTorch 2.3.0, Python 3.10 |
| 模型下载 | HuggingFace (KlingTeam/LivePortrait) |
| 用户界面 | Gradio (app.py / app_animals.py) |

## 平台兼容性

- **Linux/Windows NVIDIA**: 完整功能，含 Animals 模式
- **macOS Apple Silicon**: Humans 模式可用（需 PYTORCH_ENABLE_MPS_FALLBACK=1），Animals 模式不支持
- **Windows CUDA 12.4+**: 可能不稳定，建议降级到 CUDA 11.8

## 社区生态

- **FasterLivePortrait**: TensorRT 优化版本，提升推理速度
- **ComfyUI-AdvancedLivePortrait**: ComfyUI 节点集成，支持精确肖像编辑
- **Windows 一键安装器**: 自动更新支持
- **LivePortrait-Mcp**: Model Context Protocol 服务器封装
- **Remotion 封装**: React/Next.js 集成方案
- **移动端部署**: MLC-LLM 集成
- 被广泛应用于快手、抖音、剪映、微信视频号等平台

## 与同类工具差异

- 对比 [[ai-game-devtools/hallo]]：LivePortrait 专注图像/视频驱动的面部重演（无需音频），Hallo 是音频驱动的说话人生成（需语音输入），两者互补
- 对比 [[ai-game-devtools/echomimic]]：EchoMimic 同时支持音频和地标驱动，LivePortrait 仅支持视觉驱动但速度更快、平台兼容性更广（含 macOS）
- 对比 [[ai-game-devtools/ditto-talkinghead]]：Ditto 基于 S2G-MDDiffusion 做音频驱动姿态生成并引用 LivePortrait 做地标操作；LivePortrait 是纯视觉驱动的端到端方案
- 独特优势：Motion Template 系统、跨平台支持、Animals 模式（猫狗肖像）

## 相关链接

- GitHub: https://github.com/KwaiVGI/LivePortrait
- 论文: https://arxiv.org/pdf/2407.03168
- 项目主页: https://liveportrait.github.io/
- HuggingFace: https://huggingface.co/KlingTeam/LivePortrait
