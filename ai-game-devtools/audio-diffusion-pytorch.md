---
title: Audio Diffusion PyTorch
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, diffusion, tool, open-source, ai]
sources: [raw/articles/ai-game-devtools/audio-diffusion-pytorch.md]
---

# Audio Diffusion PyTorch

**Audio Diffusion PyTorch** 是一个功能完整的音频扩散生成库，由 Flavio Schneider（ArchineTAI）开发，提供无条件/文本条件音频生成、扩散自编码、上采样、声码器和修复等能力。

## 概述

该库基于 PyTorch 构建，使用 **v-parameterization 扩散方法**（Salimans & Ho, 2022）和 **DDIM 采样器**，核心网络为专为 1D 音频波形设计的 **UNetV0**（由 [a-unet](https://github.com/archinetai/a-unet) 提供）。与 [[stable-diffusion]] 等图像扩散模型类似，但针对音频波形进行了专门设计。该库与 [[academicodec]] 同属音频 AI 工具链中的不同环节：前者侧重生成，后者侧重编解码。

## 核心功能

| 功能 | 类 | 说明 |
|------|-----|------|
| 无条件生成 | `DiffusionModel` | 从随机噪声生成音频波形 |
| 文本条件生成 | `DiffusionModel` + T5-base | 根据文本描述生成音频（Classifier-Free Guidance） |
| 扩散自编码 | `DiffusionAE` | 音频→潜在编码→音频重建 |
| 扩散上采样 | `DiffusionUpsampler` | 低采样率→高采样率（如 3kHz→48kHz） |
| 扩散声码器 | `DiffusionVocoder` | Mel 频谱图→波形转换 |
| 音频修复 | `VInpainter` | 部分音频缺失/损坏的修复 |
| 自回归生成 | `DiffusionAR` | 自回归扩散模型 |

## 架构特点

- **UNetV0**: 1D U-Net，可配置通道层级、注意力层、下/上采样因子
- **文本条件**: 使用 T5-base 嵌入（768 维），支持 cross-attention
- **扩散方法**: V-Diffusion（v-parameterization），比 DDPM 更高效
- **采样器**: VSampler（DDIM 风格），10-100 步即可生成高质量音频
- **可扩展**: U-Net、扩散方法和采样器均泛化到任意维度

## 安装与使用

```bash
pip install audio-diffusion-pytorch
```

```python
from audio_diffusion_pytorch import DiffusionModel, UNetV0, VDiffusion, VSampler

model = DiffusionModel(
    net_t=UNetV0,
    in_channels=2,
    channels=[8, 32, 64, 128, 256, 512, 512, 1024, 1024],
    factors=[1, 4, 4, 4, 2, 2, 2, 2, 2],
    items=[1, 2, 2, 2, 2, 2, 2, 4, 4],
    attentions=[0, 0, 0, 0, 0, 1, 1, 1, 1],
    diffusion_t=VDiffusion,
    sampler_t=VSampler,
)

# 训练
loss = model(torch.randn(1, 2, 2**18))
loss.backward()

# 生成
sample = model.sample(torch.randn(1, 2, 2**18), num_steps=10)
```

## 与同类工具的差异

| 特性 | audio-diffusion-pytorch | [[academicodec]] | Moshi |
|------|------------------------|-------------------|-------------|
| 核心方法 | 扩散模型 | 神经 Codec（GRVQ） | 多种（Transformer, VAE） |
| 预训练模型 | ❌ 不提供 | ✅ 提供 | ✅ 提供 |
| 文本条件 | ✅ T5-base | ❌ | ✅ |
| 声码器 | ✅ DiffusionVocoder | ✅ HiFi-Codec | ✅ |
| 上采样 | ✅ | ❌ | ❌ |
| 修复 | ✅ VInpainter | ❌ | ❌ |

## 致谢

- **StabilityAI** 提供计算资源，[HarmonAI](https://www.harmonai.org/) 团队参与研究讨论
- **ETH Zurich** 提供学术资源（Zhijing Jin, Bernhard Schoelkopf, Mrinmaya Sachan 指导）
- **lucidrains** 的 diffusion-pytorch 和 imagen-pytorch 开源基础
- **Katherine Crowson** 的 k-diffusion 采样器

## 许可证

MIT License

## 相关链接

- GitHub: https://github.com/archinetai/audio-diffusion-pytorch
- PyPI: https://pypi.org/project/audio-diffusion-pytorch/
- a-unet: https://github.com/archinetai/a-unet
- Moûsai 论文: https://arxiv.org/abs/2301.11757
