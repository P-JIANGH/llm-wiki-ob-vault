# Tune-A-Video: One-Shot Tuning of Image Diffusion Models for Text-to-Video Generation

**Source:** https://github.com/showlab/Tune-A-Video
**arXiv:** https://arxiv.org/abs/2212.11565
**Published:** ICCV 2023

## Authors
Jay Zhangjie Wu, Yixiao Ge, Xintao Wang, Stan Weixian Lei, Yuchao Gu, Yufei Shi, Wynne Hsu, Ying Shan, Xiaohu Qie, Mike Zheng Shou

## Abstract
Tune-A-Video fine-tunes a pre-trained text-to-image diffusion model (e.g., Stable Diffusion) for text-to-video generation using a single video-text pair as input. Key contributions: (1) Spatio-temporal attention extension from 2D image UNet to 3D video UNet, enabling temporal modeling; (2) Temporal priors initialization using pre-trained image attention layers; (3) Noise regularization using DDIM inversion to improve temporal consistency.

## Key Architecture

### UNet3DConditionModel
- Extends the 2D UNet from Stable Diffusion to 3D by adding **temporal attention layers** to each spatial transformer block
- Temporal layers are initialized from pre-trained image spatial attention weights (zero initialization for new parameters)
- Processes video frames jointly through spatio-temporal attention

### Tuning Strategy
- **One-shot fine-tuning:** Only requires a single input video + text prompt
- Typical tuning: 300-500 steps, ~10-15 minutes on one A100 GPU
- 24-frame videos at 512×512 resolution

### DDIM Inversion for Consistency
- Uses DDIM inversion to extract the initial latent noise from the input video
- This latent serves as the starting point for generation, significantly improving temporal consistency

## Technical Stack

| Component | Technology |
|-----------|-----------|
| Base Model | Stable Diffusion (v1-4, v2-1, or DreamBooth fine-tuned variants) |
| Framework | HuggingFace Diffusers (torch==0.11.1) |
| Training | Accelerate (HuggingFace) |
| Attention | xformers (memory-efficient attention) |
| Config | OmegaConf YAML configs |

## Key Files

| File | Purpose |
|------|---------|
| `tuneavideo/models/unet.py` | UNet3DConditionModel — 3D UNet with spatio-temporal attention |
| `tuneavideo/models/unet_blocks.py` | UNet block definitions (CrossAttnDownBlock3D, etc.) |
| `tuneavideo/models/attention.py` | TemporalAttention + SpatialTransformer modules |
| `tuneavideo/models/resnet.py` | 3D Resnet blocks for video |
| `tuneavideo/pipelines/pipeline_tuneavideo.py` | TuneAVideoPipeline — inference pipeline |
| `tuneavideo/data/dataset.py` | Video dataset loader |
| `train_tuneavideo.py` | Training script (accelerate launch) |
| `configs/*.yaml` | Example configs (man-skiing, car-turn, etc.) |

## Usage

### Training
```bash
accelerate launch train_tuneavideo.py --config="configs/man-skiing.yaml"
```

### Inference
```python
from tuneavideo.pipelines.pipeline_tuneavideo import TuneAVideoPipeline
from tuneavideo.models.unet import UNet3DConditionModel
unet = UNet3DConditionModel.from_pretrained(my_model_path, subfolder='unet')
pipe = TuneAVideoPipeline.from_pretrained(pretrained_model_path, unet=unet)
video = pipe(prompt, latents=ddim_inv_latent, video_length=24, num_inference_steps=50)
```

## Capabilities
- **Subject + Action Preservation:** Maintains the motion and subject from the input video
- **Text-Guided Editing:** Change subject, scene, or style via text prompt (e.g., "man skiing" → "Spider Man skiing on the beach, cartoon style")
- **DreamBooth Integration:** Can tune videos on personalized DreamBooth models for subject-specific video generation
- **Style Transfer:** Apply artistic styles (cartoon, Van Gogh, etc.) to the input video motion

## Requirements
- PyTorch 1.12.1, diffusers 0.11.1, transformers >= 4.25.1
- xformers recommended for GPU efficiency
- ~16GB VRAM for training (less frames = less VRAM)

## License
Not explicitly stated in repository (academic research project, ICCV 2023)

## Related
- Builds on: Stable Diffusion, DreamBooth, HuggingFace Diffusers
- Published at: ICCV 2023
- Project Website: https://tuneavideo.github.io/
- HuggingFace Models: https://huggingface.co/Tune-A-Video-library
