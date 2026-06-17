# Any2Point: Empowering Any-modality Large Models for Efficient 3D Understanding

**Source:** https://github.com/Ivan-Tang-3D/Any2Point
**Venue:** ECCV 2024
**Paper:** https://arxiv.org/pdf/2404.07989.pdf
**Extracted:** 2026-04-18
**Note:** GitHub clone failed (timeout); content extracted via web_extract.

## Overview

Any2Point bridges the gap between 2D/other-modality foundation models and 3D understanding via a unified, parameter-efficient paradigm. Given a frozen transformer from any source modality, it proposes a **3D-to-any (1D or 2D) virtual projection strategy** that correlates input 3D points to the original 1D or 2D positions within the source modality.

## Core Innovation

### 1. 3D-to-Any Virtual Projection
- Maps 3D point clouds to the pre-trained model's native 1D/2D positional encodings
- Avoids spatial geometry loss from true projection
- Leverages existing positional priors for 3D learning

### 2. Any-to-3D Guided Adapter
- Lightweight module inserted into each transformer block
- Parameter-Efficient Fine-Tuning (PEFT): only **~0.8–0.9M learnable parameters**
- Incorporates source modality spatial knowledge to guide local 3D feature aggregation

## Performance Results

| Method | Pre-train | #Params (M) | ScanObjectNN (%) | ModelNet40 (%) |
|---|---|---|---|---|
| PointNet++ | N/A | 1.5 | 77.9 | 90.7 |
| Point-BERT | 3D | 22.1 | 83.1 | 92.7 |
| ReCon | 3D+2D+Language | 43.6 | 90.6 | 94.1 |
| **Any2Point (Audio)** | Audio | **0.8** | **87.0** | **92.7** |
| **Any2Point (Vision)** | 2D | **0.8** | **87.7** | **93.2** |
| **Any2Point (Language)** | Language | **0.9** | **91.9** | **94.3** |

Key insight: Language-modality variant outperforms multi-modal baselines (e.g., ReCon) while using **~48x fewer parameters**.

## Technical Details

- **Pre-trained models supported:** CLIP (Language), DINOv2 (Vision), ImageBind (Audio)
- **Datasets:** ModelNet40, ScanObjectNN, ShapeNetPart (pending)
- **VRAM requirement:** ~26GB for Language modality training
- **Framework:** PyTorch, based on Pix4Point, Point-NN, PointTransformerV2

## Related Works by Authors

- **ViewRefer3D** (ICCV 2023): Multi-view 3D visual grounding with LLMs
- **Point-PEFT** (AAAI 2024): Adapts 3D pre-trained models using only 1% of parameters

## License

Not explicitly specified in README.

## Repository Structure

```
Any2Point/
├── Any2Point_CLIP_Lang/
├── Any2Point_DINOV2_Vision/
├── Any2Point_ImageBind_audio/
├── ckpts/
├── data/
│   ├── ModelNet/
│   └── ScanObjectNN/
└── ...
```
