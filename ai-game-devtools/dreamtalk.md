---
title: DreamTalk
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [avatar, diffusion, audio-driven, talking-head, 3d, tool, open-source]
sources: [raw/articles/ai-game-devtools/dreamtalk.md]
---

# DreamTalk

**音频驱动的表达性说话头像生成扩散模型**

arXiv 2023 | 清华大学 & 蚂蚁集团 | 非商用许可

## 概述

DreamTalk 是基于扩散概率模型的音频驱动说话头像生成框架，能够从音频输入生成高质量的说话头像视频，支持多种说话风格（歌曲、多语言语音、嘈杂音频），并对域外肖像具有鲁棒性。

## 核心架构

**三模块管线：Content Encoder + Style Encoder + Diffusion Decoder → Face Renderer**

| 模块 | 技术 | 作用 |
|------|------|------|
| Content Encoder | Wav2Vec2.0 (1024-dim) + 3层 Transformer (d=256) | 音频特征编码，滑动窗口5帧 |
| Style Encoder | 3DMM参数 + 3层 Transformer + SelfAttentionPooling | 从参考视频提取全局风格码 |
| Diffusion Decoder | NoisePredictor + VarianceSchedule (1000步) | 生成3DMM表情系数 (64维 BFM) |
| Face Renderer | PIRender-based (MappingNet + WarpingNet + EditingNet) | 源图 + 3DMM参数 → 视频帧 |

### 扩散网络
- 支持 **DDPM** 和 **DDIM** 两种采样方式
- **Classifier-Free Guidance**：训练时 10% 概率丢弃 style_clip（null_style_clip），推理时通过 cfg_scale 控制风格强度
- 预测目标：x0（直接预测干净数据而非噪声）
- 线性 beta 调度：β₁=1e-4, β_T=0.02

### 面部渲染器
基于 `ai-game-devtools/pirender` (PIRenderer) 架构改造：
- **MappingNet**：1D卷积 + 膨胀卷积 + 自适应池化，将3DMM参数映射为描述符
- **WarpingNet**：ADAIN Hourglass + 光流场生成，实现面部形变
- **EditingNet**：精细编码器 + 残差解码器，提升图像质量

## 输入/输出

- **输入**：音频文件（wav/mp3/m4a/mp4）+ 参考风格视频（3DMM参数）+ 源肖像图（≥256×256）
- **输出**：25 FPS 说话头像视频（MP4）
- **时长限制**：默认最大生成长度可配置，超出截断

## 超分辨率方案

原始模型输出分辨率有限（256×256），提供两种后处理方案：
1. **CodeFormer**：1024×1024，但速度慢（A100上1帧/秒）且存在时序不一致
2. **MetaPortrait 时序超分**：512×512，10帧/秒，保持时序连贯性，但可能减弱面部情绪强度

## 技术特点

- 支持 CPU 推理（`--device=cpu`）
- 使用 yacs CfgNode 配置管理
- 3DMM 表情系数基于 BFM 基底，上下脸分区域索引
- 参考视频需 25 FPS，面部姿态参考视频需裁剪到 256×256

## 许可证

研究/非商业用途（RESEARCH/NON-COMMERCIAL USE ONLY）

## 模型获取

公开下载已停止，需邮件联系作者（mayf18@mails.tsinghua.edu.cn）获取，仅限学术研究用途。

## 相关链接

- [GitHub](https://github.com/ali-vilab/dreamtalk)
- [arXiv 论文](https://arxiv.org/abs/2312.09767)
- [项目页面](https://dreamtalk-project.github.io/)
- [YouTube 演示](https://youtu.be/VF4vlE6ZqWQ)

## 与同类工具差异

- 对比 [[aniportrait]]：两者均为音频驱动头像，DreamTalk 用扩散模型生成3DMM参数再渲染，AniPortrait 直接通过 wav2vec2 → audio2mesh/audio2pose → 3DMM + AnimateDiff Motion Module
- 对比 [[ditto-talkinghead]]：两者均为扩散方法，DreamTalk 使用 3DMM 参数空间扩散 + PIRender 渲染，Ditto 使用 motion-space 扩散 (LMDM) + HuBERT 音频编码 + LivePortrait 面部操控
- 对比 [[chatdollkit]]：ChatdollKit 是 Unity 实时语音对话 SDK（LLM+STT/TTS+VRM），DreamTalk 是离线视频生成模型

## 依赖

PyTorch 1.8+, Wav2Vec2.0 (transformers 4.28.1), dlib, opencv-python, ffmpeg
