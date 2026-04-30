---
title: "Depth Anything V2"
created: 2026-04-17
updated: 2026-04-17
type: entity
tags: [ai, ml, tool, depth-estimation, computer-vision, open-source, python, dino-vision-transformer]
sources: [raw/articles/ai-game-devtools/depth-anything-v2.md]
---

# Depth Anything V2

HKU + TikTok 开源的单目深度估计模型，基于 DINOv2 ViT 骨干 + DPT 解码头。相比 V1 在细节和鲁棒性上显著提升，相比 SD 基模型推理更快、参数更少、精度更高。

**GitHub:** https://github.com/DepthAnything/Depth-Anything-V2  
**Paper:** arXiv 2406.09414  
**HuggingFace Demo:** https://huggingface.co/spaces/depth-anything/Depth-Anything-V2

## Architecture

```
Input Image (H×W×3)
  ↓
DINOv2 ViT Backbone (patch_size=14)
  ├─ Extract 4 intermediate features at layer indices
  │   V2-Small/Base: layers [2, 5, 8, 11]
  │   V2-Large:      layers [4, 11, 17, 23]
  │   V2-Giant:      layers [9, 19, 29, 39]
  ↓
DPT Head (Dense Prediction Transformer)
  ├─ 4× Project layers (1×1 conv to align channels)
  ├─ 4× Resize layers (TransposeConv/Identity/Conv)
  ├─ 4× FeatureFusionBlock (cross-scale refinement)
  │   path_4 → path_3 → path_2 → path_1 (coarse→fine)
  ↓
Output: H×W single-channel depth map
```

**与 V1 的关键差异：** V1 使用 DINOv2 最后 4 层特征，V2 改用中间层（V2 论文 issue #81），这是 DPT 架构的标准做法。

## 模型规模

| 模型 | 参数量 | Encoder | Features | 许可 |
|------|--------|---------|----------|------|
| V2-Small | 24.8M | ViT-S (384d, 12层, 6头) | 64 | Apache-2.0 |
| V2-Base | 97.5M | ViT-B (768d, 12层, 12头) | 128 | CC-BY-NC-4.0 |
| V2-Large | 335.3M | ViT-L (1024d, 24层, 16头) | 256 | CC-BY-NC-4.0 |
| V2-Giant | 1.3B | ViT-G2 (1536d, 40层, 24头, SwiGLU) | 384 | CC-BY-NC-4.0 |

## 使用方式

**Python API:**
```python
from depth_anything_v2.dpt import DepthAnythingV2
model = DepthAnythingV2(**model_configs['vitl'])
model.load_state_dict(torch.load('checkpoints/depth_anything_v2_vitl.pth'))
depth = model.infer_image(raw_img)  # H×W numpy array
```

**HuggingFace Transformers:**
```python
from transformers import pipeline
pipe = pipeline("depth-estimation", "depth-anything/Depth-Anything-V2-Small-hf")
```

**CLI (批量处理):**
```bash
python run.py --encoder vitl --img-path images/ --outdir output/
python run_video.py --encoder vitl --video-path videos/ --outdir output/
```

## 游戏开发应用场景

1. **3D 场景重建** — 从 2D 游戏截图/概念图生成深度图，辅助 [[video2game]] 等管线
2. **ControlNet 条件图** — 作为 [[controlnet]] 的 depth 条件输入，控制扩散模型生成
3. **Blender 深度辅助** — [[blender-controlnet]] 可直接使用深度图作为渲染条件
4. **视频时序深度** — 视频深度一致性（Larger 模型更好），可用于游戏视频分析
5. **实时 Web 深度** — Transformers.js + WebGPU 支持浏览器内实时深度估计
6. **移动端部署** — Apple Core ML + Android ONNX 版本支持游戏 App 集成

## 生态系统

- **Video Depth Anything** (2025-01) — 超长视频（5+ 分钟）一致深度
- **Prompt Depth Anything** (2024-12) — LiDAR 提示的 4K 分辨率度量深度
- **ComfyUI 集成** — kijai/ComfyUI-DepthAnythingV2 节点
- **TensorRT / ONNX** — 推理加速部署
- **DA-2K Benchmark** — 深度估计评测基准

## 与同类工具对比

- 比 [[sapiens]]（Meta 人体深度模型）更通用，覆盖全场景而非仅人体
- 与 [[controlnet]] 互补：ControlNet 消费深度图，Depth Anything V2 生成深度图
