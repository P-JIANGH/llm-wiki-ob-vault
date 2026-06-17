---
title: MuseV
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, video, diffusion, open-source, ai, tool, image-generation]
sources: [raw/articles/ai-game-devtools/musev.md]
---

# MuseV

**MuseV: Infinite-length and High Fidelity Virtual Human Video Generation with Visual Conditioned Parallel Denoising**

## 概述

腾讯音乐 TME Lyra Lab 开源的基于扩散模型的虚拟人视频生成框架，核心创新是**视觉条件并行去噪（Visual Conditioned Parallel Denoising）**方案，支持**无限长度**视频生成，同时保持高保真度。

**作者:** Zhiqiang Xia, Zhaokang Chen, Bin Wu 等 | **发布日期:** 2024-03-27

## 核心能力

| 能力 | 说明 |
|------|------|
| Text2Video | 文本+参考图→虚拟人视频 |
| Image2Video | 单张参考图像→动画视频 |
| Video2Video | 参考视频→风格化/重绘视频 |
| Pose2Video | 姿态序列+参考图→舞蹈视频（musev_referencenet_pose） |
| 无限长度 | 视觉条件并行去噪，避免累积误差 |
| SD 生态兼容 | 支持 base_model 替换、LoRA、ControlNet |

## 技术架构

### 三档模型

| 模型 | 组件 | VRAM | 说明 |
|------|------|------|------|
| `musev/unet` | 仅 UNet motion 模块 | ~8GB | 轻量，无需 ReferenceNet |
| `musev_referencenet` | UNet + ReferenceNet + IPAdapter | ~12GB | 支持参考图像保真 |
| `musev_referencenet_pose` | UNet + ReferenceNet + Pose ControlNet | ~12GB | 姿态驱动，ReferenceNet/ControlNet 冻结 |

### 关键技术

- **ReferenceNet:** 类似 [[aniportrait]] 的参考网络，从参考图提取外观特征
- **IPAdapter:** 图像提示适配器，支持多参考图技术（IPAdapterFaceID 保脸）
- **Parallel Denoising:** 将长视频分段并行去噪，视觉条件引导避免漂移
- **MMCM:** 自研多媒体跨模态处理包，支持 20+ ControlNet 预处理器（dwpose/canny/depth/hed/sam 等）
- **基础模型:** majicmixRealv6Fp16、fantasticmix_v10（SD 1.5，可替换）

### 推理流程

```
text2video.py: 文本+参考图 → IPAdapter提取视觉特征 → ReferenceNet编码 → UNet并行去噪 → 视频
video2video.py: 参考视频 → ControlNet提取条件 → RGB/ControlNet视频影响初始噪声 → UNet去噪 → 重绘视频
```

## 依赖栈

Docker (推荐) / Conda / pip | PyTorch | HuggingFace Diffusers(修改版) | OpenMMLab (mmcv/mmdet/mmpose) | MMCM(自研) | ControlNet_Aux

## 训练数据

约 60K 人文本视频对（ucf101 + webvid），分辨率 512×320。训练代码待发布。

## 与同类工具差异

- 相比 [[musepose]]（姿态驱动全身舞蹈），MuseV 侧重文本/图像驱动的虚拟人视频生成，两者互补
- 相比 [[musetalk]]（音频驱动唇同步），MuseV 生成全身动作视频，MuseTalk 在此基础上添加唇同步，两者配合形成完整管线
- 相比 [[animatediff]]（通用视频扩散），MuseV 专注虚拟人领域，集成 ReferenceNet/IPAdapter 实现身份保真
- 相比 [[liveportrait]]（视频驱动肖像），MuseV 支持文本驱动且能生成无限长度视频

## 限制

- 泛化能力受视觉条件和 T2I 基础模型影响较大
- 运动范围有限（训练数据规模约束）
- webvid 来源可能导致水印
- 并行去噪适合固定镜头场景
- ReferenceNet 和 IPAdapter 训练不足（时间/资源限制）
- 代码结构复杂，学习曲线陡峭

## 许可

- **代码:** MIT License（学术和商业均可）
- **模型权重:** 仅限非商业研究用途

## 相关链接

- [GitHub](https://github.com/TMElyralab/MuseV)
- [HuggingFace Model](https://huggingface.co/TMElyralab/MuseV)
- [HuggingFace Space Demo](https://huggingface.co/spaces/AnchorFake/MuseVDemo)
- [Project Page](https://tmelyralab.github.io/MuseV_Page/)
- [ComfyUI 集成](https://github.com/chaojie/ComfyUI-MuseV)
