---
title: DiffSynth-Studio
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [diffusion, image-generation, video, tool, open-source, ai-model, framework, python]
sources: [raw/articles/ai-game-devtools/diffsynth-studio.md]
---

# DiffSynth-Studio

**DiffSynth-Studio** 是由 ModelScope 社区开发的开源扩散模型（Diffusion Model）引擎，专注于前沿技术探索和学术研究。配套的 [[diffsynth-engine]] 面向工业级稳定部署。

## 概述

DiffSynth-Studio 重新设计了主流扩散模型（FLUX、Wan、Qwen-Image 等）的推理和训练流水线，实现了高效的显存管理和灵活的模型训练。支持从 6GB 到 24GB 显存的设备运行大型扩散模型。

PyPI 包名：`diffsynth`（v2.0.9），Apache-2.0 许可，Python >=3.10.1。

## 核心特性

### 显存管理
- **层级别磁盘卸载**（layer-level disk offload）：同时释放内存和显存
- **FP8 精度支持**：训练时对非训练模型使用 FP8
- **序列并行**：支持大规模模型的序列并行推理
- **最低 6GB 显存**即可运行部分视频模型（如 HunyuanVideo 512x384）

### 训练框架
- **Split Training**：自动将训练分为数据处理和训练两阶段，减少显存需求
- **Differential LoRA Training**：源自 ArtAug 的 LoRA 训练技术
- **FP8 Training**：任意非梯度模型均可使用 FP8 精度

### 支持的模型家族

| 类别 | 代表模型 |
|------|---------|
| 图像生成 | Z-Image Turbo、FLUX.1/2、Anima、Qwen-Image、ERNIE-Image |
| 视频生成 | Wan 2.1/2.2、HunyuanVideo、CogVideoX、StepVideo、LTX-2、MOVA |
| 图像编辑 | Qwen-Image-Edit、In-Context Control、Blockwise ControlNet |
| 特殊用途 | EliGen（实体级控制）、Nexus-Gen（统一理解+生成）、ArtAug |

每个主要模型均支持：推理、低显存推理、全量训练、LoRA 训练及验证。

## 技术架构

```
diffsynth/
├── configs/        # 配置文件
├── core/           # 核心引擎组件
├── diffusion/      # 扩散模型实现
├── models/         # 模型定义
├── pipelines/      # 推理/训练流水线
├── utils/          # 工具函数
└── version.py      # 版本信息
```

### 关键设计模式
- `ModelConfig` 统一配置接口：指定模型 ID、文件模式、显存策略
- `Pipeline.from_pretrained()` 标准化加载流程
- VRAM 策略配置：offload/onload/preparing/computation 四级精度和设备控制
- 兼容 ModelScope 和 HuggingFace 双模型源

## 与同类工具差异

| 维度 | DiffSynth-Studio | diffusers | ComfyUI |
|------|-----------------|-----------|---------|
| 定位 | 学术探索 + 快速模型接入 | 通用推理框架 | 节点式可视化工作流 |
| 显存管理 | 层级别磁盘卸载，极低显存需求 | 基础 offload | 依赖节点配置 |
| 训练支持 | 内置全量/LoRA/分阶段训练 | 有限 | 有限 |
| 模型响应速度 | 新模型发布后快速适配 | 社区驱动，较慢 | 插件驱动 |
| 主要社区 | ModelScope | HuggingFace | ComfyUI 社区 |

## 重要衍生项目

- **[[exvideo]]** — 将 SVD 扩展到 128 帧长视频生成
- **[[diffutoon]]** — 卡通上色解决方案（IJCAI 2024）
- **EliGen** — 实体级控制图像生成框架
- **Nexus-Gen** — 统一图像理解、生成、编辑框架
- **ArtAug** — 合成-理解交互提升图像质量

## 相关链接

- GitHub: https://github.com/modelscope/DiffSynth-Studio
- PyPI: https://pypi.org/project/DiffSynth/
- 文档（中文）: https://diffsynth-studio-doc.readthedocs.io/zh-cn/latest/
- 文档（英文）: https://diffsynth-studio-doc.readthedocs.io/en/latest/
- ModelScope AIGC: https://modelscope.cn/aigc/home
- Discord: https://discord.gg/Mm9suEeUDc
