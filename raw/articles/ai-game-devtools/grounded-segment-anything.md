# Grounded-Segment-Anything — Source Analysis

> Source: https://github.com/IDEA-Research/Grounded-Segment-Anything
> Analyzed: 2026-04-17
> Stars: ~20k+ (top-tier multimodal vision tool)

## Overview

Grounded-Segment-Anything is an open-source project by IDEA Research that combines Grounding DINO (zero-shot open-world object detector) with Segment Anything (SAM) to create a powerful pipeline for detecting and segmenting any object in images using free-form text inputs. The project provides an extensive playground with demos for inpainting, automatic labeling, 3D box generation, Whisper audio integration, and ChatGPT-powered workflows.

## Key Architecture

The project is a **workflow integrator** that chains together multiple expert models:

| Component | Role | Source |
|-----------|------|--------|
| **Grounding DINO** | Zero-shot object detection with text prompts | IDEA-Research/GroundingDINO |
| **SAM (Segment Anything)** | Promptable image segmentation | facebookresearch/segment-anything |
| **SAM-HQ** | Higher-quality segmentation variant | SysCV/sam-hq |
| **Stable Diffusion** | Inpainting / image generation | CompVis/stable-diffusion |
| **RAM / Tag2Text** | Automatic image tagging for labeling | OPPOMKLab/recognize-anything |
| **BLIP** | Image captioning | salesforce/LAVIS |
| **Whisper** | Audio-driven detection | openai/whisper |
| **Visual ChatGPT** | Conversational AI + vision | microsoft/TaskMatrix |
| **OSX** | 3D whole-body mesh recovery | IDEA-Research/OSX |
| **VoxelNeXt** | 3D object detection | dvlab-research/VoxelNeXt |

## Core Workflow

1. **Text → Detection**: Grounding DINO takes a free-form text prompt (e.g., "bear.", "cat . dog .") and outputs bounding boxes with labels
2. **Boxes → Masks**: SAM takes the bounding boxes as prompts and generates pixel-level segmentation masks
3. **Optional — Inpaint**: Stable Diffusion fills masked regions with new content based on a text prompt
4. **Optional — Auto-label**: RAM/Tag2Text generates tags automatically, feeding them into step 1

## Demo Modules

| Demo | Description | Key Files |
|------|-------------|-----------|
| Grounding DINO | Detect objects with text prompt | `grounding_dino_demo.py` |
| Grounded-SAM | Detect + segment with text | `grounded_sam_demo.py`, `grounded_sam_simple_demo.py` |
| Inpainting | Detect + segment + inpaint | `grounded_sam_inpainting_demo.py` |
| Gradio App | 6-mode interactive UI (scribble/automask/det/seg/inpainting/automatic) | `gradio_app.py` |
| RAM Auto-label | Automatic labeling pipeline | `automatic_label_ram_demo.py` |
| Tag2Text Auto-label | Tag2Text-based auto labeling | `automatic_label_tag2text_demo.py` |
| BLIP Auto-label | BLIP-based auto labeling | `automatic_label_demo.py` |
| Whisper | Audio-driven detection | `grounded_sam_whisper_demo.py` |
| Whisper Inpainting | Audio + inpainting | `grounded_sam_whisper_inpainting_demo.py` |
| Multi-GPU SAM | Multi-GPU inference | `grounded_sam_multi_gpu_demo.py` |
| 3D Box | 3D box via segmentation | `grounded_sam_3d_box/` |

## Efficient SAM Variants

The project supports multiple efficient SAM backends for faster annotation:

- **FastSAM** — Fast approximation of SAM
- **MobileSAM** — Mobile-optimized SAM
- **Light-HQSAM** — Lightweight high-quality SAM
- **EfficientSAM** — Efficient SAM variant
- **EdgeSAM** — Edge-device optimized SAM
- **RepViT-SAM** — RepViT-based SAM

## Technical Stack

- **Language**: Python >= 3.8
- **Framework**: PyTorch >= 1.7, TorchVision >= 0.8
- **Dependencies**: diffusers, opencv-python, pycocotools, matplotlib, onnxruntime
- **Deployment**: Docker support, CUDA GPU recommended
- **Models**: Downloaded separately (Swin-Tiny for Grounding DINO, ViT-H for SAM)

## Performance

- **SiW zero-shot track**: Grounded-SAM (Grounding-DINO-L + SAM-ViT-H) achieves 46.0 mean AP, surpassing UNINEXT (CVPR 2023) by ~4 mean AP
- **Grounding-DINO-B + SAM-HQ**: 49.6 mean AP in Segmentation in the Wild zero-shot track

## Links

- GitHub: https://github.com/IDEA-Research/Grounded-Segment-Anything
- arXiv Paper: https://arxiv.org/abs/2401.14159 (Grounded SAM: Assembling Open-World Models for Diverse Visual Tasks)
- HuggingFace Space: https://huggingface.co/spaces/IDEA-Research/Grounded-SAM
- Colab Demo: https://colab.research.google.com/github/roboflow-ai/notebooks/blob/main/notebooks/automated-dataset-annotation-and-evaluation-with-grounding-dino-and-sam.ipynb

## Successor

**Grounded SAM 2** has been released: https://github.com/IDEA-Research/Grounded-SAM-2 — combines Grounding DINO with SAM 2 for open-world object tracking.

## License

Apache 2.0 (inferred from ground-truth: Grounding DINO + SAM both use Apache 2.0)
