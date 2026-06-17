---
title: NVIDIA Cosmos
created: 2026-04-13
updated: 2026-04-13
type: entity
tags: [tool, multimodal, open-source]
sources: [raw/articles/ai-game-devtools/cosmos.md]
---

# NVIDIA Cosmos

**NVIDIA Cosmos™** 是 NVIDIA 专为物理 AI（Physical AI）打造的世界基础模型（World Foundation Model, WFM）平台，提供生成式视频世界模型、数据处理流水线和内置安全护栏，服务于自动驾驶、机器人和视频分析等领域。

- **原 GitHub**: https://github.com/NVIDIA/Cosmos（已废弃，迁移至 https://github.com/nvidia-cosmos）
- **组织主页**: https://github.com/nvidia-cosmos
- **官网**: https://www.nvidia.com/en-us/ai/cosmos/
- **论文**: https://arxiv.org/abs/2511.00062
- **许可证**: 源码 Apache 2.0；模型 NVIDIA Open Model License

---

## 功能描述

Cosmos 平台包含三类核心模型：

| 模型 | 类型 | 功能 | 典型用途 | 输入 | 输出 |
|------|------|------|----------|------|------|
| **Cosmos-Predict** | 世界生成 | 预测未来帧 | 数据生成、策略评估 | 文本/图像/视频 | 视频 |
| **Cosmos-Transfer** | 多控制网 | 将控制帧转为真实感帧 | 数据增强 | RGB/深度/分割等 | 视频 |
| **Cosmos-Reason** | 推理 VLM | 理解视频物理常识 | 数据筛选、机器人规划 | 视频+文本 | 文本 |

三种模型均支持后训练（post-training）定制。

---

## 技术特点

### 架构
- **Cosmos-Predict2.5**：最新一代 WFM，基于 **Flow-based 模型**，统一 Text2World / Image2World / Video2World
- 使用 **Cosmos-Reason1**（物理 AI 推理 VLM）作为文本编码器
- 参数规模：2B 和 14B 两种尺寸
- 提供 pre-trained / post-trained / distilled 三种变体

### 专域微调能力
- **自动驾驶**：7 摄像头多视角（multiview）模型
- **机器人**：动作条件（action-conditioned）生成，支持 AgiBot 3 摄像头数据

### 配套生态
| 仓库 | 说明 |
|------|------|
| Cosmos-Predict2.5 | 最新世界预测模型（⭐1.1k） |
| Cosmos-Transfer2.5 | 空间控制输入→真实感视频（⭐595） |
| Cosmos-Reason2 | 链式推理物理常识 VLM（⭐338） |
| Cosmos-Cookbook | 后训练食谱与部署示例（⭐357） |
| Cosmos-RL | 物理 AI 强化学习框架 |
| Cosmos-Curate | 分布式视频数据筛选系统 |

---

## 主要应用场景

1. **自动驾驶（AV）**：多摄像头合成数据生成、场景仿真
2. **机器人**：动作条件视频预测、具身智能策略评估
3. **视频分析 AI Agent**：物理常识推理与决策

---

## 与同类工具的差异

- 相较于 [[aios]]（LLM OS 框架）专注于 Agent 调度，Cosmos 聚焦于**物理世界视频生成与仿真**
- 相较于 [[corenet]]（通用视觉训练框架），Cosmos 更专注于**时序视频世界模型**而非静态视觉任务
- Cosmos 的独特之处在于同时提供"生成-迁移-推理"三位一体的闭环物理 AI 工具链

---

## 相关链接

- HuggingFace 模型集: https://huggingface.co/collections/nvidia/cosmos-predict25-68bb63255f2fc206c5e5b346
- Cosmos-Cookbook: https://github.com/nvidia-cosmos/cosmos-cookbook
