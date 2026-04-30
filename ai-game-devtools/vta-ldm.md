---
title: VTA-LDM — Video-to-Audio Generation with Hidden Alignment
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [ai-model, tool, audio, open-source, video]
sources: [raw/articles/ai-game-devtools/vta-ldm.md]
---

# VTA-LDM: Video-to-Audio Generation with Hidden Alignment

## Overview
VTA-LDM 是腾讯 AI Lab 开发的**视频到音频生成模型**，基于潜扩散模型（LDM）架构，通过隐藏对齐机制实现视频与生成音频的语义和时间同步。输入视频，输出与之匹配的 Foley 音效或环境声。

## Key Facts
- **论文:** arXiv 2407.07464 (2024-07)
- **作者:** Manjie Xu, Chenxing Li, Yong Ren, Rilin Chen, Yu Gu, Wei Liang, Dong Yu
- **机构:** Tencent AI Lab（非官方产品）
- **GitHub:** [ariesssxu/vta-ldm](https://github.com/ariesssxu/vta-ldm)
- **HuggingFace:** ariesssxu/vta-ldm-clip4clip-v-large
- **代码:** 8 commits，main 分支
- **训练硬件:** 8× A100 GPU，约 3 天

## Architecture
- **潜扩散模型** — 在潜空间中生成音频频谱图，再解码为波形
- **CLIP4CLIP 视频编码器** — 提取视觉特征作为条件输入
- **隐藏对齐机制** — 隐式学习视频帧与音频帧之间的时间对应关系，无需显式标注
- **基于 accelerate 分布式训练框架**

## Technical Details
- **数据格式:** JSONL，每行一样本（video_path + audio_file 必填）
- **I/O 优化:** 训练前预提取关键帧，避免视频解码成为 I/O 瓶颈
- **推理管线:** 视频输入 → 特征提取 → 扩散生成 → 音频输出 → ffmpeg 合并
- **依赖:** diffusers + [[tango]] + [[audioldm-2]]

## Game Dev Relevance
- 可用于游戏开发中自动生成 Foley 音效（脚步声、环境声等）
- 从游戏过场动画/预告片自动配乐
- 视频驱动的音频管线可集成到游戏内容创作工具链中

## Related Projects
- [[tango]] — 文本到音频扩散生成模型，VTA-LDM 的基座之一
- [[audioldm-2]] — AudioLDM 2 通用音频生成框架，VTA-LDM 的代码基座
- [[hunyuanvideo-foley]] — 腾讯混元视频音效生成模型，同为腾讯系视频→音频方案
