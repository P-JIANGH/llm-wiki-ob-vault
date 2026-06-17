# MotionDirector — Motion Customization of Text-to-Video Diffusion Models

Source: https://github.com/showlab/MotionDirector
Paper: https://arxiv.org/abs/2310.08465
Project Page: https://showlab.github.io/MotionDirector
Hugging Face: https://huggingface.co/spaces/ruizhaocv/MotionDirector

## Basic Info
- **Authors:** Rui Zhao, Yuchao Gu, Jay Zhangjie Wu, David Junhao Zhang, Jia-Wei Liu, Weijia Wu, Jussi Keppo, Mike Zheng Shou
- **Institution:** Show Lab, National University of Singapore
- **Language:** Python
- **Framework:** PyTorch + Diffusers + Accelerate
- **License:** Not explicitly stated (weights available via HuggingFace)

## README Summary
MotionDirector customizes text-to-video diffusion models to generate videos with desired motion patterns.
Given a set of video clips of the same motion concept, it adapts existing T2V models to generate diverse
videos with that motion applied to new subjects/scenes via text prompts.

## Key Architecture
- **Dual-path LoRA:** Spatial path (image appearance) + Temporal path (video motion)
- **Foundation models:** ZeroScope, ModelScopeT2V, and compatible text-to-video diffusion models
- **UNet 3D:** UNet3DConditionModel with LoRA adapters on attention layers
- **DDIM Inversion:** Reference video noise inversion for motion guidance (noise_prior parameter)
- **Gradient Checkpointing:** Saves VRAM during training (~14GB required)

## Training Modes
1. **Multi-video training:** Learn motion from multiple videos of same concept (300-500 steps, ~9-16 min on A5000)
2. **Single-video training:** Learn from one video (50-150 steps, ~1.5-4.5 min on A5000)
3. **Image animation:** Spatial path from reference image + temporal path from reference video
4. **Appearance + motion:** Customize both subject appearance and motion simultaneously

## Config Highlights (config_multi_videos.yaml)
- lora_rank: 32 (max 1024 for ModelScope)
- lora_unet_dropout: 0.1
- learning_rate: 5e-4
- max_train_steps: 3000
- mixed_precision: fp16
- gradient_checkpointing: True
- n_sample_frames: 16

## Key Files
- MotionDirector_train.py — Training script with LoRA injection, dataset loading, validation
- MotionDirector_inference.py — Single-path inference (temporal only)
- MotionDirector_inference_multi.py — Dual-path inference (spatial + temporal)
- models/unet_3d_condition.py — Custom UNet3D with temporal attention
- utils/lora_handler.py — LoRA weight injection/extraction
- utils/ddim_utils.py — DDIM inversion for noise prior
- utils/dataset.py — VideoJsonDataset/SingleVideoDataset/ImageDataset/VideoFolderDataset

## Use Cases Demonstrated
- Sports: lifting weights, riding bicycle/horse, skateboarding, playing golf
- Cinematic shots: dolly zoom, zoom in/out, follow, reverse follow, chest transition, orbit, pull back
- Image animation: static image + motion video → animated video
- Appearance + motion: e.g., "Terracotta Warrior" appearance + riding bicycle motion

## Dataset Types
- VideoJsonDataset — Multiple videos with JSON captions
- SingleVideoDataset — Single video with fallback prompt
- ImageDataset — Single reference image for spatial path
- VideoFolderDataset — Videos in a folder with automatic captioning

## Technical Details
- Based on diffusers library (TextToVideoSDPipeline)
- Uses CLIPTextModel + CLIPTokenizer for text encoding
- AutoencoderKL for latent space compression
- LoRAHandler manages spatial/temporal LoRA weight injection
- OmegaConf for YAML configuration
- Accelerate for distributed training support

## Key Parameters at Inference
- checkpoint_index: which training step checkpoint to use
- noise_prior: 0 for multi-video (maximum diversity), 0.1-0.5 for single-video (closer to reference)
- spatial_scale: scale of spatial LoRAs (default 0)
- guidance_scale: CFG scale (default 12)
