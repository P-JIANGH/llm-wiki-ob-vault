---
title: Tango
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/tango.md]
---

# Tango

## 概述
Tango 是 declare-lab 开发的**潜扩散模型（LDM）文本到音频生成系统**，能从文本提示生成人声、动物声、自然音效和人工音效。采用冻结的 Flan-T5 指令微调 LLM 作为文本编码器 + UNet 扩散模型架构。Tango 2 在此基础上引入 DPO 直接偏好对齐训练，在 Audio-Alpaca 偏好数据集上进一步优化输出质量。

## 核心架构
| 组件 | 技术选型 |
|---|---|
| 文本编码器 | Flan-T5（冻结参数，不更新） |
| 扩散模型 | UNet2DConditionModel + DDPMScheduler（Diffusers） |
| VAE | AudioLDM AutoencoderKL（mel 频谱 ↔ 波形） |
| 音频处理 | TacotronSTFT（16kHz 采样率） |
| 训练框架 | Hugging Face accelerate 多 GPU |
| Tango 2 对齐 | SFT 1 epoch + DPO（β=2000，lr=9.6e-7） |

## 模型家族
- **Tango** — 基础 TTA 模型（866M 参数），AudioCaps 训练
- **Tango-Full-FT-Audiocaps** — AudioCaps 全量微调
- **Tango-Full-FT-Audio-Music-Caps** — 音乐生成变体
- **Mustango** — 文本到音乐专用模型
- **Tango-2** — DPO 偏好对齐版本，Audio-Alpaca 15K 配对数据训练
- **Tango-2-full** — DPO 全量版本

## 性能表现
| 模型 | FAD ↓ | KL ↓ | IS ↑ | CLAP ↑ | OVL ↑ | REL ↑ |
|---|---|---|---|---|---|---|
| AudioLDM 2-Full-Large (712M) | 2.11 | 1.54 | 8.29 | 0.44 | 3.56 | 3.19 |
| Tango-full-FT (866M) | 2.51 | 1.15 | 7.87 | 0.54 | 3.81 | 3.77 |
| **Tango 2 (866M)** | **2.69** | **1.12** | **9.09** | **0.57** | **3.99** | **4.07** |

**关键发现**：尽管训练数据量仅为 AudioLDM 的 1/63，Tango 凭借 Flan-T5 指令编码在主观质量（OVL/REL）上达到 SOTA。

## 使用方法
```python
from tango import Tango
import soundfile as sf

tango = Tango("declare-lab/tango2")
audio = tango.generate("An audience cheering and clapping", steps=200)
sf.write("output.wav", audio, samplerate=16000)
```

## 技术特点
- 866M 参数，单 GPU 可推理
- 默认 100 步采样，推荐 200 步提升质量
- 支持批量生成（`generate_for_batch`）
- Google Colab 可运行
- 提供 HuggingFace 模型权重 + 在线 Demo + Replicate 部署

## 许可证
CC BY-NC-ND 4.0（知识共享 署名-非商业性-禁止演绎）

## 相关链接
- [GitHub](https://github.com/declare-lab/tango)
- [HuggingFace 模型](https://huggingface.co/declare-lab/tango2)
- [在线 Demo](https://huggingface.co/spaces/declare-lab/tango2)
- [Tango 2 论文](https://arxiv.org/abs/2404.09956)
- [Audio-Alpaca 数据集](https://huggingface.co/datasets/declare-lab/audio-alpaca)

## 游戏开发应用场景
- 游戏音效自动生成（脚步声、爆炸声、环境音效）
- NPC 对话环境音
- 动态配乐音效
- 与 [[musicgen]] 互补（Tango 专注音效，MusicGen 专注音乐）
- 与 [[audioldm-2]] 对比：Tango 使用 LLM 文本编码器，AudioLDM 不使用
