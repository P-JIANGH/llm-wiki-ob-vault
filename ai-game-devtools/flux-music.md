---
title: FluxMusic
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [music, diffusion, flow-matching, transformer, text-to-music, open-source, ai-model]
sources: [raw/articles/ai-game-devtools/flux-music.md]
---

# FluxMusic

## Overview

FluxMusic 是基于 **Rectified Flow Transformer** 的文本到音乐（Text-to-Music）生成模型，由 arXiv 2409.00587 论文提出。核心创新：将 Black Forest Labs 的 [[ai-game-devtools/flux|Flux]] 图像生成架构（Rectified Flow + 双流 Transformer + RoPE）成功迁移到音乐生成领域，结合 [[ai-game-devtools/musicgen|MusicGen]] 类似的多条件文本编码管线，实现 10.24 秒 16kHz 音频的高质量生成。

## Key Facts

| | |
|---|---|
| **论文** | arXiv:2409.00587 |
| **GitHub** | https://github.com/feizc/FluxMusic |
| **模型权重** | HuggingFace: feizhengcong/fluxmusic |
| **基础架构** | Rectified Flow Transformer (双流 + 单流 Transformer Block) |
| **预训练文本编码器** | T5-XXL (4096-dim) + CLAP-L (768-dim) |
| **音频编解码** | AudioLDM2 VAE + SpeechT5HifiGan Vocoder |
| **生成时长** | 10.24 秒（latent 256×16 → mel → waveform） |
| **音频采样率** | 16000 Hz |
| **许可证** | 研究项目（依赖 Flux + AudioLDM2） |

## Architecture

### Core: Flux Transformer
FluxMusic 采用与 Flux 相同的双流 Transformer 架构处理音乐潜空间：

- **DoubleStreamBlock**：图像流（潜空间 Patch）和文本流独立调制，在注意力层通过 QKV 交互融合
- **SingleStreamBlock**：合并后序列使用单流 Transformer Block（含并行 QKV + MLP）
- **RoPE**（Rotary Position Embedding）：可配置 axes_dim（如 small 为 [8,12,12]，base 为 [16,16,16]），theta=10000
- **RMSNorm + QKNorm**：每个注意力头的 query/key 独立归一化，提升数值稳定性
- **CFG（Classifier-Free Guidance）**：通过 `guidance_embed=True` 实现条件生成

### Conditioning Pipeline
1. **T5-XXL**：冻结文本编码 → 4096 维向量
2. **CLAP-L**：冻结音频-文本联合编码 → 768 维语义向量（与文本描述对齐）
3. **潜空间**：初始噪声 `shape=(B, 8, 256, 16)` — 8 个通道，256 时间步，16 频率 bins
4. **采样**：Rectified Flow ODE，50 步，CFG=7.0
5. **VAE 解码**：AutoencoderKL latent → mel spectrogram（64 bins，STFT 1024/160/1024）
6. **Vocoder**：SpeechT5HifiGan mel → waveform（16kHz）

### Model Sizes

| 版本 | Hidden Size | Depth | Single Blocks | 训练步数 |
|------|------------|-------|---------------|----------|
| Small | 512 | 8 | 16 | 200K |
| Base | 768 | 12 | 24 | 200K |
| Large | 1024 | 12 | 24 | 200K |
| Giant | 2048 | 19 | 38 | 200K |
| Giant-Full | 1408 | 12 | 24 | **2M** |

## 与同类工具的差异

| 工具 | 架构 | 条件输入 | 特点 |
|------|------|----------|------|
| **FluxMusic** | Rectified Flow + 双流 Transformer | 文本 (T5+CLAP) | Flow Matching + RoPE + CFG |
| [[ai-game-devtools/musicgen\|MusicGen]] | AR Transformer + RVQ | 文本 + 音频 + 旋律 | 自回归，有 codebook 瓶颈 |
| [[ai-game-devtools/any-accomp\|AnyAccomp]] | Flow Matching + VQ-VAE | 人声/独奏音频 | 伴奏生成，旋律驱动 |
| [[ai-game-devtools/diff-bgm\|Diff-BGM]] | 潜扩散 LDM | 视频特征 + 和弦 + 文本 | 钢琴卷帘空间，视频 BGM |
| AudioLDM2 | DDPM + UNet | 文本 (CLAP) | 基础架构，Rectified Flow 升级 |

核心差异：FluxMusic 是首个将 Rectified Flow 双流 Transformer 应用于音乐生成的模型，继承了 Flux 在图像领域的高效采样（50 步 vs 传统 DDPM 的数百步）。

## 推理用法

```bash
python sample.py \
  --version small \
  --ckpt_path /path/to/musicflow_s.pt \
  --prompt_file config/example.txt \
  --audioldm2_model_path /path/to/audioldm2 \
  --seed 2024
```

需要预先下载：AudioLDM2 VAE/Vocoder、T5-XXL、CLAP-L（见 README 下载表）。

## 游戏开发价值

- **程序化背景音乐**：根据游戏场景文本描述（"史诗战斗"、"平静森林"）生成配乐
- **自适应音乐**：实时生成符合游戏节奏/情绪的背景音乐
- **管线可嵌入**：Python 推理管线可通过 HTTP 服务或 Unity 插件集成
- **对比 [[ai-game-devtools/syncfusion\|SyncFusion]]**：SyncFusion 从视频生成音效，FluxMusic 从文本生成音乐，两者互补

## Related

- [[ai-game-devtools/musicgen|MusicGen]] — Meta AR 音乐生成（对比项）
- [[ai-game-devtools/audioldm-2|AudioLDM2]] — 基础音频扩散架构（依赖项）
- [[ai-game-devtools/diff-bgm|Diff-BGM]] — 视频背景音乐生成（对比项）
- [[ai-game-devtools/flux|Flux]] — 图像生成原架构（上游）
- [[ai-game-devtools/any-accomp|AnyAccomp]] — 伴奏生成（对比项）
