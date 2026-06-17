# Lumina-T2X

> Source: https://github.com/Alpha-VLLM/Lumina-T2X

## Overview

Lumina-T2X 是 OpenGVLab（上海人工智能研究院）开发的一系列基于 Flow-based 大规模 Diffusion Transformer（DiT）的文本条件生成模型家族，能够将文本描述转换为图像、视频、3D 点云、语音和音乐等多种模态。

核心架构：**Flag-DiT**（Flow-based Large Diffusion Transformer），支持最高 **70 亿参数**和 **128,000 token** 序列长度。

## Project Structure

```
Lumina-T2X/
├── lumina_t2i/           # Lumina-T2I 5B（Flag-DiT + LLaMA2-7B text encoder）
├── lumina_next_t2i/      # Lumina-Next-T2I 2B（Next-DiT + Gemma-2B，更快更轻量）
├── lumina_next_t2i_mini/ # 简化版 Lumina-Next，支持 SD3、DreamBooth
├── lumina_audio/         # Text-to-Audio 音频生成
├── lumina_music/         # Text-to-Music 音乐生成
├── lumina_next_compositional_generation/  # 组合式生成（多 caption 不同区域）
├── Flag-DiT-ImageNet/    # ImageNet 训练的 Flag-DiT
├── Next-DiT-ImageNet/    # ImageNet 训练的 Next-DiT
├── Next-DiT-MoE/         # Next-DiT MoE 版本
├── visual_anagrams/      # 视觉矛盾图生成
├── pyproject.toml
└── requirements.txt
```

## Key Components

### Flag-DiT（Flow-based Large Diffusion Transformer）
- **核心架构**：采用 Flow Matching 公式，结合 RoPE（旋转位置编码）、RMSNorm 和 KQ-norm
- **参数规模**：最高 7B 参数，支持 128K token 序列
- **特点**：训练收敛更快、训练动态更稳定、pipeline 简化

### Next-DiT
- 后续版本，参数规模更小（2B），推理速度更快
- 文本编码器：Gemma-2B
- VAE：SDXL fine-tuned by StabilityAI

### Lumina-T2I
- 模型规模：5B Flag-DiT + 7B LLaMA2 text encoder
- 支持最高 1024×1024 分辨率图像生成
- 支持 Panorama（宽景）生成，最高 1024×4096

### Lumina-Next-T2I
- 模型规模：2B Next-DiT + 2B Gemma text encoder
- 支持 2K 分辨率图像生成
- 支持 Time-aware Scaled RoPE
- 支持多语言提示（含中文、Emoji）
- 推理速度比 Lumina-T2I 更快

### Lumina-T2Audio / Lumina-T2Music
- Text-to-Audio：音效生成
- Text-to-Music：音乐生成（支持多种音乐风格）

## Technical Highlights

1. **Any Modality / Resolution / Duration**：统一框架处理图像/视频/3D点云/语音
2. **[nextline] / [nextframe] token**：支持训练时未见过的分辨率外推（如 768×768 → 1792×1792）
3. **低训练资源**：Lumina-T2I 仅需 Pixelart-α 35% 的计算资源
4. **多语言支持**：Lumina-Next-2B 支持中文等多语言 prompt

## License

MIT License

## References

- Papers: [Lumina-T2X arXiv](https://arxiv.org/abs/2405.05945), [Lumina-Next arXiv](https://arxiv.org/abs/2406.18583), [Lumina-mGPT arXiv](https://arxiv.org/abs/2408.02657)
- HuggingFace: https://huggingface.co/Alpha-VLLM/Lumina-T2I, https://huggingface.co/Alpha-VLLM/Lumina-Next-T2I
- Wisemodel: https://wisemodel.cn/models/Alpha-VLLM/Lumina-Next-SFT
