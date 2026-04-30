---
title: InfiniteTalk
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [avatar, video, audio, open-source]
sources: [raw/articles/ai-game-devtools/infinite-talk.md]
---

# InfiniteTalk

## Overview
MeiGen-AI 开源的音频驱动视频生成模型，支持**无限长度**说话视频生成。基于 [[wan2-1]] Wan2.1-I2V-14B 基座，通过 chinese-wav2vec2 音频编码 + 音频条件注入，实现 image-to-video 和 video-to-video 双模式。

## Key Features
- **稀疏帧视频配音（Sparse-Frame Video Dubbing）：** 精准唇形同步 + 头部运动/身体姿态/面部表情与音频对齐
- **无限长度生成：** 突破传统视频长度限制，streaming 模式默认支持 1000 帧（~40 秒），身份一致性保持
- **双输入模式：** image+audio→video 和 video+audio→video
- **多角色动画：** 提供 multi-person 权重，支持多人同时对话场景

## Technical Architecture
- **基座模型：** Wan2.1-I2V-14B-480P（14B 参数视频生成模型）
- **音频编码器：** chinese-wav2vec2-base（中文语音特征提取）
- **音频条件权重：** MeiGen-InfiniteTalk（safetensors 格式）
- **推理模式：** streaming（长视频分段流式生成）/ clip（短片段）
- **分辨率：** 480P / 720P 可选
- **加速技术：** TeaCache / APG / FP8 量化 / LoRA（4~8 步快速生成）
- **分布式训练/推理：** FSDP + Ulysses 8 卡并行
- **Gradio Web UI：** app.py 交互式界面

## VRAM Requirements
- 标准 480P：需要大显存 GPU
- 低 VRAM 模式：`--num_persistent_param_in_dit 0` 可显著降低显存
- FP8 量化：单 GPU 即可运行
- 720P：更高显存需求

## License & Availability
- **许可证：** Apache 2.0
- **模型权重：** Hugging Face（MeiGen-AI/InfiniteTalk）免费可用
- **生成内容：** 无版权主张，用户自负法律责任

## Related Tools
相比 [[sadtalker]]（基于 3DMM 的音频驱动肖像动画，计算开销低但分辨率有限），InfiniteTalk 基于 Wan2.1 视频生成基座，生成质量更高且支持无限长度。相比 [[hallo]]（扩散模型音频驱动，SD 1.5 + AnimateDiff），InfiniteTalk 采用流式推理架构，突破了单次生成的长度限制。与 [[liveportrait]]（视频驱动，需参考视频输入）不同，InfiniteTalk 仅需音频即可驱动。

## Links
- GitHub: https://github.com/MeiGen-AI/InfiniteTalk
- Project Page: https://meigen-ai.github.io/InfiniteTalk/
- arXiv: 2508.14033
- HuggingFace: https://huggingface.co/MeiGen-AI/InfiniteTalk
