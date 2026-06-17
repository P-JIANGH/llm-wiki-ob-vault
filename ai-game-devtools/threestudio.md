---
title: threestudio
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, open-source, tool, diffusion]
sources: [raw/articles/ai-game-devtools/threestudio.md]
---

# threestudio — 3D 内容生成统一框架

> threestudio-project 维护的统一 3D 内容创建框架，通过提升 2D 文本到图像生成模型，支持从文本提示、单张图像和少样本图像生成 3D 内容。

## Overview

**threestudio** 是一个基于 PyTorch 的开源 3D 内容生成框架，采用插件式架构，通过 OmegaConf YAML 配置驱动。核心理念是将 2D 扩散模型（如 Stable Diffusion、DeepFloyd IF）的生成能力"提升"到 3D 空间，实现文本到 3D、图像到 3D 的生成。

框架使用 **SDS（Score Distillation Sampling）** 损失函数从预训练 2D 扩散模型中提取梯度，优化 3D 表示（NeRF、DMTet、高斯溅射等），最终可导出标准 OBJ 网格供游戏引擎使用。

## Architecture

### 插件式架构

threestudio 采用四大可插拔模块，通过 `@threestudio.register()` 装饰器注册新组件：

| 模块 | 路径 | 功能 |
|------|------|------|
| **Systems** | `threestudio/systems/` | 训练和推理管线，组合所有组件 |
| **Models** | `threestudio/models/` | 3D 表示（NeRF、DMTet、VolumeSDF、Gaussian Splatting） |
| **Guidance** | `threestudio/models/guidance/` | 2D 扩散模型后端（SD、IF、Zero123 等），提供梯度信号 |
| **Data** | `threestudio/data/` | 数据集和数据加载器，支持多种输入模态 |

### 启动入口

- `launch.py`：训练/导出主入口，`--config <yaml> --train/--export --gpu <id>`
- `gradio_app.py`：Web 演示界面，支持交互式文本/图像输入

## Supported Methods

| 方法 | 输入 | 特点 |
|------|------|------|
| **DreamFusion / Magic3D** | 文本 | 粗 NeRF → DMTet 网格细化 |
| **SDI** | 文本 | SDS + DDIM 反演，解决过模糊，细节更锐利 |
| **ProlificDreamer** | 文本 | 三阶段：NeRF → 几何细化 → 纹理（VSD 引导），~30GB VRAM |
| **HiFA** | 文本/图像 | 套件：图像空间 SDS、z-方差损失、噪声退火 |
| **Zero-1-to-3 / Stable Zero123** | 单图 | 图像条件 3D 生成 |
| **Magic123** | 单图 | Zero123 + SD 联合引导 |
| **InstructNeRF2NeRF** | 图像/视频 | 指令跟随 3D 编辑 |
| **Gaussian Splatting** | 多种 | 3DGS 快速渲染 |
| **MVDream** | 多种 | 多视角扩散 3D 生成 |

## VRAM Optimization

内置多种显存优化选项（按推荐顺序）：
1. `system.cleanup_after_validation_step` - 验证后清理 VRAM
2. `system.guidance.enable_memory_efficient_attention` - PyTorch 注意力优化
3. `system.guidance.enable_attention_slicing` - 节省 ~20% VRAM，速度降 20%
4. `system.guidance.token_merging` - 大幅加速，可能降低质量
5. `system.guidance.enable_sequential_cpu_offload` - 最大节省 VRAM，极慢

## 质量提升技巧

- 增大批量：`data.batch_size=N` 或 `trainer.accumulate_grad_batches=N`
- 延长训练：`trainer.max_steps=N`
- 更换种子避免 Janus（多面）问题
- 提示去偏：`system.prompt_processor.use_prompt_debiasing=true`
- Perp-Neg：`system.prompt_processor.use_perp_neg=true`（缓解多面伪影）

## Game Dev Relevance

- **3D 资产快速原型**：文本提示直接生成游戏可用的 3D 模型
- **标准化输出**：支持导出 OBJ+MTL 格式，可直接导入 Unity/Unreal
- **统一框架**：一个工具集成多种 3D 生成算法（DreamFusion、Gaussian Splatting、InstructNeRF2NeRF 等）
- **可扩展**：插件式架构允许添加新的 3D 表示和引导方法

## Limitations

- 高质量方法（DeepFloyd IF）需要 >20GB VRAM
- 训练时间较长（默认 10,000 次迭代）
- Janus（多面）问题仍可能出现，需要调参缓解

## Related

- [[stable-dreamfusion]]：同一作者（Jiaxiang Tang）的 DreamFusion 早期实现，threestudio 是其后续更完善的框架版本
- [[gaussiandreamer]]：用 3DGS 替代 NeRF 的文本到 3D 生成，threestudio 支持 Gaussian Splatting 作为后端
- [[mvdream]]：多视角扩散模型，threestudio 内置支持
- [[dreamgaussian4d]]：4D 高斯生成，threestudio 扩展支持动态 3D 内容
- 基于 [[stable-diffusion]] 生态作为 2D 扩散先验

## Links

- **GitHub:** https://github.com/threestudio-project/threestudio
- **License:** Apache-2.0
