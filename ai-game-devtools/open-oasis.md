---
title: Open-Oasis (Oasis 500M)
created: 2026-04-16
updated: 2026-04-16
type: entity
tags: [ai-model, tool, open-source]
sources: [raw/articles/ai-game-devtools/open-oasis.md]
---

# Open-Oasis (Oasis 500M)

## Overview

**Open-Oasis** 是 Decart 与 Etched 联合发布的交互式世界模型（Interactive World Model），基于 Diffusion Transformer (DiT) 架构。它接收键盘输入并自回归地生成游戏画面帧，实现"输入动作 → 输出视频帧"的闭环交互。

开源版本为 **Oasis 500M**（缩小版），包含推理代码和模型权重。完整模型的在线演示可在官方 Demo 体验。

## Key Facts

| 属性 | 值 |
|---|---|
| **开发者** | Decart × Etched 联合项目 |
| **架构** | Diffusion Transformer (DiT) |
| **模型规模** | 500M 参数（开源缩小版） |
| **输入模态** | 图像提示（PNG/JPG/JPEG）+ 离散键盘动作 |
| **输出** | 动作条件化视频帧（MP4） |
| **生成方式** | 自回归动作条件视频合成 |
| **权重格式** | safetensors（HuggingFace: `Etched/oasis-500m`） |
| **许可** | 未明确声明（README 无 LICENSE 文件内容） |
| **仓库统计** | 49 commits |

## Technical Architecture

### 核心模块

- **`dit.py`** — Diffusion Transformer 主模型实现
- **`vae.py`** — Vision Transformer (ViT) VAE，负责图像编码/解码
- **`attention.py`** — 自定义注意力机制
- **`rotary_embedding_torch.py`** — RoPE 旋转位置编码
- **`generate.py`** — 推理入口：加载提示帧 → 循环接收动作 → 生成帧 → 输出视频

### 技术栈

- **框架:** PyTorch + diffusers
- **依赖:** einops, timm, av (PyAV)
- **CUDA:** 12.1 (PyTorch)
- **权重加载:** safetensors 格式

### 工作流程

```
[提示帧] → VAE 编码 → DiT 条件扩散去噪 → VAE 解码 → [生成帧]
     ↑                                              ↓
[键盘动作] ──── 作为条件注入 ────────────────────────→ 下一帧
```

## Usage

```bash
# 安装依赖
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
pip install einops diffusers timm av

# 下载权重
huggingface-cli download Etched/oasis-500m oasis500m.safetensors
huggingface-cli download Etched/oasis-500m vit-l-20.safetensors

# 运行推理
python generate.py
```

## Relationships

- 与 [[ai-game-devtools/matrix-game]] 同属交互式游戏世界模型方向，但 Oasis 使用 DiT 扩散生成而非自回归 LLM
- 与 [[ai-game-devtools/cosmos]] 同为物理世界建模范式，但 Oasis 专注键盘交互场景，Cosmos 面向更广泛的自动驾驶/机器人仿真
- 与 [[ai-game-devtools/hunyuanworld-1.0]] 共享"文本/图像 → 3D 世界生成"方向，Oasis 侧重 2D 游戏帧生成
- 与 [[ai-game-devtools/hunyuanworld-voyager]] 同为可交互世界视频生成，Voyager 输出 RGB-D 视频 + 相机路径控制

## Links

- **GitHub:** https://github.com/etched-ai/open-oasis
- **HuggingFace:** https://huggingface.co/Etched/oasis-500m
- **Live Demo:** https://oasis.us.decart.ai/
- **Blog:** https://oasis-model.github.io/
