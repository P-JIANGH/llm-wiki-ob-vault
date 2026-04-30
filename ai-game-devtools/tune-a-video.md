---
title: Tune-A-Video
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, tool, open-source]
sources: [raw/articles/ai-game-devtools/tune-a-video.md]
---

# Tune-A-Video

Show Lab (NUS) 提出的单次微调视频生成方法（ICCV 2023）。将预训练的文本到图像扩散模型（如 [[stable-diffusion]]）通过单个视频-文本对微调为文本到视频生成模型。

## 核心能力

- **单次微调（One-Shot Tuning）：** 仅需一个输入视频+文本提示即可微调
- **时空注意力扩展：** 在 Stable Diffusion 的 2D UNet 基础上加入**时间注意力层**，形成 UNet3DConditionModel
- **时间先验初始化：** 新时间参数从零初始化，保留预训练图像空间注意力权重
- **DDIM 反演一致性：** 使用 DDIM inversion 提取输入视频的初始潜噪声，大幅提升时间一致性
- **DreamBooth 集成：** 支持在个性化 DreamBooth 模型上微调视频，实现特定主体的文本到视频生成

## 技术架构

**模型结构：** Stable Diffusion UNet → UNet3DConditionModel（空间注意力 + 时间注意力）

| 模块 | 说明 |
|------|------|
| UNet3DConditionModel | 3D UNet，每个 CrossAttn 块加入 TemporalAttention |
| DDIM Inversion | 从输入视频反演得到初始潜变量 |
| TuneAVideoPipeline | 基于 diffusers 的推理流水线 |
| OmegaConf 配置 | YAML 配置驱动训练参数 |

### 训练配置
- 24 帧 × 512×512 分辨率
- 300-500 步微调，约 10-15 分钟（单 A100 GPU）
- 推荐启用 xformers 加速注意力计算

## 应用场景

1. **视频风格迁移：** "man skiing" → "Spider Man skiing on the beach, cartoon style"
2. **主体替换：** 保持动作，改变视频中的角色/物体
3. **场景迁移：** 保持主体和动作，改变背景环境
4. **个性化视频生成：** 结合 DreamBooth 模型生成特定角色（如 Mr. Potato Head）的视频

## 系统要求

| 项目 | 规格 |
|------|------|
| PyTorch | 1.12.1 |
| diffusers | 0.11.1 |
| VRAM | ~16GB（训练 24 帧） |
| GPU | A100 推荐（10-15 分钟） |

## 许可证

学术研究项目，仓库未明确标注许可证（ICCV 2023 论文）

## 相关链接

- 项目主页：https://tuneavideo.github.io/
- 论文：https://arxiv.org/abs/2212.11565
- GitHub：https://github.com/showlab/Tune-A-Video
- HuggingFace 模型：https://huggingface.co/Tune-A-Video-library
- Colab 演示：https://colab.research.google.com/github/showlab/Tune-A-Video/blob/main/notebooks/Tune-A-Video.ipynb

## 与同类工具差异

与 [[streamingt2v]]（自回归长视频生成，无需微调基座模型）不同，Tune-A-Video 采用**单视频微调范式**——每次生成需针对新视频微调模型（约 15 分钟），但能获得更高的主体和运动保真度。相比 [[dreamgaussian4d]]（3D 高斯 4D 场景生成），Tune-A-Video 专注于 2D 视频而非 3D 动态场景。其时间注意力扩展方法启发了后续 AnimateDiff 等免训练视频生成方法。
