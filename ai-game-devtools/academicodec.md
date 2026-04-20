---
title: AcademiCodec
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, tool, open-source, ai]
sources: [raw/articles/ai-game-devtools/academicodec.md]
---

# AcademiCodec

**AcademiCodec** 是首个开源音频 Codec 工具包，由高校研究团队发起，提供 Encodec、SoundStream 和 HiFi-Codec 三种音频编解码模型的**训练代码和预训练权重**。

## 核心创新：HiFi-Codec

提出 **分组残差向量量化（GRVQ）** 技术，仅用 **4 个 codebook** 即可实现高保真音频重建（相比 Encodec 需要更多 codebook）。在 1000+ 小时公开 TTS 数据集（LibriTTS、VCTK、AISHELL）上训练，8 GPU 即可完成。

## 架构

三种模型共享部分基础模块（SEANet 编解码器、量化层），但在判别器设计和量化策略上有差异：

| 模型 | 判别器 | 量化方式 | 特点 |
|------|--------|----------|------|
| **EnCodec** | MS-STFT 判别器（频谱级） | RVQ 残差向量量化 | Meta 原版开源实现，24kHz/16kHz 多版本 |
| **SoundStream** | 波形判别器（HiFi-GAN）+ 频谱判别器 | RVQ | Google 方案，波形+频谱双重约束 |
| **HiFi-Codec** | 多尺度判别器 | **GRVQ** 分组残差量化 | 仅 4 codebook，适合下游生成任务 |

## 预训练模型变体

- **Encodec_16k_320**：16kHz，降采样 320，适用于 SpearTTS
- **Encodec_24k_240d**：24kHz，降采样 240，适用于 InstructTTS
- **Encodec_24k_32d**：24kHz，降采样 32，单 codebook 模式，适用于 AudioGen
- **HiFi-Codec-24k-320d**：24kHz，4 codebook，适用于 VALL-E、AudioLM、MusicLM
- **HiFi-Codec-16k-320d**：16kHz 版本

## 技术栈

- **框架**：PyTorch >= 1.13.0，Python >= 3.8
- **依赖**：torchaudio、tensorboard、einops、matplotlib、pyyaml、tqdm
- **训练**：分布式训练支持，8 GPU 训练 1000+ 小时数据
- **预训练权重**：HuggingFace (Dongchao/AcademiCodec)

## 游戏开发应用

1. **音频 Token 提取**：将音频压缩为离散 token，作为 [[ai-game-devtools/musicgen]] 等音频生成模型的训练目标
2. **TTS 中间特征**：为 VALL-E、InstructTTS 等 TTS 系统提供中间表示
3. **游戏 NPC 语音**：配合 TTS 模型生成高质量游戏角色语音
4. **音频压缩**：低码率高保真音频编码，适合游戏资源优化

## 与其他工具的关系

- HiFi-Codec 的 4-codebook 设计被研究者用于实现 [[ai-game-devtools/musicgen]] 的改进版 VALL-E，证明可以获得更好的音频质量
- Encodec 是 `ai-game-devtools/audiocraft`（Meta AudioCraft）的核心组件
- 与 [[ai-game-devtools/wav2lip]] 等音频驱动视觉模型配合，可构建完整的音视频生成管线

## 许可证

MIT

## 相关链接

- GitHub: https://github.com/yangdongchao/AcademiCodec
- HuggingFace: https://huggingface.co/Dongchao/AcademiCodec
- 论文: arXiv:2305.02765 (HiFi-Codec)
