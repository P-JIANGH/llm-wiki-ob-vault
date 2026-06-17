# HunyuanVideo-1.5 — Source Analysis

**Source:** https://github.com/Tencent-Hunyuan/HunyuanVideo-1.5
**Date:** 2026-04-20
**Type:** GitHub README + code analysis

## Project Overview

HunyuanVideo-1.5 是腾讯混元团队发布的轻量级视频生成模型，仅 8.3B 参数即可实现顶级视频生成质量。相比上一代 HunyuanVideo（13B+ 参数），参数大幅减少，可在消费级 GPU（最低 14GB VRAM）上运行。

## Key Features

- **8.3B 参数 DiT 架构：** 3D causal VAE（空间 16× + 时间 4× 压缩），SSTA（Selective and Sliding Tile Attention）机制剪枝冗余时空 KV block
- **多分辨率支持：** 480p T2V/I2V, 720p T2V/I2V，1080p 超分
- **蒸馏加速：** CFG 蒸馏（2× 加速）、Step 蒸馏（480p I2V 仅需 8/12 步，RTX 4090 上 75 秒完成）
- **缓存推理：** 支持 DeepCache/TeaCache/TaylorCache，无需训练即可加速
- **稀疏注意力：** Flex-Block-Attention + SageAttention，10 秒 720p 视频合成加速 1.87×（对比 FlashAttention-3）
- **视频超分网络：** 480→720→1080p 少步超分，提升清晰度并修正畸变
- **Prompt 重写：** 默认开启，使用 vLLM 部署的 Qwen3-235B 系列模型增强提示词

## Architecture

### Model Components
- **Transformer (DiT):** 8.3B 参数，支持 SSTA 选择性滑动窗口注意力
- **3D Causal VAE:** 16× 空间 + 4× 时间压缩
- **Text Encoders:** MLLM (Qwen2.5-VL-7B-Instruct) + byT5 (Glyph-SDXL-v2)
- **Vision Encoder (I2V):** Siglip (FLUX.1-Redux-dev)
- **SR Network:** 少步超分模型（480→720: 6 steps, 720→1080: 8 steps）

### Training
- **Optimizer:** Muon（动量 + Newton-Schulz 正交化）
- **Pipeline:** 多阶段渐进式预训练 → 后训练
- **Support:** FSDP、Context Parallel、Gradient Checkpointing、LoRA 微调

## Model Variants (All on HuggingFace)

| Model | Resolution | Mode |
|-------|-----------|------|
| 480p T2V | 480p | Text-to-Video |
| 480p I2V | 480p | Image-to-Video |
| 480p I2V Step Distilled | 480p | 8/12 步加速版 |
| 720p T2V | 720p | Text-to-Video |
| 720p I2V | 720p | Image-to-Video |
| 720p I2V Sparse CFG Distilled | 720p | 稀疏注意力 + 蒸馏 |
| 720p SR Step Distilled | 480→720 | 超分 |
| 1080p SR Step Distilled | 720→1080 | 超分 |

## System Requirements

- **GPU:** NVIDIA，最低 14GB VRAM（开启 offloading）
- **Python:** 3.10+
- **Dependencies:** PyTorch ≥2.6.0, Diffusers 0.35.0, Transformers 4.57.1

## Inference Methods

1. **Source code:** `torchrun --nproc_per_node=N generate.py`（支持多卡并行）
2. **Diffusers:** `HunyuanVideo15Pipeline.from_pretrained()`
3. **ComfyUI:** 官方 + 社区插件支持
4. **LightX2V:** 第三方轻量集成

## Community Ecosystem

- Diffusers 官方集成
- ComfyUI 支持（官方指南 + 社区插件）
- LightX2V 轻量框架
- Wan2GP v9.62（低至 6GB VRAM）
- OmniWeaving（基于 1.5 的多模态视频生成）
- ComfyUI-MagCache（1.7× 加速）

## License

Tencent Hunyuan Community License（非 Apache 2.0）

## File Structure

```
generate.py          # 推理入口（T2V/I2V/SR 统一）
train.py             # 训练脚本（Muon optimizer, FSDP, LoRA）
requirements.txt     # Python 依赖
checkpoints-download.md  # 权重下载指南
hyvideo/             # 核心模块
  pipelines/         # HunyuanVideo_1_5_Pipeline
  commons/           # 并行状态、推理状态
  utils/rewrite/     # T2V/I2V Prompt 重写
ComfyUI/             # ComfyUI 集成指南
```

## Comparison with HunyuanVideo (v1)

| 维度 | HunyuanVideo v1 | HunyuanVideo-1.5 |
|------|----------------|------------------|
| 参数 | 13B+ | 8.3B |
| 最低 VRAM | ~60GB (720p) | 14GB (offloading) |
| 架构 | 双流→单流 Full Attention | SSTA 选择性滑动窗口 |
| 蒸馏 | 无 | CFG + Step 蒸馏 |
| 超分 | 无 | 480→720→1080p 三级超分 |
| 许可证 | Apache 2.0 | Hunyuan Community License |
| 训练代码 | 未发布 | 已发布 (Muon optimizer) |
