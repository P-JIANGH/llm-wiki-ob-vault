---
title: SAM 2 — Segment Anything in Images and Videos
created: 2026-04-23
updated: 2026-04-23
type: entity
tags: [ai, vision, tool, open-source, video, image-generation, segmentation, computer-vision]
sources: [raw/articles/ai-game-devtools/sam-2.md]
---

# SAM 2 — Segment Anything in Images and Videos

**Meta AI, FAIR** | [GitHub](https://github.com/facebookresearch/segment-anything-2) | Apache 2.0 | arXiv:2408.00714

SAM 2 (Segment Anything Model 2) is a foundation model for promptable visual segmentation in both images and videos, extending the original SAM to video with a unified architecture.

## What It Is

SAM 2 treats images as single-frame videos and uses a transformer architecture with streaming memory to achieve real-time video segmentation. It supports point, box, and mask prompts for interactive segmentation and tracking.

## Key Features

- **Unified Image & Video**: Single model handles both static images and video sequences
- **Streaming Memory**: Real-time video processing via memory attention mechanism
- **Multi-Object Tracking**: Independent per-object inference, allowing new objects to be added after tracking starts
- **Promptable Segmentation**: Point, box, and mask prompts with interactive refinement
- **SA-V Dataset**: Trained on the largest video segmentation dataset to date
- **Automatic Mask Generation**: Zero-shot mask generation like the original SAM

## Model Variants (SAM 2.1)

| Model | Params | Speed (A100) | SA-V test (J&F) |
|-------|--------|--------------|-----------------|
| sam2.1_hiera_tiny | 38.9M | 91.2 FPS | 76.5 |
| sam2.1_hiera_small | 46M | 84.8 FPS | 76.6 |
| sam2.1_hiera_base_plus | 80.8M | 64.1 FPS | 78.2 |
| sam2.1_hiera_large | 224.4M | 39.5 FPS | 79.5 |

## Architecture

- **Hiera Backbone**: Hierarchical vision transformer as image encoder
- **Memory Encoder/Decoder**: Temporal memory stores and retrieves frame features
- **Transformer Core**: Standard transformer with streaming memory for video
- **CUDA Kernels**: Custom connected components for post-processing mask cleanup

## Integration

- **Hugging Face Hub**: `facebook/sam2-hiera-large`
- **Colab**: Official example notebooks
- **Web Demo**: Full-stack deployable demo (React frontend + Python backend)
- **Docker**: Docker Compose setup included

## Use in Games

SAM 2 enables several game development workflows:
- **Asset Extraction**: Segment characters/objects from reference images/videos
- **Matte Creation**: Generate precise masks for compositing
- **Video-to-Game**: Extract and track game assets from video footage
- **Interactive Tools**: Build in-game segmentation tools for UGC content

## Comparison with Original SAM

| | SAM | SAM 2 |
|--|-----|-------|
| Input | Images only | Images + Videos |
| Memory | None | Streaming temporal memory |
| Multi-object | Limited | Independent per-object tracking |
| Real-time video | No | Yes |
| Checkpoints | 3 sizes | 4 sizes (SAM 2.1) |

## Related Projects

- [[ai-game-devtools/evf-sam]] — HUST+vivo multimodal segmentation combining SAM with text prompts
- [[ai-game-devtools/depth-anything-v2]] — HKU+TikTok monocular depth estimation, complementary for 3D asset extraction
- [[ai-game-devtools/anything-3d]] — Uses SAM for segmentation in single-view 3D reconstruction pipelines

## License

Apache 2.0 (model checkpoints, demo code, training code). Fonts in demo use SIL OFL 1.1.
