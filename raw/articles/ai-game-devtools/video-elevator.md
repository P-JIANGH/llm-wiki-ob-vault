# VideoElevator — Raw Source

Source: https://github.com/YBYBZhang/VideoElevator
Extracted: 2026-04-20

## README Content

### 🎬 VideoElevator (AAAI 2025)
Official PyTorch Implementation of "VideoElevator: Elevating Video Generation Quality with Versatile Text-to-Image Diffusion Models"
arXiv: https://arxiv.org/abs/2403.05438
Project Website: https://videoelevator.github.io/

### Core Methodology
VideoElevator explicitly decomposes each step into temporal motion refining and spatial quality elevating:
- **Temporal Motion Refining**: Encapsulates T2V (Text-to-Video) to enhance temporal consistency
- **Spatial Quality Elevating**: Harnesses T2I (Text-to-Image) to provide more faithful details (e.g., dressed in suit)

Empirically, applying T2V in several timesteps is enough to ensure temporal consistency.

### Key Features
- **Training-Free**: No additional model fine-tuning or retraining required
- **Plug-and-Play**: Seamless interoperability with various T2V and T2I diffusion architectures
- **Low VRAM**: All scripts run efficiently on < 11 GB VRAM (e.g., NVIDIA RTX 2080 Ti)

### Architecture
Two alternating phases:
1. Temporal Motion Refining — T2V models for frame-to-frame consistency and smooth motion
2. Spatial Quality Elevating — T2I models for high-fidelity spatial details, textures, prompt alignment

### Setup & Inference
1. Download pre-trained T2V and T2I model weights → checkpoints/
2. Install requirements.txt
3. Run example scripts: `python example_scripts/sd_animatelcm.py`

### Codebase Foundations
- Diffusers (HuggingFace)
- LaVie
- AnimateLCM
- FreeInit

### Hardware
- < 11 GB VRAM (NVIDIA RTX 2080 Ti sufficient)
