---
title: VGen (i2vgen-xl)
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, open-source, tool]
sources: [raw/articles/ai-game-devtools/vgen.md]
---

# VGen (i2vgen-xl)

阿里巴巴通义实验室开源的全景视频生成生态系统，基于扩散模型构建。`i2vgen-xl` 仓库为跳转存根，实际代码位于 `ali-vilab/VGen`。2023 年 9 月 6 日发布，模型权重和代码均已开源。

## 核心模型

| 模型 | 功能 | 亮点 |
|------|------|------|
| **I2VGen-XL** | 图像→视频 | 两阶段架构：低分辨率语义匹配 + VLDM 升频至 1280×720，~2 分钟推理 |
| **T2V** | 文本→视频 | YAML 配置驱动训练/推理，支持 ModelScope 预训练权重 |
| **HiGen** | T2V + 超分 | 文本生成视频 + SR600 超分辨率后处理 |
| **DreamVideo** | 主体+运动定制 | Textual Inversion + Identity Adapter 主体学习 + 运动模式学习，支持联合推理 |
| **TF-T2V** | 高性能 T2V（CVPR 2024）| 16/32 帧模式，超分仅支持 32 帧，组合生成最高 896×512 |

## 技术架构

- **模块化注册系统：** ENGINE / MODEL / DATASETS / EMBEDDER / AUTO_ENCODER / VISUAL / DIFFUSION / PRETRAIN
- **I2VGen-XL 两阶段流水线：**
  1. 低分辨率阶段：保证生成结果与输入图像语义匹配
  2. 视频潜扩散模型（VLDM）：提升至 1280×720，同时增强时空一致性
- **训练数据：** 多风格视频数据集（科技感/电影色/卡通/素描）
- **已知限制：** 对动漫图像和纯黑背景表现不佳（训练数据缺口）

## 技术栈

- Python 3.8 + PyTorch 1.12.0 (CUDA 11.3)
- FFmpeg（视频处理必需）
- ModelScope / HuggingFace 权重分发
- Gradio 本地 Web UI（`gradio_app.py`）
- YAML 配置驱动（`configs/*.yaml`）

## 与同类工具对比

- 相比 [[ai-game-devtools/stable-video-diffusion]]（Stability AI SVD），VGen 专注图像引导的高质量视频生成，采用独特的两阶段升频架构
- 相比 [[ai-game-devtools/cogvideox]]（智谱 CogVideoX），VGen 更早开源（2023.09）且提供完整的主体/运动定制管线（DreamVideo）
- 同为阿里体系，与 [[ai-game-devtools/agentscope]]（通义 Agent 框架）共享通义实验室背景，但属于不同的产品方向

## 相关链接

- GitHub: [ali-vilab/i2vgen-xl](https://github.com/ali-vilab/i2vgen-xl)（跳转存根）→ [ali-vilab/VGen](https://github.com/ali-vilab/VGen)（实际代码）
- ModelScope: [damo/I2VGen-XL](https://modelscope.cn/models/damo/I2VGen-XL)
- HuggingFace: [damo-vilab/i2vgen-xl](https://huggingface.co/damo-vilab/i2vgen-xl)
