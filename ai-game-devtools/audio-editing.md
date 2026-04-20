---
title: AudioEditing — DDPM Inversion 零样本音频编辑
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [tool, audio, diffusion, open-source]
sources: [raw/articles/ai-game-devtools/audio-editing.md]
---

# AudioEditing — DDPM Inversion 零样本音频编辑

ICML 2024 论文代码实现：基于 DDPM 反演的零样本无监督和文本驱动音频编辑。

## 概述

AudioEditing 由 Hila Manor 和 Tomer Michaeli（Technion）开发，提出了一种无需训练即可编辑音频的方法：通过对预训练扩散模型（AudioLDM、TANGO、AudioLDM2、Stable Audio Open）进行 DDPM 反演，在扩散轨迹中提取信息，再用目标文本提示或无监督方式重新生成编辑后的音频。

## 核心功能

### 三种编辑模式

| 模式 | 输入 | 机制 | 适用场景 |
|------|------|------|----------|
| **文本编辑** | 音频 + 目标文本提示 | DDPM 前向编码 + 目标提示反向生成 | 风格迁移（摇滚→爵士）、乐器替换 |
| **无监督编辑** | 仅音频 | 提取扩散轨迹主成分(PC)并漂移应用 | 无需文本描述的抽象编辑 |
| **SDEdit** | 音频 + 目标提示 | 加噪到 tstart 后去噪 | 简单基线对比 |

### 技术架构

- **PipelineWrapper 基类**（1374 行 models.py）：统一封装所有支持的扩散模型，提供 VAE 编解码、文本编码、UNet 前向传播接口
- **DDPM 前向反演**（`inversion_forward_process`）：将源音频编码为扩散轨迹，提取噪声残差 zₜ 和中间特征 h-space
- **反向生成**（`inversion_reverse_process`）：从噪声状态用目标提示重新去噪，复用前向 zₜ 保证重建保真度
- **多提示 CFG**：支持多个文本提示通过高斯模糊分割点控制音频不同频段

### 支持的模型后端

- **AudioLDM**（small/large）— 基于 Latent Diffusion 的音频生成模型
- **AudioLDM2**（base/large/music）— 第二代，性能更强
- **TANGO**（full-ft-audio-music-caps / full-ft-audiocaps）
- **Stable Audio Open 1.0** — 2024-10 新增支持
- **Stable Diffusion / CelebAHQ LDM** — 用于无监督图像编辑（证明方法通用性）

### 关键参数

- `--tstart`（默认 100）：反向过程起始时间步，控制编辑强度（值越高编辑越少）
- `--cfg_src` / `--cfg_tar`：前后向 classifier-free guidance 强度
- `--num_diffusion_steps`（默认 200）：扩散步数
- `--mode`：`ours`（DDPM 反演）或 `ddim`（DDIM 反演基线）

## MedleyMDPrompts 数据集

项目附带手动标注的 MedleyDB MusicDelta 子集提示词数据集：
- 34 段音乐片段（20 秒~5 分钟），多种风格
- 107 个源提示 + 696 个目标提示
- CC-BY-4.0 许可

## 技术特点

- **零样本**：无需对编辑任务微调模型
- **多模型兼容**：通过统一的 PipelineWrapper 抽象层支持 4+ 扩散模型
- **空间分割编辑**：多提示 CFG 支持按频段应用不同编辑指令
- **无监督扩展**：主成分漂移方法实现无文本提示编辑
- **评估工具**：内置 LPAPS、CLAP、FAD 三种音频质量评估

## 许可证

- 反演/PC 核心代码：**MIT**
- AudioLDM2 权重：**CC BY-SA 4.0**
- Stable Audio Open 权重：**Stability AI Community License**
- MedleyMDPrompts 数据集：**CC-BY-4.0**

## 相关链接

- [GitHub](https://github.com/HilaManor/AudioEditingCode)
- [项目页面](https://HilaManor.github.io/AudioEditing)
- [arXiv 2402.10009](https://arxiv.org/abs/2402.10009)
- [HuggingFace Demo](https://huggingface.co/spaces/hilamanor/audioEditing)

## 与同类工具的差异

相较于 [[ai-game-devtools/audio-diffusion-pytorch]]（无条件/文本条件音频生成库），AudioEditing 专注于**编辑已有音频**而非从头生成。其 DDPM 反演方法比 SDEdit 能更好地保留源音频结构。与 [[ai-game-devtools/amphion]]（全功能音频/音乐/语音生成工具包）相比，AudioEditing 是单一用途的编辑工具，但方法新颖性更高（ICML 2024 发表）。
