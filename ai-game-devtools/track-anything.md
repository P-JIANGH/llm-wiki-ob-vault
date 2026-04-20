---
title: Track-Anything
created: 2026-04-20
updated: 2026-04-20
type: entity
tags: [video, image-segmentation, open-source, tool]
sources: [raw/articles/ai-game-devtools/track-anything.md]
---

# Track-Anything

> SUSTech VIP Lab 开源视频目标跟踪与分割交互工具：SAM + XMem + E2FGVI 三模型管线，支持点击指定任意目标、多目标跟踪、视频修复，ArXiv 2023，MIT

**GitHub:** https://github.com/gaomingqi/Track-Anything  
**ArXiv:** https://arxiv.org/abs/2304.11968  
**Demo:** https://huggingface.co/spaces/VIPLab/Track-Anything  
**License:** MIT  
**Author:** Mingqi Gao (SUSTech VIP Lab)  
**Release:** 2023-04-14

## Overview

Track-Anything 是一个基于 [Segment Anything (SAM)](https://github.com/facebookresearch/segment-anything) 的灵活交互式视频目标跟踪与分割工具。用户只需通过点击即可指定要跟踪和分割的任意目标，并在跟踪过程中灵活更换目标或修正感兴趣区域。

**适用场景：**
- 镜头切换场景下的视频目标跟踪与分割
- 视频目标跟踪与分割的可视化开发和数据标注
- 以目标为中心的视频下游任务（视频修复、视频编辑）

## Architecture

### 三模型集成管线

Track-Anything 将三个独立模型串联为端到端管线：

| 模块 | 基础模型 | 功能 |
|------|----------|------|
| SAM Controller | Segment Anything (SAM) | 点击交互生成像素级分割掩码 |
| BaseTracker | XMem | 视频对象跟踪，将模板掩码传播到后续帧 |
| BaseInpainter | E2FGVI | 视频修复，基于掩码移除/替换目标区域 |

### 工作流程

1. **上传视频** → 提取所有帧（内存监控，>90% RAM 自动停止）
2. **点击第一帧** → SAM 生成分割掩码（支持正/负点交互修正）
3. **多掩码管理** → 可同时添加多个目标掩码
4. **XMem 跟踪** → 将模板掩码传播到后续帧，生成跟踪结果
5. **E2FGVI 修复** → 基于跟踪掩码进行视频 inpainting

### 核心类

```python
class TrackingAnything:
    def __init__(self, sam_checkpoint, xmem_checkpoint, e2fgvi_checkpoint, args):
        self.samcontroler = SamControler(sam_checkpoint, args.sam_model_type, args.device)
        self.xmem = BaseTracker(xmem_checkpoint, device=args.device)
        self.baseinpainter = BaseInpainter(e2fgvi_checkpoint, args.device)

    def first_frame_click(self, image, points, labels, multimask=True):
        # SAM 第一帧点击生成分割
        ...

    def generator(self, images: list, template_mask):
        # XMem 跟踪：逐帧传播模板掩码
        ...
```

## Key Features

- **交互式点击分割**：正/负点交互，SAM 实时生成分割掩码
- **多目标跟踪**：同时跟踪多个目标，每个目标独立掩码
- **灵活修正**：跟踪过程中可随时更换目标或修正分割区域
- **镜头切换支持**：通过更换模板帧处理场景切换
- **视频修复**：基于跟踪掩码的 E2FGVI 视频 inpainting
- **内存解耦**：改进的修复流程，GPU 显存与视频长度解耦，支持任意长度视频
- **SAM 模型可切换**：支持 vit_h（默认）/ vit_l / vit_b，vit_b 适用于低显存场景
- **Gradio Web UI**：完整的交互式网页界面
- **掩码保存**：可选将跟踪掩码保存为 .npy 文件

## Dependencies

- **segment-anything**（Facebook Research）— 零样本图像分割
- **XMem**（hkchengrex）— 视频对象分割与跟踪
- **E2FGVI**（MCG-NKU）— 端到端视频修复
- **Gradio** — Web UI 框架
- **OpenCV, NumPy, PyTorch, torchvision** — 图像处理与深度学习
- **mmcv** — 卷积模块（通过 openmim 自动安装）

## Comparison with Related Tools

| 特性 | Track-Anything | [[segment-anything-2]] | [[grounded-segment-anything]] |
|------|---------------|----------------------|-------------------------------|
| 视频跟踪 | ✅ XMem 传播 | ✅ 原生支持 | ❌ 仅图像 |
| 交互修正 | ✅ 点击交互 | ✅ 点/框提示 | ❌ 仅文本提示 |
| 视频修复 | ✅ E2FGVI 集成 | ❌ | ❌ |
| 多目标 | ✅ 同时跟踪 | ✅ 多对象 | ✅ 多对象 |
| 许可证 | MIT | Apache 2.0 | Apache 2.0 |

## Related Projects from Same Lab

- **Caption-Anything** — Segment Anything + Visual Captioning + ChatGPT 组合
- **SAM-Body4D** — 视频中人体网格生成（Beyond video segmentation）

## References

- [[segment-anything-2]] — Meta SAM 2，通用视频分割基础模型
- [[grounded-segment-anything]] — GroundingDINO + SAM 开放词汇分割流水线
- [[animate-diff]] — 视频动画扩散模型，与 Track-Anything 同属视频生成/处理工具
