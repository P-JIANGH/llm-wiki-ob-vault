---
title: Paints-Undo
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [image-generation, diffusion, open-source, tool, video]
sources: [raw/articles/ai-game-devtools/paints-undo.md]
---

# Paints-Undo

## Overview
Paints-Undo 是由 **lllyasviel**（ControlNet 作者）开发的数字绘画行为基础模型。它接收一张完成的图像作为输入，输出该图像的绘画序列——模拟在数字绘画软件中反复按 Ctrl+Z（撤销）的过程。

## 核心功能
- **输入**：一张完成的图像
- **输出**：绘画过程的视频序列（草图→线稿→上色→阴影等完整流程）
- **模拟行为**：草图绘制、勾线、上色、明暗处理、变换、左右翻转、色彩曲线调整、图层可见性切换、创作思路变更等
- **处理时间**：5-10 分钟/张图，输出约 25 秒视频（4 FPS，320×512 或变体分辨率）

## 模型架构

### 单帧模型 (paints_undo_single_frame)
- 基于修改版 **SD1.5** 架构
- 自定义 beta 调度器：`linear(0.00085, 0.020, 1000)`（与原版 SD1.5 不同）
- CLIP Skip = 2（CLIP ViT-L/14 最后一层永久移除）
- `operation step` 条件注入层嵌入（类似 SDXL 的 extra embeddings）
- 输入：图像 + 操作步数（0-999，0=完成品，999=白画布上的第一笔）
- 必须使用 **WD14 tagger** 自动生成提示词

### 多帧模型 (paints_undo_multi_frame)
- 从 VideoCrafter 恢复但完全重写
- 5 大组件：3D-UNet、VAE（来自 ToonCrafter）、CLIP（SD2.1）、CLIP-Vision（ViT/H）、Image Projection
- 输入两张图像 → 输出 16 帧中间过渡画面
- 支持空间自注意力中的时间窗口（prv/first/roll 三种模式）
- 自定义 CLIP-Vision 通过最近邻插值支持任意宽高比

## 推理流程
1. 单帧模型在多个撤销步数下生成 5-7 个"关键帧"
2. 多帧模型在相邻关键帧间插值
3. 最终视频：100-500 帧

## 硬件要求
- 测试环境：24GB VRAM（RTX 4090 / 3090TI）
- 理论最低：10-12.5GB（极限优化：权重卸载 + 切片注意力）
- 不支持 8GB VRAM

## 技术栈
- **框架**：Diffusers 0.28.0、Gradio 4.31.5
- **依赖**：xformers、bitsandbytes、accelerate、peft、safetensors
- **代码规模**：gradio_app.py（324 行）+ diffusers_vdm 管道 + diffusers_helper 工具

## 许可证
Apache 2.0

## 相关链接
- GitHub: https://github.com/lllyasviel/Paints-UNDO
- 示例页面: https://lllyasviel.github.io/pages/paints_undo/
- PaintsAlter（后继项目）: https://lllyasviel.github.io/paints_alter_web/

## 与同类工具的差异
| 特性 | Paints-Undo | 其他绘画过程工具 |
|------|-------------|-----------------|
| 方法 | 基于扩散模型的行为模拟 | 强化学习/神经网络笔触预测 |
| 输入 | 单张完成图像 | 通常需要序列数据或手动配置 |
| 输出 | 完整绘画过程视频 | 单帧笔触或有限步骤 |
| 行为多样性 | 包含草图/上色/思路变更等全链路行为 | 通常仅覆盖单一行为 |
| 提示词 | 严格依赖 WD14 自动标签 | 支持自定义提示词 |

## 相关项目
- [[controlnet]] — 同为 lllyasviel 项目，ControlNet 为扩散模型添加空间条件控制
- [[comfyui]] — 可集成 Paints-Undo 作为节点使用
- [[tooncrafter]] — VAE 来源，动画插值模型
