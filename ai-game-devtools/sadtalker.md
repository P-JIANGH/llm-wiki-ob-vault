---
title: SadTalker
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [audio, avatar, animation, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/sadtalker.md]
---

# SadTalker

CVPR 2023 音频驱动单张肖像说话头像动画系统。由西安交通大学、腾讯 AI Lab、蚂蚁集团联合开发。

**核心能力：** 单张肖像图 + 音频 → 说话头部视频

## 技术架构

四阶段管线：

1. **CropAndExtract：** 人脸检测裁剪 + 3DMM 系数提取
2. **Audio2Coeff：** 音频特征 → 3DMM 表情/姿态系数（audio2exp 网络 + audio2pose VAE）
3. **AnimateFromCoeff：** face-vid2vid 神经渲染生成说话视频
4. **Face Enhancement：** 可选 GFPGAN/Real-ESRGAN 人脸增强

## 关键技术特点

- **3DMM 驱动：** 基于 3D Morphable Model 系数控制表情和姿态
- **参考视频支持：** 可指定参考视频用于眨眼和姿态迁移
- **Still 模式：** `--still` 标志实现自然全身/全身像动画
- **多种预处理：** crop/resize/full 三种模式适配不同输入
- **人脸增强：** GFPGAN 或 RestoreFormer 可选
- **512px 模型：** 提供 512×512 高分辨率面部模型（v0.0.2）

## 部署方式

| 方式 | 说明 |
|------|------|
| Gradio WebUI | `webui.sh` / `webui.bat` 一键启动本地界面 |
| SD WebUI 插件 | Automatic1111 扩展集成 |
| HuggingFace Spaces | 在线演示 |
| Replicate | 云端推理 |
| Colab | 快速演示 notebook |
| Discord Bot | Discord 服务器免费使用 |

## 依赖技术栈

- **PyTorch 1.12+ CUDA**，Python 3.8
- **librosa** 音频处理，**face_alignment** 人脸检测
- **GFPGAN** 人脸增强，**Real-ESRGAN** 超分辨率
- **safetensors** 模型权重存储

## 同类工具对比

相比 [[wav2lip]]（专注唇形同步），SadTalker 生成完整的头部运动（表情+姿态+眨眼），不仅限于嘴部区域。相比 [[hallo]]（扩散模型音频驱动），SadTalker 基于 3DMM 管线，计算开销更低但表情自然度稍弱。[[liveportrait]] 则是视频驱动（非音频），需要参考视频而非音频输入。

## 许可证

Apache 2.0（已移除早期非商业限制）

## 相关链接

- GitHub: https://github.com/Winfredy/SadTalker
- 论文: https://arxiv.org/abs/2211.12194
- 项目页: https://sadtalker.github.io
