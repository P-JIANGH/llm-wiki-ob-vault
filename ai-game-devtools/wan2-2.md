---
title: Wan2.2
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai, video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/wan2-2.md]
---

# Wan2.2

**阿里巴巴通义万相 (Wan-AI)** 开源视频生成模型家族，Wan2.1 的重大升级。2025 年 7 月发布。

## Overview

Wan2.2 是开源视频生成领域的最新旗舰模型，在 Wan2.1 基础上引入 **Mixture-of-Experts (MoE)** 架构、 cinematic 美学数据训练、以及高压缩 VAE，实现 720P@24fps 消费级 GPU 可运行。

## Model Variants

| 模型 | 类型 | 参数 | 分辨率 | 特点 |
|------|------|------|--------|------|
| T2V-A14B | 文本→视频 MoE | 27B总/14B激活 | 480P & 720P | 双专家架构 |
| I2V-A14B | 图像→视频 MoE | 27B总/14B激活 | 480P & 720P | 双专家架构 |
| TI2V-5B | 文本+图像→视频 | 5B 密集 | 720P@24fps | 消费级GPU可运行 |
| S2V-14B | 语音→视频 | 14B | 480P & 720P | 音频驱动电影视频 |
| Animate-14B | 角色动画/替换 | 14B | 480P & 720P | 动画+替换双模式 |

## Architecture

### MoE 架构
- **高噪声专家**：去噪早期，负责整体布局生成
- **低噪声专家**：去噪后期，负责视频细节精炼
- **SNR 路由**：基于信噪比动态切换专家，总参数 27B，每步激活仅 14B

### VAE 压缩
- Wan2.2-VAE 实现 4×16×16 压缩比（总压缩 4×32×32 含 patchification）
- TI2V-5B 可在 RTX 4090（24GB VRAM）上生成 5 秒 720P 视频

### 推理加速
- 单 GPU：`--offload_model True --convert_model_dtype --t5_cpu`
- 多 GPU：FSDP + DeepSpeed Ulysses (`--ulysses_size 8`)

## Key Features

- **Prompt Extension**：支持 Dashscope API（qwen-plus/qwen-vl-max）或本地 Qwen 模型自动扩展提示词
- **ComfyUI 集成**：官方支持，文档见 docs.comfy.org
- **Diffusers 集成**：全部 5 个模型变体通过 HuggingFace Diffusers 可用
- **Speech-to-Video**：音频+参考图+可选姿态视频→电影级视频，支持 CosyVoice TTS 集成
- **Character Animation**：
  - **Animation 模式**：角色图像模仿输入视频动作
  - **Replacement 模式**：替换视频中的角色，支持 relighting LoRA

## Tech Stack

- Python 3.10+，PyTorch >= 2.4.0
- FlashAttention2/3，Diffusers >= 0.31.0
- FSDP + DeepSpeed Ulysses 分布式推理
- Qwen 系列模型用于提示词扩展

## Comparison with Related Tools

- 相比 [[wan2-1]]：Wan2.2 引入 MoE 架构，训练数据量 +65.6% 图像/+83.2% 视频，新增 S2V 和 Animate 变体
- 相比 [[hunyuan-video]]（腾讯混元 13B+）：Wan2.2 MoE 在相同计算量下提供更大容量，TI2V-5B 在消费级 GPU 上表现更优
- 相比 [[cogvideox]]（智谱 2B/5B/12B）：Wan2.2 A14B 参数量更大但通过 MoE 保持推理效率，支持更多任务类型（T2V/I2V/S2V/Animate）
- 相比 [[open-sora]]：Wan2.2 提供完整预训练权重，Open-Sora 为 Sora 架构复现项目

## Links

- GitHub: https://github.com/Wan-Video/Wan2.2
- HuggingFace: https://huggingface.co/Wan-AI/
- ModelScope: https://modelscope.cn/organization/Wan-AI
- Paper: https://arxiv.org/abs/2503.20314
- Blog: https://wan.video/
- Animate: https://humanaigc.github.io/wan-animate
- S2V: https://humanaigc.github.io/wan-s2v-webpage

## License

Apache 2.0
