---
title: CogVideoX
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/cogvideox.md]
---

# CogVideoX

**CogVideoX** — THUDM/ZhipuAI 开源视频生成模型家族，源自商业产品「清影」(QingYing)，覆盖文本到视频(T2V)、图像到视频(I2V)、视频续写三大任务。

## 模型变体

| 模型 | 发布日期 | 分辨率 | 帧数 | 推荐精度 | diffusers 最低显存 |
|------|---------|--------|------|---------|-------------------|
| CogVideoX1.5-5B | 2024-11 | 1360×768 | 81 (16N+1) | BF16 | ~10GB |
| CogVideoX1.5-5B-I2V | 2024-11 | 768≤Max≤1360 | 81 (16N+1) | BF16 | ~10GB |
| CogVideoX-2B | 2024-08 | 720×480 | 49 (8N+1) | FP16 | ~4GB |
| CogVideoX-5B | 2024-08 | 720×480 | 49 (8N+1) | BF16 | ~5GB |
| CogVideoX-5B-I2V | 2024-09 | 720×480 | 49 (8N+1) | BF16 | ~5GB |

## 技术特点

- **架构：** Transformer-based 扩散模型，3D Causal VAE（近乎无损视频重建）
- **位置编码：** 3d_rope_pos_embed（1.5 系列），3d_sincos_pos_embed（2B）
- **帧率：** 16 fps（1.5 系列），8 fps（原始系列）
- **视频时长：** 5-10 秒（1.5），6 秒（原始）
- **Prompt 限制：** 224-226 tokens，仅支持英文输入
- **量化支持：** TorchAO INT8（2B 最低 3.6GB），FP8（H100+）
- **Prompt 优化：** 内置 LLM 转写模块（GLM-4/GPT-4），将短提示扩展为训练分布匹配的长提示

## 项目结构

```
inference/     — CLI 推理脚本（含量化版本）
finetune/      — 微调指南（diffusers LoRA）
sat/           — SwissArmyTransformer 权重与代码
tools/         — 模型转换、视频标注(CogVLM2-Caption)、LoRA 导出、并行推理(xDiT)
```

## 生态集成

- **ComfyUI:** ComfyUI-CogVideoXWrapper（kijai 维护）
- **DiffSynth-Studio:** ModelScope 扩散引擎适配
- **VideoSys:** NUS 高性能视频生成基础设施
- **xDiT:** 多 GPU 并行 DiT 推理
- **LeMiCa:** 中国联通 2.5x 无损加速推理
- **RIFLEx:** 一行代码扩展视频长度（无需训练）
- **cogvideox-factory:** 社区微调框架，单 4090 可微调 5B
- **CogVideoX-Controlnet:** ControlNet 模块
- **ConsisID:** 身份保持文本到视频生成（频率分解）

## 推理性能（50 步）

| 硬件 | CogVideoX-2B | CogVideoX-5B | 1.5-5B (5秒) |
|------|-------------|-------------|-------------|
| A100 | ~90s | ~180s | ~1000s |
| H100 | ~45s | ~90s | ~550s |

## Colab 支持

提供免费 T4 Colab 可直接运行的 4 个项目：T2V / T2V-INT8 / I2V / V2V。

## 许可证

- **代码：** Apache 2.0
- **CogVideoX-2B 模型：** Apache 2.0
- **CogVideoX-5B 模型：** CogVideoX LICENSE（受限商用）

## 相关链接

- GitHub: https://github.com/THUDM/CogVideo
- HuggingFace: https://huggingface.co/THUDM/CogVideoX-5b
- 论文: https://arxiv.org/abs/2408.06072
- 清影体验: https://chatglm.cn/video
- Discord: https://discord.gg/dCGfUsagrD

## 与同类工具的比较

- 与 [[ai-game-devtools/animatediff]] 不同：AnimateDiff 是在已有 Stable Diffusion 上添加时序模块实现视频生成，CogVideoX 是从零训练的专用视频扩散模型，原生支持时空建模
- 与 [[ai-game-devtools/cogvlm2]] 同属 THUDM/ZhipuAI 生态：CogVLM2 用于视频理解（caption 工具），CogVideoX 用于视频生成，两者在管线中互补
- 与 [[ai-game-devtools/open-sora]] 相比：CogVideoX 提供完整的微调/量化/多 GPU 推理工具链，成熟度更高，且在 HuggingFace 生态中有深度集成
