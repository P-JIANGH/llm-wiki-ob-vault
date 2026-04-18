---
title: Unique3D
created: 2026-04-18
updated: 2026-04-18
type: entity
tags: [3d, image-generation, tool, open-source]
sources: [raw/articles/ai-game-devtools/unique3d.md]
---

# Unique3D

**Tsinghua University** 单图→高质量3D网格生成工具，~30秒完成从单张正面图到带纹理GLB网格的完整管线。arXiv:2405.20343，2024年5月。

## 概述

Unique3D 采用四阶段管线：**多视图扩散生成 → 法线预测 → 微分网格重建 → 纹理投影**。输入单张正视图，输出正面/右/背/左四视角一致的带纹理3D网格。与 [[ai-game-devtools/crm]] 和 [[ai-game-devtools/hunyuan3d-2-0]] 相比，Unique3D 强调推理速度（30秒）和网格质量（法线引导优化）。

## 核心架构

### 四阶段管线

| 阶段 | 输入 | 输出 | 核心技术 |
|------|------|------|----------|
| 1. 多视图扩散 | 单张RGBA图 | 4视角RGB图(256²) | Stable Diffusion + ControlNet Tile + IP-Adapter |
| 2. 法线预测 | 4视角RGB | 4视角法线图(512²) | 图像→法线扩散模型，guidance=1.5 |
| 3a. 粗网格 | 前后法线图 | 初始mesh | 正反面投影+Poisson平滑 |
| 3b. 网格优化 | 4法线图+粗mesh | 优化mesh(200步) | nvdiffrast微分渲染+自适应边长优化 |
| 3c. 网格精炼 | 优化mesh+法线 | 精炼mesh(100步) | 边长衰减(0.02→0.005)，每20步更新法线 |
| 4. 纹理投影 | 精炼mesh+4RGB | 带纹理GLB | 多视角颜色投影+置信度过滤(0.2) |

### 关键技术特点

- **法线引导优化**：使用可微分法线渲染器（nvdiffrast），通过最小化渲染法线与目标法线的L2损失来优化网格顶点和面
- **连续重网格化**（Continuous Remeshing）：自适应边长控制，从粗到细渐进优化
- **IP-Adapter 身份保持**：在多视图生成中保留输入图像的视觉特征
- **RealESRGAN 超分**：低分辨率输入自动上采样（ONNX跨平台）
- **PyMeshLab 后处理**：最终网格平滑+细分

## 技术栈

- **框架**：PyTorch 2.3.1 + CUDA 12.1 + diffusers 0.27.2
- **3D引擎**：PyTorch3D（网格操作）+ nvdiffrast（可微渲染）+ PyMeshLab（网格处理）
- **UI**：Gradio 交互式界面 + ComfyUI 集成
- **跨平台**：Linux/Windows/Docker 支持

## 使用建议

- **最佳输入**：正交正面视角、无遮挡、高分辨率图像
- **已知限制**：遮挡区域重建质量差（4视角无法完全覆盖）；输入图需包含物体最长边
- **推理速度**：本地Gradio > HuggingFace Demo > 在线Demo

## 相关链接

- [GitHub](https://github.com/AiuniAI/Unique3D)
- [Paper](https://arxiv.org/abs/2405.20343)
- [Project Page](https://wukailu.github.io/Unique3D/)
- [HuggingFace Demo](https://huggingface.co/spaces/Wuvin/Unique3D)
- [在线Demo](https://aiuni.ai/#/modeling)

## 许可

仓库未明确声明许可证（需查看仓库确认）

## 与同类工具对比

与 [[ai-game-devtools/stable-fast-3d]]（TripoSR改进版，<0.5秒但质量较低）和 [[ai-game-devtools/threestudio]]（统一框架但需SDS优化数十分钟）相比，Unique3D 在速度和质量之间取得平衡：30秒生成高质量网格，但需要手动下载权重且依赖较多。[[ai-game-devtools/crm]] 同样实现单图→3D网格（10秒），但使用FlexiCubes而非微分优化。
