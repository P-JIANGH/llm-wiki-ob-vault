---
title: MIMO
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, avatar, open-source, tool]
sources: [raw/articles/ai-game-devtools/mimo.md]
---

# MIMO

**阿里巴巴通义实验室 CVPR 2025 角色视频合成模型：空间分解建模实现可控角色动画**

## 概述

MIMO（MiMic anyOne with Motions and Objects）是阿里巴巴智能计算研究院提出的可泛化角色视频合成模型，能够在统一框架内同时实现：任意角色扩展性、新颖 3D 运动泛化性、以及交互场景适用性。仅需单张参考图像 + 姿态序列（或直接驱动视频），即可生成逼真角色动画视频。

## 核心架构

### 空间分解建模

MIMO 的核心思想是利用视频的 3D 本质，将 2D 视频编码为紧凑的空间码：

| 组件 | 功能 |
|:---|:---|
| **深度估计** | 单目深度估计器将 2D 帧像素提升到 3D |
| **主人体分解** | 分离为身份码 C_id（外观）和运动码 C_mo（姿态） |
| **场景分解** | 底层场景 + 浮动遮挡物 → 完整场景码 C_so |
| **扩散解码器** | 潜空间码作为条件输入，重建视频 |

### 可控属性

- **角色控制：** 单张图像（真实人物、卡通、拟人化均可）
- **运动控制：** 姿态序列或野生视频驱动，支持复杂 3D 运动
- **场景控制：** 单张场景图像/视频，支持真实物体交互和遮挡

## 使用方法

| 任务 | 脚本 |
|:---|:---|
| 角色动画 | `python run_animate.py` |
| 视频编辑 | `python run_edit.py` |
| 本地 Gradio UI | `python app.py`（需 ≥40GB 显存） |

## 技术规格

- **框架：** PyTorch，基于 Stable Diffusion V1.5
- **预训练权重：** denoising_unet.pth、motion_module.pth、pose_guider.pth、reference_unet.pth
- **显存需求：** ≥40GB VRAM（Gradio 演示）
- **权重来源：** [ModelScope](https://modelscope.cn/models/iic/MIMO) / [HuggingFace](https://huggingface.co/menyifang/MIMO)

## 在游戏开发中的应用

- **NPC 动画生成：** 单张角色概念图 + 动作库 → 可动画 NPC
- **过场动画原型：** 快速生成角色互动场景预览
- **虚拟主播/VTuber：** 参考图像驱动的角色视频合成
- **游戏内角色预览：** 装备/外观变化的动态展示

## 相关项目

- 与 [[animate-anyone]] 同属阿里系扩散模型角色动画方案，但 MIMO 增加了场景分解和交互支持
- 与 [[animatediff]] 相比：AnimateDiff 是基于 SD 的通用动画模块，MIMO 专注角色视频生成且支持属性解耦
- 与 [[liveportrait]] 相比：LivePortrait 专注头像面部动画，MIMO 覆盖全身 + 场景交互

## 来源

- 论文：[arXiv:2409.16160](https://arxiv.org/abs/2409.16160)
- 项目页：https://menyifang.github.io/projects/MIMO/
- GitHub：[menyifang/MIMO](https://github.com/menyifang/MIMO)
- 在线演示：[ModelScope Studio](https://modelscope.cn/studios/iic/MIMO)
