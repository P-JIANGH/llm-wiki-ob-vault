---
title: Follow-Your-Click
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, tool, project]
sources: [raw/articles/ai-game-devtools/follow-your-click.md]
---

# Follow-Your-Click

AAAI 2025 论文官方实现：开放域区域图像动画，通过简短文本提示精确控制静态图像的局部运动，无需复杂指令或密集运动掩码。

## 基本信息
- **论文:** "Follow-Your-Click: Open-domain Regional Image Animation via Short Prompts"
- **会议:** AAAI 2025
- **ArXiv:** [2403.08268](https://arxiv.org/abs/2403.08268)
- **作者:** Yue Ma*, Yingqing He*, Hongfa Wang*, Andong Wang, Chenyang Qi, Chengfei Cai, Xiu Li, Zhifeng Li, Heung-Yeung Shum, Wei Liu, Qifeng Chen
- **项目主页:** https://follow-your-click.github.io/
- **GitHub:** https://github.com/mayuelala/FollowYourClick

## 核心功能
用户点击图像选择区域后，输入简短自然语言提示（如 "Tune the head"、"Flap the wings"、"Smile"、"Dancing"），系统生成该区域的精确局部动画，背景保持不变。

### 演示提示词示例
"Tune the head" | "Flap the wings" | "Storm" | "Smile" | "Sad" | "Launch" | "Drift" | "Dancing" | "Drive back and forward"

## 技术架构
基于扩散模型的时序动画管线：

| 模块 | 功能 |
|------|------|
| `animatediff/` + `diffusers/` | 核心扩散管线与时序动画模块 |
| `ip_adapter/` | 图像-提示适配器，视觉条件化与特征对齐 |
| `mmflow/` | 多模态光流估计，运动追踪 |
| `Inpaint-Anything/` | 区域感知修复与背景保持 |
| `brush_utils/` | 交互式掩码/画笔工具，精确区域选择 |

## 与同类工具差异
- 相比 [[ai-game-devtools/controlnet]]（需要条件图输入），Follow-Your-Click 仅需**点击+短提示**
- 属于 "Follow" 研究系列：Follow-Your-Pose（姿态引导文本到视频生成，尚未收录）为同系列前作
- 与 [[ai-game-devtools/easyphoto]] 同属图像生成/动画方向，但 EasyPhoto 专注人像分身，Follow-Your-Click 专注区域运动

## 相关研究
- **Follow-Your-Pose**: 姿态引导文本到视频生成，同作者系列工作
- 基于 AnimateDiff 时序扩散框架扩展
- 与 [[ai-game-devtools/dwpose]] 类似使用姿态/运动先验，但 DWpose 专注姿态估计，Follow-Your-Click 专注动画生成
