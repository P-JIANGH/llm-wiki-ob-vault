# PhysRig

---
title: PhysRig — 可微分物理绑定
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, tool, open-source, animation]
sources: [raw/articles/ai-game-devtools/phys-rig.md]
---

## 概述

**PhysRig**（Differentiable Physics-Based Rigging for Realistic Articulated Object Modeling）是一个**可微分的物理绑定框架**，用于实现铰接式 3D 对象的真实形变。发表于 **ICCV 2025**。

与传统线性混合蒙皮（LBS）不同，PhysRig 将骨骼嵌入到可变形软体体积中，使用**物质点法（MPM, Material Point Method）**进行物理模拟——能够捕捉软组织、尾巴、耳朵等弹性结构的物理真实行为。

## 核心创新

| 维度 | 传统 LBS | PhysRig (MPM) |
|---|---|---|
| 形变模型 | 线性插值 | 可微分物理模拟 |
| 软组织效果 | 无（需额外修正） | 原生支持（挤压/拉伸/晃动） |
| 可训练性 | 不可微分 | 端到端可微分 |
| 材质参数 | 固定 | 可梯度优化（杨氏模量、泊松比） |

## 技术架构

### 三段式流水线

1. **`infill.sh`** — 网格填充：生成体积填充点云（第 0 帧）和 GT 点云（所有帧）
2. **`inference.sh`** — 物理推理：完整管线（骨骼生成 → 填充 → MPM 模拟 → 网格形变）
3. **`train.sh`** — 材质训练：通过梯度下降优化材料参数（杨氏模量、泊松比），匹配目标形变

### 代码结构

```
PhysRig/
├── inference.sh / train.sh / infill.sh  # 主流水线入口
├── blender/                             # FBX→OBJ 转换（需本地运行）
├── exp_motion/train/                    # 核心 MPM 接口、cuboid 工具、训练/推理入口
├── exp_motion/utils/                    # 形变/cuboid 网格/骨骼质心/填充工具
├── thirdparty_code/                     # Warp MPM 求解器（内置）
└── motionrep/                           # 运动表示库
```

### 关键依赖

- **自定义扩展：** Gaussian rasterization、simple-knn
- **物理求解器：** Warp MPM solver（bundled）
- **Blender：** FBX→OBJ 转换必须本地执行（云端服务器通常无 Blender）

### 关键推理参数

- `POSITION_METHOD`：骨骼位置计算方法（7 种策略，默认 adaptive）
- `CUBOID_SIZE_MODE`：包围盒尺寸模式（6 种策略，默认 fixed）
- `SUBSTEP_INF`：每帧模拟子步数（默认 100）
- `YOUNGS_INF`：杨氏模量/材料刚度（默认 6e4）
- `NU_INF`：泊松比（默认 0.3）

## 游戏开发应用场景

- **角色二级运动**：尾巴/耳朵/披风的物理真实摆动，无需手动调参
- **软体角色动画**：史莱姆、凝胶状生物等软体角色的自然形变
- **铰接物体仿真**：机械关节+柔性连接的复合动画
- **材质参数自动优化**：从目标动画反推最优杨氏模量和泊松比

## 项目信息

- **论文：** [arXiv:2506.20936](https://arxiv.org/abs/2506.20936)
- **项目页面：** [physrig.github.io](https://physrig.github.io)
- **GitHub：** [haoz19/PhysRig](https://github.com/haoz19/PhysRig)
- **许可证：** 未明确标注（学术用途）
- **会议：** ICCV 2025

## 相关工具

- [[animate3d]] — 3D 模型动画生成（MV-VDM 扩散 + 4D-SDS 精炼）
- [[dreamgaussian4d]] — 生成式 4D 高斯场景（单图→静态 3D→动态 4D）
- [[character-gen]] — 单图→3D 角色生成（多视角姿态规范化 + 两阶段管线）
