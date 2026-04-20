---
title: InstructHumans
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, avatar, texture, open-source]
sources: [raw/articles/ai-game-devtools/instruct-humans.md]
---

# InstructHumans: Editing Animated 3D Human Textures with Instructions

## Overview

InstructHumans 是由新加坡国立大学（NUS）和中国传媒大学联合研究的 3D 人类纹理编辑工具，可通过**自然语言指令**编辑 3D 角色纹理，同时保持角色一致性并支持动画。发表于 IEEE Transactions on Multimedia (TMM)。

**作者:** Jiayin Zhu (NUS), Linlin Yang (Communication University of China), Angela Yao (NUS)

**论文:** [arXiv:2404.04037](https://arxiv.org/abs/2404.04037) | [IEEE TMM](https://ieeexplore.ieee.org/document/11417296) | [项目页面](https://jyzhu.top/instruct-humans/)

## 核心功能

| 功能 | 描述 |
|------|------|
| 指令式纹理编辑 | 通过文本提示修改 3D 人类纹理（如"变成小丑"、"穿西装"、"青铜雕像"） |
| 角色一致性 | 编辑后保持角色结构一致性，避免纹理退化 |
| 动画支持 | 编辑后的角色支持动态摆姿势和动画 |
| 预处理优化 | 预采样并缓存光线追踪结果到 .h5 文件（每角色 ~30 分钟），大幅加速编辑管线 |

## 技术特点

- **依赖库:** PyTorch 2.0.1 + CUDA 11.7 + NVIDIA kaolin（3D 深度学习库）
- **基础模型:** 基于 [editable-humans](https://github.com/custom-humans/editable-humans) 和 [instruct-nerf2nerf](https://github.com/ayaanzhaque/instruct-nerf2nerf)
- **人体模型:** 使用 SMPL-X 参数化人体模型
- **运动数据:** 支持 MotionX SMPL-X JSON 格式 → .obj 转换管线
- **已知问题:** kaolin 的 `_C ImportError` 源于 CUDA 版本不兼容，需对齐版本或 `--force` 重装

## 工作流

1. **环境配置:** 创建 conda 环境，安装 kaolin（需单独安装）
2. **数据准备:** 下载 checkpoints 和 SMPL-X 模型，使用 ID 32 数据快速开始
3. **纹理编辑:** 运行 `edit.py` 配合 `--instruction` 和配置文件
4. **动画生成:** 将外部运动数据（MotionX）转换为 .obj → 重新摆姿势 → 渲染帧/视频

## 仓库结构

- `edit.py` / `train.py` — 编辑和训练入口
- `lib/utils/config.py` — 配置与工具
- `tools/load_motionx_smplx.py` — 运动数据转换
- `test/test_cp.py` — 评估脚本
- `config.yaml` — 默认超参数

## 许可证

未找到 LICENSE 文件。学术引用要求。

## 与同类工具的关系

- 与 [[ai-game-devtools/dreammat]] 同属 3D 纹理生成领域，但 DreamMat 专注于 PBR 材质生成，而 InstructHumans 专注于人类角色纹理的指令编辑
- 与 [[ai-game-devtools/dream-textures]] 同为纹理编辑工具，但 Dream Textures 面向 Blender 无缝贴图，InstructHumans 面向 3D 角色动画纹理
- 与 [[ai-game-devtools/crm]] 同属 3D 生成管线，但 CRM 从单图生成完整 3D 网格，InstructHumans 编辑已有 3D 角色的纹理
