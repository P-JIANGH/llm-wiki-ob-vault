---
title: ToonComposer
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [animation, video, tool, open-source, diffusion]
sources: [raw/articles/ai-game-devtools/tooncomposer.md]
---

# ToonComposer

**ICLR 2026** — TencentARC 开源的卡通制作生成式后关键帧（Generative Post-Keyframing）工具，将传统动画制作中耗时的中间帧绘制和上色流程整合为单一的 AI 生成过程。

## 概述

ToonComposer 面向卡通/动漫生产管线，通过生成式 AI 替代传统手工中间帧（inbetweening）和上色（colorization）环节。艺术家只需提供关键帧草图和颜色参考，模型即可自动生成完整的动画序列。

## 核心信息

| 项目 | 详情 |
|------|------|
| **论文** | ToonComposer: Streamlining Cartoon Production with Generative Post-Keyframing (ICLR 2026) |
| **组织** | TencentARC |
| **arXiv** | [2508.10881](https://arxiv.org/abs/2508.10881) |
| **项目页** | https://lg-li.github.io/project/tooncomposer |
| **模型权重** | https://huggingface.co/TencentARC/ToonComposer |
| **在线 Demo** | https://huggingface.co/spaces/TencentARC/ToonComposer |
| **许可证** | 仓库 LICENSE 文件（待确认具体许可类型） |

## 技术特点

### 架构
- **基础模型**: 基于 Wan-AI/Wan2.1-I2V-14B-480P（图像到视频扩散模型）
- **微调权重**: TencentARC/ToonComposer 专用检查点
- **交互界面**: Gradio Web UI（要求 `gradio==5.25.2`）

### 生成能力
- **输入**: 关键帧草图 + 颜色掩码（sketch + mask）
- **输出**: 完整卡通动画序列（480p 或 608p 分辨率，61 帧）
- **可调参数**: seed、steps、CFG scale、pos-aware residual scale、草图/掩码输入

### 硬件要求
- **480p / 61 帧**: ~57GB VRAM
- **低显存方案**: 使用 Hugging Face Spaces 在线 Demo

## 部署

```bash
conda create -n tooncomposer python=3.10 -y
conda activate tooncomposer
pip install -r requirements.txt
pip install flash_attn  # Linux 性能优化
python app.py  # → http://localhost:7860
```

权重支持环境变量本地加载：
- `WAN21_I2V_DIR` — Wan2.1 模型路径
- `TOONCOMPOSER_DIR` — ToonComposer 检查点路径

## 与同类工具差异

- vs [[ai-game-devtools/animatediff]]: AnimateDiff 是通用视频扩散的运动模块插件；ToonComposer 是专门的卡通生产管线，针对卡通风格的后关键帧补间和上色做了端到端优化
- vs [[ai-game-devtools/index-anisora]]: Index-Anisora 侧重动漫风格视频生成（支持多风格）；ToonComposer 聚焦动画制作流程中的关键帧到成品动画的补全环节
- vs [[ai-game-devtools/animate-anyone]]: AnimateAnyone 是基于姿态序列的角色动画；ToonComposer 基于草图+颜色掩码，面向完整的卡通生产管线

## 发布时间线

- **2025-08-15**: 模型权重发布于 Hugging Face
- **2025-08-18**: Hugging Face Spaces 在线 Demo 上线

## 引用

```bibtex
@article{li2025tooncomposer,
  title={ToonComposer: Streamlining Cartoon Production with Generative Post-Keyframing},
  author={Li, Lingen and Wang, Guangzhi and Zhang, Zhaoyang and Li, Yaowei and Li, Xiaoyu and Dou, Qi and Gu, Jinwei and Xue, Tianfan and Shan, Ying},
  journal={arXiv preprint 2508.10881},
  year={2025}
}
```
