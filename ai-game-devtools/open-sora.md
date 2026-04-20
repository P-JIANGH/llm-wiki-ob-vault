---
title: Open-Sora
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/open-sora.md]
---

# Open-Sora

HPCAitech (ColossalAI team) 开源视频生成项目，致力于高效高质量视频生成的民主化。提供从数据预处理、加速训练到推理评估的完整管线。

## 最新版本

**Open-Sora 2.0**（2025-03 发布，11B 参数）：
- 支持文本到视频（T2V）和图像到视频（I2V），单一模型统一两种任务
- 256px / 768px 双分辨率
- VBench 评测接近 OpenAI Sora（差距仅 0.69%，相比 1.2 版本的 4.52% 大幅缩小）
- 人类偏好与 [[ai-game-devtools/hunyuan-video]] 11B、Step-Video 30B 相当
- 训练成本仅 ~$200K

## 架构

**核心模型：Multi-Modal Diffusion Transformer (MMDiT)**
- 基于 DiT 架构，融合文本+图像条件
- Rectified Flow 训练目标
- 3D-VAE（shift-window attention）实现统一时空编码
- Score condition 用于运动质量控制（1-7 分动态评分）

**推理管线：**
1. **T2I2V（推荐）**：Flux 文生图 → Open-Sora 图生视频，质量最优
2. **T2V 直接**：文本直接生成视频
3. **I2V**：参考图像 + 提示词 → 视频生成

**分布式训练加速（ColossalAI）：**
- Tensor Parallelism（1-4 GPU）
- Sequence Parallelism（8 GPU）
- Flash Attention 3 / xformers 优化

## 计算效率

| 分辨率 | 1×GPU 时间/显存 | 8×GPU 时间/显存 |
|--------|----------------|----------------|
| 256×256 | 60s / 52.5GB | 不支持 |
| 768×768 | 1656s / 60.3GB | 276s / 44.3GB |

测试环境：H100/H800，50 步采样。

## 版本演进

- **v1.0**（2024-03）：完整训练+推理管线，2s 512×512 视频，3 天训练
- **v1.1**（2024-04）：支持多分辨率/时长/宽高比，I2V/V2V/无限时长
- **v1.2**（2024-06）：3D-VAE、Rectified Flow、Score Condition
- **v1.3**（2025-02）：1B 模型，升级 VAE + Transformer
- **v2.0**（2025-03）：11B 模型，T2V+I2V 统一，$200K 训练

## 与同类工具差异

- 相比 [[ai-game-devtools/hunyuan-video]]：Open-Sora 强调训练成本效率（$200K vs 腾讯未公开），开源更完整（含训练代码）
- 相比 [[ai-game-devtools/cogvideox]]：CogVideoX 专注 T2V+I2V 双模直接输出，Open-Sora 推荐 T2I2V 间接管线质量更优
- 相比 [[ai-game-devtools/mochi-1]]：Open-Sora 11B 参数量相近，但训练成本透明公开
- 相比 [[ai-game-devtools/stable-video-diffusion]]：Open-Sora 2.0 质量远超早期 SD Video，支持 768p 高分辨率

## 许可证

Apache 2.0

## 相关链接

- GitHub: https://github.com/hpcaitech/Open-Sora
- 技术报告 v2.0: https://arxiv.org/abs/2503.09642v1
- 技术报告 v1.2: https://arxiv.org/abs/2412.20404
- HuggingFace: https://huggingface.co/hpcai-tech/Open-Sora-v2
- 演示: https://huggingface.co/spaces/hpcai-tech/open-sora
