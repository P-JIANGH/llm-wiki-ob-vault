# ViVid-1-to-3: Novel View Synthesis with Video Diffusion Models

Source: https://github.com/ubc-vision/vivid123
Citation: CVPR 2024, Kwak et al.

## README Summary

ViVid-1-to-3 combines video diffusion with novel-view synthesis diffusion models for increased pose and appearance consistency.

**Links:**
- arXiv: https://arxiv.org/abs/2312.01305
- Project page: https://ubc-vision.github.io/vivid123/

## Requirements

```
torch, diffusers==0.24, transformers, accelerate, einops, kornia, imageio[ffmpeg], opencv-python, pydantic, scikit-image, lpips
```

## Architecture

### Main Pipeline (`vivid123/`)

**`vivid123/pipelines/vivid123_pipeline.py`** — `ViVid123Pipeline`
- Combines UNet3DConditionModel (video diffusion, Zeroscope v2) + UNet2DConditionModel (Zero-1-to-3 novel view synthesis)
- Dual guidance: guidance_scale_zero123 + guidance_scale_video with linear weight scheduling across diffusion steps
- Uses TextToVideoSDPipeline as base from HuggingFace diffusers

**`vivid123/pipelines/zero123_pipeline.py`** — `Zero1to3StableDiffusionPipeline`
- Diffusers-based implementation of Zero-1-to-3 (image-to-novel-view)
- Uses CLIPVisionModelWithProjection for image encoding + camera pose conditioning
- Based on HuggingFace community converted weights (bennyguo/zero123-xl-diffusers)

**`vivid123/models/clip_camera_projection.py`** — `CLIPCameraProjection`
- Projects camera parameters (elevation, azimuth, radius) into CLIP-compatible embedding space
- ModelMixin + ConfigMixin, registered config for integration with diffusers pipeline

**`vivid123/configs/base_schema.py`** — `ViVid123BaseSchema` (Pydantic)
- Camera trajectory config: delta_elevation/azimuth/radius (start→end)
- Pipeline params: num_frames=25, num_inference_steps=50, 256×256 resolution
- Weight scheduling: video_linear_start/end_weight, zero123_linear_start/end_weight
- eta for deterministic/stochastic balance

**`vivid123/generation_utils.py`** — Pipeline preparation + generation
- `prepare_vivid123_pipeline()`: loads Zero1to3 + video diffusion models, CLIPCameraProjection
- `generation_vivid123()`: main generation function, outputs video of rotating views
- `prepare_cam_pose_input()`: generates camera trajectory from elevation/azimuth/radius ranges

### Key Scripts

- `run_generation.py` — single image → multi-view video
- `run_batch_generation.py` — batch processing with YAML task configs, supports PC + SLURM
- `run_evaluation.py` — PSNR/SSIM/LPIPS/FOR metrics per object
- `run_calculate_stats.py` — aggregate stats across dataset
- `scripts/job_config_yaml_generation.py` — batch task YAML generator
- `scripts/gso_metadata_object_prompt_100.csv` — 100 GSO objects with text prompts

### Benchmarks

- Tested on 100 GSO (Google Scanned Objects) — ~1min30s per generation on V100 GPU
- Metrics: PSNR, SSIM, LPIPS, FOR_8, FOR_16 (Flow-based Optical flow Registration)

## Acknowledgement

Based on:
- Zero-1-to-3 (https://github.com/cvlab-columbia/zero123) — HuggingFace community implementation
- Zeroscope v2 (https://huggingface.co/cerspense/zeroscope_v2_576w) — text-to-video model

## License

Apache License 2.0
