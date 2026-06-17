# CoreNet

## Project Overview

- **Name**: CoreNet
- **URL**: https://github.com/apple/corenet
- **Clone source**: https://gitcode.com/apple/corenet
- **License**: Apple proprietary (see LICENSE file)
- **Domain**: Deep neural network training toolkit
- **Cloned**: 2026-04-13

## What It Is

CoreNet is Apple's open-source library for training deep neural networks at scale. It evolved from CVNets and expanded beyond computer vision to cover foundation models including LLMs. Used by Apple researchers to train models published in academic papers.

## Supported Tasks

| Task | Description |
|------|-------------|
| Classification | Image classification (ResNet, ViT, MobileNet, etc.) |
| Object Detection | Detection models |
| Semantic Segmentation | Segmentation models |
| Language Modeling | LLM training (OpenELM, etc.) |
| Multi-modal (Image-Text) | CLIP-level contrastive learning |
| Audio Classification | Audio classification models |

## Key Models Built with CoreNet

- **OpenELM**: Efficient open LLM family with open training/inference
- **KV Prediction**: Improved Time-to-First-Token for transformers
- **CatLIP**: CLIP-level accuracy with 2.7x faster pre-training
- **FastVit**: Fast hybrid vision transformer with structural reparameterization
- **MobileViTv2**: Separable self-attention for mobile vision transformers
- **MobileOne**: Improved one-millisecond mobile backbone
- **CLIP**: Contrastive Language-Image Pre-training
- **ByteFormer**: Transformers operating directly on file bytes

## Architecture

```
corenet/
├── corenet/
│   ├── modeling/
│   │   └── models/
│   │       ├── audio_classification/
│   │       ├── classification/
│   │       ├── detection/
│   │       ├── language_modeling/
│   │       ├── multi_modal_img_text/
│   │       └── segmentation/
│   ├── data/
│   │   ├── datasets/
│   │   ├── transforms/
│   │   ├── video_reader/
│   │   ├── text_tokenizer/
│   │   └── sampler/
│   ├── loss_fn/
│   ├── metrics/
│   ├── optims/scheduler/
│   └── engine/ (train_eval_pipelines, evaluation_engine, fsdp_trainer)
├── projects/ (training recipes per publication)
│   ├── kv-prediction/
│   ├── openelm/
│   ├── clip/
│   ├── catlip/
│   ├── fastvit/
│   ├── mobilenet_v1/v2/v3/
│   ├── mobileone/
│   ├── mobilevit/
│   └── vit/
├── mlx_examples/ (Apple Silicon MLX support)
└── tutorials/
```

## Key Design Patterns

- `@MODEL_REGISTRY.register(name="<model_name>", type="<task_name>")` decorator for model registration
- YAML configuration files for training/evaluation recipes
- FSDP (Fully Sharded Data Parallel) trainer for distributed training
- Multi-node Slurm training support

## Dependencies

- Python 3.10+ (Linux), Python 3.9+ (macOS)
- PyTorch >= 2.1.0
- Git LFS (for large model weights)
- Optional: libsox-dev, ffmpeg (audio/video processing)

## Installation

```bash
git clone https://gitcode.com/apple/corenet.git
cd corenet
python3 -m pip install --editable .
```

## Maintainers

- Maxwell Horton
- Mohammad Sekhavat
- Yanzi Jin
- Dmitry Belenko

## Relationship to Game Dev

CoreNet provides foundation model implementations (CLIP, ViT, language models) that can serve as building blocks for game AI pipelines — image-text understanding, NPC dialogue systems, game asset classification, and vision-based game mechanics. The multi-modal capabilities are particularly relevant for game development workflows.
