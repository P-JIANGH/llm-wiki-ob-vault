---
title: ThinkSound
created: 2026-04-21
updated: 2026-04-21
type: entity
tags: [audio, flow-matching, multimodal, diffusion, video, open-source, tool, ai]
sources: [raw/articles/ai-game-devtools/think-sound.md]
---

# ThinkSound — Chain-of-Thought 引导的统一 Any2Audio 生成框架

> **NeurIPS 2025 Main Conference** | Huadai Liu (浙江大学), Jialei Wang, Kaicheng Luo, Wen Wang, Qian Chen, Zhou Zhao, Wei Xue

## Overview
ThinkSound 是一个统一的 **Any2Audio 生成框架**，由多模态大语言模型（MLLM）的 **Chain-of-Thought (CoT) 推理**引导，通过 **Flow Matching（流匹配）** 实现音频生成。支持从视频、文本、音频或其任意组合生成和编辑音频，核心创新是将音频生成/编辑分解为三个交互式阶段。

## 核心特性

| 特性 | 描述 |
|------|------|
| **Any2Audio** | 从任意模态（视频/文本/音频/组合）生成音频 |
| **CoT 驱动推理** | MLLM 逐步推理实现组合化和可控音频生成 |
| **Video-to-Audio SOTA** | 多个 V2A 基准测试上达到最优结果 |
| **对象级交互编辑** | 点击视觉对象或文本指令精炼特定声音事件 |
| **统一框架** | 单一基础模型支持生成、编辑和交互式工作流 |

## 技术架构

### 三阶段管线
1. **Foley Generation（音效生成）**: 从视频生成语义和时间对齐的基础音效
2. **Object-Centric Refinement（对象级精炼）**: 用户点击/框选视频中的物体来添加/精炼声音
3. **Targeted Audio Editing（目标音频编辑）**: 使用自然语言指令修改已生成音频

### 核心组件
- **MM-DiT 骨干**: 多模态扩散 Transformer，处理视觉/文本/音频联合条件
- **音频 VAE**: 微调的 Stable Audio Open VAE，44.1kHz 高保真编解码
- **条件编码器**: MetaCLIP（视觉特征）+ Synchformer（同步特征）
- **Flow Matching**: Rectified Flow 架构，24 步 Euler 离散采样，CFG Scale=5
- **torch.compile**: 可选的模型编译加速

### 关键文件
```
ThinkSound/
├── app.py                 # Gradio Web UI（两步管线：特征提取→推理）
├── predict.py             # 推理：采样→VAE 解码→WAV 输出
├── extract_latents.py     # 视频→CoT latents（metaclip+sync 特征）
├── train.py               # 训练/微调入口
├── ThinkSound/models/     # 核心模型定义
└── data_utils/v2a_utils/  # V2A 数据集+特征处理
```

## 使用方式
```bash
# 安装
conda create -n thinksound python=3.10
pip install thinksound
conda install -c conda-forge 'ffmpeg<7'

# Gradio Web UI（上传视频→生成音频）
python app.py

# CLI：单视频 demo
./scripts/demo.sh <video> <title> <CoT description> [use-half]

# 批量推理
./scripts/eval_batch.sh <video_dir> <csv_path> <save_dir> [use-half]
```

## 训练与微调
- 训练代码已公开（2025.07.17 更新），支持自定义数据微调
- 使用 [[ai-game-devtools/audiocoat]] 数据集（CoT 标注的大型音频数据集）
- Windows 用户可通过 `setup_windows.bat` 一键安装所有依赖

## 许可证
- **代码**: Apache 2.0
- **模型/数据集**: 仅限研究和教育用途，**禁止商业使用**
- **Stable Audio Open VAE**: Stability AI Community License（需 Stability AI 许可才能商用）

## 与同类工具对比
- 相比 [[mmaudio]]（CVPR 2025 视频→音频，Flow Matching + 联合训练），ThinkSound 引入 CoT 推理引导，支持三阶段交互式生成/编辑流程，且统一了 Any2Audio 范式
- 相比 [[foley-crafter]]（视频→Foley 音效，ControlNet 适配器），ThinkSound 不依赖 ControlNet，采用 MM-DiT + Flow Matching 架构，支持对象级交互编辑和文本指令编辑
- 相比 [[hunyuanvideo-foley]]（腾讯混元端到端视频音效），ThinkSound 为学术开源项目，支持更灵活的多模态条件和交互式编辑，但规模较小

## 游戏开发应用价值
ThinkSound 为游戏音频管线提供：
1. **自动 Foley 音效**：从游戏动画/过场自动生成匹配音效
2. **交互式音效编辑**：点击场景中的物体修改/添加特定声音
3. **文本定制音效**：自然语言指令生成定制化游戏音效
4. **多模态条件**：同时利用游戏画面和文本描述生成音效

## 相关链接
- [GitHub](https://github.com/FunAudioLLM/ThinkSound)
- [论文 (arXiv)](https://arxiv.org/abs/2506.21448)
- [项目主页](https://thinksound-project.github.io/)
- [HuggingFace Spaces](https://huggingface.co/spaces/FunAudioLLM/ThinkSound)
- [ModelScope Demo](https://modelscope.cn/studios/iic/ThinkSound)
- [AudioCoT 数据集](https://huggingface.co/datasets/liuhuadai/AudioCoT)

## 致谢依赖
[[mmaudio]] (MM-DiT 骨干实现), Stable Audio Open (VAE 架构), Synchformer (视频同步编码器)
