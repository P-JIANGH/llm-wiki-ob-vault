---
title: RVC (Retrieval-based Voice Conversion WebUI)
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [tool, audio, open-source, python, gradio]
sources: [raw/articles/ai-game-devtools/retrieval-based-voice-conversion-webui.md]
---

# RVC — Retrieval-based Voice Conversion WebUI

## 概述

RVC（Retrieval-based Voice Conversion WebUI）是一个基于 VITS 架构的开源变声/声音转换框架，由 RVC-Project 团队开发（主要作者：lj1995、源文雨、Ftps）。核心创新是使用 top-1 检索替换机制，将输入源的声学特征替换为训练集特征，从而杜绝音色泄漏问题。MIT 许可，2023 年开源。

GitHub: https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI

## 核心特点

- **Top-1 检索特征替换** — 通过 FAISS 向量检索，将输入源特征替换为最接近的训练集特征，消除音色泄漏
- **低数据需求** — 仅需 ~10 分钟低底噪语音数据即可训练出可用模型
- **多 GPU 兼容** — 支持 NVIDIA CUDA、AMD ROCm/DirectML、Intel IPEX/DirectML、Apple MPS、CPU
- **实时变声** — 端到端延迟 170ms（ASIO 设备可达 90ms）
- **UVR5 集成** — 内置人声/伴奏分离功能
- **RMVPE 音高提取** — InterSpeech 2023 最先进的音高提取算法，效果优于 crepe_full 且更快

## 技术架构

### 管线流程
1. **音频切片** — slicer2 将长音频切为可处理片段
2. **内容特征提取** — ContentVec/fairseq HuBERT 提取语义内容
3. **音高提取** — RMVPE（或 crepe/pm/harvest/dio）提取 F0 基频
4. **索引检索** — FAISS 构建 KMeans 聚类索引，top-1 检索替换特征
5. **声音转换** — VITS 生成器将特征转换为目标音色
6. **后处理** — HiFi-GAN 声码器输出最终音频

### 模型版本
| 版本 | 采样率 | 说明 |
|------|--------|------|
| V1 | 32k/40k/48k | 原始架构 |
| V2 | 32k/48k | 改进架构，参数量更大 |

- **底模** — 使用 ~50 小时 VCTK 数据集训练，无版权顾虑
- **V3 预告** — 参数更大、数据更大、效果更好、需训练数据更少

### 主要模块
| 模块 | 功能 |
|------|------|
| `infer/modules/vc/` | 声音转换核心 |
| `infer/modules/train/` | 模型训练管线 |
| `infer/modules/uvr5/` | 人声分离（UVR5 模型） |
| `infer/lib/rmvpe.py` | RMVPE 音高提取 |
| `infer/lib/rtrvc.py` | 实时变声管线 |
| `infer/lib/infer_pack/` | 神经网络层实现 |
| `configs/` | V1/V2 模型配置（JSON） |

### 依赖技术
- **VITS** — 变分推理 TTS 基础架构
- **ContentVec** — 内容特征提取器
- **HiFi-GAN** — 神经声码器
- **FAISS** — 向量相似度检索
- **RMVPE** — 音高提取（InterSpeech 2023）
- **Gradio 3.34.0** — Web UI 框架
- **PyTorch 2.4.0** — 深度学习框架

## 接口

- **WebUI** — Gradio 网页界面（infer-web.py，~1619 行），支持训练/推理/模型融合/UVR5 分离
- **实时变声** — go-realtime-gui.bat 启动的低延迟实时变声界面
- **REST API** — api_231006.py（旧版）和 api_240604.py（新版，FastAPI）提供编程接口
- **i18n** — 支持中/英/日/韩/法/土耳其/葡萄牙等多语言界面

## 与同类工具差异

- 相比 [[ai-game-devtools/diffsinger]]（歌声合成），RVC 专注声音转换（保留原始内容/韵律，改变音色），而非从乐谱生成歌声
- 相比 [[ai-game-devtools/musicgen]]（音乐生成），RVC 不生成新音乐，而是对已有音频进行音色替换
- 相比 [[ai-game-devtools/academicodec]]（音频编解码），RVC 是完整的端到端声音转换管线，而非单纯的音频压缩工具
- RVC 的核心竞争力：检索机制杜绝音色泄漏、低数据需求、实时变声能力
