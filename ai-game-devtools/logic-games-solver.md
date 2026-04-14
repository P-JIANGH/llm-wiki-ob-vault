---
title: LogicGamesSolver
created: 2026-04-14
updated: 2026-04-14
type: entity
tags: [ai, tool, computer-vision, game, open-source]
sources: [raw/articles/ai-game-devtools/logic-games-solver.md]
---

# LogicGamesSolver

用 AI（计算机视觉 + 深度学习）解数独、Stars Battle、Skyscrapers 等逻辑益智游戏的 Python 工具。

## Overview

**LogicGamesSolver** 将计算机视觉与人工智能结合，实现对数独类逻辑拼图的自动求解。流程分为两阶段：

1. **棋盘检测** — 用摄像头实时识别或读取本地图片，通过 OpenCV 轮廓查找 + 透视变换定位并校正拼图
2. **游戏求解** — 将问题建模为 CSP（约束满足问题），用回溯算法求解

## 技术特点

### 架构 / 引擎 / 框架

| 组件 | 技术 |
|------|------|
| 语言 | Python 3.8 |
| 计算机视觉 | OpenCV 4.0.1 |
| 深度学习 | TensorFlow 2.3.0 + Keras CNN |
| 图像处理 | scikit-image（`clear_border`） |
| 算法 | CSP Backtracking + 约束传播 |

### 核心模块

| 文件 | 职责 |
|------|------|
| `main.py` | 入口：摄像头采集 → 棋盘检测 → CNN 识别 → 求解 |
| `PuzzleDetector.py` | OpenCV 轮廓检测 + 透视变换 + 细胞提取 |
| `Solver.py` | CSP 回溯求解器（Sudoku / Stars / Skyscrapers） |
| `DigitClassifier.py` | Keras CNN（MNIST 训练，7帧投票聚合） |

### CNN 模型结构

```
Conv2D(32, 5×5) → ReLU → MaxPool(2×2)
Conv2D(32, 3×3) → ReLU → MaxPool(2×2)
Flatten → Dense(64) → ReLU → Dropout(0.5)
Dense(64) → ReLU → Dropout(0.5)
Dense(10) → Softmax
```

### CSP 建模

所有游戏统一建模为 CSP：

| 游戏 | 变量 | 域 | 约束 |
|------|------|----|------|
| Sudoku | 81 格子 | {1-9} | 行/列/宫各不同 |
| Stars | N×N 格子 | {0,1} | 行/列/宫≤1星，不相邻 |
| Skyscrapers | N×N 格子 | {1-N} | 行/列各不同，边缘可见数约束 |

回溯算法含前向推理（`easy_inference`）用于域缩减。

## 解决的问题

- **Sudoku**：`python main.py sudoku 9 3`
- **Stars**：`python main.py stars 8 1`
- **Skyscrapers**：`python main.py skyscrapers 8`

普通数独 3-5 秒求解。

## 许可证

项目 LICENSE 文件（LICENSE 文件存在于源码中，MIT 或类似许可证）

## 相关链接

- GitHub: https://github.com/fabridigua/LogicGamesSolver

## 相关项目

- [[ai-game-devtools/interactml-unity]] — Unity 交互式机器学习插件（kNN/MLP/DTW）
- [[ai-game-devtools/devon]] — AI 结对编程助手，支持多 Agent 协作
- [[ai-game-devtools/chatdev]] — 多 Agent 软件开发工作流

[[ai-game-devtools-catalog]] 收录于 AI 游戏开发工具目录。
