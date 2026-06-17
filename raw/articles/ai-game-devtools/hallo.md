# Hallo: Hierarchical Audio-Driven Visual Synthesis for Portrait Image Animation

**Source:** https://github.com/fudan-generative-vision/hallo
**Archived:** 2026-04-19

## README Summary

Hallo is a hierarchical audio-driven visual synthesis framework for portrait image animation, developed by Fudan University (Generative Vision Lab) in collaboration with Baidu Inc, ETH Zurich, and Nanjing University. It generates realistic talking portrait videos from a single source image and driving audio.

### Key Features
- Single portrait image + audio WAV input → talking portrait video output
- Hierarchical audio-driven architecture with separate face locator, image projection, and audio projection modules
- Built on Stable Diffusion 1.5 + AnimateDiff motion module
- Two-stage training pipeline (stage1: image/audio conditioning, stage2: full motion)
- Wav2Vec audio encoding + InsightFace face analysis + MediaPipe face landmarking
- Supports pose/face/lip weight controls for fine-tuning animation behavior
- English-only audio (training data limitation)
- ComfyUI integration, WebUI, Docker, and RunPod deployment options available

### Architecture
```
hallo/
├── animate/          # Face animation pipeline (face_animate.py, face_animate_static.py)
├── datasets/         # Data processing (audio_processor, image_processor, mask_image, talk_video)
├── models/           # Core neural network modules
│   ├── unet_3d.py            # 3D UNet denoising backbone
│   ├── unet_2d_condition.py  # 2D conditional UNet
│   ├── audio_proj.py         # Wav2Vec audio feature projection
│   ├── image_proj.py         # Image feature projection
│   ├── face_locator.py       # Face region locator/conditioning
│   ├── motion_module.py      # AnimateDiff-based temporal motion module
│   ├── attention.py          # Cross-attention + self-attention
│   ├── mutual_self_attention.py  # Image-audio cross-modal attention
│   ├── transformer_2d.py     # 2D Transformer blocks
│   ├── transformer_3d.py     # 3D Transformer blocks with temporal attention
│   ├── resnet.py             # ResNet blocks
│   └── wav2vec.py            # Wav2Vec2 audio encoder wrapper
├── utils/            # Configuration and utilities
└── scripts/          # Inference, training, data preprocessing, Gradio app
```

### Technical Details
- **Framework:** PyTorch 2.2.2, diffusers 0.27.2
- **Training:** DeepSpeed ZeRO Stage 2, FP16 mixed precision, 8×GPU distributed (accelerate)
- **Pretrained Models:** SD 1.5 UNet, AnimateDiff motion module (mm_sd_v15_v2), Wav2Vec2, InsightFace, audio_separator (Kim_Vocal_2)
- **Inference:** scripts/inference.py — accepts source_image + driving_audio, outputs MP4
- **Configurable weights:** --pose_weight, --face_weight, --lip_weight, --face_expand_ratio

### Dependencies (from setup.py)
- torch 2.2.2, torchvision 0.17.2
- diffusers 0.27.2, transformers 4.39.2
- accelerate 0.28.0, deepspeed (via accelerate_config)
- insightface 0.7.x, mediapipe[vision] 0.10.x
- audio-separator 0.17.x (Kim_Vocal_2 MDX-Net vocal separation)
- omegaconf, einops, opencv-python, moviepy, bitsandbytes
- xformers 0.0.25.post1

### License
Not explicitly specified in setup.py or README (no LICENSE file in repo root).

### Community Resources
- ComfyUI-Hallo integration
- hallo-webui (Gradio-based web interface)
- hallo-for-windows (Windows deployment guide)
- hallo-docker (Docker containerization)
- TTS x Hallo Talking Portrait Generator (HuggingFace Space)
- JoyHallo (Mandarin Chinese extension)
