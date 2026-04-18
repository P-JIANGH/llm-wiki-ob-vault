---
title: CALM
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [ai-model, avatar, animation, open-source, python]
sources: [raw/articles/ai-game-devtools/calm.md]
---

# CALM — Conditional Adversarial Latent Models

**CALM: Conditional Adversarial Latent Models for Directable Virtual Characters**

## Overview

NVIDIA Research (nv-tlabs / PAR lab) 开发的虚拟角色控制系统，基于 Isaac Gym 仿真环境和对抗式潜在模型训练可引导的人形角色。继承自 Adversarial Skill Embeddings (ASE)，增加条件化控制能力，支持剑盾风格动作的角色运动生成。

## 核心架构

### 两级分层强化学习 (HRL)

```
High-Level Controller (HLC) — 任务级决策（导航/定位/打击）
    ↓
Low-Level Controller (LLC / CALM) — 风格约束的运动执行
```

### 训练三阶段

1. **Pre-Training**: CALM 模型学习模仿动作数据集（Reallusion 剑盾动作），基于对抗式动作先验 (AMP)，训练任务 `HumanoidAMPGetup`
2. **Precision-Training**: 使用预训练 LLC 训练风格约束移动控制器（如 `HumanoidHeadingConditioned`）
3. **Task-Solving (Inference)**: LLC + HLC 组合直接求解任务（`HumanoidStrikeFSM`, `HumanoidLocationFSM`），无需额外训练

### 内置任务

| 任务 | 说明 |
|------|------|
| HumanoidAMPGetup | 动作模仿 + 倒地起身 |
| HumanoidAMP | 对抗式动作先验（单动作模仿） |
| HumanoidHeadingConditioned | 条件化目标朝向（精确训练） |
| HumanoidHeading | 目标朝向（直接训练） |
| HumanoidReach | 到达目标位置 |
| HumanoidLocation | 导航到指定地点 |
| HumanoidStrike | 打击目标 |
| HumanoidStrikeFSM | FSM 驱动的打击任务（推理模式） |
| HumanoidPerturb | 鲁棒性测试（抛射物攻击角色） |
| HumanoidViewMotion | 动作可视化 |

### 代码结构

```
calm/
├── run.py              # 主入口 — rl-games Runner + wandb 跟踪
├── data/
│   ├── cfg/            # 环境配置 YAML
│   ├── cfg/train/rlg/  # rl-games 训练配置
│   └── motions/        # 动作剪辑 (.npy + .yaml 数据集)
├── learning/
│   ├── calm_agent/players/models/network_builder  # CALM 四件套
│   ├── amp_*           # AMP 实现
│   ├── hrl_*           # HRL 实现
│   └── hrl_conditioned_agent.py  # 条件化 HRL
├── env/tasks/          # 环境任务
└── poselib/            # 动作重定向工具
```

### 算法注册表

```python
runner.algo_factory.register_builder('calm', calm_agent.CALMAgent)
runner.player_factory.register_builder('calm', calm_players.CALMPlayer)
runner.model_builder.register_builder('calm', calm_models.ModelCALMContinuous)
runner.model_builder.network_factory.register_builder('calm', calm_network_builder.CALMBuilder)
```

## 依赖栈

- **Isaac Gym** — NVIDIA 物理仿真（需单独安装）
- PyTorch 1.8.1, rl-games 1.1.4 (PPO), numpy 1.21.1
- tensorboard 1.15.0, wandb (可选), Horovod (可选多 GPU)

## 许可证

NVIDIA License — 仅限非商业研究使用。

## 相关链接

- [GitHub](https://github.com/NVlabs/CALM)
- [NVIDIA Research Page](https://research.nvidia.com/labs/par/calm/)
- [ASE 上游项目](https://github.com/nv-tlabs/ASE)

## 与同类工具差异

- 与 [[ai-game-devtools/phys-rig]] 不同：phys-rig 是物理驱动的骨骼绑定（2D 角色模拟），CALM 是 3D 人形角色的 RL 控制系统
- 与 [[ai-game-devtools/motionllm]] 不同：MotionLLM 是运动理解/生成的 LLM 框架，CALM 是基于物理仿真的 RL 角色控制
- 基于 Isaac Gym 仿真环境 + rl-games PPO，非 Unity/Unreal 引擎
- 提供完整的 AMP (Adversarial Motion Priors) 实现作为独立功能，可用于单动作模仿
