# CALM — Conditional Adversarial Latent Models

**Source:** https://github.com/NVlabs/CALM
**Date:** 2026-04-18
**Category:** Avatar / Animation

## Project Overview

CALM: Conditional Adversarial Latent Models for Directable Virtual Characters — NVIDIA Research (nv-tlabs / PAR lab) 项目。论文: "CALM: Conditional Adversarial Latent Models for Directable Virtual Characters" (https://research.nvidia.com/labs/par/calm/)

基于 Isaac Gym 仿真环境，使用对抗式潜在模型训练可引导的虚拟角色（人形机器人 humanoid），支持剑盾动作风格。继承自 Adversarial Skill Embeddings (ASE, Peng et al. 2022)。

## 核心架构

### 两级控制架构 (HRL — Hierarchical Reinforcement Learning)

```
High-Level Controller (HLC) — 任务级决策（导航、定位、打击等）
    ↓
Low-Level Controller (LLC / CALM) — 风格约束的运动执行
```

### 训练流程三阶段

1. **Pre-Training (预训练)**: CALM 模型学习模仿动作剪辑数据集（如 Reallusion 剑盾动作），训练任务 `HumanoidAMPGetup`，基于对抗式动作先验 (AMP)
2. **Precision-Training (精确训练)**: 使用预训练的 CALM LLC 训练风格约束的移动控制器（如 `HumanoidHeadingConditioned` — 目标朝向任务）
3. **Task-Solving / Inference (任务求解)**: 组合 LLC + HLC 直接求解任务（`HumanoidStrikeFSM`, `HumanoidLocationFSM`），无需额外训练

### 内置任务

| 任务 | 配置文件 |
|------|---------|
| HumanoidAMPGetup | humanoid_calm_sword_shield_getup.yaml |
| HumanoidAMP | humanoid_sword_shield.yaml |
| HumanoidHeadingConditioned | humanoid_sword_shield_heading_conditioned.yaml |
| HumanoidHeading | humanoid_sword_shield_heading.yaml |
| HumanoidReach | humanoid_sword_shield_reach.yaml |
| HumanoidLocation | humanoid_sword_shield_location.yaml |
| HumanoidStrike | humanoid_sword_shield_strike.yaml |
| HumanoidStrikeFSM | humanoid_sword_shield_strike_fsm.yaml |
| HumanoidLocationFSM | humanoid_sword_shield_location_fsm.yaml |
| HumanoidPerturb | (鲁棒性测试 — 向角色投掷抛射物) |
| HumanoidViewMotion | (动作可视化) |

### 代码结构

```
calm/
├── run.py              # 主入口 — rl-games Runner 注册 + wandb 跟踪
├── calm/__init__.py    # 模块初始化
├── data/
│   ├── cfg/            # 环境配置 YAML
│   ├── cfg/train/rlg/  # rl-games 训练配置
│   └── motions/        # 动作剪辑数据集 (.npy + .yaml)
├── learning/
│   ├── calm_agent.py          # CALM 训练智能体
│   ├── calm_players.py        # CALM 推理播放器
│   ├── calm_models.py         # CALM 模型定义
│   ├── calm_network_builder.py # CALM 网络构建器
│   ├── amp_*.py               # AMP (Adversarial Motion Priors) 实现
│   ├── hrl_*.py               # HRL (Hierarchical RL) 实现
│   └── hrl_conditioned_agent.py # 条件化 HRL 智能体
├── env/tasks/         # 环境任务定义
└── poselib/           # 动作重定向工具
```

### 依赖栈

- **Isaac Gym** (NVIDIA 物理仿真环境，需单独安装)
- PyTorch 1.8.1
- rl-games 1.1.4 (PPO 实现)
- numpy 1.21.1
- tensorboard 1.15.0
- wandb (可选，实验跟踪)
- Horovod (可选，多 GPU 训练)

### 核心算法注册表 (run.py)

```python
runner.algo_factory.register_builder('calm', calm_agent.CALMAgent)
runner.player_factory.register_builder('calm', calm_players.CALMPlayer)
runner.model_builder.register_builder('calm', calm_models.ModelCALMContinuous)
runner.model_builder.network_factory.register_builder('calm', calm_network_builder.CALMBuilder)
# AMP / HRL / HRL-conditioned / HRL-FSM 同样注册
```

## 许可证

NVIDIA License — 仅限非商业研究使用。NVIDIA 及其关联公司可商业使用。

## 相关链接

- [GitHub](https://github.com/NVlabs/CALM)
- [NVIDIA Research Page](https://research.nvidia.com/labs/par/calm/)
- [ASE (上游项目)](https://github.com/nv-tlabs/ASE)

## 与同类工具差异

- 与 [[ai-game-devtools/ase]] (Adversarial Skill Embeddings) 同源但增加了条件化控制能力
- 与 [[ai-game-devtools/aniportrait]] 不同：AniPortrait 是 2D 视频驱动的肖像动画，CALM 是 3D 物理仿真人形角色控制
- 基于 Isaac Gym 而非 Unity/Unreal，使用 rl-games PPO 而非自定义 RL 算法
- 提供 AMP (Adversarial Motion Priors) 实现作为独立功能
