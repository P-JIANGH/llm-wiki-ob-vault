# Hotshot-XL — Source Analysis

**GitHub:** https://github.com/hotshotco/Hotshot-XL  
**Analysis date:** 2026-04-20  
**Source:** GitHub README + key source files

## README Summary

Hotshot-XL is an AI text-to-GIF model trained to work alongside Stable Diffusion XL (SDXL). Key features:

- Generates 1-second GIFs at 8 FPS (8 frames)
- Compatible with any fine-tuned SDXL model — no need to retrain Hotshot-XL for personalized subjects
- Supports SDXL LoRAs directly for personalized GIF generation
- Compatible with SDXL ControlNet (canny, depth) for layout/composition control
- Trained at various aspect ratios around 512x512; recommended 512x512 SDXL model available
- Aspect ratio bucketing support — 7 supported ratios from 320x768 to 768x320
- Experimental support for varying frame rates/lengths via `video_length` and `video_duration` params
- Spatial layers only mode — set `video_length=1` to generate just an image

### Links
- Try it: https://www.hotshot.co
- Model card: https://huggingface.co/hotshotco/Hotshot-XL
- SDXL-512 fine-tune: https://huggingface.co/hotshotco/SDXL-512
- Discord: https://discord.gg/2FjCRRxHCz

## Architecture (from source code)

### Package: hotshot_xl

**Models:**
- `unet.py` — UNet3DConditionModel: 3D U-Net with temporal attention blocks, extends SDXL UNet architecture
- `unet_blocks.py` — Custom UNet blocks with temporal layers interleaved
- `transformer_temporal.py` — Temporal transformer for video frame sequence modeling
- `transformer_3d.py` — 3D transformer blocks
- `resnet.py` — Custom ResNet blocks with temporal mixing

**Pipelines:**
- `hotshot_xl_pipeline.py` — HotshotXLPipeline: text-to-GIF inference pipeline built on diffusers
- `hotshot_xl_controlnet_pipeline.py` — HotshotXLControlNetPipeline: ControlNet-conditioned GIF generation

**Utilities:**
- `utils.py` — GIF/MP4 saving, GIF frame extraction, aspect ratio scaling

### Key Dependencies (requirements.txt)
- torch 2.0.1
- diffusers 0.21.4
- transformers 4.34.0
- einops 0.7.0
- accelerate 0.23.0
- wandb 0.15.11 (for validation logging)
- moviepy 1.0.3 (for video output)
- imageio 2.31.5

### Inference Script (inference.py)
- CLI entry point with argparse
- Supports two pipelines: standard and ControlNet
- Key hyperparameters: width, height, video_length (default 8), video_duration (default 1000ms)
- Scheduler support: EulerAncestralDiscreteScheduler, EulerDiscreteScheduler
- LoRA loading via `--lora` flag
- xformers support for memory efficiency
- Low VRAM mode option
- ControlNet support: canny (diffusers/controlnet-canny-sdxl-1.0), depth (diffusers/controlnet-depth-sdxl-1.0)

### Fine-tuning (fine_tune.py)
- Dataset format: each sample in its own directory with key frame images (0.jpg..n.jpg) + prompt.txt
- Uses accelerate launch for multi-GPU training
- Validation via Weights & Biases
- Gradient checkpointing enabled
- SNR gamma and noise offset techniques

### License
Apache-2.0

### Authors
John Mullan, Duncan Crawbuck, Aakash Sastry (Natural Synthetics Inc.)

### Future Work (from README)
- Fine-tuning at larger frame rates for longer/higher-frame-rate GIFs
- Fine-tuning at larger resolutions
- Temporal layers for latent upscaler
- Image-conditioned "frame prediction" model for coherent longer GIFs
- Temporal layers for VAE to mitigate flickering
- Multi-ControlNet support
- Different ControlNet models (facial expression control)
- AITemplate integration for faster inference
