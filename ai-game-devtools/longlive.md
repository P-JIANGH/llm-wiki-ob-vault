---
title: LongLive
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [ai-model, video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/longlive.md]
---

# LongLive: Real-time Interactive Long Video Generation

**NVIDIA Labs (NVlabs)** 开源的实时交互式长视频生成模型，支持接收用户连续输入的顺序提示并即时生成对应视频。ICLR 2026 接收论文。

> [[Paper](https://arxiv.org/abs/2509.22622)] | [[Code](https://github.com/NVlabs/LongLive)] | [[Model](https://huggingface.co/Efficient-Large-Model/LongLive-1.3B)] | [[Docs](https://nvlabs.github.io/LongLive/docs)] | [[Demo](https://nvlabs.github.io/LongLive)]

## 核心亮点

| 指标 | 数值 |
|------|------|
| 最长视频 | 240 秒（4 分钟），视觉一致性 |
| 推理速度 | 20.7 FPS（H100 单卡）/ 24.8 FPS（FP8 量化） |
| 微调成本 | 32 H100 GPU-days（从短片段扩展到分钟级） |
| 模型大小 | LongLive-1.3B |
| 许可证 | Apache 2.0 |

## 技术架构

### 基础模型

- **基座：** 基于 Wan2.1 扩散模型（开源视频扩散基座）
- **训练范式：** Self-Forcing（自迫法）score distillation training
- **核心机制：** KV-cache + cross-attention cache 的自回归分块生成

### 关键模块

- **CausalInferencePipeline** — 带 KV 缓存的自回归视频生成
- **SelfForcingTrainingPipeline** — 分块训练 + 梯度调度（仅对尾部帧启用梯度）
- **InteractiveCausalInferencePipeline** — 实时交互式推理
- **ScoreDistillationTrainer** — Score Distillation 训练器
- **DMD / DMD_Switch** — Distribution Matching Distillation 模型变体

### Attention 优化

- **局部注意力调度：** `local_attn_size` 可按去噪时间步动态调整
- **KV 缓存复用：** 每生成一个 block 后，用 context noise 重新运行以更新缓存
- **相对 RoPE（社区贡献）：** 支持无限长度视频生成

## 训练流程

```
初始化训练（train_init）→ 长序列训练（train_long）→ 推理（inference/interactive）
```

1. **Init:** 用 score distillation 将短片段模型扩展到长序列
2. **Long:** 在更长序列上微调，优化 KV 缓存策略
3. **Inference:** 支持批处理和实时交互两种模式

## 推理特性

- **LoRA 支持：** 可通过 LoRA 适配器自定义风格/条件
- **低内存模式：** DynamicSwapInstaller 适配 <40GB VRAM 环境
- **分布式推理：** NCCL 后端多 GPU 支持
- **FP8 量化：** torchao 加速推理
- **ONNX/TensorRT：** 支持部署优化

## 技术栈

- PyTorch + diffusers 0.31.0 + transformers >= 4.49.0
- OmegaConf 配置管理
- Weights & Biases (wandb) 实验日志
- PEFT LoRA 微调
- BF16 训练精度

## 与同类工具的差异

- vs [[ai-game-devtools/hunyuan-video]]：LongLive 侧重**实时交互**+长视频，HunyuanVideo 侧重高质量离线生成
- vs [[ai-game-devtools/cogvideox]]：LongLive 支持**顺序提示**引导，CogVideoX 为单提示视频生成
- vs [[ai-game-devtools/animatediff]]：LongLive 为端到端长视频生成，AnimateDiff 为短片段动画适配

## 里程碑

| 日期 | 事件 |
|------|------|
| 2025.09.29 | 首次发布（论文、代码、模型权重） |
| 2025.10.01 | 与 Sora2 + GPT-5 对比 |
| 2025.11.01 | 许可证改为 Apache 2.0 |
| 2025.11.03 | SANA-Video 线性注意力支持（60s 实时视频） |
| 2026.01.11 | KV-cache relative RoPE（无限视频生成） |
| 2026.01.27 | ICLR 2026 接收 |

## 相关页面

- [[ai-game-devtools/hunyuan-video]] — 腾讯混元视频生成模型
- [[ai-game-devtools/cogvideox]] — 智谱 CogVideoX 视频生成
- [[ai-game-devtools/animatediff]] — AnimateDiff 动画扩散模型
