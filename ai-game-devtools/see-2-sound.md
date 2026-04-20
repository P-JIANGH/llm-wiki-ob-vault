---
title: SEE-2-SOUND
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [audio, ai, multimodal, tool, open-source, python, diffusion]
sources: [raw/articles/ai-game-devtools/see-2-sound.md]
---

# SEE-2-SOUND — Zero-Shot Spatial Environment-to-Spatial Sound

**GitHub**: https://github.com/see2sound/see2sound
**Paper**: arXiv:2406.06612 — [SEE-2-SOUND](https://arxiv.org/abs/2406.06612)
**Project Page**: https://see2sound.github.io
**Demo**: [HuggingFace Gradio](https://huggingface.co/spaces/rishitdagli/see-2-sound)
**Authors**: Rishit Dagli, Shivesh Prakash, Rupert Wu, Houman Khosravani (University of Toronto)

## 概述

SEE-2-SOUND 是一个零样本（zero-shot）系统，可从**静态图像、动画图像和视频**生成**空间音频**（5.1 环绕声）。它将视觉环境内容映射为匹配的空间音效，为游戏和沉浸式媒体提供自动音效生成能力。

## 三阶段管线

| 阶段 | 技术 | 功能 |
|------|------|------|
| **1. 源估计** | SAM ViT-H + Depth Anything ViT-L | 分割图像感兴趣区域，估计3D位置和深度图 |
| **2. 音频生成** | CoDi 条件扩散模型 | 为每个区域独立生成单声道音频片段 |
| **3. 空间音频** | pyroomacoustics RIR 计算 | 在虚拟房间中放置声源，计算5.1声道房间脉冲响应 |

## 核心架构

### 阶段 1: 源估计
- **SAM (Segment Anything)** 自动分割图像中的感兴趣区域，选取面积最大的 N 个区域（默认3个）
- **Depth Anything** 估计单目深度图，将2D像素坐标映射到3D空间
- 每个区域的中心点 + 深度值 = 3D坐标（观看球面上的位置）

### 阶段 2: 音频生成
- 使用 **CoDi**（微软 i-Code V3 多模态扩散模型）为每个掩码区域生成音频
- 支持纯图像条件或图像+文本提示双条件
- 每个区域独立生成，支持可配置的扩散步数（默认500步）
- 输出：16kHz 单声道音频波形

### 阶段 3: 空间音频合成
- 使用 **pyroomacoustics** 创建虚拟鞋盒房间（ShoeBox）
- 将各区域声源放置在3D坐标上
- 按照5.1声道标准配置6个麦克风：
  - 前左(FL)、前右(FR)、前中(FC)
  - 低频效果(LFE)
  - 后左(BL)、后右(BR)
- 计算房间脉冲响应(RIR)并模拟声波传播
- 使用 **ffmpeg** 将6声道合并为5.1环绕声WAV文件

## 技术特点

1. **零样本**: 无需训练或微调，直接使用预训练模型
2. **空间定位**: 基于深度估计的3D声源定位，而非简单的2D平面映射
3. **5.1环绕声输出**: 符合主流音频系统标准，可直接用于游戏引擎
4. **低内存模式**: 支持顺序加载模型（SAM → 深度 → CoDi），适配24GB+显存GPU
5. **FP16支持**: 可选半精度推理降低显存占用
6. **Docker容器**: 提供41GB预构建镜像，包含所有模型权重

## 配置参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `sam_size` | H | SAM模型变体(H/L/B) |
| `depth_size` | L | Depth Anything变体(L/B/S) |
| `num_audios` | 3 | 生成的音频区域数量 |
| `steps` | 500 | 扩散步数 |
| `fp16` | false | 半精度模式 |
| `low_mem` | false | 低内存顺序加载 |

## 快速使用

```python
import see2sound

model = see2sound.See2Sound(config_path="default_config.yaml")
model.setup()
model.run(path="scene.png", output_path="scene.wav")
```

## 许可证

未明确声明（需查看仓库LICENSE文件）

## 对游戏开发的价值

- **自动场景音效**: 将游戏场景截图/渲染图自动转换为环境音效
- **空间沉浸感**: 5.1环绕声输出可直接接入Unity/Unreal音频系统
- **零样本**: 无需为每个场景手动设计或录制音效
- **不足**: 推理速度较慢（CoDi扩散500步 × N个区域），不适合实时生成
- **推荐用途**: 关卡设计阶段的音效原型、过场动画自动配乐

## 与同类工具的差异

- 相比 [[ai-game-devtools/hunyuanvideo-foley]]（腾讯视频音效生成）：SEE-2-SOUND 专注**图像→空间音频**而非视频→音效，且输出5.1环绕声而非单声道
- 相比 [[ai-game-devtools/mmaudio]]（视频→音频同步生成）：SEE-2-SOUND 强调**空间定位**（深度估计+3D声源放置），而非时间同步
- 相比 [[ai-game-devtools/audioldm-2]]（通用音频扩散模型）：SEE-2-SOUND 是完整的端到端管线（分割→深度→生成→空间化），而 AudioLDM 2 是基础音频生成框架
- 相比 [[ai-game-devtools/audiolcm]]（LCM加速扩散音频生成）：SEE-2-SOUND 使用 CoDi 而非 AudioLDM，且增加了空间音频合成层
