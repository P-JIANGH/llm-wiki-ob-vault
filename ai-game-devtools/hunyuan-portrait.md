---
title: HunyuanPortrait
created: 2026-04-19
updated: 2026-04-19
type: entity
tags: [avatar, diffusion, tool, open-source, python]
sources: [raw/articles/ai-game-devtools/hunyuan-portrait.md]
---

# HunyuanPortrait

## Overview

腾讯混元团队 CVPR 2025 论文项目，基于扩散模型的肖像动画生成框架。通过预训练编码器解耦身份和运动，将驱动视频的表情/姿态编码为隐式控制信号，通过注意力适配器注入扩散主干，从单张参考图像生成逼真、时序一致的肖像动画。

论文标题：**HunyuanPortrait: Implicit Condition Control for Enhanced Portrait Animation**

## Key Facts

| 属性 | 值 |
|------|------|
| 发表 | CVPR 2025 (pp.15909-15919) |
| 作者 | 腾讯混元团队 (Xu Zunnan, Yu Zhentao 等) |
| arXiv | 2503.18860 |
| 代码 | https://github.com/Tencent-Hunyuan/HunyuanPortrait |
| HuggingFace | tencent/HunyuanPortrait |
| 最低硬件 | NVIDIA RTX 3090 (24GB VRAM) |
| 许可证 | 学术研究用途（无明确开源协议） |

## Architecture

### 核心管线
- **主干网络:** Stable Video Diffusion (SVD) UNet3D，来自 StabilityAI SVD-XT
- **图像编码器:** DINOv2 ViT-Large + 6层视觉适配器（第3/7/11/15/19/23层）
- **身份编码:** ArcFace ONNX 模型（512维特征向量）
- **运动编码三模块:**
  - `HeadExpression` — 面部表情特征提取（512维输入）
  - `HeadPose` — 头部旋转/平移参数估计
  - `IntensityAwareMotionRefiner` — 运动特征精炼（64个query，1018维输出）
- **Pose Guider** — DW pose 关键点条件化网络（4层：16→32→96→256通道）
- **ImageProjector** — DINOv2特征投影到UNet token空间（261个image token）
- **调度器:** EulerDiscreteScheduler

### 处理流程
1. YOLOFace v5m 检测源图像人脸区域
2. ArcFace 提取身份特征（可选）
3. 驱动视频提取表情+姿态序列（分批处理，默认25帧/批）
4. 前后各填充15帧软过渡（线性插值渐变）
5. SVD扩散模型生成512×512面部动画序列（25步去噪）
6. 软掩码边缘混合，将生成面部贴回原始分辨率

## Technical Specs

- **输出分辨率:** 512×512（面部裁剪）→ 贴回原始分辨率
- **默认参数:** 25步去噪、FP16、单GPU 24GB
- **批处理:** 25帧/批，3帧重叠窗口
- **帧率:** 12.5 FPS（可配置）
- **引导系数:** 外观引导 2.0，运动引导 2.0

## 与同类工具差异

相比 [[hallo]] 和 [[aniportrait]] 等音频驱动方案，HunyuanPortrait 采用**视频驱动**（而非纯音频），能捕捉更精细的面部表情和头部姿态变化。与 [[ditto-talkinghead]] 的实时流式推理不同，HunyuanPortrait 侧重于高质量离线生成，适合游戏过场动画和 NPC 肖像制作。

## 游戏开发应用

- NPC 肖像动画（驱动视频→角色面部动画）
- 角色表演 / 面部重演
- 肖像演唱视频生成
- 游戏过场动画面部表情迁移

## Related

- [[hallo]] — 复旦音频驱动肖像动画（SD 1.5+AnimateDiff）
- [[hallo2]] — 复旦长时高分辨率肖像动画
- [[aniportrait]] — 腾讯游戏知几音频驱动肖像
- [[ditto-talkinghead]] — 蚂蚁实时说话头部合成
- [[hunyuan-dit]] — 腾讯混元 DiT 图像生成
- [[hunyuan3d-2-1]] — 腾讯混元3D资产生成
