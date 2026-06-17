# HY-World 1.5 (WorldPlay)

> GitHub: https://github.com/Tencent-Hunyuan/HY-WorldPlay
> Official site: https://3d.hunyuan.tencent.com/sceneTo3D?tab=worldplay
> HuggingFace: https://huggingface.co/tencent/HY-WorldPlay
> Technical Report: https://3d-models.hunyuan.tencent.com/world/world1_5/HYWorld_1.5_Tech_Report.pdf

## Overview

HY-World 1.5 (WorldPlay) 是腾讯混元于 2025 年 12 月发布的**首个开源实时交互式世界模型**，支持 24 FPS 流式视频生成、长期几何一致性、键盘/鼠标动作控制。被视为游戏 AI 环境生成的重要里程碑。

## 核心四大设计

1. **Dual Action Representation** — 支持键盘+WASD 和鼠标输入的鲁棒动作控制
2. **Reconstituted Context Memory** — 动态重建历史帧上下文 + 时间帧重排，缓解记忆衰减
3. **WorldCompass** — RL 后训练框架，直接提升动作跟随和视觉质量
4. **Context Forcing** — 记忆感知蒸馏方法，对齐教师/学生模型的记忆上下文，防止错误漂移

## 技术架构

**两套推理管线：**
- **HunyuanVideo-based (推荐)**：HunyuanVideo-8B 作为骨干，better action control + long-term memory，480P I2V，72G GPU
- **WAN Pipeline (轻量)**：WAN-5B 骨干，小显存但 action control 牺牲，5B 参数

**多版本模型：**
- Bidirectional-480P-I2V：双向注意力 + reconstituted context memory
- Autoregressive-480P-I2V：AR 模型 + reconstituted context memory
- Autoregressive-480P-I2V-rl：RL 后训练版本
- Autoregressive-480P-I2V-distill：4 步推理加速 distilled 版本

## 性能指标

| 指标 | Ours (full) | Gen3C | Matrix-Game-2.0 | GameCraft |
|------|-------------|-------|-----------------|-----------|
| Real-time | ✅ | ❌ | ✅ | ❌ |
| Long-term PSNR | **18.94** | 15.37 | 9.57 | 10.09 |
| Long-term SSIM | **0.585** | 0.431 | 0.205 | 0.287 |

## 系统要求

- GPU: NVIDIA CUDA
- 推理（AR distilled, 125 frames）：
  - sp=8: 28G 显存
  - sp=4: 34G 显存
  - sp=1: 72G 显存
- 训练（sp=8）: 60G 显存

## 依赖

- Python 3.10, conda 环境
- SageAttention（WAN pipeline 必需，HunyuanVideo 可选）
- Flash Attention（可选，加速 HunyuanVideo）
- AngelSlim + DeepGEMM（可选，FP8 量化加速）
- HuggingFace 模型：HunyuanVideo-1.5, Qwen2.5-VL-7B-Instruct, google/byt5-small, FLUX.1-Redux-dev

## 动作控制

支持 WASD 移动 + 上下左右旋转，通过 pose string 指定轨迹：
- `w-31`：前进 31 latents
- `w-3, right-1, d-4`：前进 3 + 右转 1 + 右移 4

## 发布历史

- 2026-04-16: HY-World-2.0 发布
- 2026-03-08: WorldCompass RL 后训练代码开源
- 2026-01-06: WorldPlay-8B 训练代码开源，WorldPlay-5B 轻量版开源
- 2026-01-03: 推理优化（量化 + 工程优化）
- 2025-12-17: 技术报告发布，WorldPlay 正式开源

## 许可证

（需查看 GitHub LICENSE 文件确认）

## 相关链接

- HY-World 1.0: https://github.com/Tencent-Hunyuan/HunyuanWorld-1.0
- WorldCompass: worldcompass/README.md
- WAN Pipeline: wan/README.md
- Training: trainer/README.md
