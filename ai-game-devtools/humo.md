---
title: HuMo — Human-Centric Video Generation via Collaborative Multi-Modal Conditioning
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, ai, open-source, python, tool, multimodal, diffusion]
sources: [raw/articles/ai-game-devtools/humo.md]
---

# HuMo: Human-Centric Video Generation

清华大学 & 字节跳动智能创作团队联合开源的**以人物为中心的视频生成模型**，支持文本、图像、音频多模态条件控制，生成高质量、细粒度、高度可控的人物视频。

## 基本信息
- **论文:** arXiv 2509.08519
- **GitHub:** [Phantom-video/HuMo](https://github.com/Phantom-video/HuMo)
- **模型权重:** [Hugging Face](https://huggingface.co/bytedance-research/HuMo)
- **数据集:** [HuMoSet (ModelScope)](https://modelscope.cn/datasets/leoniuschen/HuMoSet)
- **在线 Demo:** [OpenBayes](https://openbayes.com/console/public/tutorials/KhniTI5hwrf)
- **项目主页:** https://phantom-video.github.io/HuMo/

## 核心能力
| 能力 | 描述 |
|------|------|
| 文本跟随 | 强文本提示依从性，精准生成指定动作/场景 |
| 身份一致 | 跨帧保持主体身份一致性 |
| 音频驱动 | 音频同步的动作生成，舞蹈/运动节奏匹配 |
| 多模态输入 | 支持 Text+Audio、Text+Image+Audio 两种管线 |

## 模型版本
| 模型 | 参数 | 说明 | 硬件需求 |
|------|------|------|----------|
| HuMo-17B | 17B | 主模型，支持 480P & 720P | 需高显存 GPU |
| HuMo-1.7B | 1.7B | 轻量版 | 32GB GPU 可运行 |
| HuMo-Longer | - | 延长版（2025.10 发布） | - |

## 技术架构
- **基础模型:** 基于 [[wan2-1]]（Wan2.1 T2V-1.3B）的 VAE 和文本编码器
- **音频编码器:** `ai-game-devtools/whisper` (Whisper-large-v3)
- **音频分离:** Kim_Vocal_2（可选背景降噪）
- **依赖:** flash_attn, torch 2.5.1+, CUDA 12.4
- **配置:** YAML 驱动 (`humo/configs/inference/generate.yaml`)，可调分辨率、时长、模态权重

## 分辨率
- 480P 和 720P 可选
- **强烈推荐 720P**，输出质量显著提升

## HuMoSet 数据集
- 主要用于 Stage 2 训练
- 可用于现有视频基础模型的微调
- 结构：video/ + reference_image/ + video_caption.parquet
- 来源：ModelScope (leoniuschen/HuMoSet)

## 与同类工具对比
- 相比 [[hallo]]（音频驱动肖像动画），HuMo 覆盖全身人物视频而非仅面部
- 相比 [[stableavatar]]（端到端音频驱动头像），HuMo 支持更多模态组合（文本+图像+音频）
- 相比 [[hunyuanvideo-avatar]]（多人角色动画），HuMo 专注于单人物高质量生成
- 与 [[hy-motion-1-0]]（文本到3D动作）不同，HuMo 直接生成视频而非3D骨骼

## 快速安装
```bash
conda create -n humo python=3.11
pip install torch==2.5.1 torchvision==0.20.1 torchaudio==2.5.1
pip install flash_attn==2.6.3
pip install -r requirements.txt
```

## 作者
Liyang Chen\*, Tianxiang Ma\*, Jiawei Liu, Bingchuan Li†, Zhuowei Chen, Lijie Liu, Xu He, Gen Li, Qian He, Zhiyong Wu§
- 清华大学 | 字节跳动智能创作团队
- * 共同一作 | † 项目负责人 | § 通讯作者
