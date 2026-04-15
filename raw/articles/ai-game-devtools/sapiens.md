# Sapiens — Foundation for Human Vision Models

> GitHub: https://github.com/facebookresearch/sapiens
> Retrieved: 2026-04-15

## Overview

Sapiens is Meta Reality Labs 的人体视觉基础模型套件 ECCV 2024 Best Paper Candidate，提供从 2D pose 到 part segmentation、depth、normal 的完整任务支持。模型族在 3 亿张野外人体图像上预训练，原生 1024×1024 分辨率，16-pixel patch size。提供 Sapiens-Lite 优化推理版本（4× 加速，仅 PyTorch + numpy + cv2）。

## Architecture

- **Pretrain**: 基于 Vision Transformer (ViT)，1024×1024 输入，4 规模：0.3B / 0.6B / 1B / 2B
- **Pose**: COCO 17-keypoint / COCO-WholeBody 133-keypoint / Goliath 308-keypoint
- **Seg**: 28 类人体部位分割 + 背景类（Goliath 数据集）
- **Depth**: 人体深度估计（RenderPeople 数据集）
- **Normal**: 表面法线估计
- **Sapiens-Lite**: TorchScript 优化推理，bfloat16 + FlashAttention（A100）
- **Engine**: mmpose / mmpretrain / mmseg 模块化架构

## Model Sizes & Performance

| Model   | Pose AP (COCO) | Seg mIoU (Goliath) |
|---------|----------------|---------------------|
| 0.3B    | 79.6           | 76.73               |
| 0.6B    | 81.2           | 77.77               |
| 1B      | 82.1           | 79.94               |
| 2B      | 82.2           | —                   |

## Key Subdirectories

```
sapiens/
├── pretrain/      # Image Encoder (ViT-based, 0.3B/0.6B/1B/2B)
├── pose/          # 2D Pose Estimation (17/133/308 keypoints)
├── seg/           # Body Part Segmentation (28 classes)
├── depth/         # Depth Estimation
├── normal/        # Surface Normal Estimation
├── lite/          # Optimized inference (4x faster, PyTorch-only)
├── engine/        # (inference engine)
├── cv/            # (detection related)
├── det/           # (detector)
├── docs/          # Task READMEs + Finetune guides
└── pretrain/scripts/demo/local/extract_feature.sh
```

## License

- Sapiens: LICENSE (Meta)
- Sapiens-Lite derived from OpenMMLab: Apache 2.0

## Related Links

- Project Page: https://about.meta.com/realitylabs/codecavatars/sapiens/
- Paper: https://arxiv.org/abs/2408.12569
- HuggingFace: https://huggingface.co/facebook/sapiens
