# Text2Video-Zero Source Analysis

**Source:** https://github.com/Picsart-AI-Research/Text2Video-Zero
**Paper:** https://arxiv.org/abs/2303.13439
**Date:** 2026-04-20

## README Summary

Text2Video-Zero enables zero-shot video generation using text-to-image diffusion models. No video training data required.

### Key Capabilities
1. **Text-to-Video** — Generate videos from text prompts directly
2. **Pose-Controlled Video** — Text + skeleton pose guidance (OpenPose)
3. **Edge-Controlled Video** — Text + Canny edge guidance
4. **Edge + Dreambooth** — Edge guidance with specialized Dreambooth models (Anime, Avatar, GTA-5, Arcane styles)
5. **Video Instruct-Pix2Pix** — Instruction-guided video editing
6. **Depth-Controlled Video** — Text + MiDaS depth guidance

### Core Techniques
- **Cross-Frame Attention** — Replaces self-attention in SD to enforce temporal consistency across frames
- **Motion Field Warping** — Latent codes warped using motion field vectors to create temporal coherence
- **DDIM/DDPM Hybrid** — Two-stage denoising: DDIM backward to t0/t1, then DDPM forward + DDIM backward
- **Token Merging (ToMe)** — Optional memory optimization, enables <7GB VRAM operation

### Architecture (from source code)

**Main modules:**
- `model.py` — `Model` class with 6 ModelType enums (Pix2Pix_Video, Text2Video, ControlNetCanny, ControlNetCannyDB, ControlNetPose, ControlNetDepth)
- `text_to_video_pipeline.py` — `TextToVideoPipeline` extends StableDiffusionPipeline, implements DDIM_backward, DDPM_forward, latent warping
- `utils.py` — CrossFrameAttnProcessor, video preparation, Canny/Depth/Pose preprocessing
- `app.py` — Gradio web interface with all 6 generation modes

**Key classes:**
- `TextToVideoPipeline` (extends StableDiffusionPipeline):
  - `DDPM_forward()` — forward diffusion from x0 to noise
  - `DDIM_backward()` — denoising loop with t0/t1 checkpoints
  - `warp_latents_independently()` — grid_sample based latent warping
  - `create_motion_field()` — creates motion vectors for frame transitions
  - `create_motion_field_and_warp_latents()` — combined motion + warping

- `CrossFrameAttnProcessor` (in utils.py):
  - Modifies attention to attend across frames instead of within a single frame
  - `unet_chunk_size` parameter controls which frames share attention

### Dependencies (requirements.txt)
- diffusers==0.14.0, torch==1.13.1, transformers==4.26.0
- gradio==3.23.0 (web UI)
- tomesd (token merging for memory optimization)
- ControlNet models: lllyasviel/sd-controlnet-canny, sd-controlnet-depth, fusing/sd-controlnet-openpose
- OpenCV, kornia, einops, moviepy, decord

### License
CreativeML Open RAIL-M (same as Stable Diffusion)

### Minimum Hardware
- 12 GB VRAM (standard mode)
- <7 GB VRAM (with Token Merging + chunk_size=2)

### HuggingFace Integration
- Available in 🧨 Diffusers library since v0.15.0 as `TextToVideoZeroPipeline`
- HuggingFace demo space: PAIR/Text2Video-Zero

### Notable Parameters
- `t0=44, t1=47` — DDIM step boundaries (default)
- `motion_field_strength_x/y=12` — motion intensity
- `video_length` — arbitrary length supported
- `chunk_size` — memory optimization (2 to video_length)
- `merging_ratio` — Token Merging compression (0 to 1)
