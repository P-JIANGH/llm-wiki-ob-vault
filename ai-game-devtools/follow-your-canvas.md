---
title: Follow-Your-Canvas
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, tool, project, video, diffusion]
sources: [raw/articles/ai-game-devtools/follow-your-canvas.md]
---

# Follow-Your-Canvas

AAAI 2025 论文官方实现：高分辨率视频 Outpainting（视频外扩生成），在原始视频边界外生成丰富的扩展内容，同时保持时空一致性。

## 基本信息
- **论文:** "Follow-Your-Canvas: Higher-Resolution Video Outpainting with Extensive Content Generation"
- **会议:** AAAI 2025
- **ArXiv:** [2409.01055](https://arxiv.org/abs/2409.01055)
- **作者:** Qihua Chen*, Yue Ma*, Hongfa Wang*, Junkun Yuan*✉️, Wenzhe Zhao, Qi Tian, Hongmei Wang, Shaobo Min, Qifeng Chen, Wei Liu✉️
- **项目主页:** https://follow-your-canvas.github.io/
- **GitHub:** https://github.com/mayuelala/FollowYourCanvas

## 核心功能
将视频画面边界向外扩展，生成原始画面之外的全新内容。解决了标准 GPU 显存限制下的视频外扩问题，同时保持**时空一致性**（视频帧之间和外扩区域之间的连贯性）。

## 技术架构
基于 Stable Diffusion 2.1 + AnimateDiff 的扩散管线：

| 组件 | 功能 |
|------|------|
| SD 2.1 | 基础扩散模型 |
| AnimateDiff Motion Module | 时序一致性动画模块 |
| SAM (Segment Anything) | 区域分割与掩码 |
| Qwen-VL-Chat | 视觉语言模型，自动生成提示词 |

### 关键特性
- **窗口化处理:** 每次处理 512×512×64 帧窗口，突破显存限制
- **自动提示:** 无文本提示时，Qwen-VL-Chat 自动生成描述
- **两种推理模式:** 有提示 / 无提示外扩

## 硬件要求
- **最低 60GB VRAM**（训练和推理均需要）
- 训练：8× NVIDIA A800 GPUs，50,000 步
- 数据集：Panda-70M

## 评测
- **基准数据集:** DAVIS 2017
- **指标:** PSNR, SSIM, LPIPS, FVD, AQ（美学质量）, IQ（成像质量，V-Bench）

## 与同类工具差异
- 与 [[ai-game-devtools/animatediff]] 不同：AnimateDiff 是通用文本到视频生成，Follow-Your-Canvas 专注**视频边界外扩**（outpainting），在已有视频基础上扩展画幅
- 与 [[ai-game-devtools/follow-your-click]] 同属 "Follow" 研究系列，但前者做区域动画（点击局部运动），Follow-Your-Canvas 做视频画面整体外扩
- 相比 [[ai-game-devtools/controlnet]] 的条件控制生成，本方法专注于空间扩展而非内容编辑

## "Follow" 研究系列
- [[ai-game-devtools/follow-your-click]]: 区域图像动画（点击+短提示）
- Follow-Your-Pose: 姿态引导文本到视频生成
- Follow-Your-Handle: 可控视频编辑（控制手柄变换）
- Follow-Your-Emoji: 精细可控肖像动画

## 许可证
代码开源，模型权重通过 Google Drive 发布
