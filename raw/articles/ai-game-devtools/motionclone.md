# MotionClone — Training-Free Motion Cloning for Controllable Video Generation

Source: https://github.com/Bujiazi/MotionClone
ArXiv: https://arxiv.org/abs/2406.05338
Project Page: https://bujiazi.github.io/motionclone.github.io/
Captured: 2026-04-20

## README Summary

MotionClone is a **training-free framework** that enables motion cloning from a reference video for controllable video generation, **without cumbersome video inversion processes**.

### Key Innovation
- Uses sparse temporal attention weights as motion representations for motion guidance
- Enables diverse motion transfer across varying scenarios (text-to-video, image-to-video, sketch-to-video)
- Direct extraction of motion representation through a single denoising step, bypassing inversion
- Based on observation that dominant components in temporal-attention maps drive motion synthesis

### Capabilities
1. **Text-to-Video with Camera Motion** — customize camera movements from reference video
2. **Text-to-Video with Object Motion** — clone specific object movements
3. **Sketch-to-Video** — combine motion cloning with sketch conditioning
4. **Image-to-Video** — combine motion cloning with image conditioning

### Architecture
- Built on **Stable Diffusion v1.5** + **AnimateDiff** Motion Modules
- Uses **SparseCtrl** for image-to-video and sketch-to-video conditioning
- Core pipeline: `AnimationPipeline` (adapted from Tune-A-Video)
- Motion extraction: `obtain_motion_representation()` — single denoising step at configurable noise level
- Motion guidance: `compute_temp_loss()` — MSE loss between current and reference temporal attention

### Key Modules
| File | Purpose |
|------|---------|
| `motionclone/pipelines/pipeline_animation.py` | Main inference pipeline (497 lines), integrates VAE/UNet/Text Encoder/Scheduler/ControlNet |
| `motionclone/utils/motionclone_functions.py` | Core motion cloning logic (770 lines): motion extraction, temporal attention manipulation, loss computation |
| `motionclone/models/motion_module.py` | VanillaTemporalModule — temporal transformer with self-attention (347 lines) |
| `motionclone/models/unet.py` | UNet3DConditionModel — 3D UNet with temporal layers |
| `motionclone/models/sparse_controlnet.py` | SparseControlNet for image/sketch conditioning |
| `t2v_video_sample.py` | Text-to-Video generation entry point |
| `i2v_video_sample.py` | Image-to-Video / Sketch-to-Video entry point |

### Dependencies
- Python 3.11.3, PyTorch 2.0.1, CUDA 11.8
- diffusers 0.16.0, transformers 4.28.1, xformers 0.0.20
- AnimateDiff v3 motion modules (v3_adapter_sd_v15.ckpt, v3_sd15_mm.ckpt)
- SparseCtrl weights (v3_sd15_sparsectrl_rgb.ckpt, v3_sd15_sparsectrl_scribble.ckpt)
- Community LoRA: RealisticVision V5.1

### Model Preparation
1. SD 1.5 → `models/StableDiffusion/`
2. LoRA (.safetensors) → `models/DreamBooth_LoRA/`
3. AnimateDiff Motion Modules → `models/Motion_Module/`
4. SparseCtrl weights → `models/SparseCtrl/`

### Authors
Pengyang Ling*, Jiazi Bu*, Pan Zhang†, Xiaoyi Dong, Yuhang Zang, Tong Wu, Huaian Chen, Jiaqi Wang, Yi Jin†
(*Equal Contribution)(†Corresponding Author)

### License
Not specified in repository (no LICENSE file found). Academic use implied by citation requirement.

### Paper Versions
- v4 (latest): 2024-10-08
- v3: 2024-07-02
- Code released: 2024-06-29
