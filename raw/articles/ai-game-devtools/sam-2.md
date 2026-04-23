# SAM 2: Segment Anything in Images and Videos

**Source:** https://github.com/facebookresearch/segment-anything-2  
**License:** Apache 2.0  
**Authors:** Nikhila Ravi, Valentin Gabeur, Yuan-Ting Hu, Ronghang Hu, et al. (Meta AI, FAIR)  
**Paper:** arXiv:2408.00714

## Overview

SAM 2 (Segment Anything Model 2) is a foundation model for promptable visual segmentation in images and videos. It extends SAM to video by considering images as videos with a single frame. The model uses a transformer architecture with streaming memory for real-time video processing.

## Key Features

- **Image & Video Segmentation**: Unified model for both static images and video sequences
- **Promptable Segmentation**: Supports point, box, and mask prompts
- **Streaming Memory**: Real-time video processing with memory attention mechanism
- **Multi-Object Tracking**: Independent per-object inference for tracking multiple objects
- **SA-V Dataset**: Trained on the largest video segmentation dataset to date

## Model Variants (SAM 2.1 - Latest)

| Model | Size (M) | Speed (FPS) | SA-V test (J&F) |
|-------|----------|-------------|-----------------|
| sam2.1_hiera_tiny | 38.9 | 91.2 | 76.5 |
| sam2.1_hiera_small | 46 | 84.8 | 76.6 |
| sam2.1_hiera_base_plus | 80.8 | 64.1 | 78.2 |
| sam2.1_hiera_large | 224.4 | 39.5 | 79.5 |

Speed measured on A100 with torch 2.5.1, cuda 12.4.

## Architecture

- **Transformer-based**: Simple transformer architecture with streaming memory
- **Hierarchical**: Uses Hiera hierarchical vision transformer as image encoder
- **Memory Mechanism**: Temporal memory for propagating segmentation through video frames
- **CUDA Optimization**: Custom CUDA kernel for post-processing (connected components)

## Installation

```bash
git clone https://github.com/facebookresearch/sam2.git && cd sam2
pip install -e ".[notebooks]"
```

Requirements:
- Python ≥ 3.10
- PyTorch ≥ 2.5.1
- CUDA toolkits (matching PyTorch CUDA version)

## Usage Examples

### Image Prediction

```python
import torch
from sam2.build_sam import build_sam2
from sam2.sam2_image_predictor import SAM2ImagePredictor

checkpoint = "./checkpoints/sam2.1_hiera_large.pt"
model_cfg = "configs/sam2.1/sam2.1_hiera_l.yaml"
predictor = SAM2ImagePredictor(build_sam2(model_cfg, checkpoint))

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    predictor.set_image(<your_image>)
    masks, _, _ = predictor.predict(<input_prompts>)
```

### Video Prediction

```python
import torch
from sam2.build_sam import build_sam2_video_predictor

checkpoint = "./checkpoints/sam2.1_hiera_large.pt"
model_cfg = "configs/sam2.1/sam2.1_hiera_l.yaml"
predictor = build_sam2_video_predictor(model_cfg, checkpoint)

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    state = predictor.init_state(<your_video>)
    frame_idx, object_ids, masks = predictor.add_new_points_or_box(state, <your_prompts>)
    
    for frame_idx, object_ids, masks in predictor.propagate_in_video(state):
        ...
```

## Key Capabilities

1. **Interactive Video Segmentation**: Add prompts on any frame and propagate through video
2. **Multi-Object Tracking**: Track multiple objects independently
3. **Automatic Mask Generation**: Generate masks automatically (like SAM)
4. **Refinement**: Refine masks with additional prompts
5. **Web Demo**: Full-stack web demo with frontend and backend

## Training & Fine-tuning

Training code is available in `training/README.md`. Supports training on custom datasets of images, videos, or both.

## Recent Updates

- **Dec 2024**: Full model compilation for VOS speedup, new `SAM2VideoPredictor` for better multi-object tracking
- **Sep 2024**: SAM 2.1 checkpoints released with improved performance, training code released, web demo code released

## Repository Structure

```
sam2/
├── sam2/                    # Main package
│   ├── modeling/           # Model architecture
│   ├── configs/            # Model configs
│   └── csrc/               # CUDA extensions
├── checkpoints/            # Checkpoint download scripts
├── notebooks/              # Jupyter examples
├── training/               # Training code
├── demo/                   # Web demo code
└── sav_dataset/            # SA-V dataset tools
```

## Integration

- **Hugging Face**: Models available on Hugging Face Hub
- **Colab**: Example notebooks available in Colab
- **Docker**: Docker Compose setup for web demo

## Performance

- Real-time inference on A100 GPU
- Torch.compile support for additional speedup
- Optimized for both single images and video sequences
