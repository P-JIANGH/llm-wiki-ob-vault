---
title: MMAudio
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, multimodal, video, open-source, tool, flow-matching]
sources: [raw/articles/ai-game-devtools/mmaudio.md]
---

# MMAudio — Taming Multimodal Joint Training for High-Quality Video-to-Audio Synthesis

> **CVPR 2025** | Ho Kei Cheng (UIUC), Masato Ishii (Sony AI), Akio Hayakawa (Sony), Takashi Shibuya (Sony), Alexander Schwing (UIUC), Yuki Mitsufuji (Sony Group)

## Overview
MMAudio 是 **Video-to-Audio + Text-to-Audio** 联合生成模型，核心创新是**多模态联合训练**（multimodal joint training），可同时利用音频-视觉和音频-文本数据集进行训练。配备同步模块（synchronization module）确保生成的音频与视频帧精确对齐。

## 技术架构

### 多模态条件输入
| 模态 | 编码器 | 帧率/分辨率 | 特征维度 |
|------|--------|-------------|----------|
| 视觉 (Video) | OpenCLIP | 8 FPS, 384×384 | clip_dim |
| 同步 (Sync) | Synchformer | 25 FPS, 224px 中心裁剪 | sync_dim |
| 文本 (Text) | OpenCLIP Text | — | text_dim |
| 音频 (Latent) | VAE + BigVGAN | 16kHz / 44kHz | latent_dim |

### 核心网络
- **MMAudio Transformer**：独立输入投影层（audio/clip/sync/text）→ 联合 Transformer Block → Flow Matching 采样
- **Flow Matching**：ODE 求解器用于音频生成，支持多种推理模式和步数配置
- **PostHocEMA**：训练时 EMA profiled checkpoint 选择，提升生成稳定性
- **torch.compile**：train_fn / val_fn 分别编译，大幅提升训练性能

### 关键模块
```
mmaudio/
├── model/
│   ├── networks.py      # MMAudio 主网络（多模态输入投影 + Transformer）
│   ├── flow_matching.py # Flow Matching ODE 采样
│   ├── transformer_layers.py # JointBlock, MMDitSingleBlock
│   └── sequence_config.py    # 16k/44k 序列配置
├── ext/
│   ├── bigvgan/         # BigVGAN 声码器（来自 Make-An-Audio 2）
│   ├── synchformer/     # 视频同步编码器
│   └── autoencoder/     # VAE 音频自编码器
├── runner.py            # DDP 训练管线（EMA, AMP, TensorBoard）
└── sample.py            # 推理管线
```

## 模型变体
| 变体 | 采样率 | 显存需求 | 用途 |
|------|--------|----------|------|
| large_44k_v2 | 44.1kHz | ~6GB (16-bit) | 高质量生成（默认） |
| 16k | 16kHz | 更低 | 轻量级场景 |

## 使用方式
```bash
# CLI：视频+文本 → 音频（输出 .flac + .mp4）
python demo.py --duration=8 --video=<path> --prompt "your prompt"

# Gradio Web UI（支持视频→音频、文本→音频、图像→音频实验）
python gradio_demo.py
```

## 训练数据集
AudioSet, Freesound, VGGSound, AudioCaps, WavCaps（各数据集有独立许可证）

## 已知局限
1. 偶尔生成不可理解的人类语音样声音
2. 偶尔生成背景音乐（未经专门训练）
3. 对陌生概念表现不佳（如能生成 "gunfires" 但无法生成 "RPG firing"）

## 许可证
- **代码**: MIT
- **模型权重**: CC-BY-NC 4.0

## 与同类工具对比
- 相比 [[ai-game-devtools/foley-crafter]]（视频→Foley 音效，ControlNet 适配器），MMAudio 采用联合训练范式，同时支持文本条件和视频条件
- 相比 [[ai-game-devtools/audiox]]（统一多模态音频生成，DiT + MAF），MMAudio 侧重视频-音频同步对齐，采用 Flow Matching 而非扩散模型
- 相比 [[ai-game-devtools/hunyuanvideo-foley]]（腾讯混元视频音效生成），MMAudio 为学术开源项目，支持更灵活的文本+视频联合条件输入

## 相关链接
- [GitHub](https://github.com/hkchengrex/MMAudio)
- [论文 (arXiv)](https://arxiv.org/abs/2412.15322)
- [项目主页](https://hkchengrex.github.io/MMAudio)
- [HuggingFace 模型](https://huggingface.co/hkchengrex/MMAudio)
- [HuggingFace Demo](https://huggingface.co/spaces/hkchengrex/MMAudio)
- [Colab Demo](https://colab.research.google.com/drive/1TAaXCY2-kPk4xE4PwKB3EqFbSnkUuzZ8)
- [Replicate Demo](https://replicate.com/zsxkib/mmaudio)

## 致谢依赖
[[ai-game-devtools/make-an-audio-3]] (BigVGAN 预训练模型 + VAE 架构), NVIDIA BigVGAN, Synchformer, EDM2 (VAE 架构)
