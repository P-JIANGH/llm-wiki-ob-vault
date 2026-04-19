# HunyuanPortrait: Implicit Condition Control for Enhanced Portrait Animation

**Source:** https://github.com/Tencent-Hunyuan/HunyuanPortrait
**arXiv:** https://arxiv.org/abs/2503.18860 (CVPR 2025)
**Project Page:** https://kkakkkka.github.io/HunyuanPortrait/
**HuggingFace:** https://huggingface.co/tencent/HunyuanPortrait

## Overview

HunyuanPortrait is a diffusion-based framework for generating lifelike, temporally consistent portrait animations by decoupling identity and motion using pre-trained encoders. It encodes driving video expressions/poses into implicit control signals, injects them via attention-based adapters into a stabilized diffusion backbone, enabling detailed and style-flexible animation from a single reference image.

## Key Architecture

### Core Pipeline
- **Backbone:** Stable Video Diffusion (SVD) UNet3D — adapted from StabilityAI's SVD-XT
- **Image Encoder:** DINOv2 ViT-Large with visual adapter layers (layers 3,7,11,15,19,23)
- **Identity Encoding:** ArcFace ONNX model for face identity preservation
- **Motion Encoding:**
  - HeadExpression: extracts facial expression features from video frames
  - HeadPose: extracts head rotation/translation parameters
  - IntensityAwareMotionRefiner: refines motion features with head/exp motion bucket IDs
- **Pose Guider:** Conditions the UNet with DW pose keypoint maps
- **Image Projector:** Projects DINOv2 features into UNet token space
- **Scheduler:** EulerDiscreteScheduler

### Processing Steps
1. Preprocess source image (face detection via YOLOFace v5m) and driving video
2. Extract identity features (ArcFace) from source image
3. Extract motion features (expression + head pose) from driving video
4. Project identity into UNet via ImageProjector
5. Condition diffusion generation with pose maps + motion embeddings
6. Batch processing with configurable frame windows (default 25 frames/batch)
7. Soft-mask blending to paste generated face back into original image resolution

### Model Components (pretrained_weights/hyportrait/)
- `unet.pth` — 3D conditional SVD UNet with IP adapters
- `pose_guider.pth` — Pose conditioning network
- `dino.pth` — DINOv2 ViT-L image encoder
- `image_proj.pth` — Image feature projector
- `expression.pth` — Head expression feature extractor
- `headpose.pth` — Head pose estimator
- `motion_proj.pth` — Intensity-aware motion refiner

## Technical Details

- **Output resolution:** 512×512 (face crop), paste back to original resolution
- **Default inference:** 25 denoising steps, FP16, single RTX 3090 (24GB VRAM)
- **Batch processing:** 25 frames per batch with 3-frame overlap
- **Padding:** 15 frames at start/end for smooth transitions
- **FPS:** 12.5 (configurable)

## Dependencies

```
diffusers==0.29.0, moviepy==1.0.1, transformers, accelerate, omegaconf,
opencv-python-headless, onnxruntime, onnxruntime-gpu, decord,
scikit-image, scikit-video, einops, tqdm
```

## External Model Dependencies
- SVD-XT (StabilityAI) — scheduler config + VAE + UNet config
- YOLOFace v5m — face detection
- ArcFace — identity embedding
- DINOv2 — image encoding (bundled weights)
- HunyuanPortrait custom weights — all 7 model files

## License

Code: Academic research purposes only (no explicit open-source license)
SVD backbone: Stable Video Diffusion Research License (StabilityAI)

## Use Cases for Game Dev
- NPC portrait animation from driving video
- Character acting / facial reenactment
- Portrait singing video generation
- Face expression transfer for game cinematics
