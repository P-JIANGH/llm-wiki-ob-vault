---
title: Stable Video Diffusion
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, diffusion, image-generation, open-source, tool]
sources: [raw/articles/ai-game-devtools/stable-video-diffusion.md]
---

# Stable Video Diffusion (generative-models)

Stability AI 官方生成式模型代码仓库（`sgm` 包），包含 **Stable Video Diffusion (SVD)**、SV3D、SV4D/SV4D 2.0、SDXL 及 SDXL-Turbo 等核心模型的推理和训练代码。MIT 许可（代码），模型权重采用 CreativeML Open RAIL++-M 或研究许可。

## 核心模型

| 模型 | 发布时间 | 功能 | 规格 |
|------|---------|------|------|
| **SVD** | 2023-11 | 图像→视频 | 14帧, 576×1024 |
| **SVD-XT** | 2023-11 | 图像→视频（扩展） | 25帧, 576×1024 |
| **SV3D_u** | 2024-03 | 单图→环绕视频 | 21帧, 576×576 |
| **SV3D_p** | 2024-03 | 单图→指定相机路径环绕视频 | 21帧, 576×576 |
| **SV4D** | 2024-07 | 视频→4D（多视角新视角视频） | 40帧(5×8视角), 576×576 |
| **SV4D 2.0** | 2025-05 | 增强视频→4D | 48帧(12×4视角), 576×576 |
| **SDXL** | 2023-07 | 文本→图像 | 1024×1024, base+refiner |
| **SDXL-Turbo** | 2023-11 | 超快文本→图像 | 对抗扩散蒸馏 |

## 技术架构

### sgm 包结构
- **DiffusionEngine**：主模型类（基于 PyTorch Lightning），统一处理所有扩散模型
- **GeneralConditioner**：单一类处理所有条件输入类型（向量/序列/空间/组合）
- **Denoiser 框架**：连续时间和离散时间去噪器统一框架，离散时间是连续时间的特例
- **Guiders**：分类器免费指导等策略，与采样器解耦
- **Samplers**：模型独立的数值求解器

### 关键模块
- `sgm/modules/attention.py`、`spacetime_attention.py`、`video_attention.py` — 时空注意力机制
- `sgm/modules/diffusionmodules/video_model.py` — 视频扩散模型
- `sgm/modules/diffusionmodules/denoiser.py` — 去噪器（连续/离散时间）
- `sgm/modules/diffusionmodules/guiders.py` — 指导策略（CFG 等）
- `sgm/modules/diffusionmodules/sampling.py` — 采样器
- `sgm/modules/encoders/modules.py` — GeneralConditioner 和嵌入器
- `sgm/models/diffusion.py` — DiffusionEngine 实现
- `sgm/models/autoencoder.py` — 自编码器模型

### 配置驱动设计
YAML 配置定义模型/训练/数据设置，通过 `instantiate_from_config()` 构建和组合子模块。`configs/inference/` 包含 SVD/SV3D/SV4D 推理配置，`configs/example_training/` 提供 MNIST、ImageNet、text2img 等训练示例。

## SVD 架构特点
- 使用 [[ai-game-devtools/stable-diffusion]] SD 2.1 图像编码器
- 替换为时间感知的**去闪烁解码器**（deflickering decoder）
- 支持 Streamlit 和 Gradio 推理界面
- 内置不可见水印检测脚本

## SV4D 2.0 改进（最新）
- 不再依赖 SV3D 生成的第一帧参考多视图，对自遮挡更鲁棒
- 更高保真度、更清晰的运动细节、更好的时空一致性
- 自回归采样支持更长视频生成（每次 12 帧）
- 提供 8 视角模型（5帧×8视角）可选

## 训练框架
- 支持 PyTorch 1.13 和 2.0 双版本
- 损失函数权重、网络预条件、训练噪声水平采样均可独立配置
- 大规模训练使用 Stability-AI/datapipelines（webdataset 格式）

## 与游戏开发的关联
SVD/SV4D 可用于游戏资产生成（角色动画预览、场景漫游视频、道具多视角展示），SV4D 2.0 支持从简短输入视频生成完整的 4D 资产（多视角+时间），是 AI 辅助游戏内容创作的重要工具。[[ai-game-devtools/comfyui]] 和 [[ai-game-devtools/stable-diffusion-web-ui]] 等工具链已集成 SVD 推理支持。

## 相关链接
- GitHub: https://github.com/Stability-AI/generative-models
- HuggingFace (SVD): https://huggingface.co/stabilityai/stable-video-diffusion-img2vid
- HuggingFace (SV4D 2.0): https://huggingface.co/stabilityai/sv4d2.0
- HuggingFace (SV3D): https://huggingface.co/stabilityai/sv3d
- SVD 技术报告: https://stability.ai/research/stable-video-diffusion-scaling-latent-video-diffusion-models-to-large-datasets
- SV4D 2.0 论文: https://arxiv.org/pdf/2503.16396
