---
title: Step-Video-T2V
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [diffusion, video, open-source, tool]
sources: [raw/articles/ai-game-devtools/step-video-t2v.md]
---

# Step-Video-T2V

阶跃星辰（StepFun）开源的 30B 参数文本到视频（Text-to-Video）扩散模型，支持生成最长 204 帧的高清视频。2025 年 2 月发布，配套有 Step-Video-T2V-Turbo（步蒸馏加速版）和 Step-Video-TI2V（图像到视频变体）。

## 概述

Step-Video-T2V 采用 DiT（Diffusion Transformer）架构，结合深度压缩 Video-VAE、双语文本编码器和 Video-DPO 偏好优化，实现从文本提示到高质量视频的端到端生成。在线服务部署于[跃问视频](https://yuewen.cn/videos)。

## 架构

### 四阶段管线

1. **Video-VAE**: 深度压缩变分自编码器，16×16 空间压缩 + 8× 时间压缩，将原始视频压缩为 64 通道潜空间表示，加速训练和推理
2. **双语文本编码器**: StepLLM（6144 维）+ CLIP（1024 维）双编码器，同时支持中英文提示
3. **DiT 主干**: 48 层 Transformer，48 注意力头 × 128 维，3D Full Attention + 3D RoPE 位置编码 + AdaLN-Single 时间步条件 + QK-Norm 训练稳定
4. **Video-DPO**: 最后阶段应用直接偏好优化，利用人类偏好数据微调，减少伪影、提升流畅度

### 关键设计

| 组件 | 规格 |
|---|---|
| 总参数量 | 30B |
| DiT 层数 | 48 |
| 注意力头 | 48 × 128dim = 6144 隐藏维度 |
| VAE 压缩比 | 16×16 空间 / 8× 时间 |
| 最大帧数 | 204 |
| 归一化 | AdaLN-Single + QK-Norm |
| 位置编码 | 3D RoPE |
| 训练方法 | Flow Matching |

## 资源需求

| 分辨率/帧 | 峰值显存 | 50步推理(Flash) |
|---|---|---|
| 768×768×204f | 78.55 GB | 860s |
| 544×992×204f | 77.64 GB | 743s |
| 544×992×136f | 72.48 GB | 408s |

- 推荐 4×80GB GPU，DiT 与文本编码器/VAE 解耦部署
- 文本编码器 self-attention 仅支持 sm_80/86/90 CUDA 架构
- Turbo 版仅需 10-15 步推理（CFG 5.0 / time_shift 17.0）

## 并行策略

采用 xfuser 框架，支持张量并行（tp_degree）+ Ulysses 并行（ulysses_degree）混合策略，需满足 `tp × ulysses = parallel`。

## 变体

| 版本 | 说明 |
|---|---|
| Step-Video-T2V | 标准版，30-50 步推理 |
| Step-Video-T2V-Turbo | 步蒸馏加速版，10-15 步推理 |
| Step-Video-TI2V | 图像到视频变体（2025-03-17 发布） |

## 评测

Step-Video-T2V-Eval 基准：128 条真实用户中文提示，覆盖 11 个类别（体育、食物、风景、动物、节日、组合概念、超现实、人物、3D动画、电影摄影、风格）。在 benchmark 中表现优于开源和商业视频生成引擎。

## 技术栈

- PyTorch 2.5.0 + CUDA
- diffusers >= 0.31.0（已集成到官方 diffusers 仓库）
- xfuser 0.4.2rc2（张量并行）
- transformers >= 4.39.1
- Flask/Flask-RESTful（远程 API 服务）
- FFmpeg（视频后处理）

## 链接

- [GitHub](https://github.com/stepfun-ai/Step-Video-T2V)
- [HuggingFace (标准)](https://huggingface.co/stepfun-ai/stepvideo-t2v)
- [HuggingFace (Turbo)](https://huggingface.co/stepfun-ai/stepvideo-t2v-turbo)
- [技术报告](https://arxiv.org/abs/2502.10248)
- [跃问视频](https://yuewen.cn/videos)

## 与同类工具对比

- 与 [[hunyuan-video]]（腾讯混元 13B+ 视频生成）相比：Step-Video-T2V 参数量更大（30B vs 13B+），采用 Flow Matching 而非标准扩散，引入 Video-DPO 偏好优化
- 与 [[cogvideox]]（智谱 CogVideoX 5B/2B）相比：Step-Video-T2V 规模更大，支持更长视频（204 帧），但显存需求更高（~78GB vs 3.6GB INT8）
- 与 [[nextstep-1]]（阶跃星辰 14B 图像生成）相比：同公司出品，NextStep-1 使用连续 Token 自回归架构生成图像，Step-Video-T2V 使用 DiT + Flow Matching 生成视频
