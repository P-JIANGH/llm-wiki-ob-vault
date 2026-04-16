---
title: HY-World 1.5 (WorldPlay)
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai-model, game, world-model, video-generation, llm, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/hy-world-1.5.md]
---

# HY-World 1.5 (WorldPlay)

**HY-World 1.5**（WorldPlay）是腾讯混元于 2025 年 12 月发布的**首个开源实时交互式世界模型**，核心是流式视频扩散模型，支持 24 FPS 流式推理、长期几何一致性、键盘/鼠标动作控制。基于 [[HunyuanVideo-1.5]] 或 [[WAN]] 作为骨干。

## 核心创新

1. **Dual Action Representation** — 鲁棒响应 WASD + 鼠标输入的动作控制
2. **Reconstituted Context Memory** — 动态重建历史 chunk 上下文 + 时间帧重排，缓解记忆衰减
3. **WorldCompass** — RL 后训练框架，提升动作跟随和视觉质量（对应论文 [arXiv:2602.09022](https://arxiv.org/abs/2602.09022)）
4. **Context Forcing** — 记忆感知蒸馏，对齐教师/学生记忆上下文，防止错误漂移

## 技术架构

**推理管线：**
- **HunyuanVideo-based（推荐）**：HunyuanVideo-8B 骨干，action control 强 + long-term memory，480P I2V，72G GPU
- **WAN Pipeline（轻量）**：WAN-5B 骨干，低显存但 action control 弱

**模型变体：**
- Bidirectional-480P-I2V：双向注意力 + reconstituted context memory
- Autoregressive-480P-I2V：AR + context memory
- Autoregressive-480P-I2V-rl：RL 后训练版
- Autoregressive-480P-I2V-distill：4 步推理 distilled 版（4x 加速）

## 性能对比

Long-term geometric consistency 评测（Real-time 方法中全面领先）：

| Model | Real-time | Long PSNR ⬆ | Long SSIM ⬆ |
|-------|:---:|:---:|:---:|
| **Ours (full)** | ✅ | **18.94** | **0.585** |
| Matrix-Game-2.0 | ✅ | 9.57 | 0.205 |
| Gen3C | ❌ | 15.37 | 0.431 |
| GameCraft | ❌ | 10.09 | 0.287 |

## 系统要求

- NVIDIA GPU + CUDA
- 推理（AR distilled，125 frames）：sp=8 → 28G / sp=4 → 34G / sp=1 → 72G
- 训练（sp=8）：60G

## 动作控制

Pose string 格式：`action-duration`，支持 WASD 移动 + 上下左右旋转。
示例：`w-3, right-1, d-4` = 前进 3 + 右转 1 + 右移 4 latents。

## 与同类对比

HY-World 1.5 是 [[GameGen-O]] 的升级方向——从离线生成走向**实时交互**，同时解决了 [[Matrix-Game]] 和 [[GameCraft]] 无法保持长期几何一致性的问题。

## 发布节点

- 2026-04-16: [[HY-World-2.0]] 发布
- 2026-03-08: WorldCompass RL 后训练代码开源
- 2026-01-06: 训练代码 + WorldPlay-5B 轻量版开源
- 2025-12-17: 首个开源实时交互世界模型发布

## 许可证

需查阅 GitHub LICENSE 确认。
