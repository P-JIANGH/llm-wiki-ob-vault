---
title: GameAISDK
created: 2026-04-15
updated: 2026-04-15
type: entity
tags: [ai, tool, open-source, game-engine, agent]
sources: [raw/articles/ai-game-devtools/gameaisdk.md]
---

# GameAISDK

## Overview

**GameAISDK**（aitest 平台）是腾讯开源的基于游戏图像开发游戏 AI 的工具包，支持跑酷类、吃鸡类、射击类、MOBA 类等游戏类型的自动化测试与强化学习训练。

官网: https://aitest.qq.com | GitHub: https://github.com/Tencent/GameAISDK

## Key Facts

| Attribute | Detail |
|-----------|--------|
| **License** | GPL v3 |
| **Org** | Tencent (THL A29 Limited) |
| **Framework** | TensorFlow + OpenCV 3.4.2 |
| **Platform** | Ubuntu 14.04/16.04, Windows, macOS (Docker) |
| **AI Algorithms** | DQN, IM (Imitation Learning), RainBOW |

## Architecture

```
GameAISDK/
├── src/
│   ├── AgentAI/     # AI 智能体逻辑
│   ├── API/         # 对外 API 接口
│   ├── ImgProc/     # 图像处理模块
│   ├── IOService/   # IO 服务
│   ├── ManageCenter/# MC 模块，数据分发与业务控制
│   └── PlugIn/      # 插件扩展
├── Modules/
│   ├── darknetV3/   # YOLO 目标检测 backbone
│   ├── RefineDet/   # 目标检测算法
│   ├── opencv-3.4.2/
│   ├── protobuf/    # 序列化协议
│   └── tbus/        # 通信框架（腾讯内部 RPC）
└── tools/           # SDKTool 配置工具
```

**数据流**: AI Client（手机端采集画面） → IO 模块 → MC 模块（分发） → UI/GameReg/AI 模块处理 → 动作回传执行

## Core Modules

### AI Client
与手机/模拟器连接，实时采集游戏画面，并将 AI 计算的动作结果回传给手机执行点击等操作。

### UI 模块
基于图像识别游戏中的 UI 按钮元素，支持固定位置按钮检测、形变物体识别。

### GameReg 模块
识别游戏场景内数字、血条、目标物等元素。支持的识别类型包括：fix object、deform object、number、fix blood、deform blood、pixel、stuck。

### AI 模块
内置 DQN（深度 Q 网络）、IM（模仿学习）、RainBOW 三种强化学习/模仿学习算法。

### SDKTool
可视化配置工具，用于生成游戏相关的 UI 配置、场景识别配置、标注样本管理。

## AI 算法

- **DQN**: 深度 Q 网络，端到端强化学习
- **IM（模仿学习）**: 录制人类操作样本，训练网络模仿行为
- **RainBOW**: 综合多种 RL 算法优势的 RainBOW 方法

## 与同类工具对比

- **vs GameGen-O / GameGen-X**: GameAISDK 专注于游戏 AI 训练和自动化测试，非视频生成；采用强化学习而非扩散模型
- **vs Open-Sora / CogVideoX**: 无视频生成能力，专注于可交互的游戏 AI agent
- **vs EnvariorAgent / AgentSims**: GameAISDK 面向真实手机游戏画面（而非 3D 渲染环境），通过 AIClient 实时采集画面并回传动作

## Related

- `agent` — general AI agent paradigm
- `reinforcement-learning` — DQN, IM, RainBOW underlying techniques
- [[agentgpt]] — autonomous agent platform (different approach)
- [[agentscope]] — another multi-agent framework in this wiki
